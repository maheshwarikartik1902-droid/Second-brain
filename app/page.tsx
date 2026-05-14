'use client'

import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { title } from "process";


export default function Home() {

  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Authenticated>
        <UserButton />
        {/*<Content />*/}
        <button onClick={()=>{
          createDocument({
            title: "test",
            content: "test"
          })
        }}>Click</button>
        {documents?.map((document) => (
          <div key={document._id}>
            <h1>{document.title}</h1>
            <p>{document.content}</p>
          </div>
        ))}
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </main>
  );
}

/*function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  return <div>Authenticated content: {messages?.length}</div>;
}*/