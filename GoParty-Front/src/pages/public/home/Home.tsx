import { useUser } from "../../../components/UserContext/UserContext";

export default function Home () {
    const { user } = useUser();

    return (
        <div>
            <h1>
                Home em Construção
                {user && <p>Logged in as: {user.username}</p>}
            </h1>
            <span>A home deve ser a página principal, nela, deve ter uma apresentação da GoParty. Posteriormente, 
            Após o usuário criar em entrar, será redirecionado para o login e sómente de pois será redirecionado para a HOME DO SISTEMA.
            </span>
        </div>
    )
}
