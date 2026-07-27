'use client';

import { useState } from "react";
import { Search } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import { SearchForm } from "./SearchForm";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function SearchPage() {
    const [notes, setNotes] = useState<Doc<"notes">[] | null>(null);

    return (
        <div className="mx-auto max-w-4xl py-8 space-y-8">

            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    Semantic Search
                </h1>

                <p className="text-muted-foreground">
                    Search your notes using AI instead of exact keywords.
                </p>
            </div>

            {/* Search Form */}
            <Card>
                <CardContent className="p-6">
                    <SearchForm setNotes={setNotes} />
                </CardContent>
            </Card>

            {/* Initial State */}
            {notes === null && (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <Search className="mb-5 h-12 w-12 text-muted-foreground" />

                        <h2 className="text-xl font-semibold">
                            Search your Second Brain
                        </h2>

                        <p className="mt-2 max-w-md text-sm text-muted-foreground">
                            Try searching naturally like
                            <span className="font-medium text-foreground">
                                {" "}
                                "Interview preparation"
                            </span>
                            ,{" "}
                            <span className="font-medium text-foreground">
                                "MongoDB indexing"
                            </span>
                            , or{" "}
                            <span className="font-medium text-foreground">
                                "React hooks"
                            </span>
                            .
                        </p>
                    </CardContent>
                </Card>
            )}

            {notes && (
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Search Results
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {notes.length} {notes.length === 1 ? "result" : "results"} found
                        </p>
                    </div>

                    {notes.length === 0 ? (
                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                                <Search className="mb-4 h-10 w-10 text-muted-foreground" />

                                <h3 className="text-lg font-semibold">
                                    No matching notes found
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Try searching with different words or a broader phrase.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-2">
                            {notes.map((note) => (
                                <Card
                                    key={note._id}
                                    className="cursor-pointer transition-all hover:border-primary hover:shadow-md hover:bg-accent"
                                >
                                    <CardContent className="px-5">
                                        <p className="text-sm leading-7 line-clamp-4">
                                            {note.text.substring(0, 230)+"..." }
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}