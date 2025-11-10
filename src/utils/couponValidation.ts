// src/utils/couponValidation.ts

export interface Coupon {
  code: string;
  description: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  minAmount: number;
  maxDiscount: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  applicableDays: string[];
  isFirstBookingOnly?: boolean;
  category?: 'welcome' | 'seasonal' | 'weekend' | 'referral' | 'flash';
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  coupon?: Coupon;
  discountAmount?: number;
  finalAmount?: number;
}

export class CouponValidator {
  private static getUsedCoupons(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    const stored = localStorage.getItem('usedCoupons');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  }

  private static setUsedCoupons(coupons: Set<string>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('usedCoupons', JSON.stringify([...coupons]));
  }

  private static getUserFirstBooking(): boolean {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('userFirstBooking') !== 'false';
  }

  private static setUserFirstBooking(isFirst: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('userFirstBooking', isFirst.toString());
  }

  // Auto-generate new coupons every hour
  private static shouldGenerateNewCoupons(): boolean {
    if (typeof window === 'undefined') return false;
    
    const lastGenerated = localStorage.getItem('lastCouponGeneration');
    if (!lastGenerated) return true;
    
    const lastTime = new Date(lastGenerated).getTime();
    const currentTime = new Date().getTime();
    const hoursDiff = (currentTime - lastTime) / (1000 * 60 * 60);
    
    return hoursDiff >= 1; // Generate every hour
  }

  private static markCouponsGenerated(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lastCouponGeneration', new Date().toISOString());
  }

  // Generate dynamic coupons
  private static generateDynamicCoupons(): Coupon[] {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hour = currentDate.getHours();
    const isMorning = hour >= 6 && hour < 12;
    const isEvening = hour >= 16 && hour < 22;

    const dynamicCoupons: Coupon[] = [];

    // Flash Sale Coupon (changes every hour)
    const flashCodes = ['FLASH25', 'QUICK30', 'INSTANT20', 'HOTDEAL15'];
    const flashCode = flashCodes[Math.floor(Math.random() * flashCodes.length)];
    
    dynamicCoupons.push({
      code: flashCode,
      description: `🚀 Flash Sale! Limited time offer`,
      discountType: "percentage",
      discountValue: 20 + Math.floor(Math.random() * 15), // 20-35%
      minAmount: 300,
      maxDiscount: 400,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 hours validity
      usageLimit: 10,
      usedCount: 0,
      isActive: true,
      applicableDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      category: 'flash'
    });

    // Time-based coupons
    if (isMorning) {
      dynamicCoupons.push({
        code: "MORNING15",
        description: "🌅 Early Bird Special - Morning slots discount",
        discountType: "percentage",
        discountValue: 15,
        minAmount: 250,
        maxDiscount: 200,
        validFrom: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        usageLimit: 20,
        usedCount: 0,
        isActive: true,
        applicableDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        category: 'seasonal'
      });
    }

    if (isEvening) {
      dynamicCoupons.push({
        code: "EVENING20",
        description: "🌙 Evening Special - Peak hours discount",
        discountType: "percentage",
        discountValue: 20,
        minAmount: 400,
        maxDiscount: 300,
        validFrom: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        usageLimit: 15,
        usedCount: 0,
        isActive: true,
        applicableDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        category: 'seasonal'
      });
    }

    // Weekend special
    if (isWeekend) {
      const weekendCodes = ['WEEKEND30', 'SATURDAY25', 'SUNDAY20'];
      const weekendCode = weekendCodes[Math.floor(Math.random() * weekendCodes.length)];
      
      dynamicCoupons.push({
        code: weekendCode,
        description: "🎉 Weekend Special - Extra discount for weekend fun",
        discountType: "percentage",
        discountValue: 25 + Math.floor(Math.random() * 10), // 25-35%
        minAmount: 500,
        maxDiscount: 350,
        validFrom: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days
        usageLimit: 25,
        usedCount: 0,
        isActive: true,
        applicableDays: ["saturday", "sunday"],
        category: 'weekend'
      });
    }

    // Random seasonal coupon
    const seasonalCodes = [
      { code: 'SUMMER25', desc: '☀️ Summer Special' },
      { code: 'WINTER20', desc: '❄️ Winter Warm-up' },
      { code: 'MONSOON15', desc: '🌧️ Rainy Day Offer' },
      { code: 'FESTIVE30', desc: '🎊 Festival Special' }
    ];
    const seasonal = seasonalCodes[Math.floor(Math.random() * seasonalCodes.length)];
    
    dynamicCoupons.push({
      code: seasonal.code,
      description: seasonal.desc,
      discountType: "percentage",
      discountValue: 20 + Math.floor(Math.random() * 15), // 20-35%
      minAmount: 350,
      maxDiscount: 400,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days
      usageLimit: 30,
      usedCount: 0,
      isActive: true,
      applicableDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      category: 'seasonal'
    });

    return dynamicCoupons;
  }

  // Get stored dynamic coupons
  private static getStoredDynamicCoupons(): Coupon[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('dynamicCoupons');
    return stored ? JSON.parse(stored) : [];
  }

