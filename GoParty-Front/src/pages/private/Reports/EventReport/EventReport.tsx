import React, { useState, useMemo } from 'react';
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { useTable, usePagination, useFilters, Column, TableInstance, TableState, Row } from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

// Define the shape of our data
interface Event {
  eventName: string;
  quantityCreated: number;
  totalTicketsSold: number;
  totalRevenue: number;
  date: string; // Adding date to filter by date range
}

const EventReport: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const data = useMemo<Event[]>(() => [
    { eventName: 'Evento A', quantityCreated: 5, totalTicketsSold: 150, totalRevenue: 7500, date: '2023-06-01' },
    { eventName: 'Evento B', quantityCreated: 3, totalTicketsSold: 100, totalRevenue: 5000, date: '2023-06-05' },
    { eventName: 'Evento C', quantityCreated: 2, totalTicketsSold: 50, totalRevenue: 2500, date: '2023-06-10' },
    // Adicione mais dados conforme necessário
  ], []);

  const columns = useMemo<Column<Event>[]>(() => [
    { Header: 'Nome do Evento', accessor: 'eventName' },
    { Header: 'Quantidade de Eventos Criados', accessor: 'quantityCreated' },
    { Header: 'Total de Ingressos Vendidos', accessor: 'totalTicketsSold' },
    { Header: 'Valor Arrecadado Total (R$)', accessor: 'totalRevenue' },
  ], []);

  // Define the table instance with pagination and filters
  const tableInstance = useTable<Event>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 } as Partial<TableState<Event>>,
    },
    useFilters, // Hook to enable filters
    usePagination // Hook to enable pagination
  ) as TableInstance<Event> & {
    page: Array<Row<Event>>;
    setFilter: (columnId: string, filterValue: any) => void;
    pageOptions: number[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    previousPage: () => void;
    nextPage: () => void;
    setPageSize: (size: number) => void;
    state: TableState<Event> & {
      pageIndex: number;
      pageSize: number;
    };
  };

  // Destructure the tableInstance for use in the component
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    state: { pageIndex, pageSize },
    pageOptions,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
  } = tableInstance;

  // Apply date range filter
  const applyDateFilter = () => {
    setFilter('date', [startDate, endDate]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-left">Relatório de Eventos</h1>
          <br />
          
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <DatePicker
                selected={startDate || undefined}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                placeholderText="Data Início"
                className="border p-2 rounded"
              />
              <DatePicker
                selected={endDate || undefined}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                minDate={startDate || undefined}
                placeholderText="Data Fim"
                className="border p-2 rounded"
              />
              <button 
                onClick={applyDateFilter}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Filtrar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-md border-collapse">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 border-b">
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className="text-left p-3 text-gray-700">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b hover:bg-gray-50">
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="p-3 text-gray-700">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
            <span>
              Página <strong>{pageIndex + 1} de {pageOptions.length}</strong>
            </span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="border p-2 rounded-md"
            >
              {[5, 10, 20].map(size => (
                <option key={size} value={size}>
                  Mostrar {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventReport;
