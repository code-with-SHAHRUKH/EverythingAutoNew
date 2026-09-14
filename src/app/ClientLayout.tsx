"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAudioStore } from "@/store";
import { usePathname } from 'next/navigation';
import { createPageUrl } from "@/utils/createPageUrl";
import './globals.css'; // ✅ relative path to the CSS file
import { useBackgroundAudio } from "@/hooks/useBackgroundAudio";
import {
    Phone,
    MapPin,
    Mail,
    Play,
    Pause,
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    Menu,
    ChevronDown,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Inter } from 'next/font/google';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "about" },
    {
        name: "Services",
        path: "services",
        submenu: [
            { name: "Engine Repair", path: "engine-repair" },
            { name: "Brake Service", path: "brake-service" },
            { name: "Diagnostics", path: "diagnostics" },
            { name: "Electrical Systems", path: "electrical-systems" },
            { name: "Oil Changes", path: "oil-changes" },
            { name: "Wheel & Tire", path: "wheeltire" },
            { name: "Transmission", path: "transmission" },
            { name: "Air Conditioning", path: "air-conditioning" },
            { name: "Preventative Maintenance", path: "preventative-maintenance" },
            { name: "Battery Services", path: "battery-services" },
            { name: "NY State Inspection", path: "ny-state-inspection" },
            { name: "Suspension & Steering", path: "suspensionsteering" }
        ]
    },
    { name: "Car Care Plans", path: "car-care-plans" },
    { name: "Reviews", path: "reviews" },
     { name: "Faqs", path: "faqs" },
    { name: "Videos", path: "videos" },
    // { name: "Blog", path: "blog" },
    { name: "Contact", path: "contact" }
];

