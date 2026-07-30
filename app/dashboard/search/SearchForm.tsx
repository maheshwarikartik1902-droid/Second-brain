'use client'
import { useAction, useQuery } from "convex/react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Card } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { FieldError } from "@/components/ui/field";
import { Dispatch, SetStateAction } from "react";
import { SearchResult } from "@/convex/search";

const formSchema = z.object({
    search: z
        .string()
        .min(1, "Question is required")
        .max(100, "Question is too long"),

})


export function SearchForm({
        setResults,
        setIsLoading,
    }: {
        setResults: Dispatch<SetStateAction<SearchResult[] | null>>;
        setIsLoading: Dispatch<SetStateAction<boolean>>;
    }) {
    const searchAction = useAction(api.search.searchAction);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    })
    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await searchAction({ search: data.search }).then(setResults).finally(() => setIsLoading(false));
        form.reset();
    }

    return (
        <Card className="w-full rounded-3xl border border-zinc-700 bg-zinc-900 px-3 py-2">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-2"
            >
                <Controller
                    name="search"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <>
                            <Input
                                {...field}
                                placeholder="Search"
                                className="h-9 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </>
                    )}
                />

                <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                >
                    <SearchIcon className="h-4 w-4" />
                </Button>
            </form>
        </Card>
    )
}