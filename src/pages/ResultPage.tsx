
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Common/Header';
import PriceDisplay from '@/components/Result/PriceDisplay';
import GuaranteeSelector from '@/components/Result/GuaranteeSelector';
import ActionButtons from '@/components/Result/ActionButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { authService } from '@/services/authService';

const ResultPage = () => {
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState(null);
  const [selectedGuarantees, setSelectedGuarantees] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    // Load quote data from localStorage
    const savedQuote = localStorage.getItem('currentQuote');
    if (!savedQuote) {
      navigate('/quote');
      return;
    }

    const parsedQuote = JSON.parse(savedQuote);
    setQuoteData(parsedQuote);
    setFinalPrice(parsedQuote.calculatedQuote.totalPrice);
  }, [navigate]);

  const handleEditQuote = () => {
    navigate('/quote');
  };

  const handleValidateQuote = () => {
    // Save final quote with selected guarantees
    const finalQuote = {
      ...quoteData,
      selectedGuarantees,
      finalPrice,
      timestamp: new Date().toISOString()
    };
    
    // Save to user's quotes history
    const currentUser = authService.getCurrentUser();
    const existingQuotes = JSON.parse(localStorage.getItem(`quotes_${currentUser.email}`) || '[]');
    existingQuotes.push(finalQuote);
    localStorage.setItem(`quotes_${currentUser.email}`, JSON.stringify(existingQuotes));
    
    // Show success message and redirect
    alert('Votre devis a été sauvegardé avec succès !');
    navigate('/quote');
  };

  if (!quoteData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Votre Devis</h1>
            <p className="text-muted-foreground">Personnalisez vos garanties</p>
            <Progress value={100} className="mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <PriceDisplay 
                basePrice={quoteData.calculatedQuote.totalPrice}
                finalPrice={finalPrice}
                vehicleData={quoteData.vehicleData}
              />
              
              <ActionButtons
                onEdit={handleEditQuote}
                onValidate={handleValidateQuote}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Garanties et Options</CardTitle>
              </CardHeader>
              <CardContent>
                <GuaranteeSelector
                  basePrice={quoteData.calculatedQuote.totalPrice}
                  onGuaranteesChange={setSelectedGuarantees}
                  onPriceChange={setFinalPrice}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
