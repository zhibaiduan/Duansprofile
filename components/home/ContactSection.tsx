"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:miumiuduan@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/xiaoyan-d-97a748304/" },
  { icon: Github, label: "GitHub", href: "https://github.com/zhibaiduan" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="contact"
      ref={ref}
      className="pt-16 pb-32 px-6 relative"
    >
      {/* Glow orbs */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#5b7a52]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-[#f59e0b]/8 rounded-full blur-[140px] animate-pulse pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#5b7a52]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6 leading-[1.1]">
            Let&apos;s Talk
          </h2>
          <p className="text-[15px] text-text-secondary font-sans max-w-2xl mx-auto leading-relaxed mb-8">
            Looking to work on{" "}
            <span className="font-semibold text-[#1c1917]">
              automation, enterprise tools, and AI-driven products
            </span>
            .<br />
            In PM or solution-focused roles.
          </p>

          {/* Status badges — sticker style */}
          <div className="flex justify-center gap-4 flex-wrap">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#edf5e4] text-[#3a6d15] text-sm font-semibold font-sans select-none"
              style={{
                border: '2px solid #57534e',
                boxShadow: '3px 3px 0px 0px #57534e',
                transform: 'rotate(-2deg)',
              }}
            >
              🟢 Available Now
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-[#1c1917] text-sm font-semibold font-sans select-none"
              style={{
                border: '2px solid #57534e',
                boxShadow: '3px 3px 0px 0px #57534e',
                transform: 'rotate(1.5deg)',
              }}
            >
              📍 Berlin
            </span>
          </div>
        </motion.div>

        {/* Social icon circles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-6 mb-12"
        >
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-[0px_2px_8px_0px_rgba(28,25,23,0.08)] hover:shadow-[0px_8px_24px_0px_rgba(28,25,23,0.12)] flex items-center justify-center group relative overflow-hidden transition-shadow"
              aria-label={link.label}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5b7a52]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <link.icon className="w-5 h-5 text-[#5b7a52] group-hover:text-[#4a6542] transition-colors relative z-10" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-[#78716c]/60 font-sans"
        >
          Scroll survived? Coffee&apos;s on me ☕
        </motion.p>
      </div>
    </section>
  );
}
