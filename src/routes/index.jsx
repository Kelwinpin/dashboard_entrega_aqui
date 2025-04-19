import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importando o React Router
import Auth from '../features/Auth';

export default function Router () {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  </BrowserRouter>
  )
}