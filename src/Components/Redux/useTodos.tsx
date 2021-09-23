import { useCallback, useReducer } from "react";

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number }
  | { type: "UPDATE"; id: number };

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

export function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);

      case "UPDATE":
        return state.map((t) =>
          t.id === action.id ? { id: t.id, text: t.text, done: !t.done } : t
        );

      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);

  const updateTodo = useCallback((id: number) => {
    dispatch({
      type: "UPDATE",
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo, updateTodo };
}
