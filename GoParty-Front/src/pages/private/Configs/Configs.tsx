import React, { useState } from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import DarkModeToggle from "../../../components/DarkMode/DarkModeToggle";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading/Loading";
import TrendEvents from "../../../components/Feed/TrendEvents";
import ResponsiveImage from "../../../components/Image/ResponsiveImage";

export default function Configs() {

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [changeUsernameActive, setChangeUsernameActive] = useState(false);
    const [newUsername, setNewUsername] = useState<string>(user.username);
    const [isUsernameUnique, setIsUsernameUnique] = useState(false);
    const [usernameUpdated, setUsernameUpdated] = useState(false);
    const [isAccountDelete, setIsAccoutDelete] = useState(false);

    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const activateChangeUsername = () => {
        if (changeUsernameActive)
            setChangeUsernameActive(false)
        else
            setChangeUsernameActive(true)
    }

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setNewUsername(newValue);
    };

    const handleUsername = async (event: any) => {
        setIsLoadingUpdate(true);
        try {
            const response = await fetch(`http://localhost:8081/v1/usuarios/update-username/${user.id}/${newUsername}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                setIsLoadingUpdate(false);
                setIsUsernameUnique(true);
                setUsernameUpdated(false);
                throw new Error('falha ao atualizar o username!');
            }
            setIsLoadingUpdate(false);
            setUsernameUpdated(true);
            console.log('Username atualizado com sucesso');
        } catch (error) {
            setIsLoadingUpdate(false);
            setUsernameUpdated(false);
            console.error('Erro ao enviar dados:', error);
        }
    };

    const handleDeleteAccount = async () => {
        setIsLoadingDelete(true);
        if (!user.id) return;

        try {
            const response = await fetch(`http://localhost:8081/v1/usuarios/inativar/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Falha ao inativar conta.');

            setIsAccoutDelete(true);
            setIsLoadingDelete(false);
            alert('Conta inativada com sucesso!');
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            setIsAccoutDelete(false);
            setIsLoadingDelete(false);
            alert('Erro ao inativar conta.');
            console.error('Falha na requisição:', error);
        }
    };
    return (
        <div>
             <ResponsiveImage
                imageUrl="/imagens/newGradMen.png"
                altText="Placeholder Image"
            />
            <TrendEvents />
            <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 items-center">Configurações de conta
                <svg className="ml-3 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd" />
                </svg>
            </h1>
            <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
                <div className="w-full max-w-4xl mx-4 sm:mx-8 xl:mx-auto">
                    <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                    </div>
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow dark:bg-gray-900">
                        <div className="pt-4">
                            <p className="font- text-slate-600">Realize alteracoes importantes em sua conta.</p>
                        </div>
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">Tema</h1>
                            <DarkModeToggle />
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Endereco de E-mail</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">Seu E-mail é <strong>{user.email}</strong></p>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Nome de usuario</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            {changeUsernameActive ?
                                <input
                                    value={newUsername}
                                    onChange={handleChange}
                                    type="text"
                                    className="border-black"
                                />
                                : <p className="text-gray-600">Seu nome de usuario é  <strong>{user.username}</strong></p>
                            }
                            {changeUsernameActive ?
                                <button type="submit" onClick={handleUsername} className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Atualizar</button>

                                : ""
                            }
                            {usernameUpdated && <p style={{ color: 'green' }}>Nome de usuário atualizado com sucesso!</p>}
                            {isUsernameUnique && <p style={{ color: 'red' }}>Este username já está em uso no GoParty!</p>}
                            <button onClick={activateChangeUsername} className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">{changeUsernameActive ? "Voltar" : "Alterar"}</button>{isLoadingUpdate ? <Loading /> : ''}
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Senha</p>
                        <p className="text-gray-600">Sua senha atual é  <strong>************</strong></p>
                        <Link to='/new-password'>
                            <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Alterar</button>
                        </Link>
                        <hr className="mt-4 mb-8" />
                        <div className="mb-10">
                            <p className="py-2 text-xl font-semibold">Deletar Conta</p>
                            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                                Prossiga com cautela
                            </p>
                            <p className="mt-2">Tenha Certeza para tomar esta decisao.</p> {isLoadingDelete ? <Loading /> : ''}
                            {isAccountDelete && <p style={{ color: 'green' }}>Conta deletada com sucesso!</p>}
                            <button onClick={handleDeleteAccount} className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continuar com minha decisao</button>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar />
            <ResponsiveNavBar />
        </div>
    )
}
