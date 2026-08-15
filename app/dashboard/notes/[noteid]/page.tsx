'use client'
import { Button } from "@/components/ui/button";
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { DeleteNoteButton } from "@/components/ui/DeleteNoteButton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

export default function NotesPage({ params }: { params: Promise<{ noteId: Id<'notes'> }> }) {
    const { noteId } = React.use(params);
    const note = useQuery(
        api.notes.getNote,
        noteId
            ? {
                noteId: noteId as Id<"notes">,
            }
            : "skip"
    );
    return (

        <div className="flex justify-between items-center my-4 relative">
            <div className="absolute -top-5 -right-1">
                <DeleteNoteButton noteId={noteId} />
            </div>

            <h1 className="text-xl mx-2 mt-6 whitespace-pre-line">
                {note?.text}
            </h1>
        </div>
    )
}