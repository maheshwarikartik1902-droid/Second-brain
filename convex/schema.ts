import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        content: v.string(),
        tokenIdentifier: v.string(),
        fileId: v.id("_storage"),
        embedding: v.optional(v.array(v.float64())),
    }).index("by_token_identifier", ["tokenIdentifier"])
    .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 3072,
    filterFields: ["tokenIdentifier"],
    }),

    notes: defineTable({
        text: v.string(),
        embedding: v.optional(v.array(v.float64())),
        tokenIdentifier: v.string(),
    }).index("by_token_identifier", ["tokenIdentifier"])
    .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 3072,
    filterFields: ["tokenIdentifier"],
    }),

    chats: defineTable({
        text: v.string(),
        tokenIdentifier: v.string(),
        DocumentId: v.id("documents"),
        isHuman: v.boolean(),
    }).index("by_document_and_token_identifier", ["DocumentId","tokenIdentifier"]),
})