/**
 * Integration Tests für SupportForm Component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SupportForm } from '../support-form.comp.jsx';

// Mock Clerk
vi.mock('@clerk/clerk-react', () => ({
  useUser: () => ({
    user: {
      id: 'test-user-id',
      primaryEmailAddress: {
        emailAddress: 'test@example.com',
      },
    },
    isLoaded: true,
  }),
}));

describe('SupportForm Integration Tests', () => {
  let mockOnSubmit;

  beforeEach(() => {
    mockOnSubmit = vi.fn(() => Promise.resolve());
  });

  it('rendert alle Formularfelder', () => {
    render(<SupportForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/E-Mail-Adresse/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kategorie/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Betreff/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nachricht/)).toBeInTheDocument();
    expect(screen.getByText(/Ich stimme der Verarbeitung/)).toBeInTheDocument();
  });

  it('zeigt Validierungsfehler bei leerem Formular', async () => {
    const user = userEvent.setup();
    render(<SupportForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Anfrage senden/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Bitte wählen Sie eine Kategorie aus/)).toBeInTheDocument();
      expect(screen.getByText(/Betreff muss mindestens 3 Zeichen lang sein/)).toBeInTheDocument();
      expect(screen.getByText(/Nachricht muss mindestens 20 Zeichen lang sein/)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validiert minimale Nachrichtenlänge', async () => {
    const user = userEvent.setup();
    render(<SupportForm onSubmit={mockOnSubmit} />);

    const messageField = screen.getByLabelText(/Nachricht/);
    await user.type(messageField, 'Zu kurz');

    const submitButton = screen.getByRole('button', { name: /Anfrage senden/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Nachricht muss mindestens 20 Zeichen lang sein/)).toBeInTheDocument();
    });
  });

  it('validiert E-Mail-Format', async () => {
    const user = userEvent.setup();
    
    // Mock ohne User
    vi.mock('@clerk/clerk-react', () => ({
      useUser: () => ({
        user: null,
        isLoaded: true,
      }),
    }));

    render(<SupportForm onSubmit={mockOnSubmit} />);

    const emailField = screen.getByLabelText(/E-Mail-Adresse/);
    await user.clear(emailField);
    await user.type(emailField, 'ungueltige-email');

    const submitButton = screen.getByRole('button', { name: /Anfrage senden/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Bitte geben Sie eine gültige E-Mail-Adresse ein/)).toBeInTheDocument();
    });
  });

  it('sendet Formular bei validen Daten', async () => {
    const user = userEvent.setup();
    render(<SupportForm onSubmit={mockOnSubmit} />);

    // Fülle Formular aus
    await user.selectOptions(screen.getByLabelText(/Kategorie/), 'technical');
    await user.type(screen.getByLabelText(/Betreff/), 'Test Betreff');
    await user.type(
      screen.getByLabelText(/Nachricht/),
      'Dies ist eine Testnachricht mit mehr als 20 Zeichen.'
    );
    await user.click(screen.getByRole('checkbox'));

    const submitButton = screen.getByRole('button', { name: /Anfrage senden/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('zeigt Loading-State während Submit', async () => {
    const user = userEvent.setup();
    const slowSubmit = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<SupportForm onSubmit={slowSubmit} />);

    // Fülle Formular aus
    await user.selectOptions(screen.getByLabelText(/Kategorie/), 'account');
    await user.type(screen.getByLabelText(/Betreff/), 'Test');
    await user.type(
      screen.getByLabelText(/Nachricht/),
      'Eine Nachricht mit genügend Zeichen.'
    );
    await user.click(screen.getByRole('checkbox'));

    const submitButton = screen.getByRole('button', { name: /Anfrage senden/ });
    await user.click(submitButton);

    expect(screen.getByText(/Wird gesendet.../)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('setzt Formular zurück bei Reset', async () => {
    const user = userEvent.setup();
    render(<SupportForm onSubmit={mockOnSubmit} />);

    // Fülle Formular aus
    await user.selectOptions(screen.getByLabelText(/Kategorie/), 'billing');
    await user.type(screen.getByLabelText(/Betreff/), 'Test');
    await user.type(screen.getByLabelText(/Nachricht/), 'Test Nachricht');

    const resetButton = screen.getByRole('button', { name: /Zurücksetzen/ });
    await user.click(resetButton);

    expect(screen.getByLabelText(/Betreff/)).toHaveValue('');
    expect(screen.getByLabelText(/Nachricht/)).toHaveValue('');
  });

  it('hat korrekte Accessibility-Attribute', () => {
    render(<SupportForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/E-Mail-Adresse/);
    const categorySelect = screen.getByLabelText(/Kategorie/);
    const subjectInput = screen.getByLabelText(/Betreff/);
    const messageTextarea = screen.getByLabelText(/Nachricht/);

    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(categorySelect).toHaveAttribute('aria-required', 'true');
    expect(subjectInput).toHaveAttribute('aria-required', 'true');
    expect(messageTextarea).toHaveAttribute('aria-required', 'true');
  });
});
