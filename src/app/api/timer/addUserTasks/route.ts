import { NextResponse } from "next/server";
import { db } from "../../../../server/db/index";
import { createTable, tasks, users } from "../../../../server/db/schema";
import { eq, sql } from "drizzle-orm";
import * as console from "console";
import { index, integer, timestamp, varchar } from "drizzle-orm/pg-core";



export const tasks = createTable("tasks", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

    // Foreign key referencing persons.id
    userId: integer("user_id").notNull().references(users.id),

    name: varchar("name", { length: 256 }).notNull(),
    timeSpent: integer("time_spent").notNull(),
    timeRemaining: integer("time_remaining").notNull(),
    mode: varchar("mode", { length: 256 }).notNull(),
    category: varchar("category", { length: 256 }).notNull(),
    priority: integer("priority").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (task) => ({
    personIdIndex: index("task_person_id_idx").on(task.userId),
    categoryIndex: index("task_category_idx").on(task.category),
  })

);


export async function POST(request: Request) {
  try {
    const { userId, taskName, taskTimeRemaining, taskMode, taskCategory, taskPriority } = await request.json();

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

    await db.insert(tasks).values({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userId: userInfo.id,
      name: taskName,
      timeSpent: 0,
      timeRemaining: taskTimeRemaining,
      mode: taskMode,
      category: taskCategory,
      priority: taskPriority,

    });


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