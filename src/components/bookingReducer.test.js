import { initializeTimes, updateTimes } from './Booking';

describe('Booking times reducer', () => {
    test('initializeTimes returns a non-empty list of available times', () => {
        const times = initializeTimes();
        expect(Array.isArray(times)).toBe(true);
        expect(times.length).toBeGreaterThan(0);
    });

    test('updateTimes returns available times for the selected date', () => {
        const result = updateTimes([], { type: 'UPDATE_TIMES', date: '2024-12-25' });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('updateTimes returns the current state for an unknown action', () => {
        const state = ['17:00', '18:00'];
        expect(updateTimes(state, { type: 'UNKNOWN' })).toBe(state);
    });
});
