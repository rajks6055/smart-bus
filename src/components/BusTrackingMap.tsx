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

  // Convert lat/lng to screen coordinates for Punjab map
  const coordToScreen = (coord: [number, number]) => {
    // Punjab bounds: lat 29.5-32.5, lng 74-77
    const latRange = [29.5, 32.5];
    const lngRange = [74, 77];
    
    const x = ((coord[1] - lngRange[0]) / (lngRange[1] - lngRange[0])) * 100;
    const y = ((latRange[1] - coord[0]) / (latRange[1] - latRange[0])) * 100;
    
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="h-full w-full rounded-lg relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Punjab Map Background */}
      <div className="absolute inset-0">
        {/* Map Grid */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-slate-400"
              style={{ left: `${(i + 1) * 6.67}%` }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-slate-400"
              style={{ top: `${(i + 1) * 8.33}%` }}
            />
          ))}
        </div>

        {/* Punjab State Outline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* Simplified Punjab border */}
          <path
            d="M20,25 L75,20 L80,40 L75,60 L65,75 L45,80 L25,75 L15,55 L20,25 Z"
            fill="rgba(34, 197, 94, 0.1)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.5"
          />
          
          {/* Major cities labels */}
          <text x="35" y="30" fontSize="3" fill="hsl(var(--muted-foreground))" fontWeight="bold">Chandigarh</text>
          <text x="60" y="25" fontSize="3" fill="hsl(var(--muted-foreground))" fontWeight="bold">Amritsar</text>
          <text x="45" y="45" fontSize="3" fill="hsl(var(--muted-foreground))" fontWeight="bold">Ludhiana</text>
          <text x="25" y="50" fontSize="3" fill="hsl(var(--muted-foreground))" fontWeight="bold">Patiala</text>
        </svg>

        {/* Route Lines */}
        {routes.map((route) => (
          <svg key={route.id} className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
            <path
              d={route.coordinates.map((coord, index) => {
                const screen = coordToScreen(coord);
                return `${index === 0 ? 'M' : 'L'} ${screen.x} ${screen.y}`;
              }).join(' ')}
              stroke={route.color}
              strokeWidth="2"
              fill="none"
              opacity="0.9"
              strokeDasharray="none"
            />
          </svg>
        ))}

        {/* Bus Icons */}
        {buses.map((bus) => {
          const route = routes.find(r => r.id === bus.routeId);
          const screen = coordToScreen(bus.currentPosition);
          
          return (
            <div
              key={bus.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-300 z-20"
              style={{
                left: `${screen.x}%`,
                top: `${screen.y}%`,
              }}
              onClick={() => onBusClick?.(bus)}
              title={`${bus.number} - ${bus.status} - ${bus.speed.toFixed(1)} km/h`}
            >
              <div className="relative animate-pulse">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-xl border-2 border-white"
                  style={{ backgroundColor: route?.color || '#2196F3' }}
                >
                  🚌
                </div>
                {/* Speed indicator */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-1 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {bus.number}<br/>
                  {getCrowdEmoji(bus.crowdLevel)} {bus.speed.toFixed(0)} km/h
                </div>
                {/* Movement trail */}
                <div 
                  className="absolute w-2 h-2 rounded-full opacity-50 animate-ping"
                  style={{ backgroundColor: route?.color || '#2196F3', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />
              </div>
            </div>
          );
        })}

        {/* Bus Stops */}
        {routes.map((route) =>
          route.stops.map((stop) => {
            const screen = coordToScreen(stop.coordinates);
            return (
              <div
                key={stop.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform z-15"
                style={{
                  left: `${screen.x}%`,
                  top: `${screen.y}%`,
                }}
                onClick={() => onStopClick?.(stop.id)}
                title={stop.name}
              >
                <div className="w-4 h-4 bg-white border-3 border-slate-700 rounded-full shadow-lg hover:bg-yellow-200 transition-colors">
                  <div className="w-2 h-2 bg-slate-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            );
          })
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border z-30">
          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            🚍 Punjab Bus Routes
          </h4>
          <div className="space-y-2 text-xs">
            {routes.map(route => (
              <div key={route.id} className="flex items-center gap-3">
                <div 
                  className="w-4 h-2 rounded-full"
                  style={{ backgroundColor: route.color }}
                ></div>
                <span className="text-foreground font-medium">{route.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 mt-3 pt-2 border-t border-muted">
              <div className="w-4 h-4 bg-white border-2 border-slate-700 rounded-full"></div>
              <span className="text-foreground font-medium">Bus Stops</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">🚌</div>
              <span className="text-foreground font-medium">Live Buses</span>
            </div>
          </div>
        </div>

        {/* Real-time indicator */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg z-30 flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold">LIVE</span>
        </div>

        {/* Map attribution */}
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded z-30">
          Punjab Interactive Map
        </div>
      </div>
    </div>
  );
};