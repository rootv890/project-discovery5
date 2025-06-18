import { account, session, user, verification } from "./auth-schema"
//tables imports
import { tools } from "./tables/tools";
import { categories } from "./tables/categories";
import { platforms } from "./tables/platforms";
import { tags } from "./tables/tags";
import { companies } from "./tables/companies";
import { features } from "./tables/features";
import { reactions } from "./tables/reactions";

//joint tables imports 
import { toolCategories } from './tables/joint/toolCategories';
import { toolCompanies } from "./tables/joint/toolCompanies";
import { toolPlatforms } from './tables/joint/toolPlatforms';
import { toolTags } from './tables/joint/toolTags';
import { toolFeatures } from './tables/joint/toolFeatures';
import { toolAlternatives } from "./tables/joint/toolAlternatives";
import { toolIntegrations } from "./tables/joint/toolIntegrations";

//relations
import { toolRelations } from "./relations/toolRelations";
import { categoryRelations } from "./relations/categoryRelations";
import { companyRelations } from "./relations/companyRelations";
import { featureRelations } from "./relations/featureRelations";
import { platformRelations } from "./relations/platformRelations";
import { reactionRelations } from "./relations/reactionRelations";
import { tagRelations } from "./relations/tagRelations";
import { commentRelations } from "./relations/commentRelations";


//joint relations

import { toolAlternativeRelations } from "./relations/joint-relations/toolAlternativesRelations";
import { toolCategoryRelations } from "./relations/joint-relations/toolCategoryRelations";
import { toolCompanyRelations } from "./relations/joint-relations/toolCompanyRelations";
import { toolFeatureRelations } from "./relations/joint-relations/toolFeatureRelations";
import { toolIntegrationRelations } from "./relations/joint-relations/toolIntegrationRelations";
import { toolTagRelations } from "./relations/joint-relations/toolTagRelations";
import { toolPlatformRelations } from "./relations/joint-relations/toolPlatformRelations";

export { account, session, user, verification, 
    tools, categories, platforms, tags, companies, features, reactions,
toolCategories, toolFeatures, toolPlatforms,toolCompanies, toolTags, toolAlternatives, toolIntegrations,
toolRelations, commentRelations, tagRelations, reactionRelations, platformRelations, featureRelations, companyRelations, categoryRelations,
toolAlternativeRelations, toolCategoryRelations, toolCompanyRelations, toolFeatureRelations, toolIntegrationRelations, toolPlatformRelations, toolTagRelations
}
