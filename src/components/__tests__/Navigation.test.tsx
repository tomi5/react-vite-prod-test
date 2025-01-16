import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

describe('Navigation', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const renderResult = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );
    container = renderResult.container;
  });

  it('should render all navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Artykuły')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should have correct links', () => {
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Artykuły').closest('a')).toHaveAttribute('href', '/articles');
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about');
    expect(container).toMatchSnapshot();
  });
});
