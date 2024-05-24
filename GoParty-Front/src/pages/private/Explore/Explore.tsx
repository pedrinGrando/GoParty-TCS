import { useEffect, useState } from "react";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import Event from "../../../types/Event";
import { Loading } from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { CommentsSection } from "../../../components/Comments/CommentsSection";
import { NoEvent } from "../../../components/Feed/NoEvent";
import TrendEvents from "../../../components/Feed/TrendEvents";

export default function Explore() {

    const [search, setSearch] = useState<string>('');
    const [eventos, setEventos] = useState<Event[]>([]);
    const [erro, setErro] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const buscarEventos = async (search: string): Promise<Event[]> => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8081/v1/eventos/consultar-eventos?search=${encodeURIComponent(search)}`);
            if (!response.ok) {
                setIsLoading(false);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setIsLoading(false);
            return await response.json();
        } catch (e) {
            setIsLoading(false);
            console.error("Failed to fetch eventos:", e);
            throw e;
        }
    }

    //Busca os eventos criados
    useEffect(() => {
        buscarEventos(search).then(data => {
            setEventos(data);
            setIsLoading(false);
        });
    }, []);


    const handleSearch = async () => {
        try {
            const eventosBuscados = await buscarEventos(search);
            setEventos(eventosBuscados);
            console.log(search)
            setErro('');
        } catch (error) {
            setIsLoading(false);
            setErro('Erro ao buscar eventos');
        }
    };

    return (
        <div>
            <TrendEvents />
            <div className="px-4 mx-auto text-center mt-5">
                {/*campo de pesquisa*/}
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-start bg-white py-3 shadow dark:bg-gray-900">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Pesquisar</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-black"
                            placeholder="Procure por eventos, formaturas..."
                            required
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                        <button onClick={handleSearch} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        {erro && <div>{erro}</div>}
                    </div>
                    <hr className="fixed flex my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                </div>
                <ul>
                    {
                        !isLoading && eventos.length == 0 ?
                            <NoEvent /> : ""
                    }
                    
                    {eventos.map(evento => (
                       <div className="mt-12 max-w-md mx-auto rounded overflow-hidden shadow-lg dark:shadow-lg">
                            <Link to={`/event/${evento.id}`} key={evento.id} className="block mt-16 mb-8">
                                <img className="w-full" src={`http://localhost:8081${evento.eventoCaminho}`} alt="fotoEvento" />
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
                                    <button className="flex mr-2 text-gray-700 text-sm mr-8  hover:text-indigo-500">
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
                    ))}
                </ul>
                {isLoading ? <Loading /> : ''}
            </div>
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    )
}
