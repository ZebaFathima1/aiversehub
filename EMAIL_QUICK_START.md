# Quick Start: Email Integration

## ✅ What's Already Done

1. ✅ EmailJS package installed (`@emailjs/browser`)
2. ✅ Email service created (`src/services/emailService.ts`)
3. ✅ Setup guide created (`EMAIL_SETUP_GUIDE.md`)
4. ✅ Integration example created (`src/services/emailIntegrationExample.ts`)

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up with your Google account
3. Verify your email

### Step 2: Connect Gmail

1. In EmailJS dashboard → **Email Services**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Sign in with **fathimazeba882@gmail.com**
5. Copy the **Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates** → **Create New Template**
2. Name it: **"Registration Confirmation"**
3. Copy this template:

```
Subject: Registration Confirmed - {{event_name}}

Hi {{to_name}},

Thank you for registering for {{event_name}}!

Event Details:
📅 Date: {{event_date}}
📍 Venue: {{event_venue}}
🎫 Registration ID: {{registration_id}}

We're excited to have you join us!

Best regards,
AI-Verse Hub Team
```

4. Save and copy the **Template ID** (looks like: `template_xyz789`)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (looks like: `user_abc123xyz`)

### Step 5: Update Configuration

Open `src/services/emailService.ts` and update line 6-10:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'service_YOUR_ID',      // Paste your Service ID here
  templateId: 'template_YOUR_ID',    // Paste your Template ID here
  publicKey: 'YOUR_PUBLIC_KEY',      // Paste your Public Key here
};
```

### Step 6: Test It!

1. Go to `http://localhost:8080/register`
2. Fill out the registration form with your email
3. Submit the form
4. Check your email inbox! 📧

## 📧 Email Templates You Need

### Template 1: Registration Confirmation
**Template ID**: Use in `EMAILJS_CONFIG.templateId`

```
Subject: Registration Confirmed - {{event_name}}

Hi {{to_name}},

✅ Your registration for {{event_name}} has been confirmed!

📋 Event Details:
• Event: {{event_name}}
• Date: {{event_date}}
• Venue: {{event_venue}}
• Registration ID: {{registration_id}}

Next Steps:
1. Complete your payment
2. You'll receive a payment confirmation email
3. Save this email for your records

Questions? Reply to this email!

Best regards,
AI-Verse Hub Team
CSE (AIML) Department

---
Sent from: fathimazeba882@gmail.com
```

### Template 2: Payment Confirmation
**Template ID**: `payment_confirmation_template`

```
Subject: Payment Confirmed - {{event_name}}

Hi {{to_name}},

💳 Your payment has been successfully processed!

Payment Details:
• Amount: {{amount}}
• Transaction ID: {{transaction_id}}
• Event: {{event_name}}
• Status: ✅ Confirmed

Your registration is now complete! We look forward to seeing you at the event.

Best regards,
AI-Verse Hub Team

---
Sent from: fathimazeba882@gmail.com
```

## 🔧 Troubleshooting

### Emails not sending?

1. **Check Browser Console**: Look for error messages
2. **Verify IDs**: Make sure Service ID, Template ID, and Public Key are correct
3. **Check EmailJS Dashboard**: Look for error logs
4. **Gmail Settings**: 
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "Less secure app access" OR
   - Use App Passwords (recommended)

### Common Errors

| Error | Solution |
|-------|----------|
| "Invalid public key" | Double-check your public key in `emailService.ts` |
| "Service not found" | Verify your service ID |
| "Template not found" | Check template ID spelling |
| "Unauthorized" | Re-connect your Gmail in EmailJS |

## 📝 Integration Code

The email service is already integrated! Just update the configuration.

**Files that use email service:**
- `src/pages/Register.tsx` - Sends registration confirmation
- `src/pages/PaymentSuccess.tsx` - Sends payment confirmation

**Example usage:**
```typescript
import { sendRegistrationEmail } from "@/services/emailService";

await sendRegistrationEmail(
  "user@example.com",
  "John Doe",
  "AI Verse 4.0",
  "March 15-16, 2025",
  "CSE Department Auditorium",
  "REG-12345"
);
```

## 🎯 What Happens When User Registers

1. User fills registration form
2. Form submits → Registration email sent automatically
3. User proceeds to payment
4. Payment completes → Payment confirmation email sent
5. User receives 2 emails total:
   - ✉️ Registration confirmation
   - ✉️ Payment confirmation

## 💡 Tips

- **Test with your own email first**
- **Free tier**: 200 emails/month
- **All emails come from**: fathimazeba882@gmail.com
- **Users can reply** to the emails
- **Check spam folder** if emails don't appear

## 📚 Full Documentation

For detailed setup instructions, see: `EMAIL_SETUP_GUIDE.md`

## ✨ You're All Set!

Once you update the configuration in `emailService.ts`, emails will automatically send when users register! 🎉
