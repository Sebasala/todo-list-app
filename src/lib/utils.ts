import validator from "validator";
import { Todo } from "@/generated/prisma/client";

/**
 * Sanitizes input text by validating type, trimming whitespace, escaping HTML characters,
 * and limiting the length to 200 characters.
 * @param text - The input text to sanitize.
 * @returns The sanitized text or null if the input is invalid or empty.
 */
export function sanitizeText(text: string): string | undefined {
  if (typeof text !== "string") {
    return undefined;
  }
  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    return undefined;
  }
  const safeText = validator.escape(trimmedText);
  return safeText.slice(0, 200);
}

/**
 * Finds the index of a todo item by its ID in the todos array.
 * @param id - The ID of the todo item to find.
 * @param todosArray - The array of todo items to search in.
 * @returns The index of the todo item, or -1 if not found.
 */
export function findTodoIndex(id: string, todosArray: Todo[]): number {
  return todosArray.findIndex((todo) => todo.id === id);
}

/**
 * Array of navigation path objects used for routing in the application.
 * Each object contains a display name and the corresponding path.
 */
export const pathNames = [
  {
    name: "Create",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];

/**
 * Fetches all todo items from the API.
 * @returns A promise that resolves to an array of Todo objects.
 */
export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch("/api/todos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", { error });
    return [];
  }
}
