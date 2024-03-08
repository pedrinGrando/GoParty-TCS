
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//PAGES
import Login from './routes/Login';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
