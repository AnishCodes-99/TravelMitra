import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { FlightSearchForm } from '../features/search/FlightSearchForm';

describe('FlightSearchForm Validation', () => {
  it('renders flight search inputs with defaults and triggers validation', async () => {
    render(
      <BrowserRouter>
        <FlightSearchForm />
      </BrowserRouter>
    );

    const originSelect = screen.getByLabelText(/From \(Origin\)/i);
    const destinationSelect = screen.getByLabelText(/To \(Destination\)/i);
    const submitBtn = screen.getByRole('button', { name: /Search Flights/i });

    expect(originSelect).toBeInTheDocument();
    expect(destinationSelect).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    // Set same origin and destination
    fireEvent.change(originSelect, { target: { value: 'DEL' } });
    fireEvent.change(destinationSelect, { target: { value: 'DEL' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Origin and destination cannot be identical/i)
      ).toBeInTheDocument();
    });
  });
});
