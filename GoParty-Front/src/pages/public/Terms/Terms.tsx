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
      "    Ao se cadastrar na plataforma, os usuários são informados sobre quais dados serão coletados e como serão utilizados. Para os representantes de turma, são solicitadas informações adicionais, como CPF, RG e atestado de matrícula vinculado à instituição de ensino, conforme o disposto no Artigo 7°, incisos I e II, da LGPD. Esses dados são essenciais para validar a identidade e a elegibilidade dos representantes, garantindo a legitimidade das iniciativas de arrecadação de fundos para as festas de formatura.\n\n" +
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
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Segurança e Privacidade no GoParty</h1>
        <p className="mb-2">
          No GoParty, levamos sua privacidade a sério. Estamos comprometidos em proteger suas informações pessoais e garantir sua segurança enquanto você organiza e participa de eventos de formatura em nossa plataforma.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Como Protegemos Seus Dados:</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Conformidade com a LGPD:</strong> Nosso sistema foi projetado para cumprir a Lei Geral de Proteção de Dados Pessoais (LGPD). Isso significa que seguimos regras estritas sobre como coletar, usar e armazenar seus dados.</li>
          <li><strong>Transparência:</strong> Ao se cadastrar, você será informado sobre quais dados coletamos e como eles serão utilizados. Garantimos clareza para que você sempre saiba quais informações estão sendo coletadas.</li>
          <li><strong>Segurança Avançada:</strong> Utilizamos tecnologias de ponta para proteger seus dados armazenados em nossa plataforma, assegurando que apenas informações necessárias sejam coletadas e mantendo-as seguras contra acessos não autorizados.</li>
        </ul>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Seus Direitos:</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Acesso e Controle:</strong> Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Essa flexibilidade permite que você mantenha controle total sobre suas informações pessoais.</li>
        </ul>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Responsabilidade:</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Uso Apropriado:</strong> A responsabilidade pelos eventos cadastrados na plataforma recai sobre os usuários que os criam. Qualquer questão legal ou consequência resultante de eventos é gerida de acordo com as informações fornecidas durante o registro.</li>
          <li><strong>Integridade de Dados:</strong> É crucial que as informações fornecidas sejam verdadeiras e precisas. Caso contrário, medidas apropriadas serão tomadas em conformidade com as leis vigentes.</li>
        </ul>
        <p className="mt-4">
          No GoParty, você pode se dedicar totalmente à organização de sua formatura, sabendo que suas informações estão protegidas e que nossa plataforma está comprometida em garantir uma experiência segura e confiável para todos os usuários.
        </p>
        <div className="flex justify-center mt-6">
          <button onClick={generatePdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Gerar PDF
          </button>
        </div>
      </div>
    </div>
  )
}