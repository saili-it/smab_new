import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Seo = ({ 
  title, 
  description, 
  keywords = [],
  ogImage = '',
  focusKeyphrase = '',
  pageType = 'website',
  breadcrumbs = [],
  schemaData = {}
}) => {
  // Get the current URL for canonical and og:url
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Schema.org data generation
  const generateSchemaData = () => {
    // Base organization data for SMAB
    const baseOrganizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SMAB",
      "alternateName": "SMAB Solutions Industrielles",
      "url": "https://smab-co.com",
      "logo": "https://smab-co.com/logo.png",
      "description": "SMAB - Solutions industrielles spécialisées dans l'extraction, distillation et transformation des huiles essentielles et produits naturels",
      "foundingDate": "2020",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zone Industrielle",
        "addressLocality": "Casablanca",
        "addressRegion": "Casablanca-Settat",
        "postalCode": "20000",
        "addressCountry": "MA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+212-766-074939",
        "contactType": "customer service",
        "email": "contact@smab-co.com",
        "availableLanguage": ["French", "Arabic", "English"]
      },
      "sameAs": [
        "https://www.facebook.com/smab",
        "https://www.linkedin.com/company/smab",
        "https://www.instagram.com/smab"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Morocco"
      },
      "serviceType": [
        "Extraction d'huiles essentielles",
        "Distillation industrielle",
        "Transformation de produits naturels",
        "Broyage et mouture",
        "Séchage et torréfaction",
        "Packaging et conditionnement"
      ]
    };

    // Local Business schema for contact page
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://smab-co.com/#organization",
      "name": "SMAB",
      "image": "https://smab-co.com/logo.png",
      "description": "Solutions industrielles spécialisées dans l'extraction et transformation des huiles essentielles",
      "url": "https://smab-co.com",
      "telephone": "+212-766-074939",
      "email": "contact@smab-co.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zone Industrielle",
        "addressLocality": "Casablanca",
        "addressRegion": "Casablanca-Settat",
        "postalCode": "20000",
        "addressCountry": "MA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "33.587528",
        "longitude": "-7.6117231"
      },
      "openingHours": "Mo-Fr 08:00-17:00",
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "25"
      }
    };

    // Service schema for services page
    const serviceData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Services Industriels SMAB",
      "description": "Services complets d'extraction, distillation et transformation pour l'industrie des huiles essentielles",
      "provider": {
        "@type": "Organization",
        "name": "SMAB"
      },
      "serviceType": "Industrial Services",
      "areaServed": {
        "@type": "Country",
        "name": "Morocco"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services SMAB",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Extraction des Huiles Essentielles"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Distillation Industrielle"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Broyage et Mouture"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Séchage et Torréfaction"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Packaging et Conditionnement"
            }
          }
        ]
      }
    };

    // WebSite schema for homepage
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SMAB - Solutions Industrielles",
      "url": "https://smab-co.com",
      "description": "Solutions industrielles spécialisées dans l'extraction, distillation et transformation des huiles essentielles",
      "publisher": {
        "@type": "Organization",
        "name": "SMAB"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://smab-co.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Breadcrumb schema
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs?.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      })) || []
    };

    // Get the appropriate schema based on page type
    const getSchemaData = () => {
      switch (pageType) {
        case 'homepage':
          return [baseOrganizationData, websiteData];
        case 'contact':
          return [baseOrganizationData, localBusinessData];
        case 'services':
          return [baseOrganizationData, serviceData];
        case 'about':
          return [baseOrganizationData];
        default:
          return [baseOrganizationData];
      }
    };

    return {
      schemaData: getSchemaData(),
      breadcrumbData: breadcrumbs && breadcrumbs.length > 0 ? breadcrumbData : null
    };
  };

  const { schemaData: schemas, breadcrumbData } = generateSchemaData();

  return (
    <Helmet>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords?.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content="SMAB" />
      {focusKeyphrase && (
        <meta name="focus-keyphrase" content={focusKeyphrase} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="SMAB" />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:alt" content={title} />
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content="@SMAB" />
      <meta name="twitter:creator" content="@SMAB" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />

      {/* Schema.org Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData, null, 2)
          }}
        />
      )}

    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  ogImage: PropTypes.string,
  focusKeyphrase: PropTypes.string,
  pageType: PropTypes.oneOf(['homepage', 'contact', 'services', 'about', 'blog', 'product']),
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })),
  schemaData: PropTypes.object
};

export default Seo;
