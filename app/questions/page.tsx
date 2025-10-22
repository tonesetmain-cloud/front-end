"use client";
import React, { useState } from "react";
import WithAuth from "@/components/WithAuth";
import styles from "./Questions.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import {
  onboardingQuestionsSelect,
  onboardingQuestionsTextFormat,
} from "./questions";
import NavBar from "@/components/navbar/Navbar";

type selectionQuestion = {
  [key: string]: string[] | undefined;
};

type informationType = {
  [key: string]: string[] | any;
};

const QuestionsPage = () => {
  const [information, setInformation] = useState<informationType>({});

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missingAnswers = onboardingQuestionsSelect.filter((q) => {
      const key = Object.keys(q)[0];
      return !information[key] || information[key].length === 0;
    });

    if (missingAnswers.length > 0) {
      alert("Please answer all the questions.");
      return;
    }

    console.log("submitted info:", information);
  };

  return (
    <>
      <NavBar />
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

            <Button variant="primary" className={styles.btn} type="submit">
              Submit
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
