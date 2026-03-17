# Conversion Events - Detailing Vertex

## Event Names

### 1. WhatsApp Conversion
**Event Name:** `whatsapp_conversion`
- **Description:** Tracks all WhatsApp button clicks across the landing page
- **Trigger:** When user clicks any WhatsApp button (navbar, floating button, etc.)
- **Value:** 1
- **Currency:** INR

### 2. Call Conversion
**Event Name:** `call_conversion`
- **Description:** Tracks all call button clicks across the landing page
- **Trigger:** When user clicks any call/phone button (floating button, etc.)
- **Value:** 1
- **Currency:** INR

### 3. Form Submission Conversion
**Event Name:** `form_submission_conversion`
- **Description:** Tracks form submissions ONLY when user successfully reaches the thank-you page
- **Trigger:** When user lands on `thank-you.html` after form submission
- **Value:** 1
- **Currency:** INR
- **Additional Parameters:**
  - `form_type`: 'hero' or 'contact'
  - `service_selected`: Selected service name

## Setup Instructions

### In Google Analytics 4 (GA4):
1. Go to **Admin** → **Events**
2. Mark these events as conversions:
   - `whatsapp_conversion`
   - `call_conversion`
   - `form_submission_conversion`

### In Google Tag Manager:
1. Create triggers for each conversion event
2. Set up Google Ads conversion tracking tags
3. Link conversion events to Google Ads conversion actions

### In Google Ads:
1. Create conversion actions for:
   - WhatsApp clicks
   - Call clicks
   - Form submissions
2. Import conversions from GA4 or set up via GTM

## Tracking Accuracy

- **WhatsApp & Call:** Tracked immediately on click (no page navigation required)
- **Form Submission:** Only tracked when user reaches thank-you page (ensures accurate conversion tracking)
- All events are sent to both GA4 and Google Ads via GTM

## Current Configuration

- **GTM Container ID:** GTM-NH9NJL9M
- **GA4 Measurement ID:** G-QQK0249HJD
