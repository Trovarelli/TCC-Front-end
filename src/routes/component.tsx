import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { authMiddleware } from "../middleware/auth";
import { Perfil, Login, Home } from "../pages";

const PrivateRoutes = () => {
  if (!authMiddleware()) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const LoggedRoutes = () => {
  if (authMiddleware()) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export const DefaultRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
      <Route element={<LoggedRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* <Route path='allGames' element={<AllGames />} />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='game/:id' element={<GameAds />} >
                <Route path='edit' element={<h1>Editar perfil</h1>} />
                <Route path='Order' element={<h1>Meus Pedidos</h1>} />
            </Route> */}
    </Routes>
  );
};
