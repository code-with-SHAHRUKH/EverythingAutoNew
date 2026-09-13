"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPageUrl } from "@/utils/createPageUrl";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Disc3,
  Search, 
  Zap, 
  Droplet, 
  LifeBuoy,
  Cog, 
  CheckCircle2,
  ArrowRight,
  PenTool,
  TowerControlIcon,
  Server
} from "lucide-react";


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";


gsap.registerPlugin(Observer);

const services = [
  { icon: '/car-engine.png', title: "Engine Repair", path: "EngineRepair", description: "Expert diagnostics and repair for engine troubles." },
  { icon: '/disc-brake.webp', title: "Brake Service", path: "BrakeService", description: "Ensuring your vehicle stops safely and reliably." },
  { icon: '/diagnostics.webp', title: "Diagnostics", path: "Diagnostics", description: "Pinpointing issues with check engine lights." },
  { icon: '/electric-system.webp', title: "Electrical Systems", path: "ElectricalSystems", description: "Fixing shorts, wiring, and battery issues." },
  { icon: '/oil-change.webp', title: "Oil Changes", path: "OilChanges", description: "Essential maintenance for engine longevity." },
  { icon: '/Tire-repairing.webp', title: "Wheel & Tire", path: "WheelTire", description: "Tire rotation, balancing, and replacement." },
  { icon: '/gear-Transmition.webp', title: "Transmission", path: "Transmission", description: "Smooth gear shifting and performance." },
  { icon: '/car-engine-diagnostic.webp', title: "NY State Inspection", path: "NYStateInspection", description: "Official vehicle safety and emissions testing." }
];



export default function ServicesOverview() {
  
//card 3d rotation
  const carouselRef = useRef<HTMLDivElement | null>(null);
const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const progress = useRef({ value: 0 });
  const [radius, setRadius] = useState(326);
// Mobileradius=160;
useEffect(() => {
  // on mount, screen size check
  const updateRadius = () => {
    if (window.innerWidth < 640) {
      // mobile
      setRadius(145);
    } else {
      // tablet/laptop/desktop
      setRadius(326);
    }
  };

  updateRadius(); // initial
  window.addEventListener("resize", updateRadius);

  const carousel = carouselRef?.current;
  const images = imagesRef.current;

  const observer = Observer.create({
    target: carousel,
    type: "wheel,pointer",
    onPress: () => {
      if (carousel) carousel.style.cursor = "grabbing";
    },
    onRelease: () => {
      if (carousel) carousel.style.cursor = "grab";
    },
    onChange: (self) => {
      gsap.killTweensOf(progress.current);
      const p =
        self.event.type === "wheel"
          ? self.deltaY * -0.0005
          : self.deltaX * 0.05;
      gsap.to(progress.current, {
        duration: 2,
        ease: "power4.out",
        value: `+=${p}`,
      });
    },
  });

  const animate = () => {
    const images = imagesRef.current;
    if (!images) return;

    progress.current.value -= 0.0008;

    images.forEach((image, index) => {
      const theta = index / images.length - progress.current.value;
      const x = -Math.sin(theta * Math.PI * 2) * radius;
      const y = Math.cos(theta * Math.PI * 2) * radius;
      if (image) {
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${
          360 * -theta
        }deg)`;
      }
    });
  };

  gsap.ticker.add(animate);

  return () => {
    observer.kill();
    gsap.ticker.remove(animate);
    window.removeEventListener("resize", updateRadius);
  };
}, [radius]); // radius dependency
  return (
    <section className="section-padding section-bg">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className="slide-in-up mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.45)]" />
            <p className="app-section-kicker">Our Expertise</p>
          </div>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Comprehensive Auto Repair Services
          </h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 via-blue-700 to-slate-800" />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[var(--color-text-light)] sm:text-lg sm:leading-8">
            From routine maintenance to complex repairs, our ASE-certified technicians have the skills and equipment to handle all your automotive needs with our digital inspection technology.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
            <span className="h-px w-10 bg-slate-900" />
            <span>12 specialist services</span>
            <span className="h-px w-10 bg-slate-900" />
          </div>
        </div>

<div
  ref={carouselRef}
  className="carousel relative mt-4 pb-14 flex items-center justify-center rounded-[2rem] border border-white/80 bg-white/70 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.9),0_20px_50px_rgba(15,23,42,0.06)] cursor-grab select-none"
  style={{
    width: "100%",
    height: "80vh",
    transform: "rotateX(-20deg) translateY(-70px)",
    transformStyle: "preserve-3d",
    perspective: "1400px",
  }}
>
{services.map((service, index) => (
  <div
    key={service.title}
    ref={(el) => {
      imagesRef.current[index] = el;
    }}
    className="
      mt-1
      mb-0
      md:mb-8
      sm:mb-6
      absolute
      w-[120px] h-[250px]        /* mobile */
      sm:w-[220px] sm:h-[260px]  /* tablet */
      md:w-[270px] md:h-[260px]  /* laptop/desktop (same height) */
    "
    style={{ transformOrigin: "50% 50%" }}
  >
    <Link
      href={createPageUrl(service.path)}
      className="block group h-full"
      aria-label={`Learn more about ${service.title}`}
    >
      <article
        className="
          app-panel app-panel-hover rounded-2xl border border-slate-300 bg-white/95 shadow-[0_8px_20px_rgba(15,23,42,0.12)]
          p-4 h-full
          flex flex-col items-center text-center
        "
      >
        {/* Icon */}
        <div className="mb-3">
       <Image
  src={service.icon}
  alt={service.title}
  width={80}
  height={80}
  sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
  className="object-contain"
/>

        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-md font-bold text-black mb-2 line-clamp-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[var(--color-text-light)] mb-4 line-clamp-3 sm:line-clamp-4">
          {service.description}
        </p>

        {/* Button */}
        <div className="mt-auto">
          <span
            className="text-xs sm:text-sm text-[var(--color-primary)]
                       flex items-center justify-center space-x-1 
                       transition-all duration-300 group-hover:translate-x-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  </div>
))}

</div>


        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
  {services.map((service, index) => (
    <Link
      href={createPageUrl(service.path)}
      key={service.title}
      className="block group"
      aria-label={`Learn more about ${service.title}`}
    >
      <article
        className="bg-white p-8 rounded-xl h-full border border-gray-200 luxury-shadow transition-all duration-500 hover:-translate-y-2 fade-in-scale flex flex-col items-center text-center"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="mb-5">
          <img
            src={service.icon}
            alt={service.title}
            className="w-18 h-20 object-contain"
          />
        </div>

        <h3 className="text-xl font-bold text-black mb-2">
          {service.title}
        </h3>

        <p className="text-[var(--color-text-light)] mb-4 text-base">
          {service.description}
        </p>

        <span className="text-[var(--color-primary)] font-semibold flex items-center space-x-2 transition-all duration-300 group-hover:translate-x-1">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </span>
      </article>
    </Link>
  ))}
</div> */}


        <div className="text-center fade-in-scale mt-14">
          <Link href={createPageUrl("Services")} aria-label="View all auto repair services">
            <Button 
                                              style={{
        boxShadow:
          "inset 0 -2px 5px rgba(165, 208, 255, 0.61), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 8px 14px rgba(0, 0, 0, 0.25)",
      }}
            size="lg" className="action-button action-button-book text-lg px-6 py-4">
               <Wrench className="w-5 h-5 mr-2" />
              View All Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}