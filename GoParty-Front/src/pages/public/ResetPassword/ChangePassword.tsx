import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Loading } from "../../../components/Loading/Loading";
import { NavBar } from "../../../components/NavBar/NavBar";
import { ErrorPassword } from "../../../components/Error/ErrorPassWord";

export default function ChangePassword () {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [senhaNotEqual, setSenhaNotEqual] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [errors, setErrors] = useState({
        senha: false,
        senhaConfirm: false,
        senhaRegras: false,
     });
  
        const [formData, setFormData] = useState({
          senha: '',
          senhaConfirm: '',
          senhaRegras: '',
        });

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
       
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
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
      };

      const handleButtonClick = () => {
        navigate('/register')
      }
  
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
    
        if (formData.senha.trim() === "" ) {
            setError(true);
            setIsLoading(false);
            setMessage("Preencha todos os campos!")
            return;
        } else if(formData.senhaConfirm.trim() === "") {
            setError(true);
            setIsLoading(false);
            setMessage("Preencha todos os campos!")
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8081/v1/auth/change-password?senha=${encodeURIComponent(formData.senha)}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            });
    
            if (response.ok) {
                navigate('/login');
                setIsLoading(false);
                console.log('Senha alterada com sucesso!');
            } else {
                setIsLoading(false);
                setMessage("Erro ao alterar senha!");
                setError(true);
                console.error('Erro ao alterar senha:', response.statusText);
            }
        } catch (error) {
            setIsLoading(false);
            setMessage("Erro ao alterar senha!");
            setError(true);
            console.error('Erro ao alterar senha:', error);
        }
    };

    return (

    <div>


  <form onSubmit={handleSubmit} className='bg-white'>
     <NavBar/>
     <div className="bg-white relative lg:py-20 mt-[-1px]">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
          xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
            <img
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="0"
             src="/imagens/trocaSenhaTela1.webp" className="rounded mt-20 lg:mt-0"/>
            
            </div>
          </div>
          <div 
           data-aos="fade-left"
           data-aos-delay="60"
           data-aos-duration="0"
          className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Recuperação de senha</p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
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
                <div className="relative">

                  <button type='submit' className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                      rounded-lg transition duration-200 hover:bg-indigo-600 ease">
                     
                     {isLoading ? (
                         <Loading/>
                    ) : (
                      'Verificar'
                    )}
                      </button>
                </div>

                {/* AQUI*/}
                <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Ainda não possui conta? 
                <span className="ml-1"></span> 
    
                <button onClick={handleButtonClick} className="font-semibold text-pink-500 transition-colors hover:text-blue-700">
                  Crie a sua rápido e fácil
               </button>
               
               </p>

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
  </form>  
         </div>
    )
}
