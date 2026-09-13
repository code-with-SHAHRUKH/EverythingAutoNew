import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils/createPageUrl";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";

export default function HeroSection() {
  const videoUrl = "https://www.youtube.com/embed/bfDpZval4uQ?autoplay=1&mute=1&loop=1&playlist=bfDpZval4uQ&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0";

  return (
    <section className="relative isolate flex min-h-[calc(100vh-9rem)] items-center justify-center overflow-hidden bg-slate-950 text-white sm:min-h-[680px]">
      <div className="absolute inset-0 overflow-hidden bg-slate-950">
        <iframe
          src={videoUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Everything Auto Background Video"
          className="absolute left-1/2 top-1/2 z-0 h-full min-h-[100%] w-full min-w-[1100px] -translate-x-1/2 -translate-y-1/2 scale-[1.08] opacity-70"
        ></iframe>
        <div className="absolute inset-0 z-10 bg-[linear-gradient(105deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.78)_42%,rgba(15,23,42,0.38)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="max-w-3xl text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-200 shadow-lg shadow-blue-950/20">
            <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
            Trusted Auto Care in Franklin Square
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Honest, Quality Auto Repair
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Your family-owned shop with 17+ years of experience. We service all makes and models with a commitment to excellence and transparent pricing.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="tel:516-775-9724" className="w-full sm:w-auto">
              <Button
                style={{
                  boxShadow:
                    "inset 0 -2px 5px rgba(249, 195, 195, 0.65), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
                }}
                size="lg"
                className="action-button action-button-call flex w-full items-center justify-center px-7 py-6 text-base sm:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (516) 775-9724
              </Button>
            </a>
            <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                style={{
                  boxShadow:
                    "inset 0 -2px 5px rgba(138, 193, 252, 0.57), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
                }}
                size="lg"
                className="action-button action-button-book flex w-full items-center justify-center px-7 py-6 text-base sm:w-auto"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book an Appointment
              </Button>
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-white/20 pt-5 text-left">
            <div className="border-r border-white/20 pr-3">
              <p className="text-xl font-bold text-white sm:text-2xl">17+</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300 sm:text-xs">Years Experience</p>
            </div>
            <div className="border-r border-white/20 px-3">
              <p className="text-xl font-bold text-white sm:text-2xl">5-Star</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300 sm:text-xs">Local Service</p>
            </div>
            <div className="pl-3">
              <p className="text-xl font-bold text-white sm:text-2xl">All Makes</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300 sm:text-xs">Models Welcome</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}