// import React, { useState, useContext, useEffect } from 'react';
// import {
//     Box, Paper, Typography, TextField, InputAdornment,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     IconButton, Chip, Avatar, Tooltip, Pagination, Stack
// } from '@mui/material';
// import { Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { AdminContext } from '../Context/Context';
// import Swal from 'sweetalert2';

// const Feedbacks = () => {
//     const { getFeedbacks, deleteFeedback } = useContext(AdminContext);  
//     const [feedbacks, setFeedbacks] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [rowsPerPage] = useState(10);

//     const fetchFeedbacks = async () => {
//         try {
//             setLoading(true);
//             const data = await getFeedbacks();
//             if (data.success) {
//                 setFeedbacks(data.feedbacks);
//             } else {
//                 Swal.fire('Error', data.message || 'Failed to load feedbacks', 'error');
//             }
//         } catch (error) {
//             console.error('Error fetching feedbacks:', error);
//             Swal.fire('Error', 'Failed to load feedbacks', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchFeedbacks();
//     }, []);

//     const handleDeleteFeedback = async (feedbackId) => {
//         try {
//             const result = await Swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, delete it!'
//             });

//             if (result.isConfirmed) {
//                 const success = await deleteFeedback(feedbackId);
//                 if (success) {
//                     await fetchFeedbacks();
//                     Swal.fire('Deleted!', 'Feedback has been deleted.', 'success');
//                 } else {
//                     Swal.fire('Error', 'Failed to delete feedback', 'error');
//                 }
//             }
//         } catch (error) {
//             console.error('Error deleting feedback:', error);
//             Swal.fire('Error', 'Failed to delete feedback', 'error');
//         }
//     };

//     const filteredFeedbacks = feedbacks.filter(feedback =>
//         feedback.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const paginatedFeedbacks = filteredFeedbacks.slice(
//         (page - 1) * rowsPerPage,
//         page * rowsPerPage
//     );

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//     };

//     return (
//         <Box sx={{ p: { xs: 2, sm: 3 } }}>
//             <Paper
//                 elevation={2}
//                 sx={{
//                     p: 3,
//                     mb: 3,
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #1976d2, #64b5f6)',
//                     color: 'white'
//                 }}
//             >
//                 <Typography variant="h5" fontWeight="bold">
//                     Feedback Management
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     View and manage customer feedbacks
//                 </Typography>
//             </Paper>

