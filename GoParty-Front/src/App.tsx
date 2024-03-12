import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

// Componente/Page
import { UserProvider } from './components/UserContext/UserContext';
import Home from './pages/public/home/Home';
import Login from './pages/public/login/Login';
import Register from './pages/public/register/Register';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          {/* Rotas de navegação do sistema */}
          {/*ROTA2= <Route path='/' element={<Home />} /> */}
          {/*ROTA3= <Route path='/' element={<Home />} /> */}
          {/*ROTA4= <Route path='/' element={<Home />} /> */}
          {/*ROTA5= <Route path='/' element={<Home />} /> */}
          {/*ROTA6= <Route path='/' element={<Home />} /> */}
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App;

