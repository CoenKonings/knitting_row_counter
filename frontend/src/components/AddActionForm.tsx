import './AddActionForm.css';
import { useState } from "react";
import { TextInput, SelectInput } from "./FormElements.tsx";

interface AddActionFormProps {
  addAction(actionName: string, numRowsPerAction: number, startCount: number, numIterations?: number): void;
}

/**
 * The AddAction component functions as a form that allows the user to add new
 * actions.
 */
export function AddActionForm({ addAction }: AddActionFormProps) {
  const [actionName, setActionName] = useState("");
  const [numRowsPerAction, setNumRowsPerAction] = useState(0);
  const [numRowsPerActionInput, setNumRowsPerActionInput] = useState("");
  const [actionIterations, setActionIterations] = useState(0);
  const [actionIterationsInput, setActionIterationsInput] = useState("");
  const [actionStartcountDif, setActionStartCountDif] = useState(0);
  const [actionStartcountDifInput, setActionStartCountDifInput] = useState("-1");

  /**
   * Handle changes in the row count input. Ignore any non-numeric input.
   *
   * @param rowcountInput:  (string) The value in the rowcount input element.
   */
  const handleRowcountChange = (rowcountInput: string) => {
    rowcountInput = rowcountInput.replace(/\D/g,'');
    let rowcount: number = parseInt(rowcountInput);
    rowcount = isNaN(rowcount) ? 0 : rowcount;
    setNumRowsPerAction(rowcount);
    setNumRowsPerActionInput(rowcountInput === "" ? "" : rowcount.toString());
  };

  const handleIterationsChange = (iterationsInput: string) => {
    iterationsInput = iterationsInput.replace(/\D/g,'');
    let iterations: number = parseInt(iterationsInput);
    iterations = isNaN(iterations) ? 0 : iterations;
    setActionIterations(iterations);
    setActionIterationsInput(iterationsInput === "" ? "" : iterations.toString());
  };

  const handleStartcountChange = (startcountInput: string) => {
    // Remove all non-digit characters
    startcountInput = startcountInput.replace(/\D/g, '');
    let startcountDif: number = parseInt(startcountInput);
    setActionStartCountDif(startcountDif < 0 ? 0 : startcountDif);
    setActionStartCountDifInput(startcountInput);
  };

  /**
   * If a name and count were entered before, add a new action via the
   * addAction callback from the props and empty the input fields.
   */
  const handleAddActionClick = () => {
    if (numRowsPerAction === 0 || actionName === "") {
      return;
    }

    addAction(actionName, numRowsPerAction, actionStartcountDif, actionIterations);
    setActionName("");
    setNumRowsPerAction(0);
    setNumRowsPerActionInput("");
    setActionIterations(0);
    setActionStartCountDif(0);
    setActionStartCountDifInput("-1");
    setActionIterationsInput("");
  };

  return <>
    <h2 className="add-action-form-header">Add Action:</h2>
    <div className="add-action-form">
      <TextInput
        name="name"
        id="add-action-name-input"
        placeholder="Name"
        value={actionName}
        onChange={setActionName}
      />
      <TextInput
        name="action-rowcount"
        id="add-action-rowcount-input"
        placeholder="Number of rows per action"
        value={numRowsPerActionInput}
        onChange={handleRowcountChange}
      />
      <SelectInput
        name="action-startcount-diff"
        id="action-startcount-diff-input"
        onChange={handleStartcountChange}
        value={actionStartcountDifInput}
        placeholder={{value: "-1", text: "First row to perform action"}}
        options={[
          {value: "0", text: "Current row"},
          {value: `${numRowsPerAction - 1}`, text:`After ${numRowsPerAction - 1} rows`}
        ]}
        renderElement = {numRowsPerAction - 1 > 1}
      />
      <TextInput
        name="action-iterations"
        id="add-action-iterations-input"
        placeholder="Amount of times to perform this action"
        value={actionIterationsInput}
        onChange={handleIterationsChange}
      />
      <button type="submit" onClick={() => {handleAddActionClick()}}>Add action</button>
    </div>
  </>
}
