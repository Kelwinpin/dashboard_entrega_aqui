import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Auth from './features/Auth';
import AuthLayout from './layouts/Login';
import Home from './features/Home';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Auth />} />
        </Route>

        <Route element={<Home />} >
          <Route path="home" element={<Home />} />
        </Route>

        <Route path="*" element={<h1>404: página não encontrada</h1>} />
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </QueryClientProvider>
  );
}

export default App;
