'use client'
import { Button } from "@/components/ui/button";
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";

export default function NotesPage() {
    const params = useParams();
    console.log("params:", params);
    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    console.log(noteId);
    const note = useQuery(api.notes.getNote, { noteId });
    return (

        <div className="flex justify-between items-center my-4 relative">
            <h1 className="text-xl ">
                <Button className="absolute -top-5 -right-1"
                size="icon" 
                variant="destructive">
                    <Trash2Icon />
                </Button>
                {note?.text}</h1>
        </div>
    )
}