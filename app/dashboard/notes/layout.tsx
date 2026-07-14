'use client'
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function NotesLayout({ children }: { children: React.ReactNode }) {

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
                        <li>
                            <Link href={`/dashboard/notes/${note._id}`}>{note.text.substring(0, 30) + "..."}</Link>
                        </li>
                    </div>
                ))}
            </div>
            {children}
        </div>
    )
}