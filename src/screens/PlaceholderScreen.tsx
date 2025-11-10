import { HardHat } from 'lucide-react';
import Card from '@/components/ui/Card';

interface PlaceholderScreenProps {
    pageTitle: string;
}

const PlaceholderScreen = ({ pageTitle }: PlaceholderScreenProps) => {
    return (
        <div className="p-6 lg:p-8 h-full flex items-center justify-center">
           <Card className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900/50 rounded-full text-yellow-600 dark:text-yellow-400">
                        <HardHat size={40} />
                    </div>
                </div>
                <h1 className="text-2xl font-bold dark:text-white">
                    Sezione "{pageTitle}" in Costruzione
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Questa funzionalità sarà presto disponibile. Stiamo lavorando per te!
                </p>
           </Card>
        </div>
    );
};

export default PlaceholderScreen;