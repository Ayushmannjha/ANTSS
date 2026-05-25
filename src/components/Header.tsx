import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { useScrollHeader } from '@/hooks/useAnimations';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Industries', href: '#industries' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
  { name: 'Prescription', href: '#prescription' },
];

export function Header() {
  const isScrolled = useScrollHeader();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // Small delay to allow menu close animation and body overflow reset
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-slate-900/80 backdrop-blur-lg border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-bold text-xl sm:text-2xl flex">
              <span className="text-orange-500">A</span>
              <span className="text-red-500">N</span>
              <span className="text-amber-400">T</span>
              <span className="text-orange-400">S</span>
              <span className="text-red-400">S</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-white transition-colors relative group text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
            
            {/* Desktop Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-95 text-white px-4.5 py-2 rounded-xl text-sm font-semibold shadow-md transition-all active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 text-white flex items-center gap-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-slate-900/95 backdrop-blur-lg"
      >
        <nav className="px-4 py-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: mobileMenuOpen ? 0 : -20,
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors text-sm font-medium"
            >
              {item.name}
            </motion.button>
          ))}

          {/* Mobile Login Button */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{
              x: mobileMenuOpen ? 0 : -20,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ delay: navItems.length * 0.1 }}
            className="pt-2"
          >
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white w-full py-3 rounded-xl text-sm font-semibold shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Login to Dashboard</span>
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </motion.header>
  );
}
