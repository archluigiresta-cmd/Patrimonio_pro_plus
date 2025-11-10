import { Download } from 'lucide-react';
import { convertToCSV, downloadCSV } from '../../utils/csv';

interface ExportButtonProps<T> {
  data: T[];
  filename: string;
}

function ExportButton<T extends object>({ data, filename }: ExportButtonProps<T>) {
  const handleExport = () => {
    const csv = convertToCSV(data);
    downloadCSV(csv, filename);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Download size={16} />
      Esporta CSV
    </button>
  );
}

export default ExportButton;