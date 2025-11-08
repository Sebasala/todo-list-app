import { useState, useEffect } from "react";
import { Todo } from "@/generated/prisma/client";
import { fetchTodos } from "@/lib/utils";

/**
 * Custom hook for managing todos state.
 * @returns {Object} An object containing todos array, isLoading boolean, and addTodo function.
 * @property {Todo[]} todos - The list of todos.
 * @property {boolean} isLoading - Whether the todos are being loaded.
 * @property {function(Todo): void} addTodo - Function to add a new todo.
 */
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  useEffect(() => {
    async function loadTodos() {
      const data = await fetchTodos();
      setTodos(data);
      setIsLoading(false);
    }

    loadTodos();
  }, []);

  return { todos, isLoading, addTodo };
};
