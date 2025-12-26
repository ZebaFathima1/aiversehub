import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You need to set up your EmailJS account at https://www.emailjs.com/
// and replace these values with your actual credentials

export const EMAILJS_CONFIG = {
    serviceId: 'service_i3nkq6k',        // Your Gmail Service ID
    registrationTemplateId: 'template_b9p34ap', // Registration Template ID
    paymentTemplateId: 'template_2qxhqly',      // Payment Template ID
    welcomeTemplateId: 'welcome_template',      // REPLACE THIS with real ID after creating template
    publicKey: 'ggklpphbsPoVt94fW',             // Your Public Key
};

// Initialize EmailJS
export const initEmailJS = () => {
    emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Send registration confirmation email
export const sendRegistrationEmail = async (
    userEmail: string,
    userName: string,
    eventName: string,
    eventDate: string,
    eventVenue: string,
    registrationId: string
) => {
    try {
        const templateParams = {
            to_email: userEmail,
            to_name: userName,
            from_email: 'afygamer2020@gmail.com',
            from_name: 'AI-Verse Hub Team',
            event_name: eventName,
            event_date: eventDate,
            event_venue: eventVenue,
            registration_id: registrationId,
            reply_to: 'afygamer2020@gmail.com',
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.registrationTemplateId,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
};

// Send payment confirmation email
export const sendPaymentConfirmationEmail = async (
    userEmail: string,
    userName: string,
    eventName: string,
    amount: string,
    transactionId: string
) => {
    try {
        const templateParams = {
            to_email: userEmail,
            to_name: userName,
            from_email: 'afygamer2020@gmail.com',
            from_name: 'AI-Verse Hub Team',
            event_name: eventName,
            amount: amount,
            transaction_id: transactionId,
            reply_to: 'afygamer2020@gmail.com',
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.paymentTemplateId,
            templateParams
        );

        console.log('Payment confirmation email sent:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send payment confirmation:', error);
        return { success: false, error };
    }
};

// Send welcome email to new users
export const sendWelcomeEmail = async (
    userEmail: string,
    userName: string
) => {
    try {
        const templateParams = {
            to_email: userEmail,
            to_name: userName,
            from_email: 'afygamer2020@gmail.com',
            from_name: 'AI-Verse Hub Team',
            reply_to: 'afygamer2020@gmail.com',
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.welcomeTemplateId,
            templateParams
        );

        console.log('Welcome email sent:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        return { success: false, error };
    }
};
