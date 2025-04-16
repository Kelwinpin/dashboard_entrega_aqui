import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Dashboard de Entregas</h1>
      <div className="flex flex-col items-center justify-center">
        <button className="text-white rounded-md" onClick={() => setCount((count) => count + 1)}>
          <span className="text-2xl font-bold">
            {count}
          </span>
        </button>
      </div>
    </>
  )
}

export default App
