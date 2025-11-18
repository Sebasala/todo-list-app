import { NextRequest, NextResponse } from "next/server";
import { SingleTodoContext } from "@/types";
import { sanitizeText } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Updates an existing todo item by ID.
 * @param {NextRequest} request - The incoming request containing update data
 * @param {SingleTodoContext} context - Context containing route parameters
 * @returns {Promise<NextResponse>} JSON response containing the updated todo or error
 */
export async function PATCH(
  request: NextRequest,
  { params }: SingleTodoContext
) {
  const { id } = await params;

  const { completed, title }: { completed?: boolean; title?: string } =
    await request.json();

  const isCompletedValid = completed !== undefined;
  const isTitleValid = sanitizeText(title || "");

  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...(isCompletedValid && { completed }),
        ...(isTitleValid && { title: sanitizeText(title || "") }),
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    throw error; // Re-throw other errors
  }
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

  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });
    return NextResponse.json(deletedTodo);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    throw error; // Re-throw other errors
  }
}
