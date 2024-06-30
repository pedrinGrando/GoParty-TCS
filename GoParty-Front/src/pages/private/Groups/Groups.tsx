import React, { useEffect, useState } from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Link } from "react-router-dom"
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"
import { Loading } from "../../../components/Loading/Loading"
import { FormsTrends } from "../../../components/Feed/FormsTrend"
import TrendEvents from "../../../components/Feed/TrendEvents"
import ResponsiveImage from "../../../components/Image/ResponsiveImage"

export default function Groups() {

    interface UsuarioDTO {
        id: string;
        nome: string;
        username: string;
        usuarioCaminho: string;
        tipoUsuario: string;
    }

    const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const fetchGroup = async (): Promise<UsuarioDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/formaturas/listar-grupo/${user.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setIsLoading(false);
            const usuarios: UsuarioDTO[] = await response.json();
            return usuarios;
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching users:', error);
            return [];
        }
    }

    useEffect(() => {
        fetchGroup().then(data => {
            setUsuarios(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
               <ResponsiveImage
                imageUrl="/imagens/newGradMen.png"
                altText="Placeholder Image"
            />
            <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Seu grupo
                <svg className="ml-3 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd" />
                </svg>
            </h1>
            <div className="max-w-2xl mx-auto">

                <TrendEvents />
                <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10 ml-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Membros</h3>
                        <a className="text-sm font-medium text-blue-600 dark:text-blue-500">
                            Todos
                        </a>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {isLoading ? <Loading /> : ''}
                            {usuarios.length == 0 ? <p>Nenhum usuário encontrado no seu grupo!</p> : ''}
                            {usuarios.map((usuario) => (
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full"
                                                src={usuario.usuarioCaminho ? `http://localhost:8081${usuario.usuarioCaminho}` : '/imagens/user (1).png'}
                                                alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {usuario.username}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {usuario.nome}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {usuario.tipoUsuario}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    )
}
