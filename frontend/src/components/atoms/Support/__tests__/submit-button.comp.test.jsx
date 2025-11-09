/**
 * Unit Tests für SubmitButton Component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitButton } from '../submit-button.comp.jsx';

describe('SubmitButton Component', () => {
  it('rendert Button-Text korrekt', () => {
    render(<SubmitButton>Senden</SubmitButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Senden');
  });

  it('zeigt Loading-Text wenn loading aktiv', () => {
    render(<SubmitButton loading>Senden</SubmitButton>);
    expect(screen.getByText('Wird gesendet...')).toBeInTheDocument();
  });

  it('ist disabled wenn loading aktiv', () => {
    render(<SubmitButton loading>Senden</SubmitButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('ist disabled wenn disabled prop gesetzt', () => {
    render(<SubmitButton disabled>Senden</SubmitButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('hat type="submit" als Standard', () => {
    render(<SubmitButton>Senden</SubmitButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('akzeptiert custom type', () => {
    render(<SubmitButton type="button">Button</SubmitButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
