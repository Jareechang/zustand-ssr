import create, {
    GetState,
    SetState
} from 'zustand'

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface AddTodoFn {
    (todo: Todo): TodoState
}

// Maps to the keys within state object
export type TodoStateKeys =  "todos"
    | "addTodo"
    | "increment"
    | "toggleTodoComplete";

// Maps to the values within state object
export type TodoStateValues = Todo[]
    | any 
    | number;

export type TodoState = Record<TodoStateKeys, TodoStateValues>;

const useStore = create<TodoState>(
    (set: SetState<TodoState>, get: GetState<TodoState>) : TodoState => ({
    todos: ([] as Todo[]),
    increment: 1,

    /*
     *
     * Add a todo 
     *
     * **/
    addTodo: (todo: Todo) => set((state: TodoState) : TodoState => {
        return {
            ...state,
            increment: state.increment + 1,
            todos: [...state.todos, todo]
        }
    }),

    /*
     *
     * Toggle the completed state within the todo
     *
     * **/
    toggleTodoComplete: (id: number, checked: boolean) => set((state: TodoState) : TodoState => {
        const todoMap =  (todo: Todo): Todo => {
            if (id === todo.id) {
                todo.completed = checked;
            }
            return todo;
        };
        const newTodos: Todo[] = get().todos.map(todoMap);
        return {
            ...state,
            increment: state.increment + 1,
            todos: newTodos
        }
    })
}));

export default useStore;
