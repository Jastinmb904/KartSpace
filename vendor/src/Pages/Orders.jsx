// import React, { useContext, useEffect, useState, useMemo } from 'react';
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
//     MenuItem,
//     Select,
//     FormControl,
//     Grid,
//     Divider,
//     Pagination,
//     TextField,
//     InputAdornment,
//     Collapse,
//     IconButton,
//     Card,
//     CardContent,
//     Stack,
//     Tabs,
//     Tab
// } from '@mui/material';
// import {
//     Search as SearchIcon,
//     ExpandMore as ExpandMoreIcon,
//     ExpandLess as ExpandLessIcon,
//     Receipt as ReceiptIcon
// } from '@mui/icons-material';

// const Orders = () => {
//     const { orders, getOrders, updateOrderStatus, loading } = useContext(VendorContext);
    
//     // Pagination and filtering states
//     const [page, setPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [expandedOrders, setExpandedOrders] = useState(new Set());
//     const [ordersPerPage] = useState(10); // Configurable items per page

//     useEffect(() => {
//         getOrders();
//     }, []);

//     // Filter and search orders
//     const filteredOrders = useMemo(() => {
//         return orders.filter(order => {
//             const matchesSearch = 
//                 order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 order.contactInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 order.contactInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase());
            
//             const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
            
//             return matchesSearch && matchesStatus;
//         });
//     }, [orders, searchTerm, statusFilter]);

//     // Paginated orders
//     const paginatedOrders = useMemo(() => {
//         const startIndex = (page - 1) * ordersPerPage;
//         return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
//     }, [filteredOrders, page, ordersPerPage]);

//     const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//         // Reset expanded orders when changing pages
//         setExpandedOrders(new Set());
//     };

//     const handleStatusChange = async (orderId, newStatus) => {
//         try {
//             await updateOrderStatus(orderId, newStatus);
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };

//     const toggleOrderExpansion = (orderId) => {
//         const newExpanded = new Set(expandedOrders);
//         if (newExpanded.has(orderId)) {
//             newExpanded.delete(orderId);
//         } else {
//             newExpanded.add(orderId);
//         }
//         setExpandedOrders(newExpanded);
//     };

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

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'pending': return 'warning';
//             case 'processing': return 'info';
//             case 'shipped': return 'primary';
//             case 'delivered': return 'success';
//             case 'cancelled': return 'error';
//             default: return 'default';
//         }
//     };

//     const getOrderSummary = (order) => {
//         const itemCount = order.items?.length || 0;
//         const itemText = itemCount === 1 ? 'item' : 'items';
//         return `${itemCount} ${itemText} • ₹${order.totalAmount}`;
//     };

//     const statusOptions = [
//         { value: 'all', label: 'All Orders' },
//         { value: 'pending', label: 'Pending' },
//         { value: 'processing', label: 'Processing' },
//         { value: 'shipped', label: 'Shipped' },
//         { value: 'delivered', label: 'Delivered' },
//         { value: 'cancelled', label: 'Cancelled' }
//     ];

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
//                     Orders Management
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     View and manage your orders • {filteredOrders.length} total orders
//                 </Typography>
//             </Paper>

//             {/* Filters and Search */}
//             <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             placeholder="Search by order ID, customer name, or email..."
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
//                                 value={statusFilter}
//                                 onChange={(e) => setStatusFilter(e.target.value)}
//                                 displayEmpty
//                             >
//                                 {statusOptions.map(option => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                         <Typography variant="body2" sx={{ textAlign: { xs: 'left', md: 'right' } }}>
//                             Showing {paginatedOrders.length} of {filteredOrders.length} orders
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Paper>

//             {loading ? (
//                 <Paper sx={{ p: 3, textAlign: 'center' }}>
//                     <Typography>Loading orders...</Typography>
//                 </Paper>
//             ) : filteredOrders.length === 0 ? (
//                 <Paper sx={{ p: 3, textAlign: 'center' }}>
//                     <ReceiptIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
//                     <Typography variant="h6" gutterBottom>
//                         {searchTerm || statusFilter !== 'all' ? 'No orders match your filters' : 'No orders found'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filter criteria' : 'Orders will appear here once customers place them'}
//                     </Typography>
//                 </Paper>
//             ) : (
//                 <>
//                     {/* Orders List */}
//                     <Stack spacing={2}>
//                         {paginatedOrders.map((order) => {
//                             const isExpanded = expandedOrders.has(order._id);
                            
//                             return (
//                                 <Card key={order._id} sx={{ borderRadius: 2, overflow: 'visible' }}>
//                                     {/* Compact Order Header */}
//                                     <CardContent sx={{ pb: 1 }}>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                                                 <Typography variant="h6" sx={{ fontSize: '1.1rem' }} noWrap>
//                                                     Order #{order._id}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     {order.contactInfo?.name || 'N/A'} • {formatDate(order.createdAt)}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     {getOrderSummary(order)}
//                                                 </Typography>
//                                             </Box>

//                                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
//                                                 {/* Payment Status */}
//                                                 {order.orderStatus === 'delivered' || order.paymentMethod === 'UPI' ? (
//                                                     <Chip label="Paid" color="success" size="small" />
//                                                 ) : order.orderStatus === 'cancelled' ? (
//                                                     <Chip label="Cancelled" color="error" size="small" />
//                                                 ) : (
//                                                     <Chip label="Payment Pending" color="warning" size="small" />
//                                                 )}

//                                                 {/* Order Status */}
//                                                 {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' ? (
//                                                     <FormControl size="small" sx={{ minWidth: 120 }}>
//                                                         <Select
//                                                             value={order.orderStatus}
//                                                             onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                                                             size="small"
//                                                         >
//                                                             <MenuItem value="pending">Pending</MenuItem>
//                                                             <MenuItem value="processing">Processing</MenuItem>
//                                                             <MenuItem value="shipped">Shipped</MenuItem>
//                                                             <MenuItem value="delivered">Delivered</MenuItem>
//                                                             <MenuItem value="cancelled">Cancelled</MenuItem>
//                                                         </Select>
//                                                     </FormControl>
//                                                 ) : (
//                                                     <Chip
//                                                         label={order.orderStatus}
//                                                         color={getStatusColor(order.orderStatus)}
//                                                         size="small"
//                                                         sx={{ textTransform: 'capitalize' }}
//                                                     />
//                                                 )}

//                                                 {/* Expand Button */}
//                                                 <IconButton
//                                                     onClick={() => toggleOrderExpansion(order._id)}
//                                                     size="small"
//                                                 >
//                                                     {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                                                 </IconButton>
//                                             </Box>
//                                         </Box>
//                                     </CardContent>

//                                     {/* Expandable Details */}
//                                     <Collapse in={isExpanded}>
//                                         <Divider />
//                                         <CardContent sx={{ pt: 2 }}>
//                                             <Grid container spacing={2}>
//                                                 {/* Customer Information */}
//                                                 <Grid item xs={12} md={4}>
//                                                     <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
//                                                         Customer Details
//                                                     </Typography>
//                                                     <Typography variant="body2"><strong>Name:</strong> {order.contactInfo.name || 'N/A'}</Typography>
//                                                     <Typography variant="body2"><strong>Email:</strong> {order.contactInfo.email || 'N/A'}</Typography>
//                                                     <Typography variant="body2"><strong>Phone:</strong> {order.contactInfo.phone || 'N/A'}</Typography>
//                                                 </Grid>

