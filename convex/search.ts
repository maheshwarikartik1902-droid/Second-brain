import { v } from "convex/values";
import { action } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { getEmbedding } from "./notes";
import { api } from "./_generated/api";

export type NoteSearchResult = Doc<"notes"> & {
    _score: number;
    type: "note";
};

export type DocumentSearchResult = Doc<"documents"> & {
    _score: number;
    type: "document";
};

export type SearchResult = NoteSearchResult | DocumentSearchResult;

export const searchAction = action({
    args: {
        search: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) return [];

        const embedding = await getEmbedding(args.search);

        const noteResults = await ctx.vectorSearch("notes", "by_embedding", {
            vector: embedding,
            limit: 3,
            filter: (q) => q.eq("tokenIdentifier", userId),
        });
        
        const documentResults = await ctx.vectorSearch("documents", "by_embedding", {
            vector: embedding,
            limit: 3,
            filter: (q) => q.eq("tokenIdentifier", userId),
        });

        const filteredNotes = noteResults.filter(
            (r) => r._score > 0.5
        );

        const notes: SearchResult[] = (
            await Promise.all(
                filteredNotes.map(async (noteResult) => {
                    const note = await ctx.runQuery(api.notes.getNote, {
                        noteId: noteResult._id,
                    });
                    if (!note) return null;
                    return {
                        ...note,
                        _score: noteResult._score,
                        type: "note" as const,
                    };
                })
            )
        ).filter((item) => item !== null);

        const filteredDocuments = documentResults.filter(
            (r) => r._score > 0.5
        );

        const documents: SearchResult[] = (
            await Promise.all(
                filteredDocuments.map(async (documentResult) => {
                    const document = await ctx.runQuery(api.documents.getDocument, {
                        documentId: documentResult._id,
                    });
                    if (!document) return null;
                    return {
                        ...document,
                        _score: documentResult._score,
                        type: "document" as const,
                    };
                })
            )
        ).filter((item) => item !== null);
        return notes.concat(documents);
    },
});