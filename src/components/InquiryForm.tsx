"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_BASE_URL = "https://wa.me/923167249098";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const company = String(formData.get("company") ?? "");
    const product = String(formData.get("product") ?? "");
    const quantity = String(formData.get("quantity") ?? "");
    const message = String(formData.get("message") ?? "");

    const inquiryMessage = [
      "Hello Grip Safe Industries,",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Product Interest: ${product}`,
      `Quantity: ${quantity}`,
      "",
      "Requirement Details:",
      message,
    ].join("\n");

    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(inquiryMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input type="text" name="name" required placeholder="Enter your full name" />
        </label>
        <label>
          Email Address
          <input type="email" name="email" required placeholder="you@company.com" />
        </label>
        <label>
          Company Name
          <input type="text" name="company" placeholder="Your company" />
        </label>
        <label>
          Product Interest
          <input type="text" name="product" required placeholder="e.g. Boxing gloves, soccer kits" />
        </label>
        <label>
          Estimated Quantity
          <input type="text" name="quantity" placeholder="e.g. 500 pieces" />
        </label>
      </div>
      <label>
        Requirement Details
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us materials, custom logo, sizes, packaging, and target delivery date."
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Send Inquiry on WhatsApp
        </button>
        <a href="mailto:info@gripsafeindustries.com" className="btn btn-outline">
          Send Email Instead
        </a>
      </div>
      {submitted ? <p className="form-note">Inquiry prepared and opened in WhatsApp. Our team will reply quickly.</p> : null}
    </form>
  );
}