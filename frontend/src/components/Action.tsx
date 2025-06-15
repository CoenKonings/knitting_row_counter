import './Action.css';
import { useEffect } from "react";

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
  let numCycles: number = Math.floor((totalCount - startCount) / maxCount);
  let rowsUntilAction: number = maxCount - (totalCount - startCount) % maxCount;

  useEffect(() => {
    if (numIterations && numCycles === numIterations) {
      removeAction(id);
    }
  });

  return <>
    <div className='action'>
      <p>{actionName}s: {numCycles} (next in {rowsUntilAction} rows)</p>
      <button className='remove-action-button' onClick={() => removeAction(id)}>Remove</button>
    </div>
  </>
}
