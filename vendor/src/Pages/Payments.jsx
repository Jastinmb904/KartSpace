// import React, { useContext, useState, useMemo } from 'react';
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
//     Chip,
//     Grid,
//     TextField,
//     InputAdornment,
//     FormControl,
//     Select,
//     MenuItem,
//     Pagination,
//     Card,
//     CardContent,
//     Stack
// } from '@mui/material';
// import {
//     Search as SearchIcon,
//     CurrencyRupee as CurrencyRupeeIcon,
//     Payment as PaymentIcon
// } from '@mui/icons-material';

// const Payments = () => {
//     const { orders, loading } = useContext(VendorContext);
//     const [page, setPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [paymentFilter, setPaymentFilter] = useState('all');
//     const [paymentsPerPage] = useState(10);

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     // Calculate total earnings
//     const totalEarnings = useMemo(() => {
//         return orders.reduce((total, order) => {
//             if (order.paymentStatus === 'paid' || order.orderStatus === 'delivered') {
//                 return total + order.totalAmount;
//             }
//             return total;
//         }, 0);
//     }, [orders]);

//     // Filter and search payments
//     const filteredPayments = useMemo(() => {
//         return orders.filter(order => {
//             const matchesSearch = 
//                 order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 order.contactInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
            
//             const matchesPaymentStatus = 
//                 paymentFilter === 'all' || 
//                 (paymentFilter === 'paid' && (order.paymentStatus === 'paid' || order.orderStatus === 'delivered')) ||
//                 (paymentFilter === 'pending' && order.paymentStatus === 'pending' && order.orderStatus !== 'delivered');
            
//             return matchesSearch && matchesPaymentStatus;
//         });
//     }, [orders, searchTerm, paymentFilter]);

//     // Paginate payments
//     const paginatedPayments = useMemo(() => {
//         const startIndex = (page - 1) * paymentsPerPage;
//         return filteredPayments.slice(startIndex, startIndex + paymentsPerPage);
//     }, [filteredPayments, page, paymentsPerPage]);

//     const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//     };

//     const getPaymentStatusColor = (order) => {
//         if (order.orderStatus === 'cancelled') return 'error';
//         if (order.orderStatus === 'delivered' || order.paymentStatus === 'paid') return 'success';
//         return 'warning';
//     };

//     const getPaymentStatus = (order) => {
//         if (order.orderStatus === 'cancelled') return 'Cancelled';
//         if (order.orderStatus === 'delivered' || order.paymentStatus === 'paid') return 'Paid';
//         return 'Pending';
//     };
//     console.log(orders);

//     return (
//         <Box sx={{ p: { xs: 2, sm: 3 } }}>
//             {/* Header */}
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
//                     Payments Overview
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     Track and manage your payments
//                 </Typography>
//             </Paper>

//             {/* Payment Stats */}
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//                 <Grid item xs={12} md={4}>
//                     <Card>
//                         <CardContent>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Total Earnings
//                             </Typography>
//                             <Typography variant="h4">
//                                 ₹{totalEarnings.toLocaleString('en-IN')}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Card>
//                         <CardContent>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Total Transactions
//                             </Typography>
//                             <Typography variant="h4">
//                                 {orders.length}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Card>
//                         <CardContent>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Pending Payments
//                             </Typography>
//                             <Typography variant="h4">
//                                 {orders.filter(order => 
//                                     order.paymentStatus === 'pending' && 
//                                     order.orderStatus !== 'cancelled' && 
//                                     order.orderStatus !== 'delivered'
//                                 ).length}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             {/* Filters */}
//             <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             placeholder="Search by order ID, customer name, or payment method..."
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
//                     <Grid item xs={12} md={3}>
//                         <FormControl fullWidth size="small">
//                             <Select
//                                 value={paymentFilter}
//                                 onChange={(e) => setPaymentFilter(e.target.value)}
//                             >
//                                 <MenuItem value="all">All Payments</MenuItem>
//                                 <MenuItem value="paid">Paid</MenuItem>
//                                 <MenuItem value="pending">Pending</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                         <Typography variant="body2" sx={{ textAlign: { xs: 'left', md: 'right' } }}>
//                             Showing {paginatedPayments.length} of {filteredPayments.length} payments
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Paper>

