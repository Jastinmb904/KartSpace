// import React, { useContext, useEffect, useState } from 'react';
// import { VendorContext } from '../Context/Context';
// import {
//     Box,
//     Paper,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     TextField,
//     InputAdornment,
//     Grid,
//     Rating,
//     Pagination,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button
// } from '@mui/material';
// import {
//     Delete as DeleteIcon,
//     Search as SearchIcon
// } from '@mui/icons-material';

// const Feedbacks = () => {
//     const { feedbacks = [], getFeedbacks, deleteFeedback, loading } = useContext(VendorContext);
//     const [page, setPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [feedbacksPerPage] = useState(10);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [selectedFeedback, setSelectedFeedback] = useState(null);

//     useEffect(() => {
//         getFeedbacks();
//     }, []); // Add getFeedbacks to dependency array

//     // Add null check before filtering
//     const filteredFeedbacks = feedbacks?.filter(feedback =>
//         feedback?.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         feedback?.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     ) || [];

//     const paginatedFeedbacks = filteredFeedbacks.slice(
//         (page - 1) * feedbacksPerPage,
//         page * feedbacksPerPage
//     );

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleDeleteClick = (feedback) => {
//         setSelectedFeedback(feedback);
//         setDeleteDialogOpen(true);
//     };

//     const handleDeleteConfirm = async () => {
//         if (selectedFeedback) {
//             await deleteFeedback(selectedFeedback._id);
//             setDeleteDialogOpen(false);
//             setSelectedFeedback(null);
//         }
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
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
//                     Customer Feedbacks
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     Manage customer reviews and feedback
//                 </Typography>
//             </Paper>

//             <Paper sx={{ p: 2, mb: 3 }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             placeholder="Search by customer name or feedback content..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                         <Typography variant="body2" sx={{ textAlign: { xs: 'left', md: 'right' } }}>
//                             Showing {paginatedFeedbacks.length} of {filteredFeedbacks.length} feedbacks
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Paper>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Customer</TableCell>
//                             <TableCell>Rating</TableCell>
//                             <TableCell>Feedback</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell align="right">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">Loading feedbacks...</TableCell>
//                             </TableRow>
//                         ) : paginatedFeedbacks.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">No feedbacks found</TableCell>
//                             </TableRow>
//                         ) : (
//                             paginatedFeedbacks.map((feedback) => (
//                                 <TableRow key={feedback._id}>
//                                     <TableCell>{feedback.customer?.name || 'Anonymous'}</TableCell>
//                                     <TableCell>
//                                         <Rating value={feedback.rating} readOnly />
//                                     </TableCell>
//                                     <TableCell>{feedback.comment}</TableCell>
//                                     <TableCell>{formatDate(feedback.createdAt)}</TableCell>
//                                     <TableCell align="right">
//                                         <IconButton
//                                             color="error"
//                                             onClick={() => handleDeleteClick(feedback)}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {filteredFeedbacks.length > feedbacksPerPage && (
//                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//                     <Pagination
//                         count={Math.ceil(filteredFeedbacks.length / feedbacksPerPage)}
//                         page={page}
//                         onChange={handlePageChange}
//                         color="primary"
//                     />
//                 </Box>
//             )}

//             <Dialog
//                 open={deleteDialogOpen}
//                 onClose={() => setDeleteDialogOpen(false)}
//             >
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogContent>
//                     Are you sure you want to delete this feedback?
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Feedbacks;



import React, { useContext, useEffect, useState } from 'react';
import { VendorContext } from '../Context/Context';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TextField,
    InputAdornment,
    Grid,
    Rating,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Card,
    CardContent,
    Fade,
    Slide,
    Skeleton,
    Avatar,
    Chip,
    useTheme,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Search as SearchIcon,
    Feedback as FeedbackIcon,
    Star,
    Person,
    Store,
    LocalMall,
    CardGiftcard,
    ShoppingCart,
} from '@mui/icons-material';

