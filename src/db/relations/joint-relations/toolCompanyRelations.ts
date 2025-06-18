import { relations } from "drizzle-orm";
import { tools } from "../../tables/tools";
import { companies } from "../../tables/companies";
import { toolCompanies } from "../../tables/joint/toolCompanies";

export const toolCompanyRelations = relations(toolCompanies, ({ one }) => ({
  tool: one(tools, { fields: [toolCompanies.toolId], references: [tools.id], relationName: 'tool_companies_tool' }),
  company: one(companies, { fields: [toolCompanies.companyId], references: [companies.id], relationName: 'tool_companies_company' }),
}));