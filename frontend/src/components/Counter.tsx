import './Counter.css'
import { useState } from 'react'
import { Action, AddAction } from './Action.tsx';

interface ActionObj {
  name: string;
  count: number;
  startCount: number;
}

/**
 * The Counter component handles the total row count and increment/decrement
 * buttons.
 *
 * TODO: Reorganize: Counter becomes RowCounter, and a new Counter component
 * handles the +- and count portion of this component.
 */
export function Counter() {
  const [count, setCount] = useState(0);
  const [actions, setActions] = useState<ActionObj[]>([]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const addActionCallback = (actionName: string, actionCount: number) => {
    setActions([...actions, { name: actionName, count: actionCount, startCount: count }])
  };

  const removeActionCallback = (index: number) => {
    let newActions: ActionObj[] = [...actions];
    newActions.splice(index, 1);
    setActions(newActions);
  }

  const actionComponents = actions.map((action, index) => (
    <Action
      id={index}
      totalCount={count}
      maxCount={action.count}
      actionName={action.name}
      startCount={action.startCount}
      removeAction={removeActionCallback}
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
      <AddAction addAction={addActionCallback} />
      <div className='actions'>
        <h2 className='actions-header'>Actions:</h2>
        { actionComponents.length ? actionComponents : "No actions added yet." }
      </div>
    </>
  )
}
