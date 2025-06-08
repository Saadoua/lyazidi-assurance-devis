
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VehicleFormProps {
  vehicleData: {
    carburant: string;
    puissance: string;
    valeur: string;
    dateCirculation: string;
  };
  onDataChange: (data: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const VehicleForm = ({ vehicleData, onDataChange, onValidationChange }: VehicleFormProps) => {
  const validateForm = () => {
    const isValid = 
      vehicleData.carburant !== '' &&
      vehicleData.puissance !== '' &&
      parseInt(vehicleData.puissance) >= 1 &&
      parseInt(vehicleData.puissance) <= 50 &&
      vehicleData.valeur !== '' &&
      parseInt(vehicleData.valeur) >= 10000 &&
      parseInt(vehicleData.valeur) <= 2000000 &&
      vehicleData.dateCirculation !== '' &&
      new Date(vehicleData.dateCirculation) <= new Date();
    
    onValidationChange(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [vehicleData]);

  const handleInputChange = (field: string, value: string) => {
    onDataChange({
      ...vehicleData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="carburant">Type de carburant</Label>
        <Select 
          value={vehicleData.carburant} 
          onValueChange={(value) => handleInputChange('carburant', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez le carburant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Essence">Essence</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="Électrique">Électrique</SelectItem>
            <SelectItem value="Hybride">Hybride</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="puissance">Puissance (CV fiscaux)</Label>
        <Input
          id="puissance"
          type="number"
          min="1"
          max="50"
          value={vehicleData.puissance}
          onChange={(e) => handleInputChange('puissance', e.target.value)}
          placeholder="8"
        />
        {vehicleData.puissance && (parseInt(vehicleData.puissance) < 1 || parseInt(vehicleData.puissance) > 50) && (
          <p className="text-sm text-destructive">La puissance doit être entre 1 et 50 CV</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="valeur">Valeur du véhicule (DH)</Label>
        <Input
          id="valeur"
          type="number"
          min="10000"
          max="2000000"
          value={vehicleData.valeur}
          onChange={(e) => handleInputChange('valeur', e.target.value)}
          placeholder="150000"
        />
        {vehicleData.valeur && (parseInt(vehicleData.valeur) < 10000 || parseInt(vehicleData.valeur) > 2000000) && (
          <p className="text-sm text-destructive">La valeur doit être entre 10,000 et 2,000,000 DH</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateCirculation">Date de mise en circulation</Label>
        <Input
          id="dateCirculation"
          type="date"
          value={vehicleData.dateCirculation}
          onChange={(e) => handleInputChange('dateCirculation', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        {vehicleData.dateCirculation && new Date(vehicleData.dateCirculation) > new Date() && (
          <p className="text-sm text-destructive">La date doit être dans le passé</p>
        )}
      </div>
    </div>
  );
};

export default VehicleForm;
