import React, { useEffect, useState } from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Link } from "react-router-dom"
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"
import { Loading } from "../../../components/Loading/Loading"

export default function Groups() {

    interface UsuarioDTO {
        id: string;
    }

    const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const fetchGroup = async (): Promise<UsuarioDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/fomaturas/listar-grupo/${user.principal.id}`);
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
            <div className="max-w-2xl mx-auto">
                <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Seu grupo</h3>
                        <a href="" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Ver todos
                        </a>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? <Loading/> : ''}
                            {usuarios.map((usuario) => (
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {/* <img className="w-8 h-8 rounded-full" src={`http://localhost:8081${usuario.usuarioCaminho}`} alt="Neil image" /> */}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {/* {usuario.username} */}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {/* {usuario.nome} */}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            Teste
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
