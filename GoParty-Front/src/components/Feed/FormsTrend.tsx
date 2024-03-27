
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

       <div className="h-screen-10 flex justify-center items-start">
         <div className="relative me-4 top-3">
           <img className="w-10 h-10 p-1 rounded-full  bg-indigo-200 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
           <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white  rounded-full"></span>
         </div>
         <div className="relative me-4 top-3">
           <img className="w-10 h-10 p-1 rounded-full  bg-indigo-200 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
           <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-red-500 border-2 border-white  rounded-full"></span>
         </div>
         <div className="relative me-4 top-3">
           <img className="w-10 h-10 p-1 rounded-full  bg-indigo-200 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
           <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-red-500 border-2 border-white  rounded-full"></span>
         </div>
         <div className="relative me-4 top-3">
           <img className="w-10 h-10 p-1 rounded-full  bg-indigo-200 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
           <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-red-500 border-2 border-white  rounded-full"></span>
         </div>
         <div className="relative me-4 top-3">
           <img className="w-10 h-10 p-1 rounded-full  bg-indigo-200 ring-2 ring-gray-300 dark:ring-gray-500" src="/imagens/senac.png" alt="Bordered avatar" />
           <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-red-500 border-2 border-white  rounded-full"></span>
         </div>
       </div>
      )}
      </div>
    );
  };










