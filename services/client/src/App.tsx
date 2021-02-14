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
    useTheme,
    Theme
} from '@material-ui/core/styles';

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

import {css} from '@emotion/css';

const styles = {
    ListItemTextStyle: (props: {item: Todo}) => css({
        textDecoration: props.item && props.item.completed
        ? 'line-through'
        : 'none',
        cursor: 'pointer'
    }),
    ListBox: (props: { theme: Theme }) => css({
        minHeight: '300px',
        [props.theme.breakpoints.down('xs')]: {
            height: '350px',
            width: '100%'
        }
    })
};

const App = () => {
    const todos : Todo[] = useTodoStore(state => state.todos);
    const hasTodos : boolean = useTodoStore(state => state.todos.length > 0);
    const toggleTodoComplete : ToggleTodoComplete = useTodoStore(state => state.toggleTodoComplete);
    const theme = useTheme();

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
                    className={styles.ListItemTextStyle({ item })}
                    primary={item.title}
                    onClick={_ => handleToggleCheck({
                        target: {
                            checked: !item.completed
                        }
                    }, item.id)}
                />
            </ListItem>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box py={2}>
                <Alert />
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <Box py={2} className={styles.ListBox({ theme })}>
                            <Box py={2}>
                                <Grid container>
                                <Grid item md={8} xs={12}>
                                    <Typography variant="h6">Today</Typography>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TodoStats />
                                </Grid>
                                </Grid>
                            </Box>
                            <Divider />
                            {!hasTodos && (
                                <Box
                                    pt={3}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start">
                                    <Typography variant="body1">No tasks today. Your day is free.</Typography>
                                </Box>
                            )}
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
                        <TodoInput />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

/*
 *
 * Fetch data for preloading
 *
 * **/
App.getServerProps = () : any => {
    return ({
        useTodoStore: {
            todos: [
                {
                    id: 0,
                    title: 'Walk the dog',
                    completed: false
                },
                {
                    id: 1,
                    title: 'Go to the grocery store',
                    completed: false
                },
            ]
        }
    } as any);
}

export default App;
