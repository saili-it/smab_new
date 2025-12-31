// Schema.org Implementation Examples for SMAB Website
// This file contains examples of how to implement Schema.org on different pages

// Example 1: Homepage Implementation
export const HomepageSchemaExample = () => {
  return (
    <Seo
      title="SMAB - Solutions Industrielles | Extraction et Distillation"
      description="SMAB spécialisé dans l'extraction, distillation et transformation des huiles essentielles. Solutions industrielles au Maroc."
      keywords={["extraction huiles essentielles", "distillation industrielle", "transformation produits naturels", "Maroc"]}
      pageType="homepage"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' }
      ]}
    />
  );
};

// Example 2: Services Page Implementation
export const ServicesSchemaExample = () => {
  return (
    <Seo
      title="Nos Services - Extraction et Distillation | SMAB"
      description="Découvrez nos services d'extraction, distillation, broyage et transformation pour l'industrie des huiles essentielles."
      keywords={["services extraction", "distillation industrielle", "broyage mouture", "séchage torréfaction"]}
      pageType="services"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'Services', url: 'https://smab-co.com/services' }
      ]}
    />
  );
};

// Example 3: About Page Implementation
export const AboutSchemaExample = () => {
  return (
    <Seo
      title="À Propos - SMAB Solutions Industrielles"
      description="Découvrez l'histoire de SMAB, leader dans l'extraction et transformation des huiles essentielles au Maroc."
      keywords={["histoire SMAB", "entreprise extraction", "leader industriel", "Maroc"]}
      pageType="about"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'À Propos', url: 'https://smab-co.com/about' }
      ]}
    />
  );
};

// Example 4: Blog Post Implementation
export const BlogPostSchemaExample = () => {
  return (
    <Seo
      title="Article Title - Blog SMAB"
      description="Description de l'article sur l'extraction des huiles essentielles."
      pageType="blog"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'Blog', url: 'https://smab-co.com/blog' },
        { name: 'Article Title', url: 'https://smab-co.com/blog/article' }
      ]}
      schemaData={{
        article: {
          headline: "Article Title",
          author: "SMAB Team",
          datePublished: "2024-01-15",
          dateModified: "2024-01-15",
          image: "https://smab-co.com/article-image.jpg"
        }
      }}
    />
  );
};

// Example 5: Product/Service Detail Page
export const ProductSchemaExample = () => {
  return (
    <Seo
      title="Extraction d'Huiles Essentielles - Service SMAB"
      description="Service professionnel d'extraction d'huiles essentielles pour l'industrie."
      pageType="product"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'Services', url: 'https://smab-co.com/services' },
        { name: 'Extraction Huiles', url: 'https://smab-co.com/services/extraction' }
      ]}
      schemaData={{
        product: {
          name: "Extraction d'Huiles Essentielles",
          description: "Service professionnel d'extraction d'huiles essentielles",
          category: "Services Industriels",
          brand: "SMAB",
          offers: {
            price: "Sur devis",
            priceCurrency: "EUR",
            availability: "InStock"
          }
        }
      }}
    />
  );
};

// Example 6: FAQ Page Implementation
export const FAQSchemaExample = () => {
  return (
    <Seo
      title="FAQ - Questions Fréquentes | SMAB"
      description="Réponses aux questions fréquentes sur nos services d'extraction et distillation."
      pageType="about"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'FAQ', url: 'https://smab-co.com/faq' }
      ]}
      schemaData={{
        faq: {
          mainEntity: [
            {
              question: "Quels types d'huiles essentielles extrayez-vous ?",
              answer: "Nous extrayons une large gamme d'huiles essentielles..."
            },
            {
              question: "Quel est votre délai de livraison ?",
              answer: "Nos délais de livraison varient selon le volume..."
            }
          ]
        }
      }}
    />
  );
};

// Example 7: Event Page Implementation
export const EventSchemaExample = () => {
  return (
    <Seo
      title="Salon de l'Industrie - Participation SMAB"
      description="SMAB participe au Salon de l'Industrie pour présenter ses solutions d'extraction."
      pageType="about"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'Événements', url: 'https://smab-co.com/events' },
        { name: 'Salon Industrie', url: 'https://smab-co.com/events/salon-industrie' }
      ]}
      schemaData={{
        event: {
          name: "Salon de l'Industrie",
          startDate: "2024-03-15",
          endDate: "2024-03-17",
          location: {
            name: "Palais des Congrès",
            address: "Casablanca, Maroc"
          },
          organizer: "SMAB"
        }
      }}
    />
  );
};

// Example 8: Team/Staff Page Implementation
export const TeamSchemaExample = () => {
  return (
    <Seo
      title="Notre Équipe - Experts SMAB"
      description="Rencontrez notre équipe d'experts en extraction et distillation d'huiles essentielles."
      pageType="about"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'À Propos', url: 'https://smab-co.com/about' },
        { name: 'Notre Équipe', url: 'https://smab-co.com/about/team' }
      ]}
      schemaData={{
        team: {
          name: "Équipe SMAB",
          description: "Experts en extraction et distillation d'huiles essentielles",
          members: [
            {
              name: "Directeur Technique",
              jobTitle: "Directeur Technique",
              description: "Expert en extraction industrielle"
            }
          ]
        }
      }}
    />
  );
};

// Example 9: Certification/Quality Page
export const CertificationSchemaExample = () => {
  return (
    <Seo
      title="Certifications et Qualité - SMAB"
      description="Découvrez nos certifications et notre engagement qualité dans l'extraction d'huiles essentielles."
      pageType="about"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'Qualité', url: 'https://smab-co.com/quality' }
      ]}
      schemaData={{
        certification: {
          name: "Certification ISO 9001",
          description: "Certification qualité pour nos processus d'extraction",
          issuer: "Organisme de certification",
          dateIssued: "2023-01-01"
        }
      }}
    />
  );
};

// Example 10: Contact Page with Enhanced Schema
export const EnhancedContactSchemaExample = () => {
  return (
    <Seo
      title="Contact - SMAB Solutions Industrielles"
      description="Contactez SMAB pour vos besoins en extraction et distillation d'huiles essentielles. Zone Industrielle, Casablanca."
      keywords={["contact SMAB", "extraction huiles", "distillation", "Casablanca"]}
      pageType="contact"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://smab-co.com' },
        { name: 'Contact', url: 'https://smab-co.com/contact' }
      ]}
      schemaData={{
        contactPoint: {
          telephone: "+212-766-074939",
          email: "contact@smab-co.com",
          contactType: "customer service",
          availableLanguage: ["French", "Arabic", "English"],
          hoursAvailable: "Mo-Fr 08:00-17:00"
        }
      }}
    />
  );
};

