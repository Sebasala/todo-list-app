import styles from "./page.module.scss";
import { CreateTodo } from "@/components/CreateTodo";

export default function Home() {
  return (
    <div className={styles.page}>
      <CreateTodo />
    </div>
  );
}
