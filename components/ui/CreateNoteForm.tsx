import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
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
    text: z
        .string()
        .min(3, "Title must be at least 3 characters.")
        .max(2500, "Title must be at most 2500 characters."),

})

export function CreateNoteForm({ onUpload }: { onUpload: () => void }) {
    
    const createNote = useMutation(api.notes.createNote);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })
    async function onSubmit(data: z.infer<typeof formSchema>) {
        
        await createNote({
            text: data.text
        });
        onUpload();
    }
    return (
        <Card className="w-full sm:max-w-md">

            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="text"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Text
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Your note..."
                                        autoComplete="off"
                                    />
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

export default CreateNoteForm