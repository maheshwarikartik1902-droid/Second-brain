'use client'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel';
import React from "react";
import ChatPanel from "@/components/ChatPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export function DocumentViewerSkeleton() {
    return (
        <div className="space-y-2 ">
            {/* Title */}
            <Skeleton className="h-10 w-72 rounded-lg mb-6" />
            {/* Tabs */}
            <div className="flex h-9 w-42 rounded-full gap-1 animate pulse bg-">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-18 rounded-full" />
            </div>
            {/* Document */}
            <Skeleton className="h-100 rounded-lg" />
        </div>
    );
}

export default function DocumentPage({ params }: { params: Promise<{ documentId: Id<'documents'> }> }) {
    const { documentId } = React.use(params);
    const document = useQuery(api.documents.viewDocument, {
        documentId
    });
    //const document = undefined;
    if (!document) {
        return (
            <main className="px-12 py-12">
                <DocumentViewerSkeleton />
            </main>
        );
    }
    return (
        <main className="p-12">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{document.title}</h1>
                <Button variant="destructive" className="group flex items-center gap-2 overflow-hidden  transition-all duration-300">            
                    <Trash2Icon />                   
                    <span className="max-w-0 opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-20 group-hover:opacity-100">
                        Delete
                    </span>
                </Button>
            </div>

            <div className="flex gap-12 mt-6">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList >
                        <TabsTrigger value="account">Documents</TabsTrigger>
                        <TabsTrigger value="password">Chat</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <div className="bg-[#1d1e1f] py-4 rounded-md flex-1 h-100">
                            {document.documentUrl && <iframe className="w-full h-full" src={document.documentUrl} />}
                        </div>
                    </TabsContent>
                    <TabsContent value="password">
                        <div className="h-100 bg-[#1d1e1f] ">
                            <ChatPanel DocumentId={document._id} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
