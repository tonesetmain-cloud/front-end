"use client";
import React, { useEffect, useState } from "react";
import WithAuth from "@/components/WithAuth";
import styles from "./Questions.module.css";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  onboardingQuestionsSelect,
  onboardingQuestionsTextFormat,
  questionKeyMap,
} from "./questions";
import NavBar from "@/components/navbar/Navbar";
import { format } from "path";

type selectionQuestion = {
  [key: string]: string[] | undefined;
};

type informationType = {
  [key: string]: string[] | any;
};

const QuestionsPage = () => {
  const [information, setInformation] = useState<informationType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    if (checked) {
      setInformation({
        ...information,
        [name]: information[name] ? [...information[name], value] : [value],
      });
    } else {
      setInformation({
        ...information,
        [name]:
          information[name]?.filter((item: string) => item !== value) || [],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missingAnswers = onboardingQuestionsSelect.filter((q) => {
      const key = Object.keys(q)[0];
      return !information[key] || information[key].length === 0;
    });

    if (missingAnswers.length > 0) {
      alert("Please answer all the questions.");
      return;
    }

    const formattedData: Record<string, any> = {};

    Object.entries(information).forEach(([question, answer]) => {
      const backendKey = questionKeyMap[question];
      if (backendKey) {
        formattedData[backendKey] = Array.isArray(answer)
          ? answer.join(", ")
          : answer;
      }
    });

    console.log("submitted info:", formattedData);
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS}/business/business-details`,
        formattedData,
        {
          withCredentials: true,
        }
      );
      console.log("response", response.data.data.id);
      const requests = [
        axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS}/business/send-prompt-to-ai-service/${response.data.data.id}`,
          { withCredentials: true }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_BUSINESS}/business/send-prompt-to-ai-service-for-tech-stack/${response.data.data.id}`,
          { withCredentials: true }
        ),
      ];
      console.log("Sending prompts to AI services...");
      const results = await Promise.all(requests);
      console.log("AI service responses:", results);
      router.push("/canva");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar flag={true} />
      <div className={styles.container}>
        <h1 className={styles.heading}>Business Questions</h1>
        <div className={styles.formCard}>
          <Form onSubmit={handleSubmit}>
            {onboardingQuestionsTextFormat.map(
              (question: string, index: number) => {
                return (
                  <Form.Group
                    key={index}
                    className={`mb-3 ${styles.formGroup}`}
                    controlId={`select-${index}`}>
                    <Form.Label> {question}</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      name={question}
                      value={information.question}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                );
              }
            )}
            {onboardingQuestionsSelect.map(
              (question: selectionQuestion, index: number) => {
                const key = Object.keys(question)[0]; // get the question text
                return (
                  <Form.Group
                    key={index}
                    controlId={`select-${index}`}
                    className={`mb-3 ${styles.formGroup}`}>
                    <Form.Label>{key}</Form.Label>

                    {(question as selectionQuestion)[key]?.map(
                      (option: string, index: number) => (
                        <Form.Check
                          label={option}
                          name={key}
                          value={option}
                          onChange={handleCheckChange}
                          key={index}
                        />
                      )
                    )}
                  </Form.Group>
                );
              }
            )}

            <Button
              variant="primary"
              className={styles.btn}
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default function ProtectedCanvas() {
  return (
    <WithAuth>
      <QuestionsPage />
    </WithAuth>
  );
}
