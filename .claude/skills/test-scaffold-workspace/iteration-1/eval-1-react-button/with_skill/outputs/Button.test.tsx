import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  // Rendering
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders children as ReactNode', () => {
    render(
      <Button>
        <span data-testid="icon">icon</span> Save
      </Button>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Save');
  });

  // Variants
  it('applies primary variant class by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn', 'btn-primary', 'btn-md');
  });

  it('applies secondary variant class', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn', 'btn-secondary');
  });

  it('applies danger variant class', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn', 'btn-danger');
  });

  // Sizes
  it('applies md size class by default', () => {
    render(<Button>Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-md');
  });

  it('applies sm size class', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-sm');
  });

  it('applies lg size class', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  // Click handler
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw when clicked without onClick handler', () => {
    render(<Button>Click</Button>);
    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
  });

  // Disabled state
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Loading state
  it('is disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button.querySelector('.spinner')).toBeInTheDocument();
    expect(button).not.toHaveTextContent('Submit');
  });

  it('shows children when not loading', () => {
    render(<Button>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button.querySelector('.spinner')).not.toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
  });

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Accessibility
  it('sets aria-busy to true when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button>Normal</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy', 'true');
  });

  it('is focusable via keyboard', () => {
    render(<Button>Focusable</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  it('has correct button role', () => {
    render(<Button>Role</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Combined props
  it('applies both variant and size classes together', () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-danger', 'btn-lg');
  });

  it('is disabled when both disabled and loading are true', () => {
    render(
      <Button disabled loading>
        Both
      </Button>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
