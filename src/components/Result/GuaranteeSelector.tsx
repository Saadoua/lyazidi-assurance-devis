
import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface GuaranteeSelectorProps {
  basePrice: number;
  onGuaranteesChange: (guarantees: string[]) => void;
  onPriceChange: (price: number) => void;
}

const optionalGuarantees = [
  { id: 'vol', name: 'Vol', percentage: 10, description: 'Protection contre le vol du véhicule' },
  { id: 'bris', name: 'Bris de glace', percentage: 5, description: 'Réparation/remplacement des vitres' },
  { id: 'assistance', name: 'Assistance 24h/24', percentage: 8, description: 'Dépannage et remorquage' },
  { id: 'tousrisques', name: 'Tous risques', percentage: 25, description: 'Couverture complète tous dommages' }
];

const GuaranteeSelector = ({ basePrice, onGuaranteesChange, onPriceChange }: GuaranteeSelectorProps) => {
  const [selectedGuarantees, setSelectedGuarantees] = useState<string[]>([]);

  useEffect(() => {
    // Calculate total price with selected guarantees
    const totalIncrease = selectedGuarantees.reduce((sum, guaranteeId) => {
      const guarantee = optionalGuarantees.find(g => g.id === guaranteeId);
      return sum + (guarantee ? guarantee.percentage : 0);
    }, 0);
    
    const newPrice = basePrice * (1 + totalIncrease / 100);
    onPriceChange(Math.round(newPrice));
    onGuaranteesChange(selectedGuarantees);
  }, [selectedGuarantees, basePrice, onGuaranteesChange, onPriceChange]);

  const handleGuaranteeChange = (guaranteeId: string, checked: boolean) => {
    if (checked) {
      setSelectedGuarantees(prev => [...prev, guaranteeId]);
    } else {
      setSelectedGuarantees(prev => prev.filter(id => id !== guaranteeId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Garanties incluses</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Responsabilité Civile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Défense et recours</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Protection juridique</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-3">Garanties optionnelles</h4>
        <div className="space-y-4">
          {optionalGuarantees.map((guarantee) => {
            const isSelected = selectedGuarantees.includes(guarantee.id);
            const additionalCost = Math.round(basePrice * guarantee.percentage / 100);
            
            return (
              <div key={guarantee.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox
                  id={guarantee.id}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleGuaranteeChange(guarantee.id, checked as boolean)}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={guarantee.id} className="font-medium cursor-pointer">
                      {guarantee.name}
                    </Label>
                    <Badge variant="outline">
                      +{additionalCost.toLocaleString()} DH
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSelector;
