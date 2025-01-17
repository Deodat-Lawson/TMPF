CREATE TABLE IF NOT EXISTS "nora_ai_tasks" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "nora_ai_tasks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(256),
	"time_spent" integer NOT NULL,
	"time_remaining" integer NOT NULL,
	"mode" varchar(256) NOT NULL,
	"category" varchar(256) NOT NULL,
	"priority" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nora_ai_users" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "nora_ai_users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(256) NOT NULL,
	"user_authentication_Id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nora_ai_tasks" ADD CONSTRAINT "nora_ai_tasks_user_id_nora_ai_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nora_ai_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_person_id_idx" ON "nora_ai_tasks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_category_idx" ON "nora_ai_tasks" USING btree ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "nora_ai_users" USING btree ("user_authentication_Id");