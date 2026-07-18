'use client'
import { Button } from "@/components/ui/button";
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { DeleteNoteButton } from "@/components/ui/DeleteNoteButton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export default function NotesPage() {
    const params = useParams();
    console.log("params:", params);
    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    console.log(noteId);
    const note = useQuery(api.notes.getNote, { noteId });
    return (

        <div className="flex justify-between items-center my-4 relative">
            <div className="absolute -top-5 -right-1">
                <DeleteNoteButton noteId={noteId}/>
            </div>

            <h1 className="text-xl ">
                {note?.text}</h1>
        </div>
    )
}