import './ActionManager.css';
import { Action } from './Action.tsx';
import { AddActionForm } from './AddActionForm.tsx';
import { useState, useCallback } from 'react';

interface ActionManagerProps {
  count: number;
}

interface ActionObj {
  name: string;
  count: number;
  startCount: number;
  numIterations: number;
}

export function ActionManager({count}: ActionManagerProps) {
  const [actions, setActions] = useState<ActionObj[]>([]);

  const addAction = useCallback((actionName: string, actionCount: number, numIterations: number) => {
    setActions([...actions, {
      name: actionName,
      count: actionCount,
      startCount: count,
      numIterations: numIterations
    }]);
  }, [actions]);

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

  return <>
    <AddActionForm addAction={addAction} />
    <div className='actions'>
      <h2 className='actions-header'>Actions:</h2>
      { actionComponents.length ? actionComponents : "No actions added yet." }
    </div>
  </>
}
