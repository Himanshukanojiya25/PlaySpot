export interface ExtensionCalculation {
  baseAmount: number;
  peakSurcharge: number;
  weekendSurcharge: number;
  totalAmount: number;
  breakdown: string[];
}

export interface DamageCalculation {
  repairCost: number;
  replacementCost: number;
  totalDamageCost: number;
  damagedItems: Array<{
    item: string;
    description: string;
    cost: number;
    type: 'repair' | 'replacement' | 'partial';
  }>;
}

export class ExtensionCalculator {
  static calculateExtension(
    turfId: string,
    extensionHours: number,
    startTime: string,
    selectedDate: Date
  ): ExtensionCalculation {
    const rates = this.getTurfRates(turfId);
    if (!rates) {
      throw new Error(`Rates not found for turf ${turfId}`);
    }

    const baseAmount = extensionHours * rates.baseHourlyRate;
    let peakSurcharge = 0;
    let weekendSurcharge = 0;
    const breakdown: string[] = [];

    // Check peak hours
    const isPeakHour = this.isPeakHour(startTime, rates.peakHours);
    if (isPeakHour) {
      peakSurcharge = extensionHours * rates.peakSurcharge;
      breakdown.push(`Peak hours surcharge: ₹${peakSurcharge}`);
    }

    // Check weekend
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6; // 0=Sunday, 6=Saturday
    if (isWeekend) {
      weekendSurcharge = extensionHours * rates.weekendSurcharge;
      breakdown.push(`Weekend surcharge: ₹${weekendSurcharge}`);
    }

    const totalAmount = baseAmount + peakSurcharge + weekendSurcharge;

    breakdown.unshift(`Base extension (${extensionHours} hrs): ₹${baseAmount}`);
    breakdown.push(`Total: ₹${totalAmount}`);

    return {
      baseAmount,
      peakSurcharge,
      weekendSurcharge,
      totalAmount,
      breakdown
    };
  }

  static calculateDamage(damageReports: Array<{
    item: string;
    damageType: 'repair' | 'replacement' | 'partial';
    quantity: number;
  }>): DamageCalculation {
    const damageCharges = this.getDamageCharges();
    let repairCost = 0;
    let replacementCost = 0;
    const damagedItems: DamageCalculation['damagedItems'] = [];

    damageReports.forEach(report => {
      const charge = damageCharges.find(c => c.item === report.item);
      if (!charge) return;

      let cost = 0;
      let type: 'repair' | 'replacement' | 'partial' = 'repair';

      switch (report.damageType) {
        case 'repair':
          cost = charge.repairCost * report.quantity;
          repairCost += cost;
          type = 'repair';
          break;
        case 'replacement':
          cost = charge.replacementCost * report.quantity;
          replacementCost += cost;
          type = 'replacement';
          break;
        case 'partial':
          cost = charge.partialDamage * report.quantity;
          repairCost += cost;
          type = 'partial';
          break;
      }

      damagedItems.push({
        item: report.item,
        description: charge.description,
        cost,
        type
      });
    });

    const totalDamageCost = repairCost + replacementCost;

    return {
      repairCost,
      replacementCost,
      totalDamageCost,
      damagedItems
    };
  }

  static getTurfRates(turfId: string) {
    // This would import from extensionRates.json
    const rates = [
      {
        turfId: "1",
        baseHourlyRate: 200,
        peakSurcharge: 50,
        weekendSurcharge: 100,
        peakHours: ["18:00", "22:00"]
      },
      {
        turfId: "2",
        baseHourlyRate: 180,
        peakSurcharge: 40,
        weekendSurcharge: 80,
        peakHours: ["17:00", "21:00"]
      },
      {
        turfId: "3", 
        baseHourlyRate: 150,
        peakSurcharge: 30,
        weekendSurcharge: 60,
        peakHours: ["19:00", "23:00"]
      }
    ];
    return rates.find(rate => rate.turfId === turfId);
  }

  static getDamageCharges() {
    // This would import from damageCharges.json
    return [
      {
        item: "cricket_bat",
        description: "Cricket Bat",
        repairCost: 300,
        replacementCost: 1500,
        partialDamage: 150
      },
      {
        item: "tennis_ball", 
        description: "Tennis Ball",
        repairCost: 0,
        replacementCost: 50,
        partialDamage: 0
      },
      {
        item: "cricket_ball",
        description: "Cricket Ball",
        repairCost: 0, 
        replacementCost: 120,
        partialDamage: 0
      },
      {
        item: "stumps",
        description: "Wicket Stumps",
        repairCost: 100,
        replacementCost: 400,
        partialDamage: 50
      },
      {
        item: "goal_post",
        description: "Football Goal Post", 
        repairCost: 500,
        replacementCost: 2000,
        partialDamage: 200
      },
      {
        item: "protective_gear",
        description: "Protective Gear Set",
        repairCost: 200,
        replacementCost: 800, 
        partialDamage: 100
      },
      {
        item: "net_damage",
        description: "Boundary Net Damage",
        repairCost: 400,
        replacementCost: 1200,
        partialDamage: 200
      }
    ];
  }

  private static isPeakHour(startTime: string, peakHours: [string, string]): boolean {
    const [peakStart, peakEnd] = peakHours;
    return startTime >= peakStart && startTime <= peakEnd;
  }
}