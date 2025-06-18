import { relations } from 'drizzle-orm';
import { categories } from '../tables/categories';
import { toolCategories } from '../tables/joint/toolCategories';

export const categoryRelations = relations(categories, ({ many }) => ({
  tools: many(toolCategories, { relationName: 'category_tools' }),
}));
