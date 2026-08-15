import { clerkMiddleware } from "@clerk/nextjs/server";

const isProduction = process.env.NODE_ENV === "production";

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
        ...(isProduction ? ["/__clerk/(.*)"] : []),
    ],
};