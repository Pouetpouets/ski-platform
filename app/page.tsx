import Link from 'next/link';
import {
  Mountain,
  MapPin,
  Snowflake,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

/* ─── SVG Components ─── */

function PineTree({ x, height, color }: { x: number; height: number; color: string }) {
  const w = height * 0.45;
  return (
    <polygon
      points={`${x},${-height} ${x + w},${0} ${x - w},${0}`}
      fill={color}
    />
  );
}

function WinterScene() {
  return (
    <svg
      viewBox="0 0 1440 500"
      className="absolute bottom-0 w-full"
      preserveAspectRatio="none"
      style={{ height: '55%' }}
    >
      <defs>
        <linearGradient id="snow1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8edf5" />
          <stop offset="100%" stopColor="#f0f4fa" />
        </linearGradient>
        <linearGradient id="snow2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#edf1f8" />
          <stop offset="100%" stopColor="#f5f7fb" />
        </linearGradient>
        <linearGradient id="snow3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f2f5fb" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {/* Back snow hill */}
      <path
        d="M0,500 L0,300 Q100,240 220,270 Q380,200 520,260 Q650,190 800,240 Q950,170 1100,230 Q1250,180 1350,220 Q1400,200 1440,240 L1440,500 Z"
        fill="url(#snow1)"
      />
      <g transform="translate(0, 295)">
        <PineTree x={80} height={55} color="#7ba4c9" />
        <PineTree x={150} height={40} color="#8bb3d4" />
        <PineTree x={320} height={50} color="#7ba4c9" />
        <PineTree x={490} height={45} color="#8bb3d4" />
        <PineTree x={560} height={35} color="#7ba4c9" />
        <PineTree x={750} height={55} color="#8bb3d4" />
        <PineTree x={830} height={40} color="#7ba4c9" />
        <PineTree x={1000} height={50} color="#8bb3d4" />
        <PineTree x={1100} height={35} color="#7ba4c9" />
        <PineTree x={1250} height={45} color="#8bb3d4" />
        <PineTree x={1380} height={55} color="#7ba4c9" />
      </g>

      {/* Middle snow hill */}
      <path
        d="M0,500 L0,340 Q150,290 300,320 Q450,270 600,310 Q750,260 900,300 Q1050,250 1200,290 Q1350,270 1440,300 L1440,500 Z"
        fill="url(#snow2)"
      />
      <g transform="translate(0, 340)">
        <PineTree x={200} height={60} color="#5a8db8" />
        <PineTree x={280} height={45} color="#6b9dc5" />
        <PineTree x={620} height={55} color="#5a8db8" />
        <PineTree x={700} height={40} color="#6b9dc5" />
        <PineTree x={920} height={60} color="#5a8db8" />
        <PineTree x={1150} height={50} color="#6b9dc5" />
        <PineTree x={1320} height={45} color="#5a8db8" />
      </g>

      {/* Front snow hill */}
      <path
        d="M0,500 L0,390 Q180,350 360,375 Q540,340 720,365 Q900,330 1080,360 Q1260,340 1440,370 L1440,500 Z"
        fill="url(#snow3)"
      />
      <g transform="translate(0, 385)">
        <PineTree x={60} height={70} color="#4a7da8" />
        <PineTree x={140} height={50} color="#5a8db8" />
        <PineTree x={400} height={65} color="#4a7da8" />
        <PineTree x={1050} height={70} color="#4a7da8" />
        <PineTree x={1140} height={50} color="#5a8db8" />
        <PineTree x={1400} height={60} color="#4a7da8" />
      </g>
    </svg>
  );
}

/* ─── Hero: Pure immersion ─── */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Pastel sky */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #c8d5f0 0%, #d4c8e8 25%, #e8c8d8 50%, #f0d0c8 70%, #e8ddd5 85%, #edf1f8 100%)',
        }}
      />

      {/* Subtle snowflakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${8 + i * 10}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.4}s`,
            }}
          >
            <Snowflake className="h-3.5 w-3.5 text-white/40" />
          </div>
        ))}
      </div>

      <WinterScene />

      {/* Content — minimal, centered above the landscape */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto -mt-28">
        <p className="text-sm font-medium text-slate-500/80 tracking-widest uppercase mb-6">
          PeakPick
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-slate-800">
          Pick your
          <br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            perfect
          </span>{' '}
          ski day
        </h1>

        <p className="mt-8 text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
          Snow, crowds, weather, price — one score tells you where to go. Open the map. Pick a resort. Go ski.
        </p>

        <Link
          href="/map"
          className="group inline-flex items-center gap-2.5 mt-10 px-8 py-4 bg-slate-800 text-white font-semibold rounded-full hover:bg-slate-700 transition-all duration-200 shadow-lg shadow-slate-800/15 hover:shadow-xl hover:-translate-y-0.5"
        >
          <MapPin className="h-5 w-5" />
          Explore the map
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="h-6 w-6 text-slate-400/40" />
      </div>
    </section>
  );
}

/* ─── Promise: Emotional, not functional ─── */

