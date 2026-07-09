import { fetchAPI } from '../api';

export type TimesAction = { type: 'UPDATE_TIMES'; date: string };

// Available times for today, used as the reducer's initial state.
export const initializeTimes = (): string[] => fetchAPI(new Date());

// Recompute available times whenever the selected date changes.
export const updateTimes = (state: string[], action: TimesAction): string[] => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return fetchAPI(new Date(action.date));
        default:
            return state;
    }
};
