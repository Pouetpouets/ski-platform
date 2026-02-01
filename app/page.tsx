import Link from 'next/link';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('landing');

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
            {t('badge')}
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          {t('title')}
        </h1>

        <p className="text-lg sm:text-xl text-blue-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/map"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-950 font-semibold rounded-xl hover:bg-sky-50 transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
          >
            <MapPin className="h-5 w-5" />
            {t('exploreCta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 text-white/80 font-medium rounded-xl border border-white/15 hover:bg-white/10 hover:text-white transition-all duration-200 backdrop-blur-sm"
          >
            {t('discoverFeatures')}
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '12', label: t('statResorts') },
            { value: '6', label: t('statFactors') },
            { value: '<500ms', label: t('statCalc') },
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

const featureKeys = [
  {
    titleKey: 'featurePerfectDay',
    descKey: 'featurePerfectDayDesc',
    icon: TrendingUp,
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    titleKey: 'featureSnow',
    descKey: 'featureSnowDesc',
    icon: Snowflake,
    bgColor: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
  },
  {
    titleKey: 'featureCrowd',
    descKey: 'featureCrowdDesc',
    icon: Users,
    bgColor: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    titleKey: 'featureWeather',
    descKey: 'featureWeatherDesc',
    icon: Sun,
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    titleKey: 'featurePrice',
    descKey: 'featurePriceDesc',
    icon: Ticket,
    bgColor: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
  },
  {
    titleKey: 'featureDistance',
    descKey: 'featureDistanceDesc',
    icon: Car,
    bgColor: 'bg-teal-500/10',
    iconColor: 'text-teal-400',
  },
] as const;

function FeaturesSection() {
  const t = useTranslations('landing');

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
            {t('featuresTitle')}
            <span className="block text-sky-600 dark:text-sky-400">
              {t('featuresHighlight')}
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('featuresDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureKeys.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.titleKey}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-5`}
                >
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {t(feature.descKey)}
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
  const t = useTranslations('landing');

  const factors = [
    { key: 'scoreSnow', descKey: 'scoreSnowDesc', emoji: '❄️' },
    { key: 'scoreCrowd', descKey: 'scoreCrowdDesc', emoji: '👥' },
    { key: 'scoreWeather', descKey: 'scoreWeatherDesc', emoji: '☀️' },
    { key: 'scorePrice', descKey: 'scorePriceDesc', emoji: '🎫' },
    { key: 'scoreDistance', descKey: 'scoreDistanceDesc', emoji: '📍' },
    { key: 'scoreParking', descKey: 'scoreParkingDesc', emoji: '🅿️' },
  ] as const;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-200/30 to-cyan-200/20 dark:from-sky-900/20 dark:to-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {t('scoreTitle')}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
            {t('scoreDescription')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factors.map((f) => (
            <div
              key={f.key}
              className="flex items-start gap-4 p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/40"
            >
              <span className="text-2xl">{f.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {t(f.key)}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    16.7%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{t(f.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Score color legend */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            { range: '80-100', labelKey: 'excellent' as const, class: 'bg-score-excellent' },
            { range: '60-79', labelKey: 'good' as const, class: 'bg-score-good' },
            { range: '40-59', labelKey: 'fair' as const, class: 'bg-score-fair' },
            { range: '0-39', labelKey: 'poor' as const, class: 'bg-score-poor' },
          ].map((tier) => (
            <div key={tier.range} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${tier.class}`} />
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {tier.range}
                </span>{' '}
                {t(tier.labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResortsPreviewSection() {
  const t = useTranslations('landing');

  const resorts = [
    'Les Arcs', 'Val d\'Isere', 'Courchevel', 'Chamonix',
    'Meribel', 'Tignes', 'La Plagne', 'Megeve',
    'La Clusaz', 'Alpe d\'Huez', 'Les Deux Alpes', 'Le Grand-Bornand',
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
          {t('resortsTitle')}
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          {t('resortsDescription')}
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
  const t = useTranslations('landing');

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
          {t('ctaTitle')}
        </h2>
        <p className="mt-6 text-blue-200/70 text-lg max-w-xl mx-auto">
          {t('ctaDescription')}
        </p>
        <Link
          href="/map"
          className="group inline-flex items-center gap-2 mt-10 px-10 py-5 bg-white text-blue-950 font-semibold text-lg rounded-xl hover:bg-sky-50 transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
        >
          <MapPin className="h-5 w-5" />
          {t('ctaButton')}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');

  return (
    <footer className="py-8 px-6 bg-slate-50 dark:bg-slate-950 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mountain className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          <span className="font-semibold text-foreground">{tCommon('peakPick')}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('footer')}
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
