import { useEffect, useState } from 'react';

//Pages/components
import { FormsTrends } from '../../../components/Feed/FormsTrend';
import { NoEvent } from '../../../components/Feed/NoEvent';
import TrendEvents from '../../../components/Feed/TrendEvents';
import { LoadingHome } from '../../../components/Loading/LoadingHome';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import Event from '../../../types/Event';
import { Link } from 'react-router-dom';
import { ResponsiveNavBar } from '../../../components/sidebar/ResponsiveBar';
import { CommentsSection } from '../../../components/Comments/CommentsSection';

interface EventoDTO {
    id: number;
    titulo: string;
    descricao: string;
    eventoCaminho: string;
    cidade: string;
    rua: string;
    estado: string;
    dataEvento: Date;
    valor: number;
    nomeUsuario?: string;
}

export default function Home() {

    const [eventos, setEventos] = useState<EventoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const openComments = () => {
        if(isCommentsOpen)
        setIsCommentsOpen(false);
        else
        setIsCommentsOpen(true);
    } 

    function handleLikeClick(){
          
    }

    const fetchTodosEventos = async (): Promise<EventoDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8081/v1/eventos/buscar-eventos');
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

    //Busca os eventos criados
    useEffect(() => {
        fetchTodosEventos().then(data => {
            setEventos(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <TrendEvents />
            {isLoading ? (
                <LoadingHome />
            ) : (
                <div>
                    <FormsTrends />
                    <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                    {eventos.length === 0 ? (
                        <div className="flex justify-center dark:bg-gray-900 items-center h-screen">
                            <NoEvent />
                        </div>
                    ) : (
                        eventos.map(evento => (
                                <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg">
                                    <Link to={`/event/${evento.id}`} key={evento.id} className="block mt-16 mb-8">
                                    <img className="w-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="fotoEvento" />
                                    <div className="px-6 py-4 dark:bg-gray-500">
                                        <div className="font-bold text-xl mb-2 dark:text-white">{evento.titulo}</div>
                                        <p className="text-gray-800 text-base">
                                            {evento.descricao}
                                        </p>
                                    </div>
                                    </Link>
                                 
                                    <div className="px-6 py-4 dark:bg-gray-500">
                                    <Link to={`/event/${evento.id}`} key={evento.id} className="block mt-16 mb-8">
                                        <div className="px-6 py-4 dark:bg-gray-500">
                                            <p className='text-gray-500'>
                                                {evento.cidade}/{evento.estado}
                                            </p>
                                            <p className='text-gray-500'>
                                                {evento.rua}
                                            </p>
                                        </div>
                                        </Link>

                                        <hr className="my-5 border-gray-300 dark:border-gray-300 lg:my-5" />
                                        {/* curtir e Comentar evento  */}
                                        <div className="mt-4 flex items-center">
                                            <button onClick={handleLikeClick} className="flex mr-2 text-gray-700 text-sm mr-3 hover:text-indigo-500">
                                                <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                <span>{/* Quandidade curtidas*/}</span>
                                            </button>
                                            <button onClick={openComments} className="flex mr-2 text-gray-700 text-sm mr-8  hover:text-indigo-500">
                                                <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                                </svg>
                                                <span>{/* Quandidade comentarios*/}</span>
                                            </button>
                                            <button className="flex mr-2 text-gray-700 text-sm mr-4  hover:text-indigo-500">
                                                <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                                <span>Compartilhar</span>
                                            </button>
                                        </div>
                                        {isCommentsOpen ? <CommentsSection/> : ''}
                                        
                                        {/* Valor ingresso */}
                                        <div className="mt-6 text-white bg-indigo-500 hover:bg-grey-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <img src="/imagens/tickets.png" alt="ticketBuy" />
                                            <span className='px-2'>R$ {evento.valor}</span>
                                        </div>

                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        {/* Tags */}
                                    </div>

                                </div>
                           

                        ))
                    )}
                </div>
            )}
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    )
}
