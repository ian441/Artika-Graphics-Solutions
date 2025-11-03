import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'portfolio', label: 'Portfolio', path: '/portfolio' },
    { id: 'contact', label: 'Contact', path: '/contact' },
    { id: 'admin', label: 'Admin', path: '/admin' },
    { id: 'signin', label: 'Sign In', path: '/signin' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-soft border-b border-neutral-200/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-purple transition-shadow duration-300">
                <img
                  src="/images/IMG-20250903-WA0000.jpg"
                  alt="Artika Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
              </div>
            </div>
            <span className={`text-2xl font-bold font-display transition-colors duration-300 ${
              scrolled ? 'text-neutral-900' : 'text-white'
            }`}>
              Artika
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-gray-50'
                    : scrolled
                      ? 'text-neutral-700 hover:text-primary-600 hover:bg-white-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${
                  isActive(item.path) ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Social icons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="#"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  scrolled
                    ? 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  scrolled
                    ? 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  scrolled
                    ? 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  scrolled
                    ? 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
            </div>



            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'text-neutral-700 hover:bg-neutral-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-large transform transition-transform duration-300 ease-out z-50 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <Link to="/" className="flex items-center space-x-3" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <img
                    src="/images/IMG-20250903-WA0000.jpg"
                    alt="Artika Logo"
                    className="w-8 h-8 rounded-md object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-neutral-900 font-display">Artika</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
                aria-label="Close menu"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>



              {/* Mobile Social Links */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-500 mb-4">Follow us</p>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
  