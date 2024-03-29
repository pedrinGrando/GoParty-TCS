import { Sidebar } from "../../../components/sidebar/Sidebar";
import { useUser } from "../../../components/UserContext/UserContext";

export default function Profile () {
   
    const { user } = useUser();

    return (
        <div>
        <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                <img alt="..." src={`http://localhost:8081/${user?.fotoCaminho}`} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Eventos Criados</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Ingressos adquiridos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">Curtidas</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  @{user?.username}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  Florianópolis, Santa Catarina
                </div>
                <div className="mb-2 text-green-600 mt-10">
                  GoParty {user?.tipoUsuario}
                </div>

                   <div className="flex items-center mb-2 text-blueGray-600 mt-10">
                    <img src="/imagens/id-card.png" className="mr-2" alt="id-card"></img>
                    <span>{user?.nome}</span>
                    </div>
                    <div className="flex items-center mb-2 text-blueGray-600">
                    <img src="/imagens/envelopes (1).png" className="mr-2" alt="envelopes"></img>
                    <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center mb-2 text-blueGray-600">
                    <img src="/imagens/calendar-lines.png" className="mr-2" alt="calendar-lines"></img>
                    <span>{user?.email}</span>
                    </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                    <button>
                        <img src="/imagens/user-pen.png" alt="" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        </section>
          
                   <Sidebar />
                   </div>
               
    )
}
