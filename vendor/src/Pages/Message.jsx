// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   Stack,
//   Divider,
//   Avatar,
//   Paper,
//   Chip,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import PersonIcon from '@mui/icons-material/Person';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import { VendorContext } from '../Context/Context';
// import axios from 'axios';

// const Messages = () => {
//   const { MessageSend, deleteMessage } = useContext(VendorContext);
//   const [messageText, setMessageText] = useState('');
//   const [messages, setMessages] = useState([]);

//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get('http://localhost:9000/vendor/messages', {
//         headers: {
//           'auth-token': localStorage.getItem('vendorToken'),
//         },
//       });
//       setMessages(res.data.messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const handleSend = async () => {
//     if (!messageText.trim()) return;

//     const res = await MessageSend({ message: messageText });
//     if (res?.success) {
//       setMessageText('');
//       fetchMessages();
//     }
//   };

//   const handleDelete = async (id) => {
//     const res = await deleteMessage(id);
//     if (res?.success) {
//       fetchMessages();
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         maxWidth: '800px',
//         mx: 'auto',
//       }}
//     >
//       {/* Chat Header */}
//       <Paper
//         elevation={2}
//         sx={{
//           p: 3,
//           borderRadius: 0,
//           bgcolor: '#1976d2',
//           color: 'white',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           💬 Messages  
//           (Chat with Admin)
//         </Typography>
//         <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
//           {messages?.length || 0} conversation{messages?.length !== 1 ? 's' : ''}
//         </Typography>
//       </Paper>

//       {/* Messages Container */}
//       <Box
//         sx={{
//           flex: 1,
//           overflow: 'auto',
//           p: 2,
//           backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
//           backgroundSize: '20px 20px',
//         }}
//       >
//         <Stack spacing={3}>
//           {messages?.length > 0 ? (
//             messages.map((msg) => (
//               <Box key={msg._id}>
//                 {/* User Message */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                     mb: 1,
//                     alignItems: 'flex-start',
//                     gap: 1,
//                   }}
//                 >
//                   <Box sx={{ maxWidth: '70%' }}>
//                     <Paper
//                       elevation={2}
//                       sx={{
//                         p: 2,
//                         bgcolor: '#1976d2',
//                         color: 'white',
//                         borderRadius: '20px 20px 4px 20px',
//                         position: 'relative',
//                       }}
//                     >
//                       <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
//                         {msg.message}
//                       </Typography>
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           alignItems: 'center',
//                           mt: 1,
//                         }}
//                       >
//                         <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
//                           {new Date(msg.date).toLocaleString()}
//                         </Typography>
//                         <IconButton
//                           size="small"
//                           onClick={() => handleDelete(msg._id)}
//                           sx={{
//                             color: 'white',
//                             opacity: 0.8,
//                             '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.1)' },
//                             ml: 1,
//                           }}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     </Paper>
//                   </Box>
//                   <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
//                     <PersonIcon fontSize="small" />
//                   </Avatar>
//                 </Box>

//                 {/* Response Message */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-start',
//                     alignItems: 'flex-start',
//                     gap: 1,
//                   }}
//                 >
//                   <Avatar sx={{ bgcolor: '#4caf50', width: 32, height: 32 }}>
//                     <SupportAgentIcon fontSize="small" />
//                   </Avatar>
//                   <Box sx={{ maxWidth: '70%' }}>
//                     <Paper
//                       elevation={2}
//                       sx={{
//                         p: 2,
//                         borderRadius: '20px 20px 20px 4px',
//                         border: '1px solid #e0e0e0',
//                       }}
//                     >
//                       {msg.response ? (
//                         <>
//                           <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
//                             {msg.response}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontSize: '0.75rem' }}>
//                             {new Date(msg.responseDate).toLocaleString()}
//                           </Typography>
//                         </>
//                       ) : (
//                         <>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                             <Chip
//                               label="Pending"
//                               size="small"
//                               sx={{
//                                 bgcolor: '#fff3e0',
//                                 color: '#f57c00',
//                                 fontSize: '0.7rem',
//                                 height: '20px',
//                               }}
//                             />
//                           </Box>
//                           <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
//                             No response yet
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontSize: '0.75rem' }}>
//                             {new Date(msg.date).toLocaleString()}
//                           </Typography>
//                         </>
//                       )}
//                     </Paper>
//                   </Box>
//                 </Box>
//               </Box>
//             ))
//           ) : (
//             <Box
//               sx={{
//                 textAlign: 'center',
//                 py: 8,
//               }}
//             >
//               <Typography variant="h6" sx={{ mb: 1, opacity: 0.7 }}>
//                 💭 No messages yet
//               </Typography>
//               <Typography variant="body2">
//                 Start a conversation by typing a message below
//               </Typography>
//             </Box>
//           )}
//         </Stack>
//       </Box>

