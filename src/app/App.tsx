import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
        <FloatingWhatsApp />
        <Toaster position="top-right" />
      </DataProvider>
    </AuthProvider>
  );
}