//                                                 {/* Shipping Information */}
//                                                 <Grid item xs={12} md={4}>
//                                                     <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
//                                                         Shipping Address
//                                                     </Typography>
//                                                     <Typography variant="body2">{order.shippingAddress.street || 'N/A'}</Typography>
//                                                     <Typography variant="body2">
//                                                         {order.shippingAddress.city && order.shippingAddress.state ? 
//                                                             `${order.shippingAddress.city}, ${order.shippingAddress.state}` : 'N/A'}
//                                                     </Typography>
//                                                     <Typography variant="body2">{order.shippingAddress.pincode || 'N/A'}</Typography>
//                                                     <Typography variant="body2">{order.shippingAddress.country}</Typography>
//                                                 </Grid>

//                                                 {/* Order Summary */}
//                                                 <Grid item xs={12} md={4}>
//                                                     <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
//                                                         Order Summary
//                                                     </Typography>
//                                                     <Typography variant="body2"><strong>Payment:</strong> {order.paymentMethod}</Typography>
//                                                     <Typography variant="body2"><strong>Created:</strong> {formatDate(order.createdAt)}</Typography>
//                                                     <Typography variant="body2"><strong>Updated:</strong> {formatDate(order.updatedAt)}</Typography>
//                                                     <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
//                                                         <strong>Total: ₹{order.totalAmount}</strong>
//                                                     </Typography>
//                                                 </Grid>

//                                                 {/* Order Items */}
//                                                 <Grid item xs={12}>
//                                                     <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
//                                                         Order Items
//                                                     </Typography>
//                                                     <TableContainer component={Paper} variant="outlined">
//                                                         <Table size="small">
//                                                             <TableHead>
//                                                                 <TableRow>
//                                                                     <TableCell>Product Name</TableCell>
//                                                                     <TableCell align="center">Quantity</TableCell>
//                                                                     <TableCell align="right">Price</TableCell>
//                                                                     <TableCell align="right">Total</TableCell>
//                                                                 </TableRow>
//                                                             </TableHead>
//                                                             <TableBody>
//                                                                 {order.items.map((item) => (
//                                                                     <TableRow key={item._id}>
//                                                                         <TableCell>{item.product?.name || 'N/A'}</TableCell>
//                                                                         <TableCell align="center">{item.quantity}</TableCell>
//                                                                         <TableCell align="right">₹{item.price}</TableCell>
//                                                                         <TableCell align="right">₹{item.price * item.quantity}</TableCell>
//                                                                     </TableRow>
//                                                                 ))}
//                                                             </TableBody>
//                                                         </Table>
//                                                     </TableContainer>
//                                                 </Grid>
//                                             </Grid>
//                                         </CardContent>
//                                     </Collapse>
//                                 </Card>
//                             );
//                         })}
//                     </Stack>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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
//                 </>
//             )}
//         </Box>
//     );
// };

// export default Orders;




// import React, { useContext, useEffect, useState, useMemo, memo } from 'react';
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
//     MenuItem,
//     Select,
//     FormControl,
//     Grid,
//     Divider,
//     Pagination,
//     TextField,
//     InputAdornment,
//     Collapse,
//     IconButton,
//     Card,
//     CardContent,
//     Stack,
//     useTheme,
//     useMediaQuery,
//     Fade,
//     Slide,
//     CircularProgress,
//     Tooltip,
//     Avatar
// } from '@mui/material';
// import {
//     Search as SearchIcon,
//     ExpandMore as ExpandMoreIcon,
//     ExpandLess as ExpandLessIcon,
//     Receipt as ReceiptIcon,
//     ShoppingBag,
//     LocalShipping,
//     Payment,
//     Assignment,
//     Store,
//     LocalMall,
//     CardGiftcard,
//     ShoppingCart,
//     Inventory
// } from '@mui/icons-material';
// import { tokens } from '../theme';

// // Enhanced TextField Component
// const EnhancedTextField = memo(({ themeColors, isDarkMode, colors, ...props }) => {
//     const [fieldHovered, setFieldHovered] = useState(false);
//     const [fieldFocused, setFieldFocused] = useState(false);
    
//     return (
//         <Box 
//             position="relative"
//             onMouseEnter={() => setFieldHovered(true)}
//             onMouseLeave={() => setFieldHovered(false)}
//         >
//             <TextField
//                 {...props}
//                 onFocus={(e) => {
//                     setFieldFocused(true);
//                     props.onFocus?.(e);
//                 }}
//                 onBlur={(e) => {
//                     setFieldFocused(false);
//                     props.onBlur?.(e);
//                 }}
//                 sx={{
//                     '& .MuiOutlinedInput-root': {
//                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                         backdropFilter: 'blur(10px)',
//                         borderRadius: 3,
//                         transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                         transform: fieldHovered || fieldFocused ? 'scale(1.01)' : 'scale(1)',
//                         boxShadow: fieldHovered || fieldFocused
//                             ? isDarkMode
//                                 ? `0 7px 22px ${colors.primary[900]}35`
//                                 : '0 7px 22px rgba(139, 92, 246, 0.12)'
//                             : isDarkMode
//                                 ? `0 4px 12px ${colors.primary[900]}25`
//                                 : '0 4px 12px rgba(167, 139, 250, 0.09)',
//                         '& fieldset': {
//                             border: `2px solid ${fieldFocused ? themeColors.primary : fieldHovered ? themeColors.border.hover : themeColors.border.default}`,
//                             transition: 'all 0.3s ease',
//                         },
//                         '&:hover fieldset': {
//                             border: `2px solid ${themeColors.border.hover}`,
//                         },
//                         '&.Mui-focused fieldset': {
//                             border: `2px solid ${themeColors.primary}`,
//                             boxShadow: `0 0 0 3px ${themeColors.primary}20`,
//                         },
//                     },
//                     '& .MuiInputLabel-root': {
//                         color: themeColors.text.secondary,
//                         fontWeight: 500,
//                         '&.Mui-focused': {
//                             color: themeColors.primary,
//                             fontWeight: 600,
//                         },
//                     },
//                     '& .MuiOutlinedInput-input': {
//                         color: themeColors.text.primary,
//                         fontWeight: 500,
//                         scrollbarWidth: 'none',
//                         msOverflowStyle: 'none',
//                         '&::-webkit-scrollbar': {
//                             display: 'none',
//                         },
//                     },
//                     ...props.sx
//                 }}
//             />
//         </Box>
//     );
// });

// // Enhanced Order Card Component
// const EnhancedOrderCard = memo(({ order, themeColors, isDarkMode, colors, isExpanded, onToggleExpand, onStatusChange, formatDate, getStatusColor, getOrderSummary }) => {
//     const [isCardHovered, setIsCardHovered] = useState(false);
    
