import * as stores from './stores';

/*
 * Set the store states
 *
 * **/
export const setStoreStates = (preload: any): void => {
    if (typeof preload !== 'object') return;

    Object.keys(preload).forEach((storeName) => {
        // @ts-ignore
        const store = stores[storeName];
        const storePreload = preload[storeName];
        if (store && store.setState) {
            store.setState(storePreload)
        } else {
            console.warn(
                `${storeName} not found. Please define it and export it in stores/index.ts`
            );
        }
    });
}

export const getStoreStates = (preload: any): any => {
    const storeData = Object.keys(stores).reduce((acc: any, name: string) => {
        // @ts-ignore
        const store = stores[name]
        if (store && store.getState) {
            const storeState = store.getState()
            acc[name] = storeState
        }
        return acc
    }, {})

    return storeData;
}

// XSS vuln handling

const escapedLT = ';lt'
const escapedGT = ';gt'
const escapedAmp = '&amp'
const LT = '<'
const GT = '>'
const AMP = '&'

export const serialize = (payload: string) : string => {
    if (typeof payload !== 'string') return payload;
    return payload
        .replace(new RegExp(LT), escapedLT)
        .replace(new RegExp(GT), escapedGT)
        .replace(new RegExp(AMP), escapedAmp)
}

export const deserialize = (payload: string): string => {
    if (typeof payload !== 'string') return payload;
    return payload
        .replace(escapedLT, LT)
        .replace(escapedGT, GT)
        .replace(escapedAmp, AMP)
}
