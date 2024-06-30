import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

//Componentes/Pages
import { Error } from '../../../components/Error/Error';
import { ErrorPassword } from '../../../components/Error/ErrorPassWord';
import { Loading } from '../../../components/Loading/Loading';
import { NavBar } from '../../../components/NavBar/NavBar';
import { Recaptcha } from '../../../components/recaptcha/Recaptcha';

export default function RegisterStudent() {

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isCpfInUse, setIsCpfInUse] = useState(false);
  const [message, setMessage] = useState("");
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [senhaNotEqual, setSenhaNotEqual] = useState(false);
  const [isEducational, setIsEducational] = useState(true);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isValidPass, setIsValidPass] = useState(true);
  const [isValidCPF, setIsValidCPF] = useState<boolean>(true);

  const handleCaptchaChange = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

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

  useEffect(() => {
    if (mostrarModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [mostrarModal]);


  const handleCloseFooter = () => {
    setError(false)
  };

  function isEmailEducational(email: string): boolean {
    const educationalDomains = ['.edu', '.edu.br', '@alunos', '@estudante'];
    return educationalDomains.some(domain => email.includes(domain));
  }

  const handleBlurUserName = async () => {

    if (formData.username.trim() === "") {
      setError(true);
      setIsLoading(false);
      setMessage("Preencha todos os campos!")
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/v1/usuarios/check-username?username=${formData.username}`);

      if (response.ok) {
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

    if (formData.email.trim() === "") {
      setError(true);
      setIsLoading(false);
      setMessage("Preencha todos os campos!")
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/v1/usuarios/check-email?email=${formData.email}`);

      if (response.ok) {
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
    dataNasci: false,
    senha: false,
    cpf: false,
    senhaConfirm: false,
    captcha: false
  });

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    username: '',
    dataNasci: '',
    senha: '',
    cpf: '',
    fotoPerfil: null,
    senhaConfirm: '',
  });

  const handleButtonClick = () => {
    navigate('/login');
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    // Validação de CPF
    if (name === 'cpf' && type === 'text') {
      const numericValue = value.replace(/\D/g, '');

      setFormData({
        ...formData,
        [name]: numericValue,
      });

      setIsValidCPF(validateCPF(numericValue));
      if (validateCPF(numericValue)) {
        try {
          const response = await fetch(`http://localhost:8081/v1/usuarios/check-cpf?cpf=${numericValue}`);
          if (!response.ok) {
            console.error('Erro ao verificar o CPF');
          }
          const exists = await response.json();
          setIsCpfInUse(exists);
          setErrors({ ...errors, cpf: exists });
        } catch (error) {
          console.error('Erro ao verificar o CPF:', error);
        }
      } else {
        setIsCpfInUse(false);
        setErrors({ ...errors, cpf: true });
      }
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


      if (name === 'email') {
        setIsEducational(isEmailEducational(value));
      }

      if (name === 'senhaConfirm' && value !== formData.senha) {
        setSenhaNotEqual(true);
      } else {
        setSenhaNotEqual(false);
      }

      if (name === 'senha') {
        setIsValidPass(validatePassword(value));
      }

      if (name === 'idade') {
        const today = new Date();
        const birthDate = new Date(value);

        if (birthDate > today) {
          setErrors({ ...errors, dataNasci: true });
          return;
        } else {
          setErrors({ ...errors, dataNasci: false });
        }

        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          setErrors({ ...errors, dataNasci: age - 1 < 16 });
        } else {
          setErrors({ ...errors, dataNasci: age < 16 });
        }
      }

      if (!isCaptchaValid) {
        setErrors({ ...errors, captcha: true });
      }
    }
  };

  const validateCPF = (inputCPF: string): boolean => {
    const cpf = inputCPF.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (cpf.split('').every(c => c === cpf[0])) return false;

    const calculateCheckDigit = (base: string, factor: number): number => {
      const sum = base
        .split('')
        .reduce((acc, curr, index) => acc + parseInt(curr) * (factor - index), 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calculateCheckDigit(cpf.slice(0, 9), 10);
    const digit2 = calculateCheckDigit(cpf.slice(0, 9) + digit1.toString(), 11);

    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
  };

  const handleSubmit = async (event: any) => {
    console.log(formData);
    event.preventDefault();
    setIsLoading(true);

    const newErrors = {
      nome: formData.nome.trim() === '',
      email: formData.email.trim() === '',
      username: formData.username.trim() === '',
      dataNasci: formData.dataNasci.trim() === '',
      senha: formData.senha.trim() === '',
      cpf: formData.cpf.trim() === '',
      senhaConfirm: formData.senhaConfirm.trim() === '',
      captcha: !isCaptchaValid
    };

    setErrors(newErrors);

    // Verificar se há erros
    if (Object.values(newErrors).some(error => error)) {

      setIsLoading(false)
      setMessage('Preencha todos os campos obrigatórios e resolva o captcha!')
      setError(true)
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/v1/auth/cadastro-usuario-estudante', {
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
          dataNasci: '',
          senha: '',
          cpf: '',
          fotoPerfil: null,
          senhaConfirm: '',
        });

        setIsLoading(false);
        console.log('Formulário enviado com sucesso!');
        navigate('/validate-email');

      } else {
        setIsLoading(false);
        setError(true);
        setMessage('Houve um erro ao enviar o email, tente novamente!');
        console.error('Erro ao enviar formulário:', response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setMessage("" + error);
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <NavBar />
    <div className="bg-white relative lg:py-20 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-duration="0"
          className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 mb-20 lg:pt-20 lg:flex-row"
        >
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                data-aos="fade-down"
                data-aos-delay="50"
                data-aos-duration="0"
                src="/imagens/registerStudent-removebg-preview.png"
                className="rounded lg:-mt-60 sm:mb-36 sm:mt-16 mt-36"
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 dark:bg-gray-700 w-full sm:w-11/12 md:w-3/4 lg:w-full">
              <p className="w-full text-3xl font-medium text-center leading-snug font-serif dark:text-white">
                Cadastre-se como Estudante
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                <div className="relative">
                  <label
                    htmlFor="nome"
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute dark:bg-gray-700 dark:text-white"
                  >
                    Seu nome 
                  </label>
                  <input
                    placeholder="Nome completo"
                    type="text"
                    name="nome"
                    id="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-5 pr-5 pb-5 pl-5 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 ${errors.nome ? 'border-red-500' : ''}`}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute dark:bg-gray-700 dark:text-white"
                  >
                    E-mail 
                  </label>
                  <input
                    placeholder="example@alunos.sc.edu.br"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-5 pr-5 pb-5 pl-5 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 ${errors.email || !isValidEmail || !isEmailUnique ? 'border-red-500' : ''}`}
                  />
                  {!isValidEmail && <p style={{ color: 'red' }}>Por favor, insira um e-mail válido.</p>}
                  {!isEducational && <p style={{ color: 'red' }}>Por favor, insira um e-mail institucional.</p>}
                  {!isEmailUnique && <p style={{ color: 'red' }}>Este e-mail já está cadastrado no GoParty!</p>}
                </div>
                <div className="relative">
                  <label
                    htmlFor="username"
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute dark:bg-gray-700 dark:text-white"
                  >
                    Nome de usuário
                  </label>
                  <input
                    placeholder="jhon12"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlurUserName}
                    type="text"
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-5 pr-5 pb-5 pl-5 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 ${errors.username || !isUsernameUnique ? 'border-red-500' : ''}`}
                  />
                  {!isUsernameUnique && <p style={{ color: 'red' }}>Este username já está em uso no GoParty!</p>}
                </div>
                <div className="relative">
                  <label
                    htmlFor="idade"
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-sm text-gray-600 absolute dark:bg-gray-700 dark:text-white"
                  >
                    Data de Nascimento
                  </label>
                  <input
                    placeholder="Data"
                    id="idade"
                    name="idade"
                    value={formData.dataNasci}
                    onChange={handleChange}
                    type="date"
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-5 pr-5 pb-5 pl-5 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 ${errors.dataNasci ? 'border-red-500' : ''}`}
                  />
                  {errors.dataNasci && (
                    <p style={{ color: 'red' }}>
                      {formData.dataNasci ? 'data de nascimento inválida.' : 'Você deve ter pelo menos 16 anos de idade.'}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="cpf"
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute dark:text-white dark:bg-gray-700"
                  >
                    Seu CPF
                  </label>
                  <MaskedInput
                    mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                    placeholder="Seu CPF"
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-5 pr-5 pb-5 pl-5 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 ${errors.cpf ? 'border-red-500' : ''}`}
                  />
                  {!isValidCPF && <p style={{ color: 'red' }}>O CPF digitado é inválido!</p>}
                  {isCpfInUse && <p style={{ color: 'red' }}>Este CPF já está em uso!</p>}
                </div>
                <div className="relative">
                  <label
                    htmlFor="senha"
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute dark:text-white dark:bg-gray-700"
                  >
                    Crie uma senha
                  </label>
                  <input
                    placeholder="●●●●●●●●●"
                    name="senha"
                    id="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    type="password"
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-5 pr-5 pb-5 pl-5 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 ${errors.senha ? 'border-red-500' : ''}`}
                  />
                  {!isValidPass && <ErrorPassword />}
                </div>
                <div className="relative">
                  <label
                    htmlFor="senhaConfirm"
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute dark:bg-gray-700 dark:text-white"
                  >
                    Confirmar senha
                  </label>
                  <input
                    placeholder="●●●●●●●●●"
                    id="senhaConfirm"
                    name="senhaConfirm"
                    onChange={handleChange}
                    value={formData.senhaConfirm}
                    type={showPassword ? 'text' : 'password'}
                    className={`border placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-500 w-full pt-5 pr-5 pb-5 pl-5 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 ${errors.senha || senhaNotEqual ? 'border-red-500' : ''}`}
                  />
                  {senhaNotEqual && <p style={{ color: 'red' }}>As senhas não coincidem!</p>}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 text-gray-600"
                  >
                    {showPassword ? (
                      <img src="/imagens/view.png" alt="Show Password" />
                    ) : (
                      <img src="imagens/hide.png" alt="Hide Password" />
                    )}
                  </button>
                </div>
                <Error error={error} message={message} onClose={handleCloseFooter} />
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
                  <label className="mt-px cursor-pointer select-none font-light text-gray-700">
                    <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased dark:text-white">
                      Eu concordo com
                      <Link to="/terms-and-conditions">
                        <a
                          className="font-semibold transition-colors hover:text-pink-500"
                          href="#"
                        >
                          &nbsp;Termos e Condições
                        </a>
                      </Link>
                    </p>
                  </label>
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    disabled={
                      !isChecked ||
                      isCpfInUse ||
                      !isValidPass ||
                      errors.dataNasci ||
                      !isValidEmail ||
                      !isEmailUnique ||
                      !isUsernameUnique ||
                      errors.cpf
                    }
                    className="w-full inline-block pt-5 pr-5 pb-5 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                  >
                    {isLoading ? <Loading /> : 'Cadastrar'}
                    </button>
                  </div>
                  <div>
                    <Recaptcha onCaptchaChange={handleCaptchaChange} />
                  </div>

                  {/* AQUI*/}
                  <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased dark:text-white">
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

  )
}