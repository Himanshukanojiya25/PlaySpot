import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TurfsSection from './components/TurfsSection';
import TurfDetails from './components/TurfDetails';
import BookingModal from './components/BookingModal';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import turfsData from './data/turfs.json';

function App() {
  const [selectedTurfId, setSelectedTurfId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleTurfClick = (turfId: string) => {
    setSelectedTurfId(turfId);
    setIsDetailsOpen(true);
  };

  const handleBookNow = () => {
    setIsDetailsOpen(false);
    setIsBookingOpen(true);
  };

  const selectedTurf = turfsData.find((t) => t.id === selectedTurfId);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <TurfsSection onTurfClick={handleTurfClick} />
      <AboutSection />
      <Footer />

      <TurfDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        turfId={selectedTurfId}
        onBookNow={handleBookNow}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        turfName={selectedTurf?.name || ''}
      />
    </div>
  );
}

export default App;
