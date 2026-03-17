# Google Tag Manager & GA4 Setup Guide

## Step 1: Get Your GTM Container ID

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container or use an existing one
3. Copy your Container ID (format: GTM-XXXXXXX)

## Step 2: Replace GTM Container ID in index.html

In `index.html`, replace `GTM-XXXXXXX` with your actual GTM Container ID in two places:
- In the `<head>` section (around line 10)
- In the `<noscript>` section (right after `<body>` tag)

## Step 3: Set Up GA4 in Google Tag Manager

1. In GTM, go to **Tags** → **New**
2. Tag Type: **Google Analytics: GA4 Configuration**
3. Measurement ID: Enter your GA4 Measurement ID (format: G-XXXXXXXXXX)
4. Trigger: **All Pages**
5. Save and publish

## Step 4: Set Up Conversion Events in GA4

1. In Google Analytics 4, go to **Admin** → **Events**
2. Mark these events as conversions:
   - `form_submission`
   - `phone_click`
   - `whatsapp_click`
   - `button_click` (optional)

## Step 5: Set Up Google Ads Conversion Tracking

1. In Google Ads, go to **Tools & Settings** → **Conversions**
2. Click **+ New conversion action**
3. Select **Website** as the source
4. Choose the conversion action (e.g., "Form Submission")
5. Copy the **Conversion ID** and **Conversion Label**

## Step 6: Configure Google Ads Conversion in GTM

1. In GTM, create a new tag: **Google Ads: Conversion Tracking**
2. Enter your Conversion ID and Label
3. Set up triggers for:
   - `form_submission` event
   - `phone_click` event
   - `whatsapp_click` event
4. Save and publish

## Step 7: Update Conversion IDs in script.js

In `script.js`, replace `AW-CONVERSION_ID/CONVERSION_LABEL` with your actual:
- Conversion ID (format: AW-XXXXXXXXX)
- Conversion Label (format: AbC-dEfG-hIjK)

Example:
```javascript
'send_to': 'AW-123456789/AbC-dEfG-hIjK'
```

## Events Being Tracked

### Form Submissions
- **Hero Form**: When user submits the appointment form in hero section
- **Contact Form**: When user submits the contact form
- Events: `form_submission`, `conversion`

### Button Clicks
- **Book Appointment** buttons
- **Get Free Estimate** buttons
- **Contact Us** buttons
- Event: `button_click`

### Contact Actions
- **Phone clicks**: When user clicks phone number
- **WhatsApp clicks**: When user clicks WhatsApp button
- Events: `phone_click`, `whatsapp_click`

### Service Interactions
- **Service card clicks**: When user clicks on a service card
- Event: `service_view`

## Testing

1. Use **GTM Preview Mode** to test events
2. Check **GA4 Real-time reports** to verify events are firing
3. Use **Google Ads Conversion Tracking** to verify conversions

## Notes

- All events are pushed to `dataLayer` for GTM to process
- Conversion events include `conversion_value` for Google Ads
- Events are structured for both GA4 and Google Ads compatibility
