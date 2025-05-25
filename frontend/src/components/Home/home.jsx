import { Link } from "react-router-dom";
import {
  FaCode,
  FaChartLine,
  FaUserShield,
  FaLightbulb,
  FaStar,
  FaCalendarAlt,
  FaBlog,
  FaNewspaper,
  FaFire,
  FaPython,
  FaJava,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./home.css";
import { useState, useEffect } from "react";
import { FiCode, FiTerminal, FiClock } from "react-icons/fi";
import { SiCplusplus } from "react-icons/si";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  const [grind75Questions, setGrind75Questions] = useState([]);
  const [loading, setLoading] = useState(true);

  //const [error, setError] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["grind75Questions"],
    queryFn: async () => {
      const response = await axios.get(
        "https://dsa-library.onrender.com/user/grind75-questions?page=3&limit=6"
      );
      if (!response.data) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
  // Fetch Grind 75 questions from your API
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://dsa-library.onrender.com/user/grind75-questions"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch questions");
  //       }
  //       const data = await response.json();
  //       // Take first 6 questions for the home page preview
  //       setGrind75Questions(data.slice(0, 6));
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchQuestions();
  // }, []);
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Software Engineer at Google",
      content:
        "This platform helped me crack my DSA rounds with ease. The curated problems are exactly what companies ask!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Frontend Developer",
      content:
        "The organized approach to learning DSA made complex topics much more manageable. Highly recommended!",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Student at IIT Delhi",
      content:
        "The best resource for interview preparation. Saved me hundreds of hours of searching for quality problems.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const features = [
    {
      icon: <FaCode className="feature-icon" />,
      title: "Curated Problems",
      description:
        "Hand-picked problems that cover all patterns asked in technical interviews",
    },
    {
      icon: <FaChartLine className="feature-icon" />,
      title: "Progress Tracking",
      description: "Track your progress and identify weak areas to focus on",
    },
    {
      icon: <FaUserShield className="feature-icon" />,
      title: "Expert Solutions",
      description: "High-quality solutions with optimal approaches explained",
    },
    {
      icon: <FaLightbulb className="feature-icon" />,
      title: "Pattern Recognition",
      description:
        "Learn to identify problem patterns rather than memorizing solutions",
    },
  ];

  // const grind75Questions = [
  //   { id: 1, title: "Two Sum", difficulty: "Easy", pattern: "Hash Map" },
  //   { id: 2, title: "Valid Parentheses", difficulty: "Easy", pattern: "Stack" },
  //   { id: 3, title: "Merge Intervals", difficulty: "Medium", pattern: "Intervals" },
  //   { id: 4, title: "Course Schedule", difficulty: "Medium", pattern: "Topological Sort" },
  //   { id: 5, title: "Word Search II", difficulty: "Hard", pattern: "Trie + Backtracking" },
  //   { id: 6, title: "Trapping Rain Water", difficulty: "Hard", pattern: "Two Pointers" }
  // ];

  const recentBlogs = [
    {
      id: 1,
      title: "Mastering Dynamic Programming",
      excerpt: "Learn the 6 essential DP patterns to crack coding interviews",
      date: "May 15, 2023",
    },
    {
      id: 2,
      title: "System Design Primer",
      excerpt: "Key concepts to design scalable systems in interviews",
      date: "June 2, 2023",
    },
    {
      id: 3,
      title: "Binary Search Variations",
      excerpt: "Advanced patterns beyond the standard implementation",
      date: "June 18, 2023",
    },
  ];

  const techNews = [
    {
      id: 1,
      title: "OpenAI Releases GPT-4 Turbo",
      source: "TechCrunch",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Google's New AI Chip Claims 5x Speed Boost",
      source: "The Verge",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "React 19 Beta Released",
      source: "Dev.to",
      time: "1 day ago",
    },
    {
      id: 4,
      title: "Apple's Vision Pro SDK Now Available",
      source: "MacRumors",
      time: "2 days ago",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Master Data Structures & Algorithms
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The definitive resource for technical interview preparation
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/topics" className="cta-button">
              Explore Topics
            </Link>
          </motion.div>
        </div>
        <div className="hero-gradient"></div>
      </section>
      {/* About Section */}
      <section className="about-section">
        <div className="section-header">
          <h2>Why Choose Our Platform?</h2>
          <div className="divider"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              Our platform is designed by industry experts to help you master
              Data Structures and Algorithms efficiently. We've curated the most
              relevant problems from top tech companies and organized them in a
              way that helps you build intuition and recognize patterns.
            </p>
            <p>
              Whether you're a beginner starting your DSA journey or an
              experienced developer preparing for FAANG interviews, our
              structured approach will save you time and help you focus on what
              matters most.
            </p>
            <Link to="/topics" className="learn-more-button">
              Start Learning Now
            </Link>
          </div>
          <div className="about-image">
            <div className="code-snippet">
              <pre>{`// Sample optimized solution\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Grind 75 Section */}
      <section className="grind-section">
        <div className="section-header">
          <div className="section-title-icon">
            <FaFire className="section-icon" />
            <h2>Grind 75 Questions</h2>
          </div>
          <div className="divider"></div>
          <p className="section-subtitle">
            The most essential questions to practice for coding interviews
          </p>
        </div>

        {isLoading ? (
          <div className="loading">Loading questions...</div>
        ) : isError ? (
          <div className="error">Error: {error.message}</div>
        ) : (
          <>
            <div className="questions-grid">
              {data.questions.slice(0, 6).map(
                (
                  question // Only show first 6 questions
                ) => (
                  <motion.div
                    className="question-card"
                    key={question._id}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0, 180, 216, 0.3)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="question-header">
                      <h3>{question.name}</h3>
                      <span
                        className={`difficulty ${question.level.toLowerCase()}`}
                      >
                        {question.level}
                      </span>
                    </div>
                    <div className="question-pattern">
                      <FaCode className="pattern-icon" />
                      <span>{question.topics[0].join(", ")}</span>
                    </div>
                    <a
                      href={question.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="solve-button"
                    >
                      Solve Problem
                    </a>
                  </motion.div>
                )
              )}
            </div>
            <div className="section-footer">
              <Link to="/grind75" className="view-all-button">
                View All 75 Questions →
              </Link>
            </div>
          </>
        )}
      </section>
      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Key Features</h2>
          <div className="divider"></div>
        </div>
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              className="feature-card"
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 30px rgba(0, 180, 216, 0.2)",
              }}
            >
              <div className="feature-icon-container">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Online Compiler Section */}
      <section className="compiler-section">
        <div className="section-header">
          <div className="section-title-icon">
            <FiCode className="section-icon" />
            <h2>Online Code Compiler</h2>
          </div>
          <div className="divider"></div>
          <p className="section-subtitle">
            Write, compile and run code in multiple languages right in your
            browser
          </p>
        </div>

        <motion.div
          className="compiler-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="compiler-features">
            <div className="compiler-feature">
              <div className="feature-icon">
                <FaPython />
                <SiCplusplus />
                <FaJava />
              </div>
              <h3>Multiple Languages</h3>
              <p>Supports Python, JavaScript, Java, C++, C and more</p>
            </div>
            <div className="compiler-feature">
              <div className="feature-icon">
                <FiTerminal />
              </div>
              <h3>Real-time Output</h3>
              <p>
                See your code execution results instantly with our powerful
                compiler
              </p>
            </div>
            <div className="compiler-feature">
              <div className="feature-icon">
                <FiClock />
              </div>
              <h3>Execution Time</h3>
              <p>
                Measure your code's performance with precise execution timing
              </p>
            </div>
          </div>

          <div className="compiler-cta">
            <Link to="/ide" className="compiler-button">
              Try Our Online Compiler →
            </Link>
          </div>
        </motion.div>
      </section>
      {/* Blog Section */}
      <section className="blog-section">
        <div className="section-header">
          <div className="section-title-icon">
            <FaBlog className="section-icon" />
            <h2>Latest Blogs</h2>
          </div>
          <div className="divider"></div>
          <p className="section-subtitle">
            Learn from our expert articles and tutorials
          </p>
        </div>
        <div className="blog-grid">
          {recentBlogs.map((blog) => (
            <motion.div
              className="blog-card"
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="blog-date">
                <FaCalendarAlt className="calendar-icon" />
                <span>{blog.date}</span>
              </div>
              <h3>{blog.title}</h3>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <Link to={`/blog/${blog.id}`} className="read-more">
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="section-footer">
          <Link to="/blogs" className="view-all-button">
            View All Blogs →
          </Link>
        </div>
      </section>
      {/* Tech News Section */}
      <section className="news-section">
        <div className="section-header">
          <div className="section-title-icon">
            <FaNewspaper className="section-icon" />
            <h2>Tech News</h2>
          </div>
          <div className="divider"></div>
          <p className="section-subtitle">
            Stay updated with the latest in technology
          </p>
        </div>
        <div className="news-list">
          {techNews.map((news) => (
            <motion.div
              className="news-item"
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="news-content">
                <h3>{news.title}</h3>
                <div className="news-meta">
                  <span className="news-source">{news.source}</span>
                  <span className="news-time">{news.time}</span>
                </div>
              </div>
              <Link to="/" className="news-link">
                →
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="section-footer">
          <Link to="/news" className="view-all-button">
            View All News →
          </Link>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <div className="divider"></div>
        </div>
        <motion.div
          className="testimonials-carousel"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              className="testimonial-card"
              key={testimonial.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-avatar">
                <img src={testimonial.avatar} alt={testimonial.name} />
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* CTA Section */}
      <section className="cta-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to Ace Your Next Interview?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join thousands of developers who've successfully cracked top tech
          company interviews
        </motion.p>
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link to="/signup" className="cta-button-primary">
            Get Started
          </Link>
          <Link to="/topics" className="cta-button-secondary">
            Browse Topics
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
