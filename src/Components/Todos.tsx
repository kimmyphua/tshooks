import React, { useCallback, useRef } from "react";
import {
  useTodos,
  useAddTodo,
  useRemoveTodo,
  useUpdateTodo,
  TodosProvider,
} from "./TodoStates";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      padding: "0.2rem",
      fontWeight: "bold",
      color: "tomato",
    }}
  >
    {children}
  </div>
);

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "tomato",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLOListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ol>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ol>
  );
}

function Todos() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();
  const updateTodo = useUpdateTodo();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  //   const onAddTodo = () => {
  //     if (newTodoRef.current) {
  //       addTodo(newTodoRef.current.value);
  //       newTodoRef.current.value = "";
  //     }
  //   }

  return (
    <div>
      <Heading title="Todo List" />
      <Box>Hello there. Plase complete these tasks! </Box>

      <Heading title="Todos" />
      <UL
        items={todos}
        itemClick={() => {}}
        render={(todo) => (
          <>
            {todo.text}
            <br />
            <button onClick={() => updateTodo(todo)}>
              {todo.done ? "done" : "not done"}
            </button>
            <button onClick={() => removeTodo(todo.id)}> X </button>
          </>
        )}
      />
      <div>
        <input type="text" placeholder="i need to ... " ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}

const JustShowTodos = () => {
  const todos = useTodos();
  const updateTodo = useUpdateTodo();
  return (
    <UL
      items={todos}
      itemClick={(todo) => updateTodo(todo)}
      render={(todo) => (
        <span
          style={{ textDecorationLine: todo.done ? "line-through" : "none" }}
        >
          {todo.text}
        </span>
      )}
    />
  );
};

const TodosWrapper = () => (
  <TodosProvider
    initialTodos={[{ id: 0, text: "Hey there useContext", done: false }]}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <Todos />
      <div
        style={{
          paddingTop: ".2em",
          border: "1px solid tomato",
        }}
      >
        <JustShowTodos />
      </div>
    </div>
  </TodosProvider>
);

export default TodosWrapper;
