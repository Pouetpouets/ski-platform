import Link from 'next/link';
import {
  Mountain,
  MapPin,
  Snowflake,
  Sun,
  Users,
  TrendingUp,
  Car,
  Ticket,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950" />

      {/* Subtle mountain silhouette overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%]">
        <svg
          viewBox="0 0 1440 400"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,400 L0,280 Q100,180 200,240 Q300,120 420,200 Q500,80 600,180 Q680,100 760,160 Q840,60 960,140 Q1060,40 1140,120 Q1220,60 1300,160 Q1380,100 1440,180 L1440,400 Z"
            className="fill-white/5"
          />
          <path
            d="M0,400 L0,320 Q120,240 240,280 Q360,180 480,260 Q580,160 700,230 Q800,140 900,210 Q1020,120 1140,200 Q1260,140 1360,220 L1440,260 L1440,400 Z"
            className="fill-white/[0.03]"
          />
        </svg>
      </div>

      {/* Floating snowflakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          >
            <Snowflake className="h-4 w-4 text-white/10" />
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
          <Sparkles className="h-4 w-4 text-sky-300" />
          <span className="text-sm text-sky-200 font-medium">
            Perfect Day Score Algorithm
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Find your
          <span className="block mt-2 bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            perfect ski day
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-blue-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Real-time snow conditions, crowd predictions, weather forecasts, and a
          smart scoring algorithm to help you pick the best resort — today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/map"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-950 font-semibold rounded-xl hover:bg-sky-50 transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
          >
            <MapPin className="h-5 w-5" />
            Explore the Map
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 text-white/80 font-medium rounded-xl border border-white/15 hover:bg-white/10 hover:text-white transition-all duration-200 backdrop-blur-sm"
          >
            Discover Features
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '12', label: 'Alpine Resorts' },
            { value: '6', label: 'Score Factors' },
            { value: '<500ms', label: 'Score Calc' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-blue-300/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/30" />
      </div>
    </section>
  );
}

const features = [
  {
    icon: TrendingUp,
    title: 'Perfect Day Score',
    description:
      'Our algorithm weighs 6 real-time factors to give each resort a score from 0 to 100 — so you know exactly where to go.',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Snowflake,
    title: 'Snow Conditions',
    description:
      'Base depth, summit depth, and fresh snow in the last 24h. Get Powder Alerts when over 20cm of fresh snow falls.',
    color: 'from-sky-500 to-cyan-600',
    bgColor: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
  },
  {
    icon: Users,
    title: 'Crowd Predictions',
    description:
      'Know how crowded each resort will be before you leave. Avoid the queues and find hidden quiet spots.',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    icon: Sun,
    title: 'Weather Forecast',
    description:
      'Real-time weather data with condition icons: sunny, cloudy, snowing, or storm. Plan with confidence.',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: Ticket,
    title: 'Lift Ticket Pricing',
    description:
      'Compare adult day pass prices across resorts. Color-coded quality indicators show you the best deals.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
  },
  {
    icon: Car,
    title: 'Distance & Driving',
    description:
      'GPS-powered distance calculation and estimated driving times from your current location to each resort.',
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-500/10',
    iconColor: 'text-teal-400',
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/30 mb-6">
            <Mountain className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
              Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Everything you need to
            <span className="block text-sky-600 dark:text-sky-400">
              choose your resort
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
            Six real-time factors, one smart score. No more guessing — just open
            the map and go where the snow is best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-5`}
                >
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScoreExplainerSection() {
  const factors = [
    { label: 'Snow Quality', weight: '16.7%', emoji: '❄️', desc: 'Base depth + fresh snow combined' },
    { label: 'Crowd Level', weight: '16.7%', emoji: '👥', desc: 'Low, moderate, high, or packed' },
    { label: 'Weather', weight: '16.7%', emoji: '☀️', desc: 'Sunny, cloudy, snowing, or storm' },
    { label: 'Lift Price', weight: '16.7%', emoji: '🎫', desc: 'Normalized from €30 to €70' },
    { label: 'Distance', weight: '16.7%', emoji: '📍', desc: 'Based on your GPS location' },
    { label: 'Parking', weight: '16.7%', emoji: '🅿️', desc: 'Available, limited, or full' },
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-200/30 to-cyan-200/20 dark:from-sky-900/20 dark:to-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            How the Score Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
            Six equally weighted factors combine into a single 0-100 score,
            calculated client-side in under 500ms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factors.map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-4 p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/40"
            >
              <span className="text-2xl">{f.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {f.label}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {f.weight}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Score color legend */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            { range: '80-100', label: 'Excellent', class: 'bg-score-excellent' },
            { range: '60-79', label: 'Good', class: 'bg-score-good' },
            { range: '40-59', label: 'Fair', class: 'bg-score-fair' },
            { range: '0-39', label: 'Poor', class: 'bg-score-poor' },
          ].map((tier) => (
            <div key={tier.range} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${tier.class}`} />
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {tier.range}
                </span>{' '}
                {tier.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResortsPreviewSection() {
  const resorts = [
    'Les Arcs', 'Val d\'Isere', 'Courchevel', 'Chamonix',
    'Meribel', 'Tignes', 'La Plagne', 'Megeve',
    'La Clusaz', 'Alpe d\'Huez', 'Les Deux Alpes', 'Le Grand-Bornand',
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
          12 French Alps Resorts
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          From legendary powder to family-friendly slopes — all the best spots
          between Lyon, Grenoble, Annecy, and Geneva.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {resorts.map((resort) => (
            <span
              key={resort}
              className="px-4 py-2 rounded-full bg-card border border-border/50 text-sm font-medium text-foreground hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors cursor-default"
            >
              {resort}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background matching hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950" />

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,140 Q200,60 400,120 Q600,40 800,100 Q1000,20 1200,80 Q1350,40 1440,80 L1440,200 Z"
            className="fill-white/5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Ready to hit the slopes?
        </h2>
        <p className="mt-6 text-blue-200/70 text-lg max-w-xl mx-auto">
          Open the interactive map, allow your GPS, and instantly see which
          resort has the best conditions for you — right now.
        </p>
        <Link
          href="/map"
          className="group inline-flex items-center gap-2 mt-10 px-10 py-5 bg-white text-blue-950 font-semibold text-lg rounded-xl hover:bg-sky-50 transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
        >
          <MapPin className="h-5 w-5" />
          Open the Map
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 bg-slate-50 dark:bg-slate-950 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mountain className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          <span className="font-semibold text-foreground">Ski Platform</span>
        </div>
        <p className="text-sm text-muted-foreground">
          French Alps ski conditions & scoring
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ScoreExplainerSection />
      <ResortsPreviewSection />
      <CTASection />
      <Footer />
    </main>
  );
}
