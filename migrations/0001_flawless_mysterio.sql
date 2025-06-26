CREATE TYPE "public"."tool_status" AS ENUM('draft', 'pending_review', 'approved', 'rejected');--> statement-breakpoint
ALTER TABLE "tool_categories" DROP CONSTRAINT "tool_categories_tool_id_category_id_pk";--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "target_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "parent_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "creators" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "creators" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "tool_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "platforms" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "platforms" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "reactions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "reactions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "reactions" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "reactions" ALTER COLUMN "tool_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tool_categories" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_categories" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tool_categories" ALTER COLUMN "tool_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_categories" ALTER COLUMN "category_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_creators" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_creators" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tool_creators" ALTER COLUMN "tool_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_creators" ALTER COLUMN "creator_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_integrations" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_integrations" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tool_integrations" ALTER COLUMN "tool_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_integrations" ALTER COLUMN "integrates_with_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_platforms" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_platforms" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tool_platforms" ALTER COLUMN "tool_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_platforms" ALTER COLUMN "platform_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_tags" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_tags" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tool_tags" ALTER COLUMN "tool_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tool_tags" ALTER COLUMN "tag_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tools" ADD COLUMN "tool_status" "tool_status" DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;