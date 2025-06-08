
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PriceDisplayProps {
  basePrice: number;
  finalPrice: number;
  vehicleData: {
    carburant: string;
    puissance: string;
    valeur: string;
  };
}

const PriceDisplay = ({ basePrice, finalPrice, vehicleData }: PriceDisplayProps) => {
  const savings = basePrice !== finalPrice ? Math.abs(finalPrice - basePrice) : 0;
  const isIncrease = finalPrice > basePrice;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="text-center">Votre Devis Final</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {finalPrice.toLocaleString()} DH
          </div>
          <p className="text-muted-foreground">par an</p>
        </div>

        {savings > 0 && (
          <div className="text-center">
            <Badge variant={isIncrease ? "destructive" : "default"}>
              {isIncrease ? '+' : '-'} {savings.toLocaleString()} DH
              {isIncrease ? ' avec options' : ' d\'économie'}
            </Badge>
          </div>
        )}

        <Separator />

        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">Détails du véhicule :</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-muted-foreground">Carburant :</span>
              <p className="font-medium">{vehicleData.carburant}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Puissance :</span>
              <p className="font-medium">{vehicleData.puissance} CV</p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Valeur :</span>
              <p className="font-medium">{parseInt(vehicleData.valeur).toLocaleString()} DH</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceDisplay;
