import { Footer } from "../../../components/Footer/Footer";
import { NavBar } from "../../../components/NavBar/NavBar";
import { useUser } from "../../../components/UserContext/UserContext";
import { Sidebar } from "../../../components/sidebar/Sidebar";

export default function Home () {
    const { user } = useUser();

    return (
        <div>
            <NavBar /> 
            <Sidebar userName={user?.username}/>
            <Footer />
        </div>
    )
}
