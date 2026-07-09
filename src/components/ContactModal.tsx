import { useEffect, useRef } from 'react';
import '../styles/contactmodal.css';

interface ContactModalProps {
    onClose: () => void;
}

function ContactModal({ onClose }: ContactModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dialog = modalRef.current;
        const overlay = overlayRef.current;
        if (!dialog || !overlay) return;

        // Remember what had focus so we can restore it when the dialog closes.
        const previouslyFocused = document.activeElement;

        const focusableSelector =
            'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key !== 'Tab') return;
            // Trap Tab focus inside the dialog.
            const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
            if (focusable.length === 0) {
                e.preventDefault();
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        // Close when the backdrop itself is clicked. Attached here rather than as
        // a JSX onClick because the backdrop is a mouse-only affordance —
        // keyboard users dismiss with Escape or the Close button.
        const handleOverlayClick = (e: MouseEvent) => {
            if (e.target === overlay) onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        overlay.addEventListener('click', handleOverlayClick);
        dialog.focus(); // move focus into the dialog when it opens

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            overlay.removeEventListener('click', handleOverlayClick);
            // Return focus to whatever opened the dialog.
            if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
        };
    }, [onClose]);

    return (
        <div className="modal-overlay" ref={overlayRef}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                ref={modalRef}
                tabIndex={-1}
            >
                <h2 id="contact-modal-title">Contact Details</h2>
                <p>Email: contact@littlelemon.com</p>
                <p>Phone: +1-123-456-7890</p>
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default ContactModal;
