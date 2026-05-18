'use client'
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { title } from "process";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/ui/document-card";

export default function Home() {

  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
    <Button onClick={() => {createDocument({title: "New Document"})}}>New Document</Button>
    {documents?.map(doc => (
      <DocumentCard document={doc} />
    ))}
    </main>
  );
}

/*function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  return <div>Authenticated content: {messages?.length}</div>;
}*/