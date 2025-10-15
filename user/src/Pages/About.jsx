// import React, { useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useNavigate } from "react-router-dom";

// const About = () => {
//   const navigate = useNavigate();

//   const values = [
//     {
//       icon: "💡",
//       title: "Innovation",
//       description: "We constantly evolve our platform to bring you the latest shopping technologies and features that make your experience seamless and enjoyable.",
//       gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)"
//     },
//     {
//       icon: "🤝",
//       title: "Trust",
//       description: "Building lasting relationships through transparency, secure transactions, and reliable service that you can count on every time.",
//       gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)"
//     },
//     {
//       icon: "🌟",
//       title: "Quality",
//       description: "We curate only the finest products and partner with trusted sellers to ensure every purchase meets our high standards.",
//       gradient: "linear-gradient(135deg, #10b981, #059669)"
//     },
//     // {
//     //   icon: "❤️",
//     //   title: "Customer First",
//     //   description: "Your satisfaction is our priority. We listen, adapt, and continuously improve based on your feedback and needs.",
//     //   gradient: "linear-gradient(135deg, #f59e0b, #ef4444)"
//     // }
//   ];

//   const milestones = [
//     {
//       year: "2020",
//       title: "The Beginning",
//       description: "Started with a vision to revolutionize online shopping by connecting customers with quality products from trusted sources.",
//       icon: "🚀"
//     },
//     {
//       year: "2021",
//       title: "Rapid Growth",
//       description: "Expanded our platform to include over 1,000 sellers and 10,000 products across multiple categories.",
//       icon: "📈"
//     },
//     {
//       year: "2022",
//       title: "Going Mobile",
//       description: "Launched our mobile app and introduced features like real-time tracking and instant notifications.",
//       icon: "📱"
//     },
//     {
//       year: "2023",
//       title: "Global Reach",
//       description: "Extended our services internationally and achieved 50,000+ happy customers milestone.",
//       icon: "🌍"
//     },
//     {
//       year: "2024",
//       title: "Innovation Hub",
//       description: "Introduced AI-powered recommendations, virtual try-on features, and enhanced security protocols.",
//       icon: "🔮"
//     }
//   ];

//   const team = [
//     {
//       name: "Sarah Johnson",
//       role: "Chief Executive Officer",
//       description: "Leading ShopVibe's vision with 15+ years of e-commerce experience.",
//       image: "👩‍💼",
//       gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)"
//     },
//     {
//       name: "Michael Chen",
//       role: "Chief Technology Officer",
//       description: "Driving our technical innovation and platform architecture.",
//       image: "👨‍💻",
//       gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)"
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Head of Customer Experience",
//       description: "Ensuring every customer interaction exceeds expectations.",
//       image: "👩‍🎨",
//       gradient: "linear-gradient(135deg, #10b981, #059669)"
//     },
//     {
//       name: "David Kim",
//       role: "Head of Operations",
//       description: "Optimizing our logistics and seller partnership programs.",
//       image: "👨‍🔧",
//       gradient: "linear-gradient(135deg, #f59e0b, #ef4444)"
//     }
//   ];

