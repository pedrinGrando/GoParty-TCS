
import { useEffect, useState } from 'react';

//Pages/components
import { NoEvent } from '../../../components/Feed/NoEvent';
import { LoadingHome } from '../../../components/Loading/LoadingHome';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { ResponsiveNavBar } from '../../../components/sidebar/ResponsiveBar';
import { CommentsSection } from '../../../components/Comments/CommentsSection';
import { Loading } from '../../../components/Loading/Loading';

interface EventoDTO {
    id: number;
    ativo: boolean;
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

export default function Events() {

    const [eventos, setEventos] = useState<EventoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const openComments = () => {
        if (isCommentsOpen)
            setIsCommentsOpen(false);
        else
            setIsCommentsOpen(true);
    }

    const handleDeleteClick = async (eventoId: number) => {
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8081/v1/eventos/inativar-evento/${user.id}/${eventoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                console.log("Houve um erro ao inativar evento!")
                throw new Error(`HTTP error! status: ${response.status}`);
               
            }

            console.log("Evento inativado com sucesso!")
            
        } catch (e) {
            
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSeusEventos = async (): Promise<EventoDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/eventos/buscar-por-usuario/${user.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setIsLoading(false);
            const eventos: EventoDTO[] = await response.json();
            return eventos;
        } catch (error) {
            console.error('Error fetching yout events events:', error);
            return [];
        }
    }

    //Busca os eventos criados
    useEffect(() => {
        fetchSeusEventos().then(data => {
            setEventos(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            {isLoading ? (
                <LoadingHome />
            ) : (
                <div>
                    <h1 className='flex justify-center mt-4 text-4xl font-semibold dark:bg-gray-900 items-center'>Eventos criados</h1>
                    <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                    {eventos.length === 0 ? (
                        <div className="flex justify-center dark:bg-gray-900 items-center h-screen">
                            <NoEvent />
                        </div>
                    ) : (
                        eventos.map(evento => (
                            <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg">
                                {evento.ativo ?
                                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                        Ativo
                                    </span>
                                    :
                                    <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                        Inativo
                                    </span>}
                              
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
                                                {evento.rua}
                                            </p>
                                        </div>
                                    <hr className="my-5 border-gray-300 dark:border-gray-300 lg:my-5" />
                                    {/* curtir e Comentar evento  */}
                                    <div className="mt-4 flex items-center">
                                        <button className="flex text-gray-700 text-sm mr-3 hover:text-indigo-500">
                                            <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <span>{/* Quandidade curtidas*/}</span>
                                        </button>
                                        <button onClick={openComments} className="flex text-gray-700 text-sm mr-8  hover:text-indigo-500">
                                            <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                            </svg>
                                            <span>{/* Quandidade comentarios*/}</span>
                                        </button>
                                        <button className="flex text-gray-700 text-sm mr-4  hover:text-indigo-500">
                                            <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 mr-1" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            <span>Compartilhar</span>
                                        </button>
                                        <Link to={`/event-update/${evento.id}`} key={evento.id}>
                                        <div className='flex text-gray-700 text-sm mr-4  hover:text-indigo-500'>
                                            <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        </div>
                                        </Link>
                                        <button onClick={() => handleDeleteClick(evento.id)} className='flex text-gray-700 text-sm mr-4  hover:text-indigo-500'>
                                        <svg width="21px" height="21px" viewBox="0 0 32.00 32.00" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Icon-Set" transform="translate(-516.000000, -1144.000000)" fill="#000000"> <path d="M538.708,1151.28 C538.314,1150.89 537.676,1150.89 537.281,1151.28 L534.981,1153.58 L532.742,1151.34 C532.352,1150.95 531.718,1150.95 531.327,1151.34 C530.936,1151.73 530.936,1152.37 531.327,1152.76 L533.566,1154.99 L531.298,1157.26 C530.904,1157.65 530.904,1158.29 531.298,1158.69 C531.692,1159.08 532.331,1159.08 532.725,1158.69 L534.993,1156.42 L537.232,1158.66 C537.623,1159.05 538.257,1159.05 538.647,1158.66 C539.039,1158.27 539.039,1157.63 538.647,1157.24 L536.408,1155.01 L538.708,1152.71 C539.103,1152.31 539.103,1151.68 538.708,1151.28 L538.708,1151.28 Z M545.998,1162 C545.998,1163.1 545.102,1164 543.996,1164 L526.467,1164 L518.316,1154.98 L526.438,1146 L543.996,1146 C545.102,1146 545.998,1146.9 545.998,1148 L545.998,1162 L545.998,1162 Z M543.996,1144 L526.051,1144 C525.771,1143.98 525.485,1144.07 525.271,1144.28 L516.285,1154.22 C516.074,1154.43 515.983,1154.71 515.998,1154.98 C515.983,1155.26 516.074,1155.54 516.285,1155.75 L525.271,1165.69 C525.467,1165.88 525.723,1165.98 525.979,1165.98 L525.979,1166 L543.996,1166 C546.207,1166 548,1164.21 548,1162 L548,1148 C548,1145.79 546.207,1144 543.996,1144 L543.996,1144 Z" id="delete"> </path> </g> </g> </g></svg>
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
