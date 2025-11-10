import React, { useState, useMemo } from 'react';
import { Search, ChevronsUpDown, Edit, Trash2 } from 'lucide-react';

export interface Column<T> {
  accessor: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface InteractiveTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function InteractiveTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  onEdit,
  onDelete,
}: InteractiveTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);

    const filteredData = useMemo(() => {
        return data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    const requestSort = (key: keyof T) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 flex items-center justify-between">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Cerca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
        </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort(column.accessor)}>
                <div className="flex items-center">
                    {column.header}
                    <ChevronsUpDown size={14} className="ml-2" />
                </div>
              </th>
            ))}
            {(onEdit || onDelete) && <th scope="col" className="px-6 py-3 text-right">Azioni</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td key={`${item.id}-${String(column.accessor)}`} className="px-6 py-4">
                  {column.render ? column.render(item) : String(item[column.accessor])}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                        {onEdit && <button onClick={(e) => { e.stopPropagation(); onEdit(item); }} className="text-blue-500 hover:text-blue-700"><Edit size={18}/></button>}
                        {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(item); }} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>}
                    </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InteractiveTable;
