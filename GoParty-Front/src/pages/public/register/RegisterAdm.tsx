import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { RenderIf } from '../../../components/RenderIf/RenderIf';
import InputMask from 'react-input-mask';

//Pages/components
import { Loading } from '../../../components/Loading/Loading';
import { ModalMessage } from '../../../components/modal/ModalMessage';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { Error } from '../../../components/Error/Error';


export default function RegisterAdm () {

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isChecked, setIsChecked] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileMatri, setSelectedFileMatri] = useState<File | null>(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(""); 

    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string>('');
    const [imagemSrcModal, setImagemSrcModal] = useState<string>('');

    const handleClose = () => setMostrarModal(false);

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        estado: '',
        dataPrevista: '',
        metaArrecad: '',
        cep: '',
        cidade: '',
        bairro: '',
        rua: '',
        fotoFormatura: null
      });

      const [errors, setErrors] = useState({
        titulo: false,
        descricao: false,
        estado: false,
        cep: false,
        dataPrevista: false,
        metaArrecad: false,
        cidade: false,
        bairro: false,
        rua: false
     });

      const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
      };

      const handleCloseFooter = () => {
        setError(false); 
      };

      function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){

        if(event.target.files){

          const file = event.target.files[0];
          const maxFileSize = 2 * 1024 * 1024; // 2MB
      
          if (file.size > maxFileSize) {
              setError(true);
              setMessage("Imagem excedeu o limite de 2 MB")
          } else {
            const imageURL = URL.createObjectURL(file)
            setImagePreview(imageURL)
            setSelectedFile(file);
          }
            
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFileMatri(event.target.files[0]); 
      }
    };

      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
      
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
        }

        if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
          buscarEndereco(value);
        }
    };

    //checar endereços por CEP (api ViaCEP)
    const buscarEndereco = async (cep: string) => {
      try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(url);
        if (!response.ok) console.log('Erro ao fazer requisicao CEP');
        const data = await response.json();
    
        if (data.erro) {
          console.error('CEP não encontrado.');
          return;
        }
    
        setFormData(prevState => ({
          ...prevState,
          cep
        }));
    
        const { logradouro, bairro, localidade, uf } = data;
        setFormData(prevState => ({
          ...prevState,
          rua: logradouro,
          bairro: bairro,
          cidade: localidade,
          estado: uf
        }));
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    };
    
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      setIsLoading(true);

       const newErrors = {
        titulo: formData.titulo.trim() === '',
        descricao: formData.descricao.trim() === '',
        estado: formData.estado.trim() === '',
        cidade: formData.cidade.trim() === '',
        rua: formData.rua.trim() === '',
        cep: formData.cep.trim() === '',
        bairro: formData.bairro.trim() === '',
        dataPrevista: formData.dataPrevista.trim() === '',
        metaArrecad: formData.metaArrecad.trim() === '',
    };

    setErrors(newErrors);

    // Verificar se há erros
    if (Object.values(newErrors).some(error => error)) {

      setIsLoading(false)
      return;
  }

      try {
        const responseSerAdm = await fetch(`http://localhost:8081/v1/fomaturas/ser-adm/${user.principal.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const formaturaData = await responseSerAdm.json();
  
        if (responseSerAdm.ok) {
            console.log("Solicitacao criada com sucesso. ID:", formaturaData.id);

            if (selectedFile) {
                const formDataImage = new FormData();
                formDataImage.append('file', selectedFile);

                const responseImage = await fetch(`http://localhost:8081/v1/fomaturas/upload-grad-image/${formaturaData.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formDataImage,
                });

                if (responseImage.ok) {
                    console.log("Imagem do evento enviada com sucesso.");

                    setFormData({
                      titulo: '',
                      descricao: '',
                      estado: '',
                      dataPrevista: '',
                      metaArrecad: '',
                      cep: '',
                      cidade: '',
                      bairro: '',
                      rua: '',
                      fotoFormatura: null
                  });
                  setImagePreview('');
                  setIsLoading(false);
                } else {
                    console.error("Falha ao enviar imagem do evento.");
                    setFormData({
                      titulo: '',
                      descricao: '',
                      estado: '',
                      dataPrevista: '',
                      metaArrecad: '',
                      cep: '',
                      cidade: '',
                      bairro: '',
                      rua: '',
                      fotoFormatura: null
                  });
                  setImagePreview('');
                  setIsLoading(false);
                }
            }
  
            // Limpa o formulário após o envio bem-sucedido
            setFormData({
              titulo: '',
              descricao: '',
              estado: '',
              dataPrevista: '',
              metaArrecad: '',
              cep: '',
              cidade: '',
              bairro: '',
              rua: '',
              fotoFormatura: null
            });
            setImagePreview('');
            setIsLoading(false);
        } else {
            setIsLoading(false);
            console.error("Erro ao criar formatura:", formaturaData.mensagem);
        }
    } catch (error) {
        setIsLoading(false);
        console.error("Erro na requisição:", error);
    }

    };

    return (

   <div>
     
    <form onSubmit={handleSubmit}>
       <div className="bg-white relative lg:py-20">
       
          <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
              xl:px-5 lg:flex-row">
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 mb-20 relative lg:pt-20 lg:flex-row">
              <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                  <img src="/imagens/BEGoPartyADM.webp" className="rounded lg:-mt-60 sm:mb-36 sm:mt-16 mt-36"/>
                </div>
              </div>

              {/* Modal de confirmação*/}
              <ModalMessage
              mensagem={mensagemModal}
              imagemSrc={imagemSrcModal}
              mostrarModal={mostrarModal}
              onClose={handleClose}
             />
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <div 
                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                    relative z-10">
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Preencha para se tornar GoParty ADM</p>
                  <div 
                  className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                   <div className="relative">
                      <label htmlFor='titulo' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Nome para a formatura</label>
                      <input placeholder="Festa de formatura UFSC" 
                              type="text"
                              name='titulo'
                              value={formData.titulo} 
                              id='titulo'
                              onChange={handleChange}
                              className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`}/>
                    </div>

                    <div className="relative">
                      <label htmlFor='descricao' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Descricao para a formatura</label>
                          
                      <textarea 
                      onChange={handleChange}
                      value={formData.descricao}
                      name='descricao'
                      id='descricao'
                      className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" 
                      placeholder="Grupo de arrecadacao para formatura UFS...">

                      </textarea>
                    </div>
                    <div className="relative">
                      <label htmlFor='cep' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">CEP</label>
                      <InputMask
                        placeholder='CEP'
                        mask="99999-999"
                        value={formData.cep}
                        onChange={handleChange}
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                        type="text"
                        name="cep"
                        id="cep"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor='cidade' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Cidade</label>
                      <input placeholder="Florianópolis" 
                              type="text"
                              name='cidade'
                              value={formData.cidade}
                              id='cidade'
                              onChange={handleChange}
                              className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`}/>
                    </div>
                    <div className="relative">
                      <label htmlFor='bairro' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Bairro</label>
                      <input placeholder="Capoeiras" 
                              type="text"
                              name='bairro'
                              value={formData.bairro}
                              id='bairro'
                              onChange={handleChange}
                              className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`}/>
                    </div>
                    <div className="relative">
                      <label htmlFor='rua' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Rua</label>
                      <input placeholder="Rua major costa 291" 
                              type="text"
                              value={formData.rua}
                              name='rua'
                              id='rua'
                              onChange={handleChange}
                              className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`}/>
                    </div>
                    <div></div>
                    <div className="relative">
                      <label htmlFor='metaArrecad' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Meta de Arrecadação
                          </label>
                          <CurrencyInput
                            placeholder="R$ 0,00"
                            id='metaArrecad'
                            name='metaArrecad'
                            value={formData.metaArrecad}
                            onChange={handleChange}
                            className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`}
                        />
                    </div>
                    <div className="relative">
                      <label htmlFor='dataPrevista' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Data Prevista</label>
                            <input 
                            placeholder="Data"
                            id='dataPrevista'
                            name='dataPrevista'
                            value={formData.dataPrevista}
                            onChange={handleChange}
                            type="date" 
                     className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md `}/>
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
                                        <label htmlFor='fotoFormatura' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600'>
                                            
                                            <RenderIf condition={!imagePreview}>
                                                <span>Foto para o evento</span>
                                            </RenderIf>

                                            <RenderIf condition={!!imagePreview}>
                                                <img src={imagePreview} width={250} className='rounded-full' />
                                            </RenderIf>

                                            <input accept="image/*" onChange={onFileUpload} id='fotoFormatura' name='fotoFormatura' type='file' className='sr-only' />
                                        </label>
                                    </div>   
                                </div>
                            </div>

                            {error && (
                                 <Error
                                 error={error}
                                 message={message}
                                 onClose={handleCloseFooter}
                               />
                                )}  

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
                        <Link to='/terms-and-conditions'>
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
                      <button type='submit' 
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
                    Está esperando por aprovação?
                    <button className="font-semibold text-pink-500 transition-colors hover:text-blue-700">
                     ver meus pedidos
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
         <Sidebar/>
        </div>  
        </form>    
      </div>
     )
}
