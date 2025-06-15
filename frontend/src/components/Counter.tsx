import './Counter.css'
import { useState } from 'react'
import { Action, AddAction } from './Action.tsx';

interface ActionObj {
  name: string;
  count: number;
  startCount: number;
}

export function Counter() {
  const [count, setCount] = useState(0);
  const [actions, setActions] = useState<ActionObj[]>([]);

  console.log(actions);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const addActionCallback = (actionName: string, actionCount: number) => {
    setActions([...actions, { name: actionName, count: actionCount, startCount: count }])
  };

  const actionComponents = actions.map(action => (
    <Action
      totalCount={count}
      maxCount={action.count}
      actionName={action.name}
      startCount={action.startCount}
    />
  ));

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
      <AddAction addAction={addActionCallback} />
      <div className='actions'>
        <h2 className='actions-header'>Actions:</h2>
        { actionComponents.length ? actionComponents : "No actions added yet." }
      </div>
    </>
  )
}
