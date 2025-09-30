import { useState } from "react";

export function SignUpForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    // TODO: Implement sign up logic
    console.log("Sign up:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="card w-full max-w-md mx-auto bg-base-100 shadow-2xl border border-primary/20 overflow-visible">
      <div className="card-body p-2 sm:p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-xl sm:text-2xl text-primary">
            Registrieren
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
            ></button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Vorname</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Max"
                className="input input-bordered focus:input-primary"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nachname</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Mustermann"
                className="input input-bordered focus:input-primary"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">E-Mail</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="max@beispiel.de"
              className="input input-bordered focus:input-primary"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Passwort</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mindestens 8 Zeichen"
              className="input input-bordered focus:input-primary"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Passwort bestätigen
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Passwort wiederholen"
              className="input input-bordered focus:input-primary"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                name="acceptTerms"
                className="checkbox checkbox-primary"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <span className="label-text text-sm">
                Ich akzeptiere die{" "}
                <a href="/terms" className="link link-primary">
                  AGB
                </a>{" "}
                und{" "}
                <a href="/privacy" className="link link-primary">
                  Datenschutzerklärung
                </a>
              </span>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!formData.acceptTerms}
            >
              Kostenlos registrieren
            </button>
          </div>
        </form>

        <div className="divider">oder</div>

        <button className="btn btn-outline w-full">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
          </svg>
          Mit Google registrieren
        </button>

        <div className="text-center mt-4">
          <span className="text-sm text-base-content/70">
            Bereits ein Konto?{" "}
            <button
              onClick={() => onClose && onClose("signin")}
              className="link link-primary font-medium"
            >
              Jetzt anmelden
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
