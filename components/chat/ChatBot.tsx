import React, { useState } from "react";
import styles from "./ChatBot.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type props = {};

const ChatBot: React.FC<props> = ({}) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMaximized, setIsMaximized] = React.useState(false);
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
        <div className={styles.ChatBox}>
          <div className="MacButtons">
            <button
              className="redButton"
              onClick={() => setIsMaximized(false)}
            />
            <button
              className="greenButton"
              onClick={() => {
                setIsMaximized(true);
              }}
            />
            <p className="title">Chat</p>
            <button
              className={styles.crossBtn}
              onClick={() => {
                setIsChatbotOpen(false);
              }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
