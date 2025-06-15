import './Action.css';

interface ActionProps {
  id: number;
  totalCount: number;
  startCount: number;
  maxCount: number;
  actionName: string;
  numIterations: number;
  removeAction(index: number): void;
}

/**
 * The Action component is used to track actions that should be performed every
 * x rows, showing a countdown (in rows) to moment it should be performed.
 */
export function Action({ id, totalCount, startCount, maxCount, actionName, numIterations, removeAction }: ActionProps) {
  const numCompleted: number = Math.floor((totalCount - startCount) / maxCount);
  const rowsUntilAction: number = maxCount - (totalCount - startCount) % maxCount;

  return <>
    <div className='action'>
      <p>{actionName}s: {numCompleted} (next in {rowsUntilAction} rows, {numIterations - numCompleted} left)</p>
      <button className='remove-action-button' onClick={() => removeAction(id)}>Remove</button>
    </div>
  </>
}
