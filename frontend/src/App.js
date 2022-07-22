import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import { useAuth } from './hooks/useAuth';

import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[70vh]">
          <Routes>
            <Route path='/' element={ auth ? <Home /> : <Navigate to="/login" /> } />
            <Route path='/login' element={ !auth ? <Login /> : <Navigate to="/" /> } />
            <Route path='/register' element={ !auth ? <Register /> : <Navigate to="/" /> } />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
