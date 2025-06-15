interface ActionProps {
  totalCount: number;
  maxCount: number;
  actionName: string;
}

interface ActionFormData {
  name: string;
  rowcount: number;
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

export function AddAction() {
  const addActionHandler = ({ name, rowcount }: ActionFormData) => {
    console.log(name);
    console.log(rowcount);
  }

  return <>
    <h2 className="actionFormHeader">Add Action:</h2>
    <form action={addActionHandler}>
      <input type="text" name="name" id="action-name-input" placeholder="Action name" required />
      <input type="number" name="rowcount" id="action-rowcount-input" placeholder="Number of rows" required />
      <input type="submit" value="create action" />
    </form>
  </>
}
