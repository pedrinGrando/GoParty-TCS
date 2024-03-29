import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { RenderIf } from '../../../components/RenderIf/RenderIf';

//Componentes/Pages
import { Error } from '../../../components/Error/Error';
import { ErrorPassword } from '../../../components/Error/ErrorPassWord';
import { Footer } from '../../../components/Footer/Footer';
import { Loading } from '../../../components/Loading/Loading';
import { NavBar } from '../../../components/NavBar/NavBar';

export default function Register(){

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [message, setMessage] = useState(""); 
    const [isEmailUnique, setIsEmailUnique] = useState(true);
    const [isUsernameUnique, setIsUsernameUnique] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [senhaNotEqual, setSenhaNotEqual] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
    };

    const validatePassword = (password: string) => {
      // Verifica se a senha tem entre 8 e 15 caracteres
      if (password.length < 8 || password.length > 15) {
          return false;
      }
      
      // Verifica se a senha contém pelo menos um caractere especial e um numérico
      const regexSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      const regexNumeric = /[0-9]+/;
      
      if (!regexSpecialChar.test(password) || !regexNumeric.test(password)) {
          return false;
      }
      
      return true;
    };

    const handleCloseFooter = () => {
      setError(false); 
    };
    
    const validateEmail = (email: string): boolean => {
      // Expressão regular para verificar se o e-mail é válido
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleBlurUserName = async () => {

      if (formData.username.trim() === "") {
        setError(true);
        setIsLoading(false);
        setMessage("Preencha todos os campos!")
        return;
      }

      try {
        const response = await fetch(`http://localhost:8081/v1/usuarios/check-username?username=${formData.username}`);

        if (response.ok){
          setIsUsernameUnique(false)
          console.log(response)
        } else {
          setIsUsernameUnique(true)
          console.log(response)
        }
        
      } catch (error) {
          console.error('Error checking username uniqueness:', error);
          setIsUsernameUnique(false);
      }
    }

    const handleBlur = async () => {
      setIsLoading(false);
      setIsValidEmail(validateEmail(formData.email));

      if (formData.email.trim() === "") {
        setError(true);
        setIsLoading(false);
        setMessage("Preencha todos os campos!")
        return;
      }

      try {
        const response = await fetch(`http://localhost:8081/v1/usuarios/check-email?email=${formData.email}`);

        if (response.ok){
          setIsEmailUnique(false)
          console.log(response)
        } else {
          setIsEmailUnique(true)
          console.log(response)
        }
        
    } catch (error) {
        console.error('Error checking email uniqueness:', error);
        setIsEmailUnique(false);
    }
      return;
  };

    const [errors, setErrors] = useState({
      nome: false,
      email: false,
      username: false,
      idade: false,
      senha: false,
      cpf: false,
      senhaConfirm: false,
      senhaRegras: false
   });

      const [formData, setFormData] = useState({
        nome: '',
        email: '',
        username: '',
        idade: '',
        senha: '',
        cpf: '',
        fotoPerfil: null,
        senhaConfirm: '',
        senhaRegras: '',
      });

      const handleButtonClick = () => {
        navigate('/login');
      };

      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;

        if (name === 'cpf' && type === 'text') {
          const numericValue = value.replace(/\D/g, '');
          
          setFormData({
              ...formData,
              [name]: numericValue,
          });

        }
      
          if (type === 'file' && event.target instanceof HTMLInputElement) {
              const file = event.target.files && event.target.files[0];
              if (file) {
                  const blob = new Blob([file], { type: file.type });
                  setFormData({
                      ...formData,
                      [name]: blob,
                  });
              }
          } else {
              setFormData({
                  ...formData,
                  [name]: value,
              });

              if (name === 'senhaConfirm' && value !== formData.senha) {
                setSenhaNotEqual(true);
            } else {
              setSenhaNotEqual(false);
            }

            if (name === 'senha') {
              const isValidPassword = validatePassword(value);
              setErrors({
                  ...errors,
                  senha: !isValidPassword
              });
          }

            if (name === 'idade') {
                // calcula a idade com base na data de nascimento fornecida
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    setErrors({ ...errors, idade: age - 1 < 16 });
                } else {
                    setErrors({ ...errors, idade: age < 16 });
                }
            }
        }
    };
      
      const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

         const newErrors = {
          nome: formData.nome.trim() === '',
          email: formData.email.trim() === '',
          username: formData.username.trim() === '',
          idade: formData.idade.trim() === '',
          senha: formData.senha.trim() === '',
          cpf: formData.senha.trim() === '',
          senhaConfirm: formData.senhaConfirm.trim() === '',
          senhaRegras: formData.senhaConfirm.trim() === ''
      };

      setErrors(newErrors);

      // Verificar se há erros
      if (Object.values(newErrors).some(error => error)) {

        setIsLoading(false)
        setMessage('Preencha todos os campos obrigatórios!')
        setError(true)
        return;
     }

        try {
          const response = await fetch('http://localhost:8081/v1/usuarios/cadastro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });


          
          if (response.ok) {
            // Limpar o formulário após o envio bem-sucedido, se necessário
            setFormData({
              nome: '',
              email: '',
              username: '',
              idade: '',
              senha: '',
              cpf: '',
              fotoPerfil: null,
              senhaConfirm: '',
              senhaRegras: ''
            });

            setIsLoading(false);
            setImagePreview('');
            console.log('Formulário enviado com sucesso!');
            navigate('/home');

          } else {
            setIsLoading(false);
            setError(true);
            setMessage('Alguns dados digitados são inválidos!');
            console.error('Erro ao enviar formulário:', response.statusText);
          }
        } catch (error) {
          setIsLoading(false);
          setError(true);
          setMessage(""+error);
          console.error('Erro ao enviar formulário:', error);
        }
      };

      const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            const file = event.target.files[0]
            const imageURL = URL.createObjectURL(file)
            const fileData = new FormData();
            fileData.append('file', file);
            setImagePreview(imageURL)

            try {
             const response =  await fetch('http://localhost:8081/v1/usuarios/imagem-perfil/uploads', {
                  method: 'POST',
                  body: fileData,
              });

              if(response.ok){
                console.log('File uploaded successfully.');
              }
              
          } catch (error) {
              console.error('Failed to upload file.');
          }
      }
        }

    return (
      <form onSubmit={handleSubmit}>
        <NavBar/>
        <div className="bg-white relative lg:py-20">
          <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
              xl:px-5 lg:flex-row">
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 mb-20 lg:pt-20 lg:flex-row">
              <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                  <img src="/imagens/Foto 2.png" className="rounded btn- mb-[500px]"/>
                </div>
              </div>
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                    relative z-10">
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Crie uma nova conta</p>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <label htmlFor='nome' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Seu nome completo</label>
                      <input placeholder="John" 
                              type="text"
                              name='nome'
                              id='nome'
                              value={formData.nome}
                              onChange={handleChange}
                              className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${errors.nome ? 'border-red-500' : ''}`}/>
                    </div>
                    <div className="relative">
                      <label htmlFor='email' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">E-mail</label>
                            <input 
                            placeholder="Seu E-mail"
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            type="text" 
                      className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${errors.email
                    || !isValidEmail || !isEmailUnique  ? 'border-red-500' : ''}`}/>
                   {!isValidEmail && <p style={{ color: 'red' }}>Por favor, insira um e-mail válido.</p>}
                   {!isEmailUnique && <p style={{ color: 'red' }}>Este e-mail já está cadastrado no GoParty!</p>}
                    </div>
                    <div className="relative">
                      <label htmlFor='username' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Username</label>
                            <input 
                            placeholder="Username"
                            id='username'
                            name='username'
                            onBlur={handleBlurUserName}
                            value={formData.username}
                            onChange={handleChange}
                            type="text" 
                      className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${errors.username || !isUsernameUnique ? 'border-red-500' : ''}`}/>
                      {!isUsernameUnique && <p style={{ color: 'red' }}>Este username já está em uso no GoParty!</p>}
                    </div>
                    <div className="relative">
                      <label htmlFor='idade' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Data de Nascimento</label>
                            <input 
                            placeholder="Data"
                            id='idade'
                            name='idade'
                            value={formData.idade}
                            onChange={handleChange}
                            type="date" 
                     className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${errors.idade
                    ? 'border-red-500' : ''}`}/>
                   {errors.idade && <p style={{ color: 'red' }}>Você deve ter pelo menos 16 anos de idade.</p>}

                  </div>

                  <div className="relative">
                        <label htmlFor='cpf' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Seu CPF</label>
                        <MaskedInput
                          mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                          placeholder="Digite seu CPF"
                          id='cpf'
                          name='cpf'
                          value={formData.cpf}
                          onChange={handleChange}
                          className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${errors.cpf ? 'border-red-500' : ''}`}
                        />
                      </div>
                   <div className="relative">
                      <label htmlFor='senha' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Crie uma senha</label>
                            <input 
                              placeholder="Password"
                              name='senha'
                              id='senha'
                              value={formData.senha}
                              onChange={handleChange}
                              type='password'
                     className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${errors.senha || errors.senhaRegras ? 'border-red-500' : ''}`}/>
                  
                  {errors.senha && (
                        <ErrorPassword />
                   )}


                    </div>
                    <div className="relative">
                      <label htmlFor='senhaConfirm' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Confirmar senha</label>
                            <input placeholder="Password"
                            id='senhaConfirm'
                            name='senhaConfirm'
                            onChange={handleChange}
                            value={formData.senhaConfirm}
                            type={showPassword ? 'text' : 'password'}
                      className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${errors.senha || senhaNotEqual ? 'border-red-500' : ''}`}/>
                 {senhaNotEqual && <p style={{ color: 'red' }}>As senhas não coincidem!</p>}
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 text-gray-600"
                >
                    {showPassword ? (
                       <img src="/imagens/view.png" alt="" />
                    ) : (
                        <img src="imagens/hide.png" alt="" />
                    )}
                </button>
                    </div>
                    <div className='mt-0 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                                <div className='text-center'>

                                    <RenderIf condition={!imagePreview}>
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" 
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" 
                                                clipRule="evenodd" />
                                        </svg>
                                    </RenderIf>
                                    <div className='mt-2 flex text-sm leading-6 text-gray-600'>
                                        <label htmlFor='fotoPerfil' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600'>
                                            
                                            <RenderIf condition={!imagePreview}>
                                                <span>Foto de Perfil</span>
                                            </RenderIf>

                                            <RenderIf condition={!!imagePreview}>
                                                <img src={imagePreview} width={250} className='rounded-full' />
                                            </RenderIf>

                                            <input accept="image/*" onChange={onFileUpload} id='fotoPerfil' name='fotoPerfil' type='file' className='sr-only' />
                                        </label>
                                    </div>   
                                </div>
                            </div>
                            <Error
                              error={error}
                              message={message}
                              onClose={handleCloseFooter}
                            />

                            <div className="inline-flex items-center">
                    <label
                    className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                    data-ripple-dark="true"
                    >
                    <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        id="checkbox"
                        onChange={handleCheckboxChange}
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                        >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                        </svg>
                    </span>
                    </label>
                    <label
                    className="mt-px cursor-pointer select-none font-light text-gray-700"
                    >
                    <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                        Eu concordo com 
                        <a
                        className="font-semibold transition-colors hover:text-pink-500"
                        href="#"
                        >
                        &nbsp;Termos e Condições
                        </a>
                    </p>
                    </label>
                </div>
                    <div className="relative">
                      <button type='submit' 
                      disabled={!isChecked || errors.idade || !isValidEmail || !isEmailUnique || !isUsernameUnique}
                      className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                          rounded-lg transition duration-200 hover:bg-indigo-600 ease">
                           {isLoading ? (
                             <Loading/>
                            ) : (
                              'Cadastrar'
                            )}
                          </button>
                    </div>

                    {/* AQUI*/}
                    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                    Já possui conta?
                    <button onClick={handleButtonClick} className="font-semibold text-pink-500 transition-colors hover:text-blue-700">
                     Faça o login 
                   </button>
                   </p>

                    {/*AQUI*/}
                    <div className="w-full p-1 text-center">
                         © 2023 GoParty direitos reservados
                        <a className="text-white" href="https://tw-elements.com/"></a>
                    </div>
                   
                  </div>
                </div>
                <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
                    fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                    cx="3.261" cy="3.445" r="2.72"/><circle cx="15.296" cy="3.445" r="2.719"/><circle cx="27.333" cy="3.445"
                    r="2.72"/><circle cx="39.369" cy="3.445" r="2.72"/><circle cx="51.405" cy="3.445" r="2.72"/><circle cx="63.441"
                    cy="3.445" r="2.72"/><circle cx="75.479" cy="3.445" r="2.72"/><circle cx="87.514" cy="3.445" r="2.719"/></g><g
                    transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72"/><circle cx="15.296" cy="3.525"
                    r="2.719"/><circle cx="27.333" cy="3.525" r="2.72"/><circle cx="39.369" cy="3.525" r="2.72"/><circle
                    cx="51.405" cy="3.525" r="2.72"/><circle cx="63.441" cy="3.525" r="2.72"/><circle cx="75.479" cy="3.525"
                    r="2.72"/><circle cx="87.514" cy="3.525" r="2.719"/></g><g transform="translate(0 24)"><circle cx="3.261"
                    cy="3.605" r="2.72"/><circle cx="15.296" cy="3.605" r="2.719"/><circle cx="27.333" cy="3.605" r="2.72"/><circle
                    cx="39.369" cy="3.605" r="2.72"/><circle cx="51.405" cy="3.605" r="2.72"/><circle cx="63.441" cy="3.605"
                    r="2.72"/><circle cx="75.479" cy="3.605" r="2.72"/><circle cx="87.514" cy="3.605" r="2.719"/></g><g
                    transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72"/><circle cx="15.296" cy="3.686"
                    r="2.719"/><circle cx="27.333" cy="3.686" r="2.72"/><circle cx="39.369" cy="3.686" r="2.72"/><circle
                    cx="51.405" cy="3.686" r="2.72"/><circle cx="63.441" cy="3.686" r="2.72"/><circle cx="75.479" cy="3.686"
                    r="2.72"/><circle cx="87.514" cy="3.686" r="2.719"/></g><g transform="translate(0 49)"><circle cx="3.261"
                    cy="2.767" r="2.72"/><circle cx="15.296" cy="2.767" r="2.719"/><circle cx="27.333" cy="2.767" r="2.72"/><circle
                    cx="39.369" cy="2.767" r="2.72"/><circle cx="51.405" cy="2.767" r="2.72"/><circle cx="63.441" cy="2.767"
                    r="2.72"/><circle cx="75.479" cy="2.767" r="2.72"/><circle cx="87.514" cy="2.767" r="2.719"/></g><g
                    transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72"/><circle cx="15.296" cy="2.846"
                    r="2.719"/><circle cx="27.333" cy="2.846" r="2.72"/><circle cx="39.369" cy="2.846" r="2.72"/><circle
                    cx="51.405" cy="2.846" r="2.72"/><circle cx="63.441" cy="2.846" r="2.72"/><circle cx="75.479" cy="2.846"
                    r="2.72"/><circle cx="87.514" cy="2.846" r="2.719"/></g><g transform="translate(0 73)"><circle cx="3.261"
                    cy="2.926" r="2.72"/><circle cx="15.296" cy="2.926" r="2.719"/><circle cx="27.333" cy="2.926" r="2.72"/><circle
                    cx="39.369" cy="2.926" r="2.72"/><circle cx="51.405" cy="2.926" r="2.72"/><circle cx="63.441" cy="2.926"
                    r="2.72"/><circle cx="75.479" cy="2.926" r="2.72"/><circle cx="87.514" cy="2.926" r="2.719"/></g><g
                    transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72"/><circle cx="15.296" cy="3.006"
                    r="2.719"/><circle cx="27.333" cy="3.006" r="2.72"/><circle cx="39.369" cy="3.006" r="2.72"/><circle
                    cx="51.405" cy="3.006" r="2.72"/><circle cx="63.441" cy="3.006" r="2.72"/><circle cx="75.479" cy="3.006"
                    r="2.72"/><circle cx="87.514" cy="3.006" r="2.719"/></g></g></g></g></svg>
                <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
                    fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                    cx="3.261" cy="3.445" r="2.72"/><circle cx="15.296" cy="3.445" r="2.719"/><circle cx="27.333" cy="3.445"
                    r="2.72"/><circle cx="39.369" cy="3.445" r="2.72"/><circle cx="51.405" cy="3.445" r="2.72"/><circle cx="63.441"
                    cy="3.445" r="2.72"/><circle cx="75.479" cy="3.445" r="2.72"/><circle cx="87.514" cy="3.445" r="2.719"/></g><g
                    transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72"/><circle cx="15.296" cy="3.525"
                    r="2.719"/><circle cx="27.333" cy="3.525" r="2.72"/><circle cx="39.369" cy="3.525" r="2.72"/><circle
                    cx="51.405" cy="3.525" r="2.72"/><circle cx="63.441" cy="3.525" r="2.72"/><circle cx="75.479" cy="3.525"
                    r="2.72"/><circle cx="87.514" cy="3.525" r="2.719"/></g><g transform="translate(0 24)"><circle cx="3.261"
                    cy="3.605" r="2.72"/><circle cx="15.296" cy="3.605" r="2.719"/><circle cx="27.333" cy="3.605" r="2.72"/><circle
                    cx="39.369" cy="3.605" r="2.72"/><circle cx="51.405" cy="3.605" r="2.72"/><circle cx="63.441" cy="3.605"
                    r="2.72"/><circle cx="75.479" cy="3.605" r="2.72"/><circle cx="87.514" cy="3.605" r="2.719"/></g><g
                    transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72"/><circle cx="15.296" cy="3.686"
                    r="2.719"/><circle cx="27.333" cy="3.686" r="2.72"/><circle cx="39.369" cy="3.686" r="2.72"/><circle
                    cx="51.405" cy="3.686" r="2.72"/><circle cx="63.441" cy="3.686" r="2.72"/><circle cx="75.479" cy="3.686"
                    r="2.72"/><circle cx="87.514" cy="3.686" r="2.719"/></g><g transform="translate(0 49)"><circle cx="3.261"
                    cy="2.767" r="2.72"/><circle cx="15.296" cy="2.767" r="2.719"/><circle cx="27.333" cy="2.767" r="2.72"/><circle
                    cx="39.369" cy="2.767" r="2.72"/><circle cx="51.405" cy="2.767" r="2.72"/><circle cx="63.441" cy="2.767"
                    r="2.72"/><circle cx="75.479" cy="2.767" r="2.72"/><circle cx="87.514" cy="2.767" r="2.719"/></g><g
                    transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72"/><circle cx="15.296" cy="2.846"
                    r="2.719"/><circle cx="27.333" cy="2.846" r="2.72"/><circle cx="39.369" cy="2.846" r="2.72"/><circle
                    cx="51.405" cy="2.846" r="2.72"/><circle cx="63.441" cy="2.846" r="2.72"/><circle cx="75.479" cy="2.846"
                    r="2.72"/><circle cx="87.514" cy="2.846" r="2.719"/></g><g transform="translate(0 73)"><circle cx="3.261"
                    cy="2.926" r="2.72"/><circle cx="15.296" cy="2.926" r="2.719"/><circle cx="27.333" cy="2.926" r="2.72"/><circle
                    cx="39.369" cy="2.926" r="2.72"/><circle cx="51.405" cy="2.926" r="2.72"/><circle cx="63.441" cy="2.926"
                    r="2.72"/><circle cx="75.479" cy="2.926" r="2.72"/><circle cx="87.514" cy="2.926" r="2.719"/></g><g
                    transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72"/><circle cx="15.296" cy="3.006"
                    r="2.719"/><circle cx="27.333" cy="3.006" r="2.72"/><circle cx="39.369" cy="3.006" r="2.72"/><circle
                    cx="51.405" cy="3.006" r="2.72"/><circle cx="63.441" cy="3.006" r="2.72"/><circle cx="75.479" cy="3.006"
                    r="2.72"/><circle cx="87.514" cy="3.006" r="2.719"/></g></g></g></g></svg>
              </div>
            </div>
          </div>
        </div>            
        
        {/* Div de Tela Propaganda */}
        <div className="bg-indigo-500 py-8 flex items-center justify-center rounded">
              
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
               <a href="#">
                   <img className="rounded-t-lg" src="/imagens/LoginLaranja.png" alt="" />
               </a>
               <div className="p-5">
                   <a href="#">
                       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Por quê utilizar a plataforma GoParty?</h5>
                   </a>
                   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">O GoParty é uma nova ferramenta de organização, divulgação e planejamento para seus eventos, que busca trazer além de mais controle, engajamento para seus eventos públicos e privados.</p>
                   <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                       Saber mais
                       <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                       </svg>
                   </a>
               </div>
           </div>

               </div>
               <div className="bg-pink-500 py-8 flex items-center justify-center">

           <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
               <a href="#">
                   <img className="rounded-t-lg" src="/imagens/LoginAzul.png" alt="" />
               </a>
               <div className="p-5">
                   <a href="#">
                       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Segurança de Ponta a Ponta.</h5>
                   </a>
                   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">O GoParty possui uma tecnologia aprovada que busca a segurança total de seus eventos.</p>
                   <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                       Read more
                       <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                       </svg>
                   </a>
               </div>
           </div>
        </div>
        <Footer/>
     </form>
        
    )
}