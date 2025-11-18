import { useState } from "react";
import { Todo } from "@/generated/prisma/client";

// TODO: Improve error handling rendering user feedback
/*
Error Handling Enhancement: While the hook now handles errors more reliably, consider adding user-facing 
feedback for failures (e.g., a toast notification or inline error message). This could be implemented via 
a shared context or library like react-hot-toast. For example, in the catch block, you could dispatch an 
error message instead of just logging.
*/
// TODO: Add testing
/**
 * Custom React hook for toggling the completion status of a todo item.
 * Manages local state for completion status and pending state during API calls.
 * @param {Todo} todo - The todo item object containing id, title, completed, and createdAt.
 * @returns {Object} An object with the current completion state, pending state, and toggle function.
 * @returns {boolean} isComplete - The current completion status of the todo.
 * @returns {boolean} isPending - Indicates if a toggle operation is in progress.
 * @returns {() => Promise<void>} toggleComplete - Asynchronous function to toggle the completion status.
 */
export function useToggleTodo(todo: Todo) {
  const [isComplete, setIsComplete] = useState(todo.completed);
  const [isPending, setIsPending] = useState(false);

  const toggleComplete = async () => {
    setIsPending(true);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !isComplete }),
      });
      if (response.ok) {
        setIsComplete(!isComplete);
      } else {
        console.error("Failed to update todo status", await response.text());
      }
    } catch (error) {
      console.error("Failed to update todo status", error);
    } finally {
      setIsPending(false);
    }
  };

  return { isComplete, isPending, toggleComplete };
}
