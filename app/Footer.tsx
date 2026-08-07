import Link from "next/link";
import {
    Mail,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="mx-auto max-w-7xl px-6 py-8">

                <div className="grid gap-12 md:grid-cols-6">

                    {/* Brand */}
                    <div className="col-span-3">
                        <h2 className="text-2xl font-semibold">
                            Second Brain
                        </h2>

                        <p className="mt-4  leading-7 text-muted-foreground">
                            Store notes, upload documents, search semantically,
                            and chat with your knowledge using AI, all in one place.
                        </p>
                        <p className="leading-7 text-muted-foreground">
                            Open source on GitHub • Built by Kartik
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Navigation
                        </h3>

                        <div className="space-y-2 text-sm">
                            <Link
                                href="#features"
                                className="block text-muted-foreground transition hover:text-foreground"
                            >
                                Features
                            </Link>

                            <Link
                                href="/dashboard"
                                className="block text-muted-foreground transition hover:text-foreground"
                            >
                                Get Started
                            </Link>

                            <Link
                                href="https://github.com/maheshwarikartik1902-droid/Second-brain"
                                target="_blank"
                                className="block text-muted-foreground transition hover:text-foreground"
                            >
                                Source Code
                            </Link>
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Connect
                        </h3>

                        <div className="space-y-2 text-sm">

                            <Link
                                href="https://github.com/maheshwarikartik1902-droid/"
                                target="_blank"
                                className="flex items-center gap-3 text-muted-foreground transition hover:text-foreground"
                            >
                                
                                GitHub
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/kartik-maheshwari-"
                                target="_blank"
                                className="flex items-center gap-3 text-muted-foreground transition hover:text-foreground"
                            >
                                LinkedIn
                            </Link>
                        </div>
                    </div>

                    {/* Technology */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Technology
                        </h3>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>Next.js</p>
                            <p>TypeScript</p>
                            <p>Convex</p>
                            <p>Gemini</p>
                            <p>Tailwind CSS</p>
                            <p>Clerk</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}