import React, {
    MouseEvent,
    useState,
    useEffect
} from 'react';

import {
    Box,
    Grid,
    Input,
    List,
    Checkbox,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    Container,
    Button
} from '@material-ui/core';

import {
    Todo,
    useTodoStore
} from './atoms';

const styles = {
    ListItemTextStyle: (props: {item: Todo}) => ({
        textDecoration: props.item && props.item.completed ? 'line-through' : 'none',
        cursor: 'pointer'
    }),
    Input: {
        width: '275px'
    }
};

const App = () => {
    const [text, setText] = useState<string>('');

    const {
        todos,
        addTodo,
        increment,
        toggleTodoComplete
    } = useTodoStore();

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const handleInputChange = (event: any) => {
        setText(event.target.value);
    }

    const handleSubmit = (event: MouseEvent) => {
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

    const handleToggleCheck = (event: any, id: number) => {
        const checked : boolean = event.target.checked;
        toggleTodoComplete(id, checked);
    }

    const renderTodoListItems = (item: Todo) => {
        const labelId = `checkbox-list-label-${item.id}`;
        return (
            <ListItem key={item.id}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={item.completed}
                        tabIndex={-1}
                        disableRipple
                        onChange={event => handleToggleCheck(event, item.id)}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText
                    id={`${item.id}`}
                    primary={item.title}
                    onClick={_ => handleToggleCheck({
                        target: {
                            checked: !item.completed
                        }
                    }, item.id)}
                    style={styles.ListItemTextStyle({ item })}
                />
            </ListItem>
        );
    }

    return (
        <Container maxWidth="sm">
            <Grid container>
                <Grid
                    item
                    md={12}>
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
                </Grid>
                <Grid item md={12}>
                    <Box py={2}>
                        <Typography variant="h6">Today</Typography>
                        <List>
                            {
                                todos.map(
                                    (todo: Todo) => renderTodoListItems(todo)
                                )
                            }
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
