import React, { useState } from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorPassword } from "../../../components/Error/ErrorPassWord";

export default function NewPass() {

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const [senhaAtual, setSenhaAtual] = useState<string>("");
    const [novaSenha, setNovaSenha] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [sucessChange, setSucessChange] = useState(false);
    const [senhaNotEqual, setSenhaNotEqual] = useState(false);
    const [passConfirm, setPassConfirm] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [passNotValid, setPassNotValid] = useState(true);
    const [errorChange, setErrorChange] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password: string) => {
        // Verifica se a senha tem entre 8 e 15 caracteres
        if (password.length < 8 || password.length > 15) {
            return false;
        }

        // Verifica se a senha contém pelo menos um caractere especial e um numérico
        const regexSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const regexNumeric = /[0-9]+/;

        if (!regexSpecialChar.test(password) || !regexNumeric.test(password)) {
            return false;
        }

        return true;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;

        if (name === 'novaSenha') {
            setNovaSenha(value);
            const isValidPassword = validatePassword(value);
            setPassNotValid(isValidPassword)
        }

        if (name === 'senhaAtual') {
            setSenhaAtual(value);
        }
        if (name === 'senhaConfirm') {
            setPassConfirm(value)
        }

        if (name === 'senhaConfirm' && value !== novaSenha) {
            setSenhaNotEqual(true);
        } else {
            setSenhaNotEqual(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleUpdatePassword = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const url = `http://localhost:8081/v1/usuarios/update-senha/${user.id}`;
        const body = {
            senhaAtual,
            novaSenha
        };
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                setSucessChange(true);
                setIsLoading(false);
                setTimeout(() => {
                    navigate('/account-config');
                }, 4000);
            } else {
                setIsLoading(false);
                setErrorChange(true)
                setMessage("Senha atual incorreta!");
                const errorText = await response.text();
            }
        } catch (error: any) {
            setIsLoading(false);
            setErrorChange(true)
            setMessage(error.message);
        }
    };
    return (
        <div className="bg-white lg:py-20 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 mx-auto max-w-7xl lg:flex-row">
            <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
              <h1 className="text-4xl font-semibold text-center border-b pb-6 dark:text-white">Atualizar sua senha</h1>
              <div className="flex justify-center my-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-gray-600 dark:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <label htmlFor='senhaAtual' className="absolute px-2 -mt-3 ml-2 text-gray-600 bg-white dark:text-white dark:bg-gray-800">Senha atual</label>
                  <input
                    placeholder="●●●●●●●●●●●●"
                    name='senhaAtual'
                    value={senhaAtual}
                    id='senhaAtual'
                    onChange={handleChange}
                    type='password'
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full py-4 mt-2 text-base bg-white border-gray-300 rounded-md dark:bg-gray-700 ${senhaNotEqual ? 'border-red-500' : ''}`}
                  />
                </div>
                <div className="relative">
                  <label htmlFor='novaSenha' className="absolute px-2 -mt-3 ml-2 text-gray-600 bg-white dark:text-white dark:bg-gray-800">Crie uma senha</label>
                  <input
                    placeholder="●●●●●●●●●●●●"
                    name='novaSenha'
                    id='novaSenha'
                    value={novaSenha}
                    onChange={handleChange}
                    type='password'
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full py-4 mt-2 text-base bg-white border-gray-300 rounded-md dark:bg-gray-700 ${senhaNotEqual ? 'border-red-500' : ''}`}
                  />
                </div>
                <div className="relative">
                  <label htmlFor='senhaConfirm' className="absolute px-2 -mt-3 ml-2 text-gray-600 bg-white dark:text-white dark:bg-gray-800">Confirmar senha</label>
                  <input
                    placeholder="●●●●●●●●●●●●"
                    id='senhaConfirm'
                    value={passConfirm}
                    name='senhaConfirm'
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full py-4 mt-2 text-base bg-white border-gray-300 rounded-md dark:bg-gray-700 ${senhaNotEqual ? 'border-red-500' : ''}`}
                  />
                  {senhaNotEqual && <p className="text-red-500">As senhas não coincidem!</p>}
                  {sucessChange && <p className="text-green-500">Senha atualizada com sucesso!</p>}
                  {errorChange && <p className="text-red-500">{message}</p>}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 text-gray-600"
                  >
                    {showPassword ? (
                      <img src="/imagens/view.png" alt="" />
                    ) : (
                      <img src="imagens/hide.png" alt="" />
                    )}
                  </button>
                </div>
                <button
                  onClick={handleUpdatePassword}
                  type='submit'
                  className="w-full py-4 text-xl font-medium text-center text-white transition duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600 ease"
                >
                  {isLoading ? (
                    <Loading />
                  ) : (
                    'Salvar'
                  )}
                </button>
                {!passNotValid && <ErrorPassword />}
              </div>
            </div>
          </div>
          <Sidebar />
          <ResponsiveNavBar />
        </div>
      );
    }
