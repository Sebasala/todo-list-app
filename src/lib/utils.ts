import validator from "validator";
import { Todo } from "@/types";

/**
 * Sanitizes input text by validating type, trimming whitespace, escaping HTML characters,
 * and limiting the length to 200 characters.
 * @param text - The input text to sanitize.
 * @returns The sanitized text or null if the input is invalid or empty.
 */
export function sanitizeText(text: string): string | null {
  if (typeof text !== "string") {
    return null;
  }
  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    return null;
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
