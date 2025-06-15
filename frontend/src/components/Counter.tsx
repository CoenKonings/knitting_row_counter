import './Counter.css'
import { useState, useCallback } from 'react'
import { Action, AddAction } from './Action.tsx';

interface ActionObj {
  name: string;
  count: number;
  startCount: number;
  numIterations: number;
}

/**
 * The Counter component handles the total row count and increment/decrement
 * buttons.
 *
 * TODO:  Reorganize. Move everything that is not just a simple counter to the
 *        App component.
 */
export function Counter() {
  const [count, setCount] = useState(0);
  const [actions, setActions] = useState<ActionObj[]>([]);

  const incrementCount = () => {
    setCount((prevcount) => prevcount + 1);
  };

  const decrementCount = () => {
    setCount((prevcount) => (prevcount - 1 >= 0 ? prevcount - 1 : prevcount));
  };

  const addAction = (actionName: string, actionCount: number, numIterations: number) => {
    setActions([...actions, { name: actionName, count: actionCount, startCount: count, numIterations: numIterations }])
  };

  const removeAction = useCallback((index: number) => {
    let newActions: ActionObj[] = [...actions];
    newActions.splice(index, 1);
    setActions(newActions);
  }, [actions]);

  const actionComponents = actions.map((action, index) => (
    <Action
      key={index}
      id={index}
      totalCount={count}
      maxCount={action.count}
      actionName={action.name}
      startCount={action.startCount}
      numIterations={action.numIterations}
      removeAction={removeAction}
    />
  ));

  return (
    <>
      <div className='counter'>
        <div className='counter-count'>{count}</div>
        <div className='counter-buttons'>
          <button onClick={incrementCount} className='increment-btn'>+</button>
          <button onClick={decrementCount} className='decrement-btn'>-</button>
        </div>
      </div>
      <AddAction addAction={addAction} />
      <div className='actions'>
        <h2 className='actions-header'>Actions:</h2>
        { actionComponents.length ? actionComponents : "No actions added yet." }
      </div>
    </>
  )
}
