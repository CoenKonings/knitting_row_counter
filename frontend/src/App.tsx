import { useState, useCallback } from 'react';
import './App.css'
import { Counter } from './components/Counter.tsx'
import { ActionManager } from './components/ActionManager.tsx';

export function App() {
  const [count, setCount] = useState(0);

    const incrementCount = useCallback(() => {
      setCount((prevcount) => prevcount + 1);
    }, []);

    const decrementCount = useCallback(() => {
      setCount((prevcount) => (prevcount - 1 >= 0 ? prevcount - 1 : prevcount));
    }, []);

  return <>
    <h1 className='site-title'>Rowcounter</h1>
    <Counter
      count={count}
      incrementCount={incrementCount}
      decrementCount={decrementCount}
    />
    <ActionManager
      count={count}
    />
  </>
}