//             <Paper sx={{ p: 2, mb: 3 }}>
//                 <TextField
//                     fullWidth
//                     placeholder="Search feedbacks..."
//                     variant="outlined"
//                     size="small"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Paper>

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 800 }}>
//                     <TableHead>
//                         <TableRow sx={{ bgcolor: 'black' }}>
//                             <TableCell>Customer</TableCell>
//                             <TableCell>Order Details</TableCell>
//                             <TableCell>Rating</TableCell>
//                             <TableCell>Comment</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={6} align="center">
//                                     <Typography>Loading feedbacks...</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : filteredFeedbacks.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={6} align="center">
//                                     <Typography>No feedbacks found</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             paginatedFeedbacks.map((feedback) => (
//                                 <TableRow key={feedback._id}>
//                                     <TableCell>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                                             <Avatar>{feedback.customer?.name?.charAt(0) || 'A'}</Avatar>
//                                             <Box>
//                                                 <Typography>{feedback.customer?.name || 'Anonymous'}</Typography>
//                                                 <Typography variant="body2" color="textSecondary">
//                                                     {feedback.customer?.email}
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell>
//                                         <Typography variant="body2">
//                                             Amount: ₹{feedback.order?.totalAmount || 0}
//                                         </Typography>
//                                         <Chip
//                                             label={feedback.order?.orderStatus || 'N/A'}
//                                             color={feedback.order?.orderStatus === 'delivered' ? 'success' : 'default'}
//                                             size="small"
//                                             sx={{ mt: 1 }}
//                                         />
//                                     </TableCell>
//                                     <TableCell>
//                                         <Chip
//                                             label={`${feedback.rating} ★`}
//                                             color={feedback.rating >= 4 ? 'success' : 
//                                                    feedback.rating >= 3 ? 'warning' : 'error'}
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                     <TableCell>{feedback.comment}</TableCell>
//                                     <TableCell>
//                                         {new Date(feedback.createdAt).toLocaleDateString()}
//                                     </TableCell>
//                                     <TableCell>
//                                         <Tooltip title="Delete Feedback">
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={() => handleDeleteFeedback(feedback._id)}
//                                             >
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             {filteredFeedbacks.length > rowsPerPage && (
//                 <Stack spacing={2} alignItems="center" sx={{ mt: 2, mb: 2 }}>
//                     <Pagination
//                         count={Math.ceil(filteredFeedbacks.length / rowsPerPage)}
//                         page={page}
//                         onChange={handlePageChange}
//                         color="primary"
//                     />
//                 </Stack>
//             )}
//         </Box>
//     );
// };

// export default Feedbacks;



import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
    Box, Paper, Typography, TextField, InputAdornment, useTheme, Skeleton, Fade, Slide,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, Avatar, Tooltip, Pagination, Stack, Rating
} from '@mui/material';
import { 
    Search as SearchIcon, 
    Delete as DeleteIcon,
    Feedback as FeedbackIcon,
    Star as StarIcon,
    Person as PersonIcon,
    ShoppingCart as OrderIcon,
    Comment as CommentIcon,
    CalendarToday as DateIcon
} from '@mui/icons-material';
import { AdminContext } from '../Context/Context';
import Swal from 'sweetalert2';

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

const Feedbacks = () => {
    const { getFeedbacks, deleteFeedback } = useContext(AdminContext);  
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === 'dark';

    // Purple Color Scheme
    const themeColors = useMemo(() => ({
        primary: '#8b5cf6',
        primaryLight: '#a78bfa',
        primaryDark: '#7c3aed',
        text: {
            primary: isDarkMode ? colors.gray[100] : '#1f2937',
            secondary: isDarkMode ? colors.gray : '#6b7280',
            accent: isDarkMode ? colors.gray : '#374151',
        },
        background: {
            primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
            secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
            hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
        },
        border: {
            default: isDarkMode ? colors.primary[600] : '#a78bfa',
            hover: isDarkMode ? colors.primary : '#8b5cf6',
        },
        success: isDarkMode ? colors.greenAccent[500] : '#10b981',
        warning: isDarkMode ? '#fbbf24' : '#f59e0b',
        error: isDarkMode ? colors.redAccent[500] : '#ef4444',
        info: isDarkMode ? colors.blueAccent : '#3b82f6',
    }), [isDarkMode, colors]);

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);
            const data = await getFeedbacks();
            if (data.success) {
                setFeedbacks(data.feedbacks);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.message || 'Failed to load feedbacks',
                    icon: 'error',
                    background: isDarkMode ? colors.primary[400] : '#ffffff',
                    color: themeColors.text.primary,
                    confirmButtonColor: themeColors.primary
                });
            }
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to load feedbacks',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleDeleteFeedback = async (feedbackId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: themeColors.primary,
                cancelButtonColor: themeColors.error,
                confirmButtonText: 'Yes, delete it!',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary
            });

            if (result.isConfirmed) {
                const success = await deleteFeedback(feedbackId);
                if (success) {
                    await fetchFeedbacks();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Feedback has been deleted.',
                        icon: 'success',
                        background: isDarkMode ? colors.primary[400] : '#ffffff',
                        color: themeColors.text.primary,
                        confirmButtonColor: themeColors.primary
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to delete feedback',
                        icon: 'error',
                        background: isDarkMode ? colors.primary[400] : '#ffffff',
                        color: themeColors.text.primary,
                        confirmButtonColor: themeColors.primary
                    });
                }
            }
        } catch (error) {
            console.error('Error deleting feedback:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete feedback',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
        }
    };

    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedFeedbacks = filteredFeedbacks.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // Get rating color and label based on value
    const getRatingColor = (rating) => {
        if (rating >= 4) return themeColors.success;
        if (rating >= 3) return themeColors.warning;
        return themeColors.error;
    };

    const getRatingLabel = (rating) => {
        if (rating >= 4) return 'Excellent';
        if (rating >= 3) return 'Good';
        return 'Poor';
    };

    if (loading) {
        return (
            <Box 
                sx={{ 
                    p: { xs: 2, sm: 3 },
                    position: 'relative',
                    minHeight: '100vh',
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
                            height={120} 
                            sx={{ 
                                borderRadius: 4,
                                bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
                                mb: 3
                            }} 
                        />
                        <Skeleton 
                            variant="rectangular" 
                            height={80} 
                            sx={{ 
                                borderRadius: 2,
                                bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
                                mb: 3
                            }} 
                        />
                        <Skeleton 
                            variant="rectangular" 
                            height={400} 
                            sx={{ 
                                borderRadius: 2,
                                bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`
                            }} 
                        />
                    </Box>
                </Slide>
            </Box>
        );
    }

    return (
        <Box 
            sx={{ 
                p: { xs: 2, sm: 3 },
                position: 'relative',
                minHeight: '100vh',
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
            {/* Enhanced Header Section */}
            <Slide direction="down" in={true} timeout={800}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 3,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        overflow: 'hidden',
                        position: 'relative',
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
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                                sx={{
                                    bgcolor: `${themeColors.primary}15`,
                                    width: 56,
                                    height: 56,
                                    border: `2px solid ${themeColors.primary}30`,
                                }}
                            >
                                <FeedbackIcon sx={{ color: themeColors.primary, fontSize: 28 }} />
                            </Avatar>
                            <Box>
                                <Typography 
                                    variant="h4" 
                                    fontWeight="bold"
                                    sx={{
                                        color: themeColors.text.primary,
                                        background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                        backgroundClip: !isDarkMode && 'text',
                                        textFillColor: !isDarkMode && 'transparent',
                                        WebkitBackgroundClip: !isDarkMode && 'text',
                                        WebkitTextFillColor: !isDarkMode && 'transparent',
                                    }}
                                >
                                    Customer Feedback
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: themeColors.text.secondary,
                                        fontWeight: 500
                                    }}
                                >
                                    View and manage customer reviews and ratings
                                </Typography>
                            </Box>
                        </Box>
                        
                        {/* Feedback Stats */}
                        <Box display="flex" gap={2} flexWrap="wrap">
                            <Chip
                                icon={<FeedbackIcon fontSize="small" />}
                                label={`Total: ${feedbacks.length}`}
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
                                icon={<StarIcon fontSize="small" />}
                                label={`Avg: ${feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0'} ⭐`}
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
                        </Box>
                    </Box>
                </Paper>
            </Slide>

            {/* Search Section */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Paper 
                    sx={{ 
                        p: 3, 
                        mb: 3,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        boxShadow: isDarkMode
                            ? `0 10px 30px ${colors.primary[900]}40`
                            : '0 10px 30px rgba(139, 92, 246, 0.1)',
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
                        `,
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search by customer name or feedback comment..."
                        variant="outlined"
                        size="medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: themeColors.primary }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: isDarkMode ? `${colors.primary[300]}20` : 'rgba(255, 255, 255, 0.8)',
                                border: `2px solid ${themeColors.border.default}`,
                                '&:hover': {
                                    borderColor: themeColors.border.hover,
                                },
                                '&.Mui-focused': {
                                    borderColor: themeColors.primary,
                                    boxShadow: `0 0 0 3px ${themeColors.primary}20`,
                                }
                            },
                            '& .MuiOutlinedInput-input': {
                                color: themeColors.text.primary,
                                '&::placeholder': {
                                    color: themeColors.text.secondary,
                                    opacity: 1
                                }
                            }
                        }}
                    />
                </Paper>
            </Fade>

            {/* Enhanced Table with Fixed Column Widths */}
            <Fade in={true} timeout={1200} style={{ transitionDelay: '400ms' }}>
                <TableContainer 
                    component={Paper}
                    sx={{
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        overflow: 'hidden',
                        boxShadow: isDarkMode
                            ? `0 10px 30px ${colors.primary[900]}40`
                            : '0 10px 30px rgba(139, 92, 246, 0.1)',
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
                        `,
                    }}
                >
                    <Table sx={{ minWidth: 1200, tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow 
                                sx={{ 
                                    background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                    '& .MuiTableCell-head': {
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        borderBottom: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        py: 3,
                                        px: 2
                                    }
                                }}
                            >
                                <TableCell sx={{ width: '22%' }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <PersonIcon fontSize="small" />
                                        CUSTOMER
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ width: '18%' }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <OrderIcon fontSize="small" />
                                        ORDER DETAILS
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ width: '15%' }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <StarIcon fontSize="small" />
                                        RATING
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ width: '25%' }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <CommentIcon fontSize="small" />
                                        COMMENT
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ width: '12%' }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <DateIcon fontSize="small" />
                                        DATE
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ width: '8%' }}>
                                    ACTIONS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                        <Typography sx={{ color: themeColors.text.secondary }}>
                                            Loading feedbacks...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : filteredFeedbacks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                        <Typography sx={{ color: themeColors.text.secondary }}>
                                            No feedbacks found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedFeedbacks.map((feedback, index) => (
                                    <TableRow 
                                        key={feedback._id}
                                        sx={{
                                            '&:nth-of-type(even)': {
                                                backgroundColor: isDarkMode ? `${colors.primary[700]}20` : 'rgba(248, 250, 252, 0.8)',
                                            },
                                            '&:hover': {
                                                backgroundColor: themeColors.background.hover,
                                                transform: 'scale(1.001)',
                                                transition: 'all 0.2s ease',
                                                boxShadow: `0 4px 20px ${themeColors.primary}15`
                                            },
                                            '& .MuiTableCell-body': {
                                                color: themeColors.text.primary,
                                                borderBottom: `1px solid ${themeColors.border.default}30`,
                                                py: 3,
                                                px: 2,
                                                verticalAlign: 'top'
                                            }
                                        }}
                                    >
                                        {/* Customer Cell - 22% width */}
                                        <TableCell sx={{ width: '22%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar 
                                                    sx={{
                                                        bgcolor: `${themeColors.primary}15`,
                                                        border: `2px solid ${themeColors.primary}30`,
                                                        color: themeColors.primary,
                                                        fontWeight: 'bold',
                                                        width: 40,
                                                        height: 40,
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    {feedback.customer?.name?.charAt(0)?.toUpperCase() || 'A'}
                                                </Avatar>
                                                <Box sx={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                                                    <Typography 
                                                        fontWeight="700"
                                                        sx={{ 
                                                            color: themeColors.text.primary,
                                                            fontSize: '0.95rem',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {feedback.customer?.name || 'jastin'}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            color: themeColors.text.secondary,
                                                            fontWeight: 500,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            fontSize: '0.8rem'
                                                        }}
                                                    >
                                                        {feedback.customer?.email || 'jastinmb904@gmail.com'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        {/* Order Details Cell - 18% width */}
                                        <TableCell sx={{ width: '18%' }}>
                                            <Box>
                                                <Typography 
                                                    variant="body1" 
                                                    fontWeight="700"
                                                    sx={{ 
                                                        color: themeColors.text.primary, 
                                                        mb: 1,
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Amount: ₹{feedback.order?.totalAmount || 2000}
                                                </Typography>
                                                <Chip
                                                    label={feedback.order?.orderStatus || 'delivered'}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 600,
                                                        borderRadius: 2,
                                                        fontSize: '0.7rem',
                                                        bgcolor: feedback.order?.orderStatus === 'delivered' 
                                                            ? `${themeColors.success}20` 
                                                            : `${themeColors.info}20`,
                                                        color: feedback.order?.orderStatus === 'delivered' 
                                                            ? themeColors.success 
                                                            : themeColors.info,
                                                        border: `1px solid ${feedback.order?.orderStatus === 'delivered' 
                                                            ? themeColors.success : themeColors.info}30`,
                                                        px: 1,
                                                        py: 0.5
                                                    }}
                                                />
                                            </Box>
                                        </TableCell>

                                        {/* Rating Cell - 15% width */}
                                        <TableCell sx={{ width: '15%' }}>
                                            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                                                <Box 
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                        px: 1.5,
                                                        py: 1,
                                                        borderRadius: 2,
                                                        bgcolor: `${getRatingColor(feedback.rating || 5)}15`,
                                                        border: `1px solid ${getRatingColor(feedback.rating || 5)}30`,
                                                        minWidth: 80,
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Rating
                                                        value={feedback.rating || 5}
                                                        readOnly
                                                        size="small"
                                                        sx={{
                                                            '& .MuiRating-icon': {
                                                                fontSize: '1rem'
                                                            },
                                                            '& .MuiRating-iconFilled': {
                                                                color: getRatingColor(feedback.rating || 5),
                                                            },
                                                            '& .MuiRating-iconEmpty': {
                                                                color: `${getRatingColor(feedback.rating || 5)}30`,
                                                            }
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="bold"
                                                        sx={{ 
                                                            color: getRatingColor(feedback.rating || 5),
                                                            fontSize: '0.8rem'
                                                        }}
                                                    >
                                                        {feedback.rating || 5}
                                                    </Typography>
                                                </Box>
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: getRatingColor(feedback.rating || 5),
                                                        fontWeight: 600,
                                                        fontSize: '0.7rem',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {getRatingLabel(feedback.rating || 5)}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* Comment Cell - 25% width */}
                                        <TableCell sx={{ width: '25%' }}>
                                            <Box
                                                sx={{
                                                    bgcolor: isDarkMode ? `${colors.primary[100]}30` : 'rgba(248, 250, 252, 0.8)',
                                                    borderRadius: 2,
                                                    p: 1.5,
                                                    border: `1px solid ${themeColors.border.default}30`,
                                                    minHeight: 70,
                                                    maxHeight: 100,
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    width: '100%'
                                                }}
                                            >
                                                <Typography 
                                                    sx={{ 
                                                        color: themeColors.text.primary,
                                                        fontWeight: 500,
                                                        fontSize: '0.85rem',
                                                        lineHeight: 1.3,
                                                        wordBreak: 'break-word',
                                                        overflowWrap: 'break-word',
                                                        hyphens: 'auto',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                    title={feedback.comment || 'hi hello nice to wear and good xxjvjcxvjwxvjwvcxjwvcxvwcxwcxvwvcxwvjckxxcxhvfhvwhvcxckewvcxvwjxvvjx'}
                                                >
                                                    {feedback.comment || 'hi hello nice to wear and good xxjvjcxvjwxvjwvcxjwvcxvwcxwcxvwvcxwvjckxxcxhvfhvwhvcxckewvcxvwjxvvjx'}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* Date Cell - 12% width */}
                                        <TableCell sx={{ width: '12%' }}>
                                            <Box
                                                sx={{
                                                    textAlign: 'center',
                                                    bgcolor: `${themeColors.info}15`,
                                                    borderRadius: 2,
                                                    p: 1,
                                                    border: `1px solid ${themeColors.info}30`
                                                }}
                                            >
                                                <Typography 
                                                    variant="body2"
                                                    fontWeight="600"
                                                    sx={{ 
                                                        color: themeColors.info,
                                                        fontSize: '0.8rem'
                                                    }}
                                                >
                                                    {new Date(feedback.createdAt || Date.now()).toLocaleDateString('en-GB')}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* Actions Cell - 8% width */}
                                        <TableCell align="center" sx={{ width: '8%' }}>
                                            <Tooltip title="Delete Feedback">
                                                <IconButton
                                                    onClick={() => handleDeleteFeedback(feedback._id)}
                                                    sx={{
                                                        background: `linear-gradient(135deg, ${themeColors.error}, ${colors.redAccent[400]})`,
                                                        color: 'white',
                                                        borderRadius: 2,
                                                        padding: '8px',
                                                        width: 36,
                                                        height: 36,
                                                        '&:hover': {
                                                            background: `linear-gradient(135deg, ${colors.redAccent[600]}, ${themeColors.error})`,
                                                            transform: 'scale(1.1)',
                                                            boxShadow: `0 6px 20px ${themeColors.error}40`
                                                        },
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fade>

            {/* Enhanced Pagination */}
            {filteredFeedbacks.length > rowsPerPage && (
                <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
                    <Box 
                        sx={{ 
                            mt: 4, 
                            display: 'flex', 
                            justifyContent: 'center',
                            p: 3,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            backdropFilter: 'blur(10px)',
                            border: `2px solid ${themeColors.border.default}`,
                            boxShadow: isDarkMode
                                ? `0 10px 30px ${colors.primary[900]}40`
                                : '0 10px 30px rgba(139, 92, 246, 0.1)',
                        }}
                    >
                        <Pagination
                            count={Math.ceil(filteredFeedbacks.length / rowsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: themeColors.text.primary,
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: themeColors.background.hover,
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: themeColors.primary,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: themeColors.primaryDark,
                                        }
                                    }
                                }
                            }}
                        />
                    </Box>
                </Fade>
            )}
        </Box>
    );
};

export default Feedbacks;
