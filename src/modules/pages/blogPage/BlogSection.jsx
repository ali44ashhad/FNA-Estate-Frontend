import React from "react";

const BlogSection = () => {
  // Blog static data array inside the component
  const blogPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      category: "Market Trends",
      date: "June 10, 2026",
      title: "Real Estate Market Trends: What to Expect in the Coming Year",
      description: "Discover the latest shifts in property values, investment hot spots, and how changing interest rates impact buyers and sellers alike.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      category: "Home Buying",
      date: "June 04, 2026",
      title: "The Ultimate Guide to Buying Your First Luxury Home Smoothly",
      description: "From securing the right financing to evaluating premium neighborhoods, here is a step-by-step roadmap for first-time premium buyers.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      category: "Investment",
      date: "May 28, 2026",
      title: "Why Commercial Real Estate Remains a Highly Stable Asset",
      description: "Explore the long-term benefits of portfolio diversification through commercial spaces, retail storefronts, and multi-family complexes.",
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-[#004F3B]/10 text-[#004F3B] rounded-full mb-4">
              Our Journal
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Latest insights & <br />
              <span className="font-normal text-[#004F3B]">real estate perspectives</span>
            </h2>
          </div>
          
          <div>
            <button className="inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-[#004F3B] group transition-colors duration-300">
              View All Articles
              <span className="w-9 h-9 rounded-full bg-[#004F3B] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Blog Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="group flex flex-col justify-between bg-[#f8f7f4]/40 rounded-3xl overflow-hidden border border-gray-100/60 p-4 transition-all duration-300 hover:shadow-md"
            >
              <div>
                {/* Responsive Image Frame */}
                <div className="overflow-hidden rounded-2xl h-[200px] sm:h-[220px] w-full relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#004F3B] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Meta & Typography */}
                <div className="mt-5 px-2">
                  <p className="text-xs text-gray-400 font-medium tracking-wide">
                    {post.date}
                  </p>
                  <h3 className="text-xl font-medium text-gray-900 mt-2.5 leading-snug group-hover:text-[#004F3B] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mt-3 line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Card CTA Link */}
              <div className="mt-6 pt-4 border-t border-gray-100/80 px-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004F3B]">
                  Read Full Post
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;