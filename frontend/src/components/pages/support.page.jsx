import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import { SupportTemplate } from "../templates/Support/support-template.comp.jsx";
import { SupportForm } from "../organisms/Support/support-form.comp.jsx";
import { FAQList } from "../organisms/Support/faq-list.comp.jsx";
import supportApiService from "../../services/supportApi.js";

export default function SupportPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await supportApiService.createTicket(formData);
      
      // Navigiere zur Bestätigungsseite mit Ticket-ID
      navigate(`/support/confirmation`, {
        state: { ticket: response.ticket },
      });
    } catch (error) {
      // Fehler wird im Form behandelt
      throw error;
    }
  };

  return (
    <DashboardLayout>
      <SupportTemplate
        form={<SupportForm onSubmit={handleSubmit} />}
        faq={<FAQList />}
      />
    </DashboardLayout>
  );
}
