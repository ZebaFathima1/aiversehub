import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, User, LogOut, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import PosterModal from "@/components/PosterModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      // Check persistent profile first
      const userProfile = localStorage.getItem("userProfile");
      const userData = sessionStorage.getItem("userData");

      if (userProfile) {
        const parsed = JSON.parse(userProfile);
        setIsLoggedIn(true);
        setUserName(parsed.name || parsed.email || "User");
      } else if (userData) {
        const parsed = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(parsed.name || parsed.email || "User");
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkAuth();
    // Listen for storage changes
    window.addEventListener("storage", checkAuth);
    // Custom event for same-tab updates
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    sessionStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserName("");
    window.dispatchEvent(new Event("authChange"));
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#events", label: "Events" },
    { href: "/#upcoming", label: "AI Verse 4.0" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#team", label: "Team" },
    { href: "/ai-verse-4", label: "🎨 AI Verse 4.0 Poster", highlight: true },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo & Branding - Premium Design */}
          <Link to="/" className="flex items-center gap-4 group hoverable">
            {/* Logo Container with Glow */}
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />

              {/* Transparent Logo Container */}
              <motion.div
                className="relative w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:h-24 flex items-center justify-center p-1 flex-shrink-0"
                whileHover={{
                  scale: 1.05,
                  rotate: 3,
                  filter: "drop-shadow(0 0 15px rgba(0, 217, 255, 0.4))"
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <img
                  src="/logo.png"
                  alt="Vaagdevi College of Engineering Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Text Branding */}
            <div className="flex flex-col gap-1">
              {/* Department Title with Gradient */}
              <motion.span
                className="font-display font-bold text-lg sm:text-xl lg:text-2xl leading-tight text-cyan-400 truncate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                CSE (AI&ML)
              </motion.span>

              {/* Accent Line */}
              <motion.div
                className="h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* College Name - Highlighted */}
              <motion.span
                className={cn(
                  "text-[10px] sm:text-xs lg:text-lg font-bold leading-tight tracking-wide line-clamp-1 transition-colors duration-300",
                  isScrolled ? "text-slate-900" : "text-slate-100 drop-shadow-md"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Vaagdevi College of Engineering
              </motion.span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {[{ href: "/", label: "Home" },
            { href: "/#events", label: "Events" },
            { href: "/#upcoming", label: "AI Verse 4.0" },
            { href: "/#gallery", label: "Gallery" },
            { href: "/#team", label: "Team" }
            ].map((link, index) => {
              const isActive = location.pathname === link.href || (link.href !== '/' && location.hash === link.href.split('#')[1]);

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full group",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              );
            })}

            {/* AI Verse 4.0 Poster - Highlighted Button */}
            <motion.button
              onClick={() => setIsPosterModalOpen(true)}
              className="relative px-5 py-2.5 text-sm font-extrabold rounded-full overflow-hidden group cursor-pointer shadow-lg shadow-primary/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 blur-lg bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60" />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Text */}
              <span className="relative z-10 text-white drop-shadow-lg flex items-center gap-2 font-bold tracking-wide">
                <Sparkles className="w-4 h-4 animate-pulse" />
                AI Verse 4.0 Poster
                <Sparkles className="w-4 h-4 animate-pulse" />
              </span>

              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 border-2 border-white/40 rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </div>

          {/* CTA Buttons / User Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors hoverable"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                      {userName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-2 text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="default" className="hoverable">
                      Login
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="gradient" size="default" className="hoverable">
                      Register Now
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-foreground hoverable"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-4 border-t border-border/50 overflow-hidden"
            >
              <motion.div className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  // Special handling for poster link
                  if (link.highlight) {
                    return (
                      <motion.button
                        key={link.href}
                        onClick={() => {
                          setIsPosterModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-sm font-extrabold text-white hover:text-white/90 transition-colors text-left px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 border-2 border-white/20 shadow-lg shadow-primary/50 flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Sparkles className="w-4 h-4" />
                        {link.label.replace('🎨 ', '')}
                        <Sparkles className="w-4 h-4" />
                      </motion.button>
                    );
                  }

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{userName}</p>
                        <p className="text-xs text-muted-foreground">View Profile</p>
                      </div>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full mb-2">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="gradient" className="w-full">
                        Register Now
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Poster Modal */}
      <PosterModal isOpen={isPosterModalOpen} onClose={() => setIsPosterModalOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
