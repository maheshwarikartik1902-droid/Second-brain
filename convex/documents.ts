import { api } from './_generated/api';
import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});

export const createDocument = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        fileId: v.id("_storage"),
    },

    handler: async (ctx, args) => {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        console.log(userId);
        if (!userId) {
            throw new ConvexError("User not authenticated");
        }
        const document = await ctx.db.insert("documents", {
            title: args.title,
            content: args.content,
            tokenIdentifier: userId,
            fileId: args.fileId
        });
        return document;
    },
});
export const viewDocument = query({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return null;
        }

        const document = await ctx.db.get("documents", args.documentId);
        if (!document) {
            return null;
        }
        if (document.tokenIdentifier !== userId) {
            return null;
        }

        return { ...document, documentUrl: await ctx.storage.getUrl(document.fileId) };
    },

})

export const getDocuments = query({
    handler: async (ctx) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            throw new ConvexError("User not authenticated");
        }

        const documents = await ctx.db.query("documents").withIndex("by_token_identifier", (q) => q.eq("tokenIdentifier",
            userId)).collect();
        return documents;
    },
});

export const askQuestion = action({
    args: {
        question: v.string(),
        DocumentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!user) {
            throw new ConvexError("User not authenticated");

        }
        const document = await ctx.runQuery(api.documents.viewDocument, {
            documentId: args.DocumentId
        });
        if (!document) {
            throw new ConvexError("Document not found");
        }
        if (document.tokenIdentifier !== user) {
            throw new ConvexError("You are not the owner of this document");
        }

        const file = await ctx.storage.get(document.fileId);
        if (!file) {
            throw new ConvexError("File not found");
        }
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        async function main() {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: 'Why is the sky blue?',
            });
            console.log(response.text);
        }

        main();

    },
});