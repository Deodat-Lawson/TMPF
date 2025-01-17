import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { study_sessions, study_time_daily } from "../../../../server/db/schema";
import { and, eq, sql } from "drizzle-orm";

type PostBody = {
  userId: string;
  category: string;
  duration: number;
};

export async function POST(request: Request) {
  try {
    const { userId, category, duration } = (await request.json()) as PostBody;

    // 1) Insert a new study session
    //    (Neon HTTP driver doesn't support transactions, so we do this inline)
    await db.insert(study_sessions).values({
      userId,
      category,
      duration,
    });

    // 2) Calculate the "dateString" for today's date
    const now = new Date();
    const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateString = localMidnight.toISOString().split("T")[0]!;

    // 3) Check if an existing daily record exists
    const [currentDailyTotal] = await db
      .select()
      .from(study_time_daily)
      .where(
        and(
          eq(study_time_daily.userId, userId),
          eq(study_time_daily.category, category),
          eq(study_time_daily.date, dateString)
        )
      );

    // 4) If it exists, update totalDuration; else insert a new record
    if (currentDailyTotal) {
      // We found a record for this user/date/category, so add to totalDuration
      const newDuration = currentDailyTotal.totalDuration + duration;

      await db
        .update(study_time_daily)
        .set({ totalDuration: newDuration })
        .where(eq(study_time_daily.id, currentDailyTotal.id));
    } else {
      // No record found; insert a new one
      await db.insert(study_time_daily).values({
        userId,
        date: dateString,
        category,
        totalDuration: duration,
      });
    }

    return NextResponse.json("Added timestamp & updated daily total", {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Unable to create or update data" },
      { status: 500 }
    );
  }
}
