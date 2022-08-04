import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import { useAuth } from './hooks/useAuth';

import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { EditProfile } from './pages/EditProfile';
import { Profile } from './pages/Profile';
import { Photo } from './pages/Photo';
import { Search } from './pages/Search';

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
            <Route path='/profile' element={ auth ? <EditProfile /> : <Navigate to="/login" /> } />
            <Route path='/users/:id' element={ auth ? <Profile /> : <Navigate to="/login" /> } />
            <Route path='/search' element={ auth ? <Search /> : <Navigate to="/login" /> } />
            <Route path='/photos/:id' element={ auth ? <Photo /> : <Navigate to="/login" /> } />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
