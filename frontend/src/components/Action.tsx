interface ActionProps {
  totalCount: number;
  maxCount: number;
  actionName: string;
}

function Action({ totalCount, maxCount, actionName }: ActionProps) {
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

export default Action;