//   const achievements = [
//     { icon: "🏆", value: "50K+", label: "Happy Customers", color: "#8b5cf6" },
//     { icon: "🛍️", value: "10K+", label: "Products Available", color: "#3b82f6" },
//     { icon: "🏪", value: "1K+", label: "Trusted Partners", color: "#10b981" },
//     { icon: "⭐", value: "4.9/5", label: "Customer Rating", color: "#f59e0b" }
//   ];

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f9fafb',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
//     },
//     heroSection: {
//       position: 'relative',
//       paddingTop: '6rem',
//       paddingBottom: '4rem',
//       overflow: 'hidden',
//       background: 'linear-gradient(135deg, #1e1b4b, #1e3a8a, #312e81)',
//       textAlign: 'center'
//     },
//     heroContainer: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 2rem',
//       color: 'white'
//     },
//     heroTitle: {
//       fontSize: '4rem',
//       fontWeight: '800',
//       lineHeight: '1.1',
//       marginBottom: '1rem'
//     },
//     heroSubtitle: {
//       fontSize: '1.5rem',
//       color: '#d1d5db',
//       marginBottom: '2rem',
//       maxWidth: '800px',
//       margin: '0 auto 2rem',
//       lineHeight: '1.6'
//     },
//     storySection: {
//       padding: '5rem 0',
//       background: 'white'
//     },
//     sectionContainer: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 2rem'
//     },
//     storyGrid: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '4rem',
//       alignItems: 'center'
//     },
//     storyContent: {
//       space: '1.5rem'
//     },
//     storyTitle: {
//       fontSize: '2.5rem',
//       fontWeight: '800',
//       color: '#1f2937',
//       marginBottom: '1.5rem'
//     },
//     storyText: {
//       fontSize: '1.125rem',
//       color: '#6b7280',
//       lineHeight: '1.8',
//       marginBottom: '1.5rem'
//     },
//     storyVisual: {
//       position: 'relative',
//       height: '400px',
//       borderRadius: '1.5rem',
//       background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '6rem',
//       color: 'rgba(255, 255, 255, 0.3)'
//     },
//     valuesSection: {
//       padding: '5rem 0',
//       background: 'linear-gradient(135deg, #f9fafb, #e0f2fe)'
//     },
//     sectionHeader: {
//       textAlign: 'center',
//       marginBottom: '4rem'
//     },
//     sectionTitle: {
//       fontSize: '3rem',
//       fontWeight: '800',
//       color: '#1f2937',
//       marginBottom: '1rem'
//     },
//     sectionSubtitle: {
//       fontSize: '1.25rem',
//       color: '#6b7280',
//       maxWidth: '600px',
//       margin: '0 auto'
//     },
//     valuesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: '2rem'
//     },
//     valueCard: {
//       background: 'white',
//       borderRadius: '1.5rem',
//       padding: '2rem',
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #f3f4f6',
//       textAlign: 'center',
//       transition: 'all 0.5s ease'
//     },
//     valueIcon: {
//       width: '4rem',
//       height: '4rem',
//       borderRadius: '1rem',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '1.5rem',
//       color: 'white',
//       marginBottom: '1rem'
//     },
//     valueTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '700',
//       color: '#1f2937',
//       marginBottom: '1rem'
//     },
//     valueDescription: {
//       color: '#6b7280',
//       lineHeight: '1.6'
//     },
//     timelineSection: {
//       padding: '5rem 0',
//       background: 'white'
//     },
//     timeline: {
//       position: 'relative',
//       maxWidth: '800px',
//       margin: '0 auto'
//     },
//     timelineItem: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       gap: '2rem',
//       marginBottom: '3rem',
//       position: 'relative'
//     },
//     timelineIcon: {
//       width: '4rem',
//       height: '4rem',
//       borderRadius: '50%',
//       background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '1.5rem',
//       color: 'white',
//       flexShrink: 0,
//       boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
//     },
//     timelineContent: {
//       flex: 1,
//       paddingTop: '0.5rem'
//     },
//     timelineYear: {
//       fontSize: '1.5rem',
//       fontWeight: '800',
//       color: '#8b5cf6',
//       marginBottom: '0.5rem'
//     },
//     timelineTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '700',
//       color: '#1f2937',
//       marginBottom: '0.5rem'
//     },
//     timelineDescription: {
//       color: '#6b7280',
//       lineHeight: '1.6'
//     },
//     teamSection: {
//       padding: '5rem 0',
//       background: 'linear-gradient(135deg, #f9fafb, #e0f2fe)'
//     },
//     teamGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: '2rem'
//     },
//     teamCard: {
//       background: 'white',
//       borderRadius: '1.5rem',
//       padding: '2rem',
//       textAlign: 'center',
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #f3f4f6',
//       transition: 'all 0.5s ease'
//     },
//     teamImage: {
//       width: '5rem',
//       height: '5rem',
//       borderRadius: '50%',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '2rem',
//       color: 'white',
//       marginBottom: '1rem'
//     },
//     teamName: {
//       fontSize: '1.25rem',
//       fontWeight: '700',
//       color: '#1f2937',
//       marginBottom: '0.5rem'
//     },
//     teamRole: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#8b5cf6',
//       marginBottom: '1rem'
//     },
//     teamDescription: {
//       color: '#6b7280',
//       fontSize: '0.875rem',
//       lineHeight: '1.6'
//     },
//     achievementsSection: {
//       padding: '5rem 0',
//       background: 'white'
//     },
//     achievementsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '2rem'
//     },
//     achievementCard: {
//       background: 'white',
//       borderRadius: '1rem',
//       padding: '2rem',
//       textAlign: 'center',
//       boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #f3f4f6',
//       transition: 'all 0.3s ease'
//     },
//     achievementIcon: {
//       fontSize: '2.5rem',
//       marginBottom: '1rem'
//     },
//     achievementValue: {
//       fontSize: '2.5rem',
//       fontWeight: '800',
//       marginBottom: '0.5rem'
//     },
//     achievementLabel: {
//       color: '#6b7280',
//       fontSize: '0.875rem',
//       fontWeight: '500'
//     },
//     ctaSection: {
//       padding: '5rem 0',
//       background: 'linear-gradient(135deg, #1e1b4b, #1e3a8a, #8b5cf6)',
//       textAlign: 'center'
//     },
//     ctaContent: {
//       maxWidth: '800px',
//       margin: '0 auto',
//       padding: '0 2rem',
//       color: 'white'
//     },
//     ctaTitle: {
//       fontSize: '3rem',
//       fontWeight: '800',
//       marginBottom: '1rem'
//     },
//     ctaSubtitle: {
//       fontSize: '1.25rem',
//       color: '#d1d5db',
//       marginBottom: '2rem',
//       lineHeight: '1.6'
//     },
//     primaryBtn: {
//       background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
//       color: 'white',
//       padding: '1rem 2rem',
//       borderRadius: '50px',
//       border: 'none',
//       fontWeight: '600',
//       fontSize: '1rem',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 8px 30px rgba(236, 72, 153, 0.3)'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />

