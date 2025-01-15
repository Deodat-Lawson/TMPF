import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { users } from "../../../../server/db/schema";
import * as console from "console";


type PostBody = {
  userId: string;
  userName: string;
};


export async function POST(request: Request) {
  try {
    // Destructure your incoming JSON
    const {
      userId,
      userName,
    } = (await request.json()) as PostBody;

    // Look up the user to get the user's internal DB `id`

    await db.insert(users).values({
      userId: userId,
      userName: userName,
    })

    // Return the tasks as JSON
    return NextResponse.json("Successfully added user", { status: 200 });

  } catch (error: unknown) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { error: "Unable to add user" },
      { status: 500 }
    );
  }
}