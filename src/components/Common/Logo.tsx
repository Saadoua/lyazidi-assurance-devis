
import { Shield } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
        <Shield className="w-8 h-8 text-primary-foreground" />
      </div>
    </div>
  );
};

export default Logo;
