"use client";
import styles from "./CreateTodo.module.scss";
import { clsx } from "clsx";
import { useCreateTodo } from "./useCreateTodo";
import { CreateTodoProps } from "./types";

// TODO: Move copy strings to a separate file for localization.
/**
 * CreateTodo component that provides a form for users to create new todo items.
 * @param {CreateTodoProps} props - The component props.
 * @param {boolean} props.isLoading - Indicates if the application is in a loading state.
 * @param {(todo: import("@/generated/prisma/client").Todo) => void} props.addTodo - Function to add a new todo item to the list.
 * @returns {JSX.Element} The rendered CreateTodo form component.
 */
export const CreateTodo = ({ isLoading, addTodo }: CreateTodoProps) => {
  const {
    errorMessage,
    errorMessageVisible,
    handleInput,
    handleSubmit,
    isSubmitting,
    maySubmit,
    title,
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
            [styles.error]: errorMessageVisible,
          })}
          aria-describedby="todo-message"
        />
        <button type="submit" disabled={!maySubmit} className={styles.button}>
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </div>
      {errorMessageVisible && (
        <p id="todo-message" className={styles.message}>
          {errorMessage}
        </p>
      )}
    </form>
  );
};
