import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import App from './App';

const Entry = () => {
    return (
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    );
}

export default Entry;
