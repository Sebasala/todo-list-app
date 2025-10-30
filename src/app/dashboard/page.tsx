import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  try {
    const todos = await prisma.todo.findMany();
    return (
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            {todo.title}
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error({ error });
  } finally {
    await prisma.$disconnect();
  }
}
