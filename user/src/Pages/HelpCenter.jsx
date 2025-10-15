// import React, { useState, useEffect, useRef } from 'react';
// import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Loader, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

// const HelpCenter = () => {
//   const [showChat, setShowChat] = useState(false);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [chatMinimized, setChatMinimized] = useState(false);

//   // Hardcoded API key - no need for user setup (do NOT do this in production)
//   const apiKey = 'veIji6VcnS8UZAM3yJSaLSeaZn43KI9MWBEf2ZkH';
//   const isConnected = true;

//   const chatEndRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   // Image generation states
//   const [showImageGen, setShowImageGen] = useState(false);
//   const [imagePrompt, setImagePrompt] = useState('');
//   const [isGeneratingImage, setIsGeneratingImage] = useState(false);
//   const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
//   const [imageError, setImageError] = useState('');

//   // Link generation states
//   const [isCopyingLink, setIsCopyingLink] = useState(false);
//   const [linkCopied, setLinkCopied] = useState(false);

//   // Check mobile screen size
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Clear chat on page refresh - don't load from localStorage
//   useEffect(() => {
//     localStorage.removeItem('helpCenterChat');
//     setChatMessages([]);
//   }, []);

//   // Auto-scroll chat
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatMessages, isTyping]);

//   // Enhanced Cohere AI Integration with friendly personality
//   const generateCohereResponse = async (userMessage, retryCount = 0) => {
//     try {
//       const systemPrompt = `You are Emma, a super friendly and helpful AI assistant for ShopCart! 🛍️

// Your personality:
// - Always enthusiastic and positive! Use emojis frequently 😊
// - Be warm, conversational, and like talking to a friend
// - Show empathy and understanding
// - Use casual, friendly language (not too formal)
// - Always try to help and make the customer feel valued

// You can help with:
// - Order tracking, modifications, and cancellations 📦
// - Account issues like login problems, password resets 🔐
// - Payment questions, refunds, and billing 💳
// - Shipping information and delivery tracking 🚚
// - Product inquiries, sizing, and availability 👕
// - Technical support for website issues 💻
// - Returns, exchanges, and warranty claims 🔄

// Guidelines:
// - Keep responses friendly but concise (2-3 sentences max)
// - Always start with a warm greeting or acknowledgment
// - Use emojis to make conversations feel more personal
// - If you can't solve something, guide them kindly to human support
// - Make shopping feel fun and stress-free!

// Remember: You're like a friendly store assistant who genuinely cares about helping! 🌟`;

//       const response = await fetch('https://api.cohere.ai/v1/chat', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'command-nightly',
//           message: userMessage,
//           preamble: systemPrompt,
//           chat_history: chatMessages.slice(-4).map(msg => ({
//             role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
//             message: msg.text
//           })),
//           max_tokens: 150,
//           temperature: 0.8,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));

//         if (response.status === 429) {
//           return "Oops! I'm getting lots of messages right now 😅 Give me just a moment and try again!";
//         } else if (response.status >= 500) {
//           return "Oh no! My AI brain is taking a little break 🧠💤 Please try again in a moment!";
//         }

//         throw new Error(`API Error: ${response.status} ${errorData?.message || ''}`);
//       }

//       const data = await response.json();

//       if (!data.text) {
//         throw new Error('Invalid response format');
//       }

//       return data.text.trim();

//     } catch (error) {
//       console.error('Cohere API Error:', error);

//       // Retry once for network errors
//       if (retryCount === 0 && (error.name === 'TypeError' || error.message.includes('Failed to fetch'))) {
//         await new Promise(resolve => setTimeout(resolve, 800));
//         return generateCohereResponse(userMessage, 1);
//       }

//       return "Hmm, I'm having a tiny technical hiccup! 🔧 Could you try asking me again? I'm excited to help you! 😊";
//     }
//   };

//   const sendChatMessage = async () => {
//     if (!currentMessage.trim() || isTyping) return;

//     const userMessage = {
//       id: Date.now(),
//       text: currentMessage.trim(),
//       sender: 'user',
//       timestamp: new Date().toISOString()
//     };

//     setChatMessages(prev => [...prev, userMessage]);
//     const messageToSend = currentMessage;
//     setCurrentMessage('');
//     setIsTyping(true);

//     try {
//       const aiResponseText = await generateCohereResponse(messageToSend);
//       await new Promise(resolve => setTimeout(resolve, 500));

//       const aiResponse = {
//         id: Date.now() + 1,
//         text: aiResponseText,
//         sender: 'ai',
//         timestamp: new Date().toISOString()
//       };

//       setChatMessages(prev => [...prev, aiResponse]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       const errorResponse = {
//         id: Date.now() + 1,
//         text: "Oops! Something went a bit wonky on my end 😅 Could you try that again? I promise I'll do better! 💪",
//         sender: 'ai',
//         timestamp: new Date().toISOString()
//       };
//       setChatMessages(prev => [...prev, errorResponse]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendChatMessage();
//     }
//   };

//   const clearChatHistory = () => {
//     setChatMessages([]);
//     localStorage.removeItem('helpCenterChat');
//   };

//   // Image generation via Cohere Images API (demo)
//   const generateImage = async () => {
//     if (!imagePrompt.trim() || isGeneratingImage) return;
//     setIsGeneratingImage(true);
//     setImageError('');
//     setGeneratedImageUrl(null);

