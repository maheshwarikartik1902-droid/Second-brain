'use client'
import { Button } from "@/components/ui/button"
import { UserButton, SignInButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { Skeleton } from "@/components/ui/skeleton"

export function HeaderActions() {
    return (
        <div className="flex items-center gap-2">
            <Authenticated>
                <UserButton />
            </Authenticated>
            <Unauthenticated>
                <SignInButton mode="modal">
                    <Button size="sm">Sign In</Button>
                </SignInButton>
            </Unauthenticated>
            <AuthLoading>
                <Skeleton className="h-8 w-8 rounded-full" />
            </AuthLoading>
        </div>
    )
}