import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { tasks, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import * as console from "console";


type PostBody = {
  id: string;
  userId: string;
  taskName: string;
  taskTimeRemaining: number; // if it's an integer
  taskMode: string;
  taskCategory: string;
  taskPriority: string; // if it's an integer
  taskDescription: string;
};


export async function POST(request: Request) {
  try {
    // Destructure your incoming JSON
    const {
      id,
      userId,
      taskName,
      taskTimeRemaining,
      taskMode,
      taskCategory,
      taskPriority,
      taskDescription,
    } = (await request.json()) as PostBody;

    // Look up the user to get the user's internal DB `id`


    const [userInfo] = await db
      .select()
      .from(users)
      .where(eq(users.userId, userId));

    if (!userInfo) {
      return NextResponse.json(
        { error: "Invalid user." },
        { status: 400 }
      );
    }


    // Insert a new task using the correct types
    await db.update(tasks).set({
      userId: userInfo.id,
      name: taskName,          // string
      timeSpent: 0,            // integer
      timeRemaining: taskTimeRemaining, // integer
      mode: taskMode,          // string
      category: taskCategory,  // string
      priority: taskPriority, // integer
      description: taskDescription, // string
    }).where(eq(tasks.id, Number(id)))


    // Return the tasks as JSON
    return NextResponse.json("Update Success", { status: 200 });

  } catch (error: unknown) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Unable to update task" },
      { status: 500 }
    );
  }
}