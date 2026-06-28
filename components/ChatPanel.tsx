'use client'
import { useAction, useQuery } from "convex/react"
import { api } from "../convex/_generated/api";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Id } from "../convex/_generated/dataModel";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPanel({ DocumentId }: { DocumentId: Id<'documents'> }) {
    const askQuestion = useAction(api.documents.askQuestion);
    const chats = useQuery(api.chats.getChats, { DocumentId });

    return (
        <div className="flex flex-col h-full w-full justify-center items-center p-4">
            <div className=" flex-1 overflow-y-auto w-fit space-y-2 ">
                <div className="bg-[#121213] rounded p-2 item-center text-center">
                    Your chats Appear here
                </div>
                {/*human text*/}

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
                                "max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-wrap",
                                chat.isHuman
                                    ? "bg-zinc-950 text-white rounded-br-sm"
                                    : "bg-zinc-800 text-white rounded-bl-sm"
                            )}
                        >

                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {chat.text}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

            </div>
            <div className="border-t p-2 w-full">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const text = formData.get("text") as string;
                    //quiery for askQuestion
                    const answer = await askQuestion({
                        question: text,
                        DocumentId,
                    });

                    console.log("ANSWER:", answer);
                }}>
                    {/*put them in the last*/}
                    <div className="flex flex-row gap-2">
                        <Input required name="text" className=" bg-black text-white overflow-x-auto" />
                        <Button className="rounded-lg cursor-pointer ">
                            <SearchIcon />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}