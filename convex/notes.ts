import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createNote = mutation({
    args:{
        text: v.string(),
    },
    async handler(ctx, args){
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            throw new ConvexError("Unauthorized");
        };
        const note = await ctx.db.insert("notes", {
            text: args.text, 
            tokenIdentifier: userId
        });
        return await ctx.db.get("notes", note);
    }
})

export const getNotes = query({
    async handler(ctx){
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            return null;
        };
        const notes = await ctx.db.query("notes").withIndex("by_token_identifier", (q) => q.eq("tokenIdentifier", userId))
        .collect();
        return notes;
    }
})


export const getNote = query({
    args: {
        noteId: v.id("notes"),
    },
    async handler(ctx, args){
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId){
            return null;
        };
        const note = await ctx.db.get("notes", args.noteId);
        if(note?.tokenIdentifier !== userId){
           return null;
        }
        return note;
    }
})


export const deleteNote = mutation({
    args: {
        noteId: v.id("notes"),
    },
    handler: async (ctx, args) => {
        const note = await ctx.db.get("notes", args.noteId);
        if (!note) {
            throw new ConvexError("Document not found");
        }
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (note.tokenIdentifier !== userId) {
            throw new ConvexError("You are not the owner of this note");
        }

        await ctx.db.delete(args.noteId);
    },
});