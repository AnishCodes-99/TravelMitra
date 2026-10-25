import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('TravelMitra Frontend Core Integration', () => {
  it('renders TravelMitra branding and main navigation links', () => {
    render(<App />);

    expect(screen.getByText(/Travel/i)).toBeInTheDocument();
    expect(screen.getByText(/Mitra/i)).toBeInTheDocument();
    expect(screen.getByText(/Flights/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotels/i)).toBeInTheDocument();
    expect(screen.getByText(/Holiday Packages/i)).toBeInTheDocument();
  });

  it('renders the search flight button and Indian currency markers', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /Search Flights/i })).toBeInTheDocument();
    expect(screen.getByText(/INR \(₹\)/i)).toBeInTheDocument();
  });
});
