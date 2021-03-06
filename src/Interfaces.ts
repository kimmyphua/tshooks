export interface ITask {
    taskName: string;
    deadline: number;
  }

export interface ITodo {
    id?: number
    title?: string
    description?: string
    status?: boolean
  }
  
export type ContextType = {
    todos: ITodo[]
    saveTodo: (todo: ITodo) => void
    updateTodo: (id: number) => void
  }
  