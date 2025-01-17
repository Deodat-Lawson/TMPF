// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  date,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `nora_ai_${name}`);

export const users = createTable(
  "users",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userName: varchar("username", { length: 256 }).notNull(),
    userId: varchar("user_authentication_Id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (users) => ({
    nameIndex: index("userId_idx").on(users.userId),
  })
);

export const tasks = createTable("tasks", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

  // Foreign key referencing persons.id,
  userId: integer("user_id").notNull().references(() => users.id),

  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  timeSpent: integer("time_spent").notNull(),
  timeRemaining: integer("time_remaining").notNull(),
  mode: varchar("mode", { length: 256 }).notNull(),
  category: varchar("category", { length: 256 }).notNull(),
  priority: varchar("priority", { length:256 }).notNull(),
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


export const study_sessions  = createTable("study_sessions", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

  userId: varchar("user_id", { length: 256 }).notNull(),
  category: varchar("category", { length: 256 }).notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  duration: integer("duration").notNull(),
},);



export const study_time_daily = createTable("study_time_daily", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  date: date("date").notNull(),

  category: varchar("category", { length: 256 }).notNull(),
  totalDuration: integer("total_duration").notNull(),
});
