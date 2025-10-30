import { Todo } from "@/types";

/**
 * In-memory storage for todo items.
 * TODO: Replace with database later
 */
export const todos: Todo[] = [
  {
    id: "1",
    title: "Complete project proposal",
    completed: false,
    createdAt: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: "2",
    title: "Review code changes",
    completed: true,
    createdAt: new Date("2024-01-14T14:30:00Z"),
  },
  {
    id: "3",
    title: "Update documentation",
    completed: false,
    createdAt: new Date("2024-01-16T09:15:00Z"),
  },
];
