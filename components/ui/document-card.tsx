import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import { Button } from "./button"
import { Eye } from "lucide-react"
import Link from "next/link"

export const DocumentCard = ({ document }: { document: Doc<'documents'> }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{document.content}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/document/${document._id}`}>
          <Button className="rounded-lg cursor-pointer"
            variant="secondary">
            <Eye className=" h-4 w-4" />
            View  
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}