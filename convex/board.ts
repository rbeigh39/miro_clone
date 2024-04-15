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