//       {/* Hero Section */}
//       <section style={styles.heroSection}>
//         <div style={styles.heroContainer}>
//           <h1 style={styles.heroTitle}>
//             About <span style={{background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>ShopVibe</span>
//           </h1>
//           <p style={styles.heroSubtitle}>
//             We're revolutionizing online shopping by creating a platform where quality meets convenience, 
//             connecting millions of customers with exceptional products and trusted sellers worldwide.
//           </p>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section style={styles.storySection}>
//         <div style={styles.sectionContainer}>
//           <div style={styles.storyGrid}>
//             <div style={styles.storyContent}>
//               <h2 style={styles.storyTitle}>
//                 Our <span style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Story</span>
//               </h2>
//               <p style={styles.storyText}>
//                 ShopVibe was born from a simple yet powerful idea: shopping should be effortless, enjoyable, and trustworthy. 
//                 We noticed that customers were struggling to find quality products from reliable sources in one convenient location.
//               </p>
//               <p style={styles.storyText}>
//                 Today, we've built a thriving ecosystem where customers discover amazing products while sellers reach new audiences. 
//                 Our platform combines cutting-edge technology with human-centered design to create shopping experiences that delight and inspire.
//               </p>
//               <p style={styles.storyText}>
//                 Every day, we work tirelessly to make shopping more accessible, secure, and enjoyable for everyone in our community.
//               </p>
//             </div>
//             <div style={styles.storyVisual}>
//               🛍️
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Values Section */}
//       <section style={styles.valuesSection}>
//         <div style={styles.sectionContainer}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>Our Values</h2>
//             <p style={styles.sectionSubtitle}>
//               The principles that guide everything we do and shape our culture
//             </p>
//           </div>
          
//           <div style={styles.valuesGrid}>
//             {values.map((value, index) => (
//               <div 
//                 key={index}
//                 style={styles.valueCard}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-16px)';
//                   e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
//                 }}
//               >
//                 <div style={{...styles.valueIcon, background: value.gradient}}>
//                   {value.icon}
//                 </div>
//                 <h3 style={styles.valueTitle}>{value.title}</h3>
//                 <p style={styles.valueDescription}>{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Journey Timeline */}
//       <section style={styles.timelineSection}>
//         <div style={styles.sectionContainer}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>Our Journey</h2>
//             <p style={styles.sectionSubtitle}>
//               Key milestones that have shaped ShopVibe into what it is today
//             </p>
//           </div>
          
