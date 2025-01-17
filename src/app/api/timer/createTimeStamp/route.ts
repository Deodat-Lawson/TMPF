import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { study_sessions, tasks, users } from "../../../../server/db/schema";
import { eq } from "drizzle-orm";
import * as console from "console";


type PostBody = {
  userId: string;            // or number if you're storing userId as numeric
  category: string;
  duration: number;
};



export async function POST(request: Request) {
  try {
    // Destructure your incoming JSON
    const { userId, category, duration } = (await request.json()) as PostBody;

    // Insert a new task using the correct types
    await db.insert(study_sessions).values({
      userId: userId,
      category: category,          // string
      duration: duration,            // integer
    });

    // Return the tasks as JSON
    return NextResponse.json( "Added timestamp", { status: 200 });

  } catch (error: unknown) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Unable to create task" },
      { status: 500 }
    );
  }
}