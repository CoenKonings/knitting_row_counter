import './Counter.css'

interface CounterProps {
  count: number;
  incrementCount(): void;
  decrementCount(): void;
}

/**
 * The Counter component handles the total row count and increment/decrement
 * buttons.
 */
export function Counter({ count, incrementCount, decrementCount }: CounterProps) {
  return (
    <>
      <div className='counter'>
        <div className='counter-count'>{count}</div>
        <div className='counter-buttons'>
          <button onClick={incrementCount} className='increment-btn'>+</button>
          <button onClick={decrementCount} className='decrement-btn'>-</button>
        </div>
      </div>
    </>
  )
}
