import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from "lucide-react"


const formSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters.")
        .max(32, "Title must be at most 32 characters."),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters.")
        .max(1000, "Description must be at most 1000 characters."),
    file: z.instanceof(File),

})

export function UploadDocumentForm({ onUpload }: { onUpload: () => void }) {
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
    const createDocument = useMutation(api.documents.createDocument);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    async function onSubmit(data: z.infer<typeof formSchema>) {
        const uploadUrl = await generateUploadUrl();

        const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": data.file.type },
            body: data.file,
        });
        const {storageId} = await result.json();
        await createDocument({
            title: data.title,
            content: data.description,
            fileId: storageId,
        });
        onUpload();
    }
    return (
        <Card className="w-full sm:max-w-md">
            {/*<CardHeader>
                <CardTitle>Bug Report</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>*/}
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Document Title"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="file"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        File
                                    </FieldLabel>
                                    <Input
                                        type="file"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                field.onChange(e.target.files[0]);
                                            }
                                        }}
                                        accept=".txt, .doc, .docx, .pdf"
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="Content."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/1000 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo"
                        className="flex items-center justify-center"
                        disabled={form.formState.isSubmitting}
                        onClick={() => { form.handleSubmit(onSubmit)() }}>
                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {form.formState.isSubmitting ? "Uploading" : "Upload"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}

export default UploadDocumentForm