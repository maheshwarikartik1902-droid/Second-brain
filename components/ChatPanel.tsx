'use client'
import { useAction } from "convex/react"
import { api } from "../convex/_generated/api";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Id } from "../convex/_generated/dataModel";
import { SearchIcon } from "lucide-react";
export default function ChatPanel({ DocumentId }: { DocumentId: Id<'documents'> }) {
    const askQuestion = useAction(api.documents.askQuestion);
    return (
        <div className="flex flex-col h-full w-full justify-content items-center">
            <div className=" flex-1 overflow-y-auto">
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