import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
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
