
import React, { useEffect, useState } from "react";
import { LoadingFormsTrends } from "../Loading/LoadingFormsTrend";

export const FormsTrends: React.FC = () => {

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
        setIsLoading(true);
      try {
        const response = await fetch('URL_DO_BACKEND/events');
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        setIsLoading(false);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);


    return (
        <div>
      {isLoading ? (
        <LoadingFormsTrends/>
       ) : (

        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-start bg-white py-3 shadow">
        <div className="relative me-4">
          <img className="w-10 h-10 p-1 rounded-full bg-indigo-300 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
        </div>
        <div className="relative me-4">
          <img className="w-10 h-10 p-1 rounded-full bg-indigo-300 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
        </div>
        <div className="relative me-4">
          <img className="w-10 h-10 p-1 rounded-full bg-indigo-300 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
        </div>
        <div className="relative me-4">
          <img className="w-10 h-10 p-1 rounded-full bg-indigo-300 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
        </div>
        <div className="relative me-4">
          <img className="w-10 h-10 p-1 rounded-full bg-indigo-300 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
        </div>
        <div className="relative me-4">
          <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-indigo-300 border-2 border-white rounded-full hover:bg-gray-600" href="#">+99</a>
        </div> 
      </div>
      )}
      </div>
    );
  };










