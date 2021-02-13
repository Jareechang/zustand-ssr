import {
    AlertActionTypes
} from '.';

import {
    TodoState
} from '../../stores';

export const alertStateSelector = (state: TodoState) : any => {
    return {
        todos: state.todos,
        completed: state.todos.filter(todo => todo.completed)
    }
};

export const getActionType = (newState: any, prevState: any): AlertActionTypes => {
    if (newState.completed < prevState.completed) {
        return AlertActionTypes.TaskCompletedUndo;
    }

    if (newState.completed.length === newState.todos.length) {
        return AlertActionTypes.TaskCompletedAll;
    }

    if (newState.completed > prevState.completed) {
        return AlertActionTypes.TaskCompleted;
    }

    if (newState.todos > prevState.todos) {
        return AlertActionTypes.TaskAdded;
    }

    return AlertActionTypes.None;
}
