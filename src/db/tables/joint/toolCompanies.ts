import { pgTable, uuid } from "drizzle-orm/pg-core";
import { tools } from "../tools";
import { companies } from "../companies";


// --- Tool-Companies ---


export const toolCompanies = pgTable('tool_companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  companyId: uuid('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
});