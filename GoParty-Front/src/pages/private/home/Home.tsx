import { useEffect, useState } from 'react';

//Pages/components
import { FormsTrends } from '../../../components/Feed/FormsTrend';
import { NoEvent } from '../../../components/Feed/NoEvent';
import TrendEvents from '../../../components/Feed/TrendEvents';
import { LoadingHome } from '../../../components/Loading/LoadingHome';
import { useUser } from "../../../components/UserContext/UserContext";
import { Sidebar } from '../../../components/sidebar/Sidebar';
import Event from '../../../types/Event';
import { Link } from 'react-router-dom';

export default function Home () {

    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    //Busca os eventos postados
    useEffect(() => {
        setIsLoading(true)
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8081/v1/eventos/buscar-eventos');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                setIsLoading(false)
                const data = await response.json();
                console.log(data);
                setEvents(data);
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        };
        fetchEvents();
    }, []);

           return (
                   <div>
                     <TrendEvents/>
                       {isLoading ? (
                              <LoadingHome/>
                        ) : (
                            <div>
             <FormsTrends/>
             <hr className="my-5 border-gray-300 dark:border-gray-300 lg:my-5" />
            {events.length === 0 ? (
                <div className="flex justify-center items-center h-screen">
                    <NoEvent/>
                </div>
            ) : (
                events.map(evento => (
                  
                      //Link que leva para o evento
                      
                            <Link to={`/event/${evento.id}`} key={evento.id} className="block mt-16 mb-8">
                                <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg"> 
                                    <img className="w-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="fotoEvento" />
                                    <div className="px-6 py-4 dark:bg-gray-500">
                                    <div className="font-bold text-xl mb-2 dark:text-white">{evento.titulo}</div>
                                    <p className="text-gray-800 text-base">
                                        {evento.descricao}
                                    </p>
                                  
                                    </div>

                                    <div className="px-6 py-4 dark:bg-gray-500">
                                    <div className="px-6 py-4 dark:bg-gray-500">
                                        <p className='text-gray-500'>
                                        {evento.cidade}/{evento.estado}
                                        </p>
                                        <p className='text-gray-500'>
                                        {/* {evento.rua} */} Rua professor egidio
                                        </p>
                                    </div>

                                    <hr className="my-5 border-gray-300 dark:border-gray-300 lg:my-5" />
                                    {/* curtir e Comentar evento  */}
                                    <div className="mt-4 flex items-center">
                                                <div className="flex mr-2 text-gray-700 text-sm mr-3">
                                                <svg fill="none" viewBox="0 0 24 24"  className="w-4 h-4 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                                    </svg>
                                                <span>12</span>
                                                </div>
                                                <div className="flex mr-2 text-gray-700 text-sm mr-8">
                                                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                                </svg>
                                                <span>8</span>
                                                </div>
                                                <div className="flex mr-2 text-gray-700 text-sm mr-4">
                                                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                                    </svg>
                                                <span>Compartilhar</span>
                                                </div>
                                            </div>

                                    {/* comprar ingresso */}
                                    <div className="mt-6 text-white bg-indigo-500 hover:bg-grey-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <img src="/imagens/tickets.png" alt="ticketBuy" />
                                    <span className='px-2'>R$ {evento.valor}</span>
                                    </div>

                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                    {/* Tags */}
                                    </div>
                                    
                                </div>
                            </Link>

                ))
            )}
        </div>
       )}
     <Sidebar />
   </div>
     )
}
