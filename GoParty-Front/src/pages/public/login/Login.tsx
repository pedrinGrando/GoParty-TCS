import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Componentes/Pages
import { Error } from '../../../components/Error/Error';
import { Loading } from '../../../components/Loading/Loading';
import { NavBar } from '../../../components/NavBar/NavBar';
import { ModalChoose } from '../../../components/modal/ModalChoose';
import { Recaptcha } from '../../../components/recaptcha/Recaptcha';


export default function Login() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [mostrarModalEscolha, setModalEscolha] = useState<boolean>(false);
  const [mensagemModal, setMensagemModal] = useState<string>('');
  const [imagemSrcModal, setImagemSrcModal] = useState<string>('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleCaptchaChange = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  const handleClose = () => setModalEscolha(false);

  const [formData, setFormData] = useState({
    username: '',
    senha: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = () => {
    setModalEscolha(true);
    setMensagemModal('Seja bem vindo ao GoParty, Escolha seu cadastro!');
    setImagemSrcModal('/imagens/choosePic.webp')
  };

  const handleCloseFooter = () => {
    setError(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    if ((formData.username.trim() === "" || formData.senha.trim() === "" || !isCaptchaValid)) {
      setError(true);
      setIsLoading(false);
      setMessage("Preencha todos os campos e resolva o captcha!")
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          senha: formData.senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const sessionUser = data.usuario;
        
        localStorage.setItem('token', token);
        localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
        
        setIsLoading(false);
        navigate('/home');
        console.log('Login efetuado com sucesso!');
        console.log(token);
      } else {
        setIsLoading(false);
        setMessage("Usuário ou senha inválidos!");
        setError(true);
        console.error('Erro ao efetuar o login:', response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Usuário ou senha inválidos!");
      setError(true);
      console.error('Erro ao efetuar o login:', error);
    }
  };


  return (
    <div className='min-h-screen dark:bg-gray-900'>
      {/* Modal de escolha*/}
      <ModalChoose
        mensagem={mensagemModal}
        imagemSrc={imagemSrcModal}
        mostrarModal={mostrarModalEscolha}
        onClose={handleClose}
      />
      <form onSubmit={handleSubmit}>
        <NavBar />
        <div className="bg-white relative lg:py-20 mt-[-1px] dark:bg-gray-900">
          <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
              xl:px-5 lg:flex-row">
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
              <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                  <img
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-duration="0"
                    src="/imagens/enjoyingParty-removebg-preview.png" className="rounded mt-20 lg:mt-0" />
                </div>
              </div>
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                    relative z-10 dark:bg-gray-700">
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif dark:text-white">Entre em sua conta</p>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <label htmlFor='username' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute dark:text-white dark:bg-gray-700">Nome de usuário</label>
                      <input
                        placeholder='Jhon12'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        type="text"
                        className={`backdrop-blur-md border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700`} />
                    </div>
                    <div className="relative">
                      <label htmlFor='senha' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute dark:text-white dark:bg-gray-700">Senha</label>
                      <input
                        placeholder='●●●●●●●●●●●'
                        id='senha'
                        onChange={handleChange}
                        value={formData.senha}
                        name='senha'
                        type={showPassword ? 'text' : 'password'}
                        className="border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700" />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 mb-4 text-gray-600"
                      >
                        {showPassword ? (
                          <img src="/imagens/view.png" alt="" />
                        ) : (
                          <img src="imagens/hide.png" alt="" />
                        )}
                      </button>

                      {/*Leva para a troca de senha */}
                      <Link to='/reset-password-email'>
                        <div className="text-sm ml-auto">
                          <div className="font-semibold text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</div>
                        </div>
                      </Link>

                    </div>
                    <Error
                      error={error}
                      message={message}
                      onClose={handleCloseFooter}
                    />

                    <div className="relative">

                      <button type='submit' className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                          rounded-lg transition duration-200 hover:bg-indigo-600 ease">

                        {isLoading ? (
                          <Loading />
                        ) : (
                          'Entrar'
                        )}
                      </button>
                    </div>
                    <div>
                      <Recaptcha onCaptchaChange={handleCaptchaChange} />
                    </div>

                    {/* AQUI*/}
                    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased dark:text-white">
                      Ainda não possui conta?

                      <button onClick={handleButtonClick} className="font-semibold text-pink-500 transition-colors hover:text-blue-700">
                        Crie a sua rápido e fácil
                      </button>

                    </p>

                    <div className="w-full p-1 text-center ">
                      © 2023 GoParty direitos reservados
                      <a className="text-white" href="https://tw-elements.com/"></a>
                    </div>
                  </div>
                </div>
                <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
                    fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                    cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445"
                      r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441"
                        cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g
                          transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525"
                            r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle
                        cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525"
                          r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261"
                            cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle
                        cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605"
                          r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g
                            transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686"
                              r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle
                        cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686"
                          r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261"
                            cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle
                        cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767"
                          r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g
                            transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846"
                              r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle
                        cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846"
                          r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261"
                            cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle
                        cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926"
                          r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g
                            transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006"
                              r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle
                        cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006"
                          r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
                <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
                    fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                    cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445"
                      r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441"
                        cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g
                          transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525"
                            r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle
                        cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525"
                          r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261"
                            cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle
                        cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605"
                          r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g
                            transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686"
                              r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle
                        cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686"
                          r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261"
                            cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle
                        cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767"
                          r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g
                            transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846"
                              r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle
                        cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846"
                          r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261"
                            cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle
                        cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926"
                          r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g
                            transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006"
                              r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle
                        cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006"
                          r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
