import { useState } from "react";
import { sanitizeText } from "@/lib/utils";
import { Todo } from "@/generated/prisma/client";

// TODO: Avoid magic strings by defining error codes in the API or in a content file and using them here.

/**
 * Custom React hook for managing the creation of a new todo item.
 * This hook handles the state for the todo title, submission status, error messages,
 * and provides handlers for form submission and input changes.
 * @param {function(Todo): void} addTodo - Callback function to add the created todo to the list.
 * @returns {Object} An object with the following properties:
 *   - title: {string} The current value of the todo title input.
 *   - isSubmitting: {boolean} Whether the form is currently being submitted.
 *   - errorMessage: {string} The current error or success message.
 *   - errorMessageVisible: {boolean} Whether the message should be displayed.
 *   - maySubmit: {boolean} Whether the form can be submitted (title is valid and not submitting).
 *   - handleSubmit: {function(Event): Promise<void>} Handler for form submission.
 *   - handleInput: {function(Event): void} Handler for input changes.
 */
export const useCreateTodo = (
  isLoading: boolean,
  addTodo: (todo: Todo) => void
) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const sanitizedTitle = sanitizeText(title);
  const maySubmit = !isSubmitting && !isLoading && sanitizedTitle;

  /**
   * Handles the form submission for creating a new todo.
   * Prevents default form behavior, checks if submission is allowed,
   * sends a POST request to the API, and updates the state accordingly.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!maySubmit) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: sanitizedTitle }),
      });

      if (response.ok) {
        const newTodo: Todo = await response.json();
        addTodo(newTodo);
        setTitle("");
      } else {
        if (response.status === 400) {
          setErrorMessage("Validation failed: Please check your input");
        } else if (response.status >= 500) {
          setErrorMessage("Server error: Please try again later");
        } else {
          setErrorMessage("Error creating todo");
        }
        setErrorMessageVisible(true);
      }
    } catch (error) {
      console.error("Failed to create todo: ", { error });
      setErrorMessage("Network error: Please check your connection");
      setErrorMessageVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles changes to the input field for the todo title.
   * Clears any existing message and resets its visibility, then updates the title state.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setErrorMessageVisible(false);
    setTitle(e.target.value);
  };

  return {
    title,
    isSubmitting,
    errorMessage,
    errorMessageVisible,
    maySubmit,
    handleSubmit,
    handleInput,
  };
};
