'use client'
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { DocumentCard } from "@/components/ui/document-card";
import CreateDoumentButton from "@/components/ui/CreateDoumentButton";


export function AuthenticatedDocuments() {
  const documents = useQuery(api.documents.getDocuments);

  return (
  <div className = "grid grid-cols-4 gap-3  " >
      { documents?.map((doc, index) => (
        <DocumentCard key={index} document={doc} />
      ))}
  </div >
  );
}
export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="p-24">
      <Unauthenticated>
        <div className="flex justify-between items-center my-8">
          Sign in to view your documents
        </div>
      </Unauthenticated>
      <Authenticated>
        <div className="flex justify-between items-center my-8">
          <h1 className="text-4xl font-bold">My Documents</h1>
          <CreateDoumentButton />
        </div>
        <AuthenticatedDocuments />
      </Authenticated>
      
    </main>
  );
}
