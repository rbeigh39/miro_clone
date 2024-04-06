import { v } from "convex/values";

import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    org_id: v.string(),
    author_id: v.string(),
    author_name: v.string(),
    image_url: v.string(),
  })
    .index("by_org", ["org_id"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["org_id"],
    }),
});
