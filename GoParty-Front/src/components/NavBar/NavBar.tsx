import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModalChoose } from "../modal/ModalChoose";

export const NavBar: React.FC = () => {
 
    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string>('');
    const [imagemSrcModal, setImagemSrcModal] = useState<string>('');

    const handleClose = () => setMostrarModal(false);

    const handleButtonClick = () =>{
        setMostrarModal(true);
        setMensagemModal('Olá novamente, Mude seu cadastro!');
        setImagemSrcModal('/imagens/choosePic.webp')
    }

    return (
        <div>
             {/* Modal de escolha*/}
         <ModalChoose
              mensagem={mensagemModal}
              imagemSrc={imagemSrcModal}
              mostrarModal={mostrarModal}
              onClose={handleClose}
             />
        <nav className="bg-white -500 mb-[0px] fixed top-0 w-full z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="inline-block">
                    <img src="/imagens/Logo GoPartyIcon.webp" className="h-20" alt="GoParty Logo" />
                    </div>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black text-black shadow-text">|  GoParty</span>

                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg text-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link to='/about'>
                            <a href="#" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent">Sobre</a>
                            </Link>
                        </li>                       
                        <li>
                           <button type="button" onClick={handleButtonClick} className={location.pathname === '/register-student' ? 'block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"' : 'block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"'}>Comece</button>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent">Suporte</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    );
  };