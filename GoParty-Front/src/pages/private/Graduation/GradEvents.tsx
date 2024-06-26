import { useEffect, useState } from 'react';

//Pages/components
import { FormsTrends } from '../../../components/Feed/FormsTrend';
import { NoEvent } from '../../../components/Feed/NoEvent';
import TrendEvents from '../../../components/Feed/TrendEvents';
import { LoadingHome } from '../../../components/Loading/LoadingHome';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import Event from '../../../types/Event';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ResponsiveNavBar } from '../../../components/sidebar/ResponsiveBar';
import CommentsSection from '../../../components/Comments/CommentsSection';
import useEventoCurtido from '../../../hooks/useEventoCurtido';
import EventCard from '../../../components/Feed/EventCard';

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

export default function GradEvents() {

    const [eventos, setEventos] = useState<EventoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const { formId } = useParams();
    const [selectedEventoId, setSelectedEventoId] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleComentarios = (eventoId: number) => {
        setSelectedEventoId(selectedEventoId === eventoId ? null : eventoId);
    };

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'dd/MM/yyyy');
    }

    const handleCurtir = async (eventoId: number, curtido: any) => {
        try {
            const method = curtido ? 'DELETE' : 'POST';
            const response = await fetch(`http://localhost:8081/v1/eventos/${eventoId}/curtir/${user.id}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            window.location.reload();
        } catch (error) {
            console.error('Erro ao curtir/descurtir evento:', error);
        }
    };

    const fetchEventosForm = async (): Promise<EventoDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/eventos/buscar-por-formatura/${formId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setIsLoading(false);
            const eventos: EventoDTO[] = await response.json();
            return eventos;
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    useEffect(() => {
        fetchEventosForm().then(data => {
            setEventos(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <TrendEvents />
            {isLoading ? (
                <LoadingHome />
            ) : (
                <div>
                    <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Eventos relacionados</h1>
                    {eventos.length === 0 ? (
                        <div className="flex justify-center dark:bg-gray-900 items-center h-screen">
                            <NoEvent />
                        </div>
                    ) : (
                        eventos.map(evento => (
                            <EventCard
                                key={evento.id}
                                evento={evento}
                                userId={user.id}
                                toggleComentarios={toggleComentarios}
                                selectedEventoId={selectedEventoId}
                            />
                        ))
                    )}
                </div>
            )}
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    );
};
