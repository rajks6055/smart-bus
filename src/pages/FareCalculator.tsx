import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, IndianRupee, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stops } from '@/data/mockData';

export const FareCalculator = () => {
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [fare, setFare] = useState<number | null>(null);

  const calculateFare = () => {
    if (fromStop && toStop && fromStop !== toStop) {
      // Simple fare calculation based on distance
      const basefare = 15;
      const additionalFare = Math.abs(
        stops.findIndex(s => s.id === fromStop) - 
        stops.findIndex(s => s.id === toStop)
      ) * 5;
      setFare(basefare + additionalFare);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Fare Calculator</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <IndianRupee className="h-5 w-5 text-primary" />
              Calculate Bus Fare
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  From Stop
                </label>
                <Select value={fromStop} onValueChange={setFromStop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select starting stop" />
                  </SelectTrigger>
                  <SelectContent>
                    {stops.map((stop) => (
                      <SelectItem key={stop.id} value={stop.id}>
                        {stop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  To Stop
                </label>
                <Select value={toStop} onValueChange={setToStop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination stop" />
                  </SelectTrigger>
                  <SelectContent>
                    {stops.map((stop) => (
                      <SelectItem key={stop.id} value={stop.id}>
                        {stop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={calculateFare}
              className="w-full"
              disabled={!fromStop || !toStop || fromStop === toStop}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Calculate Fare
            </Button>

            {fare !== null && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ₹{fare}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Fare from {stops.find(s => s.id === fromStop)?.name} to {stops.find(s => s.id === toStop)?.name}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Fare Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-foreground">Base Fare</div>
                  <div className="text-muted-foreground">₹15</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-foreground">Per Stop</div>
                  <div className="text-muted-foreground">₹5</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-foreground">Max Fare</div>
                  <div className="text-muted-foreground">₹50</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};