function PromiseSection() {
  return (
    <section className="py-32 sm:py-40 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-8">
          The problem
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.15]">
          Every ski morning, the same question.
          <span className="block mt-3 text-slate-400 dark:text-slate-500">
            Five websites. Conflicting info. No clear answer.
          </span>
        </h2>
        <div className="mt-12 h-px w-16 bg-slate-200 dark:bg-slate-800 mx-auto" />
        <p className="mt-12 text-xl sm:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          PeakPick replaces the guesswork with a single number: your{' '}
          <span className="text-foreground font-semibold">Perfect Day Score</span>.
          One look at the map, and you know exactly where to go.
        </p>
      </div>
    </section>
  );
}

/* ─── Journey: 3 steps as storytelling ─── */

function JourneySection() {
  const steps = [
    {
      number: '01',
      title: 'Open the map',
      description: 'GPS locates you. Resorts appear around you with color-coded scores — green means go.',
      visual: '🗺️',
    },
    {
      number: '02',
      title: 'Compare at a glance',
      description: 'Snow depth, crowd levels, weather, lift prices, parking — everything condensed into one score per resort.',
      visual: '✨',
    },
    {
      number: '03',
      title: 'Go ski',
      description: 'Tap the best score. Check the webcam. Close your phone. Have the best day on the slopes.',
      visual: '⛷️',
    },
  ];

  return (
    <section className="py-32 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-8 text-center">
          How it works
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center mb-20">
          From couch to chairlift
          <span className="block text-slate-400 dark:text-slate-500 mt-2">in under two minutes.</span>
        </h2>

        <div className="space-y-20 sm:space-y-28">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12">
              <div className="flex-shrink-0 flex items-center gap-5">
                <span className="text-6xl">{step.visual}</span>
                <span className="text-5xl sm:text-6xl font-bold text-slate-200 dark:text-slate-800 leading-none">
                  {step.number}
                </span>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Resorts: Names that evoke the mountains ─── */

function ResortsSection() {
  const resorts = [
    { name: 'Chamonix', altitude: '1,035 — 3,842m' },
    { name: 'Val d\'Isere', altitude: '1,785 — 3,456m' },
    { name: 'Courchevel', altitude: '1,300 — 2,738m' },
    { name: 'Les Arcs', altitude: '1,200 — 3,226m' },
    { name: 'Tignes', altitude: '1,550 — 3,456m' },
    { name: 'Meribel', altitude: '1,100 — 2,952m' },
    { name: 'La Plagne', altitude: '1,250 — 3,250m' },
    { name: 'Megeve', altitude: '1,113 — 2,353m' },
    { name: 'Alpe d\'Huez', altitude: '1,250 — 3,330m' },
    { name: 'La Clusaz', altitude: '1,040 — 2,600m' },
    { name: 'Les Deux Alpes', altitude: '1,300 — 3,600m' },
    { name: 'Le Grand-Bornand', altitude: '1,000 — 2,100m' },
  ];

  return (
    <section className="py-32 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-8 text-center">
          Coverage
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center mb-6">
          The French Alps, at a glance.
        </h2>
        <p className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-16">
          From legendary powder fields to family-friendly slopes. Twelve resorts between Lyon, Grenoble, Annecy, and Geneva.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {resorts.map((resort) => (
            <div
              key={resort.name}
              className="group p-5 rounded-2xl border border-border/50 bg-card hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all duration-200"
            >
              <p className="font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {resort.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {resort.altitude}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA: Simple, with winter scene ─── */

function CTASection() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #c8d5f0 0%, #d4c8e8 40%, #e8c8d8 70%, #edf1f8 100%)',
        }}
      />

      <svg
        viewBox="0 0 1440 180"
        className="absolute bottom-0 w-full"
        preserveAspectRatio="none"
        style={{ height: '35%' }}
      >
        <path
          d="M0,180 L0,100 Q200,50 400,80 Q600,30 800,70 Q1000,20 1200,60 Q1350,40 1440,70 L1440,180 Z"
          fill="#f0f4fa"
        />
        <g transform="translate(0, 95)">
          <PineTree x={150} height={45} color="#6b9dc5" />
          <PineTree x={350} height={35} color="#7ba4c9" />
          <PineTree x={700} height={50} color="#5a8db8" />
          <PineTree x={1050} height={40} color="#6b9dc5" />
          <PineTree x={1300} height={45} color="#7ba4c9" />
        </g>
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight leading-[1.1]">
          Your next great
          <br />
          ski day starts here.
        </h2>
        <Link
          href="/map"
          className="group inline-flex items-center gap-2.5 mt-12 px-10 py-5 bg-slate-800 text-white font-semibold text-lg rounded-full hover:bg-slate-700 transition-all duration-200 shadow-lg shadow-slate-800/15 hover:shadow-xl hover:-translate-y-0.5"
        >
          <MapPin className="h-5 w-5" />
          Open the map
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ─── Footer: Minimal ─── */

function Footer() {
  return (
    <footer className="py-10 px-6 bg-white dark:bg-slate-950 border-t border-border/30">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Mountain className="h-5 w-5 text-indigo-500" />
          <span className="font-semibold text-foreground">PeakPick</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Pick your perfect ski day.
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PromiseSection />
      <JourneySection />
      <ResortsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
