import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Seo = ({ 
  title, 
  description, 
  keywords = [],
  ogImage = '',
  focusKeyphrase = ''
}) => {
  // Get the current URL for canonical and og:url
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

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

    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  ogImage: PropTypes.string,
  focusKeyphrase: PropTypes.string
};

export default Seo;
