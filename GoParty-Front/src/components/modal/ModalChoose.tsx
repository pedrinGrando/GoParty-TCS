import React from "react";
import { Link } from "react-router-dom";

interface ModalProps {
    mensagem: string;
    imagemSrc?: string; 
    mostrarModal: boolean;
    onClose: () => void; 
  }

export const ModalChoose: React.FC<ModalProps> = ({ mensagem, imagemSrc, mostrarModal, onClose }) => {

    if (!mostrarModal) return null;

    return(

        <div>
             <button onClick={onClose} type="button" data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
            <svg aria-hidden="true" className="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
           
            </button>
            <div 
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="0"
            id="crypto-modal" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">   
                <div className="relative p-4 w-full max-w-md">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {imagemSrc && <img src={imagemSrc} alt="Modal" className="mx-auto mt-6 mb-1 max-w-[110px]"/>}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {mensagem}
                            </h3>
                            <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Escolha o melhor cadastro para você no GoParty.</p>
                            <ul className="my-4 space-y-3">
                                <li>
                                    <Link to='/register-student'>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                       <img src="/imagens/education.png" alt="graduationPic" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">GoParty Student</span>
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register'>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <img src="/imagens/user.png" alt="userPic" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">GoParty User</span>
                                    </a>
                                    </Link>
                                </li>
                               
                            </ul>
                            <div>
                                <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                                    <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    Quer saber mais sobre?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}