  // Store dynamic coupons
  private static storeDynamicCoupons(coupons: Coupon[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('dynamicCoupons', JSON.stringify(coupons));
  }

  static validateCoupon(code: string, totalAmount: number, selectedDate?: Date): ValidationResult {
    const coupon = this.getAvailableCoupons(totalAmount).find(
      (c: Coupon) => c.code.toUpperCase() === code.toUpperCase()
    );

    if (!coupon) {
      return { isValid: false, message: 'Invalid coupon code' };
    }

    // Check if coupon is expired
    const currentDate = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validUntil = new Date(coupon.validUntil);

    if (currentDate < validFrom) {
      return { isValid: false, message: 'Coupon not yet active' };
    }

    if (currentDate > validUntil) {
      return { isValid: false, message: 'Coupon has expired' };
    }

    // Check if already used
    const usedCoupons = this.getUsedCoupons();
    if (usedCoupons.has(coupon.code)) {
      return { isValid: false, message: 'Coupon already used' };
    }

    // Check applicable days
    if (selectedDate) {
      const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      if (!coupon.applicableDays.includes(dayName)) {
        return { isValid: false, message: 'Coupon not valid for selected day' };
      }
    }

    // Check first booking requirement
    if (coupon.isFirstBookingOnly && !this.getUserFirstBooking()) {
      return { isValid: false, message: 'This coupon is for first booking only' };
    }

    // Calculate discount
    let discountAmount = 0;
    
    if (coupon.discountType === 'fixed') {
      discountAmount = Math.min(coupon.discountValue, totalAmount);
    } else {
      discountAmount = (totalAmount * coupon.discountValue) / 100;
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }

    const finalAmount = Math.max(0, totalAmount - discountAmount);

    return {
      isValid: true,
      message: 'Coupon applied successfully!',
      coupon,
      discountAmount,
      finalAmount
    };
  }

  static applyCoupon(code: string): void {
    const usedCoupons = this.getUsedCoupons();
    usedCoupons.add(code.toUpperCase());
    this.setUsedCoupons(usedCoupons);
    
    // Mark first booking as completed
    this.setUserFirstBooking(false);
  }

  static removeCoupon(code: string): void {
    const usedCoupons = this.getUsedCoupons();
    usedCoupons.delete(code.toUpperCase());
    this.setUsedCoupons(usedCoupons);
  }

  static getAvailableCoupons(totalAmount: number): Coupon[] {
    // Generate new coupons if needed
    if (this.shouldGenerateNewCoupons()) {
      const newCoupons = this.generateDynamicCoupons();
      this.storeDynamicCoupons(newCoupons);
      this.markCouponsGenerated();
    }

    const staticCoupons = [
      {
        code: "WELCOME100",
        description: "Get ₹100 off on your first booking",
        discountType: "fixed" as const,
        discountValue: 100,
        minAmount: 0,
        maxDiscount: 100,
        validFrom: "2025-01-01",
        validUntil: "2025-12-31",
        usageLimit: 1,
        usedCount: 0,
        isActive: true,
        applicableDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        isFirstBookingOnly: true,
        category: 'welcome'
      },
      {
        code: "SPORTS20",
        description: "Get 20% off on any booking",
        discountType: "percentage" as const,
        discountValue: 20,
        minAmount: 300,
        maxDiscount: 500,
        validFrom: "2025-01-01",
        validUntil: "2025-12-31",
        usageLimit: 3,
        usedCount: 0,
        isActive: true,
        applicableDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        category: 'seasonal'
      },
      {
        code: "TURF50",
        description: "Get ₹50 off on bookings above ₹500",
        discountType: "fixed" as const,
        discountValue: 50,
        minAmount: 500,
        maxDiscount: 50,
        validFrom: "2025-01-01",
        validUntil: "2025-12-31",
        usageLimit: 2,
        usedCount: 0,
        isActive: true,
        applicableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        category: 'seasonal'
      }
    ];

    const dynamicCoupons = this.getStoredDynamicCoupons();
    const allCoupons = [...staticCoupons, ...dynamicCoupons];
    const usedCoupons = this.getUsedCoupons();
    
    // Filter expired coupons
    const currentDate = new Date();
    const validCoupons = allCoupons.filter(coupon => {
      const validUntil = new Date(coupon.validUntil);
      return validUntil > currentDate;
    });

    return validCoupons.filter(coupon => {
      if (!coupon.isActive) return false;
      if (usedCoupons.has(coupon.code)) return false;
      if (totalAmount < coupon.minAmount) return false;
      if (coupon.isFirstBookingOnly && !this.getUserFirstBooking()) return false;
      return true;
    });
  }

  static getBestCoupon(totalAmount: number, selectedDate?: Date): ValidationResult | null {
    const availableCoupons = this.getAvailableCoupons(totalAmount);
    let bestCoupon: ValidationResult | null = null;
    let maxDiscount = 0;

    availableCoupons.forEach(coupon => {
      const result = this.validateCoupon(coupon.code, totalAmount, selectedDate);
      if (result.isValid && result.discountAmount && result.discountAmount > maxDiscount) {
        maxDiscount = result.discountAmount;
        bestCoupon = result;
      }
    });

    return bestCoupon;
  }

  static resetUsedCoupons(): void {
    this.setUsedCoupons(new Set());
    this.setUserFirstBooking(true);
  }

  static getTotalSavings(): number {
    const usedCoupons = this.getUsedCoupons();
    let totalSavings = 0;
    
    usedCoupons.forEach(code => {
      totalSavings += 100;
    });
    
    return totalSavings;
  }

  // Manual trigger to generate new coupons
  static forceGenerateCoupons(): void {
    const newCoupons = this.generateDynamicCoupons();
    this.storeDynamicCoupons(newCoupons);
    this.markCouponsGenerated();
  }

  // Clear all data for testing
  static clearAllData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('usedCoupons');
    localStorage.removeItem('userFirstBooking');
    localStorage.removeItem('dynamicCoupons');
    localStorage.removeItem('lastCouponGeneration');
  }

  // Get coupon categories for display
  static getCouponCategories(): string[] {
    const coupons = this.getAvailableCoupons(1000);
    const categories = [...new Set(coupons.map(c => c.category).filter(Boolean))] as string[];
    return categories;
  }
}

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return `₹${Math.round(amount)}`;
};