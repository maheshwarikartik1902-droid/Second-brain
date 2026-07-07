'use client'
import { useAction, useQuery } from "convex/react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Card } from "@/components/ui/card";
import { ArrowUp} from "lucide-react";
import { FieldError } from "@/components/ui/field";


const formSchema = z.object({
    text: z
        .string()
        .min(1, "Question is required")
        .max(100, "Question is too long"),

})


export function QuestionForm({ DocumentId }: { DocumentId: Id<'documents'> }) {
    const askQuestion = useAction(api.documents.askQuestion);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })
    async function onSubmit(data: z.infer<typeof formSchema>) {
        await askQuestion({ question: data.text, DocumentId });
        form.reset();
    }

    return (
        <Card className="w-full max-w-3xl rounded-3xl border border-zinc-700 bg-zinc-900 px-3 py-2">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-2"
            >
                <Controller
                    name="text"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <>
                            <Input
                                {...field}
                                placeholder="Ask a question..."
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
                    <ArrowUp className="h-4 w-4" />
                </Button>
            </form>
        </Card>
    )
}