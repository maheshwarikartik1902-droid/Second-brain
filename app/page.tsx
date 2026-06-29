'use client'
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { DocumentCard } from "@/components/ui/document-card";
import CreateDoumentButton from "@/components/ui/CreateDoumentButton";
import { Skeleton } from "@/components/ui/skeleton";

export function DocumentCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

export function AuthenticatedDocuments() {
  const documents = useQuery(api.documents.getDocuments);

  if (documents === undefined) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <DocumentCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
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
