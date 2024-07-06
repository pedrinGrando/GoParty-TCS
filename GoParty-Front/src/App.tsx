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
import GradUpdate from './pages/private/Graduation/GradUpdate';
import PrivateRoute from './components/UserContext/PrivateRoute';
import GradDatails from './pages/private/Graduation/GradDetails';

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Public pages */}
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
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/event-update/:eventId" element={<EventUpdate />} />
            <Route path="/grad-update/:formId" element={<GradUpdate />} />
            <Route path="/grad-details/:gradId" element={<GradDatails />} />
            <Route path="/formatura-pix/:eventId" element={<PixKey />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/register-adm' element={<RegisterAdm />} />
            <Route path='/account-config' element={<Configs />} />
            <Route path='/your-groups' element={<Groups />} />
            <Route path='/your-tickets' element={<Tickets />} />
            <Route path='/your-events' element={<Events />} />
            <Route path='/graduation-events/:formId' element={<GradEvents />} />
            <Route path='/your-graduation' element={<Graduation />} />
            <Route path='/your-graduation/tickets-report/:graduationId' element={<TicketReport />} />
            <Route path='/your-graduation/events-report/:graduationId' element={<EventReport />} />
            <Route path='/your-profile' element={<Profile />} />
            <Route path='/your-notifications' element={<Notifications />} />
            <Route path='/create-event' element={<PostEvent />} />
            <Route path='/trending-events' element={<TrendPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;