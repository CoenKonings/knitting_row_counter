import { useState } from 'react'
import Action from './Action.tsx';

function Counter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div>
        <button onClick={decrementCount}>
          -
        </button>

        <span>{count}</span>

        <button onClick={incrementCount}>
          +
        </button>
      </div>
      <div>
        <Action totalCount={count} maxCount={8} actionName='increase' />
      </div>
    </>
  )
}

export default Counter
