"use client";

import { SignIn } from "@clerk/nextjs";
import Threads from "@/components/Threads.jsx";

export default function SignInPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-background">

            <div className="absolute inset-0 z-0">
                <Threads
                    color={[
                        0.47843137254901963,
                        0.47843137254901963,
                        0.47843137254901963,
                    ]}
                    amplitude={0.9}
                    distance={0}
                    enableMouseInteraction
                />
            </div>

            
            <div className="absolute inset-0 z-10 bg-background/75" />

            <div className="relative z-20 flex min-h-screen items-center justify-center px-6">
                <div className="flex w-full max-w-5xl items-center justify-between gap-16">
                    <div className="hidden flex-1 text-left md:block">
                        <h1 className="text-5xl font-bold tracking-tight">
                            Second Brain
                        </h1>

                        <p className="mt-4 max-w-md text-lg leading-8 text-muted-foreground">
                            Your knowledge, connected.
                        </p>

                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground/70">
                            Capture your thoughts, search your knowledge,
                            and find connections across everything you've saved.
                        </p>
                    </div>

                    
                    <div className="w-full max-w-md">
                        <SignIn
                            forceRedirectUrl="/dashboard/document"
                            appearance={{
                                elements: {
                                    rootBox: "w-full",
                                    card: "w-full border border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl",
                                    headerTitle: "text-foreground",
                                    headerSubtitle: "text-muted-foreground",
                                    socialButtonsBlockButton:
                                        "border-border bg-background hover:bg-accent",
                                    formFieldInput:
                                        "border-border bg-background focus:ring-1 focus:ring-primary",
                                    formButtonPrimary:
                                        "bg-primary text-primary-foreground hover:bg-primary/90",
                                    footerActionLink:
                                        "text-primary hover:text-primary/80",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}