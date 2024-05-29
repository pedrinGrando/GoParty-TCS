
import React, { useEffect, useState } from "react";
import { LoadingFormsTrends } from "../Loading/LoadingFormsTrend";
import { NotificationBell } from "../Notification/NotificationBell";
import './LikeButton.css'

export const UnlikeButton = () => {
    return (
        <div className="relative w-12 h-12 transition duration-300">
            <input id="unlike-checkbox" className="absolute w-full h-full opacity-0 cursor-pointer z-20" type="checkbox" checked />
            <div className="w-full h-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute fill-current text-blue-400" viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute fill-current text-blue-400" viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
            </div>
        </div>
    );
};