import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

// Componente/Page
import { UserProvider } from './components/UserContext/UserContext';
import Configs from './pages/public/Configs/Configs';
import Explore from './pages/public/Explore/Explore';
import Groups from './pages/public/Groups/Groups';
import Messages from './pages/public/Mensagens/Mensagens';
import Notifications from './pages/public/Notifications/Notifications';
import PostEvent from './pages/public/PostEvent/PostEvent';
import Profile from './pages/public/Profile/Profile';
import RegisterAdm from './pages/public/RegisterAdm/RegisterAdm';
import ResetPassword from './pages/public/ResetPassword/ResetPassword';
import TypeYourCode from './pages/public/ResetPassword/TypeYourCode';
import StartPage from './pages/public/StartPage/Start';
import Tickets from './pages/public/Tickets/Tickets';
import Home from './pages/public/home/Home';
import Login from './pages/public/login/Login';
import Register from './pages/public/register/Register';

function App() {

  //Verifica a existencia do token
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); 
  };

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
          <Route path='/reset-password-email' element={<ResetPassword />} />
          <Route path='/type-your-code' element={<TypeYourCode />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
          <Route path='/explore' element={isAuthenticated() ? <Explore /> : <Navigate to="/login" />} />
          <Route path='/register-adm' element={isAuthenticated() ? <RegisterAdm /> : <Navigate to="/login" />} />
          <Route path='/account-config' element={isAuthenticated() ? <Configs /> : <Navigate to="/login" />} />
          <Route path='/your-groups' element={isAuthenticated() ? <Groups /> : <Navigate to="/login" />} />
          <Route path='/your-tickets' element={isAuthenticated() ? <Tickets /> : <Navigate to="/login" />} />
          <Route path='/your-messages' element={isAuthenticated() ? <Messages /> : <Navigate to="/login" />} />
          <Route path='/your-profile' element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/your-notifications' element={isAuthenticated() ? <Notifications /> : <Navigate to="/login" />} />
          <Route path='/create-event' element={isAuthenticated() ? <PostEvent /> : <Navigate to="/login" />} />  
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;