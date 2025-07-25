
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="BeeTrace" className="h-8 w-auto" />
              <span className="text-xl font-bold">BeeTrace</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering Kenyan beekeepers with blockchain technology for honey traceability, 
              crowdfunding, and environmental impact monetization.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/track" className="hover:text-white transition-colors">Track Honey</Link></li>
              <li><Link to="/invest" className="hover:text-white transition-colors">Invest</Link></li>
              <li><Link to="/credits" className="hover:text-white transition-colors">Carbon Credits</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 BeeTrace. Built on Internet Computer Protocol (ICP). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
