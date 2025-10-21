/**
 * Unit Tests für InputText Component
 * 
 * Installation erforderlich (wenn noch nicht vorhanden):
 * npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputText } from '../input-text.comp.jsx';

describe('InputText Component', () => {
  it('rendert korrekt mit Label', () => {
    render(
      <InputText
        label="Test Label"
        name="testInput"
        value=""
        onChange={() => {}}
      />
    );
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('zeigt Pflichtfeld-Stern bei required', () => {
    render(
      <InputText
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        required
      />
    );
    
    const label = screen.getByText(/Email/);
    expect(label.parentElement).toHaveTextContent('*');
  });

  it('zeigt Fehlermeldung an', () => {
    render(
      <InputText
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        error="Ungültige E-Mail"
      />
    );
    
    expect(screen.getByText('Ungültige E-Mail')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('input-error');
  });

  it('ruft onChange Handler auf', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <InputText
        label="Name"
        name="name"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('ist disabled wenn disabled prop gesetzt', () => {
    render(
      <InputText
        label="Name"
        name="name"
        value=""
        onChange={() => {}}
        disabled
      />
    );
    
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('setzt aria-Attribute korrekt', () => {
    render(
      <InputText
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        required
        error="Fehler"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});
