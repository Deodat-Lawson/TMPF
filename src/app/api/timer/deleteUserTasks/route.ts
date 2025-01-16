import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { tasks, users } from "../../../../server/db/schema";
import { eq, sql } from "drizzle-orm";
import * as console from "console";


type PostBody = {
  id: string;

};


export async function DELETE(request: Request) {
  try {
    // Destructure your incoming JSON
    const {
      id,
    } = (await request.json()) as PostBody;

    // Insert a new task using the correct types
    await db.delete(tasks).where(eq(tasks.id, Number(id)))


    // Return the tasks as JSON
    return NextResponse.json("Delete Success", { status: 200 });

  } catch (error: unknown) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Unable to delete task" },
      { status: 500 }
    );
  }
}