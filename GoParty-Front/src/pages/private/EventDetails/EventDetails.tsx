// EventDetails.tsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import { Loading } from '../../../components/Loading/Loading';
import { format, parseISO } from 'date-fns';

const EventDetails: React.FC = () => {

    const { eventId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [evento, setEvento] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const formatDateTime = (dateString: string) => {
        const date = parseISO(dateString);
        return `${format(date, 'dd/MM/yyyy')} às ${format(date, 'HH:mm')}`;
    };

    interface EventoDTO {
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
        emAlta: boolean;
    }
    useEffect(() => {
        const fetchEvento = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:8081/v1/eventos/buscar-evento/${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: EventoDTO = await response.json();
                setEvento(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvento();
    }, [eventId]);

    return (
        <div>
            {evento ? (
                <>
                    <div className="bg-gray-100 dark:bg-gray-800 py-8 pl-10 shadow-lg">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                        <img className="w-full h-full object-cover shadow-lg bg-indigo-500 rounded-lg" src={`http://localhost:8081${evento.eventoCaminho}`} alt="Product Image" />
                                    </div>
                                    <div className="flex -mx-2 mb-4">
                                        <div className="w-1/2 px-2 justify-center items-center">
                                            <Link to={`/formatura-pix/${evento.id}`}>
                                                <button className="w-full bg-indigo-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                                    {isLoading ? (
                                                        <Loading />
                                                    ) : (
                                                        'Comprar'
                                                    )}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex-1 px-4">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{evento.titulo}</h2>
                                    <span className="bg-indigo-100 shadow-lg text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                        Evento relacionado à <span className="font-bold mt-4">{evento.tituloFormatura}
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
                                                {evento.emAlta ?
                                                    <svg className="w-6 h-6 ml-2 text-gray-800 animate-bounce dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                                                    </svg>
                                                    : ''}
                                            </span>
                                        </span>
                                    </span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 mt-3">
                                        {evento.descricao}
                                    </p>
                                    <div className="flex mb-4 mt-3">
                                        <div className="mr-4">
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Valor do ingresso:</span>
                                            <span className="text-gray-600 dark:text-gray-300"> R$ {evento.valor}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Disponibilidade:</span>
                                            <span className="text-gray-600 dark:text-gray-300"> Disponivel</span>
                                        </div>
                                    </div>
                                    <div className="mb-4 mt-3">
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                                            </svg>
                                            Local do evento:
                                        </span>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-3">
                                            Cidade: <span> {evento.cidade}</span>
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-3">
                                            Estado: <span> {evento.estado}</span>
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-3">
                                            Bairro: <span> {evento.bairro}</span>
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-3">
                                            Rua: <span> {evento.rua}</span>
                                        </p>
                                        <p className="text-gray-500 flex items-center">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z" clipRule="evenodd" />
                                            </svg>
                                            {formatDateTime(evento.dataEvento)}
                                        </p>
                                        <p className="text-gray-500 flex items-center mt-2 mb-3">
                                            <svg
                                                className="w-4 h-4 text-indigo-500 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                            </svg>
                                            {evento.totalCurtidas}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>Detalhes do evento não encontrados...</div>
            )}
            <Sidebar />
        </div>

    );
};

export default EventDetails;