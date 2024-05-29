import React, { useState } from 'react';
import useComentarios from "../../hooks/useComentarios ";

interface ComentariosProps {
    eventoId: number;
}

const CommentsSection: React.FC<ComentariosProps> = ({ eventoId }) => {
    const { comentarios, loading, error } = useComentarios(eventoId);
    const [text, setText] = useState("");

    const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');
    const token = localStorage.getItem('token');

    const postComment = async (eventoId: number, autorId: number, texto: string) => {
        try {
            const response = await fetch(`http://localhost:8081/v1/eventos/comment/${texto}?eventoId=${eventoId}&autorId=${autorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao adicionar comentário');
            }
    
            console.log('Comentário adicionado com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postComment(eventoId, user.id, text);
            console.log("Comentário adicionado.")
        } catch (error) {
            console.log("Erro ao adicionar comentário.")
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
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
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd" />
                        </svg>
                    </button>
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
                                </div>
                            </article>

                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default CommentsSection;
