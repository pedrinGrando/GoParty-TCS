import { useEffect, useState } from "react";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { Loading } from "../../../components/Loading/Loading";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import Notification from "../../../types/Notification";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { LoadingTrends } from "../../../components/Loading/LoadingTrends";
import { Link } from "react-router-dom";
import { FormsTrends } from "../../../components/Feed/FormsTrend";
import ResponsiveImage from "../../../components/Image/ResponsiveImage";
import { NotificationBell } from "../../../components/Notification/NotificationBell";

export default function TrendPage() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventos, setEventos] = useState<EventoDTO[]>([]);

  interface EventoDTO {
    id: number;
    titulo: string;
    descricao: string;
    eventoCaminho: string;
    cidade: string;
    rua: string;
    status: string;
    estado: string;
    dataEvento: string;
    valor: number;
    nomeUsuario?: string;
    esgotado: boolean;
    tituloFormatura: string;
    totalCurtidas: number;
  }

  const fetchTodosEventos = async (): Promise<EventoDTO[]> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8081/v1/eventos/top10Curtidas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setIsLoading(false);
      const eventos: EventoDTO[] = await response.json();
      return eventos;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  useEffect(() => {
    fetchTodosEventos().then(data => {
      setEventos(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
  <NotificationBell />
  <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">
    Eventos em alta
    <svg
      className="ml-3 w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
    </svg>
  </h1>
  <div className="flex flex-col items-center justify-start pt-10">
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-7xl md:ml-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Curtidas
              </th>
              <th scope="col" className="px-6 py-3">
                Valor
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link to={`/event/${evento.id}`}>
                    <img className="w-10 h-10 rounded-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt={evento.titulo} />
                  </Link>
                </td>
                <Link to={`/event/${evento.id}`}>
                  <td className="px-6 py-4">{evento.titulo}</td>
                </Link>
                <td className="px-6 py-4 space-x-2">
                  <svg
                    className="w-4 h-4 text-indigo-500 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                  {evento.totalCurtidas}
                </td>
                <td className="px-6 py-4">R$ {evento.valor.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {evento.esgotado ? (
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                      Evento esgotado
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      Ingresso disponível
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    <Sidebar />
    <ResponsiveNavBar />
  </div>
</div>

  );
};