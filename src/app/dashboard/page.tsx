import { todos } from "@/lib/data";
import styles from "./page.module.scss";

export default function Dashboard() {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
