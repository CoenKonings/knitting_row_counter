import { useState } from "react";
import React from "react";

interface ActionProps {
  totalCount: number;
  maxCount: number;
  actionName: string;
}

interface AddActionProps {
  addAction(actionName: string, actionCount: number): void;
}

export function Action({ totalCount, maxCount, actionName }: ActionProps) {
  let numCycles: number = Math.floor(totalCount / maxCount);
  let rowsUntilAction: number = maxCount - totalCount % maxCount;

  return <>
    <div>
      <p>
        Number of {actionName}s: {numCycles}
      </p>
      <p>Time until next {actionName}: {rowsUntilAction}</p>
    </div>
  </>
}

export function AddAction({ addAction }: AddActionProps) {
  const [actionName, setActionName] = useState("");
  const [actionCount, setActionCount] = useState(0);
  const [actionCountInput, setActionCountInput] = useState("");

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

  const handleAddActionClick = () => {
    if (actionCount === 0 || actionName === "") {
      return;
    }

    addAction(actionName, actionCount);
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
