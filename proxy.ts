import { clerkMiddleware } from "@clerk/nextjs/server";

const isProduction = (process.env.NEXT_PUBLIC_CLERK_PROXY_URL)? true : false;

export default clerkMiddleware({
    frontendApiProxy: isProduction
        ? {
            enabled: true,
        }
        : undefined,
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/__clerk/(.*)",
    ],
};