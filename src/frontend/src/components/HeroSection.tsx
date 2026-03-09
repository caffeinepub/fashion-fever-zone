import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden"
    >
      {/* Hero Image */}
      <img
        src="/assets/generated/hero-fashion.dim_1600x900.jpg"
        alt="Fashion Fever Zone – Style for Every Season"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Soft pastel gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-950/80 via-pink-900/50 to-purple-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-pink-900/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-pink-200 font-body text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          >
            New Collection 2026
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-4"
          >
            Fashion <span className="text-pink-300 italic">Fever</span>
            <br />
            Zone
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-body text-lg sm:text-xl text-rose-100/80 mb-10 max-w-md"
          >
            Style for Every Season
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#men">
              <Button
                data-ocid="hero.primary_button"
                className="bg-pink-400 hover:bg-pink-500 text-white font-body font-bold px-8 py-3 h-auto text-sm tracking-wider uppercase transition-all duration-300 shadow-lg border-0"
              >
                Shop Men
              </Button>
            </a>
            <a href="#women">
              <Button
                data-ocid="hero.secondary_button"
                variant="outline"
                className="border-2 border-pink-300 text-pink-200 hover:bg-pink-300 hover:text-rose-900 font-body font-bold px-8 py-3 h-auto text-sm tracking-wider uppercase transition-all duration-300"
              >
                Shop Women
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-rose-200/50"
      >
        <span className="text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
