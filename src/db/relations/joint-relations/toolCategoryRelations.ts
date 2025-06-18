import { relations } from "drizzle-orm";
import { toolCategories } from "../../tables/joint/toolCategories";
import { categories } from "../../tables/categories";
import { tools } from "../../tables/tools";

export const toolCategoryRelations = relations(toolCategories, ({ one }) => ({
  tool: one(tools, { fields: [toolCategories.toolId], references: [tools.id], relationName: 'tool_categories_tool' }),
  category: one(categories, { fields: [toolCategories.categoryId], references: [categories.id], relationName: 'tool_categories_category' }),
}));