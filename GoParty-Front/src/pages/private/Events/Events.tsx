
import { useEffect, useState } from 'react';

//Pages/components
import { NoEvent } from '../../../components/Feed/NoEvent';
import { LoadingHome } from '../../../components/Loading/LoadingHome';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { ResponsiveNavBar } from '../../../components/sidebar/ResponsiveBar';
import { Loading } from '../../../components/Loading/Loading';
import { format, parseISO } from 'date-fns';
import TrendEvents from '../../../components/Feed/TrendEvents';
import ResponsiveImage from '../../../components/Image/ResponsiveImage';
import { NotificationBell } from '../../../components/Notification/NotificationBell';

interface EventoDTO {
    id: number;
    ativo: boolean;
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

export default function Events() {

    const [eventos, setEventos] = useState<EventoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const closeModal = () => {
        setMostrarModal(false);
    }

    const handleModal = () => {
        setMostrarModal(true)
    }

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

    const handleDelete = async (eventoId: number) => {
        setIsLoadingDelete(true);

        try {
            const response = await fetch(`http://localhost:8081/v1/eventos/inativar-evento/${user.id}/${eventoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                setMostrarModal(false)
                console.log("Houve um erro ao inativar evento!")
                throw new Error(`HTTP error! status: ${response.status}`);

            }
            setMostrarModal(false)
            console.log("Evento inativado com sucesso!")

        } catch (e) {

        } finally {
            setIsLoadingDelete(false);
            setMostrarModal(false)
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
            <NotificationBell/>
             <ResponsiveImage
                imageUrl="/imagens/newGradMen.png"
                altText="Placeholder Image"
            />
            <TrendEvents />
            {isLoading ? (
                <LoadingHome />
            ) : (
                <div>
                    <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Seus eventos
                        <svg className="ml-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                        </svg>

                    </h1>
                    {eventos.length === 0 ? (
                        <div className="flex justify-center dark:bg-gray-900 items-center h-screen">
                            <NoEvent />
                        </div>
                    ) : (
                        eventos.map(evento => (
                            <div className="mt-14 max-w-lg mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg">
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
                                {evento.esgotado && evento.ativo ?
                                    <span className="inline-flex items-centerbg-red-100 text-red-800  text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                        Esgotado
                                    </span>
                                    :
                                    ''}
                                {!evento.esgotado && evento.ativo ?
                                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                        Disponível
                                    </span>
                                    :
                                    ''}

                                <img className="w-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="fotoEvento" />
                                <div className="px-6 py-4 dark:bg-gray-500">
                                    <div className="font-bold text-xl mb-2 dark:text-white">{evento.titulo}</div>
                                    <p className="text-gray-800 text-base">
                                        {evento.descricao}
                                    </p>
                                </div>
                                <div className="px-6 py-4 dark:bg-gray-500">
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
                                    <hr className="my-5 border-gray-300 dark:border-gray-300 lg:my-5" />
                                    {/* curtir e Comentar evento  */}
                                    <div className="mt-4 flex items-center">
                                        <Link to={`/event-update/${evento.id}`} key={evento.id}>
                                            <div className='flex text-gray-700 text-sm mr-4  hover:text-indigo-500'>
                                                <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </div>
                                        </Link>
                                        <button onClick={handleModal} className='flex text-gray-700 text-sm mr-4 mb-1 mt-2 hover:text-indigo-500'>
                                            <svg width="21px" height="21px" viewBox="0 0 32.00 32.00" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Icon-Set" transform="translate(-516.000000, -1144.000000)" fill="#000000"> <path d="M538.708,1151.28 C538.314,1150.89 537.676,1150.89 537.281,1151.28 L534.981,1153.58 L532.742,1151.34 C532.352,1150.95 531.718,1150.95 531.327,1151.34 C530.936,1151.73 530.936,1152.37 531.327,1152.76 L533.566,1154.99 L531.298,1157.26 C530.904,1157.65 530.904,1158.29 531.298,1158.69 C531.692,1159.08 532.331,1159.08 532.725,1158.69 L534.993,1156.42 L537.232,1158.66 C537.623,1159.05 538.257,1159.05 538.647,1158.66 C539.039,1158.27 539.039,1157.63 538.647,1157.24 L536.408,1155.01 L538.708,1152.71 C539.103,1152.31 539.103,1151.68 538.708,1151.28 L538.708,1151.28 Z M545.998,1162 C545.998,1163.1 545.102,1164 543.996,1164 L526.467,1164 L518.316,1154.98 L526.438,1146 L543.996,1146 C545.102,1146 545.998,1146.9 545.998,1148 L545.998,1162 L545.998,1162 Z M543.996,1144 L526.051,1144 C525.771,1143.98 525.485,1144.07 525.271,1144.28 L516.285,1154.22 C516.074,1154.43 515.983,1154.71 515.998,1154.98 C515.983,1155.26 516.074,1155.54 516.285,1155.75 L525.271,1165.69 C525.467,1165.88 525.723,1165.98 525.979,1165.98 L525.979,1166 L543.996,1166 C546.207,1166 548,1164.21 548,1162 L548,1148 C548,1145.79 546.207,1144 543.996,1144 L543.996,1144 Z" id="delete"> </path> </g> </g> </g></svg>
                                        </button>

                                        {mostrarModal ?
                                            <div>
                                                <div
                                                    data-aos="fade-up"
                                                    data-aos-delay="50"
                                                    data-aos-duration="0"
                                                    id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                                                    <div className="relative p-4 w-full max-w-md max-h-full">
                                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                            <div className="p-4 md:p-5 text-center">
                                                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>
                                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Deseja inativar seu evento?</h3>
                                                                <button onClick={() => handleDelete(evento.id)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                                    Sim, Tenho certeza
                                                                </button>
                                                                <button onClick={closeModal} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Não, cancelar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''}
                                    </div>
                                    {/* {isCommentsOpen ? <CommentsSection /> : ''} */}

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
