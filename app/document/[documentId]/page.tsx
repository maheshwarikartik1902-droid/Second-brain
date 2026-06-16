'use client'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel';
import React from "react";
import ChatPanel from "@/components/ChatPanel";

export default function DocumentPage({ params }: { params: Promise<{ documentId: Id<'documents'> }> }) {
    const { documentId } = React.use(params);
    const document = useQuery(api.documents.viewDocument, {
        documentId
    });

    if (!document) {
        return (
            <main className="px-12 py-12">
                <div className="flex justify-between items-center my-8">
                    <h1 className="text-4xl font-bold">Document not found</h1>
                </div>
            </main>
        );
    }
    return (
        <main className="p-12">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{document.title}</h1>
            </div>
            <div className="flex gap-12">
                <div className="bg-gray-900 py-4 rounded-md flex-1 h-100">
                    {document.documentUrl && <iframe className="w-full h-full" src={document.documentUrl} />}
                </div>
                <div className="w-75 bg-gray-900">
                    <ChatPanel DocumentId={document._id} />
                </div>
            </div>
        </main>
    );
}
