import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createDocument = mutation({
    args: {
        title: v.string()
    },
    handler: async (ctx, args) => {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        console.log(userId);
        if(!userId) {
            throw new ConvexError("User not authenticated");
        }
        const document = await ctx.db.insert("documents", {
            title: args.title,
            tokenIdentifier: userId
        });
        return document;
    },
});

export const getDocuments = query({
    handler: async (ctx) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId) {
            throw new ConvexError("User not authenticated");
        }

        const documents = await ctx.db.query("documents").withIndex("by_token_identifier",(q) => q.eq("tokenIdentifier", 
            userId)).collect();
        return documents;
    },
});