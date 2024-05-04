import { useState } from "react";
import { RenderIf } from "../../../components/RenderIf/RenderIf";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar";
import { format, parseISO } from 'date-fns';
import TrendEvents from "../../../components/Feed/TrendEvents";
import { FormsTrends } from "../../../components/Feed/FormsTrend";

export default function Profile() {

  const [imagePreview, setImagePreview] = useState<string>('');
  const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  const token = localStorage.getItem('token');

  const formatDate = (dateString: string) => {

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
      const file = event.target.files[0]
      const imageURL = URL.createObjectURL(file)
      const fileData = new FormData();
      fileData.append('file', file);
      setImagePreview(imageURL)

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
  }

  return (
    <div>
      <section className="pt-16 bg-blueGray-50 dark:bg-gray-900">
        <TrendEvents />
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <FormsTrends />
          <div className="backdrop:blur-md relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  {/* Upload da foto condicional*/}
                  {user.fotoCaminho == null ? (
                    <div className='mt-0 flex justify-center rounded-full h-36 w-36 border border-dashed border-gray-900/25 px-6 py-10'>
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
                              <img src={imagePreview} width={170} className='rounded-full' />
                            </RenderIf>

                            <input accept="image/*" onChange={onFileUpload} id='fotoPerfil' name='fotoPerfil' type='file' className='sr-only' />
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (

                    <img alt="..." src={`http://localhost:8081${user?.fotoCaminho}`} className="mt-0 flex justify-center rounded-full h-36 w-36 border"></img>
                  )}
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Eventos Criados</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Ingressos adquiridos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">Curtidas</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
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
                <div className="flex items-center mb-2 text-blueGray-600 mt-10">
                  <img src="/imagens/id-card.png" className="mr-2" alt="id-card"></img>
                  <span>{user.nome}</span>
                </div>
                <div className="flex items-center mb-2 text-blueGray-600">
                  <img src="/imagens/envelopes (1).png" className="mr-2" alt="envelopes"></img>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center mb-2 text-blueGray-600">
                  <img src="/imagens/calendar-lines.png" className="mr-2" alt="calendar-lines"></img>
                  <span>{formatDate(user.idade)}</span>
                </div>
                <div className="flex items-center mb-2 text-blueGray-600">
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
