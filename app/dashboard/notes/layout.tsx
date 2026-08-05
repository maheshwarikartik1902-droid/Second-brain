'use client'
import CreateNoteButton from "@/components/ui/CreateNoteButton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";


export default function NotesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const notes = useQuery(api.notes.getNotes);

    const hasNotes = notes && notes.length > 0;
    return (
        <div className="">
            <div className="flex justify-between items-center my-6">
                <h1 className="text-4xl font-bold">My Notes</h1>
                <CreateNoteButton />
            </div>
            <div className="space-y-6">

                {
                    !notes && <div className="flex gap-12">
                        <div className="w-1/4 space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-10 w-full rounded-lg"
                                />
                            ))}
                        </div>

                        <div className="flex-1 rounded-xl border space-y-6">
                            <Skeleton className="w-full h-full rounded-md" />
                        </div>
                    </div>
                }
            </div>

            {
                !hasNotes && (
                    <div className="flex flex-col gap-5 justify-center items-center my-8">
                        <Image
                            src="/document.svg"
                            alt="No documents found"
                            width={200}
                            height={200}
                        />
                        <h1 className="text-4xl font-bold">You have no Notes</h1>
                        <CreateNoteButton />
                    </div>
                )
            }
            {hasNotes &&
                <div className="flex flex-row gap-5">
                    <ul className="space-y-2 w-1/4 min-w-64 max-w-sm shrink-0">
                        {notes && notes.map((note) => {
                            const active = pathname === `/dashboard/notes/${note._id}`;
                            return (
                                <li key={note._id}>
                                    <Link
                                        href={`/dashboard/notes/${note._id}`}
                                        className={cn(
                                            "relative flex w-full items-center rounded-xl px-4 py-2 transition",
                                            active
                                                ? "bg-accent border border-border"
                                                : "hover:bg-accent"
                                        )}
                                    >
                                        {active && (
                                            <span className="absolute left-0 h-6 w-0.5 rounded-r-full bg-primary" />
                                        )}

                                        <span className="min-w-0 flex-1 truncate">
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
            }
        </div>
    )
}