import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <Router>
      <App /> {/* Wrap App in Router */}
    </Router>
  );

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});