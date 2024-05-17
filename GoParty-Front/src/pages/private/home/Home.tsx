import { useEffect, useState } from 'react';

//Pages/components
import { FormsTrends } from '../../../components/Feed/FormsTrend';
import { NoEvent } from '../../../components/Feed/NoEvent';
import TrendEvents from '../../../components/Feed/TrendEvents';
import { LoadingHome } from '../../../components/Loading/LoadingHome';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import Event from '../../../types/Event';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
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
    dataEvento: string;
    valor: number;
    nomeUsuario?: string;
    esgotado: boolean;
    tituloFormatura: string;
}

export default function Home() {

    const [eventos, setEventos] = useState<EventoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const openComments = () => {
        if (isCommentsOpen)
            setIsCommentsOpen(false);
        else
            setIsCommentsOpen(true);
    }

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'dd/MM/yyyy');
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
                            <div className="mt-12 max-w-sm mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg">
                                <Link to={`/event/${evento.id}`} key={evento.id}>
                                    <img className="w-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="fotoEvento" />
                                    <a className="cursor-pointer mt-0 inline-flex justify-between shadow-md items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                                        <span className="text-xs shadow-md bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
                                            <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.015 512.015" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M341.333,273.074c75.281,0,136.533-61.252,136.533-136.533S416.614,0.008,341.333,0.008 C266.052,0.008,204.8,61.26,204.8,136.541S266.052,273.074,341.333,273.074z M341.333,17.074 c65.877,0,119.467,53.589,119.467,119.467s-53.589,119.467-119.467,119.467s-119.467-53.589-119.467-119.467 S275.456,17.074,341.333,17.074z"></path> <path d="M507.426,358.408c-9.412-16.316-30.362-21.888-46.089-12.774l-98.219,47.804c-15.266,7.637-30.677,7.637-64.452,7.637 c-33.015,0-83.422-8.337-83.925-8.414c-4.693-0.759-9.054,2.372-9.822,7.006c-0.777,4.651,2.364,9.054,7.006,9.822 c2.125,0.358,52.301,8.653,86.741,8.653c35.43,0,53.214,0,72.004-9.395l98.662-48.051c3.942-2.278,8.542-2.884,12.954-1.707 c4.395,1.186,8.081,4.011,10.351,7.953c2.287,3.951,2.893,8.55,1.715,12.954s-4.002,8.081-8.192,10.505l-115.379,71.808 c-0.239,0.162-24.858,15.667-80.648,15.667c-48.367,0-123.11-41.182-124.186-41.771c-0.768-0.375-19.277-9.429-55.014-9.429 c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533c31.036,0,47.027,7.467,47.061,7.467v-0.009 c3.217,1.792,79.334,43.742,132.139,43.742c61.611,0,88.934-17.749,89.839-18.355l114.961-71.552 c7.893-4.557,13.542-11.921,15.898-20.719C513.203,375.5,511.983,366.301,507.426,358.408z"></path> <path d="M341.333,179.208c-9.412,0-17.067-7.654-17.067-17.067c0-4.71-3.814-8.533-8.533-8.533s-8.533,3.823-8.533,8.533 c0,15.855,10.914,29.107,25.6,32.922v1.212c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533v-1.212 c14.686-3.814,25.6-17.067,25.6-32.922c0-18.825-15.309-34.133-34.133-34.133c-9.412,0-17.067-7.654-17.067-17.067 c0-9.412,7.654-17.067,17.067-17.067c9.412,0,17.067,7.654,17.067,17.067c0,4.71,3.814,8.533,8.533,8.533 s8.533-3.823,8.533-8.533c0-15.855-10.914-29.107-25.6-32.922v-1.212c0-4.71-3.814-8.533-8.533-8.533 c-4.719,0-8.533,3.823-8.533,8.533v1.212c-14.686,3.814-25.6,17.067-25.6,32.922c0,18.825,15.309,34.133,34.133,34.133 c9.412,0,17.067,7.654,17.067,17.067C358.4,171.553,350.746,179.208,341.333,179.208z"></path> <path d="M59.733,273.074h-51.2c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h51.2c4.702,0,8.533,3.831,8.533,8.533 v187.733c0,4.702-3.831,8.533-8.533,8.533h-51.2c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h51.2 c14.114,0,25.6-11.486,25.6-25.6V298.674C85.333,284.56,73.847,273.074,59.733,273.074z"></path> <path d="M110.933,324.274H179.2c9.958,0,26.88,12.698,41.813,23.893c18.722,14.046,36.412,27.307,52.053,27.307h51.2 c12.962,0,19.396,5.879,19.567,6.033c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5 c3.336-3.337,3.336-8.73,0-12.066c-1.126-1.126-11.605-11.034-31.633-11.034h-51.2c-9.958,0-26.88-12.698-41.813-23.893 c-18.722-14.046-36.412-27.307-52.053-27.307h-68.267c-4.71,0-8.533,3.823-8.533,8.533S106.223,324.274,110.933,324.274z"></path> <path d="M42.667,456.541c0-7.057-5.743-12.8-12.8-12.8c-7.057,0-12.8,5.743-12.8,12.8c0,7.057,5.743,12.8,12.8,12.8 C36.924,469.341,42.667,463.598,42.667,456.541z"></path> </g> </g> </g> </g></svg>
                                        </span><span className="text-sm font-medium">Arrecada para {evento.tituloFormatura}</span>
                                    </a>
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
                                            <p className='text-gray-500'>
                                                {formatDate(evento.dataEvento)}
                                            </p>
                                        </div>
                                    </Link>

                                    <hr className="my-5 border-gray-300 dark:border-gray-300 lg:my-5" />
                                    {/* curtir e Comentar evento  */}
                                    <div className="mt-4 flex items-center">
                                        <button className="flex mr-2 text-gray-700 text-sm mr-3 hover:text-indigo-500">
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
                                    {isCommentsOpen ? <CommentsSection /> : ''}

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
