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
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Feed;
