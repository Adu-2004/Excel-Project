import { Navigate, Outlet } from 'react-router-dom';

const getUserRole = () => localStorage.getItem('role');

const AdminRoute = () => {
  const role = getUserRole();
  return role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
