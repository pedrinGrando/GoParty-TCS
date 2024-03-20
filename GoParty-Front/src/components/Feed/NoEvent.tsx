import React from "react";

export const NoEvent: React.FC = () => {
    return (
      <div>
        <section className="bg-center bg-no-repeat rounded-lg bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply py-24 lg:py-40">
            <div className="px-4 mx-auto text-center max-w-xl">
                <h1 className="mb-4 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">Nenhum evento encontrado para você.</h1>
                <p className="mb-6 text-base text-gray-300 lg:text-lg sm:px-6 lg:px-12">Mas não se preocupe, você pode criar seu primeiro próprio evento e atrair o público correto para a busca de fundos necessários. Seja um GoParty Adm agora!</p>
                <div className="flex justify-center">
                    <a href="#" className="inline-flex justify-center items-center py-2 px-4 text-base font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Criar evento
                        <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
       </section>
      </div>
    );
  };