export interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  location: string;
  date: string;
  timeSlot: string;
  duration: number;
  totalAmount: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  playersCount: number;
  equipmentBooked: {
    football: number;
    goalkeeperGloves: number;
    cones: number;
    waterBottles: number;
  };
  bookedAt: string;
}

export interface BookingHistoryFilters {
  status: string;
  dateRange: {
    from: string;
    to: string;
  };
  sortBy: 'date' | 'amount' | 'turfName';
}