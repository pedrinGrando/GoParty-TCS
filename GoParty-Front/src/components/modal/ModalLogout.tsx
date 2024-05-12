import React from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    mostrarModal: boolean;
    onClose: () => void;
}

export const ModalLogout: React.FC<ModalProps> = ({ mostrarModal, onClose }) => {

    if (!mostrarModal) return null;

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('sessionUser');
        localStorage.removeItem('token');
        localStorage.clear();
        navigate('/login')
    }

    return (

        <div>
            <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button>

            <div
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="0"
                id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Tem certeza que deseja sair de sua conta?</h3>
                            <button onClick={handleLogout} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Sim, Tenho certeza
                            </button>
                            <button onClick={onClose} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Não, cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




