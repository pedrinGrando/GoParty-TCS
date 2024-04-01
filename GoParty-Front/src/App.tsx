import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

// Componente/Page
import { UserProvider } from './components/UserContext/UserContext';
import Configs from './pages/public/Configs/Configs';
import Explore from './pages/public/Explore/Explore';
import Groups from './pages/public/Groups/Groups';
import Messages from './pages/public/Mensagens/Mensagens';
import Notifications from './pages/public/Notifications/Notifications';
import Profile from './pages/public/Profile/Profile';
import RegisterAdm from './pages/public/RegisterAdm/RegisterAdm';
import StartPage from './pages/public/StartPage/Start';
import Tickets from './pages/public/Tickets/Tickets';
import Home from './pages/public/home/Home';
import Login from './pages/public/login/Login';
import Register from './pages/public/register/Register';
import PostEvent from './pages/public/PostEvent/PostEvent';

function App() {
  useEffect(() => {
    AOS.init({
      once: true, 
      duration: 1000, 
    });

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
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/register-adm' element={<RegisterAdm />} />
          <Route path='/account-config' element={<Configs />} />
          <Route path='/your-groups' element={<Groups />} />
          <Route path='/your-tickets' element={<Tickets />} />
          <Route path='/your-messages' element={<Messages />} />
          <Route path='/your-profile' element={<Profile />} />
          <Route path='/your-notifications' element={<Notifications />} />
          <Route path='/create-event' element={<PostEvent />} />
          {/*ROTA2= <Route path='/' element={<Home />} /> */}
          {/*ROTA3= <Route path='/' element={<Home />} /> */}
          {/* ... seus outros Routes */}
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;