//     return (
//         <Card
//             onMouseEnter={() => setIsCardHovered(true)}
//             onMouseLeave={() => setIsCardHovered(false)}
//             sx={{
//                 background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                 backdropFilter: 'blur(10px)',
//                 border: `2px solid ${isCardHovered ? themeColors.border.hover : themeColors.border.default}`,
//                 borderRadius: 4,
//                 overflow: 'visible',
//                 position: 'relative',
//                 transform: isCardHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
//                 transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                 boxShadow: isCardHovered 
//                     ? isDarkMode
//                         ? `0 15px 35px -10px ${colors.primary[900]}50`
//                         : '0 15px 35px rgba(139, 92, 246, 0.12), 0 8px 18px rgba(139, 92, 246, 0.08)'
//                     : isDarkMode
//                         ? undefined
//                         : '0 8px 25px rgba(167, 139, 250, 0.08), 0 4px 12px rgba(167, 139, 250, 0.04)',
//                 backgroundImage: !isDarkMode && `
//                     radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//                     radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
//                     radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
//                 `,
//                 '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: '3px',
//                     background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//                     animation: 'shimmer 2s ease-in-out infinite',
//                 },
//                 '@keyframes shimmer': {
//                     '0%': { backgroundPosition: '-200% 0' },
//                     '100%': { backgroundPosition: '200% 0' }
//                 }
//             }}
//         >
//             {/* Compact Order Header */}
//             <CardContent sx={{ pb: 1 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <Box sx={{ flex: 1, minWidth: 0 }}>
//                         <Typography 
//                             variant="h6" 
//                             sx={{ 
//                                 fontSize: '1.1rem',
//                                 color: themeColors.text.primary,
//                                 fontWeight: 600,
//                                 mb: 0.5
//                             }} 
//                             noWrap
//                         >
//                             Order #{order._id.slice(-8)}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: themeColors.text.secondary, mb: 0.5 }}>
//                             {order.contactInfo?.name || 'N/A'} • {formatDate(order.createdAt)}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
//                             {getOrderSummary(order)}
//                         </Typography>
//                     </Box>

//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
//                         {/* Payment Status */}
//                         {order.orderStatus === 'delivered' || order.paymentMethod === 'UPI' ? (
//                             <Chip 
//                                 label="Paid" 
//                                 size="small" 
//                                 sx={{
//                                     backgroundColor: `${themeColors.success}15`,
//                                     borderColor: themeColors.success,
//                                     color: themeColors.success,
//                                     fontWeight: 600,
//                                     border: `1px solid ${themeColors.success}`
//                                 }}
//                             />
//                         ) : order.orderStatus === 'cancelled' ? (
//                             <Chip 
//                                 label="Cancelled" 
//                                 size="small" 
//                                 sx={{
//                                     backgroundColor: `${themeColors.error}15`,
//                                     borderColor: themeColors.error,
//                                     color: themeColors.error,
//                                     fontWeight: 600,
//                                     border: `1px solid ${themeColors.error}`
//                                 }}
//                             />
//                         ) : (
//                             <Chip 
//                                 label="Payment Pending" 
//                                 size="small" 
//                                 sx={{
//                                     backgroundColor: `${themeColors.warning}15`,
//                                     borderColor: themeColors.warning,
//                                     color: themeColors.warning,
//                                     fontWeight: 600,
//                                     border: `1px solid ${themeColors.warning}`
//                                 }}
//                             />
//                         )}

//                         {/* Order Status */}
//                         {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' ? (
//                             <FormControl size="small" sx={{ minWidth: 120 }}>
//                                 <Select
//                                     value={order.orderStatus}
//                                     onChange={(e) => onStatusChange(order._id, e.target.value)}
//                                     size="small"
//                                     sx={{
//                                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                                         borderRadius: 2,
//                                         '& .MuiOutlinedInput-notchedOutline': {
//                                             border: `2px solid ${themeColors.border.default}`,
//                                         },
//                                         '&:hover .MuiOutlinedInput-notchedOutline': {
//                                             border: `2px solid ${themeColors.border.hover}`,
//                                         },
//                                         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                             border: `2px solid ${themeColors.primary}`,
//                                         },
//                                         '& .MuiSelect-select': {
//                                             color: themeColors.text.primary,
//                                             fontWeight: 500
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="pending">Pending</MenuItem>
//                                     <MenuItem value="processing">Processing</MenuItem>
//                                     <MenuItem value="shipped">Shipped</MenuItem>
//                                     <MenuItem value="delivered">Delivered</MenuItem>
//                                     <MenuItem value="cancelled">Cancelled</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         ) : (
//                             <Chip
//                                 label={order.orderStatus}
//                                 size="small"
//                                 sx={{
//                                     textTransform: 'capitalize',
//                                     fontWeight: 600,
//                                     backgroundColor: getStatusColor(order.orderStatus) === 'success' 
//                                         ? `${themeColors.success}15`
//                                         : getStatusColor(order.orderStatus) === 'error'
//                                             ? `${themeColors.error}15`
//                                             : getStatusColor(order.orderStatus) === 'warning'
//                                                 ? `${themeColors.warning}15`
//                                                 : `${themeColors.info}15`,
//                                     borderColor: getStatusColor(order.orderStatus) === 'success' 
//                                         ? themeColors.success
//                                         : getStatusColor(order.orderStatus) === 'error'
//                                             ? themeColors.error
//                                             : getStatusColor(order.orderStatus) === 'warning'
//                                                 ? themeColors.warning
//                                                 : themeColors.info,
//                                     color: getStatusColor(order.orderStatus) === 'success' 
//                                         ? themeColors.success
//                                         : getStatusColor(order.orderStatus) === 'error'
//                                             ? themeColors.error
//                                             : getStatusColor(order.orderStatus) === 'warning'
//                                                 ? themeColors.warning
//                                                 : themeColors.info,
//                                     border: `1px solid ${getStatusColor(order.orderStatus) === 'success' 
//                                         ? themeColors.success
//                                         : getStatusColor(order.orderStatus) === 'error'
//                                             ? themeColors.error
//                                             : getStatusColor(order.orderStatus) === 'warning'
//                                                 ? themeColors.warning
//                                                 : themeColors.info}`
//                                 }}
//                             />
//                         )}

//                         {/* Expand Button */}
//                         <Tooltip title={isExpanded ? "Collapse details" : "Expand details"}>
//                             <IconButton
//                                 onClick={() => onToggleExpand(order._id)}
//                                 size="small"
//                                 sx={{
//                                     color: themeColors.primary,
//                                     backgroundColor: `${themeColors.primary}15`,
//                                     border: `1px solid ${themeColors.primary}30`,
//                                     transition: 'all 0.3s ease',
//                                     '&:hover': {
//                                         backgroundColor: `${themeColors.primary}25`,
//                                         transform: 'scale(1.1)',
//                                         borderColor: themeColors.primary
//                                     }
//                                 }}
//                             >
//                                 {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </Box>
//             </CardContent>

