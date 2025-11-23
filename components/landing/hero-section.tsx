"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColorBandBackground } from "@/components/landing/color-band-background";

const defaultProps = {
    title: "Dutyin turns every meeting into compact action.",
    subtitle:
        "Multi-agent follow-ups that summarize context, assign owners with deadlines, and tee up calendar-ready next steps, all before the next meeting starts.",
    ctaPrimary: { text: "Run the Dutyin demo", href: "/demo" },
    ctaSecondary: { text: "See the agent flow", href: "#how-it-works" },
};

const featureHighlights = [
    "Summary, Action, Decision agents",
    "Confidence + source snippets",
    "Calendar + tracker pushes",
];

type CTA = { text: string; href: string };

type HeroSectionProps = {
    title?: string;
    subtitle?: string;
    ctaPrimary?: CTA;
    ctaSecondary?: CTA;
    visualDiagramSrc?: string;
    className?: string;
};

function DiagramVisual({ visualDiagramSrc }: { visualDiagramSrc?: string }) {
    if (!visualDiagramSrc) {
        return (
            <div className="relative">
                <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{
                        duration: 14,
                        delay: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="grid gap-4 rounded-3xl border px-6 py-6 shadow-2xl backdrop-blur"
                    style={{
                        borderColor: "rgba(255,255,255,0.18)",
                        background: "rgba(8,12,28,0.7)",
                    }}
                >
                    {["Summary Agent", "Action Items Agent", "Tracker Agent"].map(
                        (label, index) => (
                            <div
                                key={label}
                                className="rounded-2xl border p-4"
                                style={{
                                    borderColor: "rgba(255,255,255,0.2)",
                                    background: "rgba(15,23,42,0.6)",
                                }}
                            >
                                <p className="text-xs uppercase text-cyan-100/90">
                                    Step {index + 1}
                                </p>
                                <p className="mt-1 text-base font-semibold text-[#f1f4ff]">
                                    {label}
                                </p>
                                <p className="text-sm text-[#cfd7ff]">
                                    Orchestrates insights, tasks, and reminders.
                                </p>
                            </div>
                        )
                    )}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative">
            <Image
                src={visualDiagramSrc}
                alt="Multi-agent flow"
                width={520}
                height={420}
                className="w-full"
            />
        </div>
    );
}

export function HeroSection({
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    ctaPrimary = defaultProps.ctaPrimary,
    ctaSecondary = defaultProps.ctaSecondary,
    visualDiagramSrc,
    className,
}: HeroSectionProps) {
    return (
        <section
            className={cn(
                "relative overflow-hidden rounded-[48px] px-6 py-16 text-[#e8ebff] md:px-16",
                className
            )}
            style={{
                background: "var(--hero-gradient)",
                boxShadow: "0 40px 120px rgba(5,6,22,0.65)",
            }}
        >
            <ColorBandBackground variant="hero" />
            <div className="relative z-10 grid gap-16 md:grid-cols-2 md:items-center">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
                >
                    <p className="mb-4 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100/90">
                        Multi-agent follow-up engine
                    </p>
                    <h1 className="text-4xl font-semibold leading-tight text-[#f6f8ff] md:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-6 text-lg text-[#c9d4ff]">{subtitle}</p>
                    <ul className="mt-6 grid gap-3 text-sm text-[#dfe6ff] sm:grid-cols-2">
                        {featureHighlights.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2"
                            >
                                <span className="h-2 w-2 rounded-full bg-emerald-200/80" aria-hidden />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Button
                            asChild
                            className="w-full sm:w-auto"
                            aria-label={ctaPrimary.text}
                        >
                            <Link href={ctaPrimary.href}>{ctaPrimary.text}</Link>
                        </Button>
                        {ctaSecondary && (
                            <Button
                                asChild
                                variant="ghost"
                                className="w-full border border-white/20 text-[#e9edff] hover:bg-white/10 sm:w-auto"
                                aria-label={ctaSecondary.text}
                            >
                                <Link href={ctaSecondary.href}>{ctaSecondary.text}</Link>
                            </Button>
                        )}
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
                >
                    <DiagramVisual visualDiagramSrc={visualDiagramSrc} />
                </motion.div>
            </div>
        </section>
    );
}
