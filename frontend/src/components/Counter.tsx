import { useState } from 'react'

interface CounterProps {
  maxCount: number;
  action: string;
}

function Counter({ maxCount, action }: CounterProps) {
  const [count, setCount] = useState(0);
  const [numCycles, setNumCycles] = useState(0);

  const incrementCount = () => {
    let newCount: number = count + 1;

    if (newCount % maxCount == 0) {
      newCount %= maxCount;
      setNumCycles(numCycles + 1)
    }

    setCount(newCount);
  };

  const decrementCount = () => {
    let newCount: number = count - 1;

    if (newCount < 0 && numCycles > 0) {
      setNumCycles(numCycles - 1);
      newCount = maxCount - 1;
    } else if (newCount < 0) {
      newCount = 0;
    }

    setCount(newCount);
  };

  return (
    <>
      <div>
        {action} number: {numCycles}
      </div>

      <button onClick={decrementCount}>
        -
      </button>

      <span>{count}</span>

      <button onClick={incrementCount}>
        +
      </button>
    </>
  )
}

export default Counter
