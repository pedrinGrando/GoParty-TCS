import React from "react";
import { Link } from "react-router-dom";

export const NoEvent: React.FC = () => {

    //Contexto de usuário logado
    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');

    return (
      <div>
        <section className="mt-5 bg-center bg-no-repeat rounded-lg bg-blend-multiply py-24 lg:py-40">
        <div className="px-4 mx-auto text-center max-w-xl">
            <img src="/imagens/NoEventSad.webp" alt="" />
            <h1 className="mb-4 text-2xl font-semibold text-black md:text-3xl lg:text-3xl">Nenhum evento encontrado para você.</h1>
            <div className="flex justify-center">
            </div>
        </div>
      </section>

      </div>
    );
  };