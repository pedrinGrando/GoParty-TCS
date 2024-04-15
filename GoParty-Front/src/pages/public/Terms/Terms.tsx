//Componentes/Pages
import { NavBar } from '../../../components/NavBar/NavBar';

export default function Terms(){


    return (
  
        <div>
        <NavBar/>
        <div className="bg-white relative lg:py-20">
          <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
              xl:px-5 lg:flex-row">
            <div 
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-duration="0"
            className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 mb-20 lg:pt-20 lg:flex-row">
              <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              </div>
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <p>
                    EM CONSTRUCAO
                </p>
                <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                    relative z-10">
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Termos e Condicoes </p>
                </div>
              </div>
            </div>
          </div>
         </div>    
        </div>        
        
    )
}