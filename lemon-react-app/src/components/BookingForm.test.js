
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  beforeEach(() => {
    render(<BookingForm />);
  });

  test('renders form elements', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  });

  /*
  test('displays validation messages', () => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const dateInput = screen.getByLabelText(/choose date/i);

    fireEvent.blur(nameInput);
    fireEvent.blur(emailInput);
    fireEvent.blur(dateInput);

    expect(screen.queryByText(/name is invalid/i)).toBeInTheDocument();
    expect(screen.queryByText(/email is invalid/i)).toBeInTheDocument();
    expect(screen.queryByText(/date is required/i)).toBeInTheDocument();
  });*/

  /*
  test('shows error for invalid number of guests', () => {
    const guestsInput = screen.getByLabelText(/number of guests/i);

    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);

    expect(screen.queryByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
  });
*/

  test('fills out the form correctly', () => {
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2023-12-25' } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '2' } });

    // Submit form if necessary
  });
});
