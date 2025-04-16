import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importando o React Router

// Componente de exemplo para a Home
function Home() {
  return <h1>Home Page</h1>;
}

// Componente de exemplo para o About
function About() {
  return <h1>About Page</h1>;
}


export default function Router () {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
  )
}