import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useMetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  // Helper function to track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, parameters);
    }
  };

  // Helper function to track conversions
  const trackConversion = (eventName, value, currency = 'EUR') => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, {
        value: value,
        currency: currency
      });
    }
  };

  return {
    trackEvent,
    trackConversion
  };
};

// Common Meta Pixel events for e-commerce
export const MetaPixelEvents = {
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  PURCHASE: 'Purchase',
  LEAD: 'Lead',
  CONTACT: 'Contact',
  SEARCH: 'Search',
  VIEW_CATALOG: 'ViewCatalog',
  ADD_TO_WISHLIST: 'AddToWishlist',
  COMPLETE_REGISTRATION: 'CompleteRegistration'
};

