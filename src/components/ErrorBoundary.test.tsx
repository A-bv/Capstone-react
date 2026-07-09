import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function Boom(): never {
    throw new Error('boom');
}

test('renders a fallback when a child throws', () => {
    // Error boundaries log the caught error; silence the expected noise.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
        <ErrorBoundary>
            <Boom />
        </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    spy.mockRestore();
});

test('renders children when nothing throws', () => {
    render(
        <ErrorBoundary>
            <p>All good</p>
        </ErrorBoundary>,
    );

    expect(screen.getByText('All good')).toBeInTheDocument();
});
