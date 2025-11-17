"use client";
import styles from "./CreateTodo.module.scss";
import { clsx } from "clsx";
import { useCreateTodo } from "./useCreateTodo";
import { CreateTodoProps } from "./types";

export const CreateTodo = ({ isLoading, addTodo }: CreateTodoProps) => {
  const {
    title,
    isSubmitting,
    message,
    messageVisible,
    maySubmit,
    handleSubmit,
    handleInput,
  } = useCreateTodo(isLoading, addTodo);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="todo-input" className={styles.label}>
        Enter a todo:
      </label>
      <div className={styles.inputContainer}>
        <input
          id="todo-input"
          type="text"
          value={title}
          onChange={handleInput}
          className={clsx(styles.input, {
            [styles.error]: messageVisible,
          })}
          aria-describedby="todo-message"
        />
        <button type="submit" disabled={!maySubmit} className={styles.button}>
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </div>
      {messageVisible && (
        <p id="todo-message" className={styles.message}>
          {message}
        </p>
      )}
    </form>
  );
};
