import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, CirclePlus, User, Menu, X, ShoppingBag, LogOut, Settings } from 'lucide-react';
import { logout } from "@/utils/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is connected using window.auth.isAuthenticated
    const walletConnected = window.auth?.isAuthenticated || false;
    setIsWalletConnected(walletConnected);
  }, [location]);

  const handleDisconnect = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const baseNavItems = [
    { name: 'Home', path: '/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai', icon: Home },
    { name: 'Marketplace', path: '/marketplace?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai', icon: ShoppingBag },
    { name: 'Credits', path: '/credits?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai', icon: CirclePlus },
  ];

  const authenticatedNavItems = [
    { name: 'Profile', path: '/profile?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai', icon: User },
    { name: 'Settings', path: '/profile/settings?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai', icon: Settings },
  ];

  const navItems = isWalletConnected ? [...baseNavItems, ...authenticatedNavItems] : baseNavItems;

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo with enhanced design */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="BeeTrace" 
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              BeeTrace
            </span>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300 relative overflow-hidden group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-lg'
                    : 'text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-bold">{item.name}</span>
                
                {/* Active indicator */}
                {isActive(item.path) && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* CTA Button with enhanced styling */}
          <div className="hidden md:block">
            {window.auth?.isAuthenticated ? (
              <Button 
                onClick={handleDisconnect}
                variant="outline"
                className="font-bold px-8 py-4 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </Button>
            ) : (
              <Link to="/wallet-login?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
                <Button className="btn-modern bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Connect Wallet
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button with enhanced design */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-3 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 glass-card"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation with enhanced styling */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/20 glass-card-dark rounded-b-2xl mt-2">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-bold transition-all duration-300 mx-2 stagger-animation ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-lg'
                      : 'text-muted-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-bold">{item.name}</span>
                </Link>
              ))}
              {window.auth?.isAuthenticated ? (
                <Button 
                  onClick={() => {
                    handleDisconnect();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full font-bold py-4 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 mx-2 mt-4"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </Button>
              ) : (
                <Link to="/wallet-login?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai" onClick={() => setIsMenuOpen(false)} className="mx-2 mt-4">
                  <Button className="w-full btn-modern bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold py-4 rounded-2xl shadow-lg">
                    Connect Wallet
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;