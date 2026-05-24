'use client'
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UploadDocumentForm from "./UploadDocumentForm";

export default function CreateDoumentButton() {
    const createDocument = useMutation(api.documents.createDocument);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Upload Document
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                        Upload a team document for you search over in the future.
                    </DialogDescription>
                </DialogHeader>
                <UploadDocumentForm />
            </DialogContent>
        </Dialog>

    );
}