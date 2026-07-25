import { ConvexError, GenericId, v, VArray, VFloat64, VId } from "convex/values";
import { internalAction, internalMutation, mutation, query } from "./_generated/server";
import { GoogleGenAI } from "@google/genai";
import { internal } from "./_generated/api";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getEmbedding(text: string) {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    });
    return response.embeddings?.[0].values ?? [];
}
export const setNoteEmbedding = internalMutation({
    args:{
        noteId: v.id("notes"),
        embedding: v.array(v.float64()),
    },


    async handler(ctx, args){
        await ctx.db.patch(args.noteId, {
            embedding: args.embedding,
        })
    }
})
export const createNoteEmbedding = internalAction({
    args:{
        noteId: v.id("notes"),
        text: v.string(),
    },
    async handler(ctx, args){
        
        const embedding = await getEmbedding(args.text);
        await ctx.runMutation(internal.notes.setNoteEmbedding, {
            noteId: args.noteId, 
            embedding: embedding});
    }
})

export const createNote = mutation({
    args:{
        text: v.string(),
    },
    async handler(ctx, args){
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            throw new ConvexError("Unauthorized");
        };
        const noteId = await ctx.db.insert("notes", {
            text: args.text, 
            tokenIdentifier: userId
        });``
        await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
            noteId: noteId, 
            text: args.text
        });
        return await ctx.db.get("notes", noteId);
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

function internalmMutation(arg0: { args: { noteId: VId<GenericId<"notes">, "required">; embeedding: VArray<number[], VFloat64<number, "required">, "required">; }; handler(ctx: any, args: any): Promise<any>; }) {
    throw new Error("Function not implemented.");
}
