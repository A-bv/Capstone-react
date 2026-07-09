import { useState, type ChangeEvent, type Dispatch, type FocusEvent, type FormEvent } from 'react';
import '../styles/bookingform.css';
import type { BookingFormData } from '../api';
import type { TimesAction } from './bookingReducer';

// Local calendar date as YYYY-MM-DD, used to block reservations in the past.
// Built from local date parts (not toISOString) so it is not shifted by the
// timezone offset near midnight.
const todayISO = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
};

interface InputFieldProps {
    label: string;
    id: string;
    name: string;
    type: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    required?: boolean;
    min?: string | number;
    max?: string | number;
    error?: string;
}

const InputField = ({
    label,
    id,
    name,
    type,
    value,
    onChange,
    onBlur,
    required,
    min,
    max,
    error,
}: InputFieldProps) => (
    <div className="form-group">
        <label htmlFor={id}>{label}:</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            min={min}
            max={max}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
            <p id={`${id}-error`} className="error-message" role="alert">
                {error}
            </p>
        )}
    </div>
);

interface SelectFieldProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
    options: string[];
    error?: string;
    emptyLabel?: string;
}

const SelectField = ({
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    options,
    error,
    emptyLabel = 'No options available',
}: SelectFieldProps) => {
    const noOptions = options.length === 0;
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}:</label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
                disabled={noOptions}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : undefined}
            >
                {noOptions ? (
                    <option value="">{emptyLabel}</option>
                ) : (
                    options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                )}
            </select>
            {error && (
                <p id={`${id}-error`} className="error-message" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

type FormErrors = {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: string;
};

interface BookingFormProps {
    availableTimes?: string[];
    dispatch: Dispatch<TimesAction>;
    submitForm: (formData: BookingFormData) => boolean;
}

const BookingForm = ({ availableTimes = [], dispatch, submitForm }: BookingFormProps) => {
    const minDate = todayISO();

    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        date: '',
        time: availableTimes[0] || '', // First available slot
        guests: 1,
        occasion: 'Birthday', // Default occasion
    });

    // The chosen time, clamped to the slots currently on offer. Derived during
    // render (no effect needed): if the stored choice is no longer available —
    // e.g. after the date changed — fall back to the first open slot.
    const selectedTime =
        formData.time && availableTimes.includes(formData.time)
            ? formData.time
            : (availableTimes[0] ?? '');

    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '',
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Validate a single field and return its error message ('' when valid)
    const validateField = (name: string, value: string | number): string => {
        switch (name) {
            case 'name': {
                const namePattern = /^[A-Za-z]{2,}$/; // only letters, at least 2 characters
                return namePattern.test(String(value).trim()) ? '' : 'Name is invalid.';
            }
            case 'email':
                return /\S+@\S+\.\S+/.test(String(value)) ? '' : 'Email is invalid.';
            case 'date': {
                const date = String(value);
                if (date === '') return 'Date is required.';
                if (date < minDate) return 'Date cannot be in the past.';
                return '';
            }
            case 'time':
                return value ? '' : 'Please choose a time.';
            case 'guests': {
                const guests = Number(value);
                return guests < 1 || guests > 10
                    ? 'Number of guests must be between 1 and 10.'
                    : '';
            }
            default:
                return '';
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            date: validateField('date', formData.date),
            time: validateField('time', selectedTime),
            guests: validateField('guests', formData.guests),
        };

        setErrors(newErrors);
        setTouched({ name: true, email: true, date: true, time: true, guests: true });
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = name === 'guests' ? Number(value) : value;

        // Refresh available times when the date changes
        if (name === 'date') {
            dispatch({ type: 'UPDATE_TIMES', date: value });
        }

        setFormData((prev) => ({ ...prev, [name]: newValue }) as BookingFormData);

        // Re-validate on change only once the field has been touched
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            submitForm({ ...formData, time: selectedTime });
        }
    };

    return (
        <section className="booking-form-section">
            <h2>Reservation Form</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
                <InputField
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.name}
                />

                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.email}
                />

                <InputField
                    label="Choose date"
                    id="res-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    min={minDate}
                    error={errors.date}
                />

                <SelectField
                    label="Choose time"
                    id="res-time"
                    name="time"
                    value={selectedTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={availableTimes}
                    error={errors.time}
                    emptyLabel="No times available — choose another date"
                />

                <InputField
                    label="Number of guests"
                    id="guests"
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="1"
                    max="10"
                    required
                    error={errors.guests}
                />

                <SelectField
                    label="Occasion"
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    options={['Birthday', 'Anniversary']}
                />

                <input type="submit" value="Make Your Reservation" className="submit-btn" />
            </form>
        </section>
    );
};

export default BookingForm;
