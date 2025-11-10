import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TurfsSection from './components/TurfsSection';
import TurfDetails from './components/TurfDetails';
import BookingModal from './components/BookingModal';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import LiveBookingNotifications from './components/LiveBookingNotifications';
import DemoNotificationTrigger from './components/DemoNotificationTrigger';
import AutoNotificationPopup from './components/AutoNotificationPopup';
import turfsData from './data/turfs.json';

interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  benefits: string[];
  popular: boolean;
  sessions: number;
  savings: string;
  icon: React.ReactNode;
  color: string;
}

interface ExtensionData {
  extensionHours: number;
  extensionCost: number;
  damageItems: Array<{
    id: string;
    item: string;
    description: string;
    damageType: 'repair' | 'replacement' | 'partial';
    quantity: number;
    cost: number;
  }>;
  totalDamageCost: number;
  originalAmount: number;
  finalAmount: number;
  calculation?: any;
}

function App() {
  const [selectedTurfId, setSelectedTurfId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPeopleCount, setBookingPeopleCount] = useState(4);
  const [selectedMembership, setSelectedMembership] = useState<MembershipPlan | null>(null);
  const [extensionData, setExtensionData] = useState<ExtensionData | null>(null);

  const handleTurfClick = (turfId: string) => {
    setSelectedTurfId(turfId);
    setIsDetailsOpen(true);
  };

  const handleBookNow = (
    peopleCount: number, 
    membershipPlan?: MembershipPlan | null,
    extensionData?: ExtensionData | null
  ) => {
    setBookingPeopleCount(peopleCount);
    setSelectedMembership(membershipPlan || null);
    setExtensionData(extensionData || null);
    setIsDetailsOpen(false);
    setIsBookingOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
    setSelectedTurfId(null);
    setSelectedMembership(null);
    setExtensionData(null);
  };

  const selectedTurf = turfsData.find((t) => t.id === selectedTurfId);

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Demo Notification Trigger - Auto adds demo notifications */}
      <DemoNotificationTrigger />
      
      {/* Auto Notification Popup - Shows automatic notifications */}
      <AutoNotificationPopup />
      
      {/* Live Booking Notifications - Fixed Placement */}
      <LiveBookingNotifications />
      
      <Navbar />
      <Hero />
      <TurfsSection onTurfClick={handleTurfClick} />
      <AboutSection />
      <Footer />

      {/* Turf Details Modal */}
      <TurfDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        turfId={selectedTurfId}
        onBookNow={handleBookNow}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleBookingClose}
        turf={selectedTurf || undefined}
        membershipPlan={selectedMembership || undefined}
      />
    </div>
  );
}

export default App;