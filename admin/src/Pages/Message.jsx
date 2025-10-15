// import React, { useState, useEffect } from 'react';
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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   CircularProgress,
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import ReplyIcon from '@mui/icons-material/Reply';
// import PersonIcon from '@mui/icons-material/Person';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingIcon from '@mui/icons-material/Pending';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Message = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [replyDialog, setReplyDialog] = useState({ open: false, messageId: '', currentMessage: '' });
//   const [replyText, setReplyText] = useState('');
//   const [sending, setSending] = useState(false);
//   const {vendorId}=useParams();

//   const fetchVendorMessages = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:9000/admin/vendor-messages/${vendorId}`, {
//         headers: {
//           'auth-token': localStorage.getItem('adminToken'),
//         },
//       });
      
//       if (res.data.success) {
//         setMessages(res.data.messages);
//         setError('');
//       }
//     } catch (error) {
//       console.error('Error fetching vendor messages:', error);
//       setError('There will be no messages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (vendorId) {
//       fetchVendorMessages();
//     }
//   }, [vendorId]);

//   const handleReplyClick = (messageId, message) => {
//     setReplyDialog({
//       open: true,
//       messageId,
//       currentMessage: message
//     });
//     setReplyText('');
//   };

//   const handleSendReply = async () => {
//     if (!replyText.trim()) return;

