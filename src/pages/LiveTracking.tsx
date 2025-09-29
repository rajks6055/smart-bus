import { useState, useEffect } from 'react';
import { BusTrackingMap } from '@/components/BusTrackingMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bus as BusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes, buses as initialBuses } from '@/data/mockData';
import { Bus, Route } from '@/types';

export const LiveTracking = () => {
  const [buses, setBuses] = useState<Bus[]>(initialBuses);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  // Simulate real-time bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          // Slightly modify position to simulate movement
          currentPosition: [
            bus.currentPosition[0] + (Math.random() - 0.5) * 0.001,
            bus.currentPosition[1] + (Math.random() - 0.5) * 0.001,
          ] as [number, number],
          // Update ETA
          etaToNextStop: Math.max(0.1, bus.etaToNextStop - 0.1),
          // Occasionally change speed
          speed: bus.speed + (Math.random() - 0.5) * 2,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBusClick = (bus: Bus) => {
    console.log('Bus clicked:', bus);
  };

  const handleStopClick = (stopId: string) => {
    setSelectedStop(stopId);
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

        {/* Routes Section */}
        <div className="p-6 border-b border-sidebar-text/20">
          <h2 className="text-lg font-semibold mb-4">ROUTES</h2>
          <div className="space-y-2">
            {routes.map(route => (
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
            {buses.map(bus => {
              const route = getRouteInfo(bus.routeId);
              return (
                <Card key={bus.id} className="bg-sidebar-text/10 border-sidebar-text/20 p-4">
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
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span>{getCrowdEmoji(bus.crowdLevel)}</span>
                      <span className="text-xs text-sidebar-text/70">
                        {getCrowdText(bus.crowdLevel)}
                      </span>
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
            <div className="text-sm text-sidebar-text/70">
              <p>Stop ID: {selectedStop}</p>
              <p>Click a stop marker to view ETAs.</p>
            </div>
          ) : (
            <p className="text-sm text-sidebar-text/50">
              Click a stop marker to view ETAs.
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
        <BusTrackingMap
          routes={routes}
          buses={buses}
          onBusClick={handleBusClick}
          onStopClick={handleStopClick}
        />
      </div>
    </div>
  );
};