//           <div style={styles.timeline}>
//             {milestones.map((milestone, index) => (
//               <div key={index} style={styles.timelineItem}>
//                 <div style={styles.timelineIcon}>
//                   {milestone.icon}
//                 </div>
//                 <div style={styles.timelineContent}>
//                   <div style={styles.timelineYear}>{milestone.year}</div>
//                   <h3 style={styles.timelineTitle}>{milestone.title}</h3>
//                   <p style={styles.timelineDescription}>{milestone.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Team Section */}
//       <section style={styles.teamSection}>
//         <div style={styles.sectionContainer}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>Meet Our Team</h2>
//             <p style={styles.sectionSubtitle}>
//               The passionate individuals driving ShopVibe's mission forward
//             </p>
//           </div>
          
//           <div style={styles.teamGrid}>
//             {team.map((member, index) => (
//               <div 
//                 key={index}
//                 style={styles.teamCard}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-8px)';
//                   e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
//                 }}
//               >
//                 <div style={{...styles.teamImage, background: member.gradient}}>
//                   {member.image}
//                 </div>
//                 <h3 style={styles.teamName}>{member.name}</h3>
//                 <div style={styles.teamRole}>{member.role}</div>
//                 <p style={styles.teamDescription}>{member.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Achievements Section */}
//       <section style={styles.achievementsSection}>
//         <div style={styles.sectionContainer}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>Our Achievements</h2>
//             <p style={styles.sectionSubtitle}>
//               Numbers that reflect our commitment to excellence and growth
//             </p>
//           </div>
          
//           <div style={styles.achievementsGrid}>
//             {achievements.map((achievement, index) => (
//               <div 
//                 key={index}
//                 style={styles.achievementCard}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-8px)';
//                   e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
//                 }}
//               >
//                 <div style={styles.achievementIcon}>{achievement.icon}</div>
//                 <div style={{...styles.achievementValue, color: achievement.color}}>
//                   {achievement.value}
//                 </div>
//                 <div style={styles.achievementLabel}>{achievement.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section style={styles.ctaSection}>
//         <div style={styles.ctaContent}>
//           <h2 style={styles.ctaTitle}>
//             Join Our <span style={{background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Community</span>
//           </h2>
//           <p style={styles.ctaSubtitle}>
//             Become part of the ShopVibe family and experience the future of online shopping today.
//           </p>
//           <button 
//             style={styles.primaryBtn}
//             onMouseEnter={(e) => {
//               e.target.style.transform = 'scale(1.05)';
//               e.target.style.boxShadow = '0 15px 40px rgba(236, 72, 153, 0.4)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = 'scale(1)';
//               e.target.style.boxShadow = '0 8px 30px rgba(236, 72, 153, 0.3)';
//             }}
//             onClick={() => navigate('/')}
//           >
//             Start Shopping Today 🚀
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default About;



