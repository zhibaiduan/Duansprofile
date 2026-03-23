"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const journeyData = [
  {
    period: "2013-2017",
    title: "Materials Engineering",
    description: "Foundation in science and analytical thinking",
    highlight: false,
  },
  {
    period: "2017-2021",
    title: "Build Several Products from Scratch",
    description: "From 0 to 1, learning by shipping",
    highlight: false,
  },
  {
    period: "2021-2022",
    title: "Gap Year",
    description: "Reflection, exploration, and reset",
    highlight: false,
  },
  {
    period: "2022-2024",
    title: "PM-Kingsoft",
    description: "Product management at scale",
    highlight: false,
  },
  {
    period: "2024-2025",
    title: "Learning German from scratch",
    description: "New language, new challenges",
    highlight: false,
  },
  {
    period: "2025-2026",
    title: "HTW",
    description: "Current chapter — deepening technical foundation",
    highlight: true,
  },
];

interface TimelineProps {
  subtitle?: string;
  // legacy compat — data is now internal
  nodes?: unknown[];
}

export default function Timeline({ subtitle }: TimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="timeline"
      ref={ref}
      className="py-24 px-6 bg-[#faf8f4] relative overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#c07a56]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[450px] h-[450px] bg-[#f59e0b]/4 rounded-full blur-[110px] pointer-events-none" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="relative mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#1c1917] mb-4 font-serif tracking-tight"
          >
            My Journey
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[15px] text-[#78716c] font-sans max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient connecting line */}
          <motion.div
            className="absolute top-3 left-0 right-0 h-[2px] hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, rgba(232,224,213,0.5), rgba(192,122,86,0.3), rgba(192,122,86,0.5))",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Cards grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-4">
            {journeyData.map((item, index) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pt-8"
              >
                {/* Dot on the line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="relative"
                  >
                    {/* Pulsing ring — current only */}
                    {item.highlight && (
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 w-3 h-3 rounded-full bg-[#c07a56]"
                      />
                    )}
                    <div
                      className={`w-3 h-3 rounded-full border-2 relative transition-all duration-300 ${
                        item.highlight
                          ? "border-[#c07a56] bg-[#c07a56] shadow-[0_0_12px_rgba(192,122,86,0.6)]"
                          : "border-[#c07a56]/40 bg-white"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -6,
                    boxShadow: "0px 12px 32px 0px rgba(28,25,23,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`bg-white/80 backdrop-blur-md rounded-xl p-5 shadow-[0px_2px_12px_0px_rgba(28,25,23,0.08)] border border-white/60 cursor-default relative overflow-hidden h-full ${
                    item.highlight ? "ring-2 ring-[#c07a56]/30" : ""
                  }`}
                >
                  {/* Inner glow */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#c07a56]/8 rounded-full blur-[40px] pointer-events-none" />
                  {item.highlight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c07a56]/8 via-transparent to-transparent pointer-events-none" />
                  )}
                  {/* Noise */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "100px 100px",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Period badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider ${
                          item.highlight
                            ? "bg-[#c07a56]/15 text-[#c07a56]"
                            : "bg-[#78716c]/10 text-[#78716c]"
                        }`}
                      >
                        {item.period}
                      </span>
                      {item.highlight && (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-[#c07a56]"
                        />
                      )}
                    </div>

                    {/* Title */}
                    <div className="text-base font-bold text-[#1c1917] mb-2 font-sans leading-snug min-h-[44px]">
                      {item.title}
                    </div>

                    {/* Description */}
                    <div className="text-[13px] text-[#78716c] leading-relaxed font-sans">
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
