import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, IndianRupee, Bus } from 'lucide-react';
import { JourneyResult } from '@/types';

interface JourneyPlannerProps {
  onSearch: (from: string, to: string) => JourneyResult | null;
}

export const JourneyPlanner = ({ onSearch }: JourneyPlannerProps) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState<JourneyResult | null>(null);

  const handleSearch = () => {
    if (from.trim() && to.trim()) {
      const searchResult = onSearch(from, to);
      setResult(searchResult);
    }
  };

  const getCrowdIcon = (level: string) => {
    switch (level) {
      case 'available': return '🟢';
      case 'standing': return '🟡';
      case 'full': return '🔴';
      default: return '🟢';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            Journey Planner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">From</label>
              <Input
                placeholder="Enter starting point"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">To</label>
              <Input
                placeholder="Enter destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            className="w-full"
            disabled={!from.trim() || !to.trim()}
          >
            Search Routes
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Journey Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-lg font-semibold text-foreground">
                  <Bus className="h-4 w-4" />
                  {result.busNumbers.join(', ')}
                </div>
                <p className="text-sm text-muted-foreground">Bus Numbers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-lg font-semibold text-foreground">
                  <Clock className="h-4 w-4" />
                  {result.eta} min
                </div>
                <p className="text-sm text-muted-foreground">Next Bus ETA</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{result.totalTime} min</div>
                <p className="text-sm text-muted-foreground">Total Time</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-lg font-semibold text-foreground">
                  <IndianRupee className="h-4 w-4" />
                  {result.fare}
                </div>
                <p className="text-sm text-muted-foreground">Fare</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Crowd Level:</span>
              <span>🟢 Seats Available</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};