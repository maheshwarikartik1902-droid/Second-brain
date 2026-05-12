import { ClerkProvider } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react';
import { useAuth } from '@clerk/nextjs';
import { ConvexClient } from 'convex/browser';

const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}