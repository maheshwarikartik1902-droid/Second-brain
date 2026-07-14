'use client'
import CreateNoteButton from "@/components/ui/CreateNoteButton";
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
        <div className="">
            <div className="flex justify-between items-center my-8">
          <h1 className="text-4xl font-bold">{note?.text}</h1>

            </div>
        </div>
    )
}