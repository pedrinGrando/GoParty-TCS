import React from "react";
import { Link } from "react-router-dom";

export const NoEvent: React.FC = () => {

    //Contexto de usuário logado
    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');

    return (
      <div>
        <section className="mt-8 bg-center bg-no-repeat rounded-lg bg-blend-multiply py-24 lg:py-40">
        <div className="px-4 mx-auto text-center max-w-xl">
            <img src="/imagens/NoEventSad.webp" alt="" />
            <h1 className="mb-4 text-2xl font-semibold text-black md:text-3xl lg:text-3xl">Nenhum evento encontrado para você.</h1>
            <p className="mb-6 text-base text-black lg:text-lg sm:px-6 lg:px-12">Seja um GoParty Adm {user.username}!</p>
            <div className="flex justify-center">
                <Link to='/register-adm'>
                <a className="inline-flex justify-center items-center py-2 px-4 text-base font-medium text-white rounded-full bg-indigo-400 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    GoParty ADM
                    <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
                </Link>
            </div>
        </div>
      </section>

      </div>
    );
  };