import { useState, useCallback } from 'react';
import { Counter } from './Counter.tsx'
import { ActionManager } from './ActionManager.tsx';

export interface ActionObj {
  name: string;
  maxCount: number;
  startCount: number;
  numIterations: number;
}

export function RowCounter() {
  const [count, setCount] = useState(0);
  const [actions, setActions] = useState<ActionObj[]>([]);

  const addAction = useCallback((name: string, maxCount: number, numIterations: number) => {
    setActions((oldActions) => [...oldActions, {
      name: name,
      maxCount: maxCount,
      startCount: count,
      numIterations: numIterations
    }]);
  }, [actions, count]);

  const removeAction = useCallback((index: number) => {
    setActions((oldActions) => {
      const newActions: ActionObj[] = [...oldActions];
      newActions.splice(index, 1);
      return newActions;
    })
  }, [actions])

  const visibleActions = actions.filter((action) => {
    const relativeCount: number = count - action.startCount;
    const numCompleted: number = Math.floor(relativeCount / action.maxCount);
    return numCompleted < action.numIterations && numCompleted >= 0;
  });

  const incrementCount = useCallback(() => {
    setCount((prevcount) => {
      const newCount: number = prevcount + 1;
      return newCount;
    });
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prevcount) => (prevcount - 1 >= 0 ? prevcount - 1 : prevcount));
  }, []);

  return <>
    <Counter
      count={count}
      incrementCount={incrementCount}
      decrementCount={decrementCount}
    />
    <ActionManager
      count={count}
      actions={visibleActions}
      addAction={addAction}
      removeAction={removeAction}
    />
  </>
}
