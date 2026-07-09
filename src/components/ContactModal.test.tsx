import { render, screen, fireEvent } from '@testing-library/react';
import ContactModal from './ContactModal';

describe('ContactModal', () => {
    test('renders as an accessible dialog with the contact details', () => {
        render(<ContactModal onClose={() => {}} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(screen.getByText(/contact details/i)).toBeInTheDocument();
    });

    test('calls onClose when the Close button is clicked', () => {
        const onClose = vi.fn();
        render(<ContactModal onClose={onClose} />);
        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when Escape is pressed', () => {
        const onClose = vi.fn();
        render(<ContactModal onClose={onClose} />);
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('closes on a backdrop click but not on a click inside the dialog', () => {
        const onClose = vi.fn();
        const { container } = render(<ContactModal onClose={onClose} />);

        fireEvent.click(screen.getByRole('dialog'));
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.click(container.querySelector('.modal-overlay')!);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
