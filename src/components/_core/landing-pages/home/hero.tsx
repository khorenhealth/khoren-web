"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import {
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
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: "ease-out-cubic",
            offset: 40,
        });
    }, []);

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
                            <Button
                                variant="outline"
                                className={ctaOutlineClassName}
                            >
                                Book Online Consultation
                            </Button>
                        </div>
                    </div>

                    <div
                        className="relative mx-auto w-[min(100%,420px)] shrink-0 lg:w-100"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <Image
                            src="/images/pngs/hero-image.png"
                            alt="Smiling doctor ready for telemedicine consultation"
                            width={400}
                            height={520}
                            priority
                            className="h-auto w-full rounded-3xl object-cover shadow-lg"
                            sizes="(max-width: 1024px) 400px, 520px"
                        />
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
