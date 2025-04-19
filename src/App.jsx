import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Router from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
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