//     try {
//       setSending(true);
//       const res = await axios.put(
//         `http://localhost:9000/admin/reply/${replyDialog.messageId}`,
//         { response: replyText },
//         {
//           headers: {
//             'auth-token': localStorage.getItem('adminToken'),
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (res.data.success) {
//         setReplyDialog({ open: false, messageId: '', currentMessage: '' });
//         setReplyText('');
//         fetchVendorMessages(); // Refresh messages
//       }
//     } catch (error) {
//       console.error('Error sending reply:', error);
//       setError('Failed to send reply');
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleCloseDialog = () => {
//     setReplyDialog({ open: false, messageId: '', currentMessage: '' });
//     setReplyText('');
//   };

//   const pendingMessages = messages.filter(msg => !msg.response);
//   const repliedMessages = messages.filter(msg => msg.response);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         maxWidth: '900px',
//         mx: 'auto',
//       }}
//     >
//       {/* Header */}
//       <Paper
//         elevation={2}
//         sx={{
//           p: 3,
//           borderRadius: 0,
//           bgcolor: '#2e7d32',
//           color: 'white',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           🛠️ Admin - Vendor Messages
//         </Typography>
//         <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
//           {messages.length} total messages • {pendingMessages.length} pending • {repliedMessages.length} replied
//         </Typography>
//       </Paper>

//       {error && (
//         <Alert severity="error" sx={{ m: 2 }}>
//           {error}
//         </Alert>
//       )}

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
//                 {/* Vendor Message */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-start',
//                     mb: 1,
//                     alignItems: 'flex-start',
//                     gap: 1,
//                   }}
//                 >
//                   <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
//                     <PersonIcon fontSize="small" />
//                   </Avatar>
//                   <Box sx={{ maxWidth: '70%' }}>
//                     <Paper
//                       elevation={2}
//                       sx={{
//                         p: 2,
//                         border: '1px solid #e0e0e0',
//                         borderRadius: '20px 20px 20px 4px',
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
//                           bgcolor: 'transparent',
//                         }}
//                       >
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
//                           {new Date(msg.date).toLocaleString()}
//                         </Typography>
//                         {!msg.response && (
//                           <Button
//                             size="small"
//                             variant="contained"
//                             color="success"
//                             startIcon={<ReplyIcon />}
//                             onClick={() => handleReplyClick(msg._id, msg.message)}
//                             sx={{
//                               ml: 1,
//                               borderRadius: '20px',
//                               textTransform: 'none',
//                               fontSize: '0.75rem',
//                             }}
//                           >
//                             Reply
//                           </Button>
//                         )}
//                       </Box>
//                     </Paper>
//                   </Box>
//                 </Box>

//                 {/* Admin Response */}
//                 {msg.response && (
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'flex-end',
//                       alignItems: 'flex-start',
//                       gap: 1,
//                       mt: 1,
//                     }}
//                   >
//                     <Box sx={{ maxWidth: '70%' }}>
//                       <Paper
//                         elevation={2}
//                         sx={{
//                           p: 2,
//                           bgcolor: '#2e7d32',
//                           color: 'white',
//                           borderRadius: '20px 20px 4px 20px',
//                         }}
//                       >
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                           <CheckCircleIcon fontSize="small" sx={{ opacity: 0.8 }} />
//                           <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
//                             Admin Reply
//                           </Typography>
//                         </Box>
//                         <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
//                           {msg.response}
//                         </Typography>
//                         <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.75rem', mt: 1, display: 'block' }}>
//                           {new Date(msg.responseDate).toLocaleString()}
//                         </Typography>
//                       </Paper>
//                     </Box>
//                     <Avatar sx={{ bgcolor: '#2e7d32', width: 32, height: 32 }}>
//                       <AdminPanelSettingsIcon fontSize="small" />
//                     </Avatar>
//                   </Box>
//                 )}

//                 {/* Pending Status */}
//                 {!msg.response && (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
//                     <Chip
//                       icon={<PendingIcon />}
//                       label="Awaiting Admin Reply"
//                       size="small"
//                       sx={{
//                         bgcolor: '#fff3e0',
//                         color: '#f57c00',
//                         fontSize: '0.7rem',
//                         border: '1px solid #ffcc02',
//                       }}
//                     />
//                   </Box>
//                 )}
//               </Box>
//             ))
//           ) : (
//             <Box
//               sx={{
//                 textAlign: 'center',
//                 py: 8,
//                 color: 'text.secondary',
//               }}
//             >
//               <Typography variant="h6" sx={{ mb: 1, opacity: 0.7 }}>
//                 📭 No messages from this vendor
//               </Typography>
//               <Typography variant="body2">
//                 Messages will appear here when the vendor sends them
//               </Typography>
//             </Box>
//           )}
//         </Stack>
//       </Box>

//       {/* Reply Dialog */}
//       <Dialog
//         open={replyDialog.open}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: { borderRadius: 3 }
//         }}
//       >
//         <DialogTitle sx={{ bgcolor: '#2e7d32', color: 'white', pb: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <ReplyIcon />
//             <Typography variant="h6">Reply to Vendor Message</Typography>
//           </Box>
//         </DialogTitle>
        
//         <DialogContent sx={{ pt: 3 }}>
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Original Message:
//             </Typography>
//             <Paper sx={{ p: 2, borderLeft: '4px solid #1976d2' }}>
//               <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
//                 "{replyDialog.currentMessage}"
//               </Typography>
//             </Paper>
//           </Box>
          
//           <TextField
//             autoFocus
//             multiline
//             rows={4}
//             fullWidth
//             label="Your Reply"
//             placeholder="Type your reply to the vendor..."
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             variant="outlined"
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 2,
//               },
//             }}
//           />
//         </DialogContent>
        
//         <DialogActions sx={{ p: 3, gap: 1 }}>
//           <Button 
//             onClick={handleCloseDialog}
//             variant="outlined"
//             sx={{ borderRadius: 2 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSendReply}
//             variant="contained"
//             color="success"
//             disabled={!replyText.trim() || sending}
//             startIcon={sending ? <CircularProgress size={20} /> : <SendIcon />}
//             sx={{ borderRadius: 2 }}
//           >
//             {sending ? 'Sending...' : 'Send Reply'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Message;



import React, { useState, useEffect, useMemo } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  useTheme,
  Skeleton,
  Fade,
  Slide,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ChatIcon from '@mui/icons-material/Chat';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Tokens function for theme colors
const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        gray: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#4d4d4d",
          700: "#333333",
          800: "#1a1a1a",
          900: "#0f0f0f",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        gray: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyDialog, setReplyDialog] = useState({ open: false, messageId: '', currentMessage: '' });
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const { vendorId } = useParams();
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === 'dark';

  // UPDATED: Enhanced Purple Color Scheme with better dark mode support
  const themeColors = useMemo(() => ({
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    text: {
      primary: isDarkMode ? colors.gray[100] : '#1f2937', // FIXED: Better contrast
      secondary: isDarkMode ? colors.gray[200] : '#6b7280', // FIXED: Lighter in dark mode
      accent: isDarkMode ? colors.gray[100] : '#374151', // FIXED: More visible
    },
    background: {
      primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
      secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
      hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
      chat: isDarkMode ? colors.primary[300] : 'rgba(248, 247, 255, 0.8)', // FIXED: Better contrast
      message: isDarkMode ? colors.primary[200] : 'rgba(255, 255, 255, 0.9)', // NEW: Message background
    },
    border: {
      default: isDarkMode ? colors.primary[600] : '#a78bfa',
      hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
    },
    success: isDarkMode ? colors.greenAccent[500] : '#10b981',
    warning: isDarkMode ? '#fbbf24' : '#f59e0b',
    error: isDarkMode ? colors.redAccent[500] : '#ef4444',
    info: isDarkMode ? colors.blueAccent[500] : '#3b82f6',
  }), [isDarkMode, colors]);

  // ... (keep all the existing functions: fetchVendorMessages, handleReplyClick, handleSendReply, handleCloseDialog)
  const fetchVendorMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:9000/admin/vendor-messages/${vendorId}`, {
        headers: {
          'auth-token': localStorage.getItem('adminToken'),
        },
      });
      
      if (res.data.success) {
        setMessages(res.data.messages);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching vendor messages:', error);
      setError('There will be no messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchVendorMessages();
    }
  }, [vendorId]);

  const handleReplyClick = (messageId, message) => {
    setReplyDialog({
      open: true,
      messageId,
      currentMessage: message
    });
    setReplyText('');
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    try {
      setSending(true);
      const res = await axios.put(
        `http://localhost:9000/admin/reply/${replyDialog.messageId}`,
        { response: replyText },
        {
          headers: {
            'auth-token': localStorage.getItem('adminToken'),
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setReplyDialog({ open: false, messageId: '', currentMessage: '' });
        setReplyText('');
        fetchVendorMessages(); // Refresh messages
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      setError('Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  const handleCloseDialog = () => {
    setReplyDialog({ open: false, messageId: '', currentMessage: '' });
    setReplyText('');
  };

  const pendingMessages = messages.filter(msg => !msg.response);
  const repliedMessages = messages.filter(msg => msg.response);

  if (loading) {
    return (
      <Box 
        sx={{ 
          height: '100vh',
          position: 'relative',
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
          }
        }}
      >
        <Slide direction="down" in={true} timeout={800}>
          <Box>
            <Skeleton 
              variant="rectangular" 
              height={100} 
              sx={{ 
                bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
                mb: 2
              }} 
            />
            <Box sx={{ p: 2 }}>
              {[1, 2, 3].map((item) => (
                <Skeleton 
                  key={item}
                  variant="rectangular" 
                  height={80} 
                  sx={{ 
                    borderRadius: 3,
                    bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
                    mb: 2
                  }} 
                />
              ))}
            </Box>
          </Box>
        </Slide>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '900px',
        mx: 'auto',
        position: 'relative',
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
        '& *': {
          scrollbarWidth: 'none !important',
          msOverflowStyle: 'none !important',
          '&::-webkit-scrollbar': {
            display: 'none !important',
          },
        },
      }}
    >
      {/* Header - same as before */}
      <Slide direction="down" in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 0,
            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
            backdropFilter: 'blur(10px)',
            border: `2px solid ${themeColors.border.default}`,
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDarkMode
              ? `0 10px 30px ${colors.primary[900]}40`
              : '0 10px 30px rgba(139, 92, 246, 0.15), 0 5px 15px rgba(139, 92, 246, 0.1)',
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
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
            <Avatar
              sx={{
                bgcolor: `${themeColors.primary}15`,
                width: 48,
                height: 48,
                border: `2px solid ${themeColors.primary}30`,
              }}
            >
              <ChatIcon sx={{ color: themeColors.primary, fontSize: 24 }} />
            </Avatar>
            <Typography 
              variant="h4" 
              fontWeight="bold"
              sx={{
                color: themeColors.text.primary, // FIXED: Always visible
                background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                backgroundClip: !isDarkMode && 'text',
                textFillColor: !isDarkMode && 'transparent',
                WebkitBackgroundClip: !isDarkMode && 'text',
                WebkitTextFillColor: !isDarkMode && 'transparent',
              }}
            >
              Admin - Vendor Messages
            </Typography>
          </Box>
          
          {/* Stats Row */}
          <Box 
            display="flex" 
            gap={3} 
            justifyContent="center"
            sx={{
              flexWrap: 'wrap',
              '& > *': {
                minWidth: '120px'
              }
            }}
          >
            <Chip
              icon={<MessageIcon fontSize="small" />}
              label={`Total: ${messages.length}`}
              sx={{
                bgcolor: `${themeColors.primary}15`,
                color: themeColors.text.primary,
                border: `1px solid ${themeColors.border.default}`,
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: themeColors.primary
                }
              }}
            />
            <Chip
              icon={<PendingIcon fontSize="small" />}
              label={`Pending: ${pendingMessages.length}`}
              sx={{
                bgcolor: `${themeColors.warning}15`,
                color: themeColors.text.primary,
                border: `1px solid ${themeColors.warning}30`,
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: themeColors.warning
                }
              }}
            />
            <Chip
              icon={<CheckCircleIcon fontSize="small" />}
              label={`Replied: ${repliedMessages.length}`}
              sx={{
                bgcolor: `${themeColors.success}15`,
                color: themeColors.text.primary,
                border: `1px solid ${themeColors.success}30`,
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: themeColors.success
                }
              }}
            />
          </Box>
        </Paper>
      </Slide>

      {error && (
        <Fade in={true} timeout={500}>
          <Alert 
            severity="error" 
            sx={{ 
              m: 2,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${themeColors.error}30`,
              color: themeColors.text.primary,
              '& .MuiAlert-icon': {
                color: themeColors.error
              },
            }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* UPDATED: Enhanced Messages Container with better dark mode text visibility */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          background: isDarkMode 
            ? 'transparent'
            : `
              radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.3) 0%, transparent 20%),
              radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.2) 0%, transparent 20%)
            `,
        }}
      >
        <Stack spacing={3}>
          {messages?.length > 0 ? (
            messages.map((msg, index) => (
              <Fade key={msg._id} in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <Box>
                  {/* UPDATED: Vendor Message with better dark mode visibility */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      mb: 1,
                      alignItems: 'flex-start',
                      gap: 1,
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: `${themeColors.info}15`, 
                      width: 36, 
                      height: 36,
                      border: `2px solid ${themeColors.info}30`
                    }}>
                      <PersonIcon fontSize="small" sx={{ color: themeColors.info }} />
                    </Avatar>
                    <Box sx={{ maxWidth: '70%' }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          background: isDarkMode 
                            ? `linear-gradient(135deg, ${colors.primary[200]} 0%, ${colors.primary[300]} 100%)` // FIXED: Better dark mode background
                            : `linear-gradient(135deg, ${themeColors.background.message} 0%, rgba(255,255,255,0.95) 100%)`,
                          backdropFilter: 'blur(10px)',
                          border: `2px solid ${themeColors.border.default}30`,
                          borderRadius: '20px 20px 20px 4px',
                          position: 'relative',
                          boxShadow: isDarkMode
                            ? `0 10px 30px ${colors.primary[900]}20`
                            : '0 10px 30px rgba(139, 92, 246, 0.1)',
                          backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.4) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.3) 0%, transparent 20%)
                          `,
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            wordBreak: 'break-word',
                            color: isDarkMode ? colors.gray[900] : themeColors.text.primary, // FIXED: Dark text on light background in dark mode
                            lineHeight: 1.6,
                            fontWeight: 500 // FIXED: Better readability
                          }}
                        >
                          {msg.message}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                            pt: 1,
                            borderTop: isDarkMode 
                              ? `1px solid ${colors.gray[700]}` // FIXED: Visible border in dark mode
                              : `1px solid ${themeColors.border.default}20`
                          }}
                        >
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontSize: '0.75rem',
                              color: isDarkMode ? colors.gray[800] : themeColors.text.secondary, // FIXED: Better contrast
                              fontWeight: 600
                            }}
                          >
                            {new Date(msg.date).toLocaleString()}
                          </Typography>
                          {!msg.response && (
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<ReplyIcon />}
                              onClick={() => handleReplyClick(msg._id, msg.message)}
                              sx={{
                                ml: 1,
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontSize: '0.75rem',
                                bgcolor: themeColors.success,
                                color: 'white',
                                '&:hover': {
                                  bgcolor: themeColors.success,
                                  transform: 'scale(1.05)',
                                  boxShadow: `0 8px 25px ${themeColors.success}40`
                                },
                                transition: 'all 0.3s ease'
                              }}
                            >
                              Reply
                            </Button>
                          )}
                        </Box>
                      </Paper>
                    </Box>
                  </Box>

                  {/* Admin Response - enhanced for dark mode */}
                  {msg.response && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Box sx={{ maxWidth: '70%' }}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                            color: 'white',
                            borderRadius: '20px 20px 4px 20px',
                            boxShadow: `0 10px 30px ${themeColors.primary}30`,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <CheckCircleIcon fontSize="small" sx={{ opacity: 0.9 }} />
                            <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.7rem' }}>
                              Admin Reply
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              wordBreak: 'break-word',
                              lineHeight: 1.6,
                              fontWeight: 500,
                              color: 'white' // FIXED: Always white on purple background
                            }}
                          >
                            {msg.response}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              opacity: 0.9, 
                              fontSize: '0.75rem', 
                              mt: 2, 
                              display: 'block',
                              pt: 1,
                              borderTop: '1px solid rgba(255,255,255,0.2)',
                              fontWeight: 600,
                              color: 'white' // FIXED: Always white
                            }}
                          >
                            {new Date(msg.responseDate).toLocaleString()}
                          </Typography>
                        </Paper>
                      </Box>
                      <Avatar sx={{ 
                        bgcolor: `${themeColors.primary}15`, 
                        width: 36, 
                        height: 36,
                        border: `2px solid ${themeColors.primary}30`
                      }}>
                        <AdminPanelSettingsIcon fontSize="small" sx={{ color: themeColors.primary }} />
                      </Avatar>
                    </Box>
                  )}

                  {/* Enhanced Pending Status */}
                  {!msg.response && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Chip
                        icon={<PendingIcon />}
                        label="Awaiting Admin Reply"
                        size="small"
                        sx={{
                          bgcolor: `${themeColors.warning}15`,
                          color: themeColors.warning,
                          fontSize: '0.7rem',
                          border: `1px solid ${themeColors.warning}30`,
                          fontWeight: 600,
                          animation: 'pulse 2s ease-in-out infinite',
                          '@keyframes pulse': {
                            '0%': { opacity: 1 },
                            '50%': { opacity: 0.7 },
                            '100%': { opacity: 1 }
                          }
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Fade>
            ))
          ) : (
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${themeColors.border.default}`,
                  borderRadius: 4,
                  boxShadow: isDarkMode
                    ? `0 10px 30px ${colors.primary[900]}40`
                    : '0 10px 30px rgba(139, 92, 246, 0.1)',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: `${themeColors.primary}15`,
                    width: 64,
                    height: 64,
                    margin: '0 auto 16px',
                    border: `2px solid ${themeColors.primary}30`,
                  }}
                >
                  <MessageIcon sx={{ color: themeColors.primary, fontSize: 32 }} />
                </Avatar>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1, 
                    color: themeColors.text.primary, // FIXED: Always visible
                    fontWeight: 600
                  }}
                >
                  📭 No messages from this vendor
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ color: themeColors.text.secondary }} // FIXED: Always visible
                >
                  Messages will appear here when the vendor sends them
                </Typography>
              </Box>
            </Fade>
          )}
        </Stack>
      </Box>

      {/* UPDATED: Enhanced Reply Dialog with better styling */}
      <Dialog
        open={replyDialog.open}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 4,
            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `2px solid ${themeColors.border.default}`,
            boxShadow: isDarkMode
              ? `0 25px 50px ${colors.primary[900]}60`
              : '0 25px 50px rgba(139, 92, 246, 0.25)',
            minHeight: '500px',
            overflow: 'hidden',
            position: 'relative',
            '&::before': !isDarkMode && {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.4) 0%, transparent 30%),
                radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.3) 0%, transparent 30%)
              `,
              pointerEvents: 'none',
            }
          }
        }}
      >
        {/* Enhanced Dialog Title */}
        <DialogTitle 
          sx={{ 
            background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
            color: 'white', 
            pb: 3,
            pt: 3,
            borderRadius: 0,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${themeColors.primaryDark}, ${themeColors.primaryLight})`,
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  width: 40,
                  height: 40,
                }}
              >
                <ReplyIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Reply to Vendor Message
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Send your response to the vendor inquiry
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 4, pb: 2, position: 'relative', zIndex: 1 }}>
          {/* Original Message Display */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: themeColors.text.primary,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2
              }}
            >
              <MessageIcon sx={{ color: themeColors.info }} />
              Original Message:
            </Typography>
            <Paper 
              sx={{ 
                p: 4, 
                borderLeft: `6px solid ${themeColors.info}`,
                background: isDarkMode 
                  ? `linear-gradient(135deg, ${colors.primary[200]} 0%, ${colors.primary[300]} 100%)`
                  : `linear-gradient(135deg, ${themeColors.background.message} 0%, rgba(255,255,255,0.95) 100%)`,
                backdropFilter: 'blur(10px)',
                border: `2px solid ${themeColors.border.default}30`,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': !isDarkMode && {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${themeColors.info}10 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  fontStyle: 'italic',
                  color: isDarkMode ? colors.gray[900] : themeColors.text.primary, // FIXED: Dark text in dark mode
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                "{replyDialog.currentMessage}"
              </Typography>
            </Paper>
          </Box>
          
          {/* Enhanced Reply TextField */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: themeColors.text.primary,
                fontWeight: 700,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <SendIcon sx={{ color: themeColors.success }} />
              Your Reply:
            </Typography>
            <TextField
              autoFocus
              multiline
              rows={6}
              fullWidth
              label="Type your reply to the vendor..."
              placeholder="Write a helpful and professional response to address the vendor's inquiry..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: isDarkMode 
                    ? `${colors.primary[100]}` // FIXED: Light background in dark mode
                    : 'rgba(255, 255, 255, 0.9)',
                  border: `3px solid ${themeColors.border.default}`,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: themeColors.border.hover,
                    boxShadow: `0 0 0 2px ${themeColors.primary}20`,
                  },
                  '&.Mui-focused': {
                    borderColor: themeColors.primary,
                    boxShadow: `0 0 0 4px ${themeColors.primary}20`,
                    backgroundColor: isDarkMode 
                      ? colors.primary[100] // FIXED: Keep light background when focused
                      : 'rgba(255, 255, 255, 1)',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: isDarkMode ? colors.gray[700] : themeColors.text.secondary, // FIXED: Visible label
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: themeColors.primary,
                  }
                },
                '& .MuiOutlinedInput-input': {
                  color: isDarkMode ? colors.gray[900] : themeColors.text.primary, // FIXED: Dark text for better contrast
                  lineHeight: 1.6,
                  '&::placeholder': {
                    color: isDarkMode ? colors.gray[600] : themeColors.text.secondary, // FIXED: Visible placeholder
                    opacity: 1
                  }
                }
              }}
            />
            
            {/* Character Counter */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: themeColors.text.secondary,
                  fontWeight: 500
                }}
              >
                💡 Tip: Be clear, helpful, and professional in your response
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: replyText.length > 500 ? themeColors.warning : themeColors.text.secondary,
                  fontWeight: 600
                }}
              >
                {replyText.length} characters
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        {/* Enhanced Dialog Actions */}
        <DialogActions sx={{ p: 4, gap: 2, backgroundColor: `${themeColors.background.hover}`, borderRadius: '0 0 16px 16px' }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            size="large"
            sx={{ 
              borderRadius: 3,
              borderColor: themeColors.border.default,
              color: themeColors.text.primary,
              borderWidth: '2px',
              px: 3,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                borderColor: themeColors.border.hover,
                backgroundColor: themeColors.background.hover,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${themeColors.primary}20`
              },
              transition: 'all 0.3s ease'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendReply}
            variant="contained"
            size="large"
            disabled={!replyText.trim() || sending}
            startIcon={sending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{ 
              borderRadius: 3,
              bgcolor: themeColors.success,
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              minWidth: '140px',
              '&:hover': {
                bgcolor: themeColors.success,
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: `0 12px 35px ${themeColors.success}40`
              },
              '&:disabled': {
                bgcolor: `${themeColors.success}50`,
                color: 'white',
                transform: 'none'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {sending ? 'Sending...' : 'Send Reply'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Message;
