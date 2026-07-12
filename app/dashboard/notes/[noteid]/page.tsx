'use client'
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function NotesPage() {
    const notes = useQuery(api.notes.getNotes);
    return (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center my-8">
                <h1 className="text-4xl font-bold">Notes</h1>
                <CreateNoteButton />
            </div>
            <div className="">
                {notes && notes.map((note) => (
                    <div key={note._id} className="flex justify-between items-center ">
                        <li>{note.text.substring(0, 30)+"..."}</li>
                    </div>
                ))}
            </div>
        </div>
    )
}