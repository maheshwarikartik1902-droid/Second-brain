'use client'
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const notes = useQuery(api.notes.getNotes);
    return (
        <div className="w-full">
            <div className="flex justify-between items-center my-6">
                <h1 className="text-4xl font-bold">My Notes</h1>
                <CreateNoteButton />
            </div>

            <div className="flex flex-row gap-5">
                <ul className="space-y-2 w-1/4">
                    {notes && notes.map((note) => {
                        const active = pathname === `/dashboard/notes/${note._id}`;
                        return (
                            <li key={note._id}>
                                <Link
                                    href={`/dashboard/notes/${note._id}`}
                                    className={cn(
                                        "relative flex items-center rounded-xl px-4 py-2 transition",
                                        active
                                            ? "bg-accent border border-border"
                                            : "hover:bg-accent"
                                    )}
                                >
                                    {active && (
                                        <span className="absolute left-0 h-6 w-0.5 rounded-r-full bg-primary" />
                                    )}

                                    <span className="truncate">
                                        {note.text}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="bg-accent border w-full h-auto p-2 rounded-xl">
                    {children}
                </div>
            </div>
        </div>
    )
}