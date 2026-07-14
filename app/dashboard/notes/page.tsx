'use client'
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function NotesPage() {
    const notes = useQuery(api.notes.getNotes);
    return (
        <div className="w-full space-y-8">
            Notes preview
        </div>
    )
}