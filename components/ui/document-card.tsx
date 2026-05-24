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

export const DocumentCard = ({ document }: { document: Doc<'documents'> }) => {
  return (
      <Card className="">
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <CardDescription></CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button className="rounded-lg" variant="secondary">View</Button>
        </CardFooter>
      </Card>
  )
}