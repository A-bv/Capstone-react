// Mock reservation API for the Little Lemon capstone.
// Mirrors the official Meta-provided api.js: fetchAPI(date) returns the list
// of available booking times for a given Date, and submitAPI(formData)
// acknowledges a reservation.

export interface BookingFormData {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    occasion: string;
}

const seededRandom = function (seed: number) {
    const m = 2 ** 35 - 31;
    const a = 185852;
    let s = seed % m;
    return function () {
        s = (s * a) % m;
        return s / m;
    };
};

export const fetchAPI = function (date: Date): string[] {
    const result: string[] = [];
    const random = seededRandom(date.getDate());

    for (let i = 17; i <= 23; i++) {
        if (random() < 0.5) {
            result.push(i + ':00');
        }
        if (random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

export const submitAPI = function (formData: BookingFormData): boolean {
    // The mock always succeeds; a real backend would POST formData here.
    return Boolean(formData);
};
