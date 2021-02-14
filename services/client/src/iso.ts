import * as stores from './stores';
import create from 'zustand';


export const createStores = () : any => {
    let newStoreInstances : any = {};
    newStoreInstances.id = Math.round(Math.random()*100);
    Object.keys(stores).forEach((storeName) => {
        const matchesFactoryFn = !!/create/.test(storeName)
        if (storeName
            && matchesFactoryFn) {
            // @ts-ignore
            const blueprint = stores[storeName];
            const store = create(blueprint);
            const newStoreName = storeName.replace('create', 'use');
            // re-name 'create' to 'use' as client side using the 'use' key word
            newStoreInstances[newStoreName] = store;
        }
    });
    return newStoreInstances;
}
/*
 * Set the store states
 *
 * **/
export const setStoreStates = (
    newStores: any,
    preload: any
): void => {
    if (typeof preload !== 'object') return;

    Object.keys(preload).forEach((storeName) => {
        // @ts-ignore
        const store = newStores[storeName];
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

export const getStoreStates = (
    newStores: any
): any => {
    if (typeof newStores !== 'object') return newStores;
    const storeData = Object.keys(newStores).reduce((acc: any, name: string) => {
        // @ts-ignore
        const store = newStores[name]
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
