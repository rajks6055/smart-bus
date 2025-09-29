import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const feedbackTags = [
  'Clean', 'On Time', 'Comfortable', 'Friendly Driver', 
  'Overcrowded', 'Late', 'Rash Driving', 'Breakdown', 'Dirty'
];

export const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [busNumber, setBusNumber] = useState('BUS-101');
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate feedback submission
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It helps us improve our service.",
      variant: "default",
    });

    // Reset form
    setRating(0);
    setSelectedTags([]);
    setComment('');
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
            <h1 className="text-2xl font-bold text-foreground">Trip Feedback</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MessageSquare className="h-5 w-5 text-primary" />
              How was your ride on {busNumber}?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Tap to rate your experience</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        value <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {rating === 1 && "Poor - We'll work to improve"}
                  {rating === 2 && "Fair - Room for improvement"}
                  {rating === 3 && "Good - Average experience"}
                  {rating === 4 && "Very Good - Great service"}
                  {rating === 5 && "Excellent - Outstanding service"}
                </p>
              )}
            </div>

            {/* Quick Tags */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quick feedback tags</h3>
              <div className="flex flex-wrap gap-2">
                {feedbackTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Additional Comments (Optional)
              </label>
              <Textarea
                placeholder="Tell us more about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            {/* Submit */}
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Recent Trips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">BUS-101 • Route A</p>
                  <p className="text-sm text-muted-foreground">Central Station → Railway Station</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-3 w-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">BUS-201 • Route B</p>
                  <p className="text-sm text-muted-foreground">Zoo Road → Cotton University</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className="h-3 w-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    <Star className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};