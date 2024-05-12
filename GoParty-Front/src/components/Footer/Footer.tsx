import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <div>
      <footer className="shadow dark:bg-white m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/login" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src="/imagens/graduation-hat (2).png" className="h-8 mr-2 sm:mr-0 sm:mb-0" alt="GoParty Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GoParty</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Sobre</a>
              </li>
              <li>
                <Link to='/terms-and-conditions' >
                  <a href="#" className="hover:underline me-4 md:me-6">Política de Privacidade</a>
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://goparty.com/" className="hover:underline">GoParty™</a>. Todos os Direitos Reservados.</span>
        </div>
      </footer>
    </div>
  );
};