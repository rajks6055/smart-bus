import { useState, useEffect, useMemo } from 'react';
import { BusTrackingMap } from '@/components/BusTrackingMap';
import LeafletPunjabMap from '@/components/LeafletPunjabMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bus as BusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes, buses as initialBuses } from '@/data/mockData';
import { Bus, Route } from '@/types';
import BusSidebar from '@/components/BusSidebar';

export const LiveTracking = () => {
  const [buses, setBuses] = useState<Bus[]>(initialBuses);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  // Simulate real-time bus movement with slower, more visible movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          const route = routes.find(r => r.id === bus.routeId);
          if (!route) return bus;

          // Calculate movement direction based on route
          const routeCoords = route.coordinates;
          const currentIndex = routeCoords.findIndex(coord => 
            Math.abs(coord[0] - bus.currentPosition[0]) < 0.1 && 
            Math.abs(coord[1] - bus.currentPosition[1]) < 0.1
          );
          
          // Move towards next coordinate or along route
          const nextIndex = (currentIndex + 1) % routeCoords.length;
          const nextCoord = routeCoords[nextIndex] || routeCoords[0];
          
          // Calculate smooth movement towards next coordinate
          const latDiff = (nextCoord[0] - bus.currentPosition[0]) * 0.002;
          const lngDiff = (nextCoord[1] - bus.currentPosition[1]) * 0.002;

          return {
            ...bus,
            // Smooth movement along route
            currentPosition: [
              bus.currentPosition[0] + latDiff + (Math.random() - 0.5) * 0.0005,
              bus.currentPosition[1] + lngDiff + (Math.random() - 0.5) * 0.0005,
            ] as [number, number],
            // Update ETA
            etaToNextStop: Math.max(0.1, bus.etaToNextStop - 0.05),
            // Slight speed variation
            speed: Math.max(20, Math.min(60, bus.speed + (Math.random() - 0.5) * 1.5)),
          };
        })
      );
    }, 2000); // Update every 2 seconds for smoother movement

    return () => clearInterval(interval);
  }, []);

  const handleBusClick = (bus: Bus) => {
    setSelectedBusId(bus.id);
  };

  const handleStopClick = (stopId: string) => {
    setSelectedStop(stopId);
    setSelectedBusId(null);
  };

  const getRouteInfo = (routeId: string) => {
    return routes.find(route => route.id === routeId);
  };

  const getCrowdEmoji = (level: string) => {
    switch (level) {
      case 'available': return '🟢';
      case 'standing': return '🟡';
      case 'full': return '🔴';
      default: return '🟢';
    }
  };

  const getCrowdText = (level: string) => {
    switch (level) {
      case 'available': return 'Seats Available';
      case 'standing': return 'Standing Only';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
  };

  const selectedBus = useMemo(() => buses.find(b => b.id === selectedBusId) || null, [buses, selectedBusId]);
  const selectedRoute = useMemo<Route | null>(() => (selectedBus ? getRouteInfo(selectedBus.routeId) || null : null), [selectedBus]);

  const activeRouteIds = useMemo(() => new Set(buses.map(b => b.routeId)), [buses]);
  const visibleRoutes = useMemo(() => routes.filter(r => activeRouteIds.has(r.id)), [activeRouteIds]);
  const visibleBuses = useMemo(() => buses.filter(b => activeRouteIds.has(b.routeId)), [activeRouteIds, buses]);

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-sidebar-bg text-sidebar-text flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-sidebar-text/20">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-sidebar-text hover:bg-sidebar-text/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold flex items-center gap-2">
              🚍 Bus Tracker
            </h1>
          </div>
        </div>

        {/* Routes Section (active only) */}
        <div className="p-6 border-b border-sidebar-text/20">
          <h2 className="text-lg font-semibold mb-4">ROUTES</h2>
          <div className="space-y-2">
            {visibleRoutes.map(route => (
              <div key={route.id} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: route.color }}
                ></div>
                <span className="text-sm">{route.name} ({route.id.split('-')[1].toUpperCase()})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buses Section */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">BUSES</h2>
          <div className="space-y-3">
            {visibleBuses.map(bus => {
              const route = getRouteInfo(bus.routeId);
              return (
                <Card
                  key={bus.id}
                  className={`bg-sidebar-text/10 border ${selectedBusId === bus.id ? 'border-sidebar-accent' : 'border-sidebar-text/20'} p-4 cursor-pointer`}
                  onClick={() => setSelectedBusId(bus.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BusIcon className="h-4 w-4 text-sidebar-accent" />
                      <span className="font-semibold text-sidebar-text">{bus.number}</span>
                    </div>
                    <span className="text-xs bg-sidebar-accent text-white px-2 py-1 rounded">
                      {bus.status}
                    </span>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: route?.color }}
                      ></div>
                      <span className="text-sidebar-text/80">{route?.name}</span>
                    </div>
                    
                    <div className="text-sidebar-text/70">
                      <div>Speed: {bus.speed.toFixed(1)} mph</div>
                      <div>ETA to next stop: {bus.etaToNextStop.toFixed(1)} min</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Selected Stop Section */}
        <div className="p-6 border-t border-sidebar-text/20">
          <h2 className="text-lg font-semibold mb-2">SELECTED STOP</h2>
          {selectedStop ? (
            <div className="text-sm space-y-2">
              <div className="bg-sidebar-accent/20 p-3 rounded-lg">
                <p className="font-semibold text-sidebar-text">
                  {routes.flatMap(r => r.stops).find(s => s.id === selectedStop)?.name || 'Unknown Stop'}
                </p>
                <p className="text-sidebar-text/70">Stop ID: {selectedStop}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sidebar-text">Upcoming Buses:</p>
                {buses
                  .filter(bus => routes.find(r => r.id === bus.routeId)?.stops.some(s => s.id === selectedStop))
                  .map(bus => (
                    <div key={bus.id} className="flex justify-between text-xs text-sidebar-text/80 bg-sidebar-text/10 p-2 rounded">
                      <span>{bus.number}</span>
                      <span>ETA: {bus.etaToNextStop.toFixed(1)} min</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-sidebar-text/50">
              Click a stop marker on the map to view ETAs.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-text/20 text-center">
          <p className="text-xs text-sidebar-text/50">
            Prototype demo with simulated data
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1">
        <div className="h-full hidden lg:block">
          <LeafletPunjabMap
            routes={visibleRoutes}
            buses={visibleBuses}
            onBusClick={handleBusClick}
            onStopClick={handleStopClick}
            center={[30.7333, 76.7794]}
            zoom={12}
          />
        </div>
        <div className="h-full block lg:hidden">
          <BusTrackingMap
            routes={visibleRoutes}
            buses={visibleBuses}
            onBusClick={handleBusClick}
            onStopClick={handleStopClick}
          />
        </div>
      </div>

      {/* Details Sidebar */}
      <BusSidebar
        selectedBus={selectedBus}
        route={selectedRoute}
        selectedStopId={selectedStop}
        arrivals={useMemo(() => {
          if (!selectedStop) return [] as { bus: Bus; etaMin: number }[];
          // Dummy ETA calculation: base on distance in index order along the route
          const stopRoute = routes.find(r => r.stops.some(s => s.id === selectedStop));
          if (!stopRoute) return [] as { bus: Bus; etaMin: number }[];
          const stopIndex = stopRoute.stops.findIndex(s => s.id === selectedStop);
          return visibleBuses
            .filter(b => b.routeId === stopRoute.id)
            .map(b => ({ bus: b, etaMin: Math.max(1, (stopIndex + 1) * 2 - (b.speed % 2)) }))
            .sort((a, b) => a.etaMin - b.etaMin);
        }, [selectedStop, visibleBuses])}
      />
    </div>
  );
};