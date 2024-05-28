import { useState, useEffect } from 'react';

const useEventoCurtido = (eventoId: number, userId: number) => {
    const [curtido, setCurtido] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurtido = async () => {
            try {
                const response = await fetch(`http://localhost:8081/v1/eventos/isLiked/${eventoId}/curtido/${userId}`);
                if (!response.ok) {
                    throw new Error('Falha ao verificar curtida');
                }
                const data = await response.json();
                setCurtido(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurtido();
    }, [eventoId, userId]);

    return { curtido, loading };
};

export default useEventoCurtido;