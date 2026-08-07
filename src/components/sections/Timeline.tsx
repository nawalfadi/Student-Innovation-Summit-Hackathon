"use client";

import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { DecorativeSwirl } from "@/components/brand/DecorativeSwirl";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, EASE_OUT } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-gradient-to-b from-navy via-navy-light to-navy-dark py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-gold/15 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]"
      />

      <DecorativeSwirl
        src="/decor/swirl-timeline.png"
        left={-173}
        top={413}
        width={502}
        height={489}
        opacity={0.28}
        flipY
      />
      <DecorativeSwirl
        src="/decor/swirl-timeline.png"
        left={938}
        top={443}
        width={502}
        height={489}
        opacity={0.28}
        flipY
      />

      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            dark
            badge={t.timeline.badge}
            title={t.timeline.title}
            subtitle={t.timeline.subtitle}
          />
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Animated spine */}
          <div
            aria-hidden
            className="absolute start-[1.35rem] top-3 bottom-3 w-px overflow-hidden sm:start-1/2 sm:-ms-px"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-cyan via-blue to-cyan/40"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            />
          </div>

          <ol className="relative space-y-8 sm:space-y-12">
            {t.timeline.days.map((day, index) => {
              const fromLeft = index % 2 === 0;

              return (
                <motion.li
                  key={`timeline-day-${index}`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                  className={`relative flex sm:items-center ${
                    fromLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node on the spine */}
                  <motion.div
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      show: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 360,
                          damping: 18,
                        },
                      },
                    }}
                    className="absolute start-[0.55rem] z-20 flex h-8 w-8 items-center justify-center sm:left-1/2 sm:-translate-x-1/2 sm:start-auto"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full bg-cyan/25"
                      animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.25,
                      }}
                    />
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan bg-navy text-xs font-black text-cyan shadow-[0_0_20px_rgba(0,212,255,0.45)]">
                      {index + 1}
                    </span>
                  </motion.div>

                  {/* Spacer for opposite half on desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card */}
                  <motion.article
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: fromLeft ? -36 : 36,
                        y: 18,
                      },
                      show: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 0.55, ease: EASE_OUT },
                      },
                    }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className={`ms-12 w-full sm:ms-0 sm:w-1/2 ${
                      fromLeft ? "sm:pe-10" : "sm:ps-10"
                    }`}
                  >
                    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-colors duration-300 hover:border-cyan/30 hover:bg-white/[0.1] sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-cyan">
                            {day.day}
                          </p>
                          <h3 className="mt-1 text-lg font-extrabold leading-snug text-white sm:text-xl">
                            {day.title}
                          </h3>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/80">
                          <Calendar size={15} className="text-cyan" />
                          <span dir="ltr">{day.date}</span>
                        </div>
                      </div>

                      <ul className="mt-5 space-y-2.5">
                        {day.items.map((item, itemIndex) => (
                          <motion.li
                            key={item}
                            variants={{
                              hidden: { opacity: 0, x: 12 },
                              show: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                  duration: 0.35,
                                  ease: EASE_OUT,
                                  delay: itemIndex * 0.04,
                                },
                              },
                            }}
                            className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.05] px-4 py-3 text-sm leading-7 text-white/80"
                          >
                            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cyan shadow-[0_0_10px_rgba(61,184,212,0.7)]" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
