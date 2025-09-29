import { Bus, Route } from '@/types';

interface BusTrackingMapProps {
  routes: Route[];
  buses: Bus[];
  onBusClick?: (bus: Bus) => void;
  onStopClick?: (stopId: string) => void;
}

export const BusTrackingMap = ({ routes, buses, onBusClick, onStopClick }: BusTrackingMapProps) => {
  const getCrowdEmoji = (level: string) => {
    switch (level) {
      case 'available': return '🟢';
      case 'standing': return '🟡';
      case 'full': return '🔴';
      default: return '🟢';
    }
  };

  return (
    <div className="h-full w-full bg-muted rounded-lg relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-gray-300"
              style={{ left: `${(i + 1) * 5}%` }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-gray-300"
              style={{ top: `${(i + 1) * 6.67}%` }}
            />
          ))}
        </div>

        {/* Route Lines */}
        {routes.map((route, routeIndex) => (
          <svg
            key={route.id}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 10 }}
          >
            <path
              d={`M ${20 + routeIndex * 200} 100 Q 300 ${200 + routeIndex * 100} 600 ${300 + routeIndex * 50} T 800 400`}
              stroke={route.color}
              strokeWidth="4"
              fill="none"
              opacity="0.8"
            />
          </svg>
        ))}

        {/* Bus Icons */}
        {buses.map((bus, busIndex) => {
          const route = routes.find(r => r.id === bus.routeId);
          return (
            <div
              key={bus.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${30 + busIndex * 15}%`,
                top: `${40 + busIndex * 10}%`,
                zIndex: 20,
              }}
              onClick={() => onBusClick?.(bus)}
              title={`${bus.number} - ${bus.status}`}
            >
              <div className="relative">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  style={{ backgroundColor: route?.color || '#2196F3' }}
                >
                  🚌
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {bus.number} - {getCrowdEmoji(bus.crowdLevel)} {bus.speed.toFixed(1)} km/h
                </div>
              </div>
            </div>
          );
        })}

        {/* Bus Stops */}
        {routes.map((route) =>
          route.stops.slice(0, 3).map((stop, stopIndex) => (
            <div
              key={stop.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${25 + stopIndex * 25}%`,
                top: `${30 + stopIndex * 15}%`,
                zIndex: 15,
              }}
              onClick={() => onStopClick?.(stop.id)}
              title={stop.name}
            >
              <div className="w-3 h-3 bg-white border-2 border-gray-600 rounded-full shadow-md"></div>
            </div>
          ))
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
          <h4 className="text-sm font-semibold text-foreground mb-2">Live Tracking</h4>
          <div className="space-y-1 text-xs">
            {routes.map(route => (
              <div key={route.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-1 rounded"
                  style={{ backgroundColor: route.color }}
                ></div>
                <span className="text-foreground">{route.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 bg-white border border-gray-600 rounded-full"></div>
              <span className="text-foreground">Bus Stops</span>
            </div>
          </div>
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
          Interactive Map Simulation
        </div>
      </div>
    </div>
  );
};