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
    const { text }: { text: string } = await request.json();
    if (text === undefined) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const sanitizedText = sanitizeText(text);
    if (!sanitizedText) {
      return NextResponse.json(
        { error: "Invalid text provided" },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: sanitizedText,
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
