import { Bus, Route } from '@/types';
import { Card } from '@/components/ui/card';

interface BusSidebarProps {
  selectedBus: Bus | null;
  route: Route | null;
  selectedStopId?: string | null;
  arrivals?: { bus: Bus; etaMin: number }[];
}

export const BusSidebar = ({ selectedBus, route, selectedStopId, arrivals }: BusSidebarProps) => {
  return (
    <div className="w-80 bg-sidebar-bg text-sidebar-text flex flex-col border-r border-sidebar-text/20">
      <div className="p-6 border-b border-sidebar-text/20">
        <h2 className="text-lg font-semibold">Details</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {!selectedBus && !selectedStopId ? (
          <p className="text-sm text-sidebar-text/60">Select a bus or stop to view details.</p>
        ) : selectedStopId ? (
          <div className="space-y-4">
            <Card className="bg-sidebar-text/10 border-sidebar-text/20 p-4">
              <div className="text-sm">
                <div className="font-semibold text-sidebar-text mb-1">Stop</div>
                <div className="text-sidebar-text/80">{selectedStopId}</div>
              </div>
            </Card>
            <div className="space-y-2">
              <div className="text-sm font-semibold">Arrivals</div>
              <div className="space-y-2">
                {(arrivals || []).map(({ bus, etaMin }) => (
                  <div key={bus.id} className="flex items-center justify-between text-xs bg-sidebar-text/10 border border-sidebar-text/20 p-2 rounded">
                    <span className="text-sidebar-text/90">{bus.number}</span>
                    <span className="text-sidebar-text/70">{etaMin.toFixed(1)} min</span>
                  </div>
                ))}
                {(!arrivals || arrivals.length === 0) && (
                  <div className="text-xs text-sidebar-text/60">No upcoming buses.</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="bg-sidebar-text/10 border-sidebar-text/20 p-4">
              <div className="text-sm">
                <div className="font-semibold text-sidebar-text mb-1">Bus</div>
                <div className="text-sidebar-text/80">{selectedBus.number}</div>
              </div>
            </Card>
            {route && (
              <Card className="bg-sidebar-text/10 border-sidebar-text/20 p-4">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></div>
                    <div className="font-semibold text-sidebar-text">{route.name}</div>
                  </div>
                  <div className="text-xs text-sidebar-text/70">Route ID: {route.id}</div>
                </div>
              </Card>
            )}
            {route && (
              <div className="space-y-2">
                <div className="text-sm font-semibold">ETA by Stop</div>
                <div className="space-y-2">
                  {route.stops.map((stop, idx) => (
                    <div key={stop.id} className="flex items-center justify-between text-xs bg-sidebar-text/10 border border-sidebar-text/20 p-2 rounded">
                      <span className="text-sidebar-text/90">{stop.name}</span>
                      <span className="text-sidebar-text/70">{(idx + 1) * 2} min</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusSidebar;


