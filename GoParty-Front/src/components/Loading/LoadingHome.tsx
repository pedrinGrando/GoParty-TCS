import React from "react";

export const LoadingHome: React.FC = () => {
    return (
      
<section className="bg-center bg-no-repeat rounded-lg bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply py-24 lg:py-40">
<div className="px-4 mx-auto text-center max-w-xl">
    <h1 className="mb-4 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">Carregando Eventos para você</h1>
    <div className="flex justify-center">
        <div>
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            />
          </div>
          <div
            className="inline-block h-4 w-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            />
          </div>
        </div>
       
    </div>
   </div>
</section>
    )
}





