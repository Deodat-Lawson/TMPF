import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { tasks, users } from "../../../../server/db/schema";
import { eq } from "drizzle-orm";
import * as console from "console";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    // 1) Look up the user in the 'users' table
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

    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userInfo.id));

    // Return the tasks as JSON
    return NextResponse.json(userTasks, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Unable to fetch documents" },
      { status: 500 }
    );
  }
}