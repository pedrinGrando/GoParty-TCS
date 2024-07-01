import React from 'react';
import { Link } from 'react-router-dom';
import useEventoCurtido from '../../hooks/useEventoCurtido';
import CommentsSection from '../Comments/CommentsSection';
import { LikeButton } from './likeButton';
import { UnlikeButton } from './UnlikeButton';
import { format, parseISO } from 'date-fns';

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
    tituloFormatura: string;
    totalComentarios: number;
    totalCurtidas: number;
}

interface EventoCardProps {
    evento: Evento;
    userId: number;
    toggleComentarios: (eventoId: number) => void
    selectedEventoId: number | null;
}

const EventCard: React.FC<EventoCardProps> = ({ evento, userId, toggleComentarios, selectedEventoId }) => {
    const { curtido, loading } = useEventoCurtido(evento.id, userId);

    const formatDateTime = (dateString: string) => {
        const date = parseISO(dateString);
        return `${format(date, 'dd/MM/yyyy')} às ${format(date, 'HH:mm')}`;
    };

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
        <div key={evento.id} className="mt-14 max-w-xl mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg"> {/* Alterado max-w-lg para max-w-xl */}
            <Link to={`/event/${evento.id}`}>
                <img className="w-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="fotoEvento" />
                <span className="bg-indigo-100 shadow-lg text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                    Evento relacionado à <span className="font-bold">{evento.tituloFormatura}
                        <span className="inline-flex justify-center items-center ml-4">
                            <svg height="19px" width="19px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245.827 245.827" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path d="M223.336,148.384l-0.137-23.527l22.628-12.662L122.576,47.195L0,113.495l49.144,28.216 l0.098,16.766l0.01,1.339l0.449-0.215c-0.518,0.703-0.85,1.426-0.84,2.149c0.039,8.246,33.326,14.772,74.41,14.548 c41.064-0.215,74.302-7.122,74.273-15.349c0-0.723-0.381-1.426-0.889-2.149l0.449,0.215v-1.339l-0.088-16.834l21.309-13.258 l0.117,20.83c-2.345,1.006-3.976,3.312-3.957,6.009c0.02,3.537,2.892,6.399,6.458,6.37c3.586-0.02,6.429-2.912,6.409-6.439 C227.332,151.657,225.691,149.371,223.336,148.384z M123.241,170.621c-36.452,0.205-66.017-3.801-66.046-8.91 c-0.029-5.11,29.496-9.399,65.949-9.585c36.462-0.205,66.017,3.781,66.037,8.881 C189.209,166.098,159.703,170.426,123.241,170.621z M195.335,127.183c-4.934-5.188-22.618-18.886-72.426-18.602 c-49.877,0.264-67.336,14.128-72.211,19.394l-0.029-4.963c0,0,14.147-21.524,72.202-21.827 c58.025-0.313,72.436,21.045,72.436,21.045L195.335,127.183z M215.755,162.199l-2.511,36.433 c7.767-12.203,14.255-7.66,14.255-7.66l-0.156-28.832C218.998,165.414,215.755,162.199,215.755,162.199z"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </span>
                </span>
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
                            {formatDateTime(evento.dataEvento)}
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
