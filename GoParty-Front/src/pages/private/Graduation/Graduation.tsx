import React, { useEffect, useState } from "react"
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Loading } from "../../../components/Loading/Loading";

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
    }

    const [formatura, setFormatura] = useState<FormaturaDTO | null>(null);
    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');
    const [isLoading, setIsloading] = useState(false)

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
                setIsloading(false);  
            }
        };

        fetchFormatura();  
    }, [user.id]);

    return (
        <div>
            <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
                {isLoading && <Loading/>}
                <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                    {/* imagem do evento */}
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
                        <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Membros</p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">Smoke Blue with red accents</p>
                            <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"></div>
                            <svg className="cursor-pointer text-gray-300 dark:text-white" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Arrecadado</p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">38.2</p>
                            <svg className="text-gray-300 dark:text-white cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <button className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
                        <svg className="mr-3 text-white dark:text-gray-900" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.66699 4.83333V4.84166" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.333 11.5V11.5083" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Teste
                    </button>
                    <div>
                        <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">{formatura?.descricao}</p>
                        <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300"> Teste Code: 8BN321AF2IF0NYA</p>
                        <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300"> Teste: 13.2 inches</p>
                        <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300"> Teste: 10 inches</p>
                        <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300"> Teste: 5.1 inches</p>
                        <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4"> Teste: 100% calf leather, inside: 100% lamb leather</p>
                    </div>
                    <div>
                        <div className="border-t border-b py-4 mt-7 border-gray-200">
                            <div data-menu className="flex justify-between items-center cursor-pointer">
                                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Shipping and returns</p>
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
                                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Contact us</p>
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