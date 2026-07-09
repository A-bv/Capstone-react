import React from 'react';

// Catches render-time errors in the tree below it and shows a fallback
// instead of a blank page. Error boundaries must be class components.
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // A real app would report this to an error-tracking service.
        console.error('Unhandled UI error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div role="alert" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                    <h1>Something went wrong</h1>
                    <p>An unexpected error occurred. Reloading usually fixes it.</p>
                    <button type="button" onClick={() => window.location.reload()}>
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
