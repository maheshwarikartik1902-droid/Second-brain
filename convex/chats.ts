import { DocumentCard } from './../components/ui/document-card';
import { internalMutation } from "./_generated/server";
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