import React, { useEffect } from 'react';
import { ToastType } from './ToastType';

interface ToastContainerProps {
    message: string;
    onClose: () => void;
    isVisible: boolean;
    type: ToastType;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ message, onClose, isVisible, type }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 6000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return;

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return "bg-green-500 text-green-900";
            case 'error':
                return "bg-red-500 text-red-900";
            case 'informative':
                return "bg-blue-500 text-blue-900";
            default:
                return "bg-gray-500 text-gray-900";
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>;
            case 'error':
                return <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>;
            case 'informative':
                return <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>;
            default:
                return null;
        }
    };

    return (
        <div 
        data-aos="fade-left"
        data-aos-delay="50"
        data-aos-duration="0"
        style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
            <div id={`toast-${type}`} className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow-lg dark:text-gray-400 ${getToastStyle()}`} role="alert">
                <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${getToastStyle()} rounded-lg`}>
                    <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${getToastStyle()} rounded-lg`}>
                        {getIcon()}
                        <span className="sr-only">Icon</span>
                    </div>
                </div>
                <div className="ms-3 text-sm font-normal">{message}</div>
                <button type="button" onClick={onClose} className="ms-auto -mx-1.5 -my-1.5 text-gray-800 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};