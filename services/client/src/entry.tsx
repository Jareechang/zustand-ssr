import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import App from './App';

import * as stores from './stores';

import * as iso from './iso';

const initStore = () => {
    const isSSR = typeof window === 'undefined';
    if (isSSR) {
        const serverProps = App.getServerProps();
        iso.setStoreStates(serverProps);
    } else {
        try {
            // @ts-ignore
            const selector : string = `[data-preload-key=${window.__StoreKey__}]`;
            const element = document.querySelector(selector);
            const rawData = element?.innerHTML;
            if (rawData) {
                const JSONData = JSON.parse(iso.deserialize(rawData));
                iso.setStoreStates(JSONData);
            }
        } catch (ex) {
            console.warn('Failed to get preload.');
        }
    }
}

const Entry = () => {
    return (
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    );
}

Entry.initStore = initStore;

export default Entry;
