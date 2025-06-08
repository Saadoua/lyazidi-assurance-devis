
import { useEffect, useState } from 'react';
import { calculationService } from '@/services/calculationService';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface QuoteCalculatorProps {
  vehicleData: {
    carburant: string;
    puissance: string;
    valeur: string;
    dateCirculation: string;
  };
  onQuoteCalculated: (quote: any) => void;
}

const QuoteCalculator = ({ vehicleData, onQuoteCalculated }: QuoteCalculatorProps) => {
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    // Calculate quote whenever vehicle data changes
    if (vehicleData.carburant && vehicleData.puissance && vehicleData.valeur && vehicleData.dateCirculation) {
      const calculatedQuote = calculationService.calculateQuote(vehicleData);
      setQuote(calculatedQuote);
      onQuoteCalculated(calculatedQuote);
    } else {
      setQuote(null);
      onQuoteCalculated(null);
    }
  }, [vehicleData, onQuoteCalculated]);

  if (!quote) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Remplissez tous les champs pour voir votre devis</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">
          {quote.totalPrice.toLocaleString()} DH
        </h3>
        <p className="text-sm text-muted-foreground">Prime annuelle RC</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-semibold">Détail du calcul :</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Prime de base</span>
            <span>{quote.basePrice} DH</span>
          </div>
          
          <div className="flex justify-between">
            <span>Coefficient puissance ({vehicleData.puissance} CV)</span>
            <Badge variant="secondary">x {quote.coefficients.puissance}</Badge>
          </div>
          
          <div className="flex justify-between">
            <span>Coefficient âge ({quote.vehicleAge} ans)</span>
            <Badge variant="secondary">x {quote.coefficients.age}</Badge>
          </div>
          
          <div className="flex justify-between">
            <span>Coefficient valeur</span>
            <Badge variant="secondary">x {quote.coefficients.valeur}</Badge>
          </div>
          
          <div className="flex justify-between">
            <span>Coefficient carburant ({vehicleData.carburant})</span>
            <Badge variant="secondary">x {quote.coefficients.carburant}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      <div className="bg-primary/5 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Garanties incluses :</h4>
        <ul className="text-sm space-y-1">
          <li>✓ Responsabilité Civile</li>
          <li>✓ Défense et recours</li>
          <li>✓ Protection juridique</li>
        </ul>
      </div>
    </div>
  );
};

export default QuoteCalculator;
