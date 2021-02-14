import React, {
    useEffect
} from 'react';

import MuiAlert from '@material-ui/lab/Alert';

import {css} from '@emotion/css';

import {
    useTodoStore,

    ResetAlert,
    useAlertStore
} from '../../stores';

import {
    CSSVisibility
} from '../../types';

import {
    alertStateSelector,
    getActionType,
    AlertActionTypes
} from '.';

export interface AlertProps {
}

const styles = {
    ToastPlaceholderDiv: css({
        width: 'auto',
        height: '48px',
        visibility: ('hidden' as CSSVisibility)
    })
};

const Alert: React.FC<AlertProps> = (
    props: AlertProps
) => {
    const {
        severity,
        message
    } = useAlertStore(state => ({
        message: state.message,
        severity: state.severity
    }));
    const resetAlert : ResetAlert = useAlertStore(state => state.resetAlert);
    const updateAlert = useAlertStore(state => state.updateAlert);
    const handleAction = React.useCallback((actionType: AlertActionTypes): void => {
        switch (actionType) {
            case AlertActionTypes.TaskCompleted:
                updateAlert({
                    message: 'Task Completed!',
                    severity: 'success'
                });
                break;
            case AlertActionTypes.TaskCompletedUndo:
                updateAlert({
                    message: 'Task Added back the list',
                    severity: 'info'
                });
                break;
            case AlertActionTypes.TaskCompletedAll:
                updateAlert({
                    message: 'Nice! You’ve completed everything 🎉',
                    severity: 'success'
                });
                break;
            case AlertActionTypes.TaskAdded:
                updateAlert({
                    message: 'Task Added to the list',
                    severity: 'info'
                });
                break;
            case AlertActionTypes.TaskRemoved:
                console.log('TODO: implement AlertActionTypes.TaskRemoved');
                break;
            case AlertActionTypes.None:
                resetAlert();
                break;
            default:
                resetAlert();
        }
    }, [resetAlert, updateAlert]);

    useEffect(() => {
        const unsubscribeFromStore = useTodoStore.subscribe((newState: any, prevState: any) => {
            Promise.resolve()
                .then(() => {
                    resetAlert();
                })
                .then(() => {
                    const actionType : AlertActionTypes = getActionType(newState, prevState);
                    setTimeout(() => {
                        handleAction(actionType);
                    }, 500);
                })
        }, alertStateSelector);
        return unsubscribeFromStore;
    }, [
        handleAction,
        resetAlert
    ]);

    return !!message ? (
        <MuiAlert severity={severity}>
            {message}
        </MuiAlert>
    ) : (
        <div className={styles.ToastPlaceholderDiv} />
    );
}

export default Alert;
