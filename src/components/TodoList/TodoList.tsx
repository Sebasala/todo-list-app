"use client";
import styles from "./TodoList.module.scss";
import { Todo } from "@/generated/prisma/client";
import { Spiner } from "@/components/Spiner";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
}

export function TodoList({ todos, isLoading }: TodoListProps) {
  return (
    <>
      {!isLoading ? (
        <>
          {todos.length > 0 ? (
            <ul className={styles.todoList}>
              {todos.map((todo: Todo) => (
                <li key={todo.id} className={styles.todoItem}>
                  {todo.title}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.message}>
              <h2>Create your first todo</h2>
              <p>
                There are no todos yet. To create one, enter a todo title above.
              </p>
            </div>
          )}
        </>
      ) : (
        <Spiner />
      )}
    </>
  );
}
