'use client';

import { cn } from "@/lib/utils";
import {
    ClipboardPenIcon,
    CogIcon,
    FilesIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Documents",
        href: "/dashboard/document",
        icon: FilesIcon,
    },
    {
        name: "Notes",
        href: "/dashboard/notes",
        icon: ClipboardPenIcon,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: CogIcon,
    },
];

export default function SideNav() {
    const pathname = usePathname();

    return (
        <aside className="w-72 border-r border-border bg-background">
            <div className="sticky top-0 flex h-screen flex-col p-6">

                <nav className="space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;

                        const active = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                                    active
                                        ? "bg-accent text-foreground border border-border"
                                        : "text-muted-foreground hover:bg-accent"
                                )}
                            >
                                {active && (
                                    <span className="absolute left-0 h-6 w-0.5 rounded-r-full bg-primary" />
                                )}

                                <Icon className="h-5 w-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}