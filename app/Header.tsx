import { ModeToggle } from "@/components/ui/mode-toggle"
import Link from "next/link"
import { Brain } from "lucide-react"
import { HeaderActions } from "./HeaderActions"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="mx-auto px-5 h-14 flex items-center justify-between">
                <div className="flex gap-25 items-center">
                <Link href="/" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    
                    <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                        <Brain className="w-4 h-4" />
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight" >
                        SecondBrain
                    </span>
                </div>
                </Link>
                <nav>
                    <Link href="/" className="text-primary/80 hover:text-foreground transition-colors">Documents</Link>
                </nav>
                </div>
                <div className="flex items-center gap-2">   
                    <ModeToggle />
                    <HeaderActions />
                </div>
            </div>
        </header>
    )
}