//       {/* Message Input */}
//       <Paper
//         elevation={3}
//         sx={{
//           p: 2,
//           borderRadius: 0,
//           borderTop: '1px solid black',
//         }}
//       >
//         <Stack direction="row" spacing={2} alignItems="flex-end">
//           <TextField
//             fullWidth
//             multiline
//             maxRows={4}
//             placeholder="Type your message..."
//             variant="outlined"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             onKeyPress={handleKeyPress}
//             sx={{
//                 color: 'black',
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '25px',
//                 '&:hover': {
//                   bgcolor: 'black',
//                 },
//                 '&.Mui-focused': {
//                   bgcolor: 'black',
//                 },
//               },
//             }}
//           />
//           <Button
//             variant="contained"
//             onClick={handleSend}
//             disabled={!messageText.trim()}
//             sx={{
//               minWidth: 'auto',
//               borderRadius: '50%',
//               width: 56,
//               height: 56,
//               bgcolor: '#green',
//               '&:hover': {
//                 bgcolor: '#1565c0',
//               },
//               '&:disabled': {
//                 bgcolor: '#e0e0e0',
//               },
//             }}
//           >
//             <SendIcon />
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default Messages;
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  Stack,
  Divider,
  Avatar,
  Paper,
  Chip,
  Fade,
  Slide,
  useTheme,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Person as PersonIcon,
  SupportAgent as SupportAgentIcon,
  Message as MessageIcon,
  Store,
  LocalMall,
  CardGiftcard,
  ShoppingCart,
} from '@mui/icons-material';
import { VendorContext } from '../Context/Context';
import axios from 'axios';

