import { SkiMap } from '@/components/map/ski-map';

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      {/* Header overlay */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-background/90 to-transparent">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">Ski Platform</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Find your perfect ski day
          </p>
        </div>
      </header>

      {/* Full-screen map */}
      <SkiMap className="h-full w-full" />
    </main>
  );
}
