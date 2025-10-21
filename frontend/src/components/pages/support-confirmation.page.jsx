import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";

export default function SupportConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;

  // Redirect wenn kein Ticket vorhanden
  useEffect(() => {
    if (!ticket) {
      navigate("/support");
    }
  }, [ticket, navigate]);

  if (!ticket) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-base-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Animation/Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Anfrage erfolgreich gesendet!
              </h1>
              <p className="text-lg text-base-content/80">
                Vielen Dank für Ihre Nachricht. Wir haben Ihre Support-Anfrage erhalten.
              </p>
            </div>

            {/* Ticket Details Card */}
            <div className="card bg-base-200 shadow-xl mb-6">
              <div className="card-body">
                <h2 className="card-title mb-4">Ihre Ticket-Details</h2>
                
                <div className="space-y-4">
                  {/* Ticket-ID */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-base-100 rounded-lg">
                    <span className="font-semibold min-w-[140px]">Ticket-ID:</span>
                    <code className="badge badge-lg badge-primary font-mono">
                      {ticket.id}
                    </code>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-base-100 rounded-lg">
                    <span className="font-semibold min-w-[140px]">Status:</span>
                    <span className="badge badge-success">
                      {ticket.status === "open" ? "Offen" : ticket.status}
                    </span>
                  </div>

                  {/* Erstellt am */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-base-100 rounded-lg">
                    <span className="font-semibold min-w-[140px]">Erstellt am:</span>
                    <span>{formatDate(ticket.createdAt)}</span>
                  </div>

                  {/* Betreff */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-base-100 rounded-lg">
                    <span className="font-semibold min-w-[140px]">Betreff:</span>
                    <span>{ticket.subject}</span>
                  </div>

                  {/* E-Mail */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-base-100 rounded-lg">
                    <span className="font-semibold min-w-[140px]">Ihre E-Mail:</span>
                    <span>{ticket.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="alert alert-info mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div className="font-semibold">Was passiert jetzt?</div>
                <div className="text-sm">
                  Wir werden Ihre Anfrage prüfen und uns innerhalb von{" "}
                  <strong>{ticket.estimatedResponseTime || "24-48 Stunden"}</strong>{" "}
                  per E-Mail bei Ihnen melden. Bitte überprüfen Sie auch Ihren Spam-Ordner.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="btn btn-primary">
                Zum Dashboard
              </Link>
              <Link to="/support" className="btn btn-outline">
                Weitere Anfrage erstellen
              </Link>
            </div>

            {/* Ticket-ID zum Kopieren */}
            <div className="mt-8 p-4 bg-base-200 rounded-lg text-center">
              <p className="text-sm text-base-content/70 mb-2">
                Notieren Sie sich Ihre Ticket-ID für Rückfragen:
              </p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-lg font-mono font-bold">{ticket.id}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(ticket.id);
                    // Optional: Toast-Notification zeigen
                  }}
                  className="btn btn-ghost btn-sm"
                  aria-label="Ticket-ID kopieren"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
