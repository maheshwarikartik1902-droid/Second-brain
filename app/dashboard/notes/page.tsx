import CreateNoteButton from "@/components/ui/CreateNoteButton";

export default function NotesPage() {
    return (
        <div className="flex justify-between items-center my-8">
            <h1 className="text-4xl font-bold">Notes</h1>

            <CreateNoteButton />
        </div>
    
    )
}