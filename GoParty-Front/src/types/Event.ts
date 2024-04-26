//Tipo evento
interface Event {
    id: number;
    titulo: string;
    descricao: string;
    eventoCaminho: string;
    cep: string;
    estado: string;
    valor: number;
    rua: string;
    cidade: string ;
    bairro: string;
    foto: Blob | string;
    dataEvento: Date;
    dataPostagem: Date;
}

export default Event;