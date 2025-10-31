
import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { RouterProvider, useRouter } from './context/RouterContext';

const AppContent: React.FC = () => {
  const { route } = useRouter();

  switch (route) {
    case '#/admin':
      return <LoginPage />;
    case '#/admin/dashboard':
      return <AdminPanel />;
    case '#/':
    default:
      return <HomePage />;
  }
};

const App: React.FC = () => {
  return (
    <RouterProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </RouterProvider>
  );
};

export default App;
