import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Smoke Tests', () => {
  describe('Home Page', () => {
    it('renders without crashing', () => {
      render(<Home />);
      expect(screen.getByRole('main')).toBeDefined();
    });

    it('displays Ski Platform heading', () => {
      render(<Home />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ski Platform');
    });

    it('displays Perfect Day Score tagline', () => {
      render(<Home />);
      expect(screen.getByText(/Perfect Day Score/i)).toBeDefined();
    });
  });
});
