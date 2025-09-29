import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JourneyPlanner } from '@/components/JourneyPlanner';
import { SOSButton } from '@/components/SOSButton';
import { MapPin, Calculator, Navigation, Star, Settings } from 'lucide-react';
import { JourneyResult } from '@/types';
import { Link } from 'react-router-dom';

export const Home = () => {
  const handleJourneySearch = (from: string, to: string): JourneyResult | null => {
    // Mock journey search result
    return {
      busNumbers: ['BUS-101', 'BUS-102'],
      eta: 3,
      totalTime: 25,
      fare: 20,
      route: {
        id: 'route-a',
        name: 'Route A',
        color: '#E91E63',
        coordinates: [],
        stops: [],
      },
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">🚍 Bus Tracker</h1>
            <div className="flex items-center gap-4">
              <Link to="/live-tracking">
                <Button variant="outline" size="sm">
                  <Navigation className="h-4 w-4 mr-2" />
                  Live Tracking
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Journey Planner */}
          <div className="lg:col-span-2">
            <JourneyPlanner onSearch={handleJourneySearch} />
            
            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/fare-calculator">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground">Fare Calculator</h3>
                    <p className="text-sm text-muted-foreground">Calculate journey cost</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/live-tracking">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground">Live Tracking</h3>
                    <p className="text-sm text-muted-foreground">Track buses in real-time</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/feedback">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground">Feedback</h3>
                    <p className="text-sm text-muted-foreground">Rate your journey</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Live Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">BUS-101 on Route A</p>
                      <p className="text-xs text-muted-foreground">Arriving at Central Station in 2 min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-warning rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">BUS-201 on Route B</p>
                      <p className="text-xs text-muted-foreground">Standing room only</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Service Update</p>
                      <p className="text-xs text-muted-foreground">All routes operating normally</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Crowd Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">🟢 Seats Available</span>
                    <span className="text-sm text-muted-foreground">Low crowd</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">🟡 Standing Only</span>
                    <span className="text-sm text-muted-foreground">Medium crowd</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">🔴 Full</span>
                    <span className="text-sm text-muted-foreground">High crowd</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};