//             {/* Payments List */}
//             {loading ? (
//                 <Paper sx={{ p: 3, textAlign: 'center' }}>
//                     <Typography>Loading payments...</Typography>
//                 </Paper>
//             ) : filteredPayments.length === 0 ? (
//                 <Paper sx={{ p: 3, textAlign: 'center' }}>
//                     <PaymentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
//                     <Typography variant="h6">No payments found</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         {searchTerm || paymentFilter !== 'all' ? 
//                             'Try adjusting your search or filter criteria' : 
//                             'Payments will appear here once orders are placed'}
//                     </Typography>
//                 </Paper>
//             ) : (
//                 <Stack spacing={2}>
//                     <TableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Order ID</TableCell>
//                                     <TableCell>Customer</TableCell>
//                                     <TableCell>Amount</TableCell>
//                                     <TableCell>Payment Method</TableCell>
//                                     <TableCell>Payment Reference</TableCell>
//                                     <TableCell>Status</TableCell>
//                                     <TableCell>Date</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {paginatedPayments.map((order) => (
//                                     <TableRow key={order._id}>
//                                         <TableCell>{order._id}</TableCell>
//                                         <TableCell>
//                                             <Typography variant="body2">
//                                                 {order.contactInfo?.name || 'N/A'}
//                                             </Typography>
//                                             <Typography variant="caption" color="textSecondary">
//                                                 {order.contactInfo?.email || 'N/A'}
//                                             </Typography>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                 <CurrencyRupeeIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                                                 {order.totalAmount}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>{order.paymentMethod}</TableCell>
// <TableCell>{order.paymentDetails?.transactionId || 'N/A'}
//     <br />
//     {order.paymentDetails?.upiId || 'N/A'}
// </TableCell>
//                                         <TableCell>
//                                             <Chip
//                                                 label={getPaymentStatus(order)}
//                                                 color={getPaymentStatusColor(order)}
//                                                 size="small"
//                                             />
//                                         </TableCell>
//                                         <TableCell>{formatDate(order.createdAt)}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     {totalPages > 1 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                             <Pagination
//                                 count={totalPages}
//                                 page={page}
//                                 onChange={handlePageChange}
//                                 color="primary"
//                                 showFirstButton
//                                 showLastButton
//                             />
//                         </Box>
//                     )}
//                 </Stack>
//             )}
//         </Box>
//     );
// };

// export default Payments;



