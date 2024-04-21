import { useEffect, useState } from "react";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { Loading } from "../../../components/Loading/Loading";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import Notification from "../../../types/Notification";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { LoadingTrends } from "../../../components/Loading/LoadingTrends";
import { Link } from "react-router-dom";
import { FormsTrends } from "../../../components/Feed/FormsTrend";

export default function TrendPage () {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

   //Busca os eventos postados
   useEffect(() => {
    setIsLoading(true)
    const fetchEvents = async () => {
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:8081/v1/eventos/buscar-eventos');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            setIsLoading(false)
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    };
    fetchEvents();
}, []);
   
    return (
           <div>
               <FormsTrends/>
        {isLoading ? (
                    <LoadingTrends/>
              ) : (
                <section className="flex items-center justify-center min-h-screen bg-blueGray-50 dark:bg-gray-900">
                <div className="px-4 mx-auto max-w-4xl">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg">
                        <ul role="list" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max max-w-sm mt-4 mr-4 divide-y divide-gray-300 dark:divide-gray-300">
                  {/* Exemplo de link para um evento */}
                  <Link to=''>
                    <li className="py-3 sm:py-4">
                      <h1>Eventos em alta</h1>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="/imagens/ufsc.png" alt="ufsc" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                    Formatura Medicina
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    UFSC
                                </p>
                            </div>
                            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                Disponível
                            </span>
                        </div>
                    </li>
                  </Link>
                <Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link>
                <Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link>
                <Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link>
                <Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link>
                <Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link>
                <Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link><Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link>
                <Link to=''>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src="/imagens/senac.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                                Formatura ADS
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Senac
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Esgotado
                        </span>
                    </div>
                </li>
                </Link>
               
         </ul>
         </div>
         </div>
         </section>
                 

         )}
         <Sidebar />
         <ResponsiveNavBar/>
                </div>
                
            )
        }