//     try {
//       // Example Cohere Images endpoint usage (adjust to actual API as needed)
//       const resp = await fetch('https://api.cohere.ai/v1/images', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           prompt: imagePrompt.trim(),
//           // Additional fields may be required depending on provider:
//           // size: '1024x1024', n: 1, etc.
//         }),
//       });

//       if (!resp.ok) {
//         const err = await resp.json().catch(() => ({}));
//         throw new Error(`Image API Error: ${resp.status} ${err?.message || ''}`);
//       }

//       const data = await resp.json();
//       // Assuming data returns an array of image URLs or a single URL field
//       const url = data?.images?.[0]?.url || data?.url;
//       if (!url) throw new Error('No image URL returned');

//       setGeneratedImageUrl(url);

//       // Also drop a message in chat to show the result contextually
//       setChatMessages(prev => ([
//         ...prev,
//         {
//           id: Date.now() + 2,
//           text: `I created an image for: "${imagePrompt.trim()}"`,
//           sender: 'ai',
//           timestamp: new Date().toISOString()
//         }
//       ]));
//     } catch (e) {
//       console.error(e);
//       setImageError('Could not generate image. Please try again.');
//     } finally {
//       setIsGeneratingImage(false);
//     }
//   };

//   // Link generation: produce a shareable link to the latest AI message (demo)
//   const copyShareLinkForLastAI = async () => {
//     const lastAI = [...chatMessages].reverse().find(m => m.sender === 'ai');
//     if (!lastAI) {
//       setIsCopyingLink(false);
//       setLinkCopied(false);
//       return;
//     }
//     setIsCopyingLink(true);
//     try {
//       // Demo link pattern; replace with your own route that can render a message by ID/token
//       const link = `${window.location.origin}/share/message/${lastAI.id}`;
//       await navigator.clipboard.writeText(link);
//       setLinkCopied(true);
//       setTimeout(() => setLinkCopied(false), 2000);
//     } catch (e) {
//       console.error('Copy failed', e);
//     } finally {
//       setIsCopyingLink(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
//       position: 'relative',
//       padding: isMobile ? '1rem' : '2rem'
//     }}>
//       {/* Top-left Back Button to "/" */}
//       <button
//         onClick={() => { window.location.href = '/'; }}
//         style={{
//           position: 'fixed',
//           top: isMobile ? '0.75rem' : '1rem',
//           left: isMobile ? '0.75rem' : '1rem',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '0.5rem',
//           background: 'rgba(255,255,255,0.15)',
//           color: 'white',
//           border: '1px solid rgba(255,255,255,0.25)',
//           padding: '0.6rem 0.9rem',
//           borderRadius: '12px',
//           cursor: 'pointer',
//           backdropFilter: 'blur(10px)',
//           boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
//           zIndex: 1100
//         }}
//         onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
//         onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
//         aria-label="Go back"
//       >
//         <ArrowLeft size={18} />
//         <span style={{ fontWeight: 600 }}>Back</span>
//       </button>

//       {/* Main Content */}
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         textAlign: 'center',
//         color: 'white'
//       }}>
//         {/* Header */}
//         <div style={{ marginBottom: '3rem' }}>
//           <div style={{
//             width: '100px',
//             height: '100px',
//             background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
//             borderRadius: '25px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '0 auto 2rem',
//             backdropFilter: 'blur(20px)',
//             border: '2px solid rgba(255, 255, 255, 0.3)',
//             boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
//           }}>
//             <MessageCircle size={50} style={{ color: 'white' }} />
//           </div>
//           <h1 style={{
//             fontSize: isMobile ? '2.8rem' : '4rem',
//             fontWeight: '800',
//             marginBottom: '1rem',
//             textShadow: '0 4px 8px rgba(0,0,0,0.3)',
//             background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text'
//           }}>
//             Meet Emma! 🤖✨
//           </h1>
//           <p style={{
//             fontSize: isMobile ? '1.2rem' : '1.4rem',
//             opacity: 0.95,
//             maxWidth: '700px',
//             margin: '0 auto',
//             lineHeight: 1.6,
//             color: '#f8f9fa',
//             fontWeight: '300'
//           }}>
//             Your friendly AI shopping assistant! I'm here to help make your ShopCart experience amazing! 😊🛍️
//           </p>
//         </div>

//         {/* Action Button */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginBottom: '2rem'
//         }}>
//           <button
//             onClick={() => setShowChat(true)}
//             style={{
//               background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//               color: 'white',
//               padding: isMobile ? '1.2rem 2.5rem' : '1.8rem 3.5rem',
//               borderRadius: '60px',
//               border: 'none',
//               fontSize: isMobile ? '1.2rem' : '1.4rem',
//               fontWeight: '700',
//               cursor: 'pointer',
//               boxShadow: '0 15px 35px rgba(255, 107, 107, 0.4)',
//               transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '0.8rem',
//               textTransform: 'none',
//               letterSpacing: '0.5px'
//             }}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'scale(1.08) translateY(-3px)';
//               e.target.style.boxShadow = '0 20px 45px rgba(255, 107, 107, 0.5)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'scale(1)';
//               e.target.style.boxShadow = '0 15px 35px rgba(255, 107, 107, 0.4)';
//             }}
//           >
//             <MessageCircle size={28} />
//             Chat with Emma! 💬
//           </button>
//         </div>

