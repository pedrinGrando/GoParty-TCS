import React, { useEffect, useState } from "react"
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Loading } from "../../../components/Loading/Loading";
import { Link, useParams } from "react-router-dom";
import { AddMemberModal } from "../../../components/modal/AddMemberModal";
import { NotificationBell } from "../../../components/Notification/NotificationBell";

export default function GradDatails() {

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
        totalEventos: number;
    }

    const { gradId } = useParams();
    const [formatura, setFormatura] = useState<any>();
    const [mostrarModal, setMostrarModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');
    const [isLoading, setIsloading] = useState(false)

    const closeModal = () => {
        setMostrarModal(false);
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const fetchFormatura = async () => {
            setIsloading(true);
            try {
                const response = await fetch(`http://localhost:8081/v1/formaturas/encontrar-por-gradId/${gradId}`);
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
            <NotificationBell />
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
                        <p className="flex items-center text-sm leading-none text-gray-600 dark:text-gray-300">
                            Formatura em Alta
                            <svg className="w-6 h-6 ml-2 text-gray-800 animate-bounce dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                            </svg>
                        </p>
                        <div className="flex items-center mt-2">
                            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white">
                                {formatura?.titulo}
                            </h1>
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Membros <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">{formatura?.totalMembros}</span></p>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Meta de arrecadacao <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">R$ {formatura?.arrecad}</span></p>
                        <div className="flex items-center justify-center">
                            <svg className="text-gray-300 dark:text-white cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <button className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
                        Arrecadado R$ {formatura?.arrecadado}
                    </button>
                    <div>
                        <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">{formatura?.descricao}</p>
                        <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300"> Cidade: {formatura?.cidade}</p>
                        <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300"> Estado: {formatura?.estado}</p>
                    </div>
                    <div>
                        <div className="border-t border-b py-4 mt-7 border-gray-200">
                            <Link to={`/graduation-events/${formatura?.id}`}>
                                <div data-menu className="flex justify-between items-center cursor-pointer">
                                    <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Eventos relacionados <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">{formatura?.totalEventos}</span></p>
                                    <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" role="button" aria-label="show or hide">
                                        <svg className="transform text-gray-300 dark:text-white" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 1L5 5L1 1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </Link>
                            <div className="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300" id="sect">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable</div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <ResponsiveNavBar />
            <Sidebar />
        </div>
    )
}