"use client";
import { sanitizeText } from "@/lib/utils";
import { useState, useEffect } from "react";
import styles from "./CreateTodo.module.scss";

type MessageType = "success" | "error" | null;

const MESSAGE_TYPES = {
  SUCCESS: "success" as const,
  ERROR: "error" as const,
} as const;

export const CreateTodo = () => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const sanitizedText = sanitizeText(text);
  const maySubmit = !isSubmitting && sanitizedText;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!maySubmit) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: sanitizedText }),
      });

      if (response.ok) {
        setText("");
        setMessage("Todo created successfully");
        setMessageType(MESSAGE_TYPES.SUCCESS);
        setMessageVisible(true);
      } else {
        if (response.status === 400) {
          setMessage("Validation failed: Please check your input");
        } else if (response.status >= 500) {
          setMessage("Server error: Please try again later");
        } else {
          setMessage("Error creating todo");
        }
        setMessageType(MESSAGE_TYPES.ERROR);
        setMessageVisible(true);
      }
    } catch (error) {
      console.error("Failed to create todo: ", { error });
      setMessage("Network error: Please check your connection");
      setMessageType(MESSAGE_TYPES.ERROR);
      setMessageVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setMessageType(null);
    setMessageVisible(false);
    setText(e.target.value);
  };

  useEffect(() => {
    if (messageType === MESSAGE_TYPES.SUCCESS && messageVisible) {
      // Only for success messages
      const timer = setTimeout(() => {
        setMessageVisible(false);
        // Clear message after animation completes (assuming 0.5s animation)
        setTimeout(() => {
          setMessage("");
          setMessageType(null);
        }, 500);
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [messageType, messageVisible]); // Dependency array: re-run when messageType or messageVisible changes

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="todo-input" className={styles.label}>
        Enter a todo:
      </label>
      <div className={styles.inputContainer}>
        <input
          id="todo-input"
          type="text"
          value={text}
          onChange={handleInput}
          className={styles.input}
          aria-describedby="todo-message"
        />
        <button type="submit" disabled={!maySubmit} className={styles.button}>
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </div>
      {messageVisible && (
        <p
          id="todo-message"
          className={`${styles.message} ${styles[messageType || ""]}`}
        >
          {message}
        </p>
      )}
    </form>
  );
};