//         {/* Features */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
//           gap: '2.5rem',
//           marginTop: '5rem'
//         }}>
//           {[
//             { title: 'Super Fast! ⚡', desc: 'Emma responds in seconds - no waiting around!', color: '#ffd93d' },
//             { title: 'Always Friendly 😊', desc: 'Like chatting with your favorite store buddy!', color: '#ff6b6b' },
//             { title: 'Really Helpful 🌟', desc: 'Emma knows everything about ShopCart!', color: '#4ecdc4' }
//           ].map((feature, index) => (
//             <div key={index} style={{
//               background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
//               backdropFilter: 'blur(20px)',
//               padding: '2.5rem',
//               borderRadius: '20px',
//               border: '1px solid rgba(255, 255, 255, 0.2)',
//               boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//               transition: 'all 0.3s ease'
//             }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-8px)';
//                 e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
//               }}
//             >
//               <h3 style={{
//                 fontSize: '1.4rem',
//                 marginBottom: '1rem',
//                 color: 'white',
//                 fontWeight: '700'
//               }}>{feature.title}</h3>
//               <p style={{
//                 opacity: 0.9,
//                 lineHeight: 1.6,
//                 color: '#f8f9fa',
//                 fontSize: '1rem',
//                 fontWeight: '300'
//               }}>{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Widget */}
//       {showChat && (
//         <div style={{
//           position: 'fixed',
//           bottom: isMobile ? '1rem' : '2rem',
//           right: isMobile ? '1rem' : '2rem',
//           width: isMobile ? 'calc(100vw - 2rem)' : (chatMinimized ? '320px' : '420px'),
//           height: isMobile ? 'calc(100vh - 2rem)' : (chatMinimized ? '70px' : '700px'),
//           background: 'white',
//           borderRadius: '25px',
//           boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
//           zIndex: 1000,
//           transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//           border: '1px solid rgba(0, 0, 0, 0.05)'
//         }}>
//           {/* Chat Header */}
//           <div style={{
//             background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//             padding: '1.2rem 1.8rem',
//             color: 'white',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             flexShrink: 0,
//             borderRadius: '25px 25px 0 0'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//               <div style={{
//                 width: '45px',
//                 height: '45px',
//                 background: 'rgba(255, 255, 255, 0.25)',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backdropFilter: 'blur(10px)'
//               }}>
//                 <Bot size={22} />
//               </div>
//               <div>
//                 <h3 style={{
//                   margin: 0,
//                   fontSize: '1.2rem',
//                   fontWeight: '700',
//                   color: 'white'
//                 }}>
//                   Emma 🤖
//                 </h3>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
//                   <div style={{
//                     width: '10px',
//                     height: '10px',
//                     background: '#4ade80',
//                     borderRadius: '50%',
//                     boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
//                   }} />
//                   <span style={{
//                     fontSize: '0.85rem',
//                     opacity: 0.95,
//                     color: 'rgba(255, 255, 255, 0.9)'
//                   }}>
//                     Ready to help! 😊
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '0.5rem' }}>
//               <button
//                 onClick={clearChatHistory}
//                 style={{
//                   background: 'rgba(255, 255, 255, 0.15)',
//                   border: 'none',
//                   color: 'white',
//                   cursor: 'pointer',
//                   padding: '0.6rem',
//                   borderRadius: '10px',
//                   transition: 'all 0.2s ease',
//                   fontSize: '0.9rem',
//                   backdropFilter: 'blur(10px)'
//                 }}
//                 title="Clear Chat"
//                 onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
//                 onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
//               >
//                 🗑️
//               </button>
//               {!isMobile && (
//                 <button
//                   onClick={() => setChatMinimized(!chatMinimized)}
//                   style={{
//                     background: 'rgba(255, 255, 255, 0.15)',
//                     border: 'none',
//                     color: 'white',
//                     cursor: 'pointer',
//                     padding: '0.6rem',
//                     borderRadius: '10px',
//                     transition: 'all 0.2s ease',
//                     backdropFilter: 'blur(10px)'
//                   }}
//                   onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
//                   onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
//                 >
//                   {chatMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
//                 </button>
//               )}
//               <button
//                 onClick={() => setShowChat(false)}
//                 style={{
//                   background: 'rgba(255, 255, 255, 0.15)',
//                   border: 'none',
//                   color: 'white',
//                   cursor: 'pointer',
//                   padding: '0.6rem',
//                   borderRadius: '10px',
//                   transition: 'all 0.2s ease',
//                   backdropFilter: 'blur(10px)'
//                 }}
//                 onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
//                 onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>

