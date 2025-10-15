// import React, { useState, useEffect, useContext } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Paper,
//     Button,
//     Grid,
//     Chip,
//     Card,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Badge,
//     Tab,
//     Tabs,
//     Pagination,
//     Stack
// } from '@mui/material';
// import {
//     AssignmentReturn,
//     CheckCircle,
//     Cancel,
//     Schedule,
//     Visibility,
//     ThumbUp,
//     ThumbDown,
//     CalendarToday,
//     Person
// } from '@mui/icons-material';
// import { vendorContext } from '../Context/Context';
// import Swal from 'sweetalert2';
// import { config } from '../Config/Config';

// const ReturnRequests = () => {
//     const { host } = config;
//     const { getReturnRequests, processReturnRequest, getReturnRequestDetails } = useContext(vendorContext);
    
//     const [returnRequests, setReturnRequests] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedTab, setSelectedTab] = useState('all');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [stats, setStats] = useState({});
    
//     // Dialog states
//     const [detailsDialog, setDetailsDialog] = useState(false);
//     const [processDialog, setProcessDialog] = useState(false);
//     const [selectedRequest, setSelectedRequest] = useState(null);
//     const [processAction, setProcessAction] = useState('');
//     const [vendorComments, setVendorComments] = useState('');

//     useEffect(() => {
//         fetchReturnRequests();
//     }, [selectedTab, currentPage]);

//     const fetchReturnRequests = async () => {
//         try {
//             setLoading(true);
//             const response = await getReturnRequests(selectedTab, currentPage, 10);
//             if (response && response.success) {
//                 setReturnRequests(response.returnRequests || []);
//                 setTotalPages(response.pagination?.totalPages || 1);
//                 setStats(response.stats || {});
//             }
//         } catch (error) {
//             console.error('Error fetching return requests:', error);
//             setReturnRequests([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleViewDetails = async (orderId) => {
//         try {
//             const response = await getReturnRequestDetails(orderId);
//             if (response && response.success) {
//                 setSelectedRequest(response.returnRequest);
//                 setDetailsDialog(true);
//             }
//         } catch (error) {
//             console.error('Error fetching return details:', error);
//             Swal.fire('Error', 'Failed to fetch return details', 'error');
//         }
//     };

//     const handleProcessReturn = async () => {
//         try {
//             const response = await processReturnRequest(
//                 selectedRequest._id, 
//                 processAction, 
//                 vendorComments
//             );
            
//             if (response && response.success) {
//                 Swal.fire(
//                     'Success!',
//                     `Return request ${processAction}ed successfully`,
//                     'success'
//                 );
//                 setProcessDialog(false);
//                 setVendorComments('');
//                 setSelectedRequest(null);
//                 fetchReturnRequests();
//             }
//         } catch (error) {
//             console.error('Error processing return:', error);
//             Swal.fire('Error', 'Failed to process return request', 'error');
//         }
//     };

//     const getStatusColor = (status) => {
//         const colors = {
//             requested: '#f59e0b',
//             approved: '#10b981',
//             rejected: '#ef4444',
//             completed: '#6b7280'
//         };
//         return colors[status] || '#6b7280';
//     };