import React, { useContext, useState, useMemo, memo, useEffect } from 'react';
import { VendorContext } from '../Context/Context';
import {
    Box,
    Paper,
    Typography,
    Chip,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    Pagination,
    Card,
    CardContent,
    Stack,
    useTheme,
    useMediaQuery,
    Fade,
    Slide,
    CircularProgress,
    Tooltip,
    Avatar,
    Divider,
    Button
} from '@mui/material';
import {
    Search as SearchIcon,
    CurrencyRupee as CurrencyRupeeIcon,
    Payment as PaymentIcon,
    AccountBalance,
    TrendingUp,
    Receipt,
    Store,
    LocalMall,
    CardGiftcard,
    ShoppingCart,
    AttachMoney,
    Person,
    Email,
    CalendarToday,
    AccountBalanceWallet,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import { tokens } from '../theme';

// Enhanced TextField Component
const EnhancedTextField = memo(({ themeColors, isDarkMode, colors, ...props }) => {
    const [fieldHovered, setFieldHovered] = useState(false);
    const [fieldFocused, setFieldFocused] = useState(false);
    
    return (
        <Box 
            position="relative"
            onMouseEnter={() => setFieldHovered(true)}
            onMouseLeave={() => setFieldHovered(false)}
        >
            <TextField
                {...props}
                onFocus={(e) => {
                    setFieldFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFieldFocused(false);
                    props.onBlur?.(e);
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: fieldHovered || fieldFocused ? 'scale(1.01)' : 'scale(1)',
                        boxShadow: fieldHovered || fieldFocused
                            ? isDarkMode
                                ? `0 7px 22px ${colors.primary[900]}35`
                                : '0 7px 22px rgba(139, 92, 246, 0.12)'
                            : isDarkMode
                                ? `0 4px 12px ${colors.primary[900]}25`
                                : '0 4px 12px rgba(167, 139, 250, 0.09)',
                        '& fieldset': {
                            border: `2px solid ${fieldFocused ? themeColors.primary : fieldHovered ? themeColors.border.hover : themeColors.border.default}`,
                            transition: 'all 0.3s ease',
                        },
                        '&:hover fieldset': {
                            border: `2px solid ${themeColors.border.hover}`,
                        },
                        '&.Mui-focused fieldset': {
                            border: `2px solid ${themeColors.primary}`,
                            boxShadow: `0 0 0 3px ${themeColors.primary}20`,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: themeColors.text.secondary,
                        fontWeight: 500,
                        '&.Mui-focused': {
                            color: themeColors.primary,
                            fontWeight: 600,
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        color: themeColors.text.primary,
                        fontWeight: 500,
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    },
                    ...props.sx
                }}
            />
        </Box>
    );
});

// Enhanced Stat Card Component
const EnhancedStatCard = memo(({ title, value, icon, color, index, themeColors, isDarkMode, colors }) => {
    const [isCardHovered, setIsCardHovered] = useState(false);
    
    return (
        <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
            <Card
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${isCardHovered ? themeColors.border.hover : themeColors.border.default}`,
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    transform: isCardHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: isCardHovered 
                        ? isDarkMode
                            ? `0 20px 40px -12px ${color}40`
                            : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
                        : isDarkMode
                            ? `0 10px 30px ${colors.primary[900]}40`
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
                <CardContent sx={{ p: 3, height: '100%' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 700,
                                    color: themeColors.text.primary,
                                    mb: 0.5,
                                    fontSize: '1.8rem',
                                    background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                    backgroundClip: !isDarkMode && 'text',
                                    textFillColor: !isDarkMode && 'transparent',
                                    WebkitBackgroundClip: !isDarkMode && 'text',
                                    WebkitTextFillColor: !isDarkMode && 'transparent',
                                }}
                            >
                                {value}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: themeColors.text.secondary,
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {title}
                            </Typography>
                        </Box>
                        <Avatar
                            sx={{
                                bgcolor: isDarkMode ? `${color}20` : `${themeColors.primary}15`,
                                width: 56,
                                height: 56,
                                border: isDarkMode ? `2px solid ${color}30` : `2px solid ${themeColors.primary}30`,
                                animation: 'bounce 2s ease-in-out infinite',
                                '@keyframes bounce': {
                                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                                    '40%': { transform: 'translateY(-3px)' },
                                    '60%': { transform: 'translateY(-2px)' }
                                }
                            }}
                        >
                            {React.cloneElement(icon, { 
                                sx: { 
                                    color: isDarkMode ? color : themeColors.primary, 
                                    fontSize: 28 
                                } 
                            })}
                        </Avatar>
                    </Box>
                </CardContent>
            </Card>
        </Fade>
    );
});

// Payment List Item Component
const PaymentListItem = memo(({ order, index, themeColors, isDarkMode, getPaymentStatus, getPaymentStatusColor, formatDate, formatCurrency }) => {
    const [isItemHovered, setIsItemHovered] = useState(false);

    return (
        <Fade in={true} timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
            <Card
                onMouseEnter={() => setIsItemHovered(true)}
                onMouseLeave={() => setIsItemHovered(false)}
                sx={{
                    mb: 2,
                    background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${isItemHovered ? themeColors.border.hover : themeColors.border.default}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    transform: isItemHovered ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: isItemHovered 
                        ? isDarkMode
                            ? `0 8px 25px rgba(139, 92, 246, 0.25)`
                            : '0 8px 25px rgba(139, 92, 246, 0.12)'
                        : isDarkMode
                            ? `0 4px 12px rgba(0, 0, 0, 0.3)`
                            : '0 4px 12px rgba(167, 139, 250, 0.08)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        background: `linear-gradient(180deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {/* Left Section - Order Info */}
                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography variant="h6" sx={{ 
                                    color: themeColors.text.primary,
                                    fontWeight: 600,
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Receipt sx={{ mr: 1, color: themeColors.primary }} />
                                    Order #{order._id.slice(-8)}
                                </Typography>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Person sx={{ fontSize: 16, mr: 1, color: themeColors.text.secondary }} />
                                    <Typography variant="body2" sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
                                        {order.contactInfo?.name || 'N/A'}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Email sx={{ fontSize: 16, mr: 1, color: themeColors.text.secondary }} />
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        {order.contactInfo?.email || 'N/A'}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <CalendarToday sx={{ fontSize: 16, mr: 1, color: themeColors.text.secondary }} />
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        {formatDate(order.createdAt)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Center Section - Payment Details */}
                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ 
                                    color: themeColors.text.primary,
                                    fontWeight: 600,
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <PaymentIcon sx={{ mr: 1, color: themeColors.primary }} />
                                    Payment Details
                                </Typography>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <CurrencyRupeeIcon sx={{ fontSize: 18, mr: 0.5, color: themeColors.success }} />
                                    <Typography variant="h6" sx={{ 
                                        color: themeColors.success,
                                        fontWeight: 700
                                    }}>
                                        {order.totalAmount.toLocaleString('en-IN')}
                                    </Typography>
                                </Box>
                                <Box mb={1}>
                                    <Chip
                                        label={order.paymentMethod}
                                        size="small"
                                        variant="outlined"
                                        icon={<AccountBalanceWallet sx={{ fontSize: 16 }} />}
                                        sx={{
                                            backgroundColor: `${themeColors.info}15`,
                                            borderColor: themeColors.info,
                                            color: themeColors.info,
                                            fontWeight: 500
                                        }}
                                    />
                                </Box>
                                {order.paymentDetails?.transactionId && (
                                    <Typography variant="caption" sx={{ 
                                        color: themeColors.text.secondary,
                                        fontFamily: 'monospace',
                                        display: 'block',
                                        backgroundColor: `${themeColors.primary}10`,
                                        padding: '4px 8px',
                                        borderRadius: 1,
                                        border: `1px solid ${themeColors.border.default}`
                                    }}>
                                        TXN: {order.paymentDetails.transactionId}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>

                        {/* Right Section - Status & Actions */}
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column" alignItems={{ xs: 'flex-start', md: 'flex-end' }} height="100%">
                                <Box mb={2}>
                                    <Chip
                                        label={getPaymentStatus(order)}
                                        color={getPaymentStatusColor(order)}
                                        size="medium"
                                        variant="outlined"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            backgroundColor: getPaymentStatusColor(order) === 'success' 
                                                ? `${themeColors.success}15`
                                                : getPaymentStatusColor(order) === 'error'
                                                    ? `${themeColors.error}15`
                                                    : `${themeColors.warning}15`,
                                            borderColor: getPaymentStatusColor(order) === 'success' 
                                                ? themeColors.success
                                                : getPaymentStatusColor(order) === 'error'
                                                    ? themeColors.error
                                                    : themeColors.warning,
                                            color: getPaymentStatusColor(order) === 'success' 
                                                ? themeColors.success
                                                : getPaymentStatusColor(order) === 'error'
                                                    ? themeColors.error
                                                    : themeColors.warning,
                                        }}
                                    />
                                </Box>
                                
                                {order.paymentDetails?.upiId && (
                                    <Box textAlign={{ xs: 'left', md: 'right' }}>
                                        <Typography variant="caption" sx={{ 
                                            color: themeColors.text.secondary,
                                            fontSize: '0.75rem'
                                        }}>
                                            UPI ID:
                                        </Typography>
                                        <Typography variant="caption" sx={{ 
                                            color: themeColors.text.primary,
                                            display: 'block',
                                            fontWeight: 500
                                        }}>
                                            {order.paymentDetails.upiId}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    );
});

const Payments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isDarkMode = theme.palette.mode === 'dark';

    const { orders: contextOrders, loading } = useContext(VendorContext);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [paymentsPerPage] = useState(10);
    const [isHovered, setIsHovered] = useState({});

    // Local storage key
    const STORAGE_KEY = 'vendor_payments_data';

    // Enhanced localStorage sync - handles empty database state
    useEffect(() => {
        if (contextOrders !== undefined) {  // Check if data has loaded from context
            if (contextOrders.length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(contextOrders));
                setOrders(contextOrders);
            } else {
                // If context has loaded but is empty, clear localStorage and local state
                localStorage.removeItem(STORAGE_KEY);
                setOrders([]);
            }
        }
    }, [contextOrders]);

    // Load orders from localStorage only if context hasn't loaded yet
    useEffect(() => {
        // Only load from localStorage if context data is still undefined or loading
        if (contextOrders === undefined || (loading && (!contextOrders || contextOrders.length === 0))) {
            const savedOrders = localStorage.getItem(STORAGE_KEY);
            if (savedOrders) {
                try {
                    const parsedOrders = JSON.parse(savedOrders);
                    setOrders(parsedOrders);
                } catch (error) {
                    console.error('Error parsing saved orders:', error);
                    localStorage.removeItem(STORAGE_KEY);
                    setOrders([]);
                }
            }
        }
    }, [contextOrders, loading]);

    // Function to refresh payments and clear cache
    const refreshPayments = () => {
        localStorage.removeItem(STORAGE_KEY);
        setOrders([]);
        // Force a page refresh to re-fetch from database
        window.location.reload();
    };

    // Shopping icons for background animation (only in light mode)
    const shoppingIcons = [
        { Icon: PaymentIcon, delay: '0s', duration: '12s', x: '8%', y: '15%' },
        { Icon: AccountBalance, delay: '3s', duration: '15s', x: '85%', y: '25%' },
        { Icon: Receipt, delay: '1s', duration: '18s', x: '10%', y: '70%' },
        { Icon: AttachMoney, delay: '4s', duration: '14s', x: '80%', y: '65%' },
        { Icon: TrendingUp, delay: '6s', duration: '16s', x: '15%', y: '45%' },
    ];

    // Define consistent color scheme matching Dashboard
    const themeColors = useMemo(() => ({
        primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
        primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
        primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
        text: {
            primary: isDarkMode ? colors.gray[100] : '#1f2937',
            secondary: isDarkMode ? colors.gray : '#6b7280',
            accent: isDarkMode ? colors.gray : '#374151',
        },
        background: {
            primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
            secondary: isDarkMode ? colors.primary : 'rgba(250, 249, 255, 0.95)',
            hover: isDarkMode ? colors.primary : 'rgba(139, 92, 246, 0.05)',
        },
        border: {
            default: isDarkMode ? colors.primary[600] : 'rgba(167, 139, 250, 0.3)',
            hover: isDarkMode ? colors.primary : '#8b5cf6',
        },
        success: isDarkMode ? colors.greenAccent : '#10b981',
        warning: isDarkMode ? '#fbbf24' : '#f59e0b',
        error: isDarkMode ? colors.redAccent[500] : '#ef4444',
        info: isDarkMode ? colors.blueAccent : '#3b82f6',
    }), [isDarkMode, colors]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate total earnings
    const totalEarnings = useMemo(() => {
        return orders.reduce((total, order) => {
            if (order.paymentStatus === 'paid' || order.orderStatus === 'delivered') {
                return total + order.totalAmount;
            }
            return total;
        }, 0);
    }, [orders]);

    // Filter and search payments
    const filteredPayments = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = 
                order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.contactInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesPaymentStatus = 
                paymentFilter === 'all' || 
                (paymentFilter === 'paid' && (order.paymentStatus === 'paid' || order.orderStatus === 'delivered')) ||
                (paymentFilter === 'pending' && order.paymentStatus === 'pending' && order.orderStatus !== 'delivered');
            
            return matchesSearch && matchesPaymentStatus;
        });
    }, [orders, searchTerm, paymentFilter]);

    // Paginate payments
    const paginatedPayments = useMemo(() => {
        const startIndex = (page - 1) * paymentsPerPage;
        return filteredPayments.slice(startIndex, startIndex + paymentsPerPage);
    }, [filteredPayments, page, paymentsPerPage]);

    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const getPaymentStatusColor = (order) => {
        if (order.orderStatus === 'cancelled') return 'error';
        if (order.orderStatus === 'delivered' || order.paymentStatus === 'paid') return 'success';
        return 'warning';
    };

    const getPaymentStatus = (order) => {
        if (order.orderStatus === 'cancelled') return 'Cancelled';
        if (order.orderStatus === 'delivered' || order.paymentStatus === 'paid') return 'Paid';
        return 'Pending';
    };

    const pendingPayments = orders.filter(order => 
        order.paymentStatus === 'pending' && 
        order.orderStatus !== 'cancelled' && 
        order.orderStatus !== 'delivered'
    ).length;

    return (
        <Box 
            sx={{
                m: "20px",
                position: 'relative',
                minHeight: '85vh',
                // Hide all scrollbars
                '& *': {
                    scrollbarWidth: 'none !important',
                    msOverflowStyle: 'none !important',
                    '&::-webkit-scrollbar': {
                        display: 'none !important',
                    },
                },
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
            }}
        >
            {/* Animated Background Icons (only in light mode) */}
            {!isDarkMode && shoppingIcons.map((item, index) => {
                const animationType = index % 2 === 0 ? 'floatUpDown' : 'floatLeftRight';
                
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

            {/* Header Section */}
            <Slide direction="down" in={true} timeout={800}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box>
                        <Typography 
                            variant="h2" 
                            color={themeColors.text.primary}
                            fontWeight="bold" 
                            sx={{ mb: "5px" }}
                        >
                            PAYMENTS OVERVIEW
                        </Typography>
                        <Typography 
                            variant="h5" 
                            color={themeColors.primary}
                            fontWeight={500}
                        >
                            Track and manage your payments
                        </Typography>
                    </Box>
                    {/* Refresh Button */}
                    <Button
                        startIcon={<RefreshIcon />}
                        onClick={refreshPayments}
                        variant="outlined"
                        sx={{
                            borderColor: themeColors.primary,
                            color: themeColors.primary,
                            '&:hover': {
                                borderColor: themeColors.primaryDark,
                                backgroundColor: `${themeColors.primary}10`,
                            }
                        }}
                    >
                        Refresh
                    </Button>
                </Box>
            </Slide>

            {/* Payment Stats */}
            <Box
                display="grid"
                gridTemplateColumns={
                    isXlDevices
                        ? "repeat(12, 1fr)"
                        : isMdDevices
                        ? "repeat(6, 1fr)"
                        : "repeat(3, 1fr)"
                }
                gap="20px"
                mb={4}
            >
                <Box gridColumn="span 4">
                    <EnhancedStatCard
                        title="Total Earnings"
                        value={formatCurrency(totalEarnings)}
                        icon={<TrendingUp />}
                        color={themeColors.success}
                        index={0}
                        themeColors={themeColors}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />
                </Box>
                <Box gridColumn="span 4">
                    <EnhancedStatCard
                        title="Total Transactions"
                        value={orders.length.toString()}
                        icon={<Receipt />}
                        color={themeColors.info}
                        index={1}
                        themeColors={themeColors}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />
                </Box>
                <Box gridColumn="span 4">
                    <EnhancedStatCard
                        title="Pending Payments"
                        value={pendingPayments.toString()}
                        icon={<PaymentIcon />}
                        color={themeColors.warning}
                        index={2}
                        themeColors={themeColors}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />
                </Box>
            </Box>

            {/* Filters */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
                <Card
                    onMouseEnter={() => setIsHovered(prev => ({ ...prev, filters: true }))}
                    onMouseLeave={() => setIsHovered(prev => ({ ...prev, filters: false }))}
                    sx={{
                        mb: 3,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${isHovered.filters ? themeColors.border.hover : themeColors.border.default}`,
                        borderRadius: 4,
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: isHovered.filters ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: isHovered.filters 
                            ? isDarkMode
                                ? `0 15px 35px -10px ${colors.primary[900]}50`
                                : '0 15px 35px rgba(139, 92, 246, 0.12)'
                            : isDarkMode
                                ? undefined
                                : '0 8px 25px rgba(167, 139, 250, 0.08)',
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <EnhancedTextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search by order ID, customer name, or payment method..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: themeColors.text.secondary }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    themeColors={themeColors}
                                    isDarkMode={isDarkMode}
                                    colors={colors}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={paymentFilter}
                                        onChange={(e) => setPaymentFilter(e.target.value)}
                                        sx={{
                                            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                            borderRadius: 3,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.border.default}`,
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.border.hover}`,
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.primary}`,
                                            },
                                            '& .MuiSelect-select': {
                                                color: themeColors.text.primary
                                            }
                                        }}
                                    >
                                        <MenuItem value="all">All Payments</MenuItem>
                                        <MenuItem value="paid">Paid</MenuItem>
                                        <MenuItem value="pending">Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="body2" sx={{ 
                                    textAlign: { xs: 'left', md: 'right' },
                                    color: themeColors.text.secondary,
                                    fontWeight: 500
                                }}>
                                    Showing {paginatedPayments.length} of {filteredPayments.length} payments
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>

            {/* Payments List */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
                <Box>
                    {loading && orders.length === 0 ? (
                        <Card sx={{
                            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            border: `2px solid ${themeColors.border.default}`,
                            borderRadius: 4,
                            p: 4,
                            textAlign: 'center'
                        }}>
                            <CircularProgress sx={{ color: themeColors.primary, mb: 2 }} />
                            <Typography sx={{ color: themeColors.text.primary }}>
                                Loading payments...
                            </Typography>
                        </Card>
                    ) : filteredPayments.length === 0 ? (
                        <Card sx={{
                            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            border: `2px solid ${themeColors.border.default}`,
                            borderRadius: 4,
                            p: 6,
                            textAlign: 'center'
                        }}>
                            <PaymentIcon sx={{ 
                                fontSize: 64, 
                                color: themeColors.text.secondary, 
                                mb: 2, 
                                opacity: 0.5 
                            }} />
                            <Typography variant="h6" sx={{ color: themeColors.text.primary, mb: 1 }}>
                                No payments found
                            </Typography>
                            <Typography variant="body2" color={themeColors.text.secondary}>
                                {searchTerm || paymentFilter !== 'all' ? 
                                    'Try adjusting your search or filter criteria' : 
                                    'Payments will appear here once orders are placed'}
                            </Typography>
                        </Card>
                    ) : (
                        <Box>
                            {/* Payment List Items */}
                            {paginatedPayments.map((order, index) => (
                                <PaymentListItem
                                    key={order._id}
                                    order={order}
                                    index={index}
                                    themeColors={themeColors}
                                    isDarkMode={isDarkMode}
                                    getPaymentStatus={getPaymentStatus}
                                    getPaymentStatusColor={getPaymentStatusColor}
                                    formatDate={formatDate}
                                    formatCurrency={formatCurrency}
                                />
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    mt: 4
                                }}>
                                    <Card sx={{
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        border: `2px solid ${themeColors.border.default}`,
                                        borderRadius: 4,
                                        p: 2
                                    }}>
                                        <Pagination
                                            count={totalPages}
                                            page={page}
                                            onChange={handlePageChange}
                                            showFirstButton
                                            showLastButton
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    color: themeColors.text.primary,
                                                    borderColor: themeColors.border.default,
                                                    '&:hover': {
                                                        backgroundColor: themeColors.background.hover,
                                                        borderColor: themeColors.primary
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: themeColors.primary,
                                                        color: 'white',
                                                        borderColor: themeColors.primary,
                                                        '&:hover': {
                                                            backgroundColor: themeColors.primaryDark,
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </Card>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Fade>
        </Box>
    );
};

export default Payments;
