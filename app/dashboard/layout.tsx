import { ClipboardPenIcon, CogIcon, FilesIcon } from "lucide-react";
import Link from "next/link";
import SideNav from "./SideNav";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const authObj = await auth();
    console.log(authObj.userId)
    if(authObj.userId == null){
        redirect("/sign-in")
    }
    return (
        <div>
            <div className="flex min-h-screen m-auto">       
                    {/* sidebar */}
                    <SideNav />
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>

        </div>
    );
}