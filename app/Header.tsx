import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { UserButton, SignInButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated } from "convex/react"
import { Brain } from "lucide-react"
import { HeaderActions } from "./HeaderActions"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                        <Brain className="w-4 h-4" />
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight">
                        NeuroVault
                    </span>
                </div>
                <div className="flex items-center gap-2">   
                    <ModeToggle />
                    <HeaderActions />
                </div>

            </div>
        </header>
    )
}