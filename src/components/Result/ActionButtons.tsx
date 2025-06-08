
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ActionButtonsProps {
  onEdit: () => void;
  onValidate: () => void;
}

const ActionButtons = ({ onEdit, onValidate }: ActionButtonsProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h4 className="font-semibold text-center">Actions</h4>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onEdit}
          >
            Modifier le devis
          </Button>
          
          <Button 
            className="w-full" 
            size="lg"
            onClick={onValidate}
          >
            Valider et sauvegarder
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Votre devis sera sauvegardé dans votre espace personnel
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionButtons;
