import './ActionTodoList.css';
import { useState } from "react";

interface TodoObj {
  name: string;
  key: string;
}

interface ActionTodoListProps {
  todos: TodoObj[];
}

export function ActionTodoList({ todos }: ActionTodoListProps) {
  const todoItems = todos.map((todo) => (
    <ActionTodoItem
      name={todo.name}
      key={todo.key}
    />
  ));

  return <>
    <ul className="action-todo-list">
      {todoItems}
    </ul>
  </>
}

function ActionTodoItem({ name }: TodoObj) {
  const [done, setDone] = useState(false);

  const toggleDone = () => {
    setDone((done) => !done);
  }

  return <>
    <li
      onClick={ () => toggleDone() }
      className={done ? 'action-todo done' : 'action-todo'}
    ><input type="checkbox" name="done" id={name+"-done-checkbox"} checked={done} />{name}</li>
  </>
}