// Remove the problematic theme import and define colors directly
const Feedbacks = () => {
    const { feedbacks = [], getFeedbacks, deleteFeedback, loading } = useContext(VendorContext);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [feedbacksPerPage] = useState(10);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [isHovered, setIsHovered] = useState({});

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Shopping icons for background animation (only in light mode)
    const shoppingIcons = [
        { Icon: ShoppingCart, delay: '0s', duration: '8s', x: '5%', y: '10%' },
        { Icon: Store, delay: '2s', duration: '10s', x: '90%', y: '15%' },
        { Icon: LocalMall, delay: '1s', duration: '12s', x: '15%', y: '75%' },
        { Icon: FeedbackIcon, delay: '3s', duration: '9s', x: '85%', y: '70%' },
        { Icon: CardGiftcard, delay: '4s', duration: '11s', x: '10%', y: '45%' },
        { Icon: Star, delay: '5s', duration: '7s', x: '80%', y: '35%' },
    ];

    // Define consistent color scheme directly
    const themeColors = {
        primary: '#8b5cf6',
        primaryLight: '#a78bfa',
        primaryDark: '#7c3aed',
        text: {
            primary: isDarkMode ? '#e0e0e0' : '#1f2937',
            secondary: isDarkMode ? '#a3a3a3' : '#6b7280',
            accent: isDarkMode ? '#c2c2c2' : '#374151',
        },
        background: {
            primary: isDarkMode ? '#1F2A40' : 'rgba(254, 252, 255, 0.95)',
            secondary: isDarkMode ? '#141b2d' : 'rgba(250, 249, 255, 0.95)',
            hover: isDarkMode ? '#101624' : 'rgba(139, 92, 246, 0.05)',
        },
        border: {
            default: isDarkMode ? '#525252' : '#a78bfa',
            hover: isDarkMode ? '#727681' : '#8b5cf6',
        },
        success: isDarkMode ? '#4cceac' : '#10b981',
        warning: isDarkMode ? '#fbbf24' : '#f59e0b',
        error: isDarkMode ? '#db4f4a' : '#ef4444',
        info: isDarkMode ? '#6870fa' : '#3b82f6',
    };

    useEffect(() => {
        getFeedbacks();
    }, []);

    // Add null check before filtering
    const filteredFeedbacks = feedbacks?.filter(feedback =>
        feedback?.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback?.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const paginatedFeedbacks = filteredFeedbacks.slice(
        (page - 1) * feedbacksPerPage,
        page * feedbacksPerPage
    );

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleDeleteClick = (feedback) => {
        setSelectedFeedback(feedback);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedFeedback) {
            await deleteFeedback(selectedFeedback._id);
            setDeleteDialogOpen(false);
            setSelectedFeedback(null);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return themeColors.success;
        if (rating >= 3) return themeColors.warning;
        return themeColors.error;
    };

    return (
        <Box 
            sx={{ 
                p: { xs: 2, sm: 3 },
                position: 'relative',
                minHeight: '90vh',
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

            {/* Header Card */}
            <Slide direction="down" in={true} timeout={800}>
                <Card
                    onMouseEnter={() => setIsHovered(prev => ({ ...prev, header: true }))}
                    onMouseLeave={() => setIsHovered(prev => ({ ...prev, header: false }))}
                    sx={{
                        mb: 3,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${isHovered.header ? themeColors.border.hover : themeColors.border.default}`,
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        transform: isHovered.header ? 'translateY(-4px)' : 'translateY(0)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        boxShadow: isHovered.header 
                            ? isDarkMode
                                ? '0 20px 40px -12px rgba(31, 42, 64, 0.6)'
                                : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
                            : isDarkMode
                                ? undefined
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
                    <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                                sx={{
                                    bgcolor: `${themeColors.primary}15`,
                                    width: 60,
                                    height: 60,
                                    border: `2px solid ${themeColors.primary}30`,
                                    animation: 'bounce 2s ease-in-out infinite',
                                    '@keyframes bounce': {
                                        '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                                        '40%': { transform: 'translateY(-5px)' },
                                        '60%': { transform: 'translateY(-3px)' }
                                    }
                                }}
                            >
                                <FeedbackIcon sx={{ fontSize: 30, color: themeColors.primary }} />
                            </Avatar>
                            <Box>
                                <Typography 
                                    variant="h4" 
                                    fontWeight="700"
                                    sx={{
                                        color: themeColors.text.primary,
                                        background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                        backgroundClip: !isDarkMode && 'text',
                                        textFillColor: !isDarkMode && 'transparent',
                                        WebkitBackgroundClip: !isDarkMode && 'text',
                                        WebkitTextFillColor: !isDarkMode && 'transparent',
                                        mb: 0.5
                                    }}
                                >
                                    Customer Feedbacks
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: themeColors.text.secondary,
                                        fontWeight: 500
                                    }}
                                >
                                    Manage customer reviews and feedback
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Slide>

            {/* Search and Filter Card */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Card 
                    sx={{ 
                        mb: 3,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        borderRadius: 4,
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
                        `,
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search by customer name or feedback content..."
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
                                            borderRadius: 3,
                                            backgroundColor: isDarkMode ? '#101624' : 'rgba(255, 255, 255, 0.8)',
                                            transition: 'all 0.3s ease-in-out',
                                            '& fieldset': {
                                                borderColor: themeColors.border.default,
                                                borderWidth: '2px',
                                            },
                                            '&:hover': {
                                                backgroundColor: isDarkMode ? '#0c101b' : 'rgba(255, 255, 255, 0.9)',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
                                                '& fieldset': {
                                                    borderColor: themeColors.border.hover,
                                                },
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: isDarkMode ? '#0c101b' : 'rgba(255, 255, 255, 0.9)',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                                                '& fieldset': {
                                                    borderColor: themeColors.primary,
                                                    borderWidth: '2px',
                                                },
                                            },
                                            '& input': {
                                                color: themeColors.text.primary,
                                                fontSize: '0.95rem',
                                                fontWeight: 500,
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: themeColors.text.secondary,
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }} alignItems="center" gap={2}>
                                    <Chip
                                        label={`${filteredFeedbacks.length} Total Feedbacks`}
                                        sx={{
                                            bgcolor: `${themeColors.primary}15`,
                                            color: themeColors.primary,
                                            fontWeight: 600,
                                            border: `1px solid ${themeColors.primary}30`,
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>

            {/* Table Card */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
                <Card
                    sx={{
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        borderRadius: 4,
                        overflow: 'hidden',
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
                        `,
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow 
                                    sx={{ 
                                        background: `linear-gradient(90deg, ${themeColors.primary}15, ${themeColors.primaryLight}10)`,
                                    }}
                                >
                                    <TableCell sx={{ 
                                        color: themeColors.text.primary, 
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Customer
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: themeColors.text.primary, 
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Rating
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: themeColors.text.primary, 
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Feedback
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: themeColors.text.primary, 
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Date
                                    </TableCell>
                                    <TableCell align="right" sx={{ 
                                        color: themeColors.text.primary, 
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    [...Array(5)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Skeleton width={120} height={40} sx={{ bgcolor: `${themeColors.primary}20` }} />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton width={150} height={40} sx={{ bgcolor: `${themeColors.primary}20` }} />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton width={200} height={40} sx={{ bgcolor: `${themeColors.primary}20` }} />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton width={100} height={40} sx={{ bgcolor: `${themeColors.primary}20` }} />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton width={40} height={40} sx={{ bgcolor: `${themeColors.primary}20` }} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : paginatedFeedbacks.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                                            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                                <FeedbackIcon 
                                                    sx={{ 
                                                        fontSize: 48, 
                                                        color: themeColors.text.secondary,
                                                        opacity: 0.5 
                                                    }} 
                                                />
                                                <Typography 
                                                    color={themeColors.text.secondary}
                                                    variant="h6"
                                                >
                                                    No feedbacks found
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedFeedbacks.map((feedback, index) => (
                                        <TableRow 
                                            key={feedback._id}
                                            sx={{
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    bgcolor: themeColors.background.hover,
                                                    transform: 'scale(1.01)',
                                                },
                                                animation: `slideInUp 0.6s ease-out ${index * 100}ms both`,
                                                '@keyframes slideInUp': {
                                                    '0%': {
                                                        opacity: 0,
                                                        transform: 'translateY(20px)',
                                                    },
                                                    '100%': {
                                                        opacity: 1,
                                                        transform: 'translateY(0)',
                                                    },
                                                },
                                            }}
                                        >
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Avatar 
                                                        sx={{ 
                                                            width: 32, 
                                                            height: 32,
                                                            bgcolor: `${themeColors.primary}20`,
                                                            color: themeColors.primary
                                                        }}
                                                    >
                                                        <Person />
                                                    </Avatar>
                                                    <Typography 
                                                        sx={{ 
                                                            color: themeColors.text.primary,
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {feedback.customer?.name || 'Anonymous'}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Rating 
                                                        value={feedback.rating} 
                                                        readOnly 
                                                        size="small"
                                                        sx={{
                                                            '& .MuiRating-iconFilled': {
                                                                color: getRatingColor(feedback.rating),
                                                            },
                                                        }}
                                                    />
                                                    <Chip
                                                        label={feedback.rating}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: `${getRatingColor(feedback.rating)}20`,
                                                            color: getRatingColor(feedback.rating),
                                                            fontWeight: 600,
                                                            minWidth: 35,
                                                        }}
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography 
                                                    sx={{ 
                                                        color: themeColors.text.accent,
                                                        maxWidth: 300,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                    title={feedback.comment}
                                                >
                                                    {feedback.comment}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography 
                                                    sx={{ 
                                                        color: themeColors.text.secondary,
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    {formatDate(feedback.createdAt)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    onClick={() => handleDeleteClick(feedback)}
                                                    sx={{
                                                        color: themeColors.error,
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            bgcolor: `${themeColors.error}15`,
                                                            transform: 'scale(1.1)',
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Fade>

            {/* Pagination */}
            {filteredFeedbacks.length > feedbacksPerPage && (
                <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Paper
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                backdropFilter: 'blur(10px)',
                                border: `2px solid ${themeColors.border.default}`,
                            }}
                        >
                            <Pagination
                                count={Math.ceil(filteredFeedbacks.length / feedbacksPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: themeColors.text.primary,
                                        '&.Mui-selected': {
                                            bgcolor: themeColors.primary,
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: themeColors.primaryDark,
                                            }
                                        },
                                        '&:hover': {
                                            bgcolor: `${themeColors.primary}15`,
                                        }
                                    }
                                }}
                            />
                        </Paper>
                    </Box>
                </Fade>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
                        `,
                    }
                }}
            >
                <DialogTitle sx={{ color: themeColors.text.primary, fontWeight: 600 }}>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: themeColors.text.secondary }}>
                        Are you sure you want to delete this feedback? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3, gap: 2 }}>
                    <Button 
                        onClick={() => setDeleteDialogOpen(false)}
                        sx={{
                            color: themeColors.text.secondary,
                            borderColor: themeColors.border.default,
                            '&:hover': {
                                borderColor: themeColors.border.hover,
                                bgcolor: `${themeColors.primary}10`,
                            }
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDeleteConfirm}
                        sx={{
                            bgcolor: themeColors.error,
                            color: 'white',
                            '&:hover': {
                                bgcolor: `${themeColors.error}dd`,
                                transform: 'translateY(-1px)',
                            }
                        }}
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Feedbacks;