//     const getStatusIcon = (status) => {
//         const icons = {
//             requested: <Schedule sx={{ fontSize: 16 }} />,
//             approved: <CheckCircle sx={{ fontSize: 16 }} />,
//             rejected: <Cancel sx={{ fontSize: 16 }} />,
//             completed: <AssignmentReturn sx={{ fontSize: 16 }} />
//         };
//         return icons[status] || <Schedule sx={{ fontSize: 16 }} />;
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     const formatPrice = (price) => {
//         if (!price) return '₹0';
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             maximumFractionDigits: 0
//         }).format(price);
//     };

//     return (
//         <Container maxWidth="xl" sx={{ py: 4 }}>
            
//             {/* Header Section */}
//             <Box sx={{ mb: 4 }}>
//                 <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
//                     Return Requests
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary">
//                     Manage customer return requests and refunds
//                 </Typography>
//             </Box>

//             {/* Stats Cards */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Card sx={{ textAlign: 'center', p: 2 }}>
//                         <Badge badgeContent={stats.requested || 0} color="warning">
//                             <Schedule sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
//                         </Badge>
//                         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                             Pending
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Awaiting Review
//                         </Typography>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Card sx={{ textAlign: 'center', p: 2 }}>
//                         <Badge badgeContent={stats.approved || 0} color="success">
//                             <CheckCircle sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
//                         </Badge>
//                         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                             Approved
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Ready for Pickup
//                         </Typography>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Card sx={{ textAlign: 'center', p: 2 }}>
//                         <Badge badgeContent={stats.rejected || 0} color="error">
//                             <Cancel sx={{ fontSize: 40, color: '#ef4444', mb: 1 }} />
//                         </Badge>
//                         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                             Rejected
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Not Eligible
//                         </Typography>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Card sx={{ textAlign: 'center', p: 2 }}>
//                         <Badge badgeContent={stats.completed || 0} color="default">
//                             <AssignmentReturn sx={{ fontSize: 40, color: '#6b7280', mb: 1 }} />
//                         </Badge>
//                         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                             Completed
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Refund Processed
//                         </Typography>
//                     </Card>
//                 </Grid>
//             </Grid>

//             {/* Filter Tabs */}
//             <Paper sx={{ mb: 3 }}>
//                 <Tabs
//                     value={selectedTab}
//                     onChange={(e, newValue) => {
//                         setSelectedTab(newValue);
//                         setCurrentPage(1);
//                     }}
//                     variant="scrollable"
//                     scrollButtons="auto"
//                 >
//                     <Tab label="All Requests" value="all" />
//                     <Tab label="Pending" value="requested" />
//                     <Tab label="Approved" value="approved" />
//                     <Tab label="Rejected" value="rejected" />
//                     <Tab label="Completed" value="completed" />
//                 </Tabs>
//             </Paper>

//             {/* Return Requests List */}
//             {loading ? (
//                 <Card sx={{ textAlign: 'center', py: 8 }}>
//                     <Typography>Loading return requests...</Typography>
//                 </Card>
//             ) : returnRequests.length === 0 ? (
//                 <Card sx={{ textAlign: 'center', py: 8 }}>
//                     <AssignmentReturn sx={{ fontSize: 64, color: '#9ca3af', mb: 2 }} />
//                     <Typography variant="h6" color="text.secondary">
//                         No return requests found
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                         {selectedTab === 'all' 
//                             ? 'There are no return requests yet.' 
//                             : `No ${selectedTab} return requests at the moment.`
//                         }
//                     </Typography>
//                 </Card>
//             ) : (
//                 <>
//                     <Grid container spacing={3}>
//                         {returnRequests.map((request) => (
//                             <Grid item xs={12} key={request._id}>
//                                 <Paper sx={{
//                                     border: '1px solid #e2e8f0',
//                                     borderRadius: 3,
//                                     overflow: 'hidden',
//                                     transition: 'all 0.2s ease',
//                                     '&:hover': {
//                                         boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
//                                     }
//                                 }}>
//                                     {/* Request Header */}
//                                     <Box sx={{
//                                         bgcolor: '#f8fafc',
//                                         p: 3,
//                                         borderBottom: '1px solid #e2e8f0'
//                                     }}>
//                                         <Stack
//                                             direction={{ xs: 'column', sm: 'row' }}
//                                             justifyContent="space-between"
//                                             alignItems={{ xs: 'flex-start', sm: 'center' }}
//                                             spacing={2}
//                                         >
//                                             <Box>
//                                                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
//                                                     Order #{request._id?.slice(-8).toUpperCase()}
//                                                 </Typography>
//                                                 <Stack direction="row" spacing={2} alignItems="center">
//                                                     <Typography variant="body2" color="text.secondary">
//                                                         <Person sx={{ fontSize: 14, mr: 0.5 }} />
//                                                         {request.customer?.name || 'Unknown Customer'}
//                                                     </Typography>
//                                                     <Typography variant="body2" color="text.secondary">
//                                                         <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
//                                                         {formatDate(request.returnRequestedAt)}
//                                                     </Typography>
//                                                 </Stack>
//                                             </Box>
                                            
//                                             <Stack direction="row" spacing={1} alignItems="center">
//                                                 <Chip
//                                                     icon={getStatusIcon(request.returnStatus)}
//                                                     label={request.returnStatus?.toUpperCase() || 'UNKNOWN'}
//                                                     sx={{
//                                                         bgcolor: getStatusColor(request.returnStatus),
//                                                         color: 'white',
//                                                         fontWeight: 600
//                                                     }}
//                                                 />
//                                                 <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
//                                                     {formatPrice(request.totalAmount)}
//                                                 </Typography>
//                                             </Stack>
//                                         </Stack>
//                                     </Box>

//                                     {/* Request Details */}
//                                     <Box sx={{ p: 3 }}>
//                                         <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                                             Return Reason:
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                                             {request.returnReason || 'No reason provided'}
//                                         </Typography>
                                        
//                                         {request.returnComments && (
//                                             <>
//                                                 <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                                                     Customer Comments:
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                                                     {request.returnComments.split('\n\nVendor Response:')[0]}
//                                                 </Typography>
//                                             </>
//                                         )}

//                                         <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                                             Items to Return:
//                                         </Typography>
//                                         <Stack spacing={1}>
//                                             {request.items?.map((item, index) => (
//                                                 <Box key={index} sx={{
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     gap: 2,
//                                                     p: 2,
//                                                     bgcolor: '#f8fafc',
//                                                     borderRadius: 2
//                                                 }}>
//                                                     {item.product?.images?.length > 0 ? (
//                                                         <Box
//                                                             component="img"
//                                                             src={`${host}/uploads/products/${item.product.images[0]}`}
//                                                             sx={{
//                                                                 width: 50,
//                                                                 height: 50,
//                                                                 objectFit: 'cover',
//                                                                 borderRadius: 1,
//                                                                 border: '1px solid #e2e8f0'
//                                                             }}
//                                                         />
//                                                     ) : (
//                                                         <Box
//                                                             sx={{
//                                                                 width: 50,
//                                                                 height: 50,
//                                                                 bgcolor: '#e2e8f0',
//                                                                 borderRadius: 1,
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                                 color: '#6b7280',
//                                                                 fontWeight: 'bold'
//                                                             }}
//                                                         >
//                                                             N/A
//                                                         </Box>
//                                                     )}
//                                                     <Box sx={{ flex: 1 }}>
//                                                         <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                                                             {item.product?.name || 'Unknown Product'}
//                                                         </Typography>
//                                                         <Typography variant="body2" color="text.secondary">
//                                                             Qty: {item.quantity || 0} × {formatPrice(item.price)}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             ))}
//                                         </Stack>
//                                     </Box>

//                                     {/* Action Buttons */}
//                                     <Box sx={{
//                                         bgcolor: '#f8fafc',
//                                         p: 3,
//                                         borderTop: '1px solid #e2e8f0'
//                                     }}>
//                                         <Stack direction="row" spacing={2} justifyContent="flex-end">
//                                             <Button
//                                                 startIcon={<Visibility />}
//                                                 onClick={() => handleViewDetails(request._id)}
//                                                 sx={{ textTransform: 'none' }}
//                                             >
//                                                 View Details
//                                             </Button>
                                            
//                                             {request.returnStatus === 'requested' && (
//                                                 <>
//                                                     <Button
//                                                         variant="outlined"
//                                                         color="error"
//                                                         startIcon={<ThumbDown />}
//                                                         onClick={() => {
//                                                             setSelectedRequest(request);
//                                                             setProcessAction('reject');
//                                                             setProcessDialog(true);
//                                                         }}
//                                                         sx={{ textTransform: 'none' }}
//                                                     >
//                                                         Reject
//                                                     </Button>
//                                                     <Button
//                                                         variant="contained"
//                                                         color="success"
//                                                         startIcon={<ThumbUp />}
//                                                         onClick={() => {
//                                                             setSelectedRequest(request);
//                                                             setProcessAction('approve');
//                                                             setProcessDialog(true);
//                                                         }}
//                                                         sx={{ textTransform: 'none' }}
//                                                     >
//                                                         Approve
//                                                     </Button>
//                                                 </>
//                                             )}
//                                         </Stack>
//                                     </Box>
//                                 </Paper>
//                             </Grid>
//                         ))}
//                     </Grid>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                             <Pagination
//                                 count={totalPages}
//                                 page={currentPage}
//                                 onChange={(e, page) => setCurrentPage(page)}
//                                 color="primary"
//                             />
//                         </Box>
//                     )}
//                 </>
//             )}

//             {/* Process Return Dialog */}
//             <Dialog
//                 open={processDialog}
//                 onClose={() => setProcessDialog(false)}
//                 maxWidth="sm"
//                 fullWidth
//             >
//                 <DialogTitle>
//                     {processAction === 'approve' ? 'Approve' : 'Reject'} Return Request
//                 </DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                         Order #{selectedRequest?._id?.slice(-8).toUpperCase()}
//                     </Typography>
//                     <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         label="Comments (Optional)"
//                         value={vendorComments}
//                         onChange={(e) => setVendorComments(e.target.value)}
//                         placeholder={`Add comments about your decision to ${processAction} this return...`}
//                         sx={{ mt: 2 }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setProcessDialog(false)}>
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleProcessReturn}
//                         variant="contained"
//                         color={processAction === 'approve' ? 'success' : 'error'}
//                     >
//                         {processAction === 'approve' ? 'Approve Return' : 'Reject Return'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Details Dialog */}
//             <Dialog
//                 open={detailsDialog}
//                 onClose={() => setDetailsDialog(false)}
//                 maxWidth="md"
//                 fullWidth
//             >
//                 <DialogTitle>
//                     Return Request Details - Order #{selectedRequest?._id?.slice(-8).toUpperCase()}
//                 </DialogTitle>
//                 <DialogContent>
//                     {selectedRequest && (
//                         <Box sx={{ py: 2 }}>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                                         Customer Information:
//                                     </Typography>
//                                     <Typography variant="body2">
//                                         Name: {selectedRequest.customer?.name}
//                                     </Typography>
//                                     <Typography variant="body2">
//                                         Email: {selectedRequest.customer?.email}
//                                     </Typography>
//                                     <Typography variant="body2">
//                                         Phone: {selectedRequest.customer?.phone}
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                                         Return Information:
//                                     </Typography>
//                                     <Typography variant="body2">
//                                         Status: {selectedRequest.returnStatus?.toUpperCase()}
//                                     </Typography>
//                                     <Typography variant="body2">
//                                         Requested: {formatDate(selectedRequest.returnRequestedAt)}
//                                     </Typography>
//                                     <Typography variant="body2">
//                                         Total Amount: {formatPrice(selectedRequest.totalAmount)}
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                                         Return Reason:
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ mb: 2 }}>
//                                         {selectedRequest.returnReason}
//                                     </Typography>
                                    
