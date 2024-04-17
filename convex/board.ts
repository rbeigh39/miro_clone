import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    org_id: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const random_image = images[Math.floor(Math.random() * images.length)];

    const board = ctx.db.insert("boards", {
      title: args.title,
      org_id: args.org_id,
      author_id: identity.subject,
      author_name: identity.name!,
      image_url: random_image,
    });

    return board;
  },
});

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    // Check to delete favourite relation as well
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const title = args.title.trim();

    if (!title) throw new Error("Title is required");

    if (title.length > 60)
      throw new Error("Title cannot be longer than 60 characters");

    const board = ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favourite = mutation({
  args: {
    id: v.id("boards"),
    org_id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("Board not found");

    const user_id = identity.subject;

    const existing_favourite = await ctx.db
      .query("user_favourites")
      .withIndex("by_user_board_org", (q) => {
        return q
          .eq("user_id", user_id)
          .eq("board_id", board._id)
          .eq("org_id", args.org_id);
      })
      .unique();

    if (existing_favourite) throw new Error("Board already favourited");

    await ctx.db.insert("user_favourites", {
      user_id,
      board_id: board._id,
      org_id: board.org_id,
    });

    return board;
  },
});

export const un_favourite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("Board not found");

    const user_id = identity.subject;

    const existing_favourite = await ctx.db
      .query("user_favourites")
      .withIndex("by_user_board", (q) => {
        return q.eq("user_id", user_id).eq("board_id", board._id);
        // TODO: Check if org_id needed
      })
      .unique();

    if (!existing_favourite) throw new Error("Favourited board not found");

    await ctx.db.delete(existing_favourite._id);

    return board;
  },
});
