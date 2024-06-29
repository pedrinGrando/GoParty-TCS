import { useEffect, useState } from "react";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import Event from "../../../types/Event";
import { Loading } from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import CommentsSection from "../../../components/Comments/CommentsSection";
import { NoEvent } from "../../../components/Feed/NoEvent";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { NotificationBell } from "../../../components/Notification/NotificationBell";
import EventCard from "../../../components/Feed/EventCard";

export default function Explore() {

    interface EventoDTO {
        id: number;
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
        totalCurtidas: number;
        totalComentarios: number;
    }
    
    const [search, setSearch] = useState<string>('');
    const [eventos, setEventos] = useState<EventoDTO[]>([]);
    const [erro, setErro] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [selectedEventoId, setSelectedEventoId] = useState<number | null>(null);

    const toggleComentarios = (eventoId: number) => {
        setSelectedEventoId(selectedEventoId === eventoId ? null : eventoId);
    };


    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const buscarEventos = async (search: string): Promise<EventoDTO[]> => {
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
                {/* campo de pesquisa */}
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-start bg-white py-3 shadow dark:bg-gray-900">
                    <NotificationBell />
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Pesquisar</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="block w-96 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-black"
                            placeholder="Procure por eventos..."
                            required
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                        <button onClick={handleSearch} className="text-white absolute right-2.5 bottom-2.5 bg-indigo-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
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
                        <EventCard
                            key={evento.id}
                            evento={evento}
                            userId={user.id}
                            toggleComentarios={toggleComentarios}
                            selectedEventoId={selectedEventoId}
                        />
                    ))}
                </ul>
                {isLoading ? <Loading /> : ''}
            </div>
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    )
}
