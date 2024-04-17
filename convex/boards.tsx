import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    org_id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("org_id", args.org_id))
      .order("desc")
      .collect();

    const boards_with_favourite_relation = boards.map((board) => {
      return ctx.db
        .query("user_favourites")
        .withIndex("by_user_board", (q) => {
          return q.eq("user_id", identity.subject).eq("board_id", board._id);
        })
        .unique()
        .then((favourite) => {
          return {
            ...board,
            is_favourite: !!favourite,
          };
        });
    });

    const boards_with_favourite_boolean = await Promise.all(
      boards_with_favourite_relation
    );

    return boards_with_favourite_boolean;
  },
});
