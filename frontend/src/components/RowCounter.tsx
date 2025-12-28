import { Counter } from './Counter.tsx'
import { useState, useCallback } from 'react';
import { ActionManager } from './ActionManager.tsx';
import usePersistantState from '../persistantState.tsx';

export interface ActionObj {
  name: string;
  numRowsPerAction: number;
  startCount: number;
  numIterations: number;
}

export interface ResetButtonProps {
  setCount(count: number): void,
  setActions(actions: ActionObj[]): void
}

export function RowCounter() {
  const [count, setCount] = usePersistantState("rowcount", 0);
  const [actions, setActions] = usePersistantState<ActionObj[]>("rowcounterActions", []);

  const addAction = useCallback((name: string, numRowsPerAction: number, startCountDif: number, numIterations: number) => {
    setActions((oldActions: ActionObj[]) => [...oldActions, {
      name: name,
      numRowsPerAction: numRowsPerAction,
      startCount: count + startCountDif,
      numIterations: numIterations
    }]);
  }, [actions, count]);

  const removeAction = useCallback((index: number) => {
    setActions((oldActions: ActionObj[]) => {
      const newActions: ActionObj[] = [...oldActions];
      newActions.splice(index, 1);
      return newActions;
    })
  }, [actions]);

  const incrementCount = useCallback(() => {
    setCount((prevcount: number) => {
      const newCount: number = prevcount + 1;
      return newCount;
    });
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prevcount: number) => (prevcount - 1 >= 0 ? prevcount - 1 : prevcount));
  }, []);

  const visibleActions = actions.filter((action: ActionObj) => {
    console.log((count - action.startCount) / action.numRowsPerAction);
    console.log(action.numIterations);
    console.log("====");

    return (count - action.startCount) / action.numRowsPerAction <= action.numIterations - 1;
  });

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
    <ResetButton
      setCount={setCount}
      setActions={setActions}
    />
  </>
}

function ResetButton(props: ResetButtonProps) {
  const [resetClicked, setResetClicked] = useState(false);
  const [timer, setTimer] = useState<number|undefined>(undefined);

  const handleReset = () => {
    if (resetClicked) {
      props.setActions([]);
      props.setCount(0);
      window.clearTimeout(timer);
      setTimer(undefined);
      setResetClicked(false);
    } else {
      setResetClicked(true);
      setTimer(window.setTimeout(() => setResetClicked(false), 2000));
    }
  }

  return <>
    <button onClick={handleReset}>{resetClicked ? "Really " : ""}Reset</button>
  </>
}