//             {/* Expandable Details */}
//             <Collapse in={isExpanded}>
//                 <Divider sx={{ borderColor: themeColors.border.default }} />
//                 <CardContent sx={{ pt: 2 }}>
//                     <Grid container spacing={3}>
//                         {/* Customer Information */}
//                         <Grid item xs={12} md={4}>
//                             <Typography 
//                                 variant="subtitle2" 
//                                 gutterBottom 
//                                 sx={{ 
//                                     fontWeight: 600,
//                                     color: themeColors.primary,
//                                     fontSize: '1rem',
//                                     mb: 1.5,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 1
//                                 }}
//                             >
//                                 <Assignment fontSize="small" />
//                                 Customer Details
//                             </Typography>
//                             <Box sx={{ pl: 1 }}>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
//                                     <strong>Name:</strong> {order.contactInfo.name || 'N/A'}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
//                                     <strong>Email:</strong> {order.contactInfo.email || 'N/A'}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
//                                     <strong>Phone:</strong> {order.contactInfo.phone || 'N/A'}
//                                 </Typography>
//                             </Box>
//                         </Grid>

//                         {/* Shipping Information */}
//                         <Grid item xs={12} md={4}>
//                             <Typography 
//                                 variant="subtitle2" 
//                                 gutterBottom 
//                                 sx={{ 
//                                     fontWeight: 600,
//                                     color: themeColors.primary,
//                                     fontSize: '1rem',
//                                     mb: 1.5,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 1
//                                 }}
//                             >
//                                 <LocalShipping fontSize="small" />
//                                 Shipping Address
//                             </Typography>
//                             <Box sx={{ pl: 1 }}>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
//                                     {order.shippingAddress.street || 'N/A'}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
//                                     {order.shippingAddress.city && order.shippingAddress.state ? 
//                                         `${order.shippingAddress.city}, ${order.shippingAddress.state}` : 'N/A'}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
//                                     {order.shippingAddress.pincode || 'N/A'}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
//                                     {order.shippingAddress.country}
//                                 </Typography>
//                             </Box>
//                         </Grid>

//                         {/* Order Summary */}
//                         <Grid item xs={12} md={4}>
//                             <Typography 
//                                 variant="subtitle2" 
//                                 gutterBottom 
//                                 sx={{ 
//                                     fontWeight: 600,
//                                     color: themeColors.primary,
//                                     fontSize: '1rem',
//                                     mb: 1.5,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 1
//                                 }}
//                             >
//                                 <Payment fontSize="small" />
//                                 Order Summary
//                             </Typography>
//                             <Box sx={{ pl: 1 }}>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
//                                     <strong>Payment:</strong> {order.paymentMethod}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
//                                     <strong>Created:</strong> {formatDate(order.createdAt)}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 1 }}>
//                                     <strong>Updated:</strong> {formatDate(order.updatedAt)}
//                                 </Typography>
//                                 <Typography 
//                                     variant="body2" 
//                                     sx={{ 
//                                         fontWeight: 700,
//                                         color: themeColors.success,
//                                         fontSize: '1.1rem',
//                                         background: `${themeColors.success}15`,
//                                         padding: '8px 12px',
//                                         borderRadius: 2,
//                                         border: `1px solid ${themeColors.success}30`
//                                     }}
//                                 >
//                                     Total: ₹{order.totalAmount.toLocaleString('en-IN')}
//                                 </Typography>
//                             </Box>
//                         </Grid>

//                         {/* Order Items */}
//                         <Grid item xs={12}>
//                             <Typography 
//                                 variant="subtitle2" 
//                                 gutterBottom 
//                                 sx={{ 
//                                     fontWeight: 600,
//                                     color: themeColors.primary,
//                                     fontSize: '1rem',
//                                     mb: 1.5,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 1
//                                 }}
//                             >
//                                 <ShoppingBag fontSize="small" />
//                                 Order Items
//                             </Typography>
//                             <TableContainer 
//                                 component={Paper} 
//                                 variant="outlined"
//                                 sx={{
//                                     background: `linear-gradient(135deg, ${themeColors.background.secondary} 0%, ${themeColors.background.primary} 100%)`,
//                                     border: `1px solid ${themeColors.border.default}`,
//                                     borderRadius: 2,
//                                     overflow: 'hidden'
//                                 }}
//                             >
//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ 
//                                                 backgroundColor: `${themeColors.primary}10`,
//                                                 color: themeColors.text.primary,
//                                                 fontWeight: 600
//                                             }}>
//                                                 Product Name
//                                             </TableCell>
//                                             <TableCell align="center" sx={{ 
//                                                 backgroundColor: `${themeColors.primary}10`,
//                                                 color: themeColors.text.primary,
//                                                 fontWeight: 600
//                                             }}>
//                                                 Quantity
//                                             </TableCell>
//                                             <TableCell align="right" sx={{ 
//                                                 backgroundColor: `${themeColors.primary}10`,
//                                                 color: themeColors.text.primary,
//                                                 fontWeight: 600
//                                             }}>
//                                                 Price
//                                             </TableCell>
//                                             <TableCell align="right" sx={{ 
//                                                 backgroundColor: `${themeColors.primary}10`,
//                                                 color: themeColors.text.primary,
//                                                 fontWeight: 600
//                                             }}>
//                                                 Total
//                                             </TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {order.items.map((item, index) => (
//                                             <TableRow 
//                                                 key={item._id}
//                                                 sx={{
//                                                     '&:hover': {
//                                                         backgroundColor: themeColors.background.hover,
//                                                     },
//                                                     '&:last-child td': { border: 0 }
//                                                 }}
//                                             >
//                                                 <TableCell sx={{ color: themeColors.text.primary }}>
//                                                     {item.product?.name || 'N/A'}
//                                                 </TableCell>
//                                                 <TableCell align="center" sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
//                                                     {item.quantity}
//                                                 </TableCell>
//                                                 <TableCell align="right" sx={{ color: themeColors.success, fontWeight: 600 }}>
//                                                     ₹{item.price.toLocaleString('en-IN')}
//                                                 </TableCell>
//                                                 <TableCell align="right" sx={{ color: themeColors.success, fontWeight: 600 }}>
//                                                     ₹{(item.price * item.quantity).toLocaleString('en-IN')}
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Collapse>
//         </Card>
//     );
// });

// const Orders = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const isXlDevices = useMediaQuery("(min-width: 1260px)");
//     const isMdDevices = useMediaQuery("(min-width: 724px)");
//     const isDarkMode = theme.palette.mode === 'dark';

//     const { orders, getOrders, updateOrderStatus, loading } = useContext(VendorContext);
    
//     // Pagination and filtering states
//     const [page, setPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [expandedOrders, setExpandedOrders] = useState(new Set());
//     const [ordersPerPage] = useState(10);
//     const [isHovered, setIsHovered] = useState({});

//     // Shopping icons for background animation (only in light mode)
//     const shoppingIcons = [
//         { Icon: ShoppingBag, delay: '0s', duration: '12s', x: '8%', y: '15%' },
//         { Icon: LocalShipping, delay: '3s', duration: '15s', x: '85%', y: '25%' },
//         { Icon: ReceiptIcon, delay: '1s', duration: '18s', x: '10%', y: '70%' },
//         { Icon: Assignment, delay: '4s', duration: '14s', x: '80%', y: '65%' },
//         { Icon: Payment, delay: '6s', duration: '16s', x: '15%', y: '45%' },
//     ];

