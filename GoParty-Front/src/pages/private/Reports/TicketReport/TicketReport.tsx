import React, { useState, useMemo } from 'react';
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { useTable, usePagination, useFilters, Column, TableInstance, TableState, Row, Cell } from 'react-table';

// Define the shape of our data
interface Ticket {
  ticketCode: string;
  purchaseDate: string;
  buyerName: string;
  eventName: string;
  status: string;
}

const TicketReport: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');

  // Example data
  const data = useMemo<Ticket[]>(() => [
    { ticketCode: 'A001', purchaseDate: '2023-06-01', buyerName: 'João Silva', eventName: 'Evento A', status: 'Pago' },
    { ticketCode: 'A002', purchaseDate: '2023-06-05', buyerName: 'Maria Oliveira', eventName: 'Evento B', status: 'Pendente' },
    { ticketCode: 'A003', purchaseDate: '2023-06-10', buyerName: 'Carlos Souza', eventName: 'Evento C', status: 'Cancelado' },
    // Adicione mais dados conforme necessário
  ], []);

  const columns = useMemo<Column<Ticket>[]>(() => [
    { Header: 'Código do Ingresso', accessor: 'ticketCode' },
    { Header: 'Data da Compra', accessor: 'purchaseDate' },
    { Header: 'Nome do Comprador', accessor: 'buyerName' },
    { Header: 'Nome do Evento', accessor: 'eventName' },
    { Header: 'Status', accessor: 'status' },
  ], []);

  // Define the table instance with pagination and filters
  const tableInstance = useTable<Ticket>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 } as Partial<TableState<Ticket>>,
    },
    useFilters, // Hook to enable filters
    usePagination // Hook to enable pagination
  ) as TableInstance<Ticket> & {
    page: Array<Row<Ticket>>;
    setFilter: (columnId: string, filterValue: any) => void;
    pageOptions: number[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    previousPage: () => void;
    nextPage: () => void;
    setPageSize: (size: number) => void;
    state: TableState<Ticket> & {
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

  // Apply status filter
  const applyStatusFilter = (status: string) => {
    setFilter('status', status || undefined);
  };

  // Apply event name filter
  const applyEventNameFilter = (name: string) => {
    setFilter('eventName', name || undefined);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-left">Relatório de Ingressos</h1>
          <br />
          
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <input
                type="text"
                value={eventName}
                onChange={e => { setEventName(e.target.value); applyEventNameFilter(e.target.value); }}
                placeholder="Nome do Evento"
                className="border p-2 rounded-md"
              />
            </div>

            <select
              value={status}
              onChange={e => { setStatus(e.target.value); applyStatusFilter(e.target.value); }}
              className="border p-2 rounded-md"
            >
              <option value="">Todos</option>
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
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

export default TicketReport;
