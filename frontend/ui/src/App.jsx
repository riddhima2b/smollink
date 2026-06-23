import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div className='bg-blue-500 text-white p-4 rounded-lg shadow-md max-h-full h-screen'>
        <div>
          <h1 className='text-2xl font-bold'>Hello Vite + React!</h1>
        </div>

      </div>
        
    </>
  )
}

export default App
