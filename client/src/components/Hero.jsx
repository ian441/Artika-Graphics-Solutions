// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useEffect, useState } from 'react';
import { fetchPublishedBlogPosts } from '../services/api';

const Hero = () => {
  const [slideIn, setSlideIn] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const featuredWorks = [
    {
      id: 1,
      title: 'Brand Identity Design',
      category: 'Branding',
      image: '/images/brand design.jpg'
        },
    {
      id: 2,
      title: 'Website Redesign',
      category: 'Web Design',
      image: '/images/Contact us business icon on computer keyboard with the globe _ Premium Photo.jpg'
        },
    {
      id: 3,
      title: 'Marketing Campaign',
      category: 'Digital Marketing',
      image: '/images/download (1).jpg'    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc.',
      text: 'The team delivered exceptional results that exceeded our expectations. Their creative approach transformed our brand identity completely.',
      avatar: ''
       },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'StartUp Solutions',
      text: 'Outstanding creativity and professionalism. They understood our vision perfectly and brought it to life with stunning visual design.',
      avatar: ''
      }
  ];

  const stats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Happy Clients' }
  ];

  const artGallery = [
    {
      id: 1,
      title: 'Abstract Dreams',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
      price: '$299',
      description: 'A vibrant abstract piece capturing the essence of dreams and imagination.'
    },
    {
      id: 2,
      title: 'Urban Reflections',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      price: '$399',
      description: 'Modern cityscape with reflective surfaces and geometric patterns.'
    },
    {
      id: 3,
      title: 'Nature\'s Symphony',
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=500&fit=crop',
      price: '$249',
      description: 'Organic forms and natural colors blending in harmonious composition.'
    },
    {
      id: 4,
      title: 'Digital Horizon',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=500&fit=crop',
      price: '$349',
      description: 'Futuristic landscape exploring the intersection of technology and art.'
    },
    {
      id: 5,
      title: 'Emotional Depth',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      price: '$279',
      description: 'Deep emotional expression through layered textures and colors.'
    },
    {
      id: 6,
      title: 'Geometric Harmony',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
      price: '$329',
      description: 'Perfect balance of geometric shapes creating visual harmony.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setSlideIn(true);
    // Fetch blog posts
    const loadBlogs = async () => {
      try {
        const blogs = await fetchPublishedBlogPosts();
        setBlogPosts(blogs.slice(0, 3)); // Show only first 3 blogs
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="pt-0">
        {/* hero section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/images/VID-20250903-WA0001.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

          <div
            className={`relative z-20 max-w-7xl mx-auto px-6 py-20 transform transition-transform duration-700 ease-out ${
              slideIn ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-white">
                <div className="space-y-4 pt-20">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    Artika Graphics
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                      Solutions
                    </span>
                  </h1>
                  <p className="text-xl max-w-lg text-white/100">
                    We transform your vision into stunning visual experiences that captivate audiences and drive results. From branding to digital design, we craft solutions that make an impact.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => document.getElementById('art-gallery').scrollIntoView({ behavior: 'smooth' })} className="!rounded-button bg-white text-blue-600 px-8 py-4 font-semibold hover:shadow-lg transition-all cursor-pointer">
                    View Gallery
                  </button>
                  <button className="!rounded-button border-2 border-white text-white px-8 py-4 font-semibold hover:bg-orange-600  hover:text-blue-600 transition-all cursor-pointer">
                    Get Started
                  </button>
                </div>

                <div className="flex items-center space-x-8 pt-8">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  ))}
               </div>
              </div>
            </div>
          </div>
        </section>
      


        {/* Featured Works Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          {/* Layered Background Elements for Reflective Feel */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-40 h-40 border-2 border-blue-600 rounded-full blur-xl"></div>
            <div className="absolute top-60 right-20 w-30 h-30 border-2 border-purple-500 rounded-full blur-xl"></div>
            <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-red-500 rounded-full opacity-30 blur-xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Featured Works</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover our curated selection of projects that showcase innovative design and creative problem-solving
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-500 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredWorks.map((work, index) => (
                <div 
                  key={work.id} 
                  className={`group cursor-pointer transform transition-all duration-700 ease-out hover:scale-105 ${
                    index % 3 === 0 ? 'hover:rotate-1' : index % 3 === 1 ? 'hover:-rotate-1' : ''
                  }`}
                >
                  <div className="relative overflow-hidden rounded-3xl mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/25 backdrop-blur-sm">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-64 lg:h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-125"
                    />
                    {/* Chaotic Human Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                      <div className="text-white w-full">
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {work.category}
                        </span>
                        <h3 className="text-xl font-bold mb-3 leading-tight">{work.title}</h3>
                        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                          <i className="fas fa-external-link-alt text-blue-300"></i>
                          <span className="text-sm text-gray-300">Explore Project</span>
                        </div>
                      </div>
                    </div>
                    {/* Reflective Badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 group-hover:scale-100 delay-100">
                      <i className="fas fa-heart text-red-400 text-lg"></i>
                    </div>
                  </div>
                  <div className="text-center px-2">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {work.title}
                    </h3>
                    <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                      {work.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button className="relative group inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-2 active:rotate-0">
                <span className="relative z-10 flex items-center">
                  View All Projects
                  <i className="fas fa-arrow-right ml-3 transition-transform group-hover:translate-x-2"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-60 right-20 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Latest Insights</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Stay updated with our latest thoughts on design, technology, and creative solutions
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
            </div>

            {loadingBlogs ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((blog, index) => (
                  <div
                    key={blog.id}
                    className={`relative group cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                      index % 3 === 0 ? 'hover:rotate-1' : index % 3 === 1 ? 'hover:-rotate-1' : 'hover:rotate-2'
                    }`}
                  >
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                      {/* Blog Image */}
                      {blog.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}

                      {/* Blog Content */}
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {blog.category || 'Blog'}
                          </span>
                          <span className="text-gray-300 text-sm">
                            {new Date(blog.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors">
                          {blog.title}
                        </h3>

                        <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">
                          {blog.excerpt || blog.content?.substring(0, 120) + '...'}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-user text-white text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-300">{blog.author || 'Admin'}</span>
                          </div>

                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="fas fa-arrow-right text-blue-300"></i>
                            <span className="text-sm text-blue-300">Read More</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-16">
              <button className="relative group inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-2 active:rotate-0">
                <span className="relative z-10 flex items-center">
                  View All Blogs
                  <i className="fas fa-arrow-right ml-3 transition-transform group-hover:translate-x-2"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Subtle gradient overlay elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-60 right-20 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Real stories from real clients who trusted us with their vision
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`relative group cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                    index % 3 === 0 ? 'hover:rotate-1' : index % 3 === 1 ? 'hover:-rotate-1' : 'hover:rotate-2'
                  }`}
                >
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Quote icon */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <i className="fas fa-quote-left text-xl"></i>
                    </div>

                    {/* Testimonial content */}
                    <div className="relative z-10 text-center">
                      <p className="text-white/90 leading-relaxed text-lg italic mb-6 group-hover:text-white transition-colors">
                        "{testimonial.text}"
                      </p>
                      <div className="space-y-2">
                        <div className="font-bold text-xl text-white">{testimonial.name}</div>
                        <div className="text-blue-300 font-medium">{testimonial.company}</div>
                      </div>

                      {/* Stars rating */}
                      <div className="flex justify-center space-x-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                        ))}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating accent elements */}
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                  </div>
                </div>
              ))}

              {/* Add a third testimonial for better layout */}
              <div className="relative group cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:rotate-1">
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Quote icon */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <i className="fas fa-quote-left text-xl"></i>
                  </div>

                  {/* Testimonial content */}
                  <div className="relative z-10 text-center">
                    <p className="text-white/90 leading-relaxed text-lg italic mb-6 group-hover:text-white transition-colors">
                      "Exceptional service and creative solutions that truly elevated our brand presence. Highly recommended!"
                    </p>
                    <div className="space-y-2">
                      <div className="font-bold text-xl text-white">Emily Rodriguez</div>
                      <div className="text-blue-300 font-medium">Global Marketing Co.</div>
                    </div>

                    {/* Stars rating */}
                    <div className="flex justify-center space-x-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                      ))}
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating accent elements */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                </div>
              </div>
            </div>

            {/* Stats indicator below testimonials */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-blue-200">Happy Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          {/* Raw Chaotic Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 border border-red-500 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-600 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-blue-500 rounded-full opacity-10 blur-2xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Impact in Numbers</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Measurable results that speak to our commitment to excellence
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const icons = [
                  'fas fa-project-diagram',
                  'fas fa-smile',
                  'fas fa-clock',
                  'fas fa-users'
                ];
                return (
                  <div
                    key={index}
                    className="text-center group transform transition-all duration-700 hover:scale-110 hover:-rotate-2"
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 transform group-hover:rotate-12">
                        <i className={`${icons[index]} text-white text-2xl`}></i>
                      </div>
                      {/* Reflective Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i className="fas fa-plus text-white text-xs"></i>
                      </div>
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium group-hover:text-gray-200 transition-colors">
                      {stat.label}
                    </div>
                    {/* Layered Underline */}
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Art Gallery Section */}
        <div id="art-gallery" className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-60 right-20 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-blue mb-4">Art Gallery</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover our exclusive collection of contemporary paintings and artistic masterpieces
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-500 mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Overlapping Carousel */}
            <div className="relative flex justify-center items-center">
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : artGallery.length - 1))}
                className="absolute left-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="relative w-full max-w-4xl h-96 flex justify-center items-center">
                {artGallery.map((art, index) => {
                  const isActive = index === currentSlide;
                  const isPrev = index === (currentSlide - 1 + artGallery.length) % artGallery.length;
                  const isNext = index === (currentSlide + 1) % artGallery.length;

                  let transform = '';
                  let zIndex = 0;
                  let opacity = 0;

                  if (isActive) {
                    transform = 'translateX(0) scale(1) rotate(0deg)';
                    zIndex = 10;
                    opacity = 1;
                  } else if (isPrev) {
                    transform = 'translateX(-60%) scale(0.8) rotate(-5deg)';
                    zIndex = 5;
                    opacity = 0.7;
                  } else if (isNext) {
                    transform = 'translateX(60%) scale(0.8) rotate(5deg)';
                    zIndex = 5;
                    opacity = 0.7;
                  }

                  return (
                    <div
                      key={art.id}
                      className={`absolute transition-all duration-700 ease-out cursor-pointer group ${
                        isActive ? 'hover:scale-105' : ''
                      }`}
                      style={{
                        transform,
                        zIndex,
                        opacity,
                      }}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className="relative w-80 h-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Art Image */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-125"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Art Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {art.price}
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                              ))}
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                            {art.title}
                          </h3>

                          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                            {art.description}
                          </p>

                          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
                            Order Now
                          </button>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Floating accent elements */}
                        <div className="absolute top-4 right-4 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                        <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % artGallery.length)}
                className="absolute right-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {artGallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-600 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <div className="text-center mt-16">
              <button className="relative group inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-2 active:rotate-0">
                <span className="relative z-10 flex items-center">
                  View All Artworks
                  <i className="fas fa-arrow-right ml-3 transition-transform group-hover:translate-x-2"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-palette text-white text-sm"></i>
                </div>
                <span className="text-xl font-bold text-gray-900">CreativeStudio</span>
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
                  <span>Almasi@creativestudio.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-phone text-sm"></i>
                  <span>+254 (799) 914-446</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-sm"></i>
                  <span>Kimathi Design Street, Nairobi</span>
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
        </div>
);
};
export default Hero;
