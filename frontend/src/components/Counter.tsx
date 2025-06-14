import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count - 1)}>
        -
      </button>

      <span>{count}</span>

      <button onClick={() => setCount((count) => count + 1)}>
        +
      </button>
    </>
  )
}

export default Counter
