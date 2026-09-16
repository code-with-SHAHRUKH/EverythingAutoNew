import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import ServicesOverview from "./components/ServicesOverview";
import  Video from "./components/video";
import GoogleReviews from "./components/GoogleReviews";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import FAQSection from "./components/faqs";
export const metadata: Metadata = {
  title: "Everything Auto | Reliable Auto Repair in Franklin Square, NY",
  description:
    "Everything Auto provides professional auto repair, maintenance, and diagnostics in Franklin Square, NY. Family-owned and trusted since 2008. Call (516) 775-9724 for expert service today!",
  keywords: [
    "auto repair Franklin Square NY",
    "car service Franklin Square",
    "brake repair Franklin Square",
    "engine diagnostics NY",
    "oil change Franklin Square",
    "car AC repair Franklin Square",
    "check engine light repair",
    "auto shop Franklin Square",
    "local mechanic Franklin Square",
    "wheel alignment Franklin Square",
    "tire balancing Franklin Square",
    "NY car inspection station",
    "vehicle maintenance Franklin Square",
    "automotive repair shop near me",
    "auto electrical repair NY",
    "car tune-up Franklin Square",
    "transmission repair Franklin Square",
    "suspension repair Franklin Square",
    "exhaust system repair NY",
    "battery replacement Franklin Square",
    "radiator repair Franklin Square",
    "auto diagnostics Franklin Square",
    "muffler repair Franklin Square",
    "car heating system repair",
    "fuel system cleaning NY",
    "check engine service Franklin Square",
    "timing belt replacement Franklin Square",
    "auto maintenance Franklin Square",
    "NY car care experts",
    "automotive service Franklin Square",
    "auto air conditioning service NY",
    "vehicle diagnostics Franklin Square",
    "affordable auto repair NY",
    "trusted car shop Franklin Square",
    "experienced mechanics Franklin Square",
    "auto body repair Franklin Square",
    "foreign car repair Franklin Square",
    "domestic vehicle repair NY",
    "professional auto technicians",
    "complete car service Franklin Square",
    "emission repair Franklin Square",
    "NY state vehicle inspection",
    "auto engine rebuild Franklin Square",
    "fuel injector cleaning NY",
    "brake pad replacement Franklin Square",
    "steering repair Franklin Square",
    "power window repair Franklin Square",
    "alternator repair Franklin Square",
    "auto cooling system repair",
    "hybrid vehicle repair Franklin Square",
    "SUV repair Franklin Square",
    "sedan repair NY",
    "truck maintenance Franklin Square",
    "car diagnostic testing Franklin Square",
    "car electrical issues Franklin Square",
    "ABS light repair Franklin Square",
    "auto repair experts Franklin Square",
    "Everything Auto Franklin Square",
    "family-owned auto shop NY",
    "auto tune up Franklin Square NY",
    "engine light diagnosis Franklin Square",
    "auto repair near Franklin Square",
    "local vehicle maintenance shop",
    "best mechanic Franklin Square",
    "5-star auto shop NY",
    "trusted auto specialists NY",
    "Everything Auto reviews Franklin Square",
    "affordable mechanic Franklin Square",
    "car exhaust replacement Franklin Square",
    "auto transmission flush NY",
    "brake system repair Franklin Square",
    "NY car AC recharge",
    "auto belt and hose repair NY",
    "mechanical repair Franklin Square",
    "reliable car repair Franklin Square",
    "quick oil change Franklin Square",
    "expert car diagnostics NY",
    "auto wheel balancing Franklin Square",
    "full service auto repair Franklin Square",
    "auto suspension diagnostics NY",
    "Everything Auto car service",
    "top-rated auto repair Franklin Square",
    "engine maintenance NY",
    "Franklin Square NY auto experts",
    "vehicle inspection Franklin Square",
    "auto exhaust diagnostics NY",
    "professional car repair Franklin Square",
    "auto shop with great reviews",
    "car repair services Franklin Square NY",
    "auto engine diagnostics Franklin Square",
    "tire rotation Franklin Square",
    "car repair and maintenance NY",
    "local car repair experts Franklin Square",
    "Everything Auto repair shop",
    "affordable car repair Franklin Square",
    "family auto repair NY",
    "auto tune-up shop Franklin Square",
    "trusted automotive center Franklin Square",
    "mechanic shop Franklin Square NY",
    "Everything Auto customer service",
    "vehicle repair Franklin Square NY",
    "Everything Auto Franklin Square reviews"
  ],
  openGraph: {
    title: "Everything Auto - Auto Repair in Franklin Square, NY",
    description:
      "Professional, honest, and affordable auto repair services in Franklin Square, NY. Family-owned since 2008. Call (516) 775-9724 today!",
    url: "https://everythingauto.com",
    siteName: "Everything Auto",
    images: [
      {
        url: "/every.png",
        width: 1200,
        height: 630,
        alt: "Everything Auto - Franklin Square NY",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://everythingauto.com"),
};

export default async function Home() {
  return (
    <>
      <HeroSection />
      <div className="section-bg">
        <ServicesOverview />
      </div>
      <GoogleReviews />
      <Video/>
      <FAQSection/>
      <section className="bg-gradient-to-b from-blue-900 to-gray-900 px-4 py-20 text-white sm:px-8 lg:py-24">
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-100 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />
            Trusted local auto care
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready for 5-Star Service?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Don&apos;t wait for a small problem to become a major repair. Get honest advice and dependable service from our Franklin Square team.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:516-775-9724" className="w-full sm:w-auto">
              <Button size="lg" className="action-button action-button-call flex w-full items-center justify-center px-6 py-4 text-lg sm:px-8">
                <Phone className="h-5 w-5" />
                CALL NOW: 516-775-9724
              </Button>
            </a>
            <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="action-button action-button-book flex w-full items-center justify-center px-6 py-4 text-lg sm:px-8">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