import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const values = [
    {
      icon: "💡",
      title: "Innovation",
      description: "We constantly evolve our platform with cutting-edge technology, AI-powered recommendations, and seamless user experiences.",
      gradient: "linear-gradient(135deg, #d4a574, #c8956d)"
    },
    {
      icon: "🤝",
      title: "Trust & Security",
      description: "Your data is protected with bank-level encryption, secure payment gateways, and verified seller programs.",
      gradient: "linear-gradient(135deg, #deb887, #d2b48c)"
    },
    {
      icon: "🌟",
      title: "Premium Quality",
      description: "Every product undergoes rigorous quality checks. We partner only with certified sellers who meet our strict standards.",
      gradient: "linear-gradient(135deg, #e6c2a6, #ddbea9)"
    },
    {
      icon: "❤️",
      title: "Customer First",
      description: "24/7 customer support, hassle-free returns, and personalized shopping experiences because your satisfaction is our goal.",
      gradient: "linear-gradient(135deg, #f5deb3, #e6d3a3)"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Foundation",
      description: "Founded by tech entrepreneurs with a vision to democratize online shopping and bridge the gap between customers and quality products.",
      icon: "🚀"
    },
    {
      year: "2021",
      title: "First Million",
      description: "Reached 1 million registered users and launched our seller verification program, establishing trust as our core foundation.",
      icon: "📈"
    },
    {
      year: "2022",
      title: "Mobile Revolution",
      description: "Launched award-winning mobile apps for iOS and Android, introducing AR try-on features and voice search capabilities.",
      icon: "📱"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 15 countries, partnered with international brands, and introduced multi-currency support and local language options.",
      icon: "🌍"
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Launched AI-powered personal shopping assistant, predictive analytics for inventory, and smart recommendation engine.",
      icon: "🤖"
    },
    {
      year: "2025",
      title: "Sustainable Future",
      description: "Committed to carbon-neutral delivery, sustainable packaging, and supporting eco-friendly brands through our Green Initiative program.",
      icon: "🌱"
    }
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Chief Executive Officer & Founder",
      description: "Former Amazon VP with 18+ years in e-commerce. Led multiple $100M+ digital transformation projects.",
      image: "👨‍💼",
      gradient: "linear-gradient(135deg, #d4a574, #c8956d)"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Chief Technology Officer",
      description: "MIT graduate, former Google AI researcher. Expert in machine learning and scalable platform architecture.",
      image: "👩‍💻",
      gradient: "linear-gradient(135deg, #deb887, #d2b48c)"
    },
    {
      name: "Maria Gonzalez",
      role: "Head of Customer Experience",
      description: "Stanford MBA, former Zappos executive. Revolutionized customer service with 99.7% satisfaction rate.",
      image: "👩‍🎨",
      gradient: "linear-gradient(135deg, #e6c2a6, #ddbea9)"
    },
    {
      name: "James Chen",
      role: "Chief Operations Officer",
      description: "Ex-FedEx logistics expert. Built our global supply chain network serving 50+ countries efficiently.",
      image: "👨‍🔧",
      gradient: "linear-gradient(135deg, #f5deb3, #e6d3a3)"
    }
  ];

  const achievements = [
    { icon: "👥", value: "5M+", label: "Active Customers", color: "#d4a574" },
    { icon: "🛍️", value: "50K+", label: "Products", color: "#deb887" },
    { icon: "🏪", value: "10K+", label: "Verified Sellers", color: "#e6c2a6" },
    { icon: "⭐", value: "4.9/5", label: "Customer Rating", color: "#f5deb3" },
    { icon: "🌍", value: "50+", label: "Countries", color: "#c8956d" },
    { icon: "📦", value: "1M+", label: "Orders/Month", color: "#d2b48c" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      image: "👩‍🦳",
      text: "KartSpace has completely transformed my shopping experience. The quality is amazing and delivery is always on time!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Tech Professional",
      image: "👨‍💻",
      text: "Best place to buy electronics. Authentic products, competitive prices, and excellent customer service.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Working Mom",
      image: "👩‍💼",
      text: "Love the convenience and variety. From groceries to gadgets, I can find everything I need in one place.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: "🔒",
      title: "Secure Payments",
      description: "256-bit SSL encryption and PCI DSS compliance"
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Optimized apps for iOS and Android with offline browsing"
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Same-day delivery in major cities, 2-day nationwide"
    },
    {
      icon: "🎯",
      title: "AI Recommendations",
      description: "Personalized product suggestions based on your preferences"
    },
    {
      icon: "♻️",
      title: "Eco-Friendly",
      description: "Sustainable packaging and carbon-neutral shipping options"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Live chat, phone, and email support in multiple languages"
    },
    {
      icon: "🎁",
      title: "Rewards Program",
      description: "Earn points on every purchase and unlock exclusive benefits"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // LIGHT SKIN COLOR THEME WITH 2-ROW MILESTONE LAYOUT
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#faf6f2', // Light skin tone background
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    
    // HERO SECTION WITH LIGHT SKIN TONES
    heroSection: {
      position: 'relative',
      paddingTop: '4rem',
      paddingBottom: '1.5rem',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #d4a574 0%, #c8956d 50%, #deb887 100%)', // Light skin gradient
      textAlign: 'center'
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
      color: 'white'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '1rem',
      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },
    heroSubtitle: {
      fontSize: '1.2rem',
      color: '#f4f1ed',
      marginBottom: '2rem',
      maxWidth: '700px',
      margin: '0 auto 2rem',
      lineHeight: '1.5'
    },
    heroStats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '3rem',
      marginTop: '2rem',
      flexWrap: 'wrap'
    },
    heroStat: {
      textAlign: 'center'
    },
    heroStatNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      display: 'block'
    },
    heroStatLabel: {
      fontSize: '0.9rem',
      opacity: '0.9'
    },

    // STORY SECTION
    storySection: {
      padding: '1.5rem 0',
      background: 'white'
    },
    sectionContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem'
    },
    storyGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center'
    },
    storyContent: {
      space: '1rem'
    },
    storyTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#8b4513', // Brown skin tone
      marginBottom: '1rem'
    },
    storyText: {
      fontSize: '1rem',
      color: '#a0522d', // Medium brown
      lineHeight: '1.6',
      marginBottom: '1rem'
    },
    storyVisual: {
      position: 'relative',
      height: '350px',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)'
    },
    storyImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      transition: 'transform 0.3s ease'
    },
    storyImageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.8), rgba(200, 149, 109, 0.8))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '4rem',
      color: 'rgba(255, 255, 255, 0.9)',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    },

    // VALUES SECTION
    valuesSection: {
      padding: '1.5rem 0',
      background: '#faf6f2'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '1rem'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#8b4513',
      marginBottom: '0.3rem'
    },
    sectionSubtitle: {
      fontSize: '1rem',
      color: '#a0522d',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.5'
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    valueCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 15px rgba(212, 165, 116, 0.15)',
      border: '1px solid #f4e4bc',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    valueIcon: {
      width: '3.5rem',
      height: '3.5rem',
      borderRadius: '1rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: 'white',
      marginBottom: '1rem'
    },
    valueTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#8b4513',
      marginBottom: '0.5rem'
    },
    valueDescription: {
      color: '#a0522d',
      lineHeight: '1.5',
      fontSize: '0.9rem'
    },

    // TIMELINE SECTION - 2 ROWS LAYOUT
    timelineSection: {
      padding: '1.5rem 0',
      background: 'white'
    },
    timeline: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns = 2 rows for 6 items
      gap: '1.5rem'
    },
    timelineItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 15px rgba(212, 165, 116, 0.15)',
      border: '1px solid #f4e4bc',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    timelineIcon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #d4a574, #c8956d)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: 'white',
      marginBottom: '1rem',
      boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
    },
    timelineContent: {
      width: '100%'
    },
    timelineYear: {
      fontSize: '1.5rem',
      fontWeight: '800',
      color: '#d4a574',
      marginBottom: '0.5rem'
    },
    timelineTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#8b4513',
      marginBottom: '0.5rem'
    },
    timelineDescription: {
      color: '#a0522d',
      lineHeight: '1.5',
      fontSize: '0.9rem'
    },

    // TEAM SECTION
    teamSection: {
      padding: '1.5rem 0',
      background: '#faf6f2'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.2rem'
    },
    teamCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.2rem',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(212, 165, 116, 0.15)',
      border: '1px solid #f4e4bc',
      transition: 'all 0.3s ease'
    },
    teamImage: {
      width: '3.5rem',
      height: '3.5rem',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.6rem',
      color: 'white',
      marginBottom: '0.8rem'
    },
    teamName: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#8b4513',
      marginBottom: '0.2rem'
    },
    teamRole: {
      fontSize: '0.85rem',
      fontWeight: '500',
      color: '#d4a574',
      marginBottom: '0.4rem'
    },
    teamDescription: {
      color: '#a0522d',
      fontSize: '0.8rem',
      lineHeight: '1.3'
    },

    // FEATURES SECTION
    featuresSection: {
      padding: '1.5rem 0',
      background: 'white'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '0.8rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    featureCard: {
      background: '#faf6f2',
      borderRadius: '0.8rem',
      padding: '1rem',
      textAlign: 'center',
      boxShadow: '0 3px 12px rgba(212, 165, 116, 0.12)',
      border: '1px solid #f4e4bc',
      transition: 'all 0.3s ease',
      minWidth: '0'
    },
    featureIcon: {
      fontSize: '1.6rem',
      marginBottom: '0.4rem'
    },
    featureTitle: {
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#8b4513',
      marginBottom: '0.3rem'
    },
    featureDescription: {
      color: '#a0522d',
      fontSize: '0.7rem',
      lineHeight: '1.3'
    },

    // TESTIMONIALS SECTION
    testimonialsSection: {
      padding: '1.5rem 0',
      background: '#faf6f2'
    },
    testimonialCard: {
      maxWidth: '700px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #d4a574, #c8956d)',
      borderRadius: '1.5rem',
      padding: '1.8rem',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)'
    },
    testimonialText: {
      fontSize: '1.1rem',
      fontStyle: 'italic',
      marginBottom: '1.2rem',
      lineHeight: '1.5'
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    testimonialImage: {
      fontSize: '2.2rem'
    },
    testimonialInfo: {
      textAlign: 'left'
    },
    testimonialName: {
      fontSize: '0.95rem',
      fontWeight: '600',
      marginBottom: '0.2rem'
    },
    testimonialRole: {
      fontSize: '0.85rem',
      opacity: '0.9'
    },
    testimonialStars: {
      fontSize: '1.1rem',
      marginTop: '0.3rem'
    },

    // ACHIEVEMENTS SECTION
    achievementsSection: {
      padding: '1.5rem 0',
      background: 'white'
    },
    achievementsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1.2rem'
    },
    achievementCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.2rem',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(212, 165, 116, 0.15)',
      border: '1px solid #f4e4bc',
      transition: 'all 0.3s ease'
    },
    achievementIcon: {
      fontSize: '1.8rem',
      marginBottom: '0.4rem'
    },
    achievementValue: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.2rem'
    },
    achievementLabel: {
      color: '#a0522d',
      fontSize: '0.85rem',
      fontWeight: '500'
    },

    // CTA SECTION
    ctaSection: {
      padding: '1.5rem 0',
      background: 'linear-gradient(135deg, #8b4513, #a0522d, #d4a574)',
      textAlign: 'center'
    },
    ctaContent: {
      maxWidth: '700px',
      margin: '0 auto',
      padding: '0 1.5rem',
      color: 'white'
    },
    ctaTitle: {
      fontSize: '2.2rem',
      fontWeight: '700',
      marginBottom: '0.8rem',
      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },
    ctaSubtitle: {
      fontSize: '1rem',
      color: '#f4f1ed',
      marginBottom: '1.5rem',
      lineHeight: '1.5'
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    primaryBtn: {
      background: 'linear-gradient(135deg, #d4a574, #c8956d)',
      color: 'white',
      padding: '0.9rem 1.8rem',
      borderRadius: '2rem',
      border: 'none',
      fontWeight: '600',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
    },
    secondaryBtn: {
      background: 'transparent',
      color: 'white',
      padding: '0.9rem 1.8rem',
      borderRadius: '2rem',
      border: '2px solid white',
      fontWeight: '600',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#fbbf24' : 'rgba(255,255,255,0.3)' }}>
        ★
      </span>
    ));
  };

  return (
    <div style={styles.container}>
      <Header />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>
            About <span style={{background: 'linear-gradient(135deg, #382903ff, #342203ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>KartSpace</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Revolutionizing e-commerce through innovation, trust, and exceptional customer experiences. 
            We're not just a marketplace – we're your partner in discovering the best products worldwide.
          </p>
          
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNumber}>5M+</span>
              <span style={styles.heroStatLabel}>Happy Customers</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNumber}>50K+</span>
              <span style={styles.heroStatLabel}>Products</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNumber}>50+</span>
              <span style={styles.heroStatLabel}>Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={styles.storySection}>
        <div style={styles.sectionContainer}>
          <div style={styles.storyGrid}>
            <div style={styles.storyContent}>
              <h2 style={styles.storyTitle}>
                Our <span style={{background: 'linear-gradient(135deg, #d4a574, #c8956d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Journey</span>
              </h2>
              <p style={styles.storyText}>
                Founded in 2020 by a team of passionate entrepreneurs, KartSpace emerged from a simple observation: 
                online shopping was fragmented, unreliable, and lacked the personal touch customers deserved.
              </p>
              <p style={styles.storyText}>
                We set out to create more than just another e-commerce platform. Our vision was to build a 
                comprehensive ecosystem where quality meets convenience, where trust is paramount, and where 
                every customer feels valued and heard.
              </p>
              <p style={styles.storyText}>
                Today, ClassyShop serves millions of customers worldwide, partnering with thousands of verified 
                sellers to deliver authentic products, exceptional service, and unforgettable shopping experiences.
              </p>
            </div>
            <div 
              style={styles.storyVisual}
              onMouseEnter={(e) => {
                const overlay = e.target.querySelector('.story-overlay');
                const img = e.target.querySelector('img');
                if (overlay) overlay.style.opacity = '1';
                if (img) img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                const overlay = e.target.querySelector('.story-overlay');
                const img = e.target.querySelector('img');
                if (overlay) overlay.style.opacity = '0';
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <img 
                src="https://media.istockphoto.com/id/627739552/photo/group-of-young-friends-shopping-in-mall-together.jpg?s=170667a&w=0&k=20&c=Dqb4WNfkeUZs7VbA6FNYFCQETdZYbwumvBXcj4Xa_WY="
                alt="Happy customers shopping together"
                style={styles.storyImage}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="story-overlay" style={styles.storyImageOverlay}>
                🛍️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Core Values</h2>
            <p style={styles.sectionSubtitle}>
              The fundamental principles that guide our decisions and shape our culture
            </p>
          </div>
          
          <div style={styles.valuesGrid}>
            {values.map((value, index) => (
              <div 
                key={index}
                style={styles.valueCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(212, 165, 116, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.15)';
                }}
              >
                <div style={{...styles.valueIcon, background: value.gradient}}>
                  {value.icon}
                </div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - 2 Rows Layout */}
      <section style={styles.timelineSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Milestones</h2>
            <p style={styles.sectionSubtitle}>
              Key achievements that have shaped KartSpace's evolution
            </p>
          </div>
          
          <div style={styles.timeline}>
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                style={styles.timelineItem}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(212, 165, 116, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.15)';
                }}
              >
                <div style={styles.timelineIcon}>
                  {milestone.icon}
                </div>
                <div style={styles.timelineContent}>
                  <div style={styles.timelineYear}>{milestone.year}</div>
                  <h3 style={styles.timelineTitle}>{milestone.title}</h3>
                  <p style={styles.timelineDescription}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={styles.teamSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Leadership Team</h2>
            <p style={styles.sectionSubtitle}>
              Meet the visionary leaders driving ClassyShop's mission
            </p>
          </div>
          
          <div style={styles.teamGrid}>
            {team.map((member, index) => (
              <div 
                key={index}
                style={styles.teamCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(212, 165, 116, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.15)';
                }}
              >
                <div style={{...styles.teamImage, background: member.gradient}}>
                  {member.image}
                </div>
                <h3 style={styles.teamName}>{member.name}</h3>
                <div style={styles.teamRole}>{member.role}</div>
                <p style={styles.teamDescription}>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Why Choose KartSpace</h2>
            <p style={styles.sectionSubtitle}>
              Features that make us the preferred choice for millions
            </p>
          </div>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(212, 165, 116, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 3px 12px rgba(212, 165, 116, 0.12)';
                }}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={styles.testimonialsSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
            <p style={styles.sectionSubtitle}>
              Real experiences from real customers
            </p>
          </div>
          
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>
              "{testimonials[activeTestimonial].text}"
            </p>
            <div style={styles.testimonialAuthor}>
              <div style={styles.testimonialImage}>
                {testimonials[activeTestimonial].image}
              </div>
              <div style={styles.testimonialInfo}>
                <div style={styles.testimonialName}>
                  {testimonials[activeTestimonial].name}
                </div>
                <div style={styles.testimonialRole}>
                  {testimonials[activeTestimonial].role}
                </div>
                <div style={styles.testimonialStars}>
                  {renderStars(testimonials[activeTestimonial].rating)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section style={styles.achievementsSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Impact</h2>
            <p style={styles.sectionSubtitle}>
              Numbers that showcase our growth and commitment
            </p>
          </div>
          
          <div style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                style={styles.achievementCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(212, 165, 116, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.15)';
                }}
              >
                <div style={styles.achievementIcon}>{achievement.icon}</div>
                <div style={{...styles.achievementValue, color: achievement.color}}>
                  {achievement.value}
                </div>
                <div style={styles.achievementLabel}>{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>
            Ready to Experience <span style={{background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>KartSpace</span>?
          </h2>
          <p style={styles.ctaSubtitle}>
            Join millions of satisfied customers and discover why KartSpace is the future of online shopping.
          </p>
          <div style={styles.ctaButtons}>
            <button 
              style={styles.primaryBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(212, 165, 116, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.3)';
              }}
              onClick={() => navigate('/')}
            >
              Start Shopping Now 🚀
            </button>
            {/* <button 
              style={styles.secondaryBtn}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#d4a574';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
              onClick={() => navigate('/contact')}
            >
              Contact Us 💬
            </button> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;



