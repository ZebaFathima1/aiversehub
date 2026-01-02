import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Mail, Phone, Building, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/animations/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { sendRegistrationEmail } from "@/services/emailService";
import { registrationApi } from "@/lib/api";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
  collegeName: z.string().min(2, "College name is required").max(200, "College name must be less than 200 characters"),
  branchName: z.string().min(1, "Please select your branch"),
  yearOfStudy: z.string().min(1, "Please select your year of study"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const branches = [
  "Computer Science & Engineering",
  "CSE (AI & ML)",
  "CSE (Data Science)",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "PG - 1st Year", "PG - 2nd Year"];

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      collegeName: "",
      branchName: "",
      yearOfStudy: "",
    },
  });



  // ... inside component ...

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    try {
      // Submit to backend
      await registrationApi.create(data);

      // Save registration data for Payment page
      sessionStorage.setItem("registrationData", JSON.stringify(data));

      // Save persistent user profile
      localStorage.setItem("userProfile", JSON.stringify({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        college: data.collegeName,
        department: data.branchName,
        year: data.yearOfStudy,
        location: "India", // Default or derive
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        bio: "Passionate about technology and innovation.",
        avatar: ""
      }));

      // Generate unique registration ID (Client side ID for email, backend generates its own but we use this for display)
      const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Send automatic registration confirmation email
      console.log("Sending registration email to:", data.email);
      const emailResult = await sendRegistrationEmail(
        data.email,              // User's email
        data.fullName,           // User's name
        "AI Verse 4.0",          // Event name
        "January 21-23, 2026",     // Event date
        "CSE Department Auditorium", // Event venue
        registrationId           // Registration ID
      );

      if (emailResult.success) {
        toast.success("✅ Registration confirmed! Check your email for details.");
      } else {
        console.error("Email error:", emailResult.error);
        toast.warning("⚠️ Registration saved, but email notification failed. Please check EmailJS configuration.");
      }

      toast.success("Registration details saved! Proceeding to payment...");
      navigate("/payment");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.response?.data?.message === 'Already registered') {
        // If already registered, still proceed to payment (maybe they missed payment step)
        toast.info("You are already registered! Proceeding to payment...");
        sessionStorage.setItem("registrationData", JSON.stringify(data));
        navigate("/payment");
        return;
      }
      toast.error("❌ Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register for AI Verse 4.0 | CSE (AIML)</title>
        <meta name="description" content="Register for AI Verse 4.0 - The Next Frontier of Artificial Intelligence. Join us for workshops, hackathons, and expert talks." />
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

              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    <Sparkles className="w-4 h-4" />
                    AI Verse 4.0
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                    <span className="gradient-text">Event Registration</span>
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Fill in your details to secure your spot at the biggest AI event of the year.
                  </p>
                  <p className="text-sm text-primary mt-2">
                    📧 You'll receive an automatic confirmation email after registration
                  </p>
                </motion.div>

                {/* Registration Form */}
                <motion.div
                  className="bg-card rounded-2xl shadow-elevated p-6 sm:p-8 md:p-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="10-digit mobile number"
                                  className="h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* College Name */}
                      <FormField
                        control={form.control}
                        name="collegeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-primary" />
                              College / University Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your college name"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Branch & Year */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="branchName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-primary" />
                                Branch / Department
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select your branch" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {branches.map((branch) => (
                                    <SelectItem key={branch} value={branch}>
                                      {branch}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="yearOfStudy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                Year of Study
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Event Info */}
                      <div className="bg-muted/50 rounded-xl p-6 border border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">AI Verse 4.0</h3>
                            <p className="text-sm text-muted-foreground">January 21-23, 2026</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-display font-bold gradient-text">₹459</p>
                            <p className="text-xs text-muted-foreground">Registration Fee</p>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="gradient"
                        size="xl"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Processing..."
                        ) : (
                          <>
                            Proceed to Payment
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </PageTransition>
    </>
  );
};

export default Register;
