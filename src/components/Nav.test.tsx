import { createRef } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';

const renderNav = () =>
    render(
        <MemoryRouter>
            <Nav aboutUsRef={createRef<HTMLDivElement>()} />
        </MemoryRouter>,
    );

describe('Nav', () => {
    test('renders the navigation items', () => {
        renderNav();
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /booking/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
    });

    test('opens and closes the contact dialog', () => {
        renderNav();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /contact/i }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/contact details/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});
