
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Common/Header';
import VehicleForm from '@/components/Quote/VehicleForm';
import QuoteCalculator from '@/components/Quote/QuoteCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { authService } from '@/services/authService';

const QuotePage = () => {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState({
    carburant: '',
    puissance: '',
    valeur: '',
    dateCirculation: ''
  });
  const [calculatedQuote, setCalculatedQuote] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }
  }, [navigate]);

  const handleContinue = () => {
    if (calculatedQuote) {
      // Save quote data to localStorage
      localStorage.setItem('currentQuote', JSON.stringify({
        vehicleData,
        calculatedQuote
      }));
      navigate('/results');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Demande de Devis</h1>
            <p className="text-muted-foreground">Renseignez les informations de votre véhicule</p>
            <Progress value={50} className="mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations du Véhicule</CardTitle>
              </CardHeader>
              <CardContent>
                <VehicleForm
                  vehicleData={vehicleData}
                  onDataChange={setVehicleData}
                  onValidationChange={setIsFormValid}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calcul de Prime</CardTitle>
              </CardHeader>
              <CardContent>
                <QuoteCalculator
                  vehicleData={vehicleData}
                  onQuoteCalculated={setCalculatedQuote}
                />
                
                {calculatedQuote && isFormValid && (
                  <div className="mt-6 pt-6 border-t">
                    <Button 
                      onClick={handleContinue}
                      className="w-full"
                      size="lg"
                    >
                      Continuer vers les Garanties
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
