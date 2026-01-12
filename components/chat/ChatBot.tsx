import React, { useState } from "react";
import styles from "./ChatBot.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faXmark,
  faPaperPlane,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

type props = {};

const ChatBot: React.FC<props> = ({}) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<string[]>([
    "Hello! How can I help you?",
  ]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      {!isChatbotOpen && (
        <button
          className={styles.chatBtn}
          onClick={() => {
            setIsChatbotOpen(true);
          }}>
          Chat With VegaPunk <FontAwesomeIcon icon={faComment} />
        </button>
      )}

      {isChatbotOpen && (
        <>
          <div
            className={`${styles.ChatBox} ${
              isMaximized ? styles.fullscreen : ""
            }`}>
            <div className="MacButtons">
              <button
                className="redButton"
                onClick={() => setIsChatbotOpen(false)}
              />
              <button
                className="greenButton"
                onClick={() => {
                  setIsMaximized(!isMaximized);
                }}
              />
              <p className="title">Chat</p>
            </div>
            <div className={styles.messagesArea}>
              {/* Example messages */}
              <div className={styles.botMessage}>
                Hello! How can I help you?
              </div>
              <div className={styles.userMessage}>
                Tell me about branding colors
              </div>
            </div>

            {/* Input area */}
            <div className={styles.inputArea}>
              <input
                className={styles.chatInput}
                placeholder="Type your message..."
              />

              <button className={styles.micBtn}>
                <FontAwesomeIcon icon={faMicrophone} />
              </button>

              <button className={styles.sendBtn}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
