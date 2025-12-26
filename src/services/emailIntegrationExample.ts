// Example: How to integrate email service in Register.tsx

// 1. Add this import at the top of Register.tsx:
import { sendRegistrationEmail } from "@/services/emailService";

// 2. Replace the onSubmit function with this updated version:

const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Save registration data
        sessionStorage.setItem("registrationData", JSON.stringify(data));

        // Generate unique registration ID
        const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Send registration confirmation email
        const emailResult = await sendRegistrationEmail(
            data.email,           // User's email
            data.fullName,        // User's name
            "AI Verse 4.0",       // Event name
            "March 15-16, 2025",  // Event date
            "CSE Department Auditorium", // Event venue
            registrationId        // Registration ID
        );

        if (emailResult.success) {
            toast.success("✅ Registration email sent! Check your inbox.");
        } else {
            console.error("Email error:", emailResult.error);
            toast.warning("⚠️ Registration saved, but email failed to send.");
        }

        toast.success("Registration details saved! Proceeding to payment...");
        navigate("/payment");
    } catch (error) {
        console.error("Registration error:", error);
        toast.error("❌ Registration failed. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
};

// 3. Similarly, update PaymentSuccess.tsx to send payment confirmation:

import { sendPaymentConfirmationEmail } from "@/services/emailService";

// In the payment success handler:
const handlePaymentSuccess = async () => {
    const registrationData = JSON.parse(sessionStorage.getItem("registrationData") || "{}");

    // Send payment confirmation email
    await sendPaymentConfirmationEmail(
        registrationData.email,
        registrationData.fullName,
        "AI Verse 4.0",
        "₹1,499",
        `TXN-${Date.now()}`
    );

    toast.success("Payment confirmation email sent!");
};
