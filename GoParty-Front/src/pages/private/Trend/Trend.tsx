import { useEffect, useState } from "react";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { Loading } from "../../../components/Loading/Loading";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import Notification from "../../../types/Notification";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { LoadingTrends } from "../../../components/Loading/LoadingTrends";
import { Link } from "react-router-dom";
import { FormsTrends } from "../../../components/Feed/FormsTrend";

export default function TrendPage() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventoDTO[]>([]);

  interface EventoDTO {
    id: number;
    titulo: string;
    descricao: string;
    eventoCaminho: string;
    cidade: string;
    rua: string;
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
      setEvents(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
        <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Eventos em</h1>
      {isLoading ? (
        <LoadingTrends />
      ) : (
        <section className="flex items-center justify-center min-h-screen bg-blueGray-50 dark:bg-gray-900 pt-20">
          <div className="px-4 mx-auto max-w-6xl">
            <div className="flex justify-center items-start min-h-screen">
              {isLoading ? (
                <LoadingTrends />
              ) : (
                <ul role="list" className="w-full max-w-4xl rounded-md border-gray-300 mt-4 bg-white divide-y divide-gray-300 shadow-lg dark:bg-gray-900">
                  {events.length === 0 ? (
                    <div className="flex justify-center items-center h-full dark:bg-gray-900">
                      <h2 className="dark:text-white">Nenhum evento em alta.</h2>
                    </div>
                  ) : (
                    events.map(evento => (
                      <Link to={`/event/${evento.id}`} key={evento.id}>
                      <li className="py-3 sm:py-4 hover:bg-gray-200">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                              <div className="flex-shrink-0">
                                  <img className="w-8 h-8 rounded-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="ufsc" />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                          {evento.titulo}
                                      </p>
                                      <div className="flex items-center space-x-1">
                                          <svg className="w-5 h-5 text-indigo-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                          </svg>
                                          <span className="text-sm text-gray-900 dark:text-white">{evento.totalCurtidas}</span>
                                      </div>
                                  </div>
                                  <p className="text-sm text-indigo-600 truncate dark:text-gray-400">
                                      Ver mais...
                                  </p>
                              </div>
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
                          </div>
                      </li>
                  </Link>
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
        </section>

      )}
      <Sidebar />
      <ResponsiveNavBar />
    </div>

  )
}
