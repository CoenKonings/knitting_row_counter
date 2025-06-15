import './Action.css';
import { useState, useEffect } from "react";
import React from "react";

interface ActionProps {
  id: number;
  totalCount: number;
  startCount: number;
  maxCount: number;
  actionName: string;
  numIterations: number;
  removeAction(index: number): void;
}

interface AddActionProps {
  addAction(actionName: string, actionCount: number, numIterations?: number): void;
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

/**
 * The AddAction component functions as a form that allows the user to add new
 * actions.
 */
export function AddActionForm({ addAction }: AddActionProps) {
  const [actionName, setActionName] = useState("");
  const [actionCount, setActionCount] = useState(0);
  const [actionCountInput, setActionCountInput] = useState("");
  const [actionIterations, setActionIterations] = useState(0);
  const [actionIterationsInput, setActionIterationsInput] = useState("");

  /**
   * Handle changes in the row count input. Ignore any non-numeric input.
   *
   * @param rowcountInput:  (string) The value in the rowcount input element.
   */
  const handleRowcountChange = (rowcountInput: string) => {
    rowcountInput = rowcountInput.replace(/\D/g,'');
    let rowcount: number = parseInt(rowcountInput);
    rowcount = isNaN(rowcount) ? 0 : rowcount;
    setActionCount(rowcount);
    setActionCountInput(rowcountInput === "" ? "" : rowcount.toString());
  };

  const handleIterationsChange = (iterationsInput: string) => {
    iterationsInput = iterationsInput.replace(/\D/g,'');
    let iterations: number = parseInt(iterationsInput);
    iterations = isNaN(iterations) ? 0 : iterations;
    setActionIterations(iterations);
    setActionIterationsInput(iterationsInput === "" ? "" : iterations.toString());
  };

  /**
   * If a name and count were entered before, add a new action via the
   * addAction callback from the props and empty the input fields.
   */
  const handleAddActionClick = () => {
    if (actionCount === 0 || actionName === "") {
      return;
    }

    addAction(actionName, actionCount, actionIterations);
    setActionName("");
    setActionCount(0);
    setActionCountInput("");
    setActionIterations(0);
    setActionIterationsInput("");
  };

  return <>
    <h2 className="add-action-form-header">Add Action:</h2>
    <div className="add-action-form">
      <input
        type="text"
        name="name"
        id="add-action-name-input"
        placeholder="Name"
        value={actionName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActionName(e.target.value)}
      />
      <input
        type="text"
        name="action-rowcount"
        id="add-action-rowcount-input"
        placeholder="Number of rows per action"
        value={actionCountInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRowcountChange(e.target.value)}
      />
      <input
        type="text"
        name="action-iterations"
        id="add-action-iterations-input"
        placeholder="Amount of times to perform this action"
        value={actionIterationsInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIterationsChange(e.target.value)}
      />
      <button type="submit" onClick={() => {handleAddActionClick()}}>Add action</button>
    </div>
  </>
}
