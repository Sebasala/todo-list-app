"use client";
import styles from "./page.module.scss";
import { CreateTodo } from "@/components/CreateTodo";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "./useTodos";

export default function Home() {
  const { todos, isLoading, addTodo } = useTodos();
  return (
    <div className={styles.page}>
      <CreateTodo isLoading={isLoading} addTodo={addTodo} />{" "}
      <TodoList todos={todos} isLoading={isLoading} />
    </div>
  );
}
