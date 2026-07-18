'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteNoteButton({ noteId, }: { noteId: Id<"notes">; }) {
    const deleteNote = useMutation(api.notes.deleteNote);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="group flex items-center gap-2 overflow-hidden rounded-xl transition-all duration-300">
                    <Trash2Icon />
                    <span className="max-w-0 opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-20 group-hover:opacity-100">
                        Delete
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this Note?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this note and can't be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={async (e) => {
                            e.preventDefault();

                            try {
                                setIsLoading(true);
                                router.replace("/dashboard/notes");
                                await deleteNote({ noteId });
                                
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                    >
                        {
                            isLoading ? (
                                <Loader2Icon className="animate-spin" />
                            ) : (
                                "Delete"
                            )
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}