import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { useTable, usePagination, useFilters, useSortBy, Column, TableInstance, TableState, Row } from 'react-table';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { pt } from 'date-fns/locale/pt';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

registerLocale('pt', pt);

interface Event {
  nome: string | null;
  quantityCreated: number;
  totalTicketsSold: number;
  totalRevenue: number;
  date: string;
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
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const columns = useMemo<Column<Event>[]>(() => [
    { Header: 'Nome do Criador', accessor: 'nome' },
    { Header: 'Quantidade de Eventos Criados', accessor: 'quantityCreated' },
    { Header: 'Total de Ingressos Vendidos', accessor: 'totalTicketsSold' },
    { Header: 'Valor Arrecadado Total (R$)', accessor: 'totalRevenue' },
  ], []);

  const formatDateForBackend = (date: Date | null) => {
    if (!date) return null;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };

  const fetchData = async (pagina: number, qtdItens: number) => {
    setLoading(true);
    try {
      let url = `http://localhost:8081/v1/relatorio/relatorio-evento-por-membro?idFormatura=${graduationId}&pagina=${pagina}&qtdItens=${qtdItens}`;
      const start = formatDateForBackend(startDate);
      const end = formatDateForBackend(endDate);
      if (start) {
        url += `&dataInicio=${start}`;
      }
      if (end) {
        url += `&dataFim=${end}`;
      }
      console.log(url)
      const response = await fetch(url);
      const result: ApiResponse = await response.json();
      console.log(result);
      if (result.data && Array.isArray(result.data)) {
        const mappedData = result.data.map(item => ({
          nome: item.nome,
          quantityCreated: item.quantidadeEventosCriados,
          totalTicketsSold: item.totalIngressosVendidos,
          totalRevenue: item.valorArrecadadoTotal,
          date: '',
        }));
        setData(mappedData);
      } else {
        setData([]);
      }
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPageIndex, currentPageSize);
  }, [graduationId, startDate, endDate, currentPageIndex, currentPageSize]);

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setErrorMessage("A data inicial não pode ser posterior à data final.");
    } else {
      setErrorMessage(null);
    }
  }, [startDate, endDate]);

  const tableInstance = useTable<Event>(
    {
      columns,
      data,
      initialState: { pageIndex: currentPageIndex, pageSize: currentPageSize } as Partial<TableState<Event>>,
      manualPagination: true,
      pageCount: totalPages,
    },
    useFilters,
    useSortBy,
    usePagination
  ) as TableInstance<Event> & {
    page: Array<Row<Event>>;
    setFilter: (columnId: string, filterValue: any) => void;
    pageOptions: number[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    previousPage: () => void;
    nextPage: () => void;
    setPageSize: (size: number) => void;
    gotoPage: (pageIndex: number) => void;
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
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
    gotoPage,
  } = tableInstance;

  const applyDateFilter = () => {
    if (!errorMessage) {
      fetchData(currentPageIndex, currentPageSize);
    }
  };

  const exportToPDF = () => {
    const input = reportRef.current;
    if (input) {
      const exportButton = document.getElementById('exportButton');
      const navigationButtons = document.getElementById('navigationButtons');
      const filterButton = document.getElementById('filterButton');

      if (exportButton) exportButton.style.display = 'none';
      if (navigationButtons) navigationButtons.style.display = 'none';
      if (filterButton) filterButton.style.display = 'none';

      html2canvas(input, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("relatorio-eventos.pdf");

        if (exportButton) exportButton.style.display = 'block';
        if (navigationButtons) navigationButtons.style.display = 'flex';
        if (filterButton) filterButton.style.display = 'inline-block';
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-4" ref={reportRef} style={{ position: 'relative' }}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4 text-left">Relatório de Eventos</h1>
          </div>
          <br />

          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <DatePicker
                selected={startDate || undefined}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                dateFormat="dd/MM/yyyy"
                placeholderText="Data Início"
                className="border p-2 rounded"
                locale="pt"
              />
              <DatePicker
                selected={endDate || undefined}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                minDate={startDate || undefined}
                dateFormat="dd/MM/yyyy"
                placeholderText="Data Fim"
                className="border p-2 rounded"
                locale="pt"
              />
              <button 
                onClick={applyDateFilter}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                disabled={!!errorMessage}
                id="filterButton"
              >
                Filtrar
              </button>
              <button 
                onClick={exportToPDF}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                id="exportButton"
              >
                Exportar PDF
              </button>
            </div>
          </div>

          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

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
                          <th {...column.getHeaderProps(column.getSortByToggleProps())} title="Ordenar" className="text-left p-3 text-gray-700">
                            {column.render('Header')}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' 🔽'
                                  : ' 🔼'
                                : ''}
                            </span>
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

          <div className="flex justify-between items-center mt-4" id="navigationButtons">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const newPageIndex = pageIndex - 1;
                  setCurrentPageIndex(newPageIndex);
                  gotoPage(newPageIndex);
                  fetchData(newPageIndex, pageSize);
                }}
                disabled={!canPreviousPage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => {
                  const newPageIndex = pageIndex + 1;
                  setCurrentPageIndex(newPageIndex);
                  gotoPage(newPageIndex);
                  fetchData(newPageIndex, pageSize);
                }}
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
              onChange={e => {
                const newSize = Math.min(Number(e.target.value), 20);
                setCurrentPageSize(newSize);
                setCurrentPageIndex(0);
                setPageSize(newSize);
                fetchData(0, newSize);
              }}
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
