import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { ModalLogout } from "../modal/ModalLogout";

interface SidebarProps {
  userName?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ userName }) => {

  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  const handleClose = () => setMostrarModal(false);

  const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  const token = localStorage.getItem('token');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    setMostrarModal(true);
  }


  return (
    <div>
      <ModalLogout
        mostrarModal={mostrarModal}
        onClose={handleClose}
      />
      <div className="flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800 dark:bg-gray-700">
        <div className={`fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ zIndex: 999 }}> {/* Adicionando estilo zIndex */}
          <div className="flex items-center justify-center h-14 dark:bg-gray-700">
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow dark:bg-gray-700">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                </div>
              </li>
              <li>
                <Link to="/home">
                  <div className={location.pathname === '/home' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <div className={location.pathname === '/explore' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <img src="/imagens/icons/search (1).png" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Buscar</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/your-notifications'>
                  <div className={location.pathname === '/your-notifications' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Notificações</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                  </div>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Eventos</div>
                </div>
              </li>
              {user?.principal.tipoUsuario === 'MEMBER' && (
                <li>
                  <Link to='/create-event'>
                    <div className={location.pathname === '/register-adm' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <img src="/imagens/party.png" alt="" />
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Criar evento</span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.principal.tipoUsuario === 'STUDENT' && (
                <li>
                  <Link to='/register-adm'>
                    <div className={location.pathname === '/register-adm' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <img src="/imagens/icons/guidance.png" alt="" />
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Ser GoParty ADM</span>
                    </div>
                  </Link>
                </li>
              )}
              <li>
                <Link to='/your-tickets'>
                  <div className={location.pathname === '/your-tickets' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <img src="/imagens/icons/ticket.png" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Ingressos</span>
                  </div>
                </Link>
              </li>
              {user?.principal.tipoUsuario === 'MEMBER' || user?.principal.id === 'ADM' && (
              <li>
                <Link to='/your-groups'>
                  <div className={location.pathname === '/your-groups' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Seu Grupo</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">15</span>
                  </div>
                </Link>
              </li>
                )}
              <li>
                <Link to='/trending-events'>
                  <div className={location.pathname === '/trending-events' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <img src="/imagens/trending-topic.png" alt="trend" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Em Alta</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">15</span>
                  </div>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Configurações</div>
                </div>
              </li>
              <li>
                <Link to='/your-profile'>
                  <div className={location.pathname === '/your-profile' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Perfil</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/account-config'>
                  <div className={location.pathname === '/account-config' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Configurações</span>
                  </div>
                </Link>
              </li>
              <li>

                {/* Ao fazer o logout */}

                <div onClick={handleLogout} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Sair</span>
                </div>

              </li>
              <li>
                <footer className="shadow dark:bg-gray-300 rounded m-4">
                  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <a href="/login" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                      </a>
                      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Sobre</a>
                        </li>
                        <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Política de Privacidade</a>
                        </li>
                        <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Licença</a>
                        </li>
                        <li>
                          <a href="#" className="hover:underline">Contato</a>
                        </li>
                      </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://goparty.com/" className="hover:underline">GoParty™</a>. Todos os Direitos Reservados.</span>
                  </div>
                </footer>
              </li>
            </ul>
          </div>
        </div>

        {/* Botão de abertura e fechamento da sidebar */}
        <button
          onClick={toggleSidebar}
          className="fixed p-1 text-black bg-white rounded-full top-3 left-2"
          style={{ zIndex: 999 }}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
          <span className="sr-only">{isOpen ? 'Close sidebar' : 'Open sidebar'}</span>
        </button>
      </div>
    </div>
  )
}