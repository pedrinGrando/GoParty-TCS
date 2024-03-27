import { Sidebar } from "../../../components/sidebar/Sidebar";
import { useUser } from "../../../components/UserContext/UserContext";

export default function Profile () {
   
    const { user } = useUser();

    return (
             <div>
                <div className="p-16">
                            <div className="p-8 bg-white shadow mt-24">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div className="col-start-2 md:col-start-3"> {/* Adicionado */}
                                <div>
                                <p className="font-bold text-gray-700 text-xl">22</p>
                                <p className="text-gray-400">Eventos Realizados</p>
                                </div>
                                <div>
                                <p className="font-bold text-gray-700 text-xl">10</p>
                                <p className="text-gray-400">Ingressos Adquiridos</p>
                                </div>
                            </div>
                            </div>
                                <div className="relative">
                                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                                </div>
                                </div>

                                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <button
                            className="text-white py-2 px-4 uppercase rounded-full bg-indigo-500 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                            >
                            Atualizar seus dados
                            </button>
                                
                                </div>
                            </div>

                            <div className="mt-20 text-center border-b pb-12">
                                <h1 className="text-4xl font-medium text-gray-700">{user?.nome}, <span className="font-light text-gray-500">20</span></h1>
                                <p className="font-light text-gray-600 mt-3">Florianópolis, Santa Catarina</p>

                                <p className="mt-8 text-gray-500">Você é <span className="text-green">{user?.tipoUsuario}</span></p>
                            </div>

                            <div className="mt-12 flex flex-col justify-center">
                                <p className="text-gray-600 text-center font-light lg:px-16">Seus dados cadastrais.</p>
                            </div>

                            </div>
                            </div>
          
                   <Sidebar />
                </div>
    )
}
