import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Brain, BrainCircuit, NotebookPen, Search } from "lucide-react";
import Link from "next/link";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">


      {/* ================= Hero ================= */}

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 mt-8 mb-32 text-center">
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Your knowledge.
          <br />
          Organized.
          Searchable.
          Intelligent.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
          Capture notes, upload documents, search semantically,
          and chat with your knowledge using AI, all in one place.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link href="/dashboard/document">
            <Button size="lg">
              Get Started
            </Button>
          </Link>

          <a href="https://github.com/maheshwarikartik1902-droid/Second-brain" target="_blank">
            <Button
              size="lg"
              variant="outline"
            >
              View GitHub
            </Button>
          </a>

        </div>

      </section>

      {/* ================= Features ================= */}

      <section
        id="features"
        className="mx-auto max-w-6xl px-6 py-28"
      >
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-primary">
            Built for thinking
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Stop organizing files.
            <br />
            Start organizing knowledge.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Your notes, documents and ideas become one searchable knowledge
            base powered by semantic search and AI.
          </p>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-8">

          {/* Capture */}

          <div className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40">
            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <NotebookPen className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Step 01
                </p>

                <h3 className="text-2xl font-semibold">
                  Capture
                </h3>
              </div>

            </div>

            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Write notes, upload Markdown or text documents, and keep
              everything in one place without worrying about folders or
              structure.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="h-10 w-px bg-border" />
          </div>

          {/* Understand */}

          <div className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40">
            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Step 02
                </p>

                <h3 className="text-2xl font-semibold">
                  Understand
                </h3>
              </div>

            </div>

            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Gemini embeddings transform your content into semantic vectors,
              making related ideas discoverable even when the words don't
              exactly match.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="h-10 w-px bg-border" />
          </div>

          {/* Retrieve */}

          <div className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40">
            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Step 03
                </p>

                <h3 className="text-2xl font-semibold">
                  Retrieve
                </h3>
              </div>

            </div>

            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Search naturally or chat with AI to instantly retrieve the
              information you need from your own knowledge base.
            </p>
          </div>

        </div>

      </section>

      {/* ================= Footer ================= */}

      <Footer />

    </main>
  );
}