//     // Define consistent color scheme matching Dashboard
//     const themeColors = useMemo(() => ({
//         primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
//         primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
//         primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
//         text: {
//             primary: isDarkMode ? colors.gray[100] : '#1f2937',
//             secondary: isDarkMode ? colors.gray[300] : '#6b7280',
//             accent: isDarkMode ? colors.gray[200] : '#374151',
//         },
//         background: {
//             primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
//             secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
//             hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
//         },
//         border: {
//             default: isDarkMode ? colors.primary[600] : '#a78bfa',
//             hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
//         },
//         success: isDarkMode ? colors.greenAccent[500] : '#10b981',
//         warning: isDarkMode ? '#fbbf24' : '#f59e0b',
//         error: isDarkMode ? colors.redAccent[500] : '#ef4444',
//         info: isDarkMode ? colors.blueAccent[500] : '#3b82f6',
//     }), [isDarkMode, colors]);

//     useEffect(() => {
//         getOrders();
//     }, []);

//     // Filter and search orders
//     const filteredOrders = useMemo(() => {
//         return orders.filter(order => {
//             const matchesSearch = 
//                 order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 order.contactInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 order.contactInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase());
            
//             const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
            
//             return matchesSearch && matchesStatus;
//         });
//     }, [orders, searchTerm, statusFilter]);

//     // Paginated orders
//     const paginatedOrders = useMemo(() => {
//         const startIndex = (page - 1) * ordersPerPage;
//         return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
//     }, [filteredOrders, page, ordersPerPage]);

//     const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//         setExpandedOrders(new Set());
//     };

//     const handleStatusChange = async (orderId, newStatus) => {
//         try {
//             await updateOrderStatus(orderId, newStatus);
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };

//     const toggleOrderExpansion = (orderId) => {
//         const newExpanded = new Set(expandedOrders);
//         if (newExpanded.has(orderId)) {
//             newExpanded.delete(orderId);
//         } else {
//             newExpanded.add(orderId);
//         }
//         setExpandedOrders(newExpanded);
//     };

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

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'pending': return 'warning';
//             case 'processing': return 'info';
//             case 'shipped': return 'primary';
//             case 'delivered': return 'success';
//             case 'cancelled': return 'error';
//             default: return 'default';
//         }
//     };

//     const getOrderSummary = (order) => {
//         const itemCount = order.items?.length || 0;
//         const itemText = itemCount === 1 ? 'item' : 'items';
//         return `${itemCount} ${itemText} • ₹${order.totalAmount.toLocaleString('en-IN')}`;
//     };

//     const statusOptions = [
//         { value: 'all', label: 'All Orders' },
//         { value: 'pending', label: 'Pending' },
//         { value: 'processing', label: 'Processing' },
//         { value: 'shipped', label: 'Shipped' },
//         { value: 'delivered', label: 'Delivered' },
//         { value: 'cancelled', label: 'Cancelled' }
//     ];

//     return (
//         <Box 
//             sx={{
//                 m: "20px",
//                 position: 'relative',
//                 minHeight: '85vh',
//                 // Hide all scrollbars
//                 '& *': {
//                     scrollbarWidth: 'none !important',
//                     msOverflowStyle: 'none !important',
//                     '&::-webkit-scrollbar': {
//                         display: 'none !important',
//                     },
//                 },
//                 '&::before': !isDarkMode && {
//                     content: '""',
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: `
//                         radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
//                         radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
//                         radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
//                         linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
//                     `,
//                     zIndex: -2,
//                     pointerEvents: 'none',
//                 },
//                 '@keyframes floatUpDown': {
//                     '0%': { transform: 'translateY(0px) rotate(0deg)' },
//                     '25%': { transform: 'translateY(-15px) rotate(5deg)' },
//                     '50%': { transform: 'translateY(-30px) rotate(-3deg)' },
//                     '75%': { transform: 'translateY(-15px) rotate(8deg)' },
//                     '100%': { transform: 'translateY(0px) rotate(0deg)' }
//                 },
//                 '@keyframes floatLeftRight': {
//                     '0%': { transform: 'translateX(0px) rotate(0deg)' },
//                     '33%': { transform: 'translateX(20px) rotate(10deg)' },
//                     '66%': { transform: 'translateX(-10px) rotate(-5deg)' },
//                     '100%': { transform: 'translateX(0px) rotate(0deg)' }
//                 },
//             }}
//         >
//             {/* Animated Background Icons (only in light mode) */}
//             {!isDarkMode && shoppingIcons.map((item, index) => {
//                 const animationType = index % 2 === 0 ? 'floatUpDown' : 'floatLeftRight';
                
//                 return (
//                     <item.Icon
//                         key={index}
//                         sx={{
//                             position: 'fixed',
//                             left: item.x,
//                             top: item.y,
//                             fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
//                             color: 'rgba(139, 92, 246, 0.08)',
//                             animation: `${animationType} ${item.duration} ease-in-out infinite`,
//                             animationDelay: item.delay,
//                             zIndex: -1,
//                             pointerEvents: 'none',
//                             filter: 'blur(0.5px)',
//                         }}
//                     />
//                 );
//             })}

//             {/* Header Section */}
//             <Slide direction="down" in={true} timeout={800}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//                     <Box>
//                         <Typography 
//                             variant="h2" 
//                             color={themeColors.text.primary}
//                             fontWeight="bold" 
//                             sx={{ mb: "5px" }}
//                         >
//                             ORDERS MANAGEMENT
//                         </Typography>
//                         <Typography 
//                             variant="h5" 
//                             color={themeColors.primary}
//                             fontWeight={500}
//                         >
//                             View and manage your orders • {filteredOrders.length} total orders
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Slide>

//             {/* Filters and Search */}
//             <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
//                 <Card
//                     onMouseEnter={() => setIsHovered(prev => ({ ...prev, filters: true }))}
//                     onMouseLeave={() => setIsHovered(prev => ({ ...prev, filters: false }))}
//                     sx={{
//                         mb: 3,
//                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                         backdropFilter: 'blur(10px)',
//                         border: `2px solid ${isHovered.filters ? themeColors.border.hover : themeColors.border.default}`,
//                         borderRadius: 4,
//                         transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                         transform: isHovered.filters ? 'translateY(-2px)' : 'translateY(0)',
//                         boxShadow: isHovered.filters 
//                             ? isDarkMode
//                                 ? `0 15px 35px -10px ${colors.primary[900]}50`
//                                 : '0 15px 35px rgba(139, 92, 246, 0.12)'
//                             : isDarkMode
//                                 ? undefined
//                                 : '0 8px 25px rgba(167, 139, 250, 0.08)',
//                     }}
//                 >
//                     <CardContent sx={{ p: 3 }}>
//                         <Grid container spacing={3} alignItems="center">
//                             <Grid item xs={12} md={6}>
//                                 <EnhancedTextField
//                                     fullWidth
//                                     size="small"
//                                     placeholder="Search by order ID, customer name, or email..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     InputProps={{
//                                         startAdornment: (
//                                             <InputAdornment position="start">
//                                                 <SearchIcon sx={{ color: themeColors.text.secondary }} />
//                                             </InputAdornment>
//                                         ),
//                                     }}
//                                     themeColors={themeColors}
//                                     isDarkMode={isDarkMode}
//                                     colors={colors}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <FormControl fullWidth size="small">
//                                     <Select
//                                         value={statusFilter}
//                                         onChange={(e) => setStatusFilter(e.target.value)}
//                                         displayEmpty
//                                         sx={{
//                                             background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                                             borderRadius: 3,
//                                             '& .MuiOutlinedInput-notchedOutline': {
//                                                 border: `2px solid ${themeColors.border.default}`,
//                                             },
//                                             '&:hover .MuiOutlinedInput-notchedOutline': {
//                                                 border: `2px solid ${themeColors.border.hover}`,
//                                             },
//                                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                                 border: `2px solid ${themeColors.primary}`,
//                                             },
//                                             '& .MuiSelect-select': {
//                                                 color: themeColors.text.primary
//                                             }
//                                         }}
//                                     >
//                                         {statusOptions.map(option => (
//                                             <MenuItem key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <Typography variant="body2" sx={{ 
//                                     textAlign: { xs: 'left', md: 'right' },
//                                     color: themeColors.text.secondary,
//                                     fontWeight: 500
//                                 }}>
//                                     Showing {paginatedOrders.length} of {filteredOrders.length} orders
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                     </CardContent>
//                 </Card>
//             </Fade>

