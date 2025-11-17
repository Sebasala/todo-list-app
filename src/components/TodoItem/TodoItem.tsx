"use client";
import styles from "./TodoItem.module.scss";
import { Todo } from "@/generated/prisma/client";
import { TodoCheckbox } from "@/components/TodoCheckbox";
import { useToggleTodo } from "./useToggleTodo";

/**
 * Renders a todo item with checkbox and title.
 * @param {Object} props - The component props.
 * @param {Todo} props.todo - The todo item to display.
 * @returns {JSX.Element} The rendered todo item.
 */
export function TodoItem({ todo }: { todo: Todo }) {
  const { isComplete, isPending, toggleComplete } = useToggleTodo(todo);
  const todoTitle = `todo-title-${todo.id}`;

  return (
    <li className={styles.todoItem}>
      <TodoCheckbox
        isPending={isPending}
        isComplete={isComplete}
        toggleComplete={toggleComplete}
        todoTitle={todoTitle}
      />
      <span id={todoTitle} className={styles.title}>
        {todo.title}
      </span>
    </li>
  );
}
