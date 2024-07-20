import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { act } from 'react'; // Update import for `act`

test('renders home link', () => {
  act(() => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  // Replace "learn react" with actual text from your App component
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