//                                     {selectedRequest.returnComments && (
//                                         <>
//                                             <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                                                 Comments:
//                                             </Typography>
//                                             <Typography variant="body2">
//                                                 {selectedRequest.returnComments}
//                                             </Typography>
//                                         </>
//                                     )}
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDetailsDialog(false)}>
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </Container>
//     );
// };

// export default ReturnRequests;





import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Grid,
    Chip,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Badge,
    Tab,
    Tabs,
    Pagination,
    Stack,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    AssignmentReturn,
    CheckCircle,
    Cancel,
    Schedule,
    Visibility,
    ThumbUp,
    ThumbDown,
    CalendarToday,
    Person
} from '@mui/icons-material';
import { vendorContext } from '../Context/Context';
import Swal from 'sweetalert2';
import { config } from '../Config/Config';

const ReturnRequests = () => {
    const { host } = config;
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const { getReturnRequests, processReturnRequest, getReturnRequestDetails } = useContext(vendorContext);
    
    const [returnRequests, setReturnRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({});
    const [isHovered, setIsHovered] = useState({});
    
    // Dialog states
    const [detailsDialog, setDetailsDialog] = useState(false);
    const [processDialog, setProcessDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [processAction, setProcessAction] = useState('');
    const [vendorComments, setVendorComments] = useState('');

    // ✅ PURPLE THEME COLORS (matching your reference Profile component)
    const themeColors = useMemo(() => ({
        primary: '#8b5cf6',
        primaryLight: '#a78bfa',
        primaryDark: '#7c3aed',
        text: {
            primary: isDarkMode ? '#f8fafc' : '#1f2937',
            secondary: isDarkMode ? '#cbd5e1' : '#6b7280',
            accent: isDarkMode ? '#e2e8f0' : '#374151',
        },
        background: {
            primary: isDarkMode ? '#1e293b' : 'rgba(254, 252, 255, 0.95)',
            secondary: isDarkMode ? '#334155' : 'rgba(250, 249, 255, 0.95)',
            hover: isDarkMode ? '#475569' : 'rgba(139, 92, 246, 0.05)',
        },
        border: {
            default: isDarkMode ? '#64748b' : '#a78bfa',
            hover: isDarkMode ? '#94a3b8' : '#8b5cf6',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    }), [isDarkMode]);

    useEffect(() => {
        fetchReturnRequests();
    }, [selectedTab, currentPage]);

    const fetchReturnRequests = async () => {
        try {
            setLoading(true);
            const response = await getReturnRequests(selectedTab, currentPage, 10);
            if (response && response.success) {
                setReturnRequests(response.returnRequests || []);
                setTotalPages(response.pagination?.totalPages || 1);
                setStats(response.stats || {});
            }
        } catch (error) {
            console.error('Error fetching return requests:', error);
            setReturnRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (orderId) => {
        try {
            const response = await getReturnRequestDetails(orderId);
            if (response && response.success) {
                setSelectedRequest(response.returnRequest);
                setDetailsDialog(true);
            }
        } catch (error) {
            console.error('Error fetching return details:', error);
            Swal.fire('Error', 'Failed to fetch return details', 'error');
        }
    };

    const handleProcessReturn = async () => {
        try {
            const response = await processReturnRequest(
                selectedRequest._id, 
                processAction, 
                vendorComments
            );
            
            if (response && response.success) {
                Swal.fire(
                    'Success!',
                    `Return request ${processAction}ed successfully`,
                    'success'
                );
                setProcessDialog(false);
                setVendorComments('');
                setSelectedRequest(null);
                fetchReturnRequests();
            }
        } catch (error) {
            console.error('Error processing return:', error);
            Swal.fire('Error', 'Failed to process return request', 'error');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            requested: themeColors.warning,
            approved: themeColors.success,
            rejected: themeColors.error,
            completed: '#6b7280'
        };
        return colors[status] || '#6b7280';
    };

    const getStatusIcon = (status) => {
        const icons = {
            requested: <Schedule sx={{ fontSize: 16 }} />,
            approved: <CheckCircle sx={{ fontSize: 16 }} />,
            rejected: <Cancel sx={{ fontSize: 16 }} />,
            completed: <AssignmentReturn sx={{ fontSize: 16 }} />
        };
        return icons[status] || <Schedule sx={{ fontSize: 16 }} />;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        if (!price) return '₹0';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <Box 
            sx={{
                m: "20px",
                position: 'relative',
                minHeight: '100vh',
                // ✅ BACKGROUND MATCHING PROFILE COMPONENT
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
            }}
        >
            
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h3"
                    sx={{ 
                        fontWeight: 700, 
                        color: themeColors.text.primary, 
                        mb: "3px" 
                    }}
                >
                    RETURN REQUESTS
                </Typography>
                <Typography 
                    variant="h6"
                    sx={{ 
                        color: themeColors.primary,
                        fontWeight: 500
                    }}
                >
                    Manage customer return requests and refunds
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        onMouseEnter={() => setIsHovered(prev => ({ ...prev, pending: true }))}
                        onMouseLeave={() => setIsHovered(prev => ({ ...prev, pending: false }))}
                        sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: isDarkMode 
                                ? `linear-gradient(135deg, #374151 0%, #4b5563 100%)` 
                                : `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            backdropFilter: 'blur(10px)',
                            border: `2px solid ${isHovered.pending ? themeColors.border.hover : themeColors.border.default}`,
                            borderRadius: 3,
                            transform: isHovered.pending ? 'translateY(-4px)' : 'translateY(0)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            boxShadow: isHovered.pending 
                                ? `0 15px 35px rgba(245, 158, 11, 0.25)`
                                : `0 8px 25px rgba(245, 158, 11, 0.08)`,
                            backgroundImage: !isDarkMode && `
                                radial-gradient(circle at 10% 20%, rgba(255, 247, 237, 0.8) 0%, transparent 20%),
                                radial-gradient(circle at 80% 80%, rgba(255, 237, 213, 0.6) 0%, transparent 20%)
                            `
                        }}
                    >
                        <Badge badgeContent={stats.requested || 0} color="warning">
                            <Schedule sx={{ fontSize: 40, color: themeColors.warning, mb: 1 }} />
                        </Badge>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: themeColors.warning, mb: 0.5 }}>
                            Pending
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            Awaiting Review
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        onMouseEnter={() => setIsHovered(prev => ({ ...prev, approved: true }))}
                        onMouseLeave={() => setIsHovered(prev => ({ ...prev, approved: false }))}
                        sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: isDarkMode 
                                ? `linear-gradient(135deg, #065f46 0%, #047857 100%)` 
                                : `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            backdropFilter: 'blur(10px)',
                            border: `2px solid ${isHovered.approved ? themeColors.border.hover : themeColors.border.default}`,
                            borderRadius: 3,
                            transform: isHovered.approved ? 'translateY(-4px)' : 'translateY(0)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            boxShadow: isHovered.approved 
                                ? `0 15px 35px rgba(16, 185, 129, 0.25)`
                                : `0 8px 25px rgba(16, 185, 129, 0.08)`,
                            backgroundImage: !isDarkMode && `
                                radial-gradient(circle at 10% 20%, rgba(236, 253, 245, 0.8) 0%, transparent 20%),
                                radial-gradient(circle at 80% 80%, rgba(209, 250, 229, 0.6) 0%, transparent 20%)
                            `
                        }}
                    >
                        <Badge badgeContent={stats.approved || 0} color="success">
                            <CheckCircle sx={{ fontSize: 40, color: themeColors.success, mb: 1 }} />
                        </Badge>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: themeColors.success, mb: 0.5 }}>
                            Approved
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            Ready for Pickup
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        onMouseEnter={() => setIsHovered(prev => ({ ...prev, rejected: true }))}
                        onMouseLeave={() => setIsHovered(prev => ({ ...prev, rejected: false }))}
                        sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: isDarkMode 
                                ? `linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)` 
                                : `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            backdropFilter: 'blur(10px)',
                            border: `2px solid ${isHovered.rejected ? themeColors.border.hover : themeColors.border.default}`,
                            borderRadius: 3,
                            transform: isHovered.rejected ? 'translateY(-4px)' : 'translateY(0)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            boxShadow: isHovered.rejected 
                                ? `0 15px 35px rgba(239, 68, 68, 0.25)`
                                : `0 8px 25px rgba(239, 68, 68, 0.08)`,
                            backgroundImage: !isDarkMode && `
                                radial-gradient(circle at 10% 20%, rgba(254, 242, 242, 0.8) 0%, transparent 20%),
                                radial-gradient(circle at 80% 80%, rgba(254, 226, 226, 0.6) 0%, transparent 20%)
                            `
                        }}
                    >
                        <Badge badgeContent={stats.rejected || 0} color="error">
                            <Cancel sx={{ fontSize: 40, color: themeColors.error, mb: 1 }} />
                        </Badge>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: themeColors.error, mb: 0.5 }}>
                            Rejected
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            Not Eligible
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        onMouseEnter={() => setIsHovered(prev => ({ ...prev, completed: true }))}
                        onMouseLeave={() => setIsHovered(prev => ({ ...prev, completed: false }))}
                        sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: isDarkMode 
                                ? `linear-gradient(135deg, #4b5563 0%, #6b7280 100%)` 
                                : `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            backdropFilter: 'blur(10px)',
                            border: `2px solid ${isHovered.completed ? themeColors.border.hover : themeColors.border.default}`,
                            borderRadius: 3,
                            transform: isHovered.completed ? 'translateY(-4px)' : 'translateY(0)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            boxShadow: isHovered.completed 
                                ? `0 15px 35px rgba(107, 114, 128, 0.25)`
                                : `0 8px 25px rgba(107, 114, 128, 0.08)`,
                            backgroundImage: !isDarkMode && `
                                radial-gradient(circle at 10% 20%, rgba(249, 250, 251, 0.8) 0%, transparent 20%),
                                radial-gradient(circle at 80% 80%, rgba(243, 244, 246, 0.6) 0%, transparent 20%)
                            `
                        }}
                    >
                        <Badge badgeContent={stats.completed || 0} color="default">
                            <AssignmentReturn sx={{ fontSize: 40, color: '#6b7280', mb: 1 }} />
                        </Badge>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#6b7280', mb: 0.5 }}>
                            Completed
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            Refund Processed
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Filter Tabs */}
            <Paper sx={{ 
                mb: 3, 
                borderRadius: 3,
                background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `2px solid ${themeColors.border.default}`,
                boxShadow: `0 4px 20px ${themeColors.primary}20`
            }}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, newValue) => {
                        setSelectedTab(newValue);
                        setCurrentPage(1);
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: themeColors.text.secondary,
                            py: 2.5,
                            '&.Mui-selected': {
                                color: themeColors.primary,
                                fontWeight: 700
                            },
                            '&:hover': {
                                color: themeColors.primaryLight
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: themeColors.primary,
                            height: 4,
                            borderRadius: '4px 4px 0 0'
                        }
                    }}
                >
                    <Tab label="All Requests" value="all" />
                    <Tab label="Pending" value="requested" />
                    <Tab label="Approved" value="approved" />
                    <Tab label="Rejected" value="rejected" />
                    <Tab label="Completed" value="completed" />
                </Tabs>
            </Paper>

            {/* Return Requests List */}
            {loading ? (
                <Card sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${themeColors.border.default}`,
                    borderRadius: 3
                }}>
                    <Typography sx={{ color: themeColors.text.primary, fontSize: '1.1rem' }}>
                        Loading return requests...
                    </Typography>
                </Card>
            ) : returnRequests.length === 0 ? (
                <Card sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${themeColors.border.default}`,
                    borderRadius: 3
                }}>
                    <AssignmentReturn sx={{ fontSize: 64, color: themeColors.text.secondary, mb: 2 }} />
                    <Typography variant="h6" sx={{ color: themeColors.text.primary, mb: 1 }}>
                        No return requests found
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                        {selectedTab === 'all' 
                            ? 'There are no return requests yet.' 
                            : `No ${selectedTab} return requests at the moment.`
                        }
                    </Typography>
                </Card>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {returnRequests.map((request) => (
                            <Grid item xs={12} key={request._id}>
                                <Paper
                                    onMouseEnter={() => setIsHovered(prev => ({ ...prev, [request._id]: true }))}
                                    onMouseLeave={() => setIsHovered(prev => ({ ...prev, [request._id]: false }))}
                                    sx={{
                                        border: `2px solid ${isHovered[request._id] ? themeColors.border.hover : themeColors.border.default}`,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        backdropFilter: 'blur(10px)',
                                        transform: isHovered[request._id] ? 'translateY(-3px)' : 'translateY(0)',
                                        boxShadow: isHovered[request._id] 
                                            ? `0 15px 35px ${themeColors.primary}20`
                                            : `0 8px 25px ${themeColors.primary}10`,
                                        backgroundImage: !isDarkMode && `
                                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
                                            radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
                                        `
                                    }}
                                >
                                    {/* Request Header */}
                                    <Box sx={{
                                        background: isDarkMode 
                                            ? 'linear-gradient(135deg, #475569, #64748b)' 
                                            : 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
                                        p: 3,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            justifyContent="space-between"
                                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                                            spacing={2}
                                        >
                                            <Box>
                                                <Typography 
                                                    variant="h6" 
                                                    sx={{ fontWeight: 700, mb: 0.5, color: themeColors.text.primary }}
                                                >
                                                    Order #{request._id?.slice(-8).toUpperCase()}
                                                </Typography>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            color: themeColors.text.secondary,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        <Person sx={{ fontSize: 14, mr: 0.5 }} />
                                                        {request.customer?.name || 'Unknown Customer'}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            color: themeColors.text.secondary,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
                                                        {formatDate(request.returnRequestedAt)}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                            
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    icon={getStatusIcon(request.returnStatus)}
                                                    label={request.returnStatus?.toUpperCase() || 'UNKNOWN'}
                                                    sx={{
                                                        bgcolor: getStatusColor(request.returnStatus),
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        fontSize: '0.8rem'
                                                    }}
                                                />
                                                {/* ✅ FIXED AMOUNT VISIBILITY IN BOTH MODES */}
                                                <Typography 
                                                    variant="h6" 
                                                    sx={{ 
                                                        fontWeight: 800, 
                                                        color: isDarkMode ? '#ffffff' : themeColors.primary,
                                                        textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
                                                        backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                                                        px: isDarkMode ? 1 : 0,
                                                        borderRadius: isDarkMode ? 1 : 0,
                                                        border: isDarkMode ? '1px solid rgba(139, 92, 246, 0.3)' : 'none'
                                                    }}
                                                >
                                                    {formatPrice(request.totalAmount)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>

                                    {/* Request Details */}
                                    <Box sx={{ p: 3 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: themeColors.text.primary }}>
                                            Return Reason:
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2, color: themeColors.text.secondary, lineHeight: 1.6 }}>
                                            {request.returnReason || 'No reason provided'}
                                        </Typography>
                                        
                                        {request.returnComments && (
                                            <>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: themeColors.text.primary }}>
                                                    Customer Comments:
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 2, color: themeColors.text.secondary, lineHeight: 1.6 }}>
                                                    {request.returnComments.split('\n\nVendor Response:')[0]}
                                                </Typography>
                                            </>
                                        )}

                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: themeColors.text.primary }}>
                                            Items to Return:
                                        </Typography>
                                        <Stack spacing={1}>
                                            {request.items?.map((item, index) => (
                                                <Box key={index} sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    p: 2,
                                                    background: isDarkMode 
                                                        ? 'linear-gradient(135deg, #475569, #64748b)' 
                                                        : 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
                                                    borderRadius: 2,
                                                    border: `1px solid ${themeColors.border.default}`
                                                }}>
                                                    {item.product?.images?.length > 0 ? (
                                                        <Box
                                                            component="img"
                                                            src={`${host}/uploads/products/${item.product.images[0]}`}
                                                            sx={{
                                                                width: 50,
                                                                height: 50,
                                                                objectFit: 'cover',
                                                                borderRadius: 1,
                                                                border: `2px solid ${themeColors.primary}`
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                width: 50,
                                                                height: 50,
                                                                bgcolor: themeColors.border.default,
                                                                borderRadius: 1,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: themeColors.text.secondary,
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            N/A
                                                        </Box>
                                                    )}
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: themeColors.text.primary }}>
                                                            {item.product?.name || 'Unknown Product'}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                                            Qty: {item.quantity || 0} × {formatPrice(item.price)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>

                                    {/* Action Buttons */}
                                    <Box sx={{
                                        background: isDarkMode 
                                            ? 'linear-gradient(135deg, #475569, #64748b)' 
                                            : 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
                                        p: 3,
                                        borderTop: `2px solid ${themeColors.border.default}`
                                    }}>
                                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                                            <Button
                                                startIcon={<Visibility />}
                                                onClick={() => handleViewDetails(request._id)}
                                                sx={{ 
                                                    textTransform: 'none',
                                                    color: '#ffffff',
                                                    backgroundColor: themeColors.primary,
                                                    fontWeight: 600,
                                                    px: 3,
                                                    py: 1,
                                                    borderRadius: 2,
                                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                    boxShadow: `0 3px 12px ${themeColors.primary}35`,
                                                    '&:hover': {
                                                        backgroundColor: themeColors.primaryDark,
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: `0 6px 20px ${themeColors.primaryDark}50`
                                                    }
                                                }}
                                            >
                                                View Details
                                            </Button>
                                            
                                            {request.returnStatus === 'requested' && (
                                                <>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<ThumbDown />}
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setProcessAction('reject');
                                                            setProcessDialog(true);
                                                        }}
                                                        sx={{ 
                                                            textTransform: 'none',
                                                            borderColor: themeColors.error,
                                                            color: themeColors.error,
                                                            fontWeight: 600,
                                                            px: 3,
                                                            py: 1,
                                                            borderRadius: 2,
                                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                                borderColor: '#dc2626',
                                                                transform: 'translateY(-1px)'
                                                            }
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<ThumbUp />}
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setProcessAction('approve');
                                                            setProcessDialog(true);
                                                        }}
                                                        sx={{ 
                                                            textTransform: 'none',
                                                            backgroundColor: themeColors.success,
                                                            fontWeight: 600,
                                                            px: 3,
                                                            py: 1,
                                                            borderRadius: 2,
                                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                            boxShadow: `0 3px 12px ${themeColors.success}35`,
                                                            '&:hover': { 
                                                                backgroundColor: '#059669',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: `0 6px 20px rgba(16, 185, 129, 0.50)`
                                                            }
                                                        }}
                                                    >
                                                        Approve
                                                    </Button>
                                                </>
                                            )}
                                        </Stack>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(e, page) => setCurrentPage(page)}
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: themeColors.text.secondary,
                                        fontWeight: 600,
                                        '&.Mui-selected': {
                                            backgroundColor: themeColors.primary,
                                            color: 'white'
                                        },
                                        '&:hover': {
                                            backgroundColor: `${themeColors.primaryLight}20`
                                        }
                                    }
                                }}
                            />
                        </Box>
                    )}
                </>
            )}

            {/* Process Return Dialog */}
            <Dialog 
                open={processDialog} 
                onClose={() => setProcessDialog(false)} 
                maxWidth="sm" 
                fullWidth
                PaperProps={{
                    sx: {
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.primary}`,
                        borderRadius: 3
                    }
                }}
            >
                <DialogTitle sx={{ color: themeColors.text.primary, fontWeight: 700 }}>
                    {processAction === 'approve' ? 'Approve' : 'Reject'} Return Request
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2, color: themeColors.text.secondary }}>
                        Order #{selectedRequest?._id?.slice(-8).toUpperCase()}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Comments (Optional)"
                        value={vendorComments}
                        onChange={(e) => setVendorComments(e.target.value)}
                        placeholder={`Add comments about your decision to ${processAction} this return...`}
                        sx={{ 
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': {
                                    borderColor: themeColors.border.default
                                },
                                '&:hover fieldset': {
                                    borderColor: themeColors.border.hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: themeColors.primary
                                }
                            },
                            '& .MuiInputLabel-root': {
                                color: themeColors.text.secondary,
                                '&.Mui-focused': {
                                    color: themeColors.primary
                                }
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button 
                        onClick={() => setProcessDialog(false)}
                        sx={{ color: themeColors.text.secondary }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleProcessReturn}
                        variant="contained"
                        sx={{
                            backgroundColor: processAction === 'approve' ? themeColors.success : themeColors.error,
                            '&:hover': {
                                backgroundColor: processAction === 'approve' ? '#059669' : '#dc2626'
                            }
                        }}
                    >
                        {processAction === 'approve' ? 'Approve Return' : 'Reject Return'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Details Dialog */}
            <Dialog 
                open={detailsDialog} 
                onClose={() => setDetailsDialog(false)} 
                maxWidth="md" 
                fullWidth
                PaperProps={{
                    sx: {
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.primary}`,
                        borderRadius: 3
                    }
                }}
            >
                <DialogTitle sx={{ color: themeColors.text.primary, fontWeight: 700 }}>
                    Return Request Details - Order #{selectedRequest?._id?.slice(-8).toUpperCase()}
                </DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <Box sx={{ py: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: themeColors.text.primary }}>
                                        Customer Information:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        Name: {selectedRequest.customer?.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        Email: {selectedRequest.customer?.email}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        Phone: {selectedRequest.customer?.phone}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: themeColors.text.primary }}>
                                        Return Information:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        Status: {selectedRequest.returnStatus?.toUpperCase()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        Requested: {formatDate(selectedRequest.returnRequestedAt)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                        Total Amount: {formatPrice(selectedRequest.totalAmount)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: themeColors.text.primary }}>
                                        Return Reason:
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2, color: themeColors.text.secondary }}>
                                        {selectedRequest.returnReason}
                                    </Typography>
                                    
                                    {selectedRequest.returnComments && (
                                        <>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: themeColors.text.primary }}>
                                                Comments:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                                                {selectedRequest.returnComments}
                                            </Typography>
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button 
                        onClick={() => setDetailsDialog(false)}
                        variant="contained"
                        sx={{ 
                            backgroundColor: themeColors.primary,
                            '&:hover': { backgroundColor: themeColors.primaryDark }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default ReturnRequests;
