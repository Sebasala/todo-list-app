import { Todo } from "@/generated/prisma/client";

export interface CreateTodoProps {
  isLoading: boolean;
  addTodo: (todo: Todo) => void;
}