const Messages = () => {
  const { MessageSend, deleteMessage } = useContext(VendorContext);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isHovered, setIsHovered] = useState({});

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Shopping icons for background animation (only in light mode)
  const shoppingIcons = [
    { Icon: ShoppingCart, delay: '0s', duration: '8s', x: '5%', y: '10%' },
    { Icon: Store, delay: '2s', duration: '10s', x: '90%', y: '15%' },
    { Icon: LocalMall, delay: '1s', duration: '12s', x: '15%', y: '75%' },
    { Icon: MessageIcon, delay: '3s', duration: '9s', x: '85%', y: '70%' },
    { Icon: CardGiftcard, delay: '4s', duration: '11s', x: '10%', y: '45%' },
    { Icon: SupportAgentIcon, delay: '5s', duration: '7s', x: '80%', y: '35%' },
  ];

  // Enhanced color scheme with better dark mode readability
  const themeColors = {
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    text: {
      primary: isDarkMode ? '#f3f4f6' : '#1f2937',
      secondary: isDarkMode ? '#d1d5db' : '#6b7280',
      accent: isDarkMode ? '#e5e7eb' : '#374151',
      onPrimary: '#ffffff',
      onSecondary: isDarkMode ? '#1f2937' : '#ffffff',
    },
    background: {
      primary: isDarkMode ? '#1f2937' : 'rgba(254, 252, 255, 0.95)',
      secondary: isDarkMode ? '#111827' : 'rgba(250, 249, 255, 0.95)',
      hover: isDarkMode ? '#374151' : 'rgba(139, 92, 246, 0.05)',
      userMessage: isDarkMode ? '#8b5cf6' : '#8b5cf6',
      adminMessage: isDarkMode ? '#374151' : 'rgba(255, 255, 255, 0.95)',
      input: isDarkMode ? '#374151' : 'rgba(255, 255, 255, 0.9)',
    },
    border: {
      default: isDarkMode ? '#4b5563' : '#a78bfa',
      hover: isDarkMode ? '#6b7280' : '#8b5cf6',
      input: isDarkMode ? '#6b7280' : '#a78bfa',
    },
    success: isDarkMode ? '#10b981' : '#10b981',
    warning: isDarkMode ? '#fbbf24' : '#f59e0b',
    error: isDarkMode ? '#ef4444' : '#ef4444',
    info: isDarkMode ? '#3b82f6' : '#3b82f6',
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:9000/vendor/messages', {
        headers: {
          'auth-token': localStorage.getItem('vendorToken'),
        },
      });
      setMessages(res.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!messageText.trim()) return;

    const res = await MessageSend({ message: messageText });
    if (res?.success) {
      setMessageText('');
      fetchMessages();
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteMessage(id);
    if (res?.success) {
      fetchMessages();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        height: 'calc(90vh - 40px)', // Reduced height to prevent scrollbar
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '900px',
        mx: 'auto',
        position: 'relative',
        my: 2, // Added margin for better spacing
        '&::before': !isDarkMode && {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
            linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
          `,
          zIndex: -2,
          pointerEvents: 'none',
        },
        '@keyframes floatUpDown': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(5deg)' },
          '50%': { transform: 'translateY(-30px) rotate(-3deg)' },
          '75%': { transform: 'translateY(-15px) rotate(8deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' }
        },
        '@keyframes floatLeftRight': {
          '0%': { transform: 'translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateX(20px) rotate(10deg)' },
          '66%': { transform: 'translateX(-10px) rotate(-5deg)' },
          '100%': { transform: 'translateX(0px) rotate(0deg)' }
        },
        '@keyframes pulse': {
          '0%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.1)' },
          '100%': { opacity: 0.3, transform: 'scale(1)' }
        }
      }}
    >
      {/* Animated Background Icons (only in light mode) */}
      {!isDarkMode && shoppingIcons.map((item, index) => {
        const animationType = index % 3 === 0 ? 'floatUpDown' : 
                            index % 3 === 1 ? 'floatLeftRight' : 'pulse';
        
        return (
          <item.Icon
            key={index}
            sx={{
              position: 'fixed',
              left: item.x,
              top: item.y,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: 'rgba(139, 92, 246, 0.08)',
              animation: `${animationType} ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
              zIndex: -1,
              pointerEvents: 'none',
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}

      {/* Chat Header - More Compact */}
      <Slide direction="down" in={true} timeout={800}>
        <Card
          onMouseEnter={() => setIsHovered(prev => ({ ...prev, header: true }))}
          onMouseLeave={() => setIsHovered(prev => ({ ...prev, header: false }))}
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
            backdropFilter: 'blur(10px)',
            border: `2px solid ${isHovered.header ? themeColors.border.hover : themeColors.border.default}`,
            overflow: 'hidden',
            position: 'relative',
            transform: isHovered.header ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: isHovered.header 
              ? isDarkMode
                ? '0 10px 30px rgba(31, 41, 55, 0.6)'
                : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
              : isDarkMode
                ? '0 4px 15px rgba(0, 0, 0, 0.3)'
                : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
            backgroundImage: !isDarkMode && `
              radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
              radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
              radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
            `,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
              animation: 'shimmer 2s ease-in-out infinite',
            },
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 2.5 }}> {/* Reduced padding */}
            <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={1}>
              <Avatar
                sx={{
                  bgcolor: `${themeColors.primary}15`,
                  width: 45, // Slightly smaller
                  height: 45,
                  border: `2px solid ${themeColors.primary}30`,
                  animation: 'bounce 2s ease-in-out infinite',
                  '@keyframes bounce': {
                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-5px)' },
                    '60%': { transform: 'translateY(-3px)' }
                  }
                }}
              >
                <MessageIcon sx={{ fontSize: 22, color: themeColors.primary }} />
              </Avatar>
              <Typography 
                variant="h5" // Smaller heading
                fontWeight="700"
                sx={{
                  color: themeColors.text.primary,
                  background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                  backgroundClip: !isDarkMode && 'text',
                  textFillColor: !isDarkMode && 'transparent',
                  WebkitBackgroundClip: !isDarkMode && 'text',
                  WebkitTextFillColor: !isDarkMode && 'transparent',
                }}
              >
                Messages
              </Typography>
            </Box>
            <Typography 
              variant="body2" // Smaller subtitle
              sx={{ 
                color: themeColors.text.secondary,
                fontWeight: 500,
                mb: 1
              }}
            >
              Chat with Admin
            </Typography>
            <Chip
              label={`${messages?.length || 0} conversation${messages?.length !== 1 ? 's' : ''}`}
              size="small"
              sx={{
                bgcolor: `${themeColors.primary}15`,
                color: themeColors.primary,
                fontWeight: 600,
                border: `1px solid ${themeColors.primary}30`,
              }}
            />
          </CardContent>
        </Card>
      </Slide>

      {/* Messages Container - Adjusted height */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2, // Reduced padding
          backgroundImage: isDarkMode 
            ? 'none'
            : 'radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.1) 1px, transparent 0)',
          backgroundSize: '30px 30px',
          // Custom scrollbar
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: isDarkMode ? '#374151' : '#f1f5f9',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: themeColors.primary,
            borderRadius: '4px',
            '&:hover': {
              background: themeColors.primaryDark,
            },
          },
        }}
      >
        <Stack spacing={3}>
          {messages?.length > 0 ? (
            messages.map((msg, index) => (
              <Fade in={true} timeout={600} style={{ transitionDelay: `${index * 100}ms` }} key={msg._id}>
                <Box>
                  {/* User Message */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      mb: 2,
                      alignItems: 'flex-start',
                      gap: 2,
                    }}
                  >
                    <Box sx={{ maxWidth: '75%' }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5, // Slightly smaller padding
                          background: `linear-gradient(135deg, ${themeColors.background.userMessage} 0%, ${themeColors.primaryDark} 100%)`,
                          color: themeColors.text.onPrimary,
                          borderRadius: '20px 20px 6px 20px',
                          position: 'relative',
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${themeColors.primary}40`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${themeColors.primary}40`,
                          }
                        }}
                      >
                        <Typography variant="body1" sx={{ wordBreak: 'break-word', mb: 1.5 }}>
                          {msg.message}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                            {new Date(msg.date).toLocaleString()}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(msg._id)}
                            sx={{
                              color: themeColors.text.onPrimary,
                              opacity: 0.8,
                              transition: 'all 0.3s ease',
                              '&:hover': { 
                                opacity: 1, 
                                bgcolor: 'rgba(255,255,255,0.2)',
                                transform: 'scale(1.1)'
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    </Box>
                    <Avatar 
                      sx={{ 
                        bgcolor: themeColors.primary, 
                        width: 36, // Smaller avatar
                        height: 36,
                        border: `2px solid ${themeColors.primary}30`,
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.05)' }
                        }
                      }}
                    >
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  </Box>

                  {/* Admin Response - Enhanced for dark mode */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 2,
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: themeColors.success, 
                        width: 36,
                        height: 36,
                        border: `2px solid ${themeColors.success}30`,
                        animation: 'pulse 2s ease-in-out infinite',
                      }}
                    >
                      <SupportAgentIcon fontSize="small" />
                    </Avatar>
                    <Box sx={{ maxWidth: '75%' }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: '20px 20px 20px 6px',
                          background: isDarkMode 
                            ? `linear-gradient(135deg, ${themeColors.background.adminMessage} 0%, #4b5563 100%)`
                            : `linear-gradient(135deg, ${themeColors.background.adminMessage} 0%, rgba(255, 255, 255, 0.8) 100%)`,
                          backdropFilter: 'blur(10px)',
                          border: `2px solid ${themeColors.border.default}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: isDarkMode 
                              ? '0 8px 25px rgba(75, 85, 99, 0.6)'
                              : '0 8px 25px rgba(139, 92, 246, 0.15)',
                          }
                        }}
                      >
                        {msg.response ? (
                          <>
                            <Typography variant="body1" sx={{ 
                              wordBreak: 'break-word', 
                              color: themeColors.text.primary,
                              mb: 1.5,
                              fontWeight: 500 // Better readability
                            }}>
                              {msg.response}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              fontSize: '0.75rem' 
                            }}>
                              {new Date(msg.responseDate).toLocaleString()}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                              <Chip
                                label="Pending"
                                size="small"
                                sx={{
                                  bgcolor: `${themeColors.warning}20`,
                                  color: themeColors.warning,
                                  fontSize: '0.7rem',
                                  height: '22px',
                                  fontWeight: 600,
                                  border: `1px solid ${themeColors.warning}40`,
                                }}
                              />
                            </Box>
                            <Typography variant="body2" sx={{ 
                              color: themeColors.text.secondary, 
                              fontStyle: 'italic',
                              mb: 1,
                              fontWeight: 500 // Better readability
                            }}>
                              Waiting for admin response...
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              fontSize: '0.75rem' 
                            }}>
                              {new Date(msg.date).toLocaleString()}
                            </Typography>
                          </>
                        )}
                      </Paper>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            ))
          ) : (
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 6, // Reduced padding
                }}
              >
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: `${themeColors.primary}15`,
                    color: themeColors.primary,
                    mx: 'auto',
                    mb: 2,
                    border: `2px solid ${themeColors.primary}30`,
                  }}
                >
                  <MessageIcon sx={{ fontSize: 35 }} />
                </Avatar>
                <Typography variant="h6" sx={{ 
                  mb: 1, 
                  color: themeColors.text.primary,
                  fontWeight: 600 
                }}>
                  No messages yet
                </Typography>
                <Typography variant="body1" sx={{ color: themeColors.text.secondary }}>
                  Start a conversation by typing a message below
                </Typography>
              </Box>
            </Fade>
          )}
        </Stack>
      </Box>

      {/* Message Input - Fixed height and improved styling */}
      <Slide direction="up" in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
        <Paper
          elevation={0}
          sx={{
            p: 2, // Reduced padding
            borderRadius: 0,
            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
            backdropFilter: 'blur(10px)',
            borderTop: `2px solid ${themeColors.border.default}`,
            backgroundImage: !isDarkMode && `
              radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
              radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
            `,
            minHeight: '80px', // Fixed minimum height
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
            <TextField
              fullWidth
              multiline
              maxRows={3} // Reduced max rows
              placeholder="Type your message..."
              variant="outlined"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px', // Slightly reduced border radius
                  backgroundColor: themeColors.background.input,
                  transition: 'all 0.3s ease-in-out',
                  '& fieldset': {
                    borderColor: themeColors.border.input,
                    borderWidth: '2px',
                  },
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#4b5563' : 'rgba(255, 255, 255, 1)',
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 15px ${themeColors.primary}20`,
                    '& fieldset': {
                      borderColor: themeColors.border.hover,
                    },
                  },
                  '&.Mui-focused': {
                    backgroundColor: isDarkMode ? '#4b5563' : 'rgba(255, 255, 255, 1)',
                    transform: 'translateY(-1px)',
                    boxShadow: `0 6px 20px ${themeColors.primary}30`,
                    '& fieldset': {
                      borderColor: themeColors.primary,
                      borderWidth: '2px',
                    },
                  },
                  '& input, & textarea': {
                    color: themeColors.text.primary,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    '&::placeholder': {
                      color: themeColors.text.secondary,
                      opacity: 0.8,
                    },
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!messageText.trim()}
              sx={{
                minWidth: 'auto',
                borderRadius: '50%',
                width: 56, // Slightly smaller
                height: 56,
                bgcolor: themeColors.primary,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: `0 4px 15px ${themeColors.primary}40`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transition: 'left 0.6s',
                },
                '&:hover': {
                  bgcolor: themeColors.primaryDark,
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: `0 8px 25px ${themeColors.primaryDark}60`,
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(0) scale(0.95)',
                },
                '&:disabled': {
                  bgcolor: themeColors.text.secondary,
                  color: 'rgba(255, 255, 255, 0.5)',
                  transform: 'none',
                  boxShadow: 'none',
                },
              }}
            >
              <SendIcon sx={{ fontSize: 22 }} />
            </Button>
          </Stack>
        </Paper>
      </Slide>
    </Box>
  );
};

export default Messages;
