// Meta Pixel Implementation Examples for SMAB Website
// This file contains examples of how to use Meta Pixel tracking throughout your site

import { useMetaPixel, MetaPixelEvents } from '../hooks/useMetaPixel';

// Example 1: Basic page tracking (already implemented in useMetaPixel hook)
export const BasicPageTracking = () => {
  const { trackEvent } = useMetaPixel();
  
  // This is automatically handled by the useMetaPixel hook
  // No additional code needed for basic page views
};

// Example 2: Contact form submission tracking
export const trackContactFormSubmission = (formData) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.LEAD, {
      content_name: 'Contact Form',
      content_category: 'Lead Generation',
      value: 0,
      currency: 'EUR'
    });
  }
};

// Example 3: Service inquiry tracking
export const trackServiceInquiry = (serviceName) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.VIEW_CONTENT, {
      content_name: serviceName,
      content_category: 'Service Inquiry',
      content_type: 'service'
    });
  }
};

// Example 4: Product catalog view tracking
export const trackCatalogView = (catalogName) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.VIEW_CATALOG, {
      content_name: catalogName,
      content_category: 'Industrial Solutions'
    });
  }
};

// Example 5: Quote request tracking
export const trackQuoteRequest = (serviceType, estimatedValue) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.LEAD, {
      content_name: 'Quote Request',
      content_category: serviceType,
      value: estimatedValue,
      currency: 'EUR'
    });
  }
};

// Example 6: Newsletter subscription tracking
export const trackNewsletterSubscription = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.COMPLETE_REGISTRATION, {
      content_name: 'Newsletter Subscription',
      content_category: 'Email Marketing'
    });
  }
};

// Example 7: File download tracking
export const trackFileDownload = (fileName, fileType) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.VIEW_CONTENT, {
      content_name: fileName,
      content_category: 'Download',
      content_type: fileType
    });
  }
};

// Example 8: Video engagement tracking
export const trackVideoEngagement = (videoTitle, engagementType) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.VIEW_CONTENT, {
      content_name: videoTitle,
      content_category: 'Video',
      content_type: engagementType
    });
  }
};

// Example 9: Custom event tracking for business goals
export const trackBusinessGoal = (goalName, value = 0) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'CustomEvent', {
      event_name: goalName,
      value: value,
      currency: 'EUR'
    });
  }
};

// Example 10: E-commerce tracking (if you have products/services with prices)
export const trackPurchase = (orderValue, currency = 'EUR', orderId) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.PURCHASE, {
      value: orderValue,
      currency: currency,
      content_ids: [orderId],
      content_type: 'product'
    });
  }
};

// Example 11: Search tracking
export const trackSearch = (searchTerm, resultsCount) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', MetaPixelEvents.SEARCH, {
      search_string: searchTerm,
      content_category: 'Search Results',
      value: resultsCount
    });
  }
};

// Example 12: Time on page tracking
export const trackTimeOnPage = (pageName, timeSpent) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'CustomEvent', {
      event_name: 'TimeOnPage',
      content_name: pageName,
      value: timeSpent,
      content_category: 'Engagement'
    });
  }
};

