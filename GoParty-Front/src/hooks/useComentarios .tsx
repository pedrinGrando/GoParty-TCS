import { useState, useEffect } from 'react';
import { CommentDTO } from '../types/CommentDTO';

const useComentarios = (eventoId: number) => {
    const [comentarios, setComentarios] = useState<CommentDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await fetch(`http://localhost:8081/v1/eventos/find-comments/${eventoId}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar comentários');
                }
                const data = await response.json();
                setComentarios(data);
            } catch (error) {
                //
            } finally {
                setLoading(false);
            }
        };

        fetchComentarios();
    }, [eventoId]);

    return { comentarios, setComentarios, loading, error };
};

export default useComentarios;
