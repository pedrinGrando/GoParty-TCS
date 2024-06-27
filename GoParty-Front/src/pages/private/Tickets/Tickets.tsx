import React, { useEffect, useState } from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Link } from "react-router-dom"
import { Loading } from "../../../components/Loading/Loading";
import Ingresso from "../../../types/Ingresso";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { LoadingHome } from "../../../components/Loading/LoadingHome";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";

export default function Tickets() {

    interface ingressoDTO {
        id: number;
        codigoEvento: string;
        dataCompra: Date;
        status: string;
    }

    const [ingressos, setIngressos] = useState<ingressoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    useEffect(() => {
        setIsLoading(true)
        const fetchTickets = async () => {
            try {
                const response = await fetch(`http://localhost:8081/v1/ingressos/seus-ingressos/${user?.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tickets');
                }
                setIsLoading(false)
                const data = await response.json();
                console.log(data);
                setIngressos(data);
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        };
        fetchTickets();
    }, []);

    return (

        <div>
            <TrendEvents />
            {isLoading ? (
                <LoadingHome />
            ) : (
                <div>
                    <h1 className="flex justify-center top-0 left-1/2 mt-4 text-4xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Seus ingressos</h1>
                    {ingressos.length === 0 ? (
                        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">
                            <p>Você nao possui ingressos.</p>
                        </div>
                    ) : (
                        ingressos.map(ingresso => (

                            <div className="max-w-3xl mx-auto mt-5 bg-white shadow-md rounded-lg flex flex-col md:flex-row border border-gray-300">
                                <div className="flex-shrink-0 w-full md:w-1/3 bg-gray-100 p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                                    <img src={"qrCodeUrl"} alt="QR Code" className="w-24 h-24 object-cover" />
                                </div>
                                <div className="w-full md:w-2/3 p-4">
                                    <div className="flex flex-col md:flex-row justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{"title"}</h3>
                                        <span className="text-sm text-gray-600">Ingresso #{ingresso.codigoEvento}</span>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-500">Event Date:</p>
                                        <p className="text-sm font-semibold text-gray-900">{"eventDate"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Location:</p>
                                        <p className="text-sm font-semibold text-gray-900">{"location"}</p>
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
