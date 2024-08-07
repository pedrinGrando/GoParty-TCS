import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { Loading } from "../../../components/Loading/Loading";
import Ingresso from "../../../types/Ingresso";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { LoadingHome } from "../../../components/Loading/LoadingHome";
import { format, parseISO } from 'date-fns';
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import ResponsiveImage from "../../../components/Image/ResponsiveImage";
import { NotificationBell } from "../../../components/Notification/NotificationBell";

export default function Tickets() {

    interface ingressoDTO {
        id: number;
        codigoEvento: string;
        dataCompra: string;
        status: string;
        dataEvento: string;
        ruaEvento: string;
        bairroEvento: string;
        nomeEvento: string;
        statusIngresso: string;
    }

    const [ingressos, setIngressos] = useState<ingressoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const formatDateTime = (dateString: string) => {
        const date = parseISO(dateString);
        return `${format(date, 'dd/MM/yyyy')} às ${format(date, 'HH:mm')}`;
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchTickets = async () => {
            try {
                const response = await fetch(`http://localhost:8081/v1/ingressos/seus-ingressos/${user?.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tickets');
                }
                setIsLoading(false);
                const data = await response.json();
                setIngressos(data);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchTickets();
    }, [user.id]);

    return (
        <div className="dark:bg-gray-900 dark:text-white">
            <NotificationBell />
            <ResponsiveImage
                imageUrl="/imagens/newGradMen.png"
                altText="Placeholder Image"
            />
            <TrendEvents />
            {isLoading ? (
                <LoadingHome />
            ) : (
                <div>
                    <h1 className="flex justify-center top-0 left-1/2 mt-4 text-4xl font-semibold bg-white py-3 shadow dark:bg-gray-900 dark:text-white items-center">
                        Seus ingressos
                        <svg className="ml-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                        </svg>
                    </h1>
                    {ingressos.length === 0 ? (
                        <div className="w-full max-w-7xl flex justify-center items-center h-screen px-4 md:px-5 lg:px-6 mx-auto dark:text-gray-300">
                            <p>Você não possui ingressos.</p>
                        </div>
                    ) : (
                        ingressos.map(ingresso => (
                            <div key={ingresso.id} className="max-w-3xl mx-auto mt-5 bg-white shadow-md rounded-lg flex flex-col md:flex-row border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex-shrink-0 w-full md:w-1/3 bg-gray-100 p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none dark:bg-gray-700">
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${ingresso.codigoEvento}`} alt="QR Code" className="w-25 h-25 object-cover" />
                                </div>
                                <div className="w-full md:w-2/3 p-4">
                                    <div className="flex flex-col md:flex-row justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ingresso.nomeEvento}</h3>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Ingresso #{ingresso.codigoEvento}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Status = <span className="font-bold shadow-sm text-green-600 dark:text-green-400">{ingresso.statusIngresso}</span></span>
                                    <div className="mb-5 mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Data do Evento:</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatDateTime(ingresso.dataEvento)}</p>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Local:</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{ingresso.ruaEvento}/{ingresso.bairroEvento}</p>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Data da compra:</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatDateTime(ingresso.dataCompra)}</p>
                                    </div>
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