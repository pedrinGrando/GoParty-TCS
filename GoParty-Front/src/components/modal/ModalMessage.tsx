import React from "react";

interface ModalProps {
    mensagem: string;
    imagemSrc?: string; 
    mostrarModal: boolean;
    onClose: () => void; 
  }

export const ModalMessage: React.FC<ModalProps> = ({ mensagem, imagemSrc, mostrarModal, onClose }) => {

    if (!mostrarModal) return null;

    return (
        <div 
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="0"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">   
        <div className="relative p-4 w-full max-w-2xl">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex justify-between items-center p-5 border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Solicitação Realizada!
              </h3>
              <button type="button" onClick={onClose} className="text-black bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600">
                {/* Ícone de fechar */}
               X
              </button>
              
            </div>
            <div className="p-6 space-y-6">
              {imagemSrc && <img src={imagemSrc} alt="Modal" className="w-full max-w-xs mx-auto" />}
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {mensagem}
              </p>
            </div>
            {/* Botões e outras ações do modal */}
          </div>
        </div>
      </div>
    )
}






