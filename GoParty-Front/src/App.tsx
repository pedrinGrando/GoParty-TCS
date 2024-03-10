import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Fixar aqui qual componente desejado para ser renderizado como default
import Home from './pages/public/home/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        {/* Rotas de navegação do sistema */}
        {/*ROTA2= <Route path='/' element={<Home></Home>} /> */}
        {/*ROTA3= <Route path='/' element={<Home></Home>} /> */}
        {/*ROTA4= <Route path='/' element={<Home></Home>} /> */}
        {/*ROTA5= <Route path='/' element={<Home></Home>} /> */}
        {/*ROTA6= <Route path='/' element={<Home></Home>} /> */}
      </Routes>
    </Router>
  )
}

export default App
