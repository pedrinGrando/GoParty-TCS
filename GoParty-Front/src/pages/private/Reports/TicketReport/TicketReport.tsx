import React, { useState, useEffect } from 'react';
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { useTable, usePagination, useFilters, useSortBy, Column, TableInstance, TableState, Row } from 'react-table';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Ticket {
  codigoIngresso: string;
  dataCompra: string;
  nomeComprador: string;
  nomeEvento: string;
  status: string;
}

interface ApiResponse {
  data: Ticket[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

const formatDate = (dateString: string) => {
  return dateString.split(' ')[0];
};

const TicketReport: React.FC = () => {
  const { graduationId } = useParams();
  const [status, setStatus] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');

  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);

  const columns = React.useMemo<Column<Ticket>[]>(
    () => [
      { Header: 'Código do Ingresso', accessor: 'codigoIngresso' },
      { Header: 'Data da Compra', accessor: 'dataCompra', Cell: ({ value }) => formatDate(value) },
      { Header: 'Nome do Comprador', accessor: 'nomeComprador' },
      { Header: 'Nome do Evento', accessor: 'nomeEvento' },
      { Header: 'Status', accessor: 'status' },
    ],
    []
  );

  const fetchData = async (pagina: number, qtdItens: number) => {
    setLoading(true);
    try {
      let url = `http://localhost:8081/v1/relatorio/ingresso?idFormatura=${graduationId}&pagina=${pagina}&qtdItens=${qtdItens}`;
      if (eventName) {
        url += `&nomeEvento=${encodeURIComponent(eventName)}`;
      }
      if (status) {
        url += `&status=${status}`;
      }
      const response = await fetch(url);
      const result: ApiResponse = await response.json();
      if (result.data && Array.isArray(result.data)) {
        setData(result.data);
        setTotalPages(result.pagination.totalPages);
      } else {
        setData([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      setTotalPages(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPageIndex, currentPageSize);
  }, [eventName, status, currentPageIndex, currentPageSize]);

  const tableInstance = useTable<Ticket>(
    {
      columns,
      data,
      initialState: { pageIndex: currentPageIndex, pageSize: currentPageSize } as Partial<TableState<Ticket>>,
      manualPagination: true,
      pageCount: totalPages,
    },
    useFilters,
    useSortBy,
    usePagination
  ) as TableInstance<Ticket> & {
    page: Array<Row<Ticket>>;
    setFilter: (columnId: string, filterValue: any) => void;
    pageOptions: number[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    previousPage: () => void;
    nextPage: () => void;
    setPageSize: (size: number) => void;
    gotoPage: (pageIndex: number) => void;
    state: TableState<Ticket> & {
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
    gotoPage,
  } = tableInstance;

  const applyStatusFilter = (status: string) => {
    setStatus(status || '');
    setCurrentPageIndex(0);
    fetchData(0, currentPageSize);
  };

  const applyEventNameFilter = (name: string) => {
    setEventName(name || '');
    setCurrentPageIndex(0);
    fetchData(0, currentPageSize);
  };

  const handlePreviousPage = () => {
    if (canPreviousPage) {
      const newPageIndex = pageIndex - 1;
      setCurrentPageIndex(newPageIndex);
      gotoPage(newPageIndex);
      fetchData(newPageIndex, pageSize);
    }
  };

  const handleNextPage = () => {
    if (canNextPage) {
      const newPageIndex = pageIndex + 1;
      setCurrentPageIndex(newPageIndex);
      gotoPage(newPageIndex);
      fetchData(newPageIndex, pageSize);
    }
  };

  const handleExport = async () => {
    const elementsToHide = document.querySelectorAll('.hide-on-export');
    elementsToHide.forEach(element => element.classList.add('hidden'));
    const input = document.getElementById('exportContainer');
    if (input) {
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('relatorio_ingressos.pdf');
    }
    elementsToHide.forEach(element => element.classList.remove('hidden'));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
          <div id="exportContainer">
            <h1 className="text-2xl font-bold mb-4 text-left">Relatório de Ingressos</h1>
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0 hide-on-export">
                <label htmlFor="eventNameInput" className="mr-2">Nome do Evento:</label>
                <input
                  id="eventNameInput"
                  type="text"
                  value={eventName}
                  onChange={e => applyEventNameFilter(e.target.value)}
                  placeholder="Digite o nome do evento"
                  className="border p-2 rounded-md"
                />
                <button
                  onClick={handleExport}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                  Exportar PDF
                </button>
              </div>

              <select
                value={status}
                onChange={e => applyStatusFilter(e.target.value)}
                className="border p-2 rounded-md"
              >
                <option value="">Todos</option>
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div id="tableContainer" className="overflow-x-auto">
              <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-md border-collapse">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 border-b">
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="text-left p-3 text-gray-700">
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
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={!canPreviousPage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={handleNextPage}
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
                const newSize = Math.min(Number(e.target.value), 10);
                setCurrentPageSize(newSize);
                setCurrentPageIndex(0);
                setPageSize(newSize);
                fetchData(0, newSize);
              }}
              className="border p-2 rounded-md"
            >
              {[5, 10].map(size => (
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
