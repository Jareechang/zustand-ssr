import React, {
    useEffect
} from 'react';

import {
    Box,
    Grid,
    List,
    Divider,
    Checkbox,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    Container
} from '@material-ui/core';

import {
    Alert,
    TodoInput,
    TodoStats
} from './components';

import {
    // Todo - Types
    Todo,
    ToggleTodoComplete,
    // Todo - Store
    useTodoStore,
} from './stores';

const styles = {
    ListItemTextStyle: (props: {item: Todo}) => ({
        textDecoration: props.item && props.item.completed ? 'line-through' : 'none',
        cursor: 'pointer'
    })
};

const App = () => {
    const todos : Todo[] = useTodoStore(state => state.todos);
    const toggleTodoComplete : ToggleTodoComplete = useTodoStore(state => state.toggleTodoComplete);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

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
            <Box py={2}>
                <Alert />
                <Grid container>
                    <Grid item md={12}>
                        <Box py={2} style={{ minHeight: '300px' }}>
                            <Box py={2}>
                                <Typography variant="h6">Today</Typography>
                            </Box>
                            <Divider />
                            <List>
                                {
                                    todos.map(
                                        (todo: Todo) => renderTodoListItems(todo)
                                    )
                                }
                            </List>
                        </Box>
                    </Grid>
                    <Grid item md={12}>
                        <TodoStats />
                        <TodoInput />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;
