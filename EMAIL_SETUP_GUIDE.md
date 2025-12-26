# EmailJS Manual Setup Guide

Since the automated system is currently rate-limited, please follow these steps to finish setting up your email system.

## 1. Login to EmailJS
Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates) and log in.

## 2. Create "Payment Confirmation" Template
1. Click **"Create New Template"**.
2. **Name:** `Payment Confirmation`
3. **Subject:** `Payment Received - AI Verse 4.0`
4. **Content (Edit the email body):**
   ```text
   Hi {{to_name}},
   
   We have successfully received your payment of {{amount}} for {{event_name}}.
   
   Transaction ID: {{transaction_id}}
   
   See you at the event!
   
   Sent by AI-Verse Hub Team
   ```
5. **To Email:** `{{to_email}}` (Make sure this variable is used!)
6. **Save** the template.
7. **Copy the Template ID** (it looks like `template_xxxxxx`).

## 3. Create "Welcome" Template (Optional)
1. Provide similar details if you want a general welcome email for new signups.
   - **Subject:** `Welcome to AI-Verse Hub!`
   - **Content:** `Hi {{to_name}}, Welcome to our community!`
   - **To Email:** `{{to_email}}`
2. **Save** and **Copy Template ID**.

## 4. Update Your Code
1. Open `src/services/emailService.ts`.
2. Locate the `EMAILJS_CONFIG` object at the top.
3. Replace the placeholder strings with your new IDs:

```typescript
export const EMAILJS_CONFIG = {
    serviceId: 'service_i3nkq6k',
    registrationTemplateId: 'template_b9p34ap', // EXISTING (Do not change)
    paymentTemplateId: 'PASTE_PAYMENT_TEMPLATE_ID_HERE', // <--- UPDATE THIS
    welcomeTemplateId: 'PASTE_WELCOME_TEMPLATE_ID_HERE', // <--- UPDATE THIS
    publicKey: 'ggklpphbsPoVt94fW',
};
```
