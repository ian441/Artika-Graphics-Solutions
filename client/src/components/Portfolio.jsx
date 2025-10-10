import React, { useState, useEffect } from 'react';
import { fetchPortfolioProjects, fetchPortfolioCategories } from '../services/api';
import { DEFAULT_CONFIG } from '../config';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(DEFAULT_CONFIG.portfolio.itemsPerPage);
  const [portfolioData, setPortfolioData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [projectsResponse, categoriesResponse] = await Promise.all([
          fetchPortfolioProjects(),
          fetchPortfolioCategories()
        ]);

        if (projectsResponse.success) {
          setPortfolioData(projectsResponse.data);
        }

        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        }
      } catch (err) {
        setError('Failed to load portfolio data. Please try again later.');
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filterCategories = [
    { id: 'all', label: 'All' },
    ...categories.map(cat => ({ id: cat.id, label: cat.label }))
  ];

  const filteredProjects = activeFilter === 'all' 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeFilter);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  const relatedProjects = portfolioData
    .filter(p => p._id !== selectedProject?._id && p.category === selectedProject?.category)
    .slice(0, 3);

  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + DEFAULT_CONFIG.portfolio.itemsPerPage, filteredProjects.length));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Portfolio Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection of creative projects that showcase our expertise in branding, web design, digital marketing, and print design. Each project tells a unique story of collaboration and innovation.
            </p>
            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{portfolioData.length}+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{new Set(portfolioData.map(p => p.client)).size}+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveFilter(category.id);
                  setVisibleProjects(DEFAULT_CONFIG.portfolio.itemsPerPage);
                }}
                className={`rounded-lg whitespace-nowrap px-6 py-3 text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {portfolioData.length === 0 ? (
            <div className="text-center py-16">
              <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Projects Yet</h3>
              <p className="text-gray-500">Check back soon for our latest creative work!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProjects.map((project) => (
                  <div 
                    key={project._id} 
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-80 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="!rounded-button whitespace-nowrap bg-white text-gray-900 px-6 py-3 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Details
                          </button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600">{project.client}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Section */}
              {visibleProjects < filteredProjects.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 font-semibold hover:shadow-lg transition-all cursor-pointer"
                  >
                    Load More Projects
                  </button>
                  <p className="text-gray-500 text-sm mt-4">
                    Showing {displayedProjects.length} of {filteredProjects.length} projects
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 md:h-80 object-cover object-top rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <i className="fas fa-times text-gray-700"></i>
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProject.title}</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Client</h4>
                    <p className="text-gray-600">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Duration</h4>
                    <p className="text-gray-600">{selectedProject.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Category</h4>
                    <p className="text-gray-600">{selectedProject.category}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{selectedProject.description}</p>
              </div>

              {selectedProject.challenge && selectedProject.solution && (
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Solution</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>
              )}

              {selectedProject.results && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Results Achieved</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.results}</p>
                </div>
              )}

              {selectedProject.process && selectedProject.process.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.process.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {relatedProjects.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Projects</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedProjects.map((project) => (
                      <div 
                        key={project._id} 
                        className="cursor-pointer group"
                        onClick={() => setSelectedProject(project)}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-32 object-cover object-top rounded-lg mb-2 group-hover:opacity-80 transition-opacity"
                        />
                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg whitespace-nowrap border-2 border-gray-300 text-gray-700 px-6 py-3 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-palette text-white text-sm"></i>
                </div>
                <span className="text-xl font-bold">CreativeStudio</span>
              </div>
              <p className="text-gray-400">
                Transforming visions into stunning visual experiences that captivate and inspire.
              </p>
              <div className="flex space-x-4">
                <i className="fab fa-facebook text-gray-400 hover:text-white cursor-pointer transition-colors"></i>
                <i className="fab fa-twitter text-gray-400 hover:text-white cursor-pointer transition-colors"></i>
                <i className="fab fa-instagram text-gray-400 hover:text-white cursor-pointer transition-colors"></i>
                <i className="fab fa-linkedin text-gray-400 hover:text-white cursor-pointer transition-colors"></i>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Brand Identity</li>
                <li className="hover:text-white cursor-pointer transition-colors">Web Design</li>
                <li className="hover:text-white cursor-pointer transition-colors">Digital Marketing</li>
                <li className="hover:text-white cursor-pointer transition-colors">Print Design</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Our Team</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-envelope text-sm"></i>
                  <span>hello@creativestudio.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-phone text-sm"></i>
                  <span>+254 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-sm"></i>
                  <span>123 Design Street, Creative City</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CreativeStudio. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
