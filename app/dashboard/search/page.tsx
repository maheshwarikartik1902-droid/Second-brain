'use client'
import { Doc } from "@/convex/_generated/dataModel";
import { SearchForm } from "./SearchForm";
import { useState } from "react";


export default function SettingsPage() {
    const [notes, setNotes] = useState<Doc<"notes">[] | null>(null);
    return (
        <>
            <div className="flex flex-col justify-between items-center my-8">
                <h1 className="text-4xl font-bold">Settings</h1>
            </div>
            <SearchForm setNotes={setNotes} />
            {notes && notes.map((note) => <p key={note._id}>{note.text}</p>)}
        </>
    )
}