import React from "react";

interface ModalProps {
  mostrarModal: boolean;
  onClose: () => void;
}

export const SucessLogin: React.FC<ModalProps> = ({ mostrarModal, onClose }) => {

  if (!mostrarModal) return null;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="0"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative bg-green-100 rounded-lg shadow-lg">

          <div className="flex justify-between items-center p-5 border-b border-green-300">
            <h3 className="text-xl font-semibold text-green-900">
              Cadastro realizado com sucesso.
            </h3>
            <button type="button" onClick={onClose} className="text-green-900 bg-transparent hover:bg-green-200 rounded-lg text-sm p-1.5">
              {/* Ícone de fechar */}
              X
            </button>
          </div>

          <div className="p-6 text-green-800">
            Realize o login para acessar o GoParty!
          </div>
        </div>
      </div>
    </div>
  );
}
