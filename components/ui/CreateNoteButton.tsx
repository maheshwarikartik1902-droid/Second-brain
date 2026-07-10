'use client'
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { PlusIcon } from "lucide-react";
import CreateNoteForm from "./CreateNoteForm";

export default function CreateNoteButton() {
    const createDocument = useMutation(api.documents.createDocument);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center">
                    <PlusIcon className="mr-2 h-4 w-4"/>  Create Note
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Note</DialogTitle>
                    <DialogDescription>
                        Create a note for you search over in the future.
                    </DialogDescription>
                </DialogHeader>
                <CreateNoteForm onNoteCreated={() => setIsOpen(false)}/>
            </DialogContent>
        </Dialog>

    );
}