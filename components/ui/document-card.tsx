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
          <Button className="rounded-lg" variant="secondary"><Eye className="mr-2 h-4 w-4" />View</Button>
        </CardFooter>
      </Card>
  )
}