import React, { useState, useEffect } from 'react';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const coreValues = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that transform industries and create meaningful impact for our clients worldwide.'
    },
    {
      icon: 'fas fa-users',
      title: 'Collaboration',
      description: 'Our success stems from fostering strong partnerships, encouraging diverse perspectives, and building lasting relationships with clients and team members.'
    },
    {
      icon: 'fas fa-award',
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from project delivery to customer service, ensuring exceptional results every time.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      position: 'Chief Executive Officer',
      bio: 'With over 15 years of industry experience, Sarah leads our vision for innovation and growth in the digital transformation space.',
      image: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=SJ',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Michael Chen',
      position: 'Chief Technology Officer',
      bio: 'Michael brings deep technical expertise and strategic thinking to drive our technology initiatives and product development roadmap.',
      image: 'https://via.placeholder.com/150x150/059669/FFFFFF?text=MC',
      social: { linkedin: '#', github: '#' }
    },
    {
      name: 'Emily Rodriguez',
      position: 'Head of Design',
      bio: 'Emily crafts beautiful and intuitive user experiences that bridge the gap between complex functionality and elegant simplicity.',
      image: 'https://via.placeholder.com/150x150/DC2626/FFFFFF?text=ER',
      social: { linkedin: '#', dribbble: '#' }
    },
    {
      name: 'David Thompson',
      position: 'VP of Operations',
      bio: 'David ensures operational excellence and scalable processes that enable our team to deliver exceptional results consistently.',
      image: 'https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=DT',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with a vision to revolutionize digital experiences' },
    { year: '2020', title: 'Global Expansion', description: 'Opened offices in three major international markets' },
    { year: '2022', title: 'Award Recognition', description: 'Received Industry Excellence Award for Innovation' },
    { year: '2024', title: 'Sustainable Growth', description: 'Achieved carbon-neutral operations and B-Corp certification' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <style>{`
        .fade-in {
          opacity: ${isLoaded ? '1' : '0'};
          transform: translateY(${isLoaded ? '0' : '20px'});
          transition: all 0.8s ease-out;
        }

        .stagger {
          animation: fadeInUp 0.8s ease-out forwards;
        }

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

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
        }

        .team-card {
          transition: all 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 255, 255, 0.2);
        }

        .social-links {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .team-card:hover .social-links {
          opacity: 1;
          transform: translateY(0);
        }

        .milestone-item {
          position: relative;
          padding-left: 2rem;
        }

        .milestone-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 12px;
          height: 12px;
          background: #06B6D4;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .milestone-item::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 1.25rem;
          width: 2px;
          height: calc(100% + 1rem);
          background: #374151;
        }

        .milestone-item:last-child::after {
          display: none;
        }

        .glow {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
        }

        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.8);
          }
        }

        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 min-h-[80vh] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 fade-in leading-tight">
                About <span className="text-cyan-400">Artika Graphics</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto lg:mx-0 fade-in" style={{ transitionDelay: '0.2s' }}>
                We are a forward-thinking graphics design company dedicated to creating innovative visual solutions that drive meaningful change and deliver exceptional value to our clients worldwide.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:bg-white/10 transition-all duration-300">
                  <i className="fas fa-envelope text-2xl sm:text-3xl mb-4 text-cyan-400"></i>
                  <h3 className="font-bold mb-2 text-white text-sm sm:text-base">Email Us</h3>
                  <p className="text-cyan-200 text-xs sm:text-sm">hello@artikagraphics.com</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:bg-white/10 transition-all duration-300">
                  <i className="fas fa-phone text-2xl sm:text-3xl mb-4 text-cyan-400"></i>
                  <h3 className="font-bold mb-2 text-white text-sm sm:text-base">Call Us</h3>
                  <p className="text-cyan-200 text-xs sm:text-sm">+254 (555) 123-4567</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:bg-white/10 transition-all duration-300">
                  <i className="fas fa-map-marker-alt text-2xl sm:text-3xl mb-4 text-cyan-400"></i>
                  <h3 className="font-bold mb-2 text-white text-sm sm:text-base">Visit Us</h3>
                  <p className="text-cyan-200 text-xs sm:text-sm">123 Innovation Drive<br />Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <img
                src="/images/IMG-20250903-WA0000.jpg"
                alt="Artika Graphics Team"
                className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl pulse-glow hover:scale-105 transition-transform duration-500 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex justify-center lg:justify-start slide-in-left">
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230624/pngtree-blue-bar-graph-3d-icon-against-black-background-image_3664034.jpg"
                alt="Creative Design Process"
                className="w-full max-w-md h-80 object-cover rounded-2xl hover:scale-105 transition-all duration-500 shadow-2xl glow"
              />
            </div>
            <div className="text-center lg:text-left slide-in-right">
              <div className="mb-8">
                <i className="fas fa-compass text-4xl sm:text-5xl text-cyan-400 mb-6 pulse-glow"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                Our Mission: Crafting Visual <span className="text-purple-400">Masterpieces</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                At Artika Graphics, our mission is to empower brands through innovative graphic design solutions that transform ideas into stunning visual experiences. We blend creativity with cutting-edge technology to deliver designs that captivate, communicate, and convert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="py-20 bg-gradient-to-br from-purple-900 via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 fade-in">Our Core Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide our creative journey and define our commitment to excellence in graphic design.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 justify-center">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md max-w-sm p-6 sm:p-8 rounded-2xl text-center hover-lift cursor-pointer border border-cyan-500/20 transition-all duration-300 stagger ${
                  hoveredValue === index ? 'ring-2 ring-cyan-400 shadow-2xl shadow-cyan-400/25 transform scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-6">
                  <i className={`${value.icon} text-4xl sm:text-5xl text-cyan-400 pulse-glow`}></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 fade-in">Meet Our Creative Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Our talented designers and creative professionals are passionate about bringing your vision to life through innovative graphic design solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`team-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center cursor-pointer border border-cyan-500/20 transition-all duration-500 stagger ${
                  hoveredTeam === index ? 'ring-2 ring-cyan-400 shadow-2xl shadow-cyan-400/25 transform scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredTeam(index)}
                onMouseLeave={() => setHoveredTeam(null)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover object-top border-4 border-cyan-400/30 hover:border-cyan-400 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-cyan-300 font-medium mb-4 text-sm sm:text-base">{member.position}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>
                <div className="social-links flex justify-center space-x-4">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer text-lg hover:scale-110 transform duration-200"
                    >
                      <i className={`fab fa-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section id="story" className="py-20 bg-gradient-to-br from-gray-900 via-black to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="slide-in-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">Our Story: From Vision to <span className="text-cyan-400">Reality</span></h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
                Founded in 2018 with a passion for creative excellence, Artika Graphics emerged from a simple belief: every brand deserves to shine through exceptional design. What started as a small studio has evolved into a powerhouse of visual innovation.
              </p>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                Our journey is one of continuous growth, learning, and adaptation. We've embraced cutting-edge technologies while staying true to the timeless principles of great design. Today, we're not just creating graphics – we're crafting experiences that resonate and inspire.
              </p>

              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="milestone-item flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {milestone.year.slice(-2)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-cyan-400 mb-1 text-lg">{milestone.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="slide-in-right">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcGFueSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww"
                alt="Artika Graphics Creative Studio"
                className="rounded-2xl shadow-2xl glow w-full h-80 sm:h-96 object-cover object-top hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
