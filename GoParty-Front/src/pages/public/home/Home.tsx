import { useEffect, useState } from 'react';

//Pages/components
import { useUser } from "../../../components/UserContext/UserContext";
import { Sidebar } from '../../../components/sidebar/Sidebar';
import Event from '../../../types/Event';

export default function Home () {
    const { user } = useUser();
    const [events, setEvents] = useState<Event[]>([]);

    //Busca os eventos postados
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/v1/eventos/buscar-eventos');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
           
    
            {/* Teste de Evento(Sem dados do banco) */}
            <div className="flex justify-center items-center h-screen">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src="/imagens/Foto 2.png" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
                </div>
                {/* Teste de Evento2 */}
            <div className="flex justify-center items-center h-screen">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src="/imagens/Foto 3.png" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
                </div>
                {/* Teste de Evento3 */}
            <div className="flex justify-center items-center h-screen">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src="/imagens/Foto 1.png" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
                </div>
                <Sidebar/>
            </div>
    )
}
