//Tipo evento
interface Event {
    id: number;
    titulo: string;
    descricao: string;
    estado: string;
    cidade: string ;
    bairro: string;
    foto: Blob | string;
    date: Date;
}

export default Event;