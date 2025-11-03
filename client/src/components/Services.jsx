// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';

const Services = () => {
  const [selectedTier, setSelectedTier] = useState('professional');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const serviceCategories = [
    {
      id: 'brand-design',
      icon: 'fas fa-paint-brush',
      title: 'Brand Design',
      description: 'Create a memorable brand identity with custom logos, color palettes, and comprehensive brand guidelines that tell your unique story.',
      image: 'https://fedica.com/blog/wp-content/uploads/2017/08/graphic-designer.jpg'
    },
    {
      id: 'ui-design',
      icon: 'fas fa-desktop',
      title: 'UI/UX Design',
      description: 'Craft intuitive and visually stunning user interfaces that enhance user experience and drive engagement across all digital platforms.',
      image: 'https://www.thegotoguy.co/blog/wp-content/uploads/2024/11/xa.jpg'
    },
    {
      id: 'illustration',
      icon: 'fas fa-pencil-alt',
      title: 'Illustration',
      description: 'Bring your ideas to life with custom illustrations, digital artwork, and creative visuals that capture attention and imagination.',
      image: 'https://design4users.com/wp-content/uploads/2021/08/getting-design-job-tips-blog-article.jpeg'
    },
    {
      id: 'print-design',
      icon: 'fas fa-print',
      title: 'Print Design',
      description: 'Design eye-catching marketing materials, business cards, brochures, and packaging that make a lasting impression.',
      image: 'https://img.freepik.com/premium-photo/fashion-designer-sketch-drawing-costume-concept_53876-46967.jpg'
    },
    {
      id: 'motion-graphics',
      icon: 'fas fa-film',
      title: 'Motion Graphics',
      description: 'Create engaging animations and motion graphics that bring your brand to life and captivate your audience across all platforms.',
      image: 'https://www.andacademy.com/resources/wp-content/uploads/2025/02/image4-9-1024x574.jpg'
    },
    {
      id: 'social-media',
      icon: 'fas fa-camera',
      title: 'Social Media Design',
      description: 'Design scroll-stopping social media content that builds engagement and strengthens your brand presence online.',
      image: 'https://sachsmarketinggroup.com/wp-content/uploads/2025/07/iStock-2163027477-1024x606.jpg'
    },
  ];

  const pricingTiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$299',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Up to 5 projects',
        'Basic support',
        'Standard templates',
        'Email integration',
        'Monthly reports'
      ],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$599',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 20 projects',
        'Priority support',
        'Custom designs',
        'Advanced integrations',
        'Weekly reports',
        'Team collaboration',
        'API access'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$999',
      period: '/month',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited projects',
        '24/7 dedicated support',
        'Fully custom solutions',
        'Enterprise integrations',
        'Real-time analytics',
        'Advanced team features',
        'White-label options',
        'SLA guarantee'
      ],
      recommended: false
    }
  ];

  const filteredCategories = selectedCategory === 'all'
    ? serviceCategories
    : serviceCategories.filter(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.6);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      {/* Hero Section */}
      <section className={`relative w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-glow"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center h-[80vh]">
          <div className="transform transition-all duration-1000 ease-out">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 animate-fade-in-up">
              Creative Design Services
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Transform your brand with our professional design services. From stunning visuals to engaging motion graphics,
              we bring your creative vision to life with precision and artistic excellence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25">
                <i className="fas fa-rocket mr-2"></i>
                Get Started
              </button>
              <button className="border-2 border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-slate-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                <i className="fas fa-play mr-2"></i>
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section id="services" className="py-20 bg-gradient-to-br from-slate-800 via-purple-800 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">What We Offer</h2>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of services designed to meet your business needs
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12 animate-fade-in-up delay-300">
            <div className="glass-morphism rounded-full p-2 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer font-semibold ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg animate-glow'
                    : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                All Services
              </button>

              <button
                onClick={() => setSelectedCategory('brand-design')}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer font-semibold ${
                  selectedCategory === 'brand-design'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg animate-glow'
                    : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                Branding
              </button>

              <button
                onClick={() => setSelectedCategory('illustration')}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer font-semibold ${
                  selectedCategory === 'illustration'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg animate-glow'
                    : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                Illustration
              </button>

              <button
                onClick={() => setSelectedCategory('motion-graphics')}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer font-semibold ${
                  selectedCategory === 'motion-graphics'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg animate-glow'
                    : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                Motion
              </button>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-500">
            {filteredCategories.map((service, index) => (
              <div
                key={service.id}
                className="glass-morphism rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 overflow-hidden group cursor-pointer transform hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-8 relative">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <i className={`${service.icon} text-white text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">{service.title}</h3>
                  </div>

                  <p className="text-purple-100 mb-6 leading-relaxed group-hover:text-white transition-colors">
                    {service.description}
                  </p>

                  <button className="inline-flex items-center text-purple-300 font-semibold hover:text-purple-100 transition-colors group-hover:translate-x-2 transform duration-300">
                    Learn More
                    <i className="fas fa-arrow-right ml-2 group-hover:ml-4 transition-all"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-4">Choose Your Plan</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Select the perfect plan that fits your business needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fade-in-up delay-300">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.id}
                className={`relative glass-morphism rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2 ${
                  tier.recommended ? 'ring-2 ring-purple-500 animate-glow' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >

                {tier.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-3 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className={`p-8 ${tier.recommended ? 'pt-16' : ''} relative`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                  <p className="text-slate-600 mb-6">{tier.description}</p>

                  <div className="mb-8">
                    <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{tier.price}</span>
                    <span className="text-slate-500 text-lg">{tier.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                      tier.recommended
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-purple-500/25'
                        : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 hover:from-slate-200 hover:to-slate-300'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-10 animate-fade-in-up">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-8">Why Choose Our Services?</h3>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-6 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-rocket text-white text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-purple-200 mb-3 group-hover:text-white transition-colors">Fast Delivery</h4>
                    <p className="text-purple-100 leading-relaxed group-hover:text-white transition-colors">Quick turnaround times without compromising on quality</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-6 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-shield-alt text-white text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-purple-200 mb-3 group-hover:text-white transition-colors">Reliable Support</h4>
                    <p className="text-purple-100 leading-relaxed group-hover:text-white transition-colors">24/7 customer support to assist you whenever needed</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-6 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-star text-white text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-purple-200 mb-3 group-hover:text-white transition-colors">Premium Quality</h4>
                    <p className="text-purple-100 leading-relaxed group-hover:text-white transition-colors">Industry-leading standards and best practices</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up delay-300">
              <div className="glass-morphism rounded-2xl p-8 shadow-2xl">
                <img
                  src="/images/favpng_75d90b3a4a334f73e172d8916a8c2e2d.png"
                  alt="Professional team working"
                  className="w-full min-h-[300px] object-cover object-top rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your business today with our comprehensive service solutions.
            Join thousands of satisfied clients who trust us with their success.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-300">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25">
              <i className="fas fa-calendar-alt mr-2"></i>
              Book Now
            </button>

            <button className="border-2 border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-slate-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              <i className="fas fa-phone mr-2"></i>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 animate-fade-in-up">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">Artika Graphics</div>
              <p className="text-purple-100 mb-6 leading-relaxed">
                Delivering exceptional digital solutions that drive business growth and success.
              </p>

              <div className="flex space-x-6">
                <i className="fab fa-facebook text-purple-300 hover:text-purple-100 cursor-pointer transition-colors text-xl"></i>
                <i className="fab fa-twitter text-purple-300 hover:text-purple-100 cursor-pointer transition-colors text-xl"></i>
                <i className="fab fa-linkedin text-purple-300 hover:text-purple-100 cursor-pointer transition-colors text-xl"></i>
                <i className="fab fa-instagram text-purple-300 hover:text-purple-100 cursor-pointer transition-colors text-xl"></i>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-purple-200">Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">Web Design</a></li>
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">Development</a></li>
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">Consulting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-purple-200">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">About Us</a></li>
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">Careers</a></li>
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">Blog</a></li>
                <li><a href="#" className="text-purple-100 hover:text-white cursor-pointer transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-purple-200">Contact Info</h4>
              <div className="space-y-4">
                <p className="text-purple-100 flex items-center">
                  <i className="fas fa-phone mr-3 text-purple-300"></i>
                  +1 (555) 123-4567
                </p>
                <p className="text-purple-100 flex items-center">
                  <i className="fas fa-envelope mr-3 text-purple-300"></i>
                  hello@artikagraphics.com
                </p>
                <p className="text-purple-100 flex items-center">
                  <i className="fas fa-map-marker-alt mr-3 text-purple-300"></i>
                  123 Business St, City, State 12345
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-800/50 mt-16 pt-8 text-center">
            <p className="text-purple-200">
              © 2025 Artika Graphics. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;
