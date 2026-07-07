import { ClipboardPenIcon, CogIcon, FilesIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex min-h-screen m-auto">
                <aside className="w-64 p-6 mt-10">
                    {/* sidebar */}
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    className="flex items-center gap-2 text-primary text-lg font-light hover:text-cyan-500 transition-colors"
                                    href="/dashboard/documents"><FilesIcon />Documents</Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-2 text-primary text-lg font-light hover:text-cyan-500 transition-colors"
                                    href="/dashboard/notes"><ClipboardPenIcon />Notes</Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-2 text-primary text-lg font-light hover:text-cyan-500 transition-colors"
                                    href="/dashboard/settings"><CogIcon />Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>


                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>


        </div>
    );
}