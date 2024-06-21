import React, { useEffect, useState } from "react";
import TrendEvents from "../../../components/Feed/TrendEvents";
import { Loading } from "../../../components/Loading/Loading";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import Notification from "../../../types/Notification";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import { TipoNotificacao } from "../../../types/NotificationType";
import { ToastType } from "../../../components/modal/ToastType";
import { ToastContainer } from "../../../components/modal/ToastContainer";

export default function Notifications() {

    interface NotificationDTO {
        id: string;
        tipoNotificacao: TipoNotificacao;
        message: string;
        visualizado: boolean;
        notificationMoment: string;
        fotoCaminho: string;
    }

    interface InviteDTO {
        id: number;
        inviteDate: string;
        graduationId: string;
        userId: string;
        accept: boolean;
        acceptDate: string;
        rejectDate: string;
        gradName: string;
    }

    const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
    const [invites, setInvites] = useState<InviteDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [toastType, setToasType] = useState<ToastType>("error");

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

    const closeToast = () => {
        setIsVisible(false);
    }

    const fetchUserInvites = async (): Promise<InviteDTO[]> => {
        try {
            const response = await fetch(`http://localhost:8081/v1/invite/user/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const invitesData = await response.json();
            return Array.isArray(invitesData) ? invitesData : [];
        } catch (error) {
            console.error('Error fetching user invites:', error);
            return [];
        }
    }

    const handleAcceptInvite = async (inviteId: number) => {
        try {
            const response = await fetch(`http://localhost:8081/v1/invite/accept/${inviteId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setInvites(prevInvites => prevInvites.filter(invite => invite.id !== inviteId));
                setMessage("Convite aceito.");
                setToasType("success");
                setIsVisible(true);
            } else {
                console.error("Falha ao aceitar o convite:", response.statusText);
                setMessage("Erro ao rejeitar.");
                setToasType("error");
                setIsVisible(true);
            }
        } catch (error) {
            console.error("Erro ao aceitar o convite:", error);
            setMessage("Erro ao rejeitar.");
            setToasType("error");
            setIsVisible(true);
        }
    };

    const handleRejectInvite = async (inviteId: number) => {
        try {
            const response = await fetch(`http://localhost:8081/v1/invite/reject/${inviteId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setInvites(prevInvites => prevInvites.filter(invite => invite.id !== inviteId));
                setMessage("Convite rejeitado.");
                setToasType("informative");
                setIsVisible(true);
            } else {
                console.error("Falha ao rejeitar o convite:", response.statusText);
                setMessage("Erro ao rejeitar.");
                setToasType("error");
                setIsVisible(true);
            }
        } catch (error) {
            console.error("Erro ao rejeitar o convite:", error);
            setMessage("Erro ao rejeitar.");
            setToasType("error");
            setIsVisible(true);
        }
    };

    const markNotificationsAsVisualized = async (): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:8081/v1/notification/change_visualization/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to mark notifications as visualized');
            }
        } catch (error) {
            console.error('Error marking notifications as visualized:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const [notificationsData, invitesData] = await Promise.all([fetchYourNotifications(), fetchUserInvites()]);
            setNotifications(notificationsData);
            setInvites(invitesData);
        };

        fetchData();
        markNotificationsAsVisualized();
    }, []);

    return (
        <div>
            <TrendEvents />
            <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Suas notificações</h1>
            <div className="grid place-items-center my-8">
                <ToastContainer
                    message={message}
                    onClose={closeToast}
                    isVisible={isVisible}
                    type={toastType}
                />
                <div className="lg:w-2/5 sm:w-3/5 w-11/12 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10 shadow-sm">
                    <div className="inline-flex items-center justify-between w-full">
                        <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">Todas</h3>
                        <button
                            className="inline-flex text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded font-medium
                            shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-blue-500
                            hover:text-white hover:-translate-y-1 hover:scale-110 dark:text-gray-800 dark:hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd" />
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
                            {notifications.length === 0 && invites.length === 0 ? (
                                <div className="flex justify-center my-8 dark:bg-gray-900">
                                    <h1>Você não possui notificações.</h1>
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <div key={notification.id} className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
                                        <div className="inline-flex items-center justify-between w-full">
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

                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <Loading />
                        </div>
                    ) : (
                        <div>
                            {invites.length === 0 && notifications.length === 0 ? (
                                <div></div>
                            ) : (
                                invites.map(invite => (
                                    <div key={invite.id} id="toast-interactive" className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                                        <div className="flex">
                                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
                                                </svg>
                                                <span className="sr-only">Convite para formatura</span>
                                            </div>
                                            <div className="ms-3 text-sm font-normal">
                                                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Convite para {invite.gradName}</span>
                                                <div className="mb-2 text-sm font-normal"></div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <button
                                                            onClick={() => handleAcceptInvite(invite.id)}
                                                            className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                                        >
                                                            Aceitar
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button
                                                            onClick={() => handleRejectInvite(invite.id)}
                                                            className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                                        >
                                                            Rejeitar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
                                                <span className="sr-only">Close</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                            </button>
                                        </div>
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
