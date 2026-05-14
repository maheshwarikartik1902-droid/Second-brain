import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocument = mutation({
    args: {
        title: v.string(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const document = await ctx.db.insert("documents", {
            title: args.title,
            content: args.content,
        });
        return document;
    },
});

export const getDocuments = query({
    handler: async (ctx) => {
        const documents = await ctx.db.query("documents").collect();
        return documents;
    },
});