Discovery5 is a platform for discovering new tools and resources for your projects.

# Todo

[x] Tool
[x] Category
[x] Tool-Category
[x] Platform
[x] Tool-Platform
[x] Tag
[x] Tool-Tag
[x] Creator (formerly Companies)
[x] Feature
[x] Reaction
[x] Comment
[ ] User
[ ] Session
[ ] Verification

# Logs

1. Add slug column to tools, categories, creators, platforms,tags table
2. Remove Tools-Features table add toolId directly to features table
3. Add json in Featues, Platforms, Categories table to store features of a tool
4. Rename Companies table to Creators, ToolCreators Feature
5. 1:1 relation between tool and feature
6. Add color, description to tags table
7. rename react_type to reaction_type in reactions table
8. Add reaction_type enum (upvote, downvote) in reactions table
9. Withhold Tool-Alternatives table for V1
10. Index and Unique constraints for all tables