//             {/* Orders Content */}
//             {loading ? (
//                 <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
//                     <Card sx={{
//                         p: 4,
//                         textAlign: 'center',
//                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                         backdropFilter: 'blur(10px)',
//                         border: `2px solid ${themeColors.border.default}`,
//                         borderRadius: 4,
//                     }}>
//                         <CircularProgress sx={{ color: themeColors.primary, mb: 2 }} />
//                         <Typography sx={{ color: themeColors.text.primary }}>
//                             Loading orders...
//                         </Typography>
//                     </Card>
//                 </Fade>
//             ) : filteredOrders.length === 0 ? (
//                 <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
//                     <Card sx={{
//                         p: 6,
//                         textAlign: 'center',
//                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                         backdropFilter: 'blur(10px)',
//                         border: `2px solid ${themeColors.border.default}`,
//                         borderRadius: 4,
//                     }}>
//                         <ReceiptIcon sx={{ 
//                             fontSize: 64, 
//                             color: themeColors.text.secondary, 
//                             mb: 2, 
//                             opacity: 0.5 
//                         }} />
//                         <Typography variant="h6" gutterBottom sx={{ color: themeColors.text.primary }}>
//                             {searchTerm || statusFilter !== 'all' ? 'No orders match your filters' : 'No orders found'}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
//                             {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filter criteria' : 'Orders will appear here once customers place them'}
//                         </Typography>
//                     </Card>
//                 </Fade>
//             ) : (
//                 <>
//                     {/* Orders List */}
//                     <Stack spacing={3}>
//                         {paginatedOrders.map((order, index) => {
//                             const isExpanded = expandedOrders.has(order._id);
                            
//                             return (
//                                 <Fade key={order._id} in={true} timeout={800} style={{ transitionDelay: `${400 + index * 100}ms` }}>
//                                     <div>
//                                         <EnhancedOrderCard
//                                             order={order}
//                                             themeColors={themeColors}
//                                             isDarkMode={isDarkMode}
//                                             colors={colors}
//                                             isExpanded={isExpanded}
//                                             onToggleExpand={toggleOrderExpansion}
//                                             onStatusChange={handleStatusChange}
//                                             formatDate={formatDate}
//                                             getStatusColor={getStatusColor}
//                                             getOrderSummary={getOrderSummary}
//                                         />
//                                     </div>
//                                 </Fade>
//                             );
//                         })}
//                     </Stack>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
//                             <Box sx={{ 
//                                 display: 'flex', 
//                                 justifyContent: 'center', 
//                                 mt: 4,
//                                 p: 3,
//                                 background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                                 backdropFilter: 'blur(10px)',
//                                 border: `2px solid ${themeColors.border.default}`,
//                                 borderRadius: 4,
//                             }}>
//                                 <Pagination
//                                     count={totalPages}
//                                     page={page}
//                                     onChange={handlePageChange}
//                                     showFirstButton
//                                     showLastButton
//                                     sx={{
//                                         '& .MuiPaginationItem-root': {
//                                             color: themeColors.text.primary,
//                                             borderColor: themeColors.border.default,
//                                             '&:hover': {
//                                                 backgroundColor: themeColors.background.hover,
//                                                 borderColor: themeColors.primary
//                                             },
//                                             '&.Mui-selected': {
//                                                 backgroundColor: themeColors.primary,
//                                                 color: 'white',
//                                                 borderColor: themeColors.primary,
//                                                 '&:hover': {
//                                                     backgroundColor: themeColors.primaryDark,
//                                                 }
//                                             }
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                         </Fade>
//                     )}
//                 </>
//             )}
//         </Box>
//     );
// };

// export default Orders;





// 798888888


