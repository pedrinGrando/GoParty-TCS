import React from "react";
import { Link } from "react-router-dom";

export const NoEvent: React.FC = () => {

    //Contexto de usuário logado
    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');

    return (
      <div>
        <section className="mt-3 bg-center bg-no-repeat rounded-lg bg-blend-multiply py-24 lg:py-40">
        <div className="px-4 mx-auto text-center mt-2 max-w-xl">
            <img src="/imagens/noEventNoBg.png" alt=""/>
            <h1 className="mb-4 text-2xl font-semibold text-black md:text-3xl lg:text-3xl">Nenhum evento.</h1>
            <div className="flex justify-center">
            </div>
        </div>
      </section>

      </div>
    );
  };