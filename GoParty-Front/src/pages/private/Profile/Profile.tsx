import { useEffect, useState } from "react";
import { RenderIf } from "../../../components/RenderIf/RenderIf";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { format, parseISO } from 'date-fns';
import TrendEvents from "../../../components/Feed/TrendEvents";
import { FormsTrends } from "../../../components/Feed/FormsTrend";
import ResponsiveImage from "../../../components/Image/ResponsiveImage";
import { NotificationBell } from "../../../components/Notification/NotificationBell";

export default function Profile() {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [eventosCriados, setEventosCriados] = useState<number>(0);
  const [ingressosAdquiridos, setIngressosAdquiridos] = useState<number>(0);
  const [curtidas, setCurtidas] = useState<number>(0);

  const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  const token = localStorage.getItem('token');

  const formatDate = (dateString: string) => {
    console.log(dateString);
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy');
  }

  const formatCpf = (cpfUser: string) => {
    const cpfFormated = cpfUser.substring(0, 3);
    const finalCpf = cpfFormated + '.' + '***' + '***';
    return finalCpf;
  }


  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      const fileData = new FormData();
      fileData.append('file', file);
      setImagePreview(imageURL);

      try {
        const response = await fetch(`http://localhost:8081/v1/usuarios/${user.id}/upload-profile-image`, {
          method: 'POST',
          body: fileData,
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          console.log('File uploaded successfully.');
        }
      } catch (error) {
        console.error('Failed to upload file.');
      }
    }
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const eventosResponse = await fetch(`http://localhost:8081/v1/eventos/count-by-usuario/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (eventosResponse.ok) {
          const eventosData = await eventosResponse.json();
          setEventosCriados(eventosData);
        }

        const ingressosResponse = await fetch(`http://localhost:8081/v1/ingressos/count-by-usuario/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (ingressosResponse.ok) {
          const ingressosData = await ingressosResponse.json();
          setIngressosAdquiridos(ingressosData);
        }

        const curtidasResponse = await fetch(`http://localhost:8081/v1/eventos/count-likes-by-usuario/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (curtidasResponse.ok) {
          const curtidasData = await curtidasResponse.json();
          setCurtidas(curtidasData);
        }
      } catch (error) {
        console.error('Failed to fetch user stats.', error);
      }
    };

    fetchUserStats();
  }, [user.id, token]);

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <NotificationBell />
      <ResponsiveImage
        imageUrl="/imagens/newGradMen.png"
        altText="Placeholder Image"
      />
      <h1 className="flex justify-center top-0 left-1/2 mt-4 text-3xl font-semibold bg-white py-3 shadow dark:bg-gray-900 dark:text-white items-center">
        Seu perfil
        <svg className="ml-3 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
        </svg>
      </h1>
      <section className="pt-16 bg-blueGray-50 dark:bg-gray-900">
        <TrendEvents />
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="backdrop:blur-md relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 dark:bg-gray-800">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  {user.fotoCaminho == null ? (
                    <div className='mt-0 flex justify-center rounded-full h-36 w-36 border border-dashed border-gray-900/25 px-6 py-10 dark:border-gray-700'>
                      <div className='text-center'>
                        <RenderIf condition={!imagePreview}>
                          <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                              clipRule="evenodd" />
                          </svg>
                        </RenderIf>
                        <div className='mt-2 flex text-sm leading-6 text-gray-600 dark:text-gray-300'>
                          <label htmlFor='fotoPerfil' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 dark:bg-gray-800 dark:text-indigo-400'>
                            <RenderIf condition={!imagePreview}>
                              <span>Foto de Perfil</span>
                            </RenderIf>
                            <RenderIf condition={!!imagePreview}>
                              <img src={imagePreview} width={170} className='mt-0 rounded-full ring-6 ring-indigo-500 dark:ring-gray-500 w-28 h-24' />
                            </RenderIf>
                            <input accept="image/*" onChange={onFileUpload} id='fotoPerfil' name='fotoPerfil' type='file' className='sr-only' />
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img alt="..." src={`http://localhost:8081${user?.fotoCaminho}`} className="mt-0 flex justify-center rounded-full ring-6 ring-indigo-500 dark:ring-gray-500 h-36 w-36"></img>
                  )}
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    {(user?.tipoUsuario === 'MEMBER' || user?.tipoUsuario === 'ADM') && (
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-blueGray-400">
                          {eventosCriados}
                        </span>
                        <span className="text-sm text-blueGray-400 dark:text-blueGray-300">Eventos Criados</span>
                      </div>
                    )}
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-blueGray-400">
                        {ingressosAdquiridos}
                      </span>
                      <span className="text-sm text-blueGray-400 dark:text-blueGray-300">Ingressos adquiridos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-blueGray-400">
                        {curtidas}
                      </span>
                      <span className="text-sm text-blueGray-400 dark:text-blueGray-300">Curtidas</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2 dark:text-blueGray-300">
                  @{user.username}
                </h3>
                <div className="mb-2 text-green-600 mt-10">
                  <p>GoParty {user.tipoUsuario}
                    <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                        <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </span></p>
                </div>
                <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                <div className="flex items-center mb-2 text-blueGray-600 mt-10 dark:text-blueGray-300">
                  <img src="/imagens/id-card.png" className="mr-2" alt="id-card"></img>
                  <span>{user.nome}</span>
                </div>
                <div className="flex items-center mb-2 text-blueGray-600 dark:text-blueGray-300">
                  <img src="/imagens/envelopes (1).png" className="mr-2" alt="envelopes"></img>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center mb-2 text-blueGray-600 dark:text-blueGray-300">
                  <img src="/imagens/calendar-lines.png" className="mr-2" alt="calendar-lines"></img>
                  <span>{formatDate(user.idade)}</span>
                </div>
                <div className="flex items-center mb-2 text-blueGray-600 dark:text-blueGray-300">
                  <img src="/imagens/documents.png" className="mr-2" alt="id-card"></img>
                  <span>{formatCpf(user.cpf)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sidebar />
      <ResponsiveNavBar />
    </div>
  )
}