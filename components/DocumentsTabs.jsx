import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const DocumentsTabs = () =>{
    return(
    <Tabs defaultValue="account" className="w-100">
        <TabsList>
            <TabsTrigger value="account">Documents</TabsTrigger>
            <TabsTrigger value="password">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
    )
}