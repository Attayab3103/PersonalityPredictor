import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Search, Tag, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Input } from '../components/ui/input';

const BlogCard = ({ title, excerpt, category, date, readTime, image }) => (
  <div className="bg-glass rounded-xl overflow-hidden transition-all hover:border-purple/20">
    <div className="relative h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform hover:scale-105"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-purple/90 text-white px-3 py-1 rounded-full text-sm">
          {category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
        <span className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {date}
        </span>
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {readTime} min read
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{excerpt}</p>
      <Button variant="link" className="text-purple hover:text-teal p-0">
        Read More <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  </div>
);

const BlogPage = () => {
  const featuredPosts = [
    {
      title: "The Future of AI-Powered Personality Analysis",
      excerpt: "Explore how artificial intelligence is revolutionizing the way we understand human personality traits and behaviors.",
      category: "AI Technology",
      date: "Apr 14, 2025",
      readTime: 8,
      image: "https://images.unsplash.com/photo-1593376853168-5f8be1c2946a?auto=format&fit=crop&w=800"
    },
    {
      title: "Understanding the Big Five Personality Traits",
      excerpt: "A deep dive into the scientific framework behind personality assessment and its practical applications.",
      category: "Psychology",
      date: "Apr 12, 2025",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1454923634634-bd1614719a7b?auto=format&fit=crop&w=800"
    },
    {
      title: "How Machine Learning Improves Personality Insights",
      excerpt: "Learn about the advanced algorithms that power our personality prediction technology.",
      category: "Technology",
      date: "Apr 10, 2025",
      readTime: 10,
      image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=800"
    },
    {
      title: "The Importance of Self-Awareness in Personal Growth",
      excerpt: "Discover how understanding your personality traits can lead to better personal and professional relationships.",
      category: "Personal Development",
      date: "Apr 8, 2025",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800"
    },
    {
      title: "Team Dynamics: The Role of Personality in the Workplace",
      excerpt: "How personality analysis can improve team collaboration and workplace harmony.",
      category: "Business",
      date: "Apr 6, 2025",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
    },
    {
      title: "Privacy and Ethics in AI-Based Personality Assessment",
      excerpt: "An in-depth look at how we ensure user privacy and ethical use of AI technology.",
      category: "Privacy & Security",
      date: "Apr 4, 2025",
      readTime: 9,
      image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=800"
    }
  ];

  const categories = [
    "AI Technology",
    "Psychology",
    "Personal Development",
    "Business",
    "Technology",
    "Privacy & Security"
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Personality Predictor Blog</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Insights and updates about personality analysis, AI technology, and personal development.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="bg-glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10 bg-white/5 border-white/10 text-white w-full"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="border-white/10 hover:bg-purple/10 hover:text-purple"
                    >
                      <Tag className="mr-1 h-4 w-4" />
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple hover:bg-purple/10"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;