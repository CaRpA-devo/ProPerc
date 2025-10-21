/**
 * Support API Service für Support-Tickets
 * Mock-Implementation mit simulierten Backend-Responses
 */

class SupportApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    this.mockMode = !import.meta.env.VITE_BACKEND_URL; // Mock wenn keine Backend-URL
  }

  /**
   * Erstellt ein neues Support-Ticket
   * @param {FormData} formData - Formulardaten mit Anhängen
   * @returns {Promise<Object>} Ticket-Response mit ID
   */
  async createTicket(formData) {
    // Mock-Modus für Entwicklung
    if (this.mockMode) {
      return this.mockCreateTicket(formData);
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/support/tickets`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Fehler beim Erstellen des Tickets");
      }

      return await response.json();
    } catch (error) {
      console.error("Support API Error:", error);
      throw error;
    }
  }

  /**
   * Mock-Implementation für Entwicklung
   * Simuliert Backend-Antwort mit zufälliger Verzögerung
   */
  async mockCreateTicket(formData) {
    // Simuliere Netzwerk-Verzögerung
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generiere Mock-Ticket-ID
    const ticketId = `TICK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simuliere gelegentliche Fehler (10% Chance)
    if (Math.random() < 0.1) {
      throw new Error("Netzwerkfehler: Bitte versuchen Sie es erneut");
    }

    // Extrahiere Daten aus FormData für Logging
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (key === "attachments") {
        data.attachments = data.attachments || [];
        data.attachments.push(value.name);
      } else {
        data[key] = value;
      }
    }

    console.log("Mock Ticket erstellt:", { ticketId, data });

    return {
      success: true,
      ticket: {
        id: ticketId,
        status: "open",
        createdAt: new Date().toISOString(),
        email: data.email,
        category: data.category,
        subject: data.subject,
        estimatedResponseTime: "24-48 Stunden",
      },
      message: "Ihr Support-Ticket wurde erfolgreich erstellt",
    };
  }

  /**
   * Ruft Ticket-Details ab (optional, für Admin-View)
   * @param {string} ticketId - Ticket-ID
   * @returns {Promise<Object>} Ticket-Details
   */
  async getTicket(ticketId) {
    if (this.mockMode) {
      return this.mockGetTicket(ticketId);
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api/support/tickets/${ticketId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Ticket nicht gefunden");
      }

      return await response.json();
    } catch (error) {
      console.error("Support API Error:", error);
      throw error;
    }
  }

  /**
   * Mock-Implementation für Ticket-Abruf
   */
  async mockGetTicket(ticketId) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: ticketId,
      status: "open",
      category: "technical",
      subject: "Beispiel-Ticket",
      message: "Dies ist ein Beispiel-Ticket",
      createdAt: new Date().toISOString(),
      responses: [],
    };
  }

  /**
   * Listet alle Tickets eines Users auf (optional, für Admin-View)
   * @returns {Promise<Array>} Liste von Tickets
   */
  async listTickets() {
    if (this.mockMode) {
      return this.mockListTickets();
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/support/tickets`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Tickets");
      }

      return await response.json();
    } catch (error) {
      console.error("Support API Error:", error);
      throw error;
    }
  }

  /**
   * Mock-Implementation für Ticket-Liste
   */
  async mockListTickets() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      tickets: [
        {
          id: "TICK-1234567890-ABC123",
          status: "open",
          category: "technical",
          subject: "Problem mit Login",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "TICK-1234567891-DEF456",
          status: "resolved",
          category: "account",
          subject: "Passwort zurücksetzen",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ],
    };
  }
}

// Singleton-Instanz
const supportApiService = new SupportApiService();

export default supportApiService;
