import { Todo } from "@/generated/prisma/client";

export interface CreateTodoProps {
  addTodo: (todo: Todo) => void;
}
