import { internalMutation, internalQuery, query } from "./_generated/server";
import { v } from "convex/values";


export const storeChats = internalMutation({
    args: { 
        DocumentId: v.id("documents"),
        text: v.string(),
        tokenIdentifier: v.string(),
        isHuman: v.boolean(),
    },
    handler: async (ctx, args) => {
        ctx.db.insert("chats", { 
            text: args.text, 
            tokenIdentifier: args.tokenIdentifier, 
            DocumentId: args.DocumentId ,
            isHuman: args.isHuman
        });
    },
});

export const getChats = query({
    args: { 
        DocumentId: v.id("documents"),
    },

    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return [];
        }
        const chats = await ctx.db.query("chats").withIndex("by_document_and_token_identifier", 
            (q) => q.eq("DocumentId", args.DocumentId)
            .eq("tokenIdentifier", userId))
            .collect();
        return chats;
    },
});