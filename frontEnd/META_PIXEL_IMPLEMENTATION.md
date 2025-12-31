# Meta Pixel Implementation for SMAB Website

## Overview
Meta Pixel has been successfully implemented on your SMAB website to track user interactions and conversions. This implementation includes both basic page tracking and advanced event tracking for lead generation.

## What's Been Implemented

### 1. Basic Meta Pixel Setup
- **Location**: `index.html` (lines 17-33)
- **Pixel ID**: `1079737501473790`
- **Features**: 
  - Automatic page view tracking
  - Noscript fallback for users with JavaScript disabled
  - Loads immediately when the page loads

### 2. React Hook for Advanced Tracking
- **File**: `src/hooks/useMetaPixel.js`
- **Features**:
  - Automatic page view tracking on route changes
  - Helper functions for custom event tracking
  - Conversion tracking with value and currency
  - Pre-defined event constants for common e-commerce events

### 3. Meta Pixel Component
- **File**: `src/components/MetaPixel.jsx`
- **Purpose**: Fallback component for advanced React implementations
- **Features**: Helmet integration for dynamic pixel loading

### 4. Contact Form Tracking
- **File**: `src/pages/Contact.jsx` (updated)
- **Tracked Events**:
  - Contact form submissions (Lead event)
  - WhatsApp contact attempts (Contact event)
  - Email contact attempts (Contact event)

### 5. Example Implementation Guide
- **File**: `src/utils/metaPixelExamples.js`
- **Contains**: 12 different tracking examples for various business scenarios

## How to Use

### Basic Usage (Already Working)
The Meta Pixel is automatically tracking:
- Page views on all pages
- Route changes in your React app

### Advanced Usage in Components

```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';

const MyComponent = () => {
  const { trackEvent, trackConversion } = useMetaPixel();

  const handleButtonClick = () => {
    trackEvent('CustomEvent', {
      content_name: 'Button Clicked',
      content_category: 'User Interaction'
    });
  };

  const handlePurchase = (value) => {
    trackConversion('Purchase', value, 'EUR');
  };

  return (
    <button onClick={handleButtonClick}>
      Track This Click
    </button>
  );
};
```

### Available Event Types
- `ViewContent` - Content viewing
- `AddToCart` - Add to cart actions
- `InitiateCheckout` - Checkout start
- `Purchase` - Completed purchases
- `Lead` - Lead generation
- `Contact` - Contact attempts
- `Search` - Search actions
- `ViewCatalog` - Catalog viewing
- `AddToWishlist` - Wishlist actions
- `CompleteRegistration` - User registration

## Testing Your Implementation

### 1. Facebook Pixel Helper (Chrome Extension)
- Install the Facebook Pixel Helper extension
- Visit your website
- Check that the pixel is firing correctly
- Verify events are being tracked

### 2. Facebook Events Manager
- Go to your Facebook Business Manager
- Navigate to Events Manager
- Check the "Test Events" tab
- Verify that events are being received

### 3. Browser Developer Tools
- Open browser dev tools
- Go to Network tab
- Look for requests to `connect.facebook.net`
- Check for `fbevents.js` loading

## Customization Options

### 1. Adding New Tracking Points
To track new events, simply use the hook in any component:

```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';

const { trackEvent } = useMetaPixel();

// Track service inquiries
trackEvent('ViewContent', {
  content_name: 'Service Inquiry',
  content_category: 'Industrial Solutions'
});
```

### 2. E-commerce Tracking
If you add e-commerce features, use the conversion tracking:

```javascript
const { trackConversion } = useMetaPixel();

// Track a quote request with value
trackConversion('Lead', 5000, 'EUR');
```

### 3. Custom Events
For business-specific tracking:

```javascript
trackEvent('CustomEvent', {
  event_name: 'Service Request',
  content_name: 'Industrial Consultation',
  value: 1000,
  currency: 'EUR'
});
```

## Files Modified/Created

### Modified Files:
- `index.html` - Added Meta Pixel code
- `src/pages/Contact.jsx` - Added lead and contact tracking

### New Files Created:
- `src/hooks/useMetaPixel.js` - React hook for tracking
- `src/components/MetaPixel.jsx` - React component for advanced usage
- `src/utils/metaPixelExamples.js` - Implementation examples
- `META_PIXEL_IMPLEMENTATION.md` - This documentation

## Next Steps

1. **Test the implementation** using Facebook Pixel Helper
2. **Set up conversion goals** in Facebook Ads Manager
3. **Create custom audiences** based on tracked events
4. **Add more tracking points** as needed for your business goals

## Support

If you need to add more tracking points or modify the implementation:
1. Use the examples in `src/utils/metaPixelExamples.js`
2. Follow the pattern in `src/pages/Contact.jsx`
3. Import and use the `useMetaPixel` hook in any component

The implementation is now ready and will start collecting data immediately!

