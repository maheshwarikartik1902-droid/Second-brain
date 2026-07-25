import { v } from "convex/values";
import { action } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { getEmbedding } from "./notes";
import { api } from "./_generated/api";

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

        const notes = (
            await Promise.all(
                results.map((result) =>
                    ctx.runQuery(api.notes.getNote, {
                        noteId: result._id,
                    })
                )
            )
        ).filter(Boolean) as Doc<"notes">[];

        return notes;
    },
});