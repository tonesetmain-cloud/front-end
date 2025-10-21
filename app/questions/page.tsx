"use client";
import WithAuth from "@/components/WithAuth";
import styles from "./Questions.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  onboardingQuestionsSelect,
  onboardingQuestionsTextFormat,
} from "./questions";
import NavBar from "@/components/navbar/Navbar";

type selectionQuestion = {
  [key: string]: string[] | undefined;
};

const QuestionsPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Business Questions</h1>
        <div className={styles.formCard}>
          <Form>
            {onboardingQuestionsTextFormat.map(
              (question: string, index: number) => {
                return (
                  <Form.Group
                    key={index}
                    className={`mb-3 ${styles.formGroup}`}
                    controlId={`select-${index}`}>
                    <Form.Label> {question}</Form.Label>
                    <Form.Control type="text" size="lg" required />
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
                    <Form.Select aria-label={key} size="lg" required>
                      <option value="">Open this select menu</option>
                      {(question as selectionQuestion)[key]?.map(
                        (option: string, index: number) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </Form.Select>
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
