import React, { useEffect, useState } from 'react';
import Event from '../../types/Event';
import { LoadingTrends } from '../Loading/LoadingTrends';

const TrendEvents: React.FC = () => {
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
                              <LoadingTrends/>
                        ) : (
        
     <ul role="list" className="hidden md:block absolute top-14 right-0 w-max max-w-sm mt-4 mr-4 divide-y divide-gray-300 dark:divide-gray-300">
          {/* {events.map((event) => ( */}
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
            {/* ))} */}
        </ul>
        )}
    </div>
  );
};

export default TrendEvents;
