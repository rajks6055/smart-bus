import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export const SOSButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();

  const handleSOSConfirm = () => {
    // Simulate sending location and bus ID to backend
    toast({
      title: "SOS Alert Sent",
      description: "Your location and bus information has been shared with emergency services.",
      variant: "default",
    });
    setShowConfirm(false);
    
    // Simulate emergency call (in real app, would open phone dialer)
    setTimeout(() => {
      toast({
        title: "Emergency Call Ready",
        description: "Tap to call emergency services: 108",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <>
      <Button
        size="lg"
        variant="destructive"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setShowConfirm(true)}
      >
        <AlertTriangle className="h-6 w-6" />
      </Button>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Emergency SOS
            </DialogTitle>
            <DialogDescription>
              This will immediately share your current location and bus information with emergency services.
              Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSOSConfirm} className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Send SOS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};