import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div className='bg-blue-500 text-white p-4 rounded-lg shadow-md'>
        Counter = {count}

      </div>
        
    </>
  )
}

export default App
