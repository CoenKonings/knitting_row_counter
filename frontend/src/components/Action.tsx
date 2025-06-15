import './Action.css';
import { useState } from "react";
import React from "react";

interface ActionProps {
  id: number;
  totalCount: number;
  startCount: number;
  maxCount: number;
  actionName: string;
  removeAction(index: number): void;
}

interface AddActionProps {
  addAction(actionName: string, actionCount: number): void;
}

/**
 * The Action component is used to track actions that should be performed every
 * x rows, showing a countdown (in rows) to moment it should be performed.
 */
export function Action({ id, totalCount, startCount, maxCount, actionName, removeAction }: ActionProps) {
  let numCycles: number = Math.floor((totalCount - startCount) / maxCount);
  let rowsUntilAction: number = maxCount - (totalCount - startCount) % maxCount;

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
export function AddAction({ addAction }: AddActionProps) {
  const [actionName, setActionName] = useState("");
  const [actionCount, setActionCount] = useState(0);
  const [actionCountInput, setActionCountInput] = useState("");

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

    if (rowcountInput === "") {
      setActionCountInput("");
    } else {
      setActionCountInput(rowcount.toString());
    }
  }

  /**
   * If a name and count were entered before, add a new action via the
   * addAction callback from the props and empty the input fields.
   */
  const handleAddActionClick = () => {
    if (actionCount === 0 || actionName === "") {
      return;
    }

    addAction(actionName, actionCount);
    setActionName("");
    setActionCount(0);
    setActionCountInput("");
  }

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
        placeholder="Number of rows"
        value={actionCountInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRowcountChange(e.target.value)}
      />
      <button type="submit" onClick={() => {handleAddActionClick()}}>Add action</button>
    </div>
  </>
}
