import { useState, useMemo, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import Card from './Card';

export interface Column<T> {
  accessor: keyof T;
  header: string;
  render?: (item: T) => ReactNode;
}

interface InteractiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchableColumn: keyof T;
  title: string;
  children?: ReactNode; // For buttons like "Add New"
}

function InteractiveTable<T extends object>({ data, columns, searchableColumn, title, children }: InteractiveTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const value = item[searchableColumn];
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchableColumn]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);
  
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: keyof T) => {
      if (!sortConfig || sortConfig.key !== key) {
          return null;
      }
      return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  }

  return (
    <Card className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cerca..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
                {children}
            </div>
        </div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            {columns.map(column => (
              <th
                key={String(column.accessor)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(column.accessor)}
              >
                <div className="flex items-center gap-1">
                    {column.header}
                    {getSortIcon(column.accessor)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={String(column.accessor)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {column.render ? column.render(item) : String(item[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
            Pagina {currentPage} di {totalPages}
        </span>
        <div className="flex gap-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            >
                Precedente
            </button>
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            >
                Successivo
            </button>
        </div>
      </div>
    </Card>
  );
}

export default InteractiveTable;
