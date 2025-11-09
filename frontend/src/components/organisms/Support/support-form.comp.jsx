import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { InputText } from "../../atoms/Support/input-text.comp.jsx";
import { TextArea } from "../../atoms/Support/text-area.comp.jsx";
import { FileInput } from "../../atoms/Support/file-input.comp.jsx";
import { SubmitButton } from "../../atoms/Support/submit-button.comp.jsx";
import { ErrorMessage } from "../../atoms/Support/error-message.comp.jsx";
import { CategorySelect } from "../../molecules/Support/category-select.comp.jsx";
import { FormRow } from "../../molecules/Support/form-row.comp.jsx";
import { AttachmentPreview } from "../../molecules/Support/attachment-preview.comp.jsx";

/**
 * SupportForm Organism - Hauptformular für Support-Anfragen
 * @param {function} onSubmit - Submit Handler mit Ticket-Daten
 */
export const SupportForm = ({ onSubmit }) => {
  const { user, isLoaded } = useUser();
  
  const [formData, setFormData] = useState({
    email: user?.primaryEmailAddress?.emailAddress || "",
    category: "",
    subject: "",
    message: "",
    attachments: [],
    privacyConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Formular-Validierung
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "E-Mail-Adresse ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    }

    if (!formData.category) {
      newErrors.category = "Bitte wählen Sie eine Kategorie aus";
    }

    if (!formData.subject || formData.subject.trim().length < 3) {
      newErrors.subject = "Betreff muss mindestens 3 Zeichen lang sein";
    }

    if (!formData.message || formData.message.trim().length < 20) {
      newErrors.message = "Nachricht muss mindestens 20 Zeichen lang sein";
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "Sie müssen der Datenverarbeitung zustimmen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input Handler
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      if (e.target.error) {
        setErrors((prev) => ({ ...prev, [name]: e.target.error }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: Array.from(files || []) }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  // Datei entfernen
  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) {
      setGeneralError("Bitte korrigieren Sie die Fehler im Formular");
      return;
    }

    setIsSubmitting(true);

    try {
      // FormData für Datei-Upload
      const submitData = new FormData();
      submitData.append("email", formData.email);
      submitData.append("category", formData.category);
      submitData.append("subject", formData.subject);
      submitData.append("message", formData.message);
      submitData.append("userId", user?.id || "");
      
      formData.attachments.forEach((file) => {
        submitData.append("attachments", file);
      });

      await onSubmit(submitData);
    } catch (error) {
      setGeneralError(error.message || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {generalError && (
        <ErrorMessage message={generalError} id="general-error" />
      )}

      {/* E-Mail & Kategorie */}
      <FormRow>
        <InputText
          label="E-Mail-Adresse"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ihre.email@beispiel.de"
          required
          error={errors.email}
          disabled={!!user?.primaryEmailAddress?.emailAddress}
        />
        
        <CategorySelect
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          error={errors.category}
        />
      </FormRow>

      {/* Betreff */}
      <InputText
        label="Betreff"
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Kurze Beschreibung Ihres Anliegens"
        required
        error={errors.subject}
      />

      {/* Nachricht */}
      <TextArea
        label="Nachricht"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Beschreiben Sie Ihr Anliegen so detailliert wie möglich..."
        required
        minLength={20}
        rows={6}
        error={errors.message}
      />

      {/* Datei-Upload */}
      <FileInput
        label="Anhänge (optional)"
        name="attachments"
        onChange={handleChange}
        accept="image/*,.pdf,.txt,.log"
        maxSize={5}
        multiple
        error={errors.attachments}
      />

      {/* Anhänge-Vorschau */}
      <AttachmentPreview
        files={formData.attachments}
        onRemove={handleRemoveFile}
      />

      {/* Datenschutz-Checkbox */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={handleChange}
            className={`checkbox checkbox-primary ${
              errors.privacyConsent ? "checkbox-error" : ""
            }`}
            aria-invalid={!!errors.privacyConsent}
            aria-describedby={errors.privacyConsent ? "privacy-error" : undefined}
          />
          <span className="label-text">
            Ich stimme der Verarbeitung meiner Daten zur Bearbeitung meiner
            Support-Anfrage zu.{" "}
            <span className="text-error">*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <label className="label" id="privacy-error">
            <span className="label-text-alt text-error" role="alert">
              {errors.privacyConsent}
            </span>
          </label>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="reset"
          onClick={() => {
            setFormData({
              email: user?.primaryEmailAddress?.emailAddress || "",
              category: "",
              subject: "",
              message: "",
              attachments: [],
              privacyConsent: false,
            });
            setErrors({});
            setGeneralError("");
          }}
          className="btn btn-ghost"
          disabled={isSubmitting}
        >
          Zurücksetzen
        </button>
        <SubmitButton loading={isSubmitting}>
          Anfrage senden
        </SubmitButton>
      </div>
    </form>
  );
};
