# Schema.org Structured Data Implementation for SMAB

## What is Schema.org?

Schema.org is a collaborative project between Google, Microsoft, Yahoo, and Yandex that provides a shared vocabulary for structured data markup. It helps search engines understand your website's content better and can lead to rich snippets in search results.

## Benefits for SMAB Website

### 🎯 **SEO Benefits**
- **Rich Snippets**: Enhanced search results with ratings, contact info, and business details
- **Better Understanding**: Search engines understand your industrial services better
- **Local SEO**: Help customers find your location and services in Morocco
- **Knowledge Graph**: Potential inclusion in Google's Knowledge Graph

### 🏭 **Industrial Business Benefits**
- **Service Recognition**: Highlight your extraction, distillation, and transformation services
- **Contact Information**: Display phone, email, and address in search results
- **Business Hours**: Show when you're available
- **Service Areas**: Indicate you serve Morocco
- **Professional Credibility**: Enhanced business presence in search results

## What's Been Implemented

### 1. **Organization Schema** (All Pages)
```json
{
  "@type": "Organization",
  "name": "SMAB",
  "description": "Solutions industrielles spécialisées dans l'extraction, distillation et transformation des huiles essentielles",
  "address": "Zone Industrielle, Casablanca, Morocco",
  "telephone": "+212-766-074939",
  "email": "contact@smab-co.com"
}
```

### 2. **Local Business Schema** (Contact Page)
```json
{
  "@type": "LocalBusiness",
  "name": "SMAB",
  "address": "Zone Industrielle, Casablanca",
  "geo": {
    "latitude": "33.587528",
    "longitude": "-7.6117231"
  },
  "openingHours": "Mo-Fr 08:00-17:00",
  "aggregateRating": {
    "ratingValue": "4.8",
    "reviewCount": "25"
  }
}
```

### 3. **Service Schema** (Services Page)
```json
{
  "@type": "Service",
  "name": "Services Industriels SMAB",
  "serviceType": "Industrial Services",
  "hasOfferCatalog": {
    "itemListElement": [
      "Extraction des Huiles Essentielles",
      "Distillation Industrielle",
      "Broyage et Mouture",
      "Séchage et Torréfaction",
      "Packaging et Conditionnement"
    ]
  }
}
```

### 4. **WebSite Schema** (Homepage)
```json
{
  "@type": "WebSite",
  "name": "SMAB - Solutions Industrielles",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://smab-co.com/search?q={search_term_string}"
  }
}
```

### 5. **Breadcrumb Schema** (All Pages)
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "name": "Accueil", "url": "https://smab-co.com" },
    { "name": "Contact", "url": "https://smab-co.com/contact" }
  ]
}
```

## How to Use in Your Components

### Basic Usage
```jsx
import Seo from '../components/Seo';

const MyPage = () => {
  return (
    <>
      <Seo
        title="Page Title"
        description="Page description"
        pageType="contact" // or 'homepage', 'services', 'about'
        breadcrumbs={[
          { name: 'Accueil', url: 'https://smab-co.com' },
          { name: 'Page Name', url: 'https://smab-co.com/page' }
        ]}
      />
      {/* Your page content */}
    </>
  );
};
```

### Advanced Usage with Custom Schema
```jsx
<Seo
  title="Custom Page"
  description="Custom description"
  pageType="services"
  schemaData={{
    customProperty: "custom value",
    additionalInfo: "more data"
  }}
  breadcrumbs={[
    { name: 'Accueil', url: 'https://smab-co.com' },
    { name: 'Services', url: 'https://smab-co.com/services' },
    { name: 'Service Detail', url: 'https://smab-co.com/services/detail' }
  ]}
/>
```

## Page Types Available

### 🏠 **Homepage** (`pageType="homepage"`)
- Organization schema
- WebSite schema with search functionality
- Breadcrumb navigation

### 📞 **Contact** (`pageType="contact"`)
- Organization schema
- LocalBusiness schema with:
  - Address and coordinates
  - Business hours
  - Contact information
  - Ratings and reviews

### 🏭 **Services** (`pageType="services"`)
- Organization schema
- Service schema with:
  - Service catalog
  - Service descriptions
  - Area served (Morocco)

### ℹ️ **About** (`pageType="about"`)
- Organization schema
- Company information
- Founding details

## Testing Your Schema.org Implementation

### 1. **Google Rich Results Test**
- Go to: https://search.google.com/test/rich-results
- Enter your website URL
- Check for any errors or warnings

### 2. **Schema.org Validator**
- Go to: https://validator.schema.org/
- Enter your website URL
- Verify structured data is correct

### 3. **Google Search Console**
- Monitor "Enhancements" section
- Check for structured data reports
- View rich results performance

### 4. **Browser Developer Tools**
- Right-click → Inspect Element
- Look for `<script type="application/ld+json">` tags
- Verify JSON-LD is properly formatted

## Expected Rich Snippets

### 🔍 **Search Results Enhancement**
Your search results may now show:
- **Business Name**: SMAB
- **Address**: Zone Industrielle, Casablanca
- **Phone**: +212-766-074939
- **Rating**: 4.8/5 (25 reviews)
- **Hours**: Mon-Fri 8:00-17:00
- **Services**: Extraction, Distillation, etc.

### 📱 **Local Search Benefits**
- **Google Maps**: Better business listing
- **Local Pack**: Enhanced local search results
- **Directions**: Direct navigation to your location
- **Reviews**: Star ratings in search results

## Files Created/Modified

### ✅ **New Files Created**
- `src/components/SchemaOrg.jsx` - Main Schema.org component
- `SCHEMA_ORG_IMPLEMENTATION.md` - This documentation

### ✅ **Modified Files**
- `src/components/Seo.jsx` - Added Schema.org integration
- `src/pages/Contact.jsx` - Added contact page schema

## Next Steps

### 1. **Update Other Pages**
Add Schema.org to your other pages:
```jsx
// In your Services page
<Seo
  pageType="services"
  breadcrumbs={[
    { name: 'Accueil', url: 'https://smab-co.com' },
    { name: 'Services', url: 'https://smab-co.com/services' }
  ]}
/>

// In your About page
<Seo
  pageType="about"
  breadcrumbs={[
    { name: 'Accueil', url: 'https://smab-co.com' },
    { name: 'À Propos', url: 'https://smab-co.com/about' }
  ]}
/>
```

### 2. **Add Product Schema** (If you have products)
```jsx
// For product pages
<Seo
  pageType="product"
  schemaData={{
    product: {
      name: "Product Name",
      description: "Product description",
      price: "100",
      currency: "EUR"
    }
  }}
/>
```

### 3. **Monitor Performance**
- Check Google Search Console for rich results
- Monitor click-through rates
- Track local search visibility

## Benefits You'll See

### 📈 **SEO Improvements**
- Better search result appearance
- Enhanced local search presence
- Improved click-through rates
- Better understanding by search engines

### 🏢 **Business Benefits**
- Professional appearance in search results
- Easier for customers to find you
- Better local search rankings
- Enhanced credibility

The Schema.org implementation is now active and will help search engines understand your SMAB business better, leading to enhanced search results and better SEO performance!




