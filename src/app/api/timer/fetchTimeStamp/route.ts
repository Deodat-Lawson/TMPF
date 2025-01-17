import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { study_time_daily } from "../../../../server/db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";

type PostBody = {
  userId: string;
  startDate: string; // e.g. "2025-01-01"
  endDate: string;   // e.g. "2025-01-31"
};

export async function POST(request: Request) {
  try {
    // 1) Parse the request body
    const { userId, startDate, endDate } = (await request.json()) as PostBody;

    // 2) Query: total time spent *per category* in the given date range
    //    We'll group by `category` and sum the `totalDuration`.
    const categoryTotals = await db
      .select({
        category: study_time_daily.category,
        totalTime: sql<number>`COALESCE(SUM(${study_time_daily.totalDuration}), 0)`
      })
      .from(study_time_daily)
      .where(
        and(
          eq(study_time_daily.userId, userId),
          gte(study_time_daily.date, startDate),
          lte(study_time_daily.date, endDate)
        )
      )
      .groupBy(study_time_daily.category);

    // 3) Summation: total time across *all* categories.
    //    This is simply the sum of `totalTime` from `categoryTotals`.
    const totalTimeAll = categoryTotals.reduce(
      (acc, row) => acc + row.totalTime,
      0
    );

    // 4) Return both the category breakdown and the grand total
    return NextResponse.json(
      {
        categoryTotals, // array of { category: string; totalTime: number }
        totalTimeAll,   // number
      }, { status: 200 });

  } catch (error: unknown) {
    console.error("Error retrieving total time:", error);
    return NextResponse.json(
      { error: "Unable to retrieve total time" },
      { status: 500 }
    );
  }
}
