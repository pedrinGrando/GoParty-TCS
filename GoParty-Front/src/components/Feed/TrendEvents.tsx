import React, { useEffect, useState } from 'react';
import Event from '../../types/Event';
import { LoadingTrends } from '../Loading/LoadingTrends';
import { Link } from 'react-router-dom';

const TrendEvents: React.FC = () => {
    const [events, setEvents] = useState<EventoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            {isLoading ? (
                <LoadingTrends />
            ) : (
                <ul role="list" className="hidden md:block rounded-md fixed top-10 right-6 translate-x-[-30px] border-gray-300 w-[24%] max-w-md mt-4 bg-white divide-y divide-gray-300 shadow-lg z-50 dark:bg-gray-900">
                    <div className="px-4 py-2 flex items-center">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Eventos em alta</h1>
                        <svg className="w-4 h-4 ml-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" />
                        </svg>
                    </div>
                    {events.length === 0 ? (
                        <div className="flex justify-center dark:bg-gray-900 items-center h-screen">
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
                                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                                {evento.titulo}
                                            </p>
                                            <p className="text-sm text-indigo-600 truncate dark:text-gray-400">
                                                Ver mais...
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                            Disponível
                                        </span>
                                    </div>
                                </li>
                            </Link>
                        ))
                    )}

                </ul>
            )}
        </div>
    );
};

export default TrendEvents;
