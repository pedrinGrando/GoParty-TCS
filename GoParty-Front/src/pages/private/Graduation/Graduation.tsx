import React, { useEffect, useState } from "react"
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Loading } from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { AddMemberModal } from "../../../components/modal/AddMemberModal";

export default function Graduation() {

    interface FormaturaDTO {
        id: number;
        titulo: string;
        descricao: string;
        formaturaCaminho: string;
        cidade: string;
        estado: string;
        dataPrevista: string;
        arrecadado: number;
        arrecad: number;
        nomeUsuario: string;
        totalMembros: number;
    }

    const [formatura, setFormatura] = useState<any>();
    const [mostrarModal, setMostrarModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');
    const [isLoading, setIsloading] = useState(false)

    const closeModal = () => {
        setMostrarModal(false);
    }

    useEffect(() => {
        const fetchFormatura = async () => {
            setIsloading(true);
            try {
                const response = await fetch(`http://localhost:8081/v1/formaturas/encontrar-por-id/${user.id}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados da formatura');
                }
                console.log("Formatura consultada com sucesso.")
                const data: FormaturaDTO = await response.json();
                setFormatura(data);
            } catch (err: any) {
                console.error(err.message);
            } finally {
                console.log(formatura)
                setIsloading(false);
            }
        };

        fetchFormatura();
    }, [user.id]);

    return (
        <div>
            <AddMemberModal
                mostrarModal={mostrarModal}
                onClose={closeModal}
                formId={formatura?.id}
            />
            <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
                {isLoading && <Loading />}
                <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                    <img className="w-full" alt="image of a girl posing" src={`http://localhost:8081${formatura?.formaturaCaminho}`} />
                    <img className="mt-6 w-full" alt="image of a girl posing" src="/imagens/imagemFormaturaPage-noBg.png" />
                </div>
                <div className="md:hidden">
                    <img className="w-full" alt="image of a girl posing" src="/imagens/imagemFormaturaPage-noBg.png" />
                    <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                        <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src={`http://localhost:8081${formatura?.formaturaCaminho}`} />
                        <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src={`http://localhost:8081${formatura?.formaturaCaminho}`} />
                        <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src={`http://localhost:8081${formatura?.formaturaCaminho}`} />
                        <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src={`http://localhost:8081${formatura?.formaturaCaminho}`} />
                    </div>
                </div>
                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                    <div className="border-b border-gray-200 pb-6">
                        <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">Sua Formatura</p>
                        <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{formatura?.titulo}</h1>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Membros <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">{formatura?.totalMembros}</span></p>

                        {
                            user.tipoUsuario === "ADM" ?

                                <div className="flex items-center justify-center">
                                    <p className="text-sm leading-none text-gray-600 dark:text-gray-300">Adicionar membro +</p>
                                    <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"></div>
                                    <button onClick={() => setMostrarModal(true)}>
                                        <svg className="cursor-pointer text-gray-300 dark:text-white" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                : ''
                        }
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Arrecadado <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">$</span></p>
                        <div className="flex items-center justify-center">
                            <svg className="text-gray-300 dark:text-white cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <button className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
                        R$ {formatura?.arrecadado}
                    </button>
                    <div>
                        <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">{formatura?.descricao}</p>
                        <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300"> Cidade: {formatura?.cidade}</p>
                        <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300"> Estado: {formatura?.estado}</p>
                    </div>
                    <div>
                        <div className="border-t border-b py-4 mt-7 border-gray-200">
                            <div data-menu className="flex justify-between items-center cursor-pointer">
                                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Eventos relacionados</p>
                                <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" role="button" aria-label="show or hide">
                                    <svg className="transform text-gray-300 dark:text-white" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L5 5L1 1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300" id="sect">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable</div>
                        </div>
                    </div>
                    <div>
                        <div className="border-b py-4 border-gray-200">
                            <div data-menu className="flex justify-between items-center cursor-pointer">
                                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Teste</p>
                                <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" role="button" aria-label="show or hide">
                                    <svg className="transform text-gray-300 dark:text-white" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L5 5L1 1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300" id="sect">If you have any questions on how to return your item to us, contact us.</div>
                        </div>
                    </div>
                </div>
            </div>
            <ResponsiveNavBar />
            <Sidebar />
        </div>
    )
}