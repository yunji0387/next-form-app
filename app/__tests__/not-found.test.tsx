import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../not-found';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('NotFound', () => {
  const backMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: backMock });
    backMock.mockClear();
  });

  it('renders 404 and OOPS! Page Not Found', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('OOPS! Page Not Found')).toBeInTheDocument();
  });

  it('renders helpful links', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Back')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('calls router.back when Go Back is clicked', () => {
    render(<NotFound />);
    fireEvent.click(screen.getByText('Go Back'));
    expect(backMock).toHaveBeenCalled();
  });
});
