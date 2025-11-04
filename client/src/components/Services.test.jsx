import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Services from './Services';
import { createBooking } from '../services/api';

// Mock the API service
jest.mock('../services/api', () => ({
  createBooking: jest.fn(),
}));

describe('Services Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders Services component', () => {
    render(<Services />);
    expect(screen.getByText('Creative Design Services')).toBeInTheDocument();
  });

  test('opens booking form when "Get Started" button is clicked', () => {
    render(<Services />);
    const getStartedButton = screen.getByRole('button', { name: /get started.*rocket/i }); // Hero section button with rocket icon
    fireEvent.click(getStartedButton);
    expect(screen.getByText('Book a Service')).toBeInTheDocument();
  });

  test('opens booking form when "Book Now" button is clicked', () => {
    render(<Services />);
    const bookNowButton = screen.getByText('Book Now');
    fireEvent.click(bookNowButton);
    expect(screen.getByText('Book a Service')).toBeInTheDocument();
  });

  test('closes booking form when close button is clicked', () => {
    render(<Services />);
    const getStartedButton = screen.getByRole('button', { name: /get started.*rocket/i }); // Hero section button with rocket icon
    fireEvent.click(getStartedButton);
    expect(screen.getByText('Book a Service')).toBeInTheDocument();

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Book a Service')).not.toBeInTheDocument();
  });

  test('submits booking form successfully', async () => {
    createBooking.mockResolvedValueOnce({ success: true });

    render(<Services />);
    const getStartedButton = screen.getByRole('button', { name: /get started.*rocket/i }); // Hero section button with rocket icon
    fireEvent.click(getStartedButton);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Service Type'), { target: { value: 'Brand Design' } });
    fireEvent.change(screen.getByLabelText('Preferred Date'), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } });

    const submitButton = screen.getByText('Submit Booking');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createBooking).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        service: 'Brand Design',
        date: '2024-12-31',
        message: 'Test message'
      });
    });

    // Check if alert was called (we can't easily mock window.alert, but we can check the form is reset)
    expect(screen.getByLabelText('Name').value).toBe('');
  });

  test('handles booking submission error', async () => {
    createBooking.mockRejectedValueOnce(new Error('Submission failed'));

    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Services />);
    const getStartedButton = screen.getByRole('button', { name: /get started.*rocket/i }); // Hero section button with rocket icon
    fireEvent.click(getStartedButton);

    // Fill out the form minimally
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Service Type'), { target: { value: 'Brand Design' } });
    fireEvent.change(screen.getByLabelText('Preferred Date'), { target: { value: '2024-12-31' } });

    const submitButton = screen.getByText('Submit Booking');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Failed to submit booking. Please try again.');
    });

    alertMock.mockRestore();
  });

  test('renders all service categories', () => {
    render(<Services />);
    expect(screen.getByRole('heading', { name: 'Brand Design' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'UI/UX Design' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Illustration' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Print Design' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Motion Graphics' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Social Media Design' })).toBeInTheDocument();
  });

  test('renders pricing tiers', () => {
    render(<Services />);
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  test('filters services based on category selection', () => {
    render(<Services />);
    const brandingButton = screen.getByText('Branding');
    fireEvent.click(brandingButton);

    expect(screen.getByText('Brand Design')).toBeInTheDocument();
    expect(screen.queryByText('UI/UX Design')).not.toBeInTheDocument();
  });
});
