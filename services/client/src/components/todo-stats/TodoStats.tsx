import React from 'react';

import {
    Box,
    Typography
} from '@material-ui/core';

import {
    useTodoStore
} from '../../stores';

export interface TodoStatsProps {}

const TodoStats: React.FC<TodoStatsProps> = (
    props: TodoStatsProps
) => {
    const {
        numberOfTodos,
        numberOfCompletedTodos
    } = useTodoStore(state => ({
        numberOfTodos: state.todos.length,
        numberOfCompletedTodos: state.todos.filter(todo => todo.completed).length
    }));
    if (numberOfTodos === 0) return null;
    return (
        <Box
            py={1}
            display="flex"
            flexDirection="column"
            alignItems="flex-end">
            <Typography variant="caption">
                <b>Completed:</b> {numberOfCompletedTodos} / {numberOfTodos}
            </Typography>
        </Box>
    );
}

export default TodoStats;
