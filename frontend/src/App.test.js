import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hotel booking portal heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Hotel Booking Portal/i);
  expect(headingElement).toBeInTheDocument();
});
