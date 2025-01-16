import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { createTable, tasks, users } from "../../../../server/db/schema";
import { eq, sql } from "drizzle-orm";
import * as console from "console";


type PostBody = {
  userId: string;            // or number if you're storing userId as numeric
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
      userId,
      taskName,
      taskTimeRemaining,
      taskMode,
      taskCategory,
      taskPriority,
      taskDescription,
    } = (await request.json()) as PostBody;

    console.log("userId: ", userId);
    console.log("taskName: ", taskName);
    console.log("taskTimeRemaining: ", taskTimeRemaining);
    console.log("taskMode: ", taskMode);
    console.log("taskCategory: ", taskCategory);
    console.log("taskPriority: ", taskPriority);
    console.log("taskDescription: ", taskDescription);

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
    await db.insert(tasks).values({
      userId: userInfo.id,
      name: taskName,          // string
      timeSpent: 0,            // integer
      timeRemaining: taskTimeRemaining, // integer
      mode: taskMode,          // string
      category: taskCategory,  // string
      priority: taskPriority, // integer
      description: taskDescription, // string
    });

    // Optionally, return an updated list of tasks (or the inserted task)
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userInfo.id));

    // Return the tasks as JSON
    return NextResponse.json(userTasks, { status: 200 });

  } catch (error: unknown) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Unable to create task" },
      { status: 500 }
    );
  }
}