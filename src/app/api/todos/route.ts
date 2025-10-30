import { NextResponse } from "next/server";
import { Todo } from "@/types";
import { sanitizeText } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

/**
 * Retrieves all todo items.
 * @returns {Promise<NextResponse>} JSON response containing an array of all todos
 */
export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    console.error({ error });
  } finally {
    await prisma.$disconnect();
  }
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

    const newTodo: Todo = await prisma.todo.create({
      data: {
        title: sanitizedText,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
