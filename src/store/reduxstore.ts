import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

interface User {
    
    name: string;
    age: number;
    email: string;
  }

interface TodosSliceState {
  todos: Todo[];
}

const initialState: TodosSliceState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: state.todos.length,
          text: action.payload,
          done: false,
        },
      ];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<number>) => {
        state.todos = state.todos.map((t) =>
                  t.id === action.payload ? { id: t.id, text: t.text, done: !t.done } : t
                );
  },
}});
const initialStateValue = { name: "", age: 0, email: "" };

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
      login: (state, action) => {
        state.value = action.payload;
      },
  
      logout: (state) => {
        state.value = initialStateValue;
      },
    },
  });


export const themeSlice = createSlice({
    name: "theme",
    initialState: { value: "" },
    reducers: {
      changeColor: (state, action) => {
        state.value = action.payload;
      },
    },
  });

export const { login, logout } = userSlice.actions;
export const { changeColor } = themeSlice.actions;
export const { addTodo, removeTodo,updateTodo } = todosSlice.actions;

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    user: userSlice.reducer,
    theme : themeSlice.reducer
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectUser = (state: RootState) => state.user.value;
export const selecColor = (state: RootState) => state.theme.value

export default store;