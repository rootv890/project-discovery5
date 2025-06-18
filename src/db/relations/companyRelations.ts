import { relations } from "drizzle-orm";
import { companies } from "../tables/companies";
import { toolCompanies } from "../tables/joint/toolCompanies";

export const companyRelations = relations(companies, ({ many }) => ({
    toolCompanies: many(toolCompanies, { relationName: 'company_tool_companies' }),
  }));