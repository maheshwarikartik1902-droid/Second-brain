'use client';

import { useState } from "react";
import { ArrowUpRight, FileText, NotebookPen, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { SearchForm } from "./SearchForm";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function SearchPage() {
    const [results, setResults] = useState<(typeof api.search.searchAction._returnType | null)>(null);
    const [loading, setLoading] = useState(false);
    return (
        <div className="mx-auto max-w-4xl py-8 space-y-8">

            {/* Search Form */}
            <div className="w-full">
                <SearchForm setResults={setResults} setIsLoading={setLoading} />
            </div>

            {/* Initial State */}
            {loading ? (
                <div className="space-y-2 py-15">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="space-y-3 p-5">
                                <Skeleton className="h-3 w-3/4" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : results === null ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <Search className="mb-5 h-12 w-12 text-muted-foreground" />

                        <h2 className="text-xl font-semibold">
                            Search your Second Brain
                        </h2>

                        <p className="mt-2 max-w-md text-sm text-muted-foreground">
                            Try searching naturally like{" "}
                            <span className="font-medium text-foreground">
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
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Search Results
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {results.length} {results.length === 1 ? "result" : "results"} found
                        </p>
                    </div>

                    {results.length === 0 ? (
                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                                <Search className="mb-4 h-10 w-10 text-muted-foreground" />

                                <h3 className="text-lg font-semibold">
                                    No matching results found
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Try searching with different words or a broader phrase.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="flex flex-col gap-2 ">
                            {results.map((result) => {
                                const href =
                                    result.type === "note"
                                        ? `/dashboard/notes/${result._id}`
                                        : `/dashboard/document/${result._id}`;

                                return (
                                    <Link key={result._id} href={href}>
                                        <Card className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                                            <CardContent className="space-y-2">

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">

                                                        {result.type === "note" ? (
                                                            <>
                                                                <NotebookPen className="h-5 w-5 text-primary" />
                                                                <Badge variant="secondary">
                                                                    Note
                                                                </Badge>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FileText className="h-5 w-5 text-primary" />
                                                                <Badge variant="secondary">
                                                                    Document
                                                                </Badge>
                                                            </>
                                                        )}

                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="outline">
                                                            {(result._score * 100).toFixed(0)}% Match
                                                        </Badge>

                                                        <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                                    </div>
                                                </div>

                                                {/* Content */}

                                                {result.type === "note" ? (
                                                    <p className="text-sm leading-7 text-muted-foreground line-clamp-4">
                                                        {result.text}
                                                    </p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <h3 className="font-semibold text-lg">
                                                            {result.title}
                                                        </h3>

                                                        <p className="text-sm text-muted-foreground leading-7 line-clamp-3">
                                                            {result.content}
                                                        </p>
                                                    </div>
                                                )}

                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}