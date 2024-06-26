import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { useTable, usePagination, useFilters, Column, TableInstance, TableState, Row } from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

// Define the shape of our data
interface Event {
  eventName: string | null;
  quantityCreated: number;
  totalTicketsSold: number;
  totalRevenue: number;
  date: string; // Adding date to filter by date range
}

interface ApiResponse {
  data: {
    nome: string;
    quantidadeEventosCriados: number;
    totalIngressosVendidos: number;
    valorArrecadadoTotal: number;
  }[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

const EventReport: React.FC = () => {
  const { graduationId } = useParams();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const columns = useMemo<Column<Event>[]>(() => [
    { Header: 'Nome do Evento', accessor: 'eventName' },
    { Header: 'Quantidade de Eventos Criados', accessor: 'quantityCreated' },
    { Header: 'Total de Ingressos Vendidos', accessor: 'totalTicketsSold' },
    { Header: 'Valor Arrecadado Total (R$)', accessor: 'totalRevenue' },
  ], []);

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8081/v1/relatorio/relatorio-evento-por-membro?idFormatura=${graduationId}&pagina=0&qtdItens=10`;
      const start = formatDate(startDate);
      const end = formatDate(endDate);
      if (start) {
        url += `&dataInicio=${start}`;
      }
      if (end) {
        url += `&dataFim=${end}`;
      }
      const response = await fetch(url);
      const result: ApiResponse = await response.json();
      if (result.data && Array.isArray(result.data)) {
        const mappedData = result.data.map(item => ({
          eventName: item.nome,
          quantityCreated: item.quantidadeEventosCriados,
          totalTicketsSold: item.totalIngressosVendidos,
          totalRevenue: item.valorArrecadadoTotal,
          date: '', // Add appropriate date if available
        }));
        setData(mappedData);
      } else {
        setData([]);
      }
      setTotalPages(result.pagination.totalPages); // Set total pages from pagination data
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Ensure data is an array on error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [graduationId, startDate, endDate]);

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
    fetchData();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-4">
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

          {loading ? (
            <div className="text-center">Carregando...</div>
          ) : (
            data.length === 0 ? (
              <div className="text-center">Não existem registros</div>
            ) : (
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
            )
          )}

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
              Página <strong>{pageIndex + 1} de {totalPages}</strong>
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
