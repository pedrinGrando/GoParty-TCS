// EventDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import { Loading } from '../../../components/Loading/Loading';
import { format, parseISO } from 'date-fns';
import Event from '../../../types/Event';

const PixKey: React.FC = () => {

    const { eventId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [eventoDTO, setEventoDTO] = useState<EventoDTO>();
    const [error, setError] = useState<string | null>(null);
    const [chavePix, setChavePix] = useState<string | null>(null);
    const [solicitPag, setSolicitPag] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    interface EventoDTO {
        id: number;
        titulo: string;
        descricao: string;
        eventoCaminho: string;
        cidade: string;
        estado: string;
        rua: string;
        bairro: string;
        dataEvento: string;
        valor: number;
        nomeUsuario?: string;
    }

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'dd/MM/yyyy');
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
                setEventoDTO(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvento();
    }, [eventId]);

    async function handlePurchase(userId: number, eventoId: number): Promise<void> {
        try {
            const eventoDTO = { id: eventoId };
            const response = await fetch(`http://localhost:8081/v1/ingressos/comprar-ingresso?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventoDTO)
            });

            if (response.ok) {
                setSolicitPag(true);
                const ingresso = await response.json();
                console.log('Ingresso criado com sucesso:', ingresso);
            } else {
                setSolicitPag(false);
                throw new Error('Falha ao comprar ingresso');
            }
        } catch (error) {
            setSolicitPag(false);
            console.error('Erro ao comprar ingresso:', error);
        }
    }

    useEffect(() => {
        const fetchEvento = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8081/v1/formaturas/${eventId}/consultar-pix-formatura`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    console.log("Erro ao consultar PIX")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log("PIX consultado com sucesso!")
                const data = await response.text();
                setChavePix(data);
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
            <div className="bg-white dark:bg-gray-800 py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className='flex justify-center mt-4 text-4xl font-semibold dark:bg-gray-900 items-center'>Pagamento via PIX</h1>
                    <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                {chavePix ?
                                    //API de qr code dinamico
                                    <div className="flex flex-col justify-center items-center ">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${chavePix}`} alt="QR Code" />
                                        {chavePix ? <p className="mt-4">{chavePix}</p> : <p className="mt-4">Não disponível.</p>}
                                        {solicitPag ?
                                        <button onClick={() => handlePurchase(user.id, 1)} disabled={true} className="w-full bg-indigo-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                            Evento pago(verifique o status na lista de ingressos)
                                        </button>
                                        :
                                        <button onClick={() => handlePurchase(user.id, 1)} className="w-full max-w-xs bg-indigo-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                            {isLoading ? (
                                                <Loading/>
                                            ) : (
                                                'Pagar'
                                            )}
                                        </button>
                                    }
                                    </div>
                                    : ''}
                            </div>
                            <div className="flex -mx-2 mb-4">
                                <div className="w-1/2 px-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>

    );
};

export default PixKey;