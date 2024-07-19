import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  
  beforeEach(() => {
    render(<BookingForm />);
  });

  test('renders form elements', () => {
    // Check if form elements are rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  });

  test('displays validation messages', () => {
    // Validate error messages
    expect(screen.getByText(/name is invalid/i)).toBeInTheDocument();
    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
  });

  test('shows error for invalid number of guests', () => {
    // Simulate invalid guest number and check error
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '11' } });
    expect(screen.getByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
  });

  test('fills out the form correctly', () => {
    // Fill out the form correctly
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    // Continue with other valid inputs if necessary
  });

});
