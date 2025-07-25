import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from '../context/Auth';

const ProtectedLayout = () => {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
};

export default ProtectedLayout;