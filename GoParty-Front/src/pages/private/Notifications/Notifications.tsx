import { useEffect, useState } from "react";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { Loading } from "../../../components/Loading/Loading";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import Notification from "../../../types/Notification";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { NotificationBell } from "../../../components/Notification/NotificationBell";

export default function Notifications() {

    interface notificationDTO {
        id: string;
        tipoNotificacao: string;
        message: string;
        timestamp: string;
        visualizado: boolean;
    }

    const [notifications, setNotifications] = useState<notificationDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const fetchSeusEventos = async (): Promise<notificationDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/notifications/buscar-por-usuario/${user.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setIsLoading(false);
            const notificationsData: notificationDTO[] = await response.json();
            return notificationsData;
        } catch (error) {
            console.error('Error fetching yout notifications events:', error);
            return [];
        }
    }

    //Busca notifications usuario
    useEffect(() => {
        fetchSeusEventos().then(data => {
            setNotifications(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <TrendEvents />
            <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Suas notificacoes</h1>
            <section className="pt-16 bg-blueGray-50 dark:bg-gray-900">
                <div className="w-full lg:w-4/12 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-screen">
                                <Loading />
                            </div>

                        ) : (
                            <div>
                                {notifications.length === 0 ? (
                                    <div className="flex justify-center my-8  dark:bg-gray-900">
                                        <h2>
                                          Você não possui notificações.
                                        </h2>
                                    </div>
                                ) : (
                                    notifications.map(notification => (
                                        //Cada notificacao
                                        <div className="flex justify-center my-8"> {/* Ajusta o espaçamento vertical para menor e mantém a centralização horizontal */}
                                            <div id="toast-notification" className="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-white dark:text-black" role="alert">
                                                <div className="flex items-center mb-3">
                                                    {/* Botão de fechar e ícone */}

                                                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-white dark:hover:bg-white" data-dismiss-target="#toast-notification" aria-label="Close">
                                                        <span className="sr-only">Close</span>
                                                        <svg className="w-3 h-3 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                    </button>

                                                </div>
                                                <div className="flex items-center">
                                                    {/* Ícone e detalhes da notificação */}
                                                    <div className="relative inline-block shrink-0">
                                                        {/* foto user */}
                                                        <img className="w-12 h-12 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese Leos image" />
                                                        {/* tipo noti icon */}
                                                        <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                                                            <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                                                                <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor" />
                                                                <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor" />
                                                            </svg>
                                                            <span className="sr-only">Message icon</span>
                                                        </span>
                                                    </div>
                                                    <div className="ms-3 text-sm font-normal">
                                                        {/* Encaminhador */}
                                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Dono da noti</div>
                                                        {/* Message noti */}
                                                        <div className="text-sm font-normal">{notification.message}</div>
                                                        {/* Time noti */}
                                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-500">{notification.timestamp}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </section>
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    )
}
