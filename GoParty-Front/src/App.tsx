import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Componente/Page
import { UserProvider } from './components/UserContext/UserContext';
import Home from './pages/public/home/Home';
import Login from './pages/public/login/Login';
import Register from './pages/public/register/Register';
import Explore from './pages/public/Explore/Explore';
import RegisterAdm from './pages/public/RegisterAdm/RegisterAdm';
import Configs from './pages/public/Configs/Configs';
import Groups from './pages/public/Groups/Groups';
import Tickets from './pages/public/Tickets/Tickets';
import Profile from './pages/public/Profile/Profile';
import Notifications from './pages/public/Notifications/Notifications';
import Messages from './pages/public/Mensagens/Mensagens';
import StartPage from './pages/public/StartPage/Start';

function App() {
  useEffect(() => {
    AOS.init({
      // aqui você pode colocar outras configurações de AOS que desejar
      once: true, // significa que a animação só acontecerá uma vez por elemento
      duration: 1000, // duração da animação em milissegundos
      // Você pode adicionar outras configurações conforme necessário
    });

    // Esta função será chamada quando o componente for desmontado
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/about' element={<StartPage />} />
          <Route path='/login' element={<Login />} />
          {/* ... seus outros Routes */}
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;