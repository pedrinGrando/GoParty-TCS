import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

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
  return (
      <Router>
       <UserProvider>
        <Routes>
          <Route path='/' element={<StartPage />} />
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
          {/*ROTA2= <Route path='/' element={<Home />} /> */}
          {/*ROTA3= <Route path='/' element={<Home />} /> */}
        </Routes>
      </UserProvider>
    </Router>
  )
}
export default App;