import React, { useContext, useEffect, useState, useMemo, memo } from 'react';
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
    Chip,
    MenuItem,
    Select,
    FormControl,
    Grid,
    Divider,
    Pagination,
    TextField,
    InputAdornment,
    Collapse,
    IconButton,
    Card,
    CardContent,
    Stack,
    useTheme,
    useMediaQuery,
    Fade,
    Slide,
    CircularProgress,
    Tooltip,
    Avatar
} from '@mui/material';
import {
    Search as SearchIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Receipt as ReceiptIcon,
    ShoppingBag,
    LocalShipping,
    Payment,
    Assignment,
    Store,
    LocalMall,
    CardGiftcard,
    ShoppingCart,
    Inventory
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

// Enhanced Order Card Component
const EnhancedOrderCard = memo(({ order, themeColors, isDarkMode, colors, isExpanded, onToggleExpand, onStatusChange, formatDate, getStatusColor, getOrderSummary }) => {
    const [isCardHovered, setIsCardHovered] = useState(false);
    
    return (
        <Card
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            sx={{
                background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `2px solid ${isCardHovered ? themeColors.border.hover : themeColors.border.default}`,
                borderRadius: 4,
                overflow: 'visible',
                position: 'relative',
                transform: isCardHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: isCardHovered 
                    ? isDarkMode
                        ? `0 15px 35px -10px ${colors.primary[900]}50`
                        : '0 15px 35px rgba(139, 92, 246, 0.12), 0 8px 18px rgba(139, 92, 246, 0.08)'
                    : isDarkMode
                        ? undefined
                        : '0 8px 25px rgba(167, 139, 250, 0.08), 0 4px 12px rgba(167, 139, 250, 0.04)',
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
                    height: '3px',
                    background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
                    animation: 'shimmer 2s ease-in-out infinite',
                },
                '@keyframes shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                }
            }}
        >
            {/* Compact Order Header */}
            <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontSize: '1.1rem',
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                mb: 0.5
                            }} 
                            noWrap
                        >
                            Order #{order._id.slice(-8)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary, mb: 0.5 }}>
                            {order.contactInfo?.name || 'N/A'} • {formatDate(order.createdAt)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            {getOrderSummary(order)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                        {/* Payment Status */}
                        {order.orderStatus === 'delivered' || order.paymentMethod === 'UPI' ? (
                            <Chip 
                                label="Paid" 
                                size="small" 
                                sx={{
                                    backgroundColor: `${themeColors.success}15`,
                                    borderColor: themeColors.success,
                                    color: themeColors.success,
                                    fontWeight: 600,
                                    border: `1px solid ${themeColors.success}`
                                }}
                            />
                        ) : order.orderStatus === 'cancelled' ? (
                            <Chip 
                                label="Cancelled" 
                                size="small" 
                                sx={{
                                    backgroundColor: `${themeColors.error}15`,
                                    borderColor: themeColors.error,
                                    color: themeColors.error,
                                    fontWeight: 600,
                                    border: `1px solid ${themeColors.error}`
                                }}
                            />
                        ) : (
                            <Chip 
                                label="Payment Pending" 
                                size="small" 
                                sx={{
                                    backgroundColor: `${themeColors.warning}15`,
                                    borderColor: themeColors.warning,
                                    color: themeColors.warning,
                                    fontWeight: 600,
                                    border: `1px solid ${themeColors.warning}`
                                }}
                            />
                        )}

                        {/* Order Status */}
                        {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' ? (
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                    value={order.orderStatus}
                                    onChange={(e) => onStatusChange(order._id, e.target.value)}
                                    size="small"
                                    sx={{
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        borderRadius: 2,
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
                                            color: themeColors.text.primary,
                                            fontWeight: 500
                                        }
                                    }}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="processing">Processing</MenuItem>
                                    <MenuItem value="shipped">Shipped</MenuItem>
                                    <MenuItem value="delivered">Delivered</MenuItem>
                                    <MenuItem value="cancelled">Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                        ) : (
                            <Chip
                                label={order.orderStatus}
                                size="small"
                                sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: 600,
                                    backgroundColor: getStatusColor(order.orderStatus) === 'success' 
                                        ? `${themeColors.success}15`
                                        : getStatusColor(order.orderStatus) === 'error'
                                            ? `${themeColors.error}15`
                                            : getStatusColor(order.orderStatus) === 'warning'
                                                ? `${themeColors.warning}15`
                                                : `${themeColors.info}15`,
                                    borderColor: getStatusColor(order.orderStatus) === 'success' 
                                        ? themeColors.success
                                        : getStatusColor(order.orderStatus) === 'error'
                                            ? themeColors.error
                                            : getStatusColor(order.orderStatus) === 'warning'
                                                ? themeColors.warning
                                                : themeColors.info,
                                    color: getStatusColor(order.orderStatus) === 'success' 
                                        ? themeColors.success
                                        : getStatusColor(order.orderStatus) === 'error'
                                            ? themeColors.error
                                            : getStatusColor(order.orderStatus) === 'warning'
                                                ? themeColors.warning
                                                : themeColors.info,
                                    border: `1px solid ${getStatusColor(order.orderStatus) === 'success' 
                                        ? themeColors.success
                                        : getStatusColor(order.orderStatus) === 'error'
                                            ? themeColors.error
                                            : getStatusColor(order.orderStatus) === 'warning'
                                                ? themeColors.warning
                                                : themeColors.info}`
                                }}
                            />
                        )}

                        {/* Expand Button */}
                        <Tooltip title={isExpanded ? "Collapse details" : "Expand details"}>
                            <IconButton
                                onClick={() => onToggleExpand(order._id)}
                                size="small"
                                sx={{
                                    color: themeColors.primary,
                                    backgroundColor: `${themeColors.primary}15`,
                                    border: `1px solid ${themeColors.primary}30`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: `${themeColors.primary}25`,
                                        transform: 'scale(1.1)',
                                        borderColor: themeColors.primary
                                    }
                                }}
                            >
                                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>

            {/* Expandable Details */}
            <Collapse in={isExpanded}>
                <Divider sx={{ borderColor: themeColors.border.default }} />
                <CardContent sx={{ pt: 2 }}>
                    <Grid container spacing={3}>
                        {/* Customer Information */}
                        <Grid item xs={12} md={4}>
                            <Typography 
                                variant="subtitle2" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 600,
                                    color: themeColors.primary,
                                    fontSize: '1rem',
                                    mb: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Assignment fontSize="small" />
                                Customer Details
                            </Typography>
                            <Box sx={{ pl: 1 }}>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
                                    <strong>Name:</strong> {order.contactInfo.name || 'N/A'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
                                    <strong>Email:</strong> {order.contactInfo.email || 'N/A'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                                    <strong>Phone:</strong> {order.contactInfo.phone || 'N/A'}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Shipping Information */}
                        <Grid item xs={12} md={4}>
                            <Typography 
                                variant="subtitle2" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 600,
                                    color: themeColors.primary,
                                    fontSize: '1rem',
                                    mb: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <LocalShipping fontSize="small" />
                                Shipping Address
                            </Typography>
                            <Box sx={{ pl: 1 }}>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
                                    {order.shippingAddress.street || 'N/A'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
                                    {order.shippingAddress.city && order.shippingAddress.state ? 
                                        `${order.shippingAddress.city}, ${order.shippingAddress.state}` : 'N/A'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
                                    {order.shippingAddress.pincode || 'N/A'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                                    {order.shippingAddress.country}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Order Summary */}
                        <Grid item xs={12} md={4}>
                            <Typography 
                                variant="subtitle2" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 600,
                                    color: themeColors.primary,
                                    fontSize: '1rem',
                                    mb: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Payment fontSize="small" />
                                Order Summary
                            </Typography>
                            <Box sx={{ pl: 1 }}>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
                                    <strong>Payment:</strong> {order.paymentMethod}
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 0.5 }}>
                                    <strong>Created:</strong> {formatDate(order.createdAt)}
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.text.primary, mb: 1 }}>
                                    <strong>Updated:</strong> {formatDate(order.updatedAt)}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: themeColors.success,
                                        fontSize: '1.1rem',
                                        background: `${themeColors.success}15`,
                                        padding: '8px 12px',
                                        borderRadius: 2,
                                        border: `1px solid ${themeColors.success}30`
                                    }}
                                >
                                    Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Order Items with Size Display */}
                        <Grid item xs={12}>
                            <Typography 
                                variant="subtitle2" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 600,
                                    color: themeColors.primary,
                                    fontSize: '1rem',
                                    mb: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <ShoppingBag fontSize="small" />
                                Order Items
                            </Typography>
                            <TableContainer 
                                component={Paper} 
                                variant="outlined"
                                sx={{
                                    background: `linear-gradient(135deg, ${themeColors.background.secondary} 0%, ${themeColors.background.primary} 100%)`,
                                    border: `1px solid ${themeColors.border.default}`,
                                    borderRadius: 2,
                                    overflow: 'hidden'
                                }}
                            >
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ 
                                                backgroundColor: `${themeColors.primary}10`,
                                                color: themeColors.text.primary,
                                                fontWeight: 600
                                            }}>
                                                Product Name
                                            </TableCell>
                                            <TableCell align="center" sx={{ 
                                                backgroundColor: `${themeColors.primary}10`,
                                                color: themeColors.text.primary,
                                                fontWeight: 600
                                            }}>
                                                Quantity
                                            </TableCell>
                                            {/* ✅ ADD SIZE COLUMN HEADER */}
                                            <TableCell align="center" sx={{ 
                                                backgroundColor: `${themeColors.primary}10`,
                                                color: themeColors.text.primary,
                                                fontWeight: 600
                                            }}>
                                                Size
                                            </TableCell>
                                            <TableCell align="right" sx={{ 
                                                backgroundColor: `${themeColors.primary}10`,
                                                color: themeColors.text.primary,
                                                fontWeight: 600
                                            }}>
                                                Price
                                            </TableCell>
                                            <TableCell align="right" sx={{ 
                                                backgroundColor: `${themeColors.primary}10`,
                                                color: themeColors.text.primary,
                                                fontWeight: 600
                                            }}>
                                                Total
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.items.map((item, index) => (
                                            <TableRow 
                                                key={item._id}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: themeColors.background.hover,
                                                    },
                                                    '&:last-child td': { border: 0 }
                                                }}
                                            >
                                                <TableCell sx={{ color: themeColors.text.primary }}>
                                                    {item.product?.name || 'N/A'}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
                                                    {item.quantity}
                                                </TableCell>
                                                {/* ✅ ADD SIZE DISPLAY COLUMN */}
                                                <TableCell align="center" sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
                                                    {item.selectedSize ? (
                                                        <Chip 
                                                            label={item.selectedSize} 
                                                            size="small" 
                                                            sx={{
                                                                backgroundColor: `${themeColors.primary}15`,
                                                                color: themeColors.primary,
                                                                fontWeight: 600,
                                                                border: `1px solid ${themeColors.primary}30`,
                                                                fontSize: '0.75rem',
                                                                height: '24px'
                                                            }}
                                                        />
                                                    ) : (
                                                        <Typography variant="body2" sx={{ color: themeColors.text.secondary, fontStyle: 'italic' }}>
                                                            N/A
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: themeColors.success, fontWeight: 600 }}>
                                                    ₹{item.price.toLocaleString('en-IN')}
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: themeColors.success, fontWeight: 600 }}>
                                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
});

