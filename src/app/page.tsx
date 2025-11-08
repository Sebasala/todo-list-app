"use client";
import styles from "./page.module.scss";
import { CreateTodo } from "@/components/CreateTodo";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "./useTodos";

export default function Home() {
  const { todos, isLoading, addTodo } = useTodos();
  return (
    <div className={styles.page}>
      {/* TODO: Test what happens if a todo is added while loading todos. */}
      <CreateTodo addTodo={addTodo} />{" "}
      <TodoList todos={todos} isLoading={isLoading} />
    </div>
  );
}
