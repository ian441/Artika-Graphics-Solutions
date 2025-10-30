import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // Check for a common element, like the navigation or a heading
  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();
});
