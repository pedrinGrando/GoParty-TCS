import React from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Link } from "react-router-dom"

export default function Explore () {
   
    return (
        <div>
                 <div className="px-4 mx-auto text-center max-w-xl">
                    <h1 className="mb-4 text-2xl font-semibold text-black md:text-3xl lg:text-4xl">PAGE EXPLORAR EM CONSTRUCAO.</h1>
                        <p className="mb-6 text-base text-gray-300 lg:text-lg sm:px-6 lg:px-12">Mas não se preocupe, você pode criar seu primeiro próprio evento e atrair o público correto para a busca de fundos necessários. Seja um GoParty Adm agora!</p>
                        <div className="flex justify-center">
                                <Link to='/register-adm'>
                                <div className="inline-flex justify-center items-center py-2 px-4 text-base font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                    GoParty ADM
                                    <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </div>
                                </Link>
                            </div>
                        </div>
            <Sidebar />
        </div>
     
    )
}
