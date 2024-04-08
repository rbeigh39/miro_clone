import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    org_id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("org_id", args.org_id))
      .order("desc")
      .collect();

    return boards;
  },
});