const Orders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isDarkMode = theme.palette.mode === 'dark';

    const { orders, getOrders, updateOrderStatus, loading } = useContext(VendorContext);
    
    // Pagination and filtering states
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedOrders, setExpandedOrders] = useState(new Set());
    const [ordersPerPage] = useState(10);
    const [isHovered, setIsHovered] = useState({});

    // Shopping icons for background animation (only in light mode)
    const shoppingIcons = [
        { Icon: ShoppingBag, delay: '0s', duration: '12s', x: '8%', y: '15%' },
        { Icon: LocalShipping, delay: '3s', duration: '15s', x: '85%', y: '25%' },
        { Icon: ReceiptIcon, delay: '1s', duration: '18s', x: '10%', y: '70%' },
        { Icon: Assignment, delay: '4s', duration: '14s', x: '80%', y: '65%' },
        { Icon: Payment, delay: '6s', duration: '16s', x: '15%', y: '45%' },
    ];

    // Define consistent color scheme matching Dashboard
    const themeColors = useMemo(() => ({
        primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
        primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
        primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
        text: {
            primary: isDarkMode ? colors.gray[100] : '#1f2937',
            secondary: isDarkMode ? colors.gray[300] : '#6b7280',
            accent: isDarkMode ? colors.gray[200] : '#374151',
        },
        background: {
            primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
            secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
            hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
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

    useEffect(() => {
        getOrders();
    }, []);

    // Filter and search orders
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = 
                order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.contactInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.contactInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    // Paginated orders
    const paginatedOrders = useMemo(() => {
        const startIndex = (page - 1) * ordersPerPage;
        return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
    }, [filteredOrders, page, ordersPerPage]);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        setExpandedOrders(new Set());
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const toggleOrderExpansion = (orderId) => {
        const newExpanded = new Set(expandedOrders);
        if (newExpanded.has(orderId)) {
            newExpanded.delete(orderId);
        } else {
            newExpanded.add(orderId);
        }
        setExpandedOrders(newExpanded);
    };

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'processing': return 'info';
            case 'shipped': return 'primary';
            case 'delivered': return 'success';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const getOrderSummary = (order) => {
        const itemCount = order.items?.length || 0;
        const itemText = itemCount === 1 ? 'item' : 'items';
        return `${itemCount} ${itemText} • ₹${order.totalAmount.toLocaleString('en-IN')}`;
    };

    const statusOptions = [
        { value: 'all', label: 'All Orders' },
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

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
                            ORDERS MANAGEMENT
                        </Typography>
                        <Typography 
                            variant="h5" 
                            color={themeColors.primary}
                            fontWeight={500}
                        >
                            View and manage your orders • {filteredOrders.length} total orders
                        </Typography>
                    </Box>
                </Box>
            </Slide>

            {/* Filters and Search */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
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
                                    placeholder="Search by order ID, customer name, or email..."
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
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        displayEmpty
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
                                        {statusOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="body2" sx={{ 
                                    textAlign: { xs: 'left', md: 'right' },
                                    color: themeColors.text.secondary,
                                    fontWeight: 500
                                }}>
                                    Showing {paginatedOrders.length} of {filteredOrders.length} orders
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>

            {/* Orders Content */}
            {loading ? (
                <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
                    <Card sx={{
                        p: 4,
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        borderRadius: 4,
                    }}>
                        <CircularProgress sx={{ color: themeColors.primary, mb: 2 }} />
                        <Typography sx={{ color: themeColors.text.primary }}>
                            Loading orders...
                        </Typography>
                    </Card>
                </Fade>
            ) : filteredOrders.length === 0 ? (
                <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
                    <Card sx={{
                        p: 6,
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        borderRadius: 4,
                    }}>
                        <ReceiptIcon sx={{ 
                            fontSize: 64, 
                            color: themeColors.text.secondary, 
                            mb: 2, 
                            opacity: 0.5 
                        }} />
                        <Typography variant="h6" gutterBottom sx={{ color: themeColors.text.primary }}>
                            {searchTerm || statusFilter !== 'all' ? 'No orders match your filters' : 'No orders found'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filter criteria' : 'Orders will appear here once customers place them'}
                        </Typography>
                    </Card>
                </Fade>
            ) : (
                <>
                    {/* Orders List */}
                    <Stack spacing={3}>
                        {paginatedOrders.map((order, index) => {
                            const isExpanded = expandedOrders.has(order._id);
                            
                            return (
                                <Fade key={order._id} in={true} timeout={800} style={{ transitionDelay: `${400 + index * 100}ms` }}>
                                    <div>
                                        <EnhancedOrderCard
                                            order={order}
                                            themeColors={themeColors}
                                            isDarkMode={isDarkMode}
                                            colors={colors}
                                            isExpanded={isExpanded}
                                            onToggleExpand={toggleOrderExpansion}
                                            onStatusChange={handleStatusChange}
                                            formatDate={formatDate}
                                            getStatusColor={getStatusColor}
                                            getOrderSummary={getOrderSummary}
                                        />
                                    </div>
                                </Fade>
                            );
                        })}
                    </Stack>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                mt: 4,
                                p: 3,
                                background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                backdropFilter: 'blur(10px)',
                                border: `2px solid ${themeColors.border.default}`,
                                borderRadius: 4,
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
                            </Box>
                        </Fade>
                    )}
                </>
            )}
        </Box>
    );
};

export default Orders;









