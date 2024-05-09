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
            {isLoading ? (
                <LoadingHome />
            ) : (
                <div>
                     <h1 className='flex justify-center mt-4 text-4xl font-semibold dark:bg-gray-900 items-center'> Seus ingressos </h1>
                    <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                    {ingressos.length === 0 ? (
                        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">
                            <p>Você nao possui ingressos.</p>
                        </div>
                    ) : (
                        ingressos.map(ingresso => (
                                <div key={ingresso.id} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                                    <div className="col-span-12 lg:col-span-2 img box">
                                        <img src="https://pagedone.io/asset/uploads/1701162826.png" alt="speaker image" className="max-lg:w-full lg:w-[180px] " />
                                    </div>
                                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                                        <div className="flex items-center justify-between w-full mb-4">
                                            <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{ingresso.codigoEvento}
                                            </h5>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">Status</h6>
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
