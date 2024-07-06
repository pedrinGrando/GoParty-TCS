//Componentes/Pages
import { NavBar } from '../../../components/NavBar/NavBar';
import { jsPDF } from "jspdf";

export default function Terms() {
  const generatePdf = () => {
    const doc: jsPDF = new jsPDF();
    doc.setFontSize(17);
    doc.setFont("arial", "bold");
    doc.text("Políticas de Privacidade", 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont("arial", "normal");

    const text: string = "    Para garantir a segurança e a eficiência do GoParty, o sistema oferecerá uma base sólida e confiável em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD), Lei n° 13.709/2018, que estabelece diretrizes para o tratamento de dados pessoais. Reconhecemos a importância de proteger as informações dos usuários, garantindo assim a confidencialidade e a privacidade de seus dados.\n\n" +
      "    A proteção dos dados pessoais é um aspecto fundamental no mundo digital contemporâneo, especialmente considerando o crescimento das plataformas online e a sensibilidade das informações compartilhadas pelos usuários.\n\n" +
      "    Nesse contexto, o GoParty surge como uma solução para facilitar a organização e financiamento de comemorações de formatura, ao mesmo tempo em que prioriza a segurança e a privacidade dos dados de seus usuários.\n\n" +
      "    Desde a sua concepção, o GoParty tem como premissa o cumprimento das diretrizes estabelecidas pela LGPD, reconhecendo a importância de resguardar a privacidade e a confidencialidade das informações fornecidas pelos usuários. A política de privacidade do GoParty reflete esse compromisso, garantindo transparência no tratamento de dados e implementando medidas robustas de segurança para proteger as informações pessoais dos usuários.\n\n" +
      "    Ao se cadastrar na plataforma, os usuários são informados sobre quais dados serão coletados e como serão utilizados. Para os representantes de turma, são solicitadas informações adicionais como, chave pix (e-mail) para vincular a formatura e e-mail institucional no seu cadastro de estudante, conforme o disposto no Artigo 7°, incisos I e II, da LGPD. Esses dados são essenciais para validar a identidade e a elegibilidade dos representantes, garantindo a legitimidade das iniciativas de arrecadação de fundos para as festas de formatura.\n\n" +
      "    Para todos os usuários, são coletados os dados padrão, como nome, cpf, data de nascimento e e-mail. Essa diferenciação na coleta de dados é uma medida que visa garantir a segurança e a privacidade dos usuários, evitando o compartilhamento desnecessário de informações.\n\n" +
      "    Além disso, a política de privacidade do GoParty é clara ao estabelecer que a responsabilidade pelos eventos cadastrados na plataforma recai sobre os usuários que os criam. Qualquer consequência resultante desses eventos é atribuída aos usuários cadastrados, conforme as informações fornecidas por eles no momento do registro. Essa abordagem está em conformidade com o Artigo 42 da LGPD, que confere aos controladores e/ou operadores de dados a responsabilidade pela segurança e proteção das informações pessoais sob sua guarda. É importante destacar que, caso seja identificada a inserção de dados falsos, as sanções pertinentes serão aplicadas ao usuário responsável pela falsificação ou pela inserção de informações incongruentes.\n\n" +
      "    Para garantir a segurança e a integridade dos dados armazenados na plataforma, o GoParty implementa tecnologias avançadas e medidas de segurança, conforme exigido pelo Artigo 46° da LGPD. Além disso, os usuários têm o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento, conforme previsto pelo Artigo 18° da LGPD.\n\n" +
      "    Em resumo, as políticas de privacidade do GoParty representam um compromisso firme com a proteção dos dados pessoais dos usuários, garantindo transparência, segurança e privacidade em todas as interações na plataforma. Ao adotar uma abordagem proativa em conformidade com as diretrizes da LGPD, o GoParty reafirma seu compromisso em oferecer uma experiência confiável e segura para todos os seus usuários.";

    doc.text(text, 25, 30, { maxWidth: 160, align: "justify" });
    doc.save("Politicas-de-Privacidade-GoParty.pdf");
  };
  return (
    <div>
      <NavBar />
      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Politicas de Privacidade</h1>

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
              interesses.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-2 dark:text-white">Seus Direitos:</h2>
          <h3 className='text-1xl font-bold mb-2 dark:text-white'>Acesso e Controle:</h3>
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
          <div className="flex justify-center mt-6 dark:text-white">
            <button title='Baixar PDF' onClick={generatePdf} className="text-white font-bold py-2 px-4 rounded">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}