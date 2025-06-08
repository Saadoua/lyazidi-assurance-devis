
interface VehicleData {
  carburant: string;
  puissance: string;
  valeur: string;
  dateCirculation: string;
}

interface QuoteResult {
  basePrice: number;
  coefficients: {
    puissance: number;
    age: number;
    valeur: number;
    carburant: number;
  };
  vehicleAge: number;
  totalPrice: number;
}

class CalculationService {
  private readonly BASE_PRICE = 500;

  private getPuissanceCoefficient(puissance: number): number {
    if (puissance <= 5) return 0.8;
    if (puissance <= 10) return 1.0;
    if (puissance <= 15) return 1.3;
    return 1.6;
  }

  private getAgeCoefficient(age: number): number {
    if (age <= 2) return 1.2;
    if (age <= 5) return 1.0;
    if (age <= 10) return 0.9;
    return 0.8;
  }

  private getValeurCoefficient(valeur: number): number {
    if (valeur < 100000) return 0.9;
    if (valeur <= 300000) return 1.0;
    if (valeur <= 500000) return 1.2;
    return 1.5;
  }

  private getCarburantCoefficient(carburant: string): number {
    switch (carburant) {
      case 'Essence': return 1.0;
      case 'Diesel': return 1.1;
      case 'Électrique': return 0.8;
      case 'Hybride': return 0.9;
      default: return 1.0;
    }
  }

  private calculateVehicleAge(dateCirculation: string): number {
    const circulationDate = new Date(dateCirculation);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - circulationDate.getTime());
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
    return diffYears;
  }

  calculateQuote(vehicleData: VehicleData): QuoteResult {
    const puissance = parseInt(vehicleData.puissance);
    const valeur = parseInt(vehicleData.valeur);
    const vehicleAge = this.calculateVehicleAge(vehicleData.dateCirculation);

    const coefficients = {
      puissance: this.getPuissanceCoefficient(puissance),
      age: this.getAgeCoefficient(vehicleAge),
      valeur: this.getValeurCoefficient(valeur),
      carburant: this.getCarburantCoefficient(vehicleData.carburant)
    };

    const totalPrice = Math.round(
      this.BASE_PRICE * 
      coefficients.puissance * 
      coefficients.age * 
      coefficients.valeur * 
      coefficients.carburant
    );

    return {
      basePrice: this.BASE_PRICE,
      coefficients,
      vehicleAge,
      totalPrice
    };
  }
}

export const calculationService = new CalculationService();
