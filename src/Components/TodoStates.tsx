import React, {
  useCallback,
  useReducer,
  createContext,
  useContext,
  useState,
} from "react";

// type ActionType =
//   | { type: "ADD"; text: string }
//   | { type: "REMOVE"; id: number };

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
});

function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
} {
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    done: false,
    text: "buy groceries",
  });
  const [todos, setTodos] = useState<Todo[]>([todo]);
  const addTodo = (text: string) => {
    return setTodos((prevState) => [
      ...prevState,
      {
        id: todos.length,
        text: text,
        done: false,
      },
    ]);
  };
  const removeTodo = (id: number) => {
    console.log(todos);
    console.log(id);

    return setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (todo: Todo) => {
    const updateTodos = todos.map((t) =>
      t.id === todo.id ? { id: t.id, text: t.text, done: !t.done } : t
    );

    return setTodos(updateTodos);
  };

  return { todos, addTodo, removeTodo, updateTodo };
}

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};

export const useUpdateTodo = (): UseTodosManagerResult["updateTodo"] => {
  const { updateTodo } = useContext(TodoContext);
  return updateTodo;
};
