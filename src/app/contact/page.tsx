import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact Grip Safe Industries | Export Inquiry",
  description:
    "Send your export requirements to Grip Safe Industries via inquiry form, WhatsApp, or email.",
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Grip Safe Industries",
    url: "https://gripsafeindustries.com/contact",
  };

  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <section className="products-hero">
        <div className="site-shell">
          <p className="eyebrow">Contact Us</p>
          <h1>Start Your Export Inquiry</h1>
          <p>
            Share product details through the form below. We will align with your specs, timeline, and quantity,
            then provide a quote and production plan.
          </p>
        </div>
      </section>

      <section className="site-shell contact-layout">
        <article className="contact-card">
          <h2>Factory Contact Details</h2>
          <p>
            Grip Safe Industries<br />
            35/742 Mohalla Saria Bhabriyan, Sialkot, Pakistan
          </p>
          <p>
            Phone: <a href="tel:+923167249098">+92 316 7249098</a>
          </p>
          <p>
            Email: <a href="mailto:info@gripsafeindustries.com">info@gripsafeindustries.com</a>
          </p>
          <div className="hero-cta-row">
            <a href="https://wa.me/message/UBP7SOCOZDFFH1" target="_blank" rel="noreferrer" className="btn btn-primary">
              WhatsApp Chat
            </a>
            <a href="https://gripsafeindustries.trustpass.alibaba.com/" target="_blank" rel="noreferrer" className="btn btn-outline">
              Alibaba Profile
            </a>
          </div>
        </article>

        <article className="contact-card">
          <h2>Send Requirement Form</h2>
          <InquiryForm />
        </article>
      </section>
    </main>
  );
}
