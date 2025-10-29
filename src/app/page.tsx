import styles from "./page.module.scss";
import { CreateTodo } from "@/app/components/CreateTodo";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Todo List App</h1>
      <CreateTodo />
    </div>
  );
}