//           {!chatMinimized && (
//             <>
//               {/* Chat Messages */}
//               <div style={{
//                 flex: 1,
//                 overflowY: 'auto',
//                 padding: '1.5rem',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '1.2rem',
//                 background: 'linear-gradient(135deg, #fafbfc, #f8f9fa)'
//               }}>
//                 {chatMessages.length === 0 && (
//                   <div style={{
//                     textAlign: 'center',
//                     padding: '2.5rem 1.5rem',
//                     color: '#495057'
//                   }}>
//                     <div style={{
//                       width: '80px',
//                       height: '80px',
//                       background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//                       borderRadius: '50%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       margin: '0 auto 1.5rem',
//                       color: 'white',
//                       boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)'
//                     }}>
//                       <Bot size={35} />
//                     </div>
//                     <h4 style={{
//                       color: '#212529',
//                       marginBottom: '0.8rem',
//                       fontSize: '1.3rem',
//                       fontWeight: '700'
//                     }}>Hey there! I'm Emma! 👋</h4>
//                     <p style={{
//                       marginBottom: '1.2rem',
//                       color: '#495057',
//                       fontSize: '1rem',
//                       lineHeight: 1.6
//                     }}>I'm your friendly AI assistant and I'm super excited to help you with anything ShopCart related! 🛍️✨</p>
//                     <p style={{
//                       fontSize: '0.95rem',
//                       color: '#6c757d',
//                       lineHeight: 1.5
//                     }}>
//                       Ask me about orders 📦, payments 💳, shipping 🚚, returns 🔄, or anything else! I'm here to make your shopping experience amazing! 😊
//                     </p>
//                   </div>
//                 )}

