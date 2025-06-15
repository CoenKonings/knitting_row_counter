import './Counter.css'
import { useState } from 'react'
import { Action, AddAction } from './Action.tsx';

export function Counter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div className='counter'>
        <div className='counter-count'>{count}</div>
        <div className='counter-buttons'>
          <button onClick={incrementCount} className='increment-btn'>
            +
          </button>
          <button onClick={decrementCount} className='decrement-btn'>
            -
          </button>
        </div>
      </div>
      <AddAction />
      <div className='actions'>
        <Action totalCount={count} maxCount={8} actionName='increase' />
      </div>
    </>
  )
}
