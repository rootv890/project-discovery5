# Discovery5

- cycle : 02 Foundation to dyanmics
- name: aeroplane-swims

## Logs

- Deleted a uneccessary table user-schema.ts

## Main Tech Stack applied this cycle

- `@tanstack/react-query`
- `react-hook-form`
- `zod`
- `zustand`
- `date-fns`

## Possible Hooks

---

### 📦 `useToolsQuery`

**Description**: Fetch a list of tools with optional filters (category, tag, platform, search, sort).
**Key**: `["tools", filters]`

- [ ] Build backend API route `/api/tools?category=...&tags=...&sort=...`
- [ ] Create utility for query key structure
- [ ] Debounce search input (if applicable)
- [ ] Support pagination or infinite scroll
- [ ] Add loading + empty state in UI

---

### 🔍 `useToolDetail(toolId | slug)`

**Description**: Fetch single tool detail with features, creators, tags, etc.
**Key**: `["tool", toolId]`

- [ ] Add API route `/api/tools/[id|slug]`
- [ ] Hydrate with related records (features, tags, platforms, etc.)
- [ ] Handle loading/error state cleanly in detail view

---

### 🧠 `useToolFeatures(toolId)`

**Description**: Get feature list of a tool.
**Key**: `["features", toolId]`

- [ ] Build API to fetch tool's features
- [ ] Display inline or in an accordion/section
- [ ] Cache and refetch efficiently on tool edit

---

### 🧩 `useToolReactions(toolId)`

**Description**: Get current reaction summary (likes/dislikes).
**Key**: `["reactions", toolId]`

- [ ] Group by `reactionType` on the backend
- [ ] Format count display (🔥 99+)

---

### 🧑‍💬 `useToolComments(toolId)`

**Description**: Fetch threaded comments for a tool.
**Key**: `["comments", { toolId }]`

- [ ] Fetch parent comments and group replies on client
- [ ] Optionally support infinite loading
- [ ] Mark nesting depth limit

---

### 🏷️ Metadata Hooks

#### `useAllTags()`

- [ ] Fetch and cache all tags with usage counts and colors

#### `useAllCategories()`

- [ ] List all tool categories for filters

#### `useAllPlatforms()`

- [ ] Platform options for search + tool submission form

#### `useAllCreators()`

- [ ] Fetch and show creator/company names and logos

---

### ❤️ Reactions

#### `useUserReaction(toolId)`

- [ ] Check if user has reacted to a tool
- [ ] Optimistically update on toggle
- [ ] Refetch or patch reaction count

---

### ✍️ Mutations

#### `useAddComment(targetType, targetId, parentId?)`

- [ ] Post comment/reply
- [ ] Invalidate or append to existing thread

#### `useReactToTool(toolId, reactionType)`

- [ ] Like/Dislike toggle
- [ ] Invalidate `reactions` + `userReaction`

#### `useAddTool(toolData)`

- [ ] Post new tool
- [ ] Invalidate or refetch `["tools"]`

#### `useUpdateTool(toolId, changes)`

- [ ] Update tool info, tags, categories, etc.

#### `useDeleteComment(commentId)`

- [ ] Soft-delete comment
- [ ] Optionally remove or collapse replies

### Fetching tool for Cards Preview

Tool name, subtitle, Like Count and Views, Small Description, Buttons -> More Info,Visit Site/Product
