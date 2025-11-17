"use client";
import styles from "./TodoCheckbox.module.scss";
import { Spiner } from "@/components/Spiner";

interface TodoCheckboxProps {
  isComplete: boolean;
  isPending: boolean;
  todoTitle: string;
  toggleComplete: () => void;
}

/**
 * Renders a checkbox for a todo item, showing a spinner when pending.
 * @param {Object} props - The component props.
 * @param {boolean} props.isComplete - Whether the todo is complete.
 * @param {boolean} props.isPending - Whether the toggle is pending.
 * @param {string} props.todoTitle - The title of the todo item.
 * @param {() => void} props.toggleComplete - Function to toggle completion.
 * @returns {JSX.Element} The rendered checkbox or spinner.
 */
export function TodoCheckbox({
  isComplete,
  isPending,
  todoTitle,
  toggleComplete,
}: TodoCheckboxProps) {
  return !isPending ? (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={isComplete}
      onChange={toggleComplete}
      aria-labelledby={todoTitle}
    />
  ) : (
    <Spiner small />
  );
}
