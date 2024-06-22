import React, { useEffect, useState } from "react";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Loading } from "../../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { ToastType } from "../../../components/modal/ToastType";
import { ToastContainer } from "../../../components/modal/ToastContainer";

export default function AddMember() {
    const [search, setSearch] = useState<string>('');
    const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
    const [invited, setInvited] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [toastType, setToastType] = useState<ToastType>("error");
    const [message, setMessage] = useState("");
    const [erro, setErro] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { formId } = useParams<{ formId: string }>();

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    interface UsuarioDTO {
        id: number;
        nome: string;
        username: string;
        usuarioCaminho: string;
        tipoUsuario: string;
    }

    const closeToast = () => {
        setIsVisible(false);
    }

    const inviteUser = async (userId: number) => {
        setIsLoading(true);
        try {
            const formaturaId = formId || '1'; 

            const response = await fetch(`http://localhost:8081/v1/invite/send-invite/${userId}/${formaturaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 400) {
                    setMessage('Você já convidou este usuário');
                }
                setToastType('error');
                setInvited(false);
                setIsVisible(true);
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== userId));
            setInvited(true);
            setToastType('success');
            setIsVisible(true);
            setMessage('Convite enviado!');
        } catch (error) {
            setInvited(false);
            setToastType('informative');
            setIsVisible(true);
            setMessage('Você já convidou este usuário!');
            console.error('Erro ao convidar usuário:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const buscarUsuarios = async (search: string): Promise<UsuarioDTO[]> => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/usuarios/ativos-estudantes`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const usuarios: UsuarioDTO[] = await response.json();
            return usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        buscarUsuarios(search).then(data => {
            setUsuarios(data);
            setIsLoading(false);
        });
    }, [search]);

    const handleSearch = async () => {
        try {
            const usuariosBuscados = await buscarUsuarios(search);
            setUsuarios(usuariosBuscados);
            setErro('');
        } catch (error) {
            setIsLoading(false);
            setErro('Erro ao buscar usuários');
        }
    };

    return (
        <div className="items-center justify-center min-h-screen">
            <ToastContainer
                message={message}
                onClose={closeToast}
                isVisible={isVisible}
                type={toastType}
            />
            <div className="p-6 max-w-lg bg-white rounded-lg border shadow-md sm:p-10 dark:bg-gray-800 dark:border-gray-700">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-black"
                        placeholder="Pesquise por usuários..." required
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                    />
                    <button onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                    {erro && <div>{erro}</div>}
                </div>
                <div className="flow-root mt-6">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? <Loading /> : ''}
                        {usuarios.length === 0 ? <p>Nenhum GoParty Student ativo.</p> : ''}
                        {usuarios.map((usuario) => (
                            <li key={usuario.id} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full"
                                            src={usuario.usuarioCaminho ? `http://localhost:8081${usuario.usuarioCaminho}` : '/imagens/user (1).png'}
                                            alt="Imagem do usuário" />
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
                                    <div>
                                        {invited ?
                                            <span><img src="/imagens/letter.png" alt="invite" /></span>
                                            : <button onClick={() => inviteUser(usuario.id)}>
                                                <img src="/imagens/add-group.png" alt="invite" />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    );
}
