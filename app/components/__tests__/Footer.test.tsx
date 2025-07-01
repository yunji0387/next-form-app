import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the footer with current year and text', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Next Admin.`, { exact: false })).toBeInTheDocument();
  });
});