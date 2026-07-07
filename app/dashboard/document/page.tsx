'use client'
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentCard } from "@/components/ui/document-card";
import CreateDoumentButton from "@/components/ui/CreateDoumentButton";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

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
      <>
        <div className="flex justify-between items-center my-8">
          <h1 className="text-4xl font-bold">My Documents</h1>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <DocumentCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center my-8">
        <h1 className="text-4xl font-bold">My Documents</h1>

        {documents.length > 0 && <CreateDoumentButton />}
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col gap-5 justify-center items-center my-8">
          <Image
            src="/document.svg"
            alt="No documents found"
            width={200}
            height={200}
          />
          <h1 className="text-4xl font-bold">You have no documents</h1>
          <CreateDoumentButton />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {documents.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <main className="w-full">
      <Unauthenticated>
        <div className="flex items-center">
          Sign in to view your documents
          <SignInButton mode="modal">
            <Button size="sm">Sign In</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
      <Authenticated>
        <AuthenticatedDocuments />
      </Authenticated>
    </main>
  );
}
