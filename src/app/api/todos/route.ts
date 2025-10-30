import { NextResponse } from "next/server";
import { todos } from "@/lib/data";
import { Todo } from "@/types";
import { sanitizeText } from "@/lib/utils";

/**
 * Retrieves all todo items.
 * @returns {Promise<NextResponse>} JSON response containing an array of all todos
 */
export async function GET() {
  return NextResponse.json(todos);
}

/**
 * Creates a new todo item.
 * @param {Request} request - The incoming request containing the todo text
 * @returns {Promise<NextResponse>} JSON response containing the newly created todo with status 201
 */
export async function POST(request: Request) {
  try {
    const { title }: { title: string } = await request.json();
    if (title === undefined) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const sanitizedText = sanitizeText(title);
    if (!sanitizedText) {
      return NextResponse.json(
        { error: "Invalid text provided" },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: sanitizedText,
      completed: false,
      createdAt: new Date(),
    };

    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
