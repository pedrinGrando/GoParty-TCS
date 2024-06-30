import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

// Componente/Page
import { UserProvider } from './components/UserContext/UserContext';
import Configs from './pages/private/Configs/Configs';
import Explore from './pages/private/Explore/Explore';
import Groups from './pages/private/Groups/Groups';
import Notifications from './pages/private/Notifications/Notifications';
import PostEvent from './pages/private/PostEvent/PostEvent';
import Profile from './pages/private/Profile/Profile';
import ResetPassword from './pages/public/ResetPassword/ResetPassword';
import TypeYourCode from './pages/public/ResetPassword/TypeYourCode';
import StartPage from './pages/public/StartPage/Start';
import Tickets from './pages/private/Tickets/Tickets';
import Home from './pages/private/home/Home';
import Login from './pages/public/login/Login';
import Register from './pages/public/register/Register';
import RegisterAdm from './pages/public/register/RegisterAdm';
import RegisterStudent from './pages/public/register/RegisterStudent';
import ChangePassword from './pages/public/ResetPassword/ChangePassword';
import TypeCodeRegister from './pages/public/register/TypeCodeRegister';
import Terms from './pages/public/Terms/Terms';
import EventDetails from './pages/private/EventDetails/EventDetails';
import TrendPage from './pages/private/Trend/Trend';
import NewPass from './pages/private/Configs/NewPass';
import Events from './pages/private/Events/Events';
import Graduation from './pages/private/Graduation/Graduation';
import EventUpdate from './pages/private/EventDetails/EventUpdate';
import PixKey from './pages/private/Tickets/PixKey';
import TicketReport from './pages/private/Reports/TicketReport/TicketReport';
import EventReport from './pages/private/Reports/EventReport/EventReport';
import GradEvents from './pages/private/Graduation/GradEvents';

function App() {

  const user = JSON.parse(localStorage.getItem('sessionUser') || '{}');

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
          {/*Public pages*/}
          <Route path='/' element={<StartPage />} />
          <Route path='/about' element={<StartPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register-student' element={<RegisterStudent />} />
          <Route path='/validate-email' element={<TypeCodeRegister />} />
          <Route path='/terms-and-conditions' element={<Terms />} />

          {/* Reset Password Page */}
          <Route path='/reset-password-email' element={<ResetPassword />} />
          <Route path='/type-your-code' element={<TypeYourCode />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/new-password' element={<NewPass />} />
          
          {/* Private Pages */}
          <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
          <Route path="/event/:eventId" element={isAuthenticated() ? <EventDetails /> : <Navigate to="/login" />} />
          <Route path="/event-update/:eventId" element={isAuthenticated() ? <EventUpdate /> : <Navigate to="/login" />} />
          <Route path="/formatura-pix/:eventId" element={isAuthenticated() ? <PixKey /> : <Navigate to="/login" />} />
          <Route path='/explore' element={isAuthenticated() ? <Explore /> : <Navigate to="/login" />} />
          <Route path='/register-adm' element={isAuthenticated() ? <RegisterAdm /> : <Navigate to="/login" />} />
          <Route path='/account-config' element={isAuthenticated() ? <Configs /> : <Navigate to="/login" />} />
          <Route path='/your-groups' element={isAuthenticated() ? <Groups /> : <Navigate to="/login" />} />
          <Route path='/your-tickets' element={isAuthenticated() ? <Tickets /> : <Navigate to="/login" />} />
          <Route path='/your-events' element={isAuthenticated() ? <Events /> : <Navigate to="/login" />} />
          <Route path='/graduation-events/:formId' element={isAuthenticated() ? <GradEvents /> : <Navigate to="/login" />} />
          <Route path='/your-graduation' element={isAuthenticated() ? <Graduation /> : <Navigate to="/login" />} />
          <Route path='/your-graduation/tickets-report/:graduationId' element={isAuthenticated() ? <TicketReport /> : <Navigate to="/login" />} />
          <Route path='/your-graduation/events-report/:graduationId' element={isAuthenticated() ? <EventReport /> : <Navigate to="/login" />} />
          <Route path='/your-profile' element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/your-notifications' element={isAuthenticated() ? <Notifications /> : <Navigate to="/login" />} />
          <Route path='/create-event' element={isAuthenticated() ? <PostEvent /> : <Navigate to="/login" />} />
          <Route path='/trending-events' element={isAuthenticated() ? <TrendPage /> : <Navigate to="/login" />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;