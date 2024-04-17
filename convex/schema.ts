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
  user_favourites: defineTable({
    org_id: v.string(),
    user_id: v.string(),
    board_id: v.id("boards"),
  })
    .index("by_board", ["board_id"])
    .index("by_user_org", ["user_id", "org_id"])
    .index("by_user_board", ["user_id", "board_id"])
    .index("by_user_board_org", ["user_id", "board_id", "org_id"]),
});