const socialLinks = [
    {
        name: "Facebook",
        icon: Facebook,
        url: "https://www.facebook.com/everythingautony/",
        color: "#1877F2"   // Official Facebook Blue
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: "https://www.instagram.com/everythingautony",
        color: "linear-gradient(45deg,#F58529,#FEDA77,#DD2A7B,#8134AF,#515BD4)" // Official Instagram Gradient
    },
    {
        name: "Youtube",
        icon: Youtube,
        url: "https://www.youtube.com/@EverythingAutoNY",
        color: "#FF0000"   // Official YouTube Red
    },
    {
        name: "Twitter",
        icon: Twitter,
        url: "https://x.com/everythngautony",
        color: "#000000"   // New Twitter (X) Black
    }
];
const inter = Inter({ subsets: ['latin'] });

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const location = usePathname();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [footerServicesOpen, setFooterServicesOpen] = React.useState(true);

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { playAudio, pauseAudio, isPlaying } = useAudioStore();
    useBackgroundAudio(); //initialize the audio once
  const isNavigationItemActive = (item: typeof navigationItems[number]) => {
    const currentPath = location.toLowerCase();
    return item.path === "/"
      ? currentPath === "/"
      : currentPath.includes(item.path.toLowerCase()) ||
        Boolean(item.submenu?.some((subItem) => currentPath.includes(subItem.path.toLowerCase())));
  };

    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("config", "AW-17073409546/IXiOCMjWqsgaEIqcns0_", {
                phone_conversion_number: "5167759724"
            })
        }
    })
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const handleToggle = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "Everything Auto",
        "image": "https://qtrypzzcjebvfcihiynt.suabase.co/storage/v1/object/public/base44-prod/public/09d6b1a90_pngglowlogo1.png",
        "@id": "https://everythingauto.com",
        "url": "https://everythingauto.com",
        "telephone": "+1-516-775-9724",
        "email": "EverythingAutoNewYork@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "980 Washington St",
            "addressLocality": "Franklin Square",
            "addressRegion": "NY",
            "postalCode": "11010",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.706130,
            "longitude": -73.681120
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        },
        "sameAs": socialLinks.map(link => link.url)
    };

    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                <div className="min-h-screen bg-gray-50 text-gray-900">
                    {/* <elevenlabs-convai agent-id="agent_5401k2914egmftwbxr7k40bpf22t"></elevenlabs-convai> */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                    />


                    {/* Top Bar */}
                    <div
                        style={{
                            boxShadow:
                                "inset 0 -2px 5px rgba(138, 193, 252, 0.44), inset 0 2px 5px rgba(19, 19, 19, 0.6), 0 2px 5px rgba(0, 0, 0, 0.11)",
                        }}
                        className="border-b border-blue-300/40 bg-gradient-to-b from-blue-800 to-gray-800 px-4 py-2 text-xs text-white shadow-[0_2px_8px_rgba(15,23,42,0.35)] sm:px-8 sm:text-sm md:px-10 lg:px-20"
                    >
                        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4 sm:text-left">
                            {/* Left side: Contact info */}
                            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 rounded-full border border-white/20 bg-white/[0.06] px-2 py-1 shadow-inner sm:justify-start">
                                <a
                                    href="tel:5167759724"
                                    className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-blue-200"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>(516) 775-9724</span>
                                </a>
                                <a
                                    href="https://www.google.com/maps/place/980+Washington+St,+Franklin+Square,+NY+11010"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden items-center gap-2 text-blue-100 transition-colors hover:text-white md:flex"
                                >
                                    <MapPin className="w-4 h-4" />
                                    <span>980 Washington St, Franklin Square, NY 11010</span>
                                </a>
                                <a
                                    href="mailto:EverythingAutoNewYork@gmail.com"
                                    className="hidden items-center gap-2 text-blue-100 transition-colors hover:text-white lg:flex"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>EverythingAutoNewYork@gmail.com</span>
                                </a>
                            </div>



                            <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/15 bg-black/10 px-2 py-1 shadow-inner sm:justify-start sm:gap-4">
                                {/* Social Links */}
                                <div className="flex items-center gap-1.5">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.name}
                                            title={link.name}
                                            className="rounded-full p-1.5 transition-transform hover:scale-110"
                                            style={{
                                                background: link.color,
                                                boxShadow:
                                                    "inset 0 -2px 3px rgba(255, 255, 255, 0.48), inset 0 2px 2px rgba(19, 19, 19, 0.61)",
                                            }}
                                        >
                                            <link.icon className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Main Header */}
                    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-10">
                            <div className="flex min-h-16 items-center justify-between gap-4">
                                {/* Logo */}
                                <Link href='/' className="relative z-20 flex-shrink-0 cursor-pointer rounded-xl transition-transform duration-300 hover:scale-[1.03]">
                                    <Image
                                        src="/every.png"
                                        alt="Everything Auto - Expert Auto Repair in Franklin Square, NY"
                                        width={150}   // apni zarurat ke mutabiq width set karo
                                        height={150}   // apni zarurat ke mutabiq height set karo
                                        className="header-logo h-14 w-auto object-contain"
                                    />
                                </Link>

                                {/* Desktop Navigation - Centered */}
                                <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 shadow-inner xl:gap-2">
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      href={createPageUrl(item.path)}
                      className={`relative flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold text-xs transition-all duration-200 xl:px-3 xl:text-sm 2xl:text-base ${
                        isNavigationItemActive(item)
                          ? "bg-gradient-to-b from-blue-800 to-gray-800 text-white shadow-lg"
                          : "text-slate-700 hover:bg-white hover:text-blue-700 hover:shadow-sm"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.submenu && <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />}
                    </Link>
                    {item.submenu && (
                      <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl shadow-slate-900/15 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={createPageUrl(subItem.path)}
                            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>


                                {/* CTA Buttons */}
                                <div className="hidden items-center gap-2 lg:flex xl:gap-3">
                                    <a href="tel:516-775-9724">
                                        <Button
                                            style={{
                                                boxShadow:
                                                    "inset 0 -2px 5px rgba(249, 195, 195, 0.65), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
                                            }}
                                            className="action-button action-button-call md:text-sm 2xl:px-6 2xl:text-base px-4 xl:px-4 md:px-2 py-2 xl:py-3 text-sm xl:text-sm flex items-center">
                                            <Phone className="w-4 h-4 mr-1" />
                                            CALL NOW
                                        </Button>
                                    </a>
                                    <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer">
                                        <Button
                                            style={{
                                                boxShadow:
                                                    "inset 0 -2px 5px rgba(138, 193, 252, 0.57), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
                                            }}
                                            className="action-button action-button-book px-4 md:px-2 md:text-sm xl:px-4 py-2 xl:py-3 2xl:px-6 2xl:text-base text-sm xl:text-sm">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            Book Appointment
                                        </Button>
                                    </a>

                                </div>

                                {/* Mobile Menu */}
                                <div className="lg:hidden">
                                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                        <SheetTrigger asChild>
                                            <Button className="flex items-center w-12 h-12 border-black justify-center" variant="outline" size="icon">
                                                <Menu className=" !w-10 !h-10" />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent className="w-80">
                                            <nav className="flex flex-col space-y-2 mt-8">
                                                <Accordion type="single" collapsible className="w-full">
                                                    {navigationItems.map((item) => item.submenu ? (
                                                        <AccordionItem value={item.name} key={item.name}>
                                                            <AccordionTrigger className="font-bold text-lg hover:no-underline text-gray-900">{item.name}</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="flex flex-col space-y-1 pl-4">
                                                                    {item.submenu.map(subItem => (
                                                                        <Link
                                                                            key={subItem.name}
                                                                            href={createPageUrl(subItem.path)}
                                                                            className="block py-2 text-gray-600 hover:text-[var(--color-primary)]"
                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ) : (
                                                        <Link
                                                            key={item.name}
                                                            href={createPageUrl(item.path)}
                                                            className={`block py-3 font-bold text-lg border-b ${location === `/${item.path.toLowerCase()}` || (item.path === "/" && location === "/")
                                                                ? "text-[var(--color-primary)]"
                                                                : "text-gray-800 hover:text-[var(--color-primary)]"
                                                                }`}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </Accordion>
                                            </nav>
                                            <div className="mt-8 space-y-3">
                                                <a href="tel:516-775-9724" className="w-full block">
                                                    <Button className="action-button action-button-call w-full px-4 py-2 text-lg flex items-center justify-center space-x-1 xl:px-6 xl:py-3">
                                                        <Phone className="w-4 h-4" />
                                                        <span>(516) 775-9724</span>
                                                    </Button>
                                                </a>
                                                <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer" className="w-full block">

                                                    <Button className="action-button action-button-book w-full px-4 text-lg flex items-center justify-center xl:px-6 xl:py-3">
                                                        <Calendar className="w-4 h-4" />
                                                        Book Appointment</Button>
                                                </a>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1">{children}</main>

                    <button
                        type="button"
                        onClick={handleToggle}
                        aria-label={isPlaying ? "Pause background audio" : "Play background audio"}
                        title={isPlaying ? "Pause background audio" : "Play background audio"}
                        className={`fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-2 ring-white/80 transition-all duration-300 hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:bottom-8 sm:right-8 ${
                            isPlaying ? "audio-button-playing shadow-blue-500/60" : ""
                        }`}
                    >
                        {isPlaying ? (
                            <Pause className="h-5 w-5" />
                        ) : (
                            <Play className="h-5 w-5" />
                        )}
                    </button>

                    {/* Footer */}
                  <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 section-padding sm:px-6">
          <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* About */}
            <div className="flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">
              <Link href={createPageUrl("Home")} className="mb-4 cursor-pointer">
                <Image
    src="/every.png"
  alt="Everything Auto Logo"
  width={180}   // apni zarurat ke hisaab se adjust karein
  height={60}   // apni zarurat ke hisaab se adjust karein
  className="footer-logo h-32 max-w-[12rem] object-contain sm:h-36"
/>
              </Link>
              <p className="max-w-xs text-sm leading-7 text-gray-400">
                Franklin Square&apos;s trusted family-owned auto repair shop since 2008. We are committed to providing honest, high-quality service for all makes and models.
              </p>
            </div>

            {/* Services Links */}
            <div>
              <button
                type="button"
                // onClick={() => setFooterServicesOpen((open) => !open)}
                aria-expanded={footerServicesOpen}
                className="app-focus-ring mb-5 flex w-full items-center justify-between gap-3 text-left text-sm font-extrabold uppercase tracking-[0.18em] text-white"
              >
                <span className="flex items-center gap-3"><span className="h-5 w-1 rounded-full bg-red-500" />Our Services</span>
                {/* <ChevronDown className={`h-5 w-5 text-blue-300 transition-transform duration-300 ${footerServicesOpen ? "rotate-180" : ""}`} /> */}
              </button>
              <div className={`grid transition-all duration-300 ${footerServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"}`}>
                <ul className="grid min-h-0 grid-cols-1 gap-x-5 gap-y-3 overflow-hidden text-sm sm:grid-cols-2 lg:grid-cols-1">
                  {navigationItems.find((item) => item.name === "Services")?.submenu?.map((service) => (
                    <li key={service.name}>
                      <Link href={createPageUrl(service.path)} className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
                        <span className="h-1 w-1 rounded-full bg-blue-400 transition-transform group-hover:scale-150" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="self-start rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h4 className="mb-5 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white"><span className="h-5 w-1 rounded-full bg-blue-500" />Contact Info</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start space-x-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                  <a href="https://www.google.com/maps/place/980+Washington+St,+Franklin+Square,+NY+11010" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    980 Washington St<br/>Franklin Square, NY 11010
                  </a>
                </li>
                 <li className="flex items-start space-x-3">
                  <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                  <a href="tel:516-775-9724" className="transition-colors hover:text-white">(516) 775-9724</a>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                  <a href="mailto:everythingautonewyork@gmail.com" className="break-all transition-colors hover:text-white">everythingautonewyork@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Business Hours */}
            <div className="self-start rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h4 className="mb-5 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white"><span className="h-5 w-1 rounded-full bg-red-500" />Business Hours</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
                    Mon - Sat: 8:00 AM - 6:00 PM
                  </a>
                </li>
                <li>Sunday: Closed</li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                          {socialLinks.map(link => (
    <a
      key={link.name}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full p-2 transition-transform hover:scale-110"
      style={{
        background: link.color,
        boxShadow:
          "inset 0 -3px 6px rgba(255, 255, 255, 0.4), inset 0 3px 6px rgba(19, 19, 19, 0.61), 0 3px 7px rgba(0, 0, 0, 0.11)",
      }}
    >
      <link.icon className="w-5 h-5 text-white" />
    </a>
  ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs tracking-wide text-gray-500">
            <span>&copy; {new Date().getFullYear()} Everything Auto. All Rights Reserved.</span>
          </div>
        </div>
      </footer>

                </div>
            </body>

        </html>
    );
}

