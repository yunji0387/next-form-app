import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn()
}));
jest.mock('../components/Footer', () => {
  const MockFooter = () => <div data-testid="footer" />;
  MockFooter.displayName = 'Footer';
  return MockFooter;
});
jest.mock('../../public/skillsIconList', () => ({
  skillsIconList: [
    { icon: '/icon1.svg', title: 'Icon1' },
    { icon: '/icon2.svg', title: 'Icon2' }
  ]
}));

describe('Home page', () => {
  const pushMock = jest.fn();
  const verifyMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useAuth as jest.Mock).mockReturnValue({ verify: verifyMock });
    pushMock.mockClear();
    verifyMock.mockClear();
  });

  it('renders main UI elements', () => {
    render(<Home />);
    expect(screen.getByText('Elevate Your Efficiency')).toBeInTheDocument();
    expect(screen.getByText('Our Features')).toBeInTheDocument();
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Form Management')).toBeInTheDocument();
    expect(screen.getByText('Data Analytics')).toBeInTheDocument();
    expect(screen.getByText('Customizable Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Our Tech Stack')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('navigates to register on Register button click', () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(pushMock).toHaveBeenCalledWith('/register');
  });

  it('navigates to login on Login button click', () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('shows error if auth context is missing', () => {
    (useAuth as jest.Mock).mockReturnValue(undefined);
    render(<Home />);
    expect(screen.getByText('No access to Auth context')).toBeInTheDocument();
  });
});
