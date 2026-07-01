import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home link', () => {
  // App already provides its own Router, so render it directly
  act(() => {
    render(<App />);
  });

  // Replace "learn react" with actual text from your App component
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
