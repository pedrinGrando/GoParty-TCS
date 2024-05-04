import React, { useState } from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import DarkModeToggle from "../../../components/DarkMode/DarkModeToggle";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading/Loading";

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
            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto dark:bg-gray-900">
                <h1 className="border-b py-6 text-4xl font-semibold">Configuracoes</h1>
                <div className="grid grid-cols-8 pt-3 sm:grid-cols-10  dark:bg-gray-900">
                    <div className="relative my-4 w-56 sm:hidden  dark:bg-gray-900">
                        <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
                        <label className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
                        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow dark:bg-gray-900">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">Configuracoes</h1>
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
