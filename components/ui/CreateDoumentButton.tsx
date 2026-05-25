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
import UploadDocumentForm from "./UploadDocumentForm";
import { Upload } from "lucide-react";

export default function CreateDoumentButton() {
    const createDocument = useMutation(api.documents.createDocument);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center">
                    <Upload className="mr-2 h-4 w-4"/> Upload Document
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                        Upload a team document for you search over in the future.
                    </DialogDescription>
                </DialogHeader>
                <UploadDocumentForm onUpload={() => setIsOpen(false)}/>
            </DialogContent>
        </Dialog>

    );
}