
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../../components/sidebar/Sidebar';
import { Loading } from '../../../components/Loading/Loading';
import { Error } from '../../../components/Error/Error';
import { RenderIf } from '../../../components/RenderIf/RenderIf';
import CurrencyInput from 'react-currency-input-field';
import { ModalMessage } from '../../../components/modal/ModalMessage';
import ReactInputMask from 'react-input-mask';
import { ToastContainer } from '../../../components/modal/ToastContainer';
import { ToastType } from '../../../components/modal/ToastType';
import { format, parseISO } from 'date-fns';
import { setIsInitial } from '@material-tailwind/react/components/Tabs/TabsContext';

const EventUpdate: React.FC = () => {

    interface EventoDTO {
        id: number;
        titulo: string;
        descricao: string;
        eventoCaminho: string;
        cidade: string;
        estado: string;
        rua: string;
        bairro: string;
        dataEvento: string;
        valor: number;
        nomeUsuario?: string;
    }

    const { eventId } = useParams();
    const [evento, setEvento] = useState<EventoDTO>();

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [toastType, setToastType] = useState<ToastType>("error");
    const [message, setMessage] = useState("");
    const [formattedTime, setFormattedTime] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const navigate = useNavigate();

    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string>('');
    const [imagemSrcModal, setImagemSrcModal] = useState<string>('');

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const closeToast = () => {
        setIsVisible(false);
    }

    const handleClose = () => setMostrarModal(false);

    const handleCloseFooter = () => {
        setError(false);
    };

    useEffect(() => {
        const fetchEvento = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:8081/v1/eventos/buscar-evento/${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    console.log("Erro na requisicao")
                }

                const data: EventoDTO = await response.json();
                console.log("Evento consultado")
                setEvento(data);
            } catch (e) {

            } finally {
                setIsLoading(false);
            }
        };

        fetchEvento();
    }, [eventId]);

    useEffect(() => {
        if (evento?.dataEvento) {
          const [datePart, timePart] = evento.dataEvento.split('T');
          setFormattedDate(datePart);
          setFormattedTime(timePart.slice(0, 5)); 
        }
      }, [evento]);

    const [errors, setErrors] = useState({
        titulo: false,
        descricao: false,
        estado: false,
        cep: false,
        dataPrevista: false,
        valor: false,
        cidade: false,
        bairro: false,
        rua: false
    });


    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {

        if (event.target.files) {

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
    
        try {
          const responseEvento = await fetch(`http://localhost:8081/v1/eventos/atualizar-evento/${evento?.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(evento),
          });
    
          const eventData = await responseEvento.json();
    
          if (responseEvento.ok) {
            console.log("Evento atualizado com sucesso:", eventData.id);
            setMessage("Evento atualizado com sucesso!");
            setToastType("success");
            setIsVisible(true);
    
            if (selectedFile) {
              const formDataImage = new FormData();
              formDataImage.append('file', selectedFile);
    
              const responseImage = await fetch(`http://localhost:8081/v1/eventos/upload-event-image/${eventData.id}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formDataImage,
              });
    
              if (responseImage.ok) {
                console.log("Imagem do evento enviada com sucesso.");
                setMessage("Evento atualizado com sucesso!");
                setToastType('success');
                setIsVisible(true);
              } else {
                console.error("Falha ao enviar imagem do evento.");
                setMessage("Erro ao atualizar evento!");
                setToastType('error');
                setIsVisible(true);
              }
            }
          } else {
            console.error("Erro ao atualizar evento:", eventData.mensagem);
            setMessage("Erro ao atualizar evento!");
            setToastType('error');
            setIsVisible(true);
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
          setMessage("Houve um erro ao atualizar o evento!");
          setToastType('error');
          setIsVisible(true);
        } finally {
          setIsLoading(false);
        }
      };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEvento(prev => ({
          ...prev!,
          [name]: value,
          dataEvento: `${value}T${formattedTime}`,
        }));
        setFormattedDate(value);
      };
    
      const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEvento(prev => ({
          ...prev!,
          [name]: value,
          dataEvento: `${formattedDate}T${value}`,
        }));
        setFormattedTime(value);
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        setEvento(prev => ({ ...prev!, [name]: value }));

        if (type === 'file' && event.target instanceof HTMLInputElement) {
            const file = event.target.files && event.target.files[0];
        } else {
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
            if (!response.ok) console.log('Erro ao fazer requisicao viaCEP');
            const data = await response.json();

            if (data.erro) {
                console.error('CEP não encontrado.');
                return;
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    return (
        <div>
            <ToastContainer
                message={message}
                onClose={closeToast}
                isVisible={isVisible}
                type={toastType}
            />
            <form onSubmit={handleSubmit}>
                <div className="bg-white relative lg:py-20">
                    <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
              xl:px-5 lg:flex-row">
                        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 mb-20 relative lg:pt-20 lg:flex-row">
                            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                                <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                                    <img src="/imagens/PostEvento.webp" className="rounded lg:-mt-60 sm:mb-36 sm:mt-16 mt-36" />
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
                                <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                    relative z-10">
                                    <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Atualize seu evento</p>
                                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                        <div className="relative">
                                            <label htmlFor='titulo' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Título do evento</label>
                                            <input placeholder="Festa universitária"
                                                type="text"
                                                name='titulo'
                                                value={evento?.titulo}
                                                id='titulo'
                                                onChange={handleChange}
                                                className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`} />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor='descricao' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Descricao para a formatura</label>

                                            <textarea
                                                onChange={handleChange}
                                                value={evento?.descricao}
                                                name='descricao'
                                                id='descricao'
                                                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                                                placeholder="Grupo de arrecadacao para formatura UFS...">

                                            </textarea>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor='cidade' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Cidade</label>
                                            <input placeholder="Florianópolis"
                                                type="text"
                                                name='cidade'
                                                value={evento?.cidade}
                                                id='cidade'
                                                onChange={handleChange}
                                                className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`} />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor='bairro' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Bairro</label>
                                            <input placeholder="Capoeiras"
                                                type="text"
                                                name='bairro'
                                                value={evento?.bairro}
                                                id='bairro'
                                                onChange={handleChange}
                                                className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`} />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor='rua' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Rua</label>
                                            <input placeholder="Rua major costa 291"
                                                type="text"
                                                value={evento?.rua}
                                                name='rua'
                                                id='rua'
                                                onChange={handleChange}
                                                className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`} />
                                        </div>
                                        <div></div>
                                        <div className="relative">
                                            <label htmlFor='metaArrecad' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Valor do Ingresso
                                            </label>
                                            <CurrencyInput
                                                placeholder="R$ 0,00"
                                                id='valor'
                                                name='valor'
                                                value={evento?.valor}
                                                onChange={handleChange}
                                                className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md`}
                                            />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor='dataEvento' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Data do Evento</label>
                                            <input
                                                placeholder="Data"
                                                id='dataEvento'
                                                name='dataEvento'
                                                value={formattedDate}
                                                onChange={handleDateChange}
                                                type="date"
                                                className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md `} />
                                        </div>
                                        <div className="relative mt-4">
                                            <label htmlFor='horaEvento' className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                                                Hora do Evento
                                            </label>
                                            <input
                                                placeholder="Hora Evento"
                                                id='horaEvento'
                                                name='horaEvento'
                                                value={formattedTime}
                                                onChange={handleTimeChange}
                                                type="time"
                                                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className='flex flex-col justify-center items-center space-y-3'>
                                            <span className='font-medium'>Imagem atual do evento</span>
                                            <img
                                                src={`http://localhost:8081${evento?.eventoCaminho}`}
                                                width={250}
                                                className='rounded-full'
                                            />
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
                                                    <label htmlFor='fotoEvento' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600'>

                                                        <RenderIf condition={!imagePreview}>
                                                            <span>Nova imagem para o evento</span>
                                                        </RenderIf>

                                                        <RenderIf condition={!!imagePreview}>
                                                            <img src={imagePreview} width={250} className='rounded-full' />
                                                        </RenderIf>

                                                        <input accept="image/*" onChange={onFileUpload} id='fotoEvento' name='fotoEvento' type='file' className='sr-only' />
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
                                        </div>
                                        <div className="relative">
                                            <button type='submit'
                                                className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                          rounded-lg transition duration-200 hover:bg-indigo-600 ease">
                                                {isLoading ? (
                                                    <Loading />
                                                ) : (
                                                    'Salvar'
                                                )}
                                            </button>
                                        </div>
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
            <Sidebar />
        </div>
    );
};
export default EventUpdate;

