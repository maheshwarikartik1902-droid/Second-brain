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

        const results = await ctx.vectorSearch("notes", "by_embedding", {
            vector: embedding,
            limit: 16,
            filter: (q) => q.eq("tokenIdentifier", userId),
        });


        const filtered = results.filter(
            (r) => r._score > 0.5
        );

        const notes: SearchResult[] = (
            await Promise.all(
                filtered.map(async (result) => {
                    const note = await ctx.runQuery(api.notes.getNote, {
                        noteId: result._id,
                    });
                    if (!note) return null;
                    return {
                        ...note,
                        _score: result._score,
                        type: "note" as const,
                    };
                })
            )
        ).filter((item) => item !== null);
        return notes;
    },
});