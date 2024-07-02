import React, { useState } from 'react';
import useComentarios from "../../hooks/useComentarios ";
import { CommentDTO } from '../../types/CommentDTO';
import { Loading } from '../Loading/Loading';
import { ToastType } from '../modal/ToastType';
import { ToastContainer } from '../modal/ToastContainer';

interface ComentariosProps {
    eventoId: number;
}

const CommentsSection: React.FC<ComentariosProps> = ({ eventoId }) => {
    const { comentarios, loading, error, setComentarios } = useComentarios(eventoId);
    const [text, setText] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [toastType, setToasType] = useState<ToastType>("error");

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const closeToast = () => {
        setIsVisible(false);
    }

    const postComment = async (eventoId: number, autorId: number, texto: string): Promise<CommentDTO> => {
        try {
            const response = await fetch(`http://localhost:8081/v1/eventos/comment/${texto}?eventoId=${eventoId}&autorId=${autorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setToasType("error");
                setMessage("Não foi possível comentar neste post.")
                setIsVisible(true);
                throw new Error('Erro ao adicionar comentário');
            }

            setToasType("success");
            setMessage("Comentário enviado!")
            setIsVisible(true);
            const data = await response.json();
            const newComment: CommentDTO = data.comentario;
            console.log('Comentário adicionado com sucesso. ' + newComment);
            return newComment;
        } catch (error) {
            setToasType("error");
            setMessage("Não foi possível comentar neste post.")
            setIsVisible(true);
            console.error('Erro:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newComment = await postComment(eventoId, user.id, text);
            setComentarios([...comentarios, newComment]);
            setText("");
            console.log("Comentário adicionado.")
        } catch (error) {
            console.log("Erro ao adicionar comentário.")
        }
    };

    if (loading) return <div><Loading /></div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <ToastContainer
                message={message}
                onClose={closeToast}
                isVisible={isVisible}
                type={toastType}
            />
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comentários</h2>
                </div>
                <form className="mb-6" onSubmit={handleSubmit}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label className="sr-only">Seu comentário</label>
                        <textarea
                            id="comment"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write a comment..."
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit"
                        className="inline-flex items-center  py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        <svg className="w-5 h-5 mb-6 mt-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                </form>
                {comentarios.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">Nenhum comentário para o evento.</p>
                ) : (
                    <ul className="space-y-4">
                        {comentarios.map((comentario) => (
                            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src={comentario.autorCaminho ? `http://localhost:8081${comentario.autorCaminho}` : '/imagens/user (1).png'}
                                            alt="Michael Gough" />@{comentario.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                                    </div>
                                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>
                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">{comentario.texto}</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <span className="text-sm text-gray-500">{comentario.commentMoment}</span>
                                </div>
                                <hr className="my-5 border-gray-300 dark:bg-gray-900 dark:border-gray-300 lg:my-5" />
                            </article>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default CommentsSection;
