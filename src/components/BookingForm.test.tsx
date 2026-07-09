import { render, screen, fireEvent } from '@testing-library/react';
import type { Dispatch } from 'react';
import BookingForm from './BookingForm';
import type { TimesAction } from './bookingReducer';
import type { BookingFormData } from '../api';

interface RenderProps {
    dispatch?: Dispatch<TimesAction>;
    submitForm?: (formData: BookingFormData) => boolean;
}

const renderForm = (props: RenderProps = {}) =>
    render(
        <BookingForm
            availableTimes={['17:00', '18:00', '19:00']}
            dispatch={props.dispatch ?? (() => {})}
            submitForm={props.submitForm ?? (() => true)}
        />,
    );

// A date comfortably in the future so past-date validation always passes.
const FUTURE_DATE = '2099-12-25';

describe('BookingForm Component', () => {
    test('renders form elements', () => {
        renderForm();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    });

    test('displays validation messages', () => {
        renderForm();
        fireEvent.blur(screen.getByLabelText(/name/i));
        fireEvent.blur(screen.getByLabelText(/email/i));
        fireEvent.blur(screen.getByLabelText(/choose date/i));

        expect(screen.queryByText(/name is invalid/i)).toBeInTheDocument();
        expect(screen.queryByText(/email is invalid/i)).toBeInTheDocument();
        expect(screen.queryByText(/date is required/i)).toBeInTheDocument();
    });

    test('shows error for invalid number of guests', () => {
        renderForm();
        const guestsInput = screen.getByLabelText(/number of guests/i);

        fireEvent.change(guestsInput, { target: { value: '11' } });
        fireEvent.blur(guestsInput);

        expect(
            screen.queryByText(/number of guests must be between 1 and 10/i),
        ).toBeInTheDocument();
    });

    test('fills out the form correctly', () => {
        renderForm();
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/choose date/i), {
            target: { value: FUTURE_DATE },
        });
        fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '2' } });

        expect(screen.getByLabelText(/name/i)).toHaveValue('John');
        expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
        expect(screen.getByLabelText(/choose date/i)).toHaveValue(FUTURE_DATE);
        expect(screen.getByLabelText(/choose time/i)).toHaveValue('18:00');
        expect(screen.getByLabelText(/number of guests/i)).toHaveValue(2);
    });

    test('calls submitForm with the entered details on a valid submit', () => {
        const submitForm = vi.fn();
        const { container } = renderForm({ submitForm });

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/choose date/i), {
            target: { value: FUTURE_DATE },
        });
        fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '2' } });

        fireEvent.submit(container.querySelector('.booking-form')!);

        expect(submitForm).toHaveBeenCalledTimes(1);
        expect(submitForm).toHaveBeenCalledWith({
            name: 'John',
            email: 'john@example.com',
            date: FUTURE_DATE,
            time: '18:00',
            guests: 2,
            occasion: 'Birthday',
        });
    });

    test('does not submit when required fields are invalid', () => {
        const submitForm = vi.fn();
        const { container } = renderForm({ submitForm });

        fireEvent.submit(container.querySelector('.booking-form')!);

        expect(submitForm).not.toHaveBeenCalled();
        expect(screen.getByText(/name is invalid/i)).toBeInTheDocument();
        expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
        expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    });

    test('does not submit a reservation for a past date', () => {
        const submitForm = vi.fn();
        const { container } = renderForm({ submitForm });

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/choose date/i), {
            target: { value: '2000-01-01' },
        });

        fireEvent.submit(container.querySelector('.booking-form')!);

        expect(submitForm).not.toHaveBeenCalled();
        expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
    });

    test('dispatches UPDATE_TIMES when the date changes', () => {
        const dispatch = vi.fn();
        renderForm({ dispatch });

        fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: FUTURE_DATE } });

        expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date: FUTURE_DATE });
    });
});
