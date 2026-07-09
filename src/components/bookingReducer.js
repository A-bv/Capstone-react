import { fetchAPI } from '../api';

// Available times for today, used as the reducer's initial state.
export const initializeTimes = () => fetchAPI(new Date());

// Recompute available times whenever the selected date changes.
export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return fetchAPI(new Date(action.date));
        default:
            return state;
    }
};
