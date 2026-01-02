import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Loader2, Check, Shield, Lock, CheckCircle, Copy, AlertCircle } from "lucide-react";
import { sendPaymentConfirmationEmail } from "@/services/emailService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/animations/PageTransition";
import TiltCard from "@/components/animations/TiltCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paymentApi } from "@/lib/api";

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const UPI_ID = "7993759775@axl";
  const QR_CODE_IMAGE = "/payment-qr.jpg";

  useEffect(() => {
    const data = sessionStorage.getItem("registrationData");
    if (!data) {
      toast.error("Please complete registration first");
      navigate("/register");
      return;
    }
    setRegistrationData(JSON.parse(data));
  }, [navigate]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  const handlePayment = async () => {
    if (!enteredAmount) {
      toast.error("Please enter the amount you paid");
      return;
    }

    if (!paymentScreenshot) {
      toast.error("Please upload the payment screenshot to verify your transaction");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("email", registrationData.email);
      formData.append("amount", enteredAmount);
      formData.append("payment_screenshot", paymentScreenshot);
      formData.append("transaction_id", `TXN${Date.now()}`); // Or ask user for it?
      // The previous code generated transaction ID automatically. 
      // But usually user should enter it or we generate it. 
      // The UI has "Transaction ID" placeholder? No, just "Enter Amount Paid".
      // And "Please ensure Transaction ID is visible in screenshot".
      // So we generate a reference ID.

      // Note: Backend 'PaymentViewSet.create' expects 'email', 'amount', 'transaction_id' (optional?), 'payment_screenshot'.
      // My backend implementation creates 'payment_screenshot' from request.

      await paymentApi.create(formData);

      // Send Payment Confirmation Email (Backend should ideally do this, but keeping frontend logic for consistency with Register)
      const registrationId = `AIVERSE4-${Date.now().toString(36).toUpperCase()}`; // Just for email display

      toast.info("Sending payment confirmation...");
      const emailResult = await sendPaymentConfirmationEmail(
        registrationData.email,
        registrationData.fullName,
        "AI Verse 4.0",
        `₹${enteredAmount}`,
        registrationId
      );

      if (emailResult.success) {
        toast.success("Payment confirmation email sent!");
      } else {
        console.error("Payment email failed:", emailResult.error);
        toast.warning("Payment saved, but email failed. Check EmailJS config.");
      }

      toast.success("Payment proof uploaded successfully!");
      navigate("/payment-success");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("❌ Payment submission failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!registrationData) return null;

  return (
    <>
      <Helmet>
        <title>Payment | AI Verse 4.0 | CSE (AIML)</title>
        <meta name="description" content="Complete your payment for AI Verse 4.0 registration." />
      </Helmet>

      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navbar />

          <main className="pt-24 pb-16">
            <div className="container mx-auto px-4">
              {/* Back Link */}
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Payment Section */}
                  <motion.div
                    className="lg:col-span-3"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-card rounded-2xl shadow-elevated p-6 sm:p-8">
                      <h1 className="text-2xl font-display font-bold mb-6">
                        <span className="gradient-text">Complete Payment</span>
                      </h1>

                      {/* QR Code Section */}
                      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl mb-6 border-2 border-dashed border-border">
                        <p className="text-black font-semibold mb-4 text-center">Scan QR Code to Pay</p>
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-4">
                          <img
                            src={QR_CODE_IMAGE}
                            alt="Payment QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg w-full max-w-[280px] sm:max-w-sm justify-between">
                          <code className="text-black font-mono px-2 text-[10px] sm:text-xs md:text-base truncate">{UPI_ID}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 hover:text-black hover:bg-gray-200"
                            onClick={handleCopyUpi}
                          >
                            {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          Pay using PhonePe, Google Pay, Paytm or any UPI app
                        </p>
                      </div>

                      {/* Manual Amount Entry */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                          <span className="text-primary">₹</span>
                          Enter Amount Paid
                        </div>
                        <Input
                          type="number"
                          placeholder="e.g. 459"
                          value={enteredAmount}
                          onChange={(e) => setEnteredAmount(e.target.value)}
                          className="text-lg"
                        />
                      </div>

                      {/* Upload Screenshot Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                          <Upload className="w-5 h-5 text-primary" />
                          Upload Payment Screenshot
                        </div>

                        <div
                          className={cn(
                            "border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer relative overflow-hidden",
                            paymentScreenshot ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          )}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />

                          {screenshotPreview ? (
                            <div className="flex flex-col items-center">
                              <img
                                src={screenshotPreview}
                                alt="Screenshot Preview"
                                className="h-48 object-contain rounded-lg mb-2 shadow-sm"
                              />
                              <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" /> Screenshot selected
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center py-4">
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 text-muted-foreground">
                                <Upload className="w-6 h-6" />
                              </div>
                              <p className="text-sm font-medium mb-1">Click to upload screenshot</p>
                              <p className="text-xs text-muted-foreground">JPG, PNG or PDF confirmed payment receipt</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Security Notice */}
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mt-6">
                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Please ensure the <strong>Transaction ID</strong> is visible in the uploaded screenshot for verification.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        variant="gradient"
                        size="xl"
                        className="w-full mt-6 group"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Submit Payment Proof
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>

                  {/* Order Summary */}
                  <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <TiltCard tiltAmount={8}>
                      <div className="bg-card rounded-2xl shadow-elevated p-6 sticky top-24">
                        <h2 className="font-display font-bold text-lg mb-4">Order Summary</h2>

                        {/* Event Details */}
                        <div className="pb-4 border-b border-border">
                          <h3 className="font-semibold gradient-text">AI Verse 4.0</h3>
                          <p className="text-sm text-muted-foreground">January 21-23, 2026</p>
                        </div>

                        {/* Registrant Info */}
                        <div className="py-4 border-b border-border space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Name</span>
                            <span className="font-medium">{registrationData.fullName}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Email</span>
                            <span className="font-medium truncate max-w-[150px]">{registrationData.email}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">College</span>
                            <span className="font-medium truncate max-w-[150px]">{registrationData.collegeName}</span>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="py-4 border-b border-border space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Registration Fee</span>
                            <span>₹459</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Processing Fee</span>
                            <span>₹0</span>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="pt-4 flex justify-between items-center">
                          <span className="font-semibold">Total Amount</span>
                          <span className="text-2xl font-display font-bold gradient-text">₹459</span>
                        </div>

                        {/* Features */}
                        <div className="mt-6 space-y-2">
                          {[
                            "2-day full access pass",
                            "Workshop materials included",
                            "Certificate of participation",
                            "Lunch & refreshments",
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-secondary" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </PageTransition>
    </>
  );
};

export default Payment;
