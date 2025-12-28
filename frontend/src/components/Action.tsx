import './Action.css';

interface ActionProps {
  id: number;
  currentCount: number;
  startCount: number;
  numRowsPerAction: number;
  actionName: string;
  numIterations: number;
  removeAction(index: number): void;
}

/**
 * The Action component is used to track actions that should be performed every
 * x rows, showing a countdown (in rows) to moment it should be performed.
 */
export function Action({ id, currentCount, startCount, numRowsPerAction, actionName, numIterations, removeAction }: ActionProps) {
  const numCompleted: number = Math.floor((currentCount - startCount) / numRowsPerAction) + 1;
  const rowsUntilAction: number = startCount > currentCount ? startCount - currentCount : numRowsPerAction - (currentCount - startCount) % numRowsPerAction;

  return <>
    <div className='action'>
      <p>{actionName}s: {numCompleted < 0 ? 0 : numCompleted} (next in {rowsUntilAction} rows, {numIterations - numCompleted} left)</p>
      <button className='remove-action-button' onClick={() => removeAction(id)}>Remove</button>
    </div>
  </>
}
