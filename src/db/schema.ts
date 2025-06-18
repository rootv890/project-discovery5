import { relations } from 'drizzle-orm';
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
import { categoryRelations, commentRelations, companyRelations, featureRelations, platformRelations, reactionRelations, tagRelations, toolAlternativeRelations, toolCategoryRelations, toolCompanyRelations, toolFeatureRelations, toolIntegrationRelations, toolPlatformRelations, toolRelations, toolTagRelations } from './relations';

//relations



// Exporting core tables
export { 
    account, 
    session, 
    user, 
    verification, 
    tools, 
    categories, 
    platforms, 
    tags, 
    companies, 
    features, 
    reactions 
  };
  
  // Exporting joint tables
  export { 
    toolCategories, 
    toolCompanies, 
    toolPlatforms, 
    toolTags, 
    toolFeatures, 
    toolAlternatives, 
    toolIntegrations 
  };
  
  // Exporting relations
  export { 
    toolRelations, 
    categoryRelations, 
    companyRelations, 
    featureRelations, 
    platformRelations, 
    reactionRelations, 
    tagRelations, 
    commentRelations 
  };
  
  // Exporting joint relations
  export { 
    toolAlternativeRelations, 
    toolCategoryRelations, 
    toolCompanyRelations, 
    toolFeatureRelations, 
    toolIntegrationRelations, 
    toolTagRelations, 
    toolPlatformRelations 
  };
  
