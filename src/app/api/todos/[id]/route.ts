import { NextRequest, NextResponse } from "next/server";
import { todos } from "@/lib/data";
import { SingleTodoContext } from "@/types";
import { findTodoIndex, sanitizeText } from "@/lib/utils";

/**
 * Updates an existing todo item by ID.
 * @param {NextRequest} request - The incoming request containing update data
 * @param {SingleTodoContext} context - Context containing route parameters
 * @returns {Promise<NextResponse>} JSON response containing the updated todo or error
 */
export async function PUT(request: NextRequest, { params }: SingleTodoContext) {
  const { id } = await params;
  const todoIndex = findTodoIndex(id, todos);
  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const { completed, text }: { completed?: boolean; text?: string } =
    await request.json();

  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }

  if (text !== undefined) {
    const sanitizedText = sanitizeText(text);
    if (!sanitizedText) {
      return NextResponse.json(
        { error: "Invalid text provided" },
        { status: 400 }
      );
    }
    todos[todoIndex].title = sanitizedText;
  }

  return NextResponse.json(todos[todoIndex]);
}

/**
 * Deletes a todo item by ID.
 * @param {NextRequest} _request - The incoming request (unused)
 * @param {SingleTodoContext} context - Context containing route parameters
 * @returns {Promise<NextResponse>} JSON response containing the deleted todo or error
 */
export async function DELETE(
  _request: NextRequest,
  { params }: SingleTodoContext
) {
  const { id } = await params;
  const todoIndex = findTodoIndex(id, todos);
  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  const deletedTodo = todos.splice(todoIndex, 1);
  return NextResponse.json(deletedTodo);
}
