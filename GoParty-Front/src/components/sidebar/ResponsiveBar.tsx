import React from "react";
import { Link } from "react-router-dom";

export const ResponsiveNavBar: React.FC = () => {
    return (
        <div>
       <footer className="fixed bottom-0 block md:hidden inset-x-0 z-30 shadow bg-white dark:bg-gray-900 m-4">
       <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
           <div className="sm:flex sm:items-center sm:justify-between">
           <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
               <li>
                <Link to="/home">
                <div className={location.pathname === '/home' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Home</span>
                    </div>
                    </Link>
                </li>
               <li>
                <Link to="/explore">
                <div className={location.pathname === '/explore' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                    <span className="inline-flex justify-center items-center ml-4">
                   <img src="/imagens/icons/search (1).png" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Buscar</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/your-profile'>
                <div className={location.pathname === '/your-profile' ? 'relative flex flex-row items-center h-11 focus:outline-none bg-gray-300 text-gray-600 hover:text-gray-800 border-l-4 border-transparent border-indigo-600 pr-6"' : 'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"'}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Perfil</span>
                </div>
                </Link>
              </li>
           </ul>
           </div>
       </div>
       </footer>
     </div>
    )
}





