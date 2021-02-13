import create, {
    State,
    GetState,
    SetState
} from 'zustand'
import { Color } from '@material-ui/lab/Alert';


// Actions
export type UpdateAlert = (options: UpdateAlertOptions) => void;
export type ResetAlert = () => void;

// State
export interface AlertState extends State {
    severity: Color;
    message: string;
    updateAlert: UpdateAlert;
    resetAlert: ResetAlert;
}

export interface UpdateAlertOptions {
    severity: Color;
    message: string;
}

const useStore = create<AlertState>((
    set: SetState<AlertState>,
    get: GetState<AlertState>
) : AlertState => ({
    severity: 'success',
    message: '',

    /*
     *
     * Update the alert
     *
     * **/
    updateAlert: (options: UpdateAlertOptions): void => set((state: AlertState) : AlertState => {
        return {
            ...state,
            severity: options.severity,
            message: options.message
        }
    }),

    /*
     *
     * Reset the alert 
     *
     * **/
    resetAlert: (): void => set((state: AlertState) : AlertState => {
        return {
            ...state,
            severity: 'success',
            message: ''
        }
    })
}));

export default useStore;

