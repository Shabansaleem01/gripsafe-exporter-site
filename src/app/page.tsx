import Link from "next/link";
import { products } from "@/data/products";

const productCategories = [
  {
    title: "Boxing Gloves & Mitts",
    detail: "Pro sparring gloves, mitts, and protective boxing accessories.",
  },
  {
    title: "Sports Uniforms & Team Kits",
    detail: "Soccer, baseball, basketball, and football custom uniforms.",
  },
  {
    title: "Streetwear & Hoodies",
    detail: "Private-label hoodies, jackets, joggers, and casual apparel.",
  },
  {
    title: "Safety & Workwear",
    detail: "Durable industrial garments and utility work apparel.",
  },
  {
    title: "Motorbike Gear",
    detail: "Racing suits, gloves, and riding gear built for protection.",
  },
  {
    title: "Custom Private Label Apparel",
    detail: "From concept to packaging for your branded collections.",
  },
];

const whyChooseUs = [
  "Factory-direct quality control for every production batch",
  "Custom logos, labels, packaging, and branding support",
  "Flexible MOQs for startups and scalable volume for large brands",
  "Fast communication on timelines, sampling, and shipping",
];

export default function Home() {
  const homeProducts = products.slice(0, 6);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grip Safe Industries",
    url: "https://gripsafeindustries.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92 316 7249098",
      contactType: "sales",
      email: "info@gripsafeindustries.com",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://gripsafeindustries.trustpass.alibaba.com/",
      "https://www.instagram.com/gripsafeindustries",
    ],
  };

  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <section className="hero-section">
        <div className="site-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Trusted Global Export Partner</p>
            <h1>
              Boxing Gear, Sportswear, Workwear
              <span>Manufactured With Precision</span>
            </h1>
            <p>
              Grip Safe Industries delivers premium quality manufacturing and private-label production
              for brands, wholesalers, and importers worldwide.
            </p>
            <div className="hero-cta-row">
              <a href="https://wa.me/message/UBP7SOCOZDFFH1" target="_blank" rel="noreferrer" className="btn btn-primary">
                Inquire on WhatsApp
              </a>
              <Link href="/products" className="btn btn-outline">
                View Products
              </Link>
            </div>
          </div>
          <div className="hero-image-card">
            <img
              src="/hero-boxing-vertical.jpg"
              alt="Boxing gloves on gym floor"
              loading="lazy"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <section className="site-shell content-section">
        <div className="section-head">
          <p className="eyebrow">Why Choose Us</p>
          <h2>Reliable Manufacturing for Growing Brands</h2>
        </div>
        <div className="why-stack-grid">
          {whyChooseUs.map((item, index) => (
            <article key={item} className="why-stack-card">
              <span>{`0${index + 1}`}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell content-section about-split">
        <div className="about-image-card">
          <img
            src="/about-experience-banner.jpg"
            alt="Professional boxing scene representing Grip Safe Industries experience"
            className="about-image"
            loading="lazy"
          />
        </div>
        <div>
          <div className="section-head">
            <p className="eyebrow">About Us</p>
            <h2>18+ Years of Manufacturing Expertise</h2>
          </div>
          <p className="body-large">
            We are a Pakistan-based manufacturer and exporter focused on performance products across boxing,
            sports uniforms, lifestyle wear, and industrial safety gear. Our teams support product development,
            sampling, and bulk production with strict quality standards.
          </p>
        </div>
      </section>

      <section className="site-shell content-section">
        <div className="section-head split">
          <div>
            <p className="eyebrow">Product Categories</p>
            <h2>Built For Athletes, Workers, and Brands</h2>
          </div>
          <Link href="/products" className="text-link">
            Explore full catalog
          </Link>
        </div>
        <div className="category-grid">
          {productCategories.map((item) => (
            <article key={item.title} className="category-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <a href="https://wa.me/message/UBP7SOCOZDFFH1" target="_blank" rel="noreferrer" className="btn btn-small">
                Inquire Now
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell content-section">
        <div className="section-head split">
          <div>
            <p className="eyebrow">Featured Alibaba Picks</p>
            <h2>Top Products on Homepage</h2>
          </div>
          <Link href="/products" className="text-link">
            Browse all 42 products
          </Link>
        </div>
        <div className="home-products-grid">
          {homeProducts.map((item) => (
            <article key={item.name} className="featured-card">
              <img src={item.image} alt={item.name} loading="lazy" className="featured-image" />
              <p className="product-category">{item.category}</p>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <div className="product-card-actions">
                <a href={item.alibabaLink} target="_blank" rel="noreferrer" className="btn btn-outline">
                  View on Alibaba
                </a>
                <a href="https://wa.me/message/UBP7SOCOZDFFH1" target="_blank" rel="noreferrer" className="btn btn-small">
                  Inquire Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell content-section">
        <div className="section-head">
          <p className="eyebrow">Ready to Source?</p>
          <h2>Send Your Requirement and Get a Fast Quote</h2>
        </div>
        <div className="cta-banner">
          <p>
            Share your target product, material, quantity, and branding details. Our team will respond
            quickly with pricing and lead times.
          </p>
          <a href="https://wa.me/message/UBP7SOCOZDFFH1" target="_blank" rel="noreferrer" className="btn btn-primary">
            Start WhatsApp Inquiry
          </a>
        </div>
      </section>
    </main>
  );
}
