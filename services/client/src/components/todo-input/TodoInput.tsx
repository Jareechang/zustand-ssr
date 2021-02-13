import React, {
    MouseEvent,
    useState
} from 'react';

import {
    Box,
    Input,
    Button
} from '@material-ui/core';

import {
    ResetAlert,
    useAlertStore,

    Todo,
    IdIncrement,
    UpdateAlert,
    AddTodo,
    useTodoStore
} from '../../stores';

export interface TodoInputProps {}
const styles = {
    Input: {
        width: '375px'
    }
};


const TodoInput: React.FC<TodoInputProps> = (
    props: TodoInputProps
) => {
    const [text, setText] = useState<string>('');
    const increment : IdIncrement = useTodoStore(state => state.idIncrement);
    const addTodo : AddTodo = useTodoStore(state => state.addTodo);
    const resetAlert : ResetAlert = useAlertStore(state => state.resetAlert);
    const updateAlert : UpdateAlert = useAlertStore(state => state.updateAlert);

    const handleInputChange = (event: any) => {
        resetAlert()
        setText(event.target.value);
    }

    const handleSubmit = (event: MouseEvent) => {
        if (!text) {
            updateAlert({
                severity: 'error',
                message: 'You must enter a title for the task'
            });
            return;
        }
        const newTodo : Todo = {
            id: increment,
            title: text,
            completed: false
        };
        addTodo(newTodo);
        setText('');
    };

    const handleInputKeyPress = (event: any) => {
        if (event.code === 'Enter') {
            handleSubmit(event);
        }
    }

    return (
        <Box
            py={3}
            display="flex" 
            justifyContent="center">
            <Box
                pr={5}
                display="inline-block">
                <Input
                    style={styles.Input}
                    fullWidth
                    value={text}
                    onKeyPress={handleInputKeyPress}
                    onChange={handleInputChange}
                />
            </Box>
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary">
                Add To List
            </Button>
        </Box>
    );
}

export default TodoInput;
