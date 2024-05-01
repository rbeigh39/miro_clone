import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    org_id: v.string(),
    search: v.optional(v.string()),
    favourites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    if (args.favourites) {
      const favourited_boards = await ctx.db
        .query("user_favourites")
        .withIndex("by_user_org", (q) => {
          return q.eq("user_id", identity.subject).eq("org_id", args.org_id);
        })
        .order("desc")
        .collect();

      const ids = favourited_boards.map((board) => board.board_id);
      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({
        ...board,
        is_favourite: true,
      }));
    }

    const title = args.search as string;

    let boards = [];

    if (title) {
      // TODO: Query with search_index
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) => {
          return q.search("title", title).eq("org_id", args.org_id);
        })
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("org_id", args.org_id))
        .order("desc")
        .collect();
    }

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
