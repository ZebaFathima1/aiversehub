import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from "@/services/emailService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EmailTest = () => {
    const [serviceId, setServiceId] = useState(EMAILJS_CONFIG.serviceId);
    const [templateId, setTemplateId] = useState(EMAILJS_CONFIG.registrationTemplateId);
    const [publicKey, setPublicKey] = useState(EMAILJS_CONFIG.publicKey);
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const sendTestEmail = async () => {
        if (!serviceId || !templateId || !publicKey) {
            toast.error("Please fill in all EmailJS credentials!");
            return;
        }

        setIsSending(true);
        setEmailSent(false);

        try {
            // Initialize EmailJS with public key
            emailjs.init(publicKey);

            // Email template parameters
            const templateParams = {
                to_email: "afygamer2020@gmail.com",
                to_name: "Participant",
                from_email: "fathimazeba882@gmail.com",
                from_name: "AI-Verse Hub Team",
                event_name: "AI Verse 4.0",
                event_date: "March 15-16, 2025",
                event_venue: "CSE Department Auditorium",
                registration_id: `REG-${Date.now()}-TEST`,
                reply_to: "fathimazeba882@gmail.com",
            };

            // Send email
            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams
            );

            console.log("Email sent successfully:", response);
            toast.success("✅ Email sent successfully to afygamer2020@gmail.com!");
            setEmailSent(true);
        } catch (error: any) {
            console.error("Failed to send email:", error);
            toast.error(`❌ Failed to send email: ${error.text || error.message}`);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Email Test - AI-Verse Hub</title>
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-24 pb-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                <Mail className="w-4 h-4" />
                                Email Testing
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                                <span className="gradient-text">Send Test Email</span>
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Configure EmailJS and send a test registration email
                            </p>
                        </motion.div>

                        <div className="grid gap-6">
                            {/* Setup Instructions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Settings className="w-5 h-5" />
                                            Quick Setup Instructions
                                        </CardTitle>
                                        <CardDescription>
                                            Follow these steps to get your EmailJS credentials
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                                            <div>
                                                <p className="font-semibold">Create EmailJS Account</p>
                                                <p className="text-muted-foreground">Go to <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">emailjs.com</a> and sign up</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                                            <div>
                                                <p className="font-semibold">Connect Gmail</p>
                                                <p className="text-muted-foreground">Add Gmail service and connect fathimazeba882@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                                            <div>
                                                <p className="font-semibold">Create Email Template</p>
                                                <p className="text-muted-foreground">Create a template with variables: to_name, event_name, event_date, event_venue, registration_id</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</span>
                                            <div>
                                                <p className="font-semibold">Copy Your Credentials</p>
                                                <p className="text-muted-foreground">Get Service ID, Template ID, and Public Key from EmailJS dashboard</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Configuration Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>EmailJS Configuration</CardTitle>
                                        <CardDescription>
                                            Enter your EmailJS credentials from the dashboard
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="serviceId">Service ID</Label>
                                            <Input
                                                id="serviceId"
                                                placeholder="service_xxxxxxx"
                                                value={serviceId}
                                                onChange={(e) => setServiceId(e.target.value)}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Found in Email Services → Your Gmail Service
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="templateId">Template ID</Label>
                                            <Input
                                                id="templateId"
                                                placeholder="template_xxxxxxx"
                                                value={templateId}
                                                onChange={(e) => setTemplateId(e.target.value)}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Found in Email Templates → Your Template
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="publicKey">Public Key</Label>
                                            <Input
                                                id="publicKey"
                                                placeholder="your_public_key"
                                                value={publicKey}
                                                onChange={(e) => setPublicKey(e.target.value)}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Found in Account → General → Public Key
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Test Email Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Test Email Details</CardTitle>
                                        <CardDescription>
                                            This email will be sent to the registered participant
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">To Email</Label>
                                                <p className="font-semibold">afygamer2020@gmail.com</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">From Email</Label>
                                                <p className="font-semibold">afygamer2020@gmail.com</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Event Name</Label>
                                                <p className="font-semibold">AI Verse 4.0</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Event Date</Label>
                                                <p className="font-semibold">March 15-16, 2025</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Venue</Label>
                                                <p className="font-semibold">CSE Department Auditorium</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Registration ID</Label>
                                                <p className="font-semibold">REG-{Date.now()}-TEST</p>
                                            </div>
                                        </div>

                                        <div className="bg-muted/50 rounded-lg p-4 border border-border">
                                            <Label className="text-xs text-muted-foreground mb-2 block">Email Preview</Label>
                                            <div className="text-sm space-y-2">
                                                <p className="font-semibold">Subject: Registration Confirmed - AI Verse 4.0</p>
                                                <p className="text-muted-foreground">Hi Participant,</p>
                                                <p className="text-muted-foreground">Thank you for registering for AI Verse 4.0!</p>
                                                <p className="text-muted-foreground">Event Details: March 15-16, 2025 at CSE Department Auditorium</p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={sendTestEmail}
                                            disabled={isSending || !serviceId || !templateId || !publicKey}
                                            className="w-full gap-2"
                                            size="lg"
                                        >
                                            {isSending ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                    Sending Email...
                                                </>
                                            ) : emailSent ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    Email Sent Successfully!
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Test Email
                                                </>
                                            )}
                                        </Button>

                                        {emailSent && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3"
                                            >
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div className="text-sm">
                                                    <p className="font-semibold text-green-500">Email sent successfully!</p>
                                                    <p className="text-muted-foreground mt-1">
                                                        Check the inbox of afygamer2020@gmail.com for the registration confirmation email.
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default EmailTest;
