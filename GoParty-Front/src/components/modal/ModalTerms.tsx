import React from "react";

interface ModalProps {
    mostrarModal: boolean;
    onClose: () => void;
}

export const ModalTerms: React.FC<ModalProps> = ({ mostrarModal, onClose }) => {

    if (!mostrarModal) return null;

    return (
        <div
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="0"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Políticas de Privacidade
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <h1 className="text-3xl font-bold mb-4 dark:text-white">Políticas de Privacidade</h1>
                <p className="mb-4 dark:text-white">
                  Esta política de privacidade define como nosso site usa e protege qualquer informação que você nos fornece quando usa este site.
                </p>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Conformidade com a LGPD</h2>
                <ul className="list-disc list-inside mb-4 dark:text-white">
                  <li>Nosso sistema foi projetado para cumprir a Lei Geral de Proteção de Dados Pessoais (LGPD).</li>
                  <li>Seguimos regras estritas sobre como coletar.</li>
                  <li>E sobre usar e armazenar seus dados.</li>
                </ul>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Transparência</h2>
                <p className="mb-4 dark:text-white">
                  Ao se cadastrar, você será informado sobre quais dados coletamos e como eles serão utilizados. Garantimos clareza para que você sempre saiba quais informações estão sendo coletadas.
                </p>
                <ul className="list-disc list-inside mb-4 dark:text-white">
                  <li>Segurança Avançada</li>
                  <li>Melhorar nossos serviços</li>
                  <li>De tempos em tempos, também poderemos usar suas informações para entrar em contato com você para fins de pesquisa de mercado. Nós podemos
                    contato
                    você por e-mail, telefone ou correio. Podemos usar as informações para personalizar o site de acordo com o seu
                    interesses.
                  </li>
                </ul>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Seus Direitos:</h2>
                <h3 className="text-1xl font-bold mb-2 dark:text-white">Acesso e Controle:</h3>
                <p className="mb-4 dark:text-white">
                  Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Essa flexibilidade permite que você mantenha controle total sobre suas informações pessoais.
                </p>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Uso Apropriado</h2>
                <p className="mb-4 dark:text-white">
                  A responsabilidade pelos eventos cadastrados na plataforma recai sobre os usuários que os criam. Qualquer questão legal ou consequência resultante de eventos é gerida de acordo com as informações fornecidas durante o registro.
                </p>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Integridade de Dados</h2>
                <p className="mb-4 dark:text-white">
                  É crucial que as informações fornecidas sejam verdadeiras e precisas. Caso contrário, medidas apropriadas serão tomadas em conformidade com as leis vigentes.
                  No GoParty, você pode se dedicar totalmente à organização de sua formatura, sabendo que suas informações estão protegidas e que nossa plataforma está comprometida em garantir uma experiência segura e confiável para todos os usuários.
                </p>
                <p className="mb-4 dark:text-white">
                  Esta política de privacidade está sujeita a alterações sem aviso prévio.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }














