'use client'
import { useAction, useQuery } from "convex/react"
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { QuestionForm } from "@/app/dashboard/document/[documentId]/QuestionForm";

export default function ChatPanel({ DocumentId }: { DocumentId: Id<'documents'> }) {
    const askQuestion = useAction(api.documents.askQuestion);
    const chats = useQuery(api.chats.getChats, { DocumentId });

    return (
        <div className="flex flex-col h-full w-full justify-center items-center p-4">
            <div className="flex-1 w-full overflow-y-auto space-y-4 px-4">
                <div className="rounded p-2 item-center text-center">
                    {(chats?.length === 0)?
                        (<p className="p-2 item-center text-center ">Ask your first question</p>) :
                        (<p className="p-2 item-center text-center ">Recent chats</p>)}
                </div>

                {chats?.map((chat) => (
                    <div
                        key={chat._id}
                        className={cn(
                            "flex",
                            chat.isHuman ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "prose prose-invert max-w-none rounded-2xl px-4 py-3",
                                chat.isHuman
                                    ? "bg-zinc-950 rounded-br-sm"
                                    : "bg-zinc-800 rounded-bl-sm"
                            )}
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {chat.text}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

            </div>
            <div className="border-t p-3 w-full flex justify-center">
                <div className="w-full max-w-3xl">
                    <QuestionForm DocumentId={DocumentId} />
                </div>
            </div>
        </div>
    )
}