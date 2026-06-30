'use client'
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { DocumentCard } from "@/components/ui/document-card";
import CreateDoumentButton from "@/components/ui/CreateDoumentButton";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export function DocumentCardSkeleton() {
  return (
    <div className="rounded-md border-card-foreground p-4 space-y-3 bg-card flex flex-col gap-2">
      <Skeleton className="h-5 w-3/4 rounded-sm" />
      <Skeleton className="h-5 w-full rounded-sm" />
      <Skeleton className="h-5 w-2/3 rounded-sm" />
      <Skeleton className="h-8 w-1/2 rounded-md" />
    </div>
  );
}

export function AuthenticatedDocuments() {
  const documents = useQuery(api.documents.getDocuments);

  if (documents === undefined) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <DocumentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center my-8">
        <Image src="/document.svg" alt="No documents found" width={200} height={200} />
        <h1 className="text-4xl font-bold">You have no documents</h1>
        <CreateDoumentButton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3  " >
      {documents?.map((doc, index) => (
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
