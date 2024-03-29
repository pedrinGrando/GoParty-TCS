import React from 'react';
import Event from '../../types/Event';
import { NoEvent } from './NoEvent';

interface FeedProps {
    events: Event[];
}

const Feed: React.FC<FeedProps> = ({ events }) => {
    return (
        <div>
            {events.length === 0 ? (
                <div className="flex justify-center items-center h-screen">
                    <NoEvent/>
                </div>
            ) : (
                events.map(evento => (
                    <div key={evento.id} className="flex justify-center items-center h-screen">
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full" src="/imagens/Foto 3.png" alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{evento.titulo}</div>
                                <p className="text-gray-700 text-base">
                                    {evento.descricao}
                                </p>
                            </div>

                            <div className="px-6 py-4">

                                {/* curtir evento */}


                                {/* comentar evento */}

                                {/* comprar ingresso */}
                            <button type="button" className="text-white bg-grey-300 hover:bg-grey-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                Comprar agora
                                </button>
                             
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Festao</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Venhaconosco</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#verão</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Feed;
