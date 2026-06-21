import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        content: v.string(),
        tokenIdentifier: v.string(),
        fileId: v.id("_storage"),
    }).index("by_token_identifier", ["tokenIdentifier"]),

    chats: defineTable({
        text: v.string(),
        tokenIdentifier: v.string(),
        DocumentId: v.id("documents"),
        isHuman: v.boolean(),
    }).index("by_document_and_token_identifier", ["DocumentId","tokenIdentifier"]),
})