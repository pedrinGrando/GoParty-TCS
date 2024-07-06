import { useEffect, useState } from "react";
import { NavBar } from "../../../components/NavBar/NavBar";
import { ModalChoose } from "../../../components/modal/ModalChoose";
import { Link } from "react-router-dom";

export default function StartPage() {

    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string>('');
    const [imagemSrcModal, setImagemSrcModal] = useState<string>('');

    const handleClose = () => setMostrarModal(false);

    const handleButtonClick = () => {
        setMostrarModal(true);
        setMensagemModal('Seja bem vindo ao GoParty, Escolha seu cadastro!');
        setImagemSrcModal('/imagens/choosePic.webp')
    }

    useEffect(() => {
        if (mostrarModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [mostrarModal]);

    return (

        <div>
            {/* Modal de escolha*/}
            <ModalChoose
                mensagem={mensagemModal}
                imagemSrc={imagemSrcModal}
                mostrarModal={mostrarModal}
                onClose={handleClose}
            />

            <body>
                <header>
                    <NavBar />
                </header>
                <section
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-duration="0"
                    className={`${mostrarModal ? "backdrop-blur-lg dark:bg-gray-900" : "dark:bg-gray-900"}`}>
                    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 dark:bg-gray-900">
                        <div className="mr-auto place-self-center lg:col-span-7 dark:bg-gray-900">
                            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">Festas e Formaturas</h1>
                            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"style={{ textIndent: "2em" }}>Eleve a experiência de seus eventos com ingressos personalizados e garanta uma formatura inesquecível com nosso apoio especializado. O GoParty é seu parceiro na criação e aquisição de ingressos exclusivos, facilitando o acesso a uma celebração memorável. Junte-se a nós e transforme momentos importantes em eventos extraordinários.</p>

                            <button onClick={handleButtonClick} className="backdrop:blur-md inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Comece a usar
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>

                        </div>
                        <div className=" hidden lg:mt-0 lg:col-span-5 lg:flex">
                            <img src="/imagens/FotoTestePartyStart-removebg.png" alt="mockup" />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 dark:bg-gray-800">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                        <div className="max-w-screen-md mb-8 lg:mb-16">
                            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Criado para trazer simplicidade ao realizar um evento.</h2>
                            <p className="text-gray-500 sm:text-xl dark:text-gray-400"style={{ textIndent: "2em" }}>A GoParty é uma plataforma inovadora
                                projetada para simplificar a organização de formaturas e eventos, proporcionando uma experiência interativa tanto para usuários interessados em adquirir ingressos quanto para formandos que desejam angariar fundos para suas celebrações. Nosso objetivo é assegurar que cada formatura seja um acontecimento memorável,
                                otimizando o processo de planejamento e execução para garantir uma comemoração impecável.</p>
                        </div>
                        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                            <div
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                            >
                                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                    <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
                                <p className="text-gray-500 dark:text-gray-400">Com o GoParty o marketing de seu evento ocorre simultaneamente.</p>
                            </div>
                            <div
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                            >
                                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                    <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">Legal</h3>
                                <p className="text-gray-500 dark:text-gray-400">Processos legais dentro da plataforma.</p>
                            </div>
                            <div
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                            >
                                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                    <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">Segurança de dados</h3>
                                <p className="text-gray-500 dark:text-gray-400">O GoParty é responsável e cuidadosa com seus dados!</p>
                            </div>
                            <div
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                            >
                                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                    <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">Finanças</h3>
                                <p className="text-gray-500 dark:text-gray-400">O GoParty te ajuda a organizar o financeiro da sua formatura</p>
                            </div>
                            <div
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                            >
                                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                    <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">Design adaptável</h3>
                                <p className="text-gray-500 dark:text-gray-400"> O GoParty foi pensado para ter um design acessível e adaptável para suas preferências.</p>
                            </div>
                            <div
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                            >
                                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                    <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold dark:text-white">Transparência</h3>
                                <p className="text-gray-500 dark:text-gray-400">O GoParty torna a gestão da sua formatura muito mais transparente</p>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Escolha o melhor evento para adquirir um ingresso.</h2>
                            <p className="mb-4">Com a funcionalidade de Eventos em alta, você pode escolher entre os eventos que estão mais chamando a atenção do público.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                                className="w-full rounded-lg" src="/imagens/trendingPhoto.jpg" alt="office content 1" />
                            <img
                                data-aos="fade-up"
                                data-aos-delay="50"
                                data-aos-duration="0"
                                className="mt-4 w-full lg:mt-10 rounded-lg" src="/imagens/trendingPhoto.jpg" alt="office content 2" />
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800" id="permissoes">
                    <div
                        data-aos="fade-up"
                        data-aos-delay="50"
                        data-aos-duration="0"
                        className="relative px-8 py-10 bg-white border-t border-gray-200 md:py-16 lg:py-24 xl:py-40 xl:px-0 dark:bg-gray-800">

                        <div id="pricing" className="container flex flex-col items-center h-full max-w-6xl mx-auto">
                            <h2 className="my-5 text-base font-medium tracking-tight text-indigo-500 uppercase">Tipos de Contas</h2>
                            <h3
                                className="w-full max-w-2xl px-5 px-8 mt-2 text-2xl font-black leading-tight text-center text-gray-900 sm:mt-0 sm:px-0 sm:text-6xl md:px-0 dark:text-white">
                                Trazemos uma forma simples de diferenciar suas permissões dentro do GoParty.</h3>

                            <div className="max-w-full mx-auto md:max-w-6xl sm:px-8">
                                <div className="relative flex flex-col items-center block sm:flex-row">
                                    <div
                                        className="relative z-0 w-11/12 max-w-sm my-8 border border-gray-200 rounded-lg sm:w-3/5 lg:w-1/3 sm:my-5 md:-mr-4">
                                        <div className="overflow-hidden text-black bg-white border-t border-gray-100 rounded-lg shadow-sm">
                                            <div
                                                className="block max-w-sm px-8 mx-auto mt-5 text-sm text-left text-black sm:text-md lg:px-6">
                                                <h3 className="p-3 text-lg font-bold tracking-wide text-center uppercase">Basic<span
                                                    className="ml-2 font-light">GoParty</span></h3>

                                                <p className="text-sm text-gray-600">Ao criar a sua conta voce será um GoParty Basic.
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap px-6 mt-8">
                                                <ul>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Comprar ingressos</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Encontrar eventos</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Comentar e curtir postagens</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="flex items-center block p-8 uppercase">

                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="relative z-10 w-full max-w-md my-8 bg-white rounded-lg shadow-lg sm:w-2/3 lg:w-1/3 sm:my-5">
                                        <div
                                            className="py-4 text-sm font-semibold leading-none tracking-wide text-center text-white uppercase bg-indigo-500 rounded-t">
                                            Mais Vantajoso</div>
                                        <div className="block max-w-sm px-8 mx-auto mt-5 text-sm text-left text-black sm:text-md lg:px-6">
                                            <h3 className="p-3 pb-1 text-lg font-bold tracking-wide text-center uppercase">Adm<span
                                                className="ml-2 font-light">GoParty</span></h3>

                                            <p className="text-sm text-gray-600">Ao ser aprovado em uma solicitação para ser GoParty ADM</p>
                                        </div>
                                        <div className="flex justify-start pl-12 mt-8 sm:justify-start">
                                            <ul>
                                            <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Comentar e curtir postagens</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Comprar ingressos</span>
                                                    </li>
                                            
                                                <li className="flex items-center">
                                                    <div className="p-2 text-green-500 rounded-full fill-current ">
                                                        <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span className="ml-3 text-lg text-gray-700">Adicionar membros à formatura</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="p-2 text-green-500 rounded-full fill-current ">
                                                        <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span className="ml-3 text-lg text-gray-700">Gerar relatórios</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="p-2 text-green-500 rounded-full fill-current ">
                                                        <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span className="ml-3 text-lg text-gray-700">Criar eventos</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="p-2 text-green-500 rounded-full fill-current ">
                                                        <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span className="ml-3 text-lg text-gray-700">Representante da turma</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="flex items-center block p-8 uppercase">

                                        </div>
                                    </div>

                                    <div
                                        className="relative z-0 w-11/12 max-w-sm my-8 rounded-lg shadow-lg sm:w-3/5 lg:w-1/3 sm:my-5 md:-ml-4">
                                        <div className="overflow-hidden text-black bg-white rounded-lg shadow-lg shadow-inner">
                                            <div
                                                className="block max-w-sm px-8 mx-auto mt-5 text-sm text-left text-black sm:text-md lg:px-8">
                                                <h3 className="p-3 pb-1 text-lg font-bold tracking-wide text-center uppercase">Member<span
                                                    className="ml-2 font-light">GoParty</span></h3>

                                                <p className="pl-2 text-sm text-gray-600">Ao ser incluido como membro em uma formatura</p>
                                            </div>
                                            <div className="flex flex-wrap px-8 mt-8">
                                                <ul>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Criar eventos</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Comprar Ingressos</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Comentar e curtir postagens</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Gerar relatórios</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="flex items-center block p-8 uppercase">

                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="relative z-0 w-11/12 max-w-sm my-8 rounded-lg shadow-lg sm:w-3/5 lg:w-1/3 sm:my-5 md:-ml-4">
                                        <div className="overflow-hidden text-black bg-white rounded-lg shadow-lg shadow-inner">
                                            <div
                                                className="block max-w-sm px-8 mx-auto mt-5 text-sm text-left text-black sm:text-md lg:px-8">
                                                <h3 className="p-3 pb-1 text-lg font-bold tracking-wide text-center uppercase">Student<span
                                                    className="ml-2 font-light">GoParty</span></h3>

                                                <p className="pl-2 text-sm text-gray-600">Ao se cadastrar como estudante</p>
                                            </div>
                                            <div className="flex flex-wrap px-8 mt-8">
                                                <ul>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Ser convidado para formaturas</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-lg text-gray-700">Comentar e curtir postagens</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="flex items-center block p-8 uppercase">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <footer className="bg-white p-4 sm:p-6 dark:bg-gray-800">
                    <div className="mx-auto max-w-screen-xl">
                        <div className="md:flex md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <a href="" className="flex items-center">
                                    <img src="/imagens/GoParty_Icon_128px_NoBG (1).png" className="mr-3 h-8" alt="FlowBite Logo" />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-400">GoParty</span>
                                </a>
                            </div>
                            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Nos siga</h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline ">Github</a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline">Discord</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <Link to='/terms-and-conditions'>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Política de Privacidade</a>
                                        </li>
                                        </Link>
                                        <li>
                                            <a href="#" className="hover:underline">Termos  &amp; Condições</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">GoParty</a>. Todos os direitos reservados.
                            </span>
                            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>

            </body>
        </div>
    )
}
