import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { ModalLogout } from "../modal/ModalLogout";

interface SidebarProps {
  userName?: string
}

interface UsuarioDTO {
  id: string;
  nome: string;
  username: string;
  usuarioCaminho: string;
  tipoUsuario: string;
}

interface EventoDTO {
  id: number;
  titulo: string;
  descricao: string;
  eventoCaminho: string;
  cidade: string;
  rua: string;
  status: string;
  estado: string;
  dataEvento: string;
  valor: number;
  nomeUsuario?: string;
  esgotado: boolean;
  tituloFormatura: string;
  totalCurtidas: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ userName }) => {

  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [contadorNoti, setContadorNoti] = useState<number>(0);
  const [eventos, setEventos] = useState<EventoDTO[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);

  const handleClose = () => setMostrarModal(false);

  const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  const token = localStorage.getItem('token');

  const fetchTodosEventos = async (): Promise<EventoDTO[]> => {
    try {
      const response = await fetch('http://localhost:8081/v1/eventos/top10Curtidas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const eventos: EventoDTO[] = await response.json();
      return eventos;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }
  useEffect(() => {
    fetchTodosEventos().then(data => {
      setEventos(data);
    });
  }, []);


  const fetchGroup = async (): Promise<UsuarioDTO[]> => {
    try {
      const response = await fetch(`http://localhost:8081/v1/formaturas/listar-grupo/${user.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const usuarios: UsuarioDTO[] = await response.json();
      return usuarios;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  useEffect(() => {
    fetchGroup().then(data => {
      setUsuarios(data);
    });
  }, []);

  const fetchNoti = async (): Promise<number> => {
    try {
      const response = await fetch(`http://localhost:8081/v1/notification/count-notifications/${user.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const countNoti: number = await response.json();
      return countNoti;
    } catch (error) {
      console.error('Error fetching yout notifications events:', error);
      return 0;
    }
  }
  useEffect(() => {
    fetchNoti().then(data => {
      setContadorNoti(data);
    });
  }, []);

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
        <div className={`fixed flex flex-col top-0 left-0 w-80 bg-white h-full border-r transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ zIndex: 999 }}>
          <div className="flex items-center justify-center h-14 dark:bg-gray-700"></div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow dark:bg-gray-700">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">

                </div>
              </li>
              <li>
                <Link to="/home">
                  <div className={location.pathname === '/home' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <div className={location.pathname === '/explore' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Buscar</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/your-notifications'>
                  <div className={location.pathname === '/your-notifications' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Notificações</span>
                    {contadorNoti > 0 ?
                      <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">{contadorNoti}</span>
                      : ''
                    }
                  </div>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Eventos</div>
                </div>
              </li>
              {user?.tipoUsuario === 'MEMBER' && (
                <li>
                  <Link to='/create-event'>
                    <div className={location.pathname === '/create-event' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Criar evento</span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.tipoUsuario === 'ADM' && (
                <li>
                  <Link to='/create-event'>
                    <div className={location.pathname === '/create-event' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Criar evento</span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.tipoUsuario === 'MEMBER' && (
                <li>
                  <Link to='/your-graduation'>
                    <div className={location.pathname === '/your-graduation' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg height="26px" width="26px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245.827 245.827" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M223.336,148.384l-0.137-23.527l22.628-12.662L122.576,47.195L0,113.495l49.144,28.216 l0.098,16.766l0.01,1.339l0.449-0.215c-0.518,0.703-0.85,1.426-0.84,2.149c0.039,8.246,33.326,14.772,74.41,14.548 c41.064-0.215,74.302-7.122,74.273-15.349c0-0.723-0.381-1.426-0.889-2.149l0.449,0.215v-1.339l-0.088-16.834l21.309-13.258 l0.117,20.83c-2.345,1.006-3.976,3.312-3.957,6.009c0.02,3.537,2.892,6.399,6.458,6.37c3.586-0.02,6.429-2.912,6.409-6.439 C227.332,151.657,225.691,149.371,223.336,148.384z M123.241,170.621c-36.452,0.205-66.017-3.801-66.046-8.91 c-0.029-5.11,29.496-9.399,65.949-9.585c36.462-0.205,66.017,3.781,66.037,8.881 C189.209,166.098,159.703,170.426,123.241,170.621z M195.335,127.183c-4.934-5.188-22.618-18.886-72.426-18.602 c-49.877,0.264-67.336,14.128-72.211,19.394l-0.029-4.963c0,0,14.147-21.524,72.202-21.827 c58.025-0.313,72.436,21.045,72.436,21.045L195.335,127.183z M215.755,162.199l-2.511,36.433 c7.767-12.203,14.255-7.66,14.255-7.66l-0.156-28.832C218.998,165.414,215.755,162.199,215.755,162.199z"></path> </g> </g> </g> </g></svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Sua formatura</span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.tipoUsuario === 'ADM' && (
                <li>
                  <Link to='/your-graduation'>
                    <div className={location.pathname === '/your-graduation' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg height="26px" width="26px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245.827 245.827" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M223.336,148.384l-0.137-23.527l22.628-12.662L122.576,47.195L0,113.495l49.144,28.216 l0.098,16.766l0.01,1.339l0.449-0.215c-0.518,0.703-0.85,1.426-0.84,2.149c0.039,8.246,33.326,14.772,74.41,14.548 c41.064-0.215,74.302-7.122,74.273-15.349c0-0.723-0.381-1.426-0.889-2.149l0.449,0.215v-1.339l-0.088-16.834l21.309-13.258 l0.117,20.83c-2.345,1.006-3.976,3.312-3.957,6.009c0.02,3.537,2.892,6.399,6.458,6.37c3.586-0.02,6.429-2.912,6.409-6.439 C227.332,151.657,225.691,149.371,223.336,148.384z M123.241,170.621c-36.452,0.205-66.017-3.801-66.046-8.91 c-0.029-5.11,29.496-9.399,65.949-9.585c36.462-0.205,66.017,3.781,66.037,8.881 C189.209,166.098,159.703,170.426,123.241,170.621z M195.335,127.183c-4.934-5.188-22.618-18.886-72.426-18.602 c-49.877,0.264-67.336,14.128-72.211,19.394l-0.029-4.963c0,0,14.147-21.524,72.202-21.827 c58.025-0.313,72.436,21.045,72.436,21.045L195.335,127.183z M215.755,162.199l-2.511,36.433 c7.767-12.203,14.255-7.66,14.255-7.66l-0.156-28.832C218.998,165.414,215.755,162.199,215.755,162.199z"></path> </g> </g> </g> </g></svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Sua formatura</span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.tipoUsuario === 'MEMBER' && (
                <li>
                  <Link to='/your-events'>
                    <div className={location.pathname === '/your-events' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'}>
                      <span className="inline-flex justify-center items-center ml-3">
                        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 2.5V6.5M9 2.5V6.5M9 11.5H3.51733M3.51733 11.5C3.50563 11.8208 3.5 12.154 3.5 12.5C3.5 17.4094 4.64094 19.7517 8 20.6041M3.51733 11.5C3.7256 5.79277 5.84596 4 12 4C17.3679 4 19.6668 5.36399 20.3048 9.5M18 13C18 14.1045 17.1046 15 16 15C14.8954 15 14 14.1045 14 13C14 11.8954 14.8954 11 16 11C17.1046 11 18 11.8954 18 13ZM13.25 21H18.75C19.4404 21 20 20.4404 20 19.75C20 17.7096 17 17.75 16 17.75C15 17.75 12 17.7096 12 19.75C12 20.4404 12.5596 21 13.25 21Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Seus eventos </span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.tipoUsuario === 'ADM' && (
                <li>
                  <Link to='/your-events'>
                    <div className={location.pathname === '/your-events' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 2.5V6.5M9 2.5V6.5M9 11.5H3.51733M3.51733 11.5C3.50563 11.8208 3.5 12.154 3.5 12.5C3.5 17.4094 4.64094 19.7517 8 20.6041M3.51733 11.5C3.7256 5.79277 5.84596 4 12 4C17.3679 4 19.6668 5.36399 20.3048 9.5M18 13C18 14.1045 17.1046 15 16 15C14.8954 15 14 14.1045 14 13C14 11.8954 14.8954 11 16 11C17.1046 11 18 11.8954 18 13ZM13.25 21H18.75C19.4404 21 20 20.4404 20 19.75C20 17.7096 17 17.75 16 17.75C15 17.75 12 17.7096 12 19.75C12 20.4404 12.5596 21 13.25 21Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Seus eventos </span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.tipoUsuario === 'STUDENT' && (
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
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Ingressos</span>
                  </div>
                </Link>
              </li>
              {user?.tipoUsuario === 'MEMBER' && (
                <li>
                  <Link to='/your-groups'>
                    <div className={location.pathname === '/your-groups' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Seu Grupo</span>
                      <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">{usuarios.length}</span>
                    </div>
                  </Link>
                </li>
              )}
              {user?.tipoUsuario === 'ADM' && (
                <li>
                  <Link to='/your-groups'>
                    <div className={location.pathname === '/your-groups' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">Seu Grupo</span>
                      <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">{usuarios.length}</span>
                    </div>
                  </Link>
                </li>
              )}
              <li>
                <Link to='/trending-events'>
                  <div className={location.pathname === '/trending-events' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Em Alta</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">{eventos.length}</span>
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
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Perfil</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/account-config'>
                  <div className={location.pathname === '/account-config' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Configurações</span>
                  </div>
                </Link>
              </li>
              <li>
                {/* Ao fazer o logout */}
                <div onClick={handleLogout} className="relative flex flex-row items-center ml-3 h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                  </svg>
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
                        <Link to='/terms-and-conditions' >
                          <a href="#" className="hover:underline me-4 md:me-6">Política de Privacidade</a>
                        </Link>
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
        <button
          className="fixed p-1 cursor-default text-black bg-white rounded-full top-3 left-2"
          style={{ zIndex: 999 }}
        >
          <img src="/imagens/GoParty_Icon_128px_NoBG (1).png" alt="logo" className="w-16 h-16 hidden md:block" />
          <span className="sr-only">{isOpen ? 'Close sidebar' : 'Open sidebar'}</span>
        </button>
        {/* Botão de abertura e fechamento da sidebar */}
        <button
          onClick={toggleSidebar}
          className="fixed p-1 text-black bg-white rounded-full top-3 left-2 block md:hidden"
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