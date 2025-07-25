import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Layout = ({ 
  children, 
  showNavbar = true, 
  showFooter = true, 
  className = "min-h-screen bg-gradient-to-b from-background to-accent/20" 
}) => {
  return (
    <div className={className}>
      <Toaster />
      <Sonner />
      {showNavbar && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;