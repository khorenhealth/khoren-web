"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { CirclePlay } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    CONSULTATION_URL,
    ctaOutlineClassName,
    ctaPrimaryClassName,
    ctaPrimaryStyle,
} from "../shared/cta-button-styles";
import { MarkGuard } from "../svg";

const features = [
    {
        title: "Telemedicine",
        description:
            "Video consultations with licensed doctors, anytime, from home.",
    },
    {
        title: "Online Consulting",
        description: "Direct chat and guidance from partnered pharmacists.",
    },
    {
        title: "Home Care",
        description:
            "Physiotherapy, caregiving, and nursing visits on subscription.",
    },
    {
        title: "Location Services",
        description:
            "A live map showing the nearest hospitals and the exact services each one offers.",
    },
];

const ellipsePositions = [
    // bottom left — clipped by left edge, behind CTAs
    { bottom: "8%", left: "-14%", opacity: 0.55 },
    // middle top — large glow behind portrait / under nav
    { top: "20%", left: "50%", opacity: 0.45, translateX: "-50%" },
    // mid right — half clipped by right edge, beside features
    { top: "36%", right: "-14%", opacity: 0.5 },
];

function BackgroundEllipses() {
    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
        >
            <div className="relative mx-auto h-full max-w-7xl">
                {ellipsePositions.map((pos, i) => (
                    <Image
                        key={i}
                        src="/images/svgs/ball-ellipse.svg"
                        alt=""
                        width={124}
                        height={124}
                        className="absolute"
                        style={{
                            top: pos.top,
                            left: pos.left,
                            right: pos.right,
                            bottom: pos.bottom,
                            opacity: pos.opacity,
                            transform: pos.translateX
                                ? `translateX(${pos.translateX})`
                                : undefined,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function HeroFeatures() {
    return (
        <div className="flex flex-col gap-8">
            {features.map((feature, index) => (
                <div
                    key={feature.title}
                    className="flex gap-4"
                    data-aos="fade-left"
                    data-aos-delay={100 + index * 100}
                >
                    <MarkGuard />
                    <div>
                        <h3 className="text-base font-semibold text-healiu-dark-dark">
                            {feature.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-healiu-dark">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: "ease-out-cubic",
            offset: 40,
        });
    }, []);

    const playVideo = async () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = false;
        try {
            await video.play();
            setIsPlaying(true);
        } catch {
            // Autoplay with sound can fail; keep controls available via button
            setIsPlaying(false);
        }
    };

    const pauseVideo = () => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        setIsPlaying(false);
    };

    return (
        <section
            className="relative overflow-x-hidden pb-16 md:pb-24"
            style={{
                background:
                    "radial-gradient(84.07% 84.07% at 67.84% 15.93%, #FFFFFF 0%, #E4EFFF 100%)",
            }}
        >
            <BackgroundEllipses />

            {/* Viewport-height hero content */}
            <div className="app-width relative z-10 mx-auto flex flex-col pt-20 sm:pt-24 ">
                <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-12">
                    <div className="max-w-lg">
                        <h1
                            className="text-3xl font-bold leading-tight tracking-tight text-healiu-dark-dark sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
                            data-aos="fade-up"
                        >
                            Healthcare that comes to you, and finds you the right hospital in
                            seconds.
                        </h1>
                        <p
                            className="mt-5 text-base leading-relaxed text-healiu-dark sm:text-lg"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            Telemedicine, online pharmacist consulting, home nursing and
                            physiotherapy, and a live hospital locator, all in one
                            subscription.
                        </p>
                        <div
                            className="mt-8 flex flex-wrap gap-4"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <Button
                                className={ctaPrimaryClassName}
                                style={ctaPrimaryStyle}
                            >
                                Get Started
                            </Button>
                            <a
                                href={CONSULTATION_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    className={ctaOutlineClassName}
                                >
                                    Book free Consultation
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div
                        className="relative mx-auto w-[min(100%,360px)] shrink-0 lg:w-90"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <video
                            ref={videoRef}
                            className="aspect-400/520 h-auto w-full rounded-3xl object-cover shadow-lg"
                            playsInline
                            preload="metadata"
                            poster="/images/pngs/joy-titus.jpeg"
                            aria-label="Khoren intro video"
                            onEnded={() => setIsPlaying(false)}
                            onClick={() => {
                                if (isPlaying) pauseVideo();
                            }}
                        >
                            <source
                                src="/images/videos/hero-intro.mp4"
                                type="video/mp4"
                            />
                        </video>

                        {!isPlaying && (
                            <button
                                type="button"
                                onClick={playVideo}
                                aria-label="Play video"
                                className="absolute cursor-pointer top-1/2 left-1/2 z-20 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_40px_rgba(11,105,201,0.28)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healiu-blue focus-visible:ring-offset-2 sm:size-20"
                            >
                                <CirclePlay
                                    className="size-10 text-healiu-blue sm:size-11"
                                    strokeWidth={1.75}
                                    absoluteStrokeWidth
                                />
                            </button>
                        )}

                        <div className="absolute inset-x-3 bottom-4 z-10 sm:inset-x-4 sm:bottom-5">
                            <div className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-[0_10px_30px_rgba(11,105,201,0.16)] sm:gap-3.5 sm:rounded-[1.25rem] sm:p-3">
                                <div className="relative size-12 shrink-0 overflow-hidden rounded-xl sm:size-14">
                                    <Image
                                        src="/images/pngs/joy-titus.jpeg"
                                        alt="Joy Titus"
                                        fill
                                        className="object-cover object-top"
                                        sizes="56px"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-healiu-dark-dark sm:text-base">
                                        Joy Titus
                                    </p>
                                    <p className="text-xs text-healiu-dark sm:text-sm">
                                       Meet the Founder
                                    </p>
                                </div>
                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-healiu-neutral-light px-2.5 py-1 text-xs font-medium text-healiu-dark-dark">
                                    <span className="size-1.5 rounded-full bg-healiu-green" />
                                    Available
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-sm lg:max-w-none lg:justify-self-end">
                        <HeroFeatures />
                    </div>
                </div>
            </div>

            {/* Extends below the min-h-screen fold */}



        </section>
    );
}
