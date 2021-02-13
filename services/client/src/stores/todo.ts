import create, {
    State,
    GetState,
    SetState
} from 'zustand'

// Data
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
export type IdIncrement = number;

// Actions
export type AddTodo = (todo: Todo) => void;
export type ToggleTodoComplete = (id: number, checked: boolean) => void;

// State
export interface TodoState extends State {
    todos: Todo[];
    idIncrement: IdIncrement;
    addTodo: AddTodo;
    toggleTodoComplete: ToggleTodoComplete;
}

const useStore = create<TodoState>((
    set: SetState<TodoState>,
    get: GetState<TodoState>
) : TodoState => ({

    todos: [],

    idIncrement: 1,

    /*
     *
     * Add a todo 
     *
     * **/
    addTodo: (todo: Todo): void => set((state: TodoState) : TodoState => {
        return {
            ...state,
            idIncrement: state.idIncrement  + 1,
            todos: [...state.todos, todo]
        }
    }),

    /*
     *
     * Toggle the completed state within the todo
     *
     * **/
    toggleTodoComplete: (id: number, checked: boolean) : void => set((state: TodoState) : TodoState => {
        const todoMap =  (todo: Todo): Todo => {
            if (id === todo.id) {
                todo.completed = checked;
            }
            return todo;
        };
        const newTodos: Todo[] = state.todos.map(todoMap);
        return {
            ...state,
            increment: state.idIncrement + 1,
            todos: newTodos
        }
    })
}));

export default useStore;
