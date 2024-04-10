//Tipo evento
interface Event {
    id: number;
    titulo: string;
    descricao: string;
    eventoCaminho: string;
    estado: string;
    cidade: string ;
    bairro: string;
    foto: Blob | string;
    date: Date;
}

export default Event;