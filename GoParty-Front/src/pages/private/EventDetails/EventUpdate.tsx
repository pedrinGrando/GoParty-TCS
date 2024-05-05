// EventDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import { Loading } from '../../../components/Loading/Loading';
import Event from '../../../types/Event';

const EventUpdate: React.FC = () => {

    const { eventId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [evento, setEvento] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

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
        dataEvento: Date;
        valor: number;
        nomeUsuario?: string;
    }


    async function comprarIngresso(userId: number): Promise<void> {
        const eventoDTO: EventoDTO = {
            id: evento.id,
            titulo: evento.titulo,
            descricao: evento.descricao,
            eventoCaminho: evento.eventoCaminho,
            cidade: evento.cidade,
            estado: evento.estado,
            dataEvento: evento.dataEvento,
            bairro: evento.barro,
            rua: evento.rua,
            valor: evento.valor,
            nomeUsuario: "Pedro Aluisio Scuissiatto"
        };

        try {
            const response = await fetch(`http://localhost:8081/v1/ingressos/comprar-ingresso?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventoDTO)
            });

            if (response.ok) {
                const ingresso = await response.json();
                console.log('Ingresso criado com sucesso:', ingresso);
            } else {
                throw new Error('Falha ao comprar ingresso');
            }
        } catch (error) {
            console.error('Erro ao comprar ingresso:', error);
        }
    }


    const handlePurchase = (userId: number,) => {
        comprarIngresso(userId).then(() => {
            alert('Compra realizada com sucesso!');
        }).catch(error => {
            alert('Erro ao realizar a compra: ' + error.message);
        });
    };

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
                    <div className="bg-white dark:bg-gray-800 py-8">
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className='flex justify-center mt-4 text-4xl font-semibold dark:bg-gray-900 items-center'>Atualizar Evento</h1>
                            <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                        <img className="w-full h-full object-cover" src={`http://localhost:8081${evento.eventoCaminho}`} alt="Product Image" />
                                    </div>
                                    <div className="flex -mx-2 mb-4">
                                        <div className="w-1/2 px-2">
                                            <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Salvar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex-1 px-4">
                                    <input className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                                    value={evento.titulo}
                                    />
                                    <textarea className="text-gray-600 dark:text-gray-300 text-sm mb-4" 
                                           value={evento.descricao}
                                    />
                                    <div className="flex mb-4">
                                        <div className="mr-4">
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Valor do ingresso:</span>
                                            <input className="text-gray-600 dark:text-gray-300"
                                            value={evento.valor}
                                            />
                                            
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Disponibilidade:</span>
                                            <span className="text-gray-600 dark:text-gray-300"> Disponivel</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">

                                    </div>

                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Local do evento:</span>
                                        <input className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                                           value={evento.cidade}
                                        />
                                           <input className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                                           value={evento.estado}
                                        />
                                        <input className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                                           value={evento.bairro}
                                        />
                                         <input className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                                           value={evento.rua}
                                        />
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

export default EventUpdate;