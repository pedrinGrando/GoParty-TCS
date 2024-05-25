import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    profileImage: string;
}

export const NotificationBell: React.FC = () => {

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');
    const [contadorNoti, setContadorNoti] = useState<number>(3);

    const fetchNoti = async (): Promise<number> => {
        try {
            const response = await fetch(`http://localhost:8081/v1/notifications/count-notifications/${user.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const countNoti: number = await response.json();
            return countNoti;
        } catch (error) {
            console.error('Error fetching yout notifications events:', error);
            return 0;
        }
    }
    useEffect(() => {
        fetchNoti().then(data => {
            setContadorNoti(data);
        });
    }, []);

    return (
        <div className="fixed mt-2 top-0 right-0 p-4 max-w-full">
            <Link to='/your-notifications'>
                <div className="relative">
                    <svg className={`w-6 h-6 text-indigo-600 ${contadorNoti > 0 ? 'animate-wiggle' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17" />
                    </svg>
                    <div className="px-1 bg-indigo-600 rounded-full text-center text-white text-sm absolute -top-3 -right-2">
                        {contadorNoti > 0 ?
                            contadorNoti
                            : ''
                        }
                        {contadorNoti > 0 && (
                            <div className="absolute top-0 right-0 rounded-full -z-10 animate-ping bg-indigo-600 w-full h-full"></div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};