import { ClipboardPenIcon, CogIcon, FilesIcon } from "lucide-react";
import Link from "next/link";
import SideNav from "./SideNav";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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