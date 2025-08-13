import { Navigate, Outlet } from 'react-router-dom';

const isLoggedIn = () => !!localStorage.getItem('token');

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
