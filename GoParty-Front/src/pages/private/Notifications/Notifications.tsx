import { useEffect, useState } from "react";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { Loading } from "../../../components/Loading/Loading";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import Notification from "../../../types/Notification";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { NotificationBell } from "../../../components/Notification/NotificationBell";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import { TipoNotificacao } from "../../../types/NotificationType";

export default function Notifications() {

    interface NotificationDTO {
        id: string;
        tipoNotificacao: TipoNotificacao;
        message: string;
        visualizado: boolean;
        notificationMoment: string;
        fotoCaminho: string;
    }

    const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const fetchYourNotifications = async (): Promise<NotificationDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/notification/get/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const notificationsData = await response.json();
            setIsLoading(false);
            return Array.isArray(notificationsData) ? notificationsData : [];
        } catch (error) {
            console.error('Error fetching your notifications:', error);
            setIsLoading(false);
            return [];
        }
    }

    useEffect(() => {
        fetchYourNotifications().then(data => {
            setNotifications(data);
            console.log(notifications);
        });
    }, []);

    return (
        <div>
            <TrendEvents />
            <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Suas notificações</h1>
            <div className=" grid place-items-center my-8">
                <div className="lg:w-2/5 sm:w-3/5 w-11/12 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10 shadow-sm">
                    <div className="inline-flex items-center justify-between w-full">
                        <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">Todas</h3>
                        <button
                            className="inline-flex text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded font-medium
         shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-blue-500
          hover:text-white hover:-translate-y-1 hover:scale-110 dark:text-gray-800 dark:hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                            Limpar
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <Loading />
                        </div>
                    ) : (
                        <div>
                            {notifications.length === 0 ? (
                                <div className="flex justify-center my-8 dark:bg-gray-900">
                                    <h2>
                                        Você não possui notificações.
                                    </h2>
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
                                        <div className=" inline-flex items-center justify-between w-full">
                                            <div className="inline-flex items-center">
                                             <NotificationIcon tipoNotificacao={notification.tipoNotificacao} />
                                                <h3 className="font-bold text-base text-gray-800">{notification.tipoNotificacao}</h3>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {notification.notificationMoment}
                                            </p>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            @{notification.message}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>
            </div>
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    )
}
