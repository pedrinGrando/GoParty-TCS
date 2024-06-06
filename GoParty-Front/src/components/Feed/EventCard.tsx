import React from 'react';
import { Link } from 'react-router-dom';
import useEventoCurtido from '../../hooks/useEventoCurtido';
import CommentsSection from '../Comments/CommentsSection';
import { LikeButton } from './likeButton';
import { UnlikeButton } from './UnlikeButton';

interface Evento {
    id: number;
    eventoCaminho: string;
    titulo: string;
    descricao: string;
    cidade: string;
    estado: string;
    rua: string;
    dataEvento: string;
    valor: number;
    totalComentarios: number;
    totalCurtidas: number;
}

interface EventoCardProps {
    evento: Evento;
    userId: number;
    toggleComentarios: (eventoId: number) => void;
    selectedEventoId: number | null;
}

const EventCard: React.FC<EventoCardProps> = ({ evento, userId, toggleComentarios, selectedEventoId }) => {
    const { curtido, loading } = useEventoCurtido(evento.id, userId);

    const handleCurtir = async (eventoId: number, curtido: any) => {
        try {
            const method = curtido ? 'DELETE' : 'POST';
            const response = await fetch(`http://localhost:8081/v1/eventos/like/${eventoId}/${userId}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            console.error('Erro ao curtir/descurtir evento:', error);
        }
    };

    return (
        <div key={evento.id} className="mt-12 max-w-lg mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg">
            <Link to={`/event/${evento.id}`}>
                <img className="w-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="fotoEvento" />
                <div className="px-6 py-4 dark:bg-gray-500">
                    <div className="font-bold text-xl mb-2 dark:text-white">{evento.titulo}</div>
                    <p className="text-gray-800 text-base">
                        {evento.descricao}
                    </p>
                </div>
            </Link>
            <div className="px-6 py-4 dark:bg-gray-500">
                <Link to={`/event/${evento.id}`} className="block mt-16 mb-8">
                    <div className="px-6 py-4 dark:bg-gray-500">
                        <p className="text-gray-500 flex items-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                            </svg>
                            {evento.cidade}/{evento.estado}
                        </p>
                        <p className="text-gray-500 flex items-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                            </svg>
                            {evento.rua}
                        </p>
                        <p className="text-gray-500 flex items-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z" clipRule="evenodd" />
                            </svg>
                            {new Date(evento.dataEvento).toLocaleDateString('pt-BR')}
                        </p>
                    </div>
                </Link>
                <hr className="my-5 border-gray-300 dark:border-gray-300 lg:my-5" />
                <div className="mt-4 flex items-center">
                    <button
                        onClick={() => handleCurtir(evento.id, curtido)}
                        className={`flex mr-2 text-gray-700 text-sm mr-3 hover:text-indigo-500 ${loading ? 'cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {curtido ? <UnlikeButton /> : <LikeButton />}
                        <span> {evento.totalCurtidas > 0 ? evento.totalCurtidas : ''}</span>
                    </button>
                     
                    <button onClick={() => toggleComentarios(evento.id)} className="flex mr-2 text-gray-700 text-sm mr-8 hover:text-indigo-500">
                        <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <span>{evento.totalComentarios > 0 ? evento.totalComentarios : ''}</span>
                    </button>
                    {/* <button className="flex mr-2 text-gray-700 text-sm mr-4 hover:text-indigo-500">
                        <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Compartilhar</span>
                    </button> */}
                </div>
                {selectedEventoId === evento.id && <CommentsSection eventoId={evento.id} />}
                <div className="mt-6 text-white bg-indigo-500 hover:bg-grey-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <img src="/imagens/tickets.png" alt="ticketBuy" />
                    <span className='px-2'>R$ {evento.valor}</span>
                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                {/* Tags */}
            </div>
        </div>
    );
};

export default EventCard;
