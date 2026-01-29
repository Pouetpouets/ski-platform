import { Suspense } from 'react';
import { getResortsWithConditions } from '@/lib/data/resorts';
import { SkiMapWrapper } from '@/components/map/ski-map-wrapper';
import { Skeleton } from '@/components/ui/skeleton';

async function MapWithData() {
  const resorts = await getResortsWithConditions();
  return <SkiMapWrapper resorts={resorts} />;
}

function MapSkeleton() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      {/* Header overlay */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-background/90 to-transparent pointer-events-none">
        <div className="flex items-center justify-between max-w-7xl mx-auto pointer-events-auto">
          <h1 className="text-xl font-bold text-foreground">Ski Platform</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Find your perfect ski day
          </p>
        </div>
      </header>

      {/* Full-screen map with markers - wrapped in Suspense */}
      <Suspense fallback={<MapSkeleton />}>
        <MapWithData />
      </Suspense>
    </main>
  );
}
