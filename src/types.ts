/**
 * Represents a todo item in the application.
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Parameters for identifying a single todo item by ID.
 */
export interface SingleTodoParams {
  id: string;
}

/**
 * Context object containing route parameters for single todo operations.
 */
export interface SingleTodoContext {
  params: Promise<SingleTodoParams>;
}
