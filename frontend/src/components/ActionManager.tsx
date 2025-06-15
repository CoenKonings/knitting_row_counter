import './ActionManager.css';
import { Action } from './Action.tsx';
import { AddActionForm } from './AddActionForm.tsx';
import type { ActionObj } from './RowCounter.tsx';

interface ActionManagerProps {
  count: number;
  actions: ActionObj[];
  addAction(actionName: string, actionCount: number, numIterations: number): void;
  removeAction(index: number): void;
}

export function ActionManager({ count, actions, addAction, removeAction }: ActionManagerProps) {
  const actionComponents = actions.map((action, index) => (
    <Action
      key={index}
      id={index}
      totalCount={count}
      maxCount={action.maxCount}
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