//                 {chatMessages.map((message) => (
//                   <div key={message.id} style={{
//                     display: 'flex',
//                     justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
//                   }}>
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'flex-end',
//                       gap: '0.8rem',
//                       maxWidth: '85%',
//                       flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
//                     }}>
//                       <div style={{
//                         width: '38px',
//                         height: '38px',
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flexShrink: 0,
//                         background: message.sender === 'user'
//                           ? 'linear-gradient(135deg, #667eea, #764ba2)'
//                           : 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//                         color: 'white',
//                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
//                       }}>
//                         {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
//                       </div>
//                       <div style={{
//                         padding: '1rem 1.3rem',
//                         borderRadius: '20px',
//                         background: message.sender === 'user'
//                           ? 'linear-gradient(135deg, #667eea, #764ba2)'
//                           : 'white',
//                         color: message.sender === 'user' ? 'white' : '#212529',
//                         wordWrap: 'break-word',
//                         border: message.sender === 'ai' ? '1px solid #e9ecef' : 'none',
//                         boxShadow: message.sender === 'ai'
//                           ? '0 2px 10px rgba(0, 0, 0, 0.08)'
//                           : '0 4px 15px rgba(102, 126, 234, 0.3)',
//                         fontSize: '0.95rem',
//                         lineHeight: 1.5
//                       }}>
//                         <p style={{
//                           margin: 0,
//                           fontWeight: '400',
//                           color: message.sender === 'user' ? 'white' : '#212529'
//                         }}>{message.text}</p>
//                         <span style={{
//                           fontSize: '0.75rem',
//                           opacity: 0.7,
//                           display: 'block',
//                           marginTop: '0.5rem',
//                           color: message.sender === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#6c757d'
//                         }}>
//                           {new Date(message.timestamp).toLocaleTimeString([], {
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {isTyping && (
//                   <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'flex-end',
//                       gap: '0.8rem',
//                       maxWidth: '85%'
//                     }}>
//                       <div style={{
//                         width: '38px',
//                         height: '38px',
//                         background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
//                       }}>
//                         <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
//                       </div>
//                       <div style={{
//                         background: 'white',
//                         padding: '1rem 1.3rem',
//                         borderRadius: '20px',
//                         border: '1px solid #e9ecef',
//                         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
//                       }}>
//                         <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
//                           {[0, 1, 2].map(i => (
//                             <div key={i} style={{
//                               width: '10px',
//                               height: '10px',
//                               background: '#ff6b6b',
//                               borderRadius: '50%',
//                               animation: `bounce 1.4s infinite ${i * 0.2}s`
//                             }} />
//                           ))}
//                           <span style={{
//                             marginLeft: '0.8rem',
//                             fontSize: '0.9rem',
//                             color: '#6c757d',
//                             fontWeight: '500'
//                           }}>
//                             Emma is thinking... 💭
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={chatEndRef} />
//               </div>

//               {/* Chat Input + Tools */}
//               <div style={{
//                 padding: '1.5rem',
//                 borderTop: '1px solid #e9ecef',
//                 flexShrink: 0,
//                 background: 'white'
//               }}>
//                 {/* Image generation toggle panel */}
//                 {showImageGen && (
//                   <div style={{
//                     background: '#fafbfc',
//                     border: '1px solid #e9ecef',
//                     borderRadius: '14px',
//                     padding: '1rem',
//                     marginBottom: '0.9rem'
//                   }}>
//                     <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.6rem' }}>
//                       <ImageIcon size={18} color="#ff6b6b" />
//                       <strong style={{ color: '#212529' }}>Create an image</strong>
//                     </div>
//                     <div style={{ display: 'flex', gap: '0.6rem' }}>
//                       <input
//                         type="text"
//                         value={imagePrompt}
//                         onChange={(e) => setImagePrompt(e.target.value)}
//                         placeholder="Describe the image to create (e.g., cozy product photo, pastel background)"
//                         style={{
//                           flex: 1,
//                           padding: '0.75rem 1rem',
//                           border: '1px solid #e9ecef',
//                           borderRadius: '10px',
//                           outline: 'none',
//                           background: 'white'
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = '#ff6b6b';
//                           e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = '#e9ecef';
//                           e.target.style.boxShadow = 'none';
//                         }}
//                       />
//                       <button
//                         onClick={generateImage}
//                         disabled={isGeneratingImage || !imagePrompt.trim()}
//                         style={{
//                           padding: '0.75rem 1rem',
//                           background: (!imagePrompt.trim() || isGeneratingImage) ? '#dee2e6' : 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//                           color: (!imagePrompt.trim() || isGeneratingImage) ? '#6c757d' : 'white',
//                           border: 'none',
//                           borderRadius: '10px',
//                           cursor: (!imagePrompt.trim() || isGeneratingImage) ? 'not-allowed' : 'pointer',
//                           boxShadow: (!imagePrompt.trim() || isGeneratingImage) ? 'none' : '0 4px 15px rgba(255, 107, 107, 0.3)'
//                         }}
//                       >
//                         {isGeneratingImage ? 'Generating…' : 'Generate'}
//                       </button>
//                     </div>
//                     {imageError && (
//                       <p style={{ marginTop: '0.6rem', color: '#dc2626' }}>{imageError}</p>
//                     )}
//                     {generatedImageUrl && (
//                       <div style={{ marginTop: '0.8rem' }}>
//                         <img
//                           src={generatedImageUrl}
//                           alt="Generated"
//                           style={{
//                             width: '100%',
//                             borderRadius: '12px',
//                             border: '1px solid #e9ecef',
//                             objectFit: 'cover',
//                             maxHeight: '300px'
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-end' }}>
//                   <textarea
//                     value={currentMessage}
//                     onChange={(e) => setCurrentMessage(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Ask Emma anything! She's super friendly! 😊"
//                     rows={1}
//                     style={{
//                       flex: 1,
//                       padding: '1rem 1.3rem',
//                       border: '2px solid #e9ecef',
//                       borderRadius: '25px',
//                       resize: 'none',
//                       fontFamily: 'inherit',
//                       fontSize: '1rem',
//                       outline: 'none',
//                       transition: 'all 0.3s ease',
//                       maxHeight: '120px',
//                       minHeight: '50px',
//                       backgroundColor: '#fafbfc',
//                       color: '#212529',
//                       lineHeight: 1.5
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#ff6b6b';
//                       e.target.style.backgroundColor = 'white';
//                       e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = '#e9ecef';
//                       e.target.style.backgroundColor = '#fafbfc';
//                       e.target.style.boxShadow = 'none';
//                     }}
//                   />

//                   {/* Toggle Image Gen panel */}
//                   {/* <button
//                     onClick={() => setShowImageGen(v => !v)}
//                     title="Create Image"
//                     style={{
//                       width: '50px',
//                       height: '50px',
//                       background: 'linear-gradient(135deg, #f1f5f9, #ffffff)',
//                       color: '#ff6b6b',
//                       border: '1px solid #e9ecef',
//                       borderRadius: '50%',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       transition: 'all 0.3s ease',
//                       flexShrink: 0,
//                       boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
//                     }}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.transform = 'scale(1.05)';
//                       e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.transform = 'scale(1)';
//                       e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
//                     }}
//                   >
//                     <ImageIcon size={20} />
//                   </button> */}

//                   {/* Link button for latest AI reply
//                   <button
//                     onClick={copyShareLinkForLastAI}
//                     title="Copy link to latest AI reply"
//                     style={{
//                       width: '50px',
//                       height: '50px',
//                       background: 'linear-gradient(135deg, #f1f5f9, #ffffff)',
//                       color: '#111827',
//                       border: '1px solid #e9ecef',
//                       borderRadius: '50%',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       transition: 'all 0.3s ease',
//                       flexShrink: 0,
//                       boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
//                     }}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.transform = 'scale(1.05)';
//                       e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.transform = 'scale(1)';
//                       e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
//                     }}
//                   >
//                     {linkCopied ? <Check size={20} color="#16a34a" /> : <LinkIcon size={20} />}
//                   </button> */}

//                   <button
//                     onClick={sendChatMessage}
//                     disabled={!currentMessage.trim() || isTyping}
//                     style={{
//                       width: '50px',
//                       height: '50px',
//                       background: (!currentMessage.trim() || isTyping)
//                         ? '#dee2e6'
//                         : 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//                       color: (!currentMessage.trim() || isTyping) ? '#6c757d' : 'white',
//                       border: 'none',
//                       borderRadius: '50%',
//                       cursor: (!currentMessage.trim() || isTyping) ? 'not-allowed' : 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       transition: 'all 0.3s ease',
//                       flexShrink: 0,
//                       boxShadow: (!currentMessage.trim() || isTyping)
//                         ? 'none'
//                         : '0 4px 15px rgba(255, 107, 107, 0.3)'
//                     }}
//                     onMouseOver={(e) => {
//                       if (!(!currentMessage.trim() || isTyping)) {
//                         e.currentTarget.style.transform = 'scale(1.05)';
//                         e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
//                       }
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.transform = 'scale(1)';
//                       e.currentTarget.style.boxShadow = (!currentMessage.trim() || isTyping)
//                         ? 'none'
//                         : '0 4px 15px rgba(255, 107, 107, 0.3)';
//                     }}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Enhanced CSS Animations */}
//       <style jsx>{`
//         @keyframes bounce {
//           0%, 20%, 50%, 80%, 100% {
//             transform: translateY(0);
//           }
//           40% {
//             transform: translateY(-8px);
//           }
//           60% {
//             transform: translateY(-4px);
//           }
//         }

//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateY(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         @media (max-width: 768px) {
//           textarea {
//             font-size: 16px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HelpCenter;



import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Loader, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

const HelpCenter = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);

  // Hardcoded API key - no need for user setup (do NOT do this in production)
  const apiKey = 'AuW8mF95swe8eRTJiC6qhLKpbc83LeyE8TYkeWID';
  const isConnected = true;

  const chatEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Image generation states
  const [showImageGen, setShowImageGen] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [imageError, setImageError] = useState('');

  // Link generation states
  const [isCopyingLink, setIsCopyingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Clear chat on page refresh - don't load from localStorage
  useEffect(() => {
    localStorage.removeItem('helpCenterChat');
    setChatMessages([]);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Enhanced Cohere AI Integration with friendly personality
  const generateCohereResponse = async (userMessage, retryCount = 0) => {
    try {
      const systemPrompt = `You are Emma, a super friendly and helpful AI assistant for ShopCart! 🛍️

Your personality:
- Always enthusiastic and positive! Use emojis frequently 😊
- Be warm, conversational, and like talking to a friend
- Show empathy and understanding
- Use casual, friendly language (not too formal)
- Always try to help and make the customer feel valued

You can help with:
- Order tracking, modifications, and cancellations 📦
- Account issues like login problems, password resets 🔐
- Payment questions, refunds, and billing 💳
- Shipping information and delivery tracking 🚚
- Product inquiries, sizing, and availability 👕
- Technical support for website issues 💻
- Returns, exchanges, and warranty claims 🔄

Guidelines:
- Keep responses friendly but concise (2-3 sentences max)
- Always start with a warm greeting or acknowledgment
- Use emojis to make conversations feel more personal
- If you can't solve something, guide them kindly to human support
- Make shopping feel fun and stress-free!

Remember: You're like a friendly store assistant who genuinely cares about helping! 🌟`;

      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command-nightly',
          message: userMessage,
          preamble: systemPrompt,
          chat_history: chatMessages.slice(-4).map(msg => ({
            role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
            message: msg.text
          })),
          max_tokens: 150,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 429) {
          return "Oops! I'm getting lots of messages right now 😅 Give me just a moment and try again!";
        } else if (response.status >= 500) {
          return "Oh no! My AI brain is taking a little break 🧠💤 Please try again in a moment!";
        }

        throw new Error(`API Error: ${response.status} ${errorData?.message || ''}`);
      }

      const data = await response.json();

      if (!data.text) {
        throw new Error('Invalid response format');
      }

      return data.text.trim();

    } catch (error) {
      console.error('Cohere API Error:', error);

      // Retry once for network errors
      if (retryCount === 0 && (error.name === 'TypeError' || error.message.includes('Failed to fetch'))) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return generateCohereResponse(userMessage, 1);
      }

      return "Hmm, I'm having a tiny technical hiccup! 🔧 Could you try asking me again? I'm excited to help you! 😊";
    }
  };

  const sendChatMessage = async () => {
    if (!currentMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: currentMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const aiResponseText = await generateCohereResponse(messageToSend);
      await new Promise(resolve => setTimeout(resolve, 500));

      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "Oops! Something went a bit wonky on my end 😅 Could you try that again? I promise I'll do better! 💪",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  const clearChatHistory = () => {
    setChatMessages([]);
    localStorage.removeItem('helpCenterChat');
  };

  // Image generation via Cohere Images API (demo)
  const generateImage = async () => {
    if (!imagePrompt.trim() || isGeneratingImage) return;
    setIsGeneratingImage(true);
    setImageError('');
    setGeneratedImageUrl(null);

    try {
      // Example Cohere Images endpoint usage (adjust to actual API as needed)
      const resp = await fetch('https://api.cohere.ai/v1/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: imagePrompt.trim(),
          // Additional fields may be required depending on provider:
          // size: '1024x1024', n: 1, etc.
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(`Image API Error: ${resp.status} ${err?.message || ''}`);
      }

      const data = await resp.json();
      // Assuming data returns an array of image URLs or a single URL field
      const url = data?.images?.[0]?.url || data?.url;
      if (!url) throw new Error('No image URL returned');

      setGeneratedImageUrl(url);

      // Also drop a message in chat to show the result contextually
      setChatMessages(prev => ([
        ...prev,
        {
          id: Date.now() + 2,
          text: `I created an image for: "${imagePrompt.trim()}"`,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
      ]));
    } catch (e) {
      console.error(e);
      setImageError('Could not generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Link generation: produce a shareable link to the latest AI message (demo)
  const copyShareLinkForLastAI = async () => {
    const lastAI = [...chatMessages].reverse().find(m => m.sender === 'ai');
    if (!lastAI) {
      setIsCopyingLink(false);
      setLinkCopied(false);
      return;
    }
    setIsCopyingLink(true);
    try {
      // Demo link pattern; replace with your own route that can render a message by ID/token
      const link = `${window.location.origin}/share/message/${lastAI.id}`;
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
    } finally {
      setIsCopyingLink(false);
    }
  };

  return (
    <div 
      className="main-container"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        position: 'relative',
        padding: isMobile ? '1rem' : '2rem'
      }}
    >
      {/* Top-left Back Button to "/" */}
      <button
        onClick={() => { window.location.href = '/'; }}
        style={{
          position: 'fixed',
          top: isMobile ? '0.75rem' : '1rem',
          left: isMobile ? '0.75rem' : '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255,255,255,0.15)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.25)',
          padding: '0.6rem 0.9rem',
          borderRadius: '12px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          zIndex: 1100
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
        <span style={{ fontWeight: 600 }}>Back</span>
      </button>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        color: 'white'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            width: '100px',
            height: '40px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
          }}>
            <MessageCircle size={50} style={{ color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: isMobile ? '2.8rem' : '4rem',
            fontWeight: '800',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Meet Emma! 🤖✨
          </h1>
          <p style={{
            fontSize: isMobile ? '1.2rem' : '1.4rem',
            opacity: 0.95,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
            color: '#f8f9fa',
            fontWeight: '300'
          }}>
            Your friendly AI shopping assistant! I'm here to help make your ShopCart experience amazing! 😊🛍️
          </p>
        </div>

        {/* Action Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setShowChat(true)}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
              color: 'white',
              padding: isMobile ? '1.2rem 2.5rem' : '1.8rem 3.5rem',
              borderRadius: '60px',
              border: 'none',
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 15px 35px rgba(255, 107, 107, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              textTransform: 'none',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.08) translateY(-3px)';
              e.target.style.boxShadow = '0 20px 45px rgba(255, 107, 107, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 15px 35px rgba(255, 107, 107, 0.4)';
            }}
          >
            <MessageCircle size={28} />
            Chat with Emma! 💬
          </button>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2.5rem',
          marginTop: '5rem'
        }}>
          {[
            { title: 'Super Fast! ⚡', desc: 'Emma responds in seconds - no waiting around!', color: '#ffd93d' },
            { title: 'Always Friendly 😊', desc: 'Like chatting with your favorite store buddy!', color: '#ff6b6b' },
            { title: 'Really Helpful 🌟', desc: 'Emma knows everything about ShopCart!', color: '#4ecdc4' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(20px)',
              padding: '2.5rem',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h3 style={{
                fontSize: '1.4rem',
                marginBottom: '1rem',
                color: 'white',
                fontWeight: '700'
              }}>{feature.title}</h3>
              <p style={{
                opacity: 0.9,
                lineHeight: 1.6,
                color: '#f8f9fa',
                fontSize: '1rem',
                fontWeight: '300'
              }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Widget */}
      {showChat && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '1rem' : '2rem',
          right: isMobile ? '1rem' : '2rem',
          width: isMobile ? 'calc(100vw - 2rem)' : (chatMinimized ? '320px' : '420px'),
          height: isMobile ? 'calc(100vh - 2rem)' : (chatMinimized ? '70px' : '700px'),
          background: 'white',
          borderRadius: '25px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            padding: '1.2rem 1.8rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '25px 25px 0 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '45px',
                height: '45px',
                background: 'rgba(255, 255, 255, 0.25)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  Emma 🤖
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    background: '#4ade80',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
                  }} />
                  <span style={{
                    fontSize: '0.85rem',
                    opacity: 0.95,
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    Ready to help! 😊
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={clearChatHistory}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  fontSize: '0.9rem',
                  backdropFilter: 'blur(10px)'
                }}
                title="Clear Chat"
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
              >
                🗑️
              </button>
              {!isMobile && (
                <button
                  onClick={() => setChatMinimized(!chatMinimized)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                >
                  {chatMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
              )}
              <button
                onClick={() => setShowChat(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!chatMinimized && (
            <>
              {/* Chat Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                background: 'linear-gradient(135deg, #fafbfc, #f8f9fa)'
              }}>
                {chatMessages.length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '2.5rem 1.5rem',
                    color: '#495057'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      color: 'white',
                      boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)'
                    }}>
                      <Bot size={35} />
                    </div>
                    <h4 style={{
                      color: '#212529',
                      marginBottom: '0.8rem',
                      fontSize: '1.3rem',
                      fontWeight: '700'
                    }}>Hey there! I'm Emma! 👋</h4>
                    <p style={{
                      marginBottom: '1.2rem',
                      color: '#495057',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>I'm your friendly AI assistant and I'm super excited to help you with anything ShopCart related! 🛍️✨</p>
                    <p style={{
                      fontSize: '0.95rem',
                      color: '#6c757d',
                      lineHeight: 1.5
                    }}>
                      Ask me about orders 📦, payments 💳, shipping 🚚, returns 🔄, or anything else! I'm here to make your shopping experience amazing! 😊
                    </p>
                  </div>
                )}

                {chatMessages.map((message) => (
                  <div key={message.id} style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '0.8rem',
                      maxWidth: '85%',
                      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                    }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: message.sender === 'user'
                          ? 'linear-gradient(135deg, #667eea, #764ba2)'
                          : 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}>
                        {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                      </div>
                      <div style={{
                        padding: '1rem 1.3rem',
                        borderRadius: '20px',
                        background: message.sender === 'user'
                          ? 'linear-gradient(135deg, #667eea, #764ba2)'
                          : 'white',
                        color: message.sender === 'user' ? 'white' : '#212529',
                        wordWrap: 'break-word',
                        border: message.sender === 'ai' ? '1px solid #e9ecef' : 'none',
                        boxShadow: message.sender === 'ai'
                          ? '0 2px 10px rgba(0, 0, 0, 0.08)'
                          : '0 4px 15px rgba(102, 126, 234, 0.3)',
                        fontSize: '0.95rem',
                        lineHeight: 1.5
                      }}>
                        <p style={{
                          margin: 0,
                          fontWeight: '400',
                          color: message.sender === 'user' ? 'white' : '#212529'
                        }}>{message.text}</p>
                        <span style={{
                          fontSize: '0.75rem',
                          opacity: 0.7,
                          display: 'block',
                          marginTop: '0.5rem',
                          color: message.sender === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#6c757d'
                        }}>
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '0.8rem',
                      maxWidth: '85%'
                    }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}>
                        <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '1rem 1.3rem',
                        borderRadius: '20px',
                        border: '1px solid #e9ecef',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                      }}>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          {[0, 1, 2].map(i => (
                            <div key={i} style={{
                              width: '10px',
                              height: '10px',
                              background: '#ff6b6b',
                              borderRadius: '50%',
                              animation: `bounce 1.4s infinite ${i * 0.2}s`
                            }} />
                          ))}
                          <span style={{
                            marginLeft: '0.8rem',
                            fontSize: '0.9rem',
                            color: '#6c757d',
                            fontWeight: '500'
                          }}>
                            Emma is thinking... 💭
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input + Tools */}
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid #e9ecef',
                flexShrink: 0,
                background: 'white'
              }}>
                {/* Image generation toggle panel */}
                {showImageGen && (
                  <div style={{
                    background: '#fafbfc',
                    border: '1px solid #e9ecef',
                    borderRadius: '14px',
                    padding: '1rem',
                    marginBottom: '0.9rem'
                  }}>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <ImageIcon size={18} color="#ff6b6b" />
                      <strong style={{ color: '#212529' }}>Create an image</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <input
                        type="text"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Describe the image to create (e.g., cozy product photo, pastel background)"
                        style={{
                          flex: 1,
                          padding: '0.75rem 1rem',
                          border: '1px solid #e9ecef',
                          borderRadius: '10px',
                          outline: 'none',
                          background: 'white'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#ff6b6b';
                          e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <button
                        onClick={generateImage}
                        disabled={isGeneratingImage || !imagePrompt.trim()}
                        style={{
                          padding: '0.75rem 1rem',
                          background: (!imagePrompt.trim() || isGeneratingImage) ? '#dee2e6' : 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                          color: (!imagePrompt.trim() || isGeneratingImage) ? '#6c757d' : 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: (!imagePrompt.trim() || isGeneratingImage) ? 'not-allowed' : 'pointer',
                          boxShadow: (!imagePrompt.trim() || isGeneratingImage) ? 'none' : '0 4px 15px rgba(255, 107, 107, 0.3)'
                        }}
                      >
                        {isGeneratingImage ? 'Generating…' : 'Generate'}
                      </button>
                    </div>
                    {imageError && (
                      <p style={{ marginTop: '0.6rem', color: '#dc2626' }}>{imageError}</p>
                    )}
                    {generatedImageUrl && (
                      <div style={{ marginTop: '0.8rem' }}>
                        <img
                          src={generatedImageUrl}
                          alt="Generated"
                          style={{
                            width: '100%',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef',
                            objectFit: 'cover',
                            maxHeight: '300px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-end' }}>
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Emma anything! She's super friendly! 😊"
                    rows={1}
                    style={{
                      flex: 1,
                      padding: '1rem 1.3rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '25px',
                      resize: 'none',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      maxHeight: '120px',
                      minHeight: '50px',
                      backgroundColor: '#fafbfc',
                      color: '#212529',
                      lineHeight: 1.5
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#ff6b6b';
                      e.target.style.backgroundColor = 'white';
                      e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.backgroundColor = '#fafbfc';
                      e.target.style.boxShadow = 'none';
                    }}
                  />

                  <button
                    onClick={sendChatMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    style={{
                      width: '50px',
                      height: '50px',
                      background: (!currentMessage.trim() || isTyping)
                        ? '#dee2e6'
                        : 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                      color: (!currentMessage.trim() || isTyping) ? '#6c757d' : 'white',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: (!currentMessage.trim() || isTyping) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      boxShadow: (!currentMessage.trim() || isTyping)
                        ? 'none'
                        : '0 4px 15px rgba(255, 107, 107, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      if (!(!currentMessage.trim() || isTyping)) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = (!currentMessage.trim() || isTyping)
                        ? 'none'
                        : '0 4px 15px rgba(255, 107, 107, 0.3)';
                    }}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Enhanced CSS Animations with Main Page Scrollbar Hidden */}
      <style jsx>{`
        /* Hide main page scrollbar completely */
        html {
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        html::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
          width: 0px;
          background: transparent;
        }
        
        /* Hide scrollbar on main container */
        .main-container::-webkit-scrollbar {
          display: none;
        }
        
        .main-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HelpCenter;
