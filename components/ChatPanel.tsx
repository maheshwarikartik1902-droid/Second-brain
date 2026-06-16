'use client'
import { useAction } from "convex/react"
import { api } from "../convex/_generated/api";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Id } from "../convex/_generated/dataModel";

export default function ChatPanel({ DocumentId }: { DocumentId: Id<'documents'> }) {
    const askQuestion = useAction(api.documents.askQuestion);
    return (
        <div className="flex flex-col justify-between max-h-100 gap-2">
            <div className=" overflow-y-scroll">
            </div>
            <div className="flex gap-1">
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
                    console.log("TYPE:", typeof answer);

                }}>
                    <Input required name="text" className="bg-black" />
                    <Button className="rounded-lg">Send</Button>
                </form>
            </div>
        </div>
    )
}