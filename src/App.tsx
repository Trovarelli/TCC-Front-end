
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Perfil } from './pages';

function App() {

  return (
    <Router>
    <div className='App'>
        {/* <ul>
            <li> <Link to='/'>Home</Link> </li>
            <li> <Link to='/AllGames'>AllGames</Link> </li>
            <li> <Link to='/user/meunome'>User</Link> </li>
        </ul> */}
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/perfil' element={<Perfil />} />
            {/* <Route path='allGames' element={<AllGames />} />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='game/:id' element={<GameAds />} >
                <Route path='edit' element={<h1>Editar perfil</h1>} />
                <Route path='Order' element={<h1>Meus Pedidos</h1>} />
            </Route> */}
        </Routes>
    </div>
</Router>
  );
}

export default App;
