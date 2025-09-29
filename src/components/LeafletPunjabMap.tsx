import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bus, Route } from '@/types';

interface LeafletPunjabMapProps {
  routes: Route[];
  buses: Bus[];
  onBusClick?: (bus: Bus) => void;
  onStopClick?: (stopId: string) => void;
  center?: [number, number];
  zoom?: number;
}

const busIcon = new L.DivIcon({
  className: 'bus-marker',
  html: '<div class="w-6 h-6 rounded bg-blue-600 text-white text-[10px] flex items-center justify-center shadow">🚌</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const LeafletPunjabMap = ({ routes, buses, onBusClick, onStopClick, center, zoom }: LeafletPunjabMapProps) => {
  // Default: Chandigarh
  const mapCenter: [number, number] = center || [30.7333, 76.7794];
  const mapZoom = typeof zoom === 'number' ? zoom : 12;

  useEffect(() => {
    // Fix default icon paths in Leaflet when bundling
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="h-full w-full">
      <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.coordinates.map(([lat, lng]) => [lat, lng])}
            pathOptions={{ color: route.color, weight: 4, opacity: 0.8 }}
          />
        ))}

        {routes.flatMap((route) =>
          route.stops.map((stop) => (
            <CircleMarker
              key={`${route.id}-${stop.id}`}
              center={stop.coordinates}
              radius={6}
              pathOptions={{ color: '#1f2937', fillColor: '#ffffff', fillOpacity: 1, weight: 2 }}
              eventHandlers={{ click: () => onStopClick?.(stop.id) }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}>
                <div className="text-xs font-medium">{stop.name}</div>
              </Tooltip>
            </CircleMarker>
          ))
        )}

        {buses.map((bus) => (
          <Marker
            key={bus.id}
            position={bus.currentPosition}
            icon={busIcon}
            eventHandlers={{ click: () => onBusClick?.(bus) }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={1} permanent={false}>
              <div className="text-xs">
                <div className="font-semibold">{bus.number}</div>
                <div>{bus.speed.toFixed(0)} km/h</div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletPunjabMap;


