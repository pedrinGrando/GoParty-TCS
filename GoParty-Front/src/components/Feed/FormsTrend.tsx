
import React, { useEffect, useState } from "react";
import { LoadingFormsTrends } from "../Loading/LoadingFormsTrend";
import { NotificationBell } from "../Notification/NotificationBell";

export const FormsTrends: React.FC = () => {

  interface FormaturaDTO {
    id: number;
    titulo: string;
    descricao: string;
    formaturaCaminho: string;
    cidade: string;
    estado: string;
    dataPrevista: string;
    arrecadado: number;
    arrecad: number;
    nomeUsuario: string;
    totalMembros: number;
    totalEventos: number;
  }

  const [grads, setGrads] = useState<FormaturaDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8081/v1/formaturas/top-formaturas');
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        setIsLoading(false);
        const data = await response.json();
        setGrads(data);
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
        <LoadingFormsTrends />
      ) : (

        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-start bg-white py-3 shadow  dark:bg-gray-900">
          {
            grads.length === 0 ? (
              <div className="flex justify-center dark:bg-gray-900 items-center h-screen">
                Nenhuma formatura em alta.
              </div>
            ) : (
              grads.map(grad => (
                <div className="relative me-4">
                  <img className="w-10 h-10 p-1 rounded-full bg-indigo-300 ring-2 ring-gray-300 dark:ring-gray-500" src={`http://localhost:8081${grad.formaturaCaminho}`} alt="Bordered avatar" />
                </div>
              ))
            )
          }

          <NotificationBell />
        </div>
      )
      }
    </div >
  );
};










