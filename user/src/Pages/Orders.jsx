




// import React, { useContext, useEffect, useState } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Paper,
//     Button,
//     Grid,
//     Chip,
//     Card,
//     CardContent,
//     Divider,
//     Stack,
//     Avatar,
//     Tabs,
//     Tab
// } from '@mui/material';
// import {
//     ShoppingBag,
//     LocalShipping,
//     Cancel,
//     CheckCircle,
//     Schedule,
//     ArrowBack,
//     Receipt,
//     CalendarToday,
//     AssignmentReturn,
//     ShoppingCart,
//     Undo,
//     Block
// } from '@mui/icons-material';
// import { userContext } from '../Context/Context';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import {config} from '../Config/Config';
// import Swal from 'sweetalert2';

// const Orders = () => {
//     const {host}=config;    
//     const { orders, getOrders, cancelOrder, submitFeedback, requestReturn } = useContext(userContext);
//     const navigate = useNavigate();

//     const [localOrders, setLocalOrders] = useState([]);
//     const [activeTab, setActiveTab] = useState(0); // 0: Active, 1: Returns, 2: Cancelled
//     const [submittedFeedbacks, setSubmittedFeedbacks] = useState(() => {
//         const saved = localStorage.getItem('submittedFeedbacks');
//         return saved ? new Set(JSON.parse(saved)) : new Set();
//     });

//     const [returnRequests, setReturnRequests] = useState(() => {
//         const saved = localStorage.getItem('returnRequests');
//         return saved ? new Set(JSON.parse(saved)) : new Set();
//     });

//     useEffect(() => {
//         getOrders();
//     }, []);

//     useEffect(() => {
//         setLocalOrders(orders);
//     }, [orders]);

//     // ✅ CATEGORIZE ORDERS INTO SECTIONS
//     const categorizeOrders = () => {
//         const activeOrders = [];
//         const returnOrders = [];
//         const cancelledOrders = [];

//         orders.forEach(order => {
//             const status = order.orderStatus || 'pending';
            
//             if (status === 'cancelled') {
//                 cancelledOrders.push(order);
//             } else if (status.includes('return') || order.returnStatus) {
//                 returnOrders.push(order);
//             } else {
//                 activeOrders.push(order);
//             }
//         });

//         return {
//             active: activeOrders,
//             returns: returnOrders,
//             cancelled: cancelledOrders
//         };
//     };

//     const { active, returns, cancelled } = categorizeOrders();

//     // Get current orders based on active tab
//     const getCurrentOrders = () => {
//         switch (activeTab) {
//             case 0: return active;
//             case 1: return returns;
//             case 2: return cancelled;
//             default: return active;
//         }
//     };

//     // ✅ NEW: Get border color based on order status
//     const getBorderColor = (order) => {
//         const status = order.orderStatus || 'pending';
        
//         if (status === 'cancelled') {
//             return '#ef4444'; // Red for cancelled
//         } else if (status.includes('return') || order.returnStatus) {
//             return '#f97316'; // Orange for returns
//         } else if (status === 'delivered') {
//             return '#10b981'; // Green for delivered
//         } else if (status === 'shipped') {
//             return '#3b82f6'; // Blue for shipped
//         } else {
//             return '#f59e0b'; // Yellow for pending/processing
//         }
//     };

//     // ✅ NEW: Get background color based on order status (subtle)
//     const getBgColor = (order) => {
//         const status = order.orderStatus || 'pending';
        
//         if (status === 'cancelled') {
//             return 'rgba(239, 68, 68, 0.03)'; // Light red
//         } else if (status.includes('return') || order.returnStatus) {
//             return 'rgba(249, 115, 22, 0.03)'; // Light orange
//         } else if (status === 'delivered') {
//             return 'rgba(16, 185, 129, 0.03)'; // Light green
//         } else if (status === 'shipped') {
//             return 'rgba(59, 130, 246, 0.03)'; // Light blue
//         } else {
//             return 'rgba(245, 158, 11, 0.03)'; // Light yellow
//         }
//     };

//     const getStatusColor = (status) => {
//         const colors = {
//             pending: '#f59e0b',
//             processing: '#3b82f6',
//             shipped: '#10b981',
//             delivered: '#059669',
//             cancelled: '#ef4444',
//             'return-requested': '#f97316',
//             'return-approved': '#8b5cf6',
//             'return-rejected': '#ef4444',
//             returned: '#6b7280'
//         };
//         return colors[status] || '#6b7280';
//     };

//     const getStatusIcon = (status) => {
//         const icons = {
//             pending: <Schedule sx={{ fontSize: 16 }} />,
//             processing: <LocalShipping sx={{ fontSize: 16 }} />,
//             shipped: <LocalShipping sx={{ fontSize: 16 }} />,
//             delivered: <CheckCircle sx={{ fontSize: 16 }} />,
//             cancelled: <Cancel sx={{ fontSize: 16 }} />,
//             'return-requested': <AssignmentReturn sx={{ fontSize: 16 }} />,
//             'return-approved': <CheckCircle sx={{ fontSize: 16 }} />,
//             'return-rejected': <Cancel sx={{ fontSize: 16 }} />,
//             returned: <AssignmentReturn sx={{ fontSize: 16 }} />
//         };
//         return icons[status] || <Schedule sx={{ fontSize: 16 }} />;
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             maximumFractionDigits: 0
//         }).format(price);
//     };

//     const isReturnAvailable = (order) => {
//         if (order.orderStatus !== 'delivered') return false;
        
//         const deliveryDate = new Date(order.deliveredAt || order.updatedAt);
//         const currentDate = new Date();
//         const timeDifference = currentDate.getTime() - deliveryDate.getTime();
//         const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
//         return daysDifference <= 2;
//     };

//     const getRemainingReturnDays = (order) => {
//         if (order.orderStatus !== 'delivered') return 0;
        
//         const deliveryDate = new Date(order.deliveredAt || order.updatedAt);
//         const currentDate = new Date();
//         const timeDifference = currentDate.getTime() - deliveryDate.getTime();
//         const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
//         return Math.max(0, 2 - daysDifference);
//     };

//     const handleSubmitFeedback = async (orderId, rating, feedback) => {
//         try {
//             console.log('📝 Starting feedback submission...');
            
//             const result = await submitFeedback(orderId, rating, feedback);
            
//             if (result.success) {
//                 const newSubmitted = new Set([...submittedFeedbacks, orderId]);
//                 setSubmittedFeedbacks(newSubmitted);
//                 localStorage.setItem('submittedFeedbacks', JSON.stringify([...newSubmitted]));
                
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Thank you!',
//                     text: result.message || 'Your feedback has been submitted successfully.',
//                     confirmButtonColor: '#059669',
//                     timer: 2500,
//                     showConfirmButton: false
//                 });
//             }
            
//         } catch (error) {
//             console.error('❌ Feedback submission failed:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Failed to Submit',
//                 text: error.message || 'Failed to submit feedback. Please try again later.',
//                 confirmButtonColor: '#ef4444'
//             });
//         }
//     };

//     const handleReturnRequest = async (orderId) => {
//         const order = orders.find(o => o._id === orderId);
        
//         if (!isReturnAvailable(order)) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Return Not Available',
//                 text: 'Return period has expired. Returns are only available within 2 days of delivery.',
//                 confirmButtonColor: '#ef4444'
//             });
//             return;
//         }

//         if (returnRequests.has(orderId) || order.returnStatus) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Return Already Requested',
//                 text: 'You have already requested a return for this order.',
//                 confirmButtonColor: '#3b82f6'
//             });
//             return;
//         }

//         const returnReasons = [
//             'Defective/Damaged Product',
//             'Wrong Item Received',
//             'Size/Fit Issues',
//             'Product Not as Described',
//             'Quality Issues',
//             'Changed My Mind',
//             'Other'
//         ];

//         const { value: formValues } = await Swal.fire({
//             title: 'Request Return & Refund',
//             html: `
//                 <div style="text-align: left; margin-bottom: 1rem;">
//                     <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Reason for Return:</label>
//                     <select id="return-reason" class="swal2-input" style="margin-bottom: 1rem;">
//                         <option value="">Select a reason</option>
//                         ${returnReasons.map(reason => `<option value="${reason}">${reason}</option>`).join('')}
//                     </select>
//                     <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Additional Comments (Optional):</label>
//                     <textarea id="return-comments" class="swal2-textarea" placeholder="Please provide additional details about the issue..."></textarea>
//                     <div style="margin-top: 1rem; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem; border-left: 4px solid #3b82f6;">
//                         <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">Return Policy:</h4>
//                         <ul style="margin: 0; padding-left: 1.5rem; color: #4b5563; font-size: 0.9rem;">
//                             <li>Returns are accepted within 2 days of delivery</li>
//                             <li>Items must be in original condition</li>
//                             <li>Refund will be processed after item inspection</li>
//                             <li>Processing time: 3-5 business days</li>
//                         </ul>
//                     </div>
//                 </div>
//             `,
//             showCancelButton: true,
//             confirmButtonText: 'Submit Return Request',
//             cancelButtonText: 'Cancel',
//             confirmButtonColor: '#f97316',
//             preConfirm: () => {
//                 const reason = document.getElementById('return-reason').value;
//                 const comments = document.getElementById('return-comments').value;
                
//                 if (!reason) {
//                     Swal.showValidationMessage('Please select a reason for return');
//                     return false;
//                 }
                
//                 return { reason, comments };
//             },
//             width: '600px'
//         });

//         if (formValues) {
//             try {
//                 await requestReturn(orderId, formValues.reason, formValues.comments);
                
//                 const newReturnRequests = new Set([...returnRequests, orderId]);
//                 setReturnRequests(newReturnRequests);
//                 localStorage.setItem('returnRequests', JSON.stringify([...newReturnRequests]));

//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Return Request Submitted!',
//                     html: `
//                         <div style="text-align: left;">
//                             <p><strong>Your return request has been submitted successfully.</strong></p>
//                             <div style="margin-top: 1rem; padding: 1rem; background-color: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #3b82f6;">
//                                 <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">What happens next?</h4>
//                                 <ol style="margin: 0; padding-left: 1.5rem; color: #4b5563; font-size: 0.9rem;">
//                                     <li>Our team will review your request within 24 hours</li>
//                                     <li>If approved, we'll email you return instructions</li>
//                                     <li>Package and send the item back to us</li>
//                                     <li>Refund will be processed after inspection</li>
//                                 </ol>
//                             </div>
//                         </div>
//                     `,
//                     confirmButtonColor: '#059669',
//                     width: '500px'
//                 });

//                 getOrders();

//             } catch (error) {
//                 console.error('Return request error:', error);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Request Failed',
//                     text: 'Failed to submit return request. Please try again later.',
//                     confirmButtonColor: '#ef4444'
//                 });
//             }
//         }
//     };

//     const handleBackToHome = () => {
//         window.location.href = '/';
//     };

//     // ✅ UPDATED RENDER ORDER CARD WITH COLORED BORDERS
//     const renderOrderCard = (order) => (
//         <Grid item xs={12} md={6} lg={4} key={order._id}>
//             <Paper sx={{ 
//                 border: `2px solid ${getBorderColor(order)}`, // ✅ Colored border
//                 borderRadius: 3,
//                 boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//                 overflow: 'hidden',
//                 transition: 'all 0.2s ease',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 bgcolor: getBgColor(order), // ✅ Subtle background color
//                 '&:hover': {
//                     boxShadow: `0 8px 15px 0 ${getBorderColor(order)}30`, // ✅ Colored shadow on hover
//                     transform: 'translateY(-4px)',
//                     borderColor: getBorderColor(order)
//                 }
//             }}>
//                 {/* Order Header */}
//                 <Box sx={{ 
//                     bgcolor: `${getBorderColor(order)}15`, // ✅ Header matches border color
//                     p: 2.5,
//                     borderBottom: `1px solid ${getBorderColor(order)}30`
//                 }}>
//                     <Box sx={{ mb: 1 }}>
//                         <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>
//                             Order #{order._id?.slice(-8).toUpperCase()}
//                         </Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
//                             <CalendarToday sx={{ fontSize: 12, color: '#64748b' }} />
//                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
//                                 {formatDate(order.createdAt)}
//                             </Typography>
//                         </Box>
                        
//                         {/* ✅ FIXED: Only show return availability for delivered orders that have NO return status */}
//                         {order.orderStatus === 'delivered' && 
//                          !order.orderStatus?.includes('return') && 
//                          !order.returnStatus && 
//                          !returnRequests.has(order._id) && (
//                             <Box sx={{ mt: 1 }}>
//                                 {isReturnAvailable(order) ? (
//                                     <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600, fontSize: '0.75rem' }}>
//                                         ✓ Return available ({getRemainingReturnDays(order)} days remaining)
//                                     </Typography>
//                                 ) : (
//                                     <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500, fontSize: '0.75rem' }}>
//                                         Return period expired
//                                     </Typography>
//                                 )}
//                             </Box>
//                         )}
//                     </Box>
                    
//                     <Chip
//                         icon={getStatusIcon(order.orderStatus || 'pending')}
//                         label={(order.orderStatus || 'pending').replace('-', ' ').toUpperCase()}
//                         size="small"
//                         sx={{
//                             bgcolor: getStatusColor(order.orderStatus || 'pending'),
//                             color: 'white',
//                             fontWeight: 600,
//                             fontSize: '0.7rem'
//                         }}
//                     />
//                 </Box>
                
//                 {/* Order Items */}
//                 <Box sx={{ p: 2.5, flex: 1 }}>
//                     <Stack spacing={2}>
//                         {order.items.slice(0, 2).map((item, index) => ( // Show only first 2 items
//                             <Box key={item._id}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                                     {item.product?.images?.length > 0 ? (
//                                         <Box
//                                             component="img"
//                                             src={`${host}/uploads/products/${item.product.images[0]}`}
//                                             sx={{
//                                                 width: 50,
//                                                 height: 50,
//                                                 objectFit: 'cover',
//                                                 borderRadius: 1.5,
//                                                 border: '1px solid #e2e8f0'
//                                             }}
//                                         />
//                                     ) : (
//                                         <Box
//                                             sx={{
//                                                 width: 50,
//                                                 height: 50,
//                                                 bgcolor: '#e2e8f0',
//                                                 borderRadius: 1.5,
//                                                 border: '1px solid #e2e8f0',
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 color: '#64748b',
//                                                 fontSize: 16,
//                                                 fontWeight: 'bold',
//                                             }}
//                                         >
//                                             N/A
//                                         </Box>
//                                     )}

//                                     <Box sx={{ flex: 1, minWidth: 0 }}>
//                                         <Typography 
//                                             variant="body2" 
//                                             sx={{ 
//                                                 fontWeight: 600, 
//                                                 color: '#1e293b',
//                                                 fontSize: '0.85rem',
//                                                 overflow: 'hidden',
//                                                 textOverflow: 'ellipsis',
//                                                 whiteSpace: 'nowrap'
//                                             }}
//                                         >
//                                             {item.product?.name || 'Unknown Product'}
//                                         </Typography>
//                                         <Stack direction="row" spacing={2}>
//                                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
//                                                 Qty: {item.quantity}
//                                             </Typography>
//                                             <Typography variant="body2" sx={{ 
//                                                 fontWeight: 600,
//                                                 color: '#1e293b',
//                                                 fontSize: '0.75rem'
//                                             }}>
//                                                 {formatPrice(item.price)}
//                                             </Typography>
//                                         </Stack>
//                                     </Box>
//                                 </Box>
//                                 {index < Math.min(order.items.length, 2) - 1 && (
//                                     <Divider sx={{ mt: 2 }} />
//                                 )}
//                             </Box>
//                         ))}
                        
//                         {/* Show "+X more items" if there are more than 2 items */}
//                         {order.items.length > 2 && (
//                             <Typography variant="body2" color="text.secondary" sx={{ 
//                                 textAlign: 'center', 
//                                 fontStyle: 'italic',
//                                 fontSize: '0.75rem',
//                                 mt: 1
//                             }}>
//                                 +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
//                             </Typography>
//                         )}
//                     </Stack>
//                 </Box>
                
//                 {/* Order Footer */}
//                 <Box sx={{ 
//                     bgcolor: `${getBorderColor(order)}08`, // ✅ Footer matches border color (lighter)
//                     p: 2.5,
//                     borderTop: `1px solid ${getBorderColor(order)}30`,
//                     mt: 'auto'
//                 }}>
//                     <Typography variant="h6" sx={{ 
//                         fontWeight: 700,
//                         color: '#1e293b',
//                         mb: 2,
//                         fontSize: '1rem'
//                     }}>
//                         Total: {formatPrice(order.totalAmount)}
//                     </Typography>
                    
//                     {/* Action Buttons Stack */}
//                     <Stack spacing={1}>
//                         {/* Cancel Order Button */}
//                         {(order.orderStatus || 'pending') === 'pending' && (
//                             <Button
//                                 variant="outlined"
//                                 color="error"
//                                 size="small"
//                                 startIcon={<Cancel sx={{ fontSize: 16 }} />}
//                                 onClick={() => {
//                                     Swal.fire({
//                                         title: 'Are you sure?',
//                                         text: "You won't be able to revert this!",
//                                         icon: 'warning',
//                                         showCancelButton: true,
//                                         confirmButtonColor: '#ef4444',
//                                         cancelButtonColor: '#d1d5db',
//                                         confirmButtonText: 'Yes, cancel it!',
//                                     }).then((result) => {
//                                         if (result.isConfirmed) {
//                                             cancelOrder(order._id);
//                                             Swal.fire('Cancelled!', 'The order has been cancelled.', 'success');
//                                         }
//                                     });
//                                 }}
//                                 sx={{
//                                     borderColor: '#ef4444',
//                                     color: '#ef4444',
//                                     textTransform: 'none',
//                                     fontWeight: 600,
//                                     fontSize: '0.8rem'
//                                 }}
//                             >
//                                 Cancel Order
//                             </Button>
//                         )}

//                         {/* Return Order Button */}
//                         {order.orderStatus === 'delivered' && 
//                          !order.orderStatus?.includes('return') && 
//                          !order.returnStatus && 
//                          !returnRequests.has(order._id) && (
//                             <Button
//                                 variant="outlined"
//                                 size="small"
//                                 startIcon={<AssignmentReturn sx={{ fontSize: 16 }} />}
//                                 disabled={!isReturnAvailable(order)}
//                                 onClick={() => handleReturnRequest(order._id)}
//                                 sx={{
//                                     borderColor: isReturnAvailable(order) ? '#f97316' : '#9ca3af',
//                                     color: isReturnAvailable(order) ? '#f97316' : '#9ca3af',
//                                     textTransform: 'none',
//                                     fontWeight: 600,
//                                     fontSize: '0.8rem',
//                                     '&:hover': {
//                                         borderColor: isReturnAvailable(order) ? '#ea580c' : '#9ca3af',
//                                         bgcolor: isReturnAvailable(order) ? '#fff7ed' : 'transparent'
//                                     }
//                                 }}
//                             >
//                                 {isReturnAvailable(order) ? 'Return Order' : 'Return Expired'}
//                             </Button>
//                         )}
                        
//                         {/* Feedback button */}
//                         {(order.orderStatus === 'delivered') && (
//                             <Button
//                                 variant="contained"
//                                 size="small"
//                                 disabled={submittedFeedbacks.has(order._id)}
//                                 onClick={() => {
//                                     if (submittedFeedbacks.has(order._id)) {
//                                         Swal.fire({
//                                             icon: 'info',
//                                             title: 'Already Submitted',
//                                             text: 'You have already given feedback for this order.',
//                                             confirmButtonColor: '#3b82f6'
//                                         });
//                                         return;
//                                     }
                                    
//                                     Swal.fire({
//                                         title: 'Rate your order',
//                                         html: `
//                                             <div style="margin-bottom: 1rem;">
//                                                 <div id="rating"></div>
//                                             </div>
//                                             <textarea id="feedback" class="swal2-textarea" placeholder="Share your experience..."></textarea>
//                                         `,
//                                         didOpen: () => {
//                                             const container = Swal.getHtmlContainer().querySelector('#rating');
//                                             const stars = Array.from({ length: 5 }, (_, i) => {
//                                                 const star = document.createElement('span');
//                                                 star.innerHTML = '★';
//                                                 star.style.cursor = 'pointer';
//                                                 star.style.fontSize = '2rem';
//                                                 star.style.color = '#ddd';
//                                                 star.style.margin = '0 5px';
//                                                 star.addEventListener('click', () => {
//                                                     stars.forEach((s, index) => {
//                                                         s.style.color = index <= i ? '#fbbf24' : '#ddd';
//                                                     });
//                                                     container.dataset.rating = i + 1;
//                                                 });
//                                                 container.appendChild(star);
//                                                 return star;
//                                             });
//                                         },
//                                         preConfirm: () => {
//                                             const rating = Swal.getHtmlContainer().querySelector('#rating').dataset.rating;
//                                             const feedback = Swal.getHtmlContainer().querySelector('#feedback').value;
//                                             if (!rating) {
//                                                 Swal.showValidationMessage('Please select a rating');
//                                                 return false;
//                                             }
//                                             return { rating: parseInt(rating), feedback };
//                                         },
//                                         showCancelButton: true,
//                                         confirmButtonText: 'Submit Feedback',
//                                         cancelButtonText: 'Cancel',
//                                     }).then((result) => {
//                                         if (result.isConfirmed) {
//                                             handleSubmitFeedback(order._id, result.value.rating, result.value.feedback);
//                                         }
//                                     });
//                                 }}
//                                 sx={{
//                                     bgcolor: submittedFeedbacks.has(order._id) ? '#9ca3af' : '#1e293b',
//                                     textTransform: 'none',
//                                     fontWeight: 600,
//                                     fontSize: '0.8rem',
//                                     '&:hover': {
//                                         bgcolor: submittedFeedbacks.has(order._id) ? '#9ca3af' : '#334155'
//                                     },
//                                     '&:disabled': {
//                                         color: 'white'
//                                     }
//                                 }}
//                             >
//                                 {submittedFeedbacks.has(order._id) ? 'Feedback Submitted ✓' : 'Give Feedback'}
//                             </Button>
//                         )}
//                     </Stack>
//                 </Box>
//             </Paper>
//         </Grid>
//     );

//     return (
//         <Box sx={{ 
//             minHeight: '100vh', 
//             display: 'flex', 
//             flexDirection: 'column',
//             bgcolor: '#fafafa'
//         }}>
//             <Header />
//             <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>

//                 {/* Header Section */}
//                 <Box sx={{ mb: 4 }}>
//                     <Button
//                         startIcon={<ArrowBack />}
//                         onClick={handleBackToHome}
//                         sx={{ 
//                             mb: 3,
//                             color: '#64748b',
//                             '&:hover': {
//                                 bgcolor: '#f1f5f9'
//                             }
//                         }}
//                     >
//                         Back to Home
//                     </Button>

//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                         <Receipt sx={{ fontSize: 32, color: '#475569' }} />
//                         <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
//                             Order History
//                         </Typography>
//                     </Box>
//                     <Typography variant="body1" color="text.secondary">
//                         Track and manage your orders
//                     </Typography>
//                 </Box>

//                 {/* ✅ SMALLER STATS SUMMARY CARDS - 3 in a row */}
//                 <Grid container spacing={2} sx={{ mb: 3 }}>
//                     <Grid item xs={4}>
//                         <Card sx={{ 
//                             p: 2, 
//                             textAlign: 'center', 
//                             border: '2px solid #10b981',
//                             bgcolor: '#ecfdf5',
//                             borderRadius: 2
//                         }}>
//                             <ShoppingCart sx={{ fontSize: 28, color: '#10b981', mb: 0.5 }} />
//                             <Typography variant="h6" sx={{ fontWeight: 700, color: '#065f46' }}>
//                                 {active.length}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
//                                 Active Orders
//                             </Typography>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={4}>
//                         <Card sx={{ 
//                             p: 2, 
//                             textAlign: 'center', 
//                             border: '2px solid #f97316',
//                             bgcolor: '#fff7ed',
//                             borderRadius: 2
//                         }}>
//                             <Undo sx={{ fontSize: 28, color: '#f97316', mb: 0.5 }} />
//                             <Typography variant="h6" sx={{ fontWeight: 700, color: '#c2410c' }}>
//                                 {returns.length}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
//                                 Returns/Refunds
//                             </Typography>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={4}>
//                         <Card sx={{ 
//                             p: 2, 
//                             textAlign: 'center', 
//                             border: '2px solid #ef4444',
//                             bgcolor: '#fef2f2',
//                             borderRadius: 2
//                         }}>
//                             <Block sx={{ fontSize: 28, color: '#ef4444', mb: 0.5 }} />
//                             <Typography variant="h6" sx={{ fontWeight: 700, color: '#dc2626' }}>
//                                 {cancelled.length}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
//                                 Cancelled Orders
//                             </Typography>
//                         </Card>
//                     </Grid>
//                 </Grid>

//                 {/* ✅ BEAUTIFUL COLORED TAB NAVIGATION */}
//                 <Paper sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
//                     <Tabs
//                         value={activeTab}
//                         onChange={(e, newValue) => setActiveTab(newValue)}
//                         variant="fullWidth"
//                         sx={{
//                             '& .MuiTab-root': {
//                                 textTransform: 'none',
//                                 fontWeight: 600,
//                                 fontSize: '1rem',
//                                 py: 2.5,
//                                 minHeight: 'auto',
//                                 transition: 'all 0.3s ease',
//                                 '&:hover': {
//                                     bgcolor: 'rgba(16, 185, 129, 0.1)'
//                                 }
//                             },
//                             '& .MuiTabs-indicator': {
//                                 height: 4,
//                                 borderRadius: '2px 2px 0 0',
//                                 background: 'linear-gradient(135deg, #10b981, #059669)'
//                             },
//                             '& .Mui-selected': {
//                                 color: '#059669 !important',
//                                 fontWeight: '700 !important',
//                                 background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))'
//                             }
//                         }}
//                     >
//                         <Tab 
//                             icon={<ShoppingCart sx={{ color: activeTab === 0 ? '#059669' : '#64748b' }} />} 
//                             label={`Active Orders (${active.length})`}
//                             iconPosition="start"
//                             sx={{
//                                 background: activeTab === 0 
//                                     ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))' 
//                                     : 'transparent'
//                             }}
//                         />
//                         <Tab 
//                             icon={<AssignmentReturn sx={{ color: activeTab === 1 ? '#f97316' : '#64748b' }} />} 
//                             label={`Returns (${returns.length})`}
//                             iconPosition="start"
//                             sx={{
//                                 background: activeTab === 1 
//                                     ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(194, 65, 12, 0.1))' 
//                                     : 'transparent',
//                                 '&.Mui-selected': {
//                                     color: '#f97316 !important'
//                                 }
//                             }}
//                         />
//                         <Tab 
//                             icon={<Cancel sx={{ color: activeTab === 2 ? '#ef4444' : '#64748b' }} />} 
//                             label={`Cancelled (${cancelled.length})`}
//                             iconPosition="start"
//                             sx={{
//                                 background: activeTab === 2 
//                                     ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))' 
//                                     : 'transparent',
//                                 '&.Mui-selected': {
//                                     color: '#ef4444 !important'
//                                 }
//                             }}
//                         />
//                     </Tabs>
//                 </Paper>

//                 {/* ✅ ORDERS CONTENT BASED ON ACTIVE TAB */}
//                 {orders.length === 0 ? (
//                     <Card sx={{ 
//                         textAlign: 'center', 
//                         py: 8,
//                         border: '1px solid #e2e8f0',
//                         boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//                         borderRadius: 3
//                     }}>
//                         <CardContent>
//                             <Avatar sx={{ 
//                                 bgcolor: '#f1f5f9', 
//                                 width: 80, 
//                                 height: 80, 
//                                 mx: 'auto', 
//                                 mb: 3 
//                             }}>
//                                 <ShoppingBag sx={{ fontSize: 40, color: '#64748b' }} />
//                             </Avatar>
//                             <Typography variant="h6" sx={{ mb: 1, color: '#334155' }}>
//                                 No orders found
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                                 You haven't placed any orders yet. Start exploring our products.
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 onClick={() => window.location.href = '/products'}
//                                 sx={{ 
//                                     bgcolor: '#1e293b',
//                                     px: 4,
//                                     py: 1.5,
//                                     borderRadius: 2,
//                                     textTransform: 'none',
//                                     fontWeight: 600,
//                                     '&:hover': {
//                                         bgcolor: '#334155'
//                                     }
//                                 }}
//                             >
//                                 Start Shopping
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ) : getCurrentOrders().length === 0 ? (
//                     <Card sx={{ 
//                         textAlign: 'center', 
//                         py: 8,
//                         border: '1px solid #e2e8f0',
//                         boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//                         borderRadius: 3
//                     }}>
//                         <CardContent>
//                             <Typography variant="h6" sx={{ mb: 1, color: '#334155' }}>
//                                 No {activeTab === 0 ? 'active' : activeTab === 1 ? 'return' : 'cancelled'} orders
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 {activeTab === 0 && 'All your orders are either completed, returned, or cancelled.'}
//                                 {activeTab === 1 && 'You have no return requests at the moment.'}
//                                 {activeTab === 2 && 'You have no cancelled orders.'}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 ) : (
//                     <Grid container spacing={3}>
//                         {getCurrentOrders().map((order) => renderOrderCard(order))}
//                     </Grid>
//                 )}
//             </Container>
//             <Footer />
//         </Box>
//     );
// };

// export default Orders;












import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Grid,
    Chip,
    Card,
    CardContent,
    Divider,
    Stack,
    Avatar,
    Tabs,
    Tab
} from '@mui/material';
import {
    ShoppingBag,
    LocalShipping,
    Cancel,
    CheckCircle,
    Schedule,
    ArrowBack,
    Receipt,
    CalendarToday,
    AssignmentReturn,
    ShoppingCart,
    Undo,
    Block
} from '@mui/icons-material';
import { userContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {config} from '../Config/Config';
import Swal from 'sweetalert2';

const Orders = () => {
    const {host}=config;    
    const { orders, getOrders, cancelOrder, submitFeedback, requestReturn } = useContext(userContext);
    const navigate = useNavigate();

    const [localOrders, setLocalOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(0); // 0: Active, 1: Returns, 2: Cancelled
    const [submittedFeedbacks, setSubmittedFeedbacks] = useState(() => {
        const saved = localStorage.getItem('submittedFeedbacks');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const [returnRequests, setReturnRequests] = useState(() => {
        const saved = localStorage.getItem('returnRequests');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        setLocalOrders(orders);
    }, [orders]);

    // ✅ CATEGORIZE ORDERS INTO SECTIONS
    const categorizeOrders = () => {
        const activeOrders = [];
        const returnOrders = [];
        const cancelledOrders = [];

        orders.forEach(order => {
            const status = order.orderStatus || 'pending';
            
            if (status === 'cancelled') {
                cancelledOrders.push(order);
            } else if (status.includes('return') || order.returnStatus) {
                returnOrders.push(order);
            } else {
                activeOrders.push(order);
            }
        });

        return {
            active: activeOrders,
            returns: returnOrders,
            cancelled: cancelledOrders
        };
    };

    const { active, returns, cancelled } = categorizeOrders();

    // Get current orders based on active tab
    const getCurrentOrders = () => {
        switch (activeTab) {
            case 0: return active;
            case 1: return returns;
            case 2: return cancelled;
            default: return active;
        }
    };

    // ✅ NEW: Get border color based on order status
    const getBorderColor = (order) => {
        const status = order.orderStatus || 'pending';
        
        if (status === 'cancelled') {
            return '#ef4444'; // Red for cancelled
        } else if (status.includes('return') || order.returnStatus) {
            return '#f97316'; // Orange for returns
        } else if (status === 'delivered') {
            return '#10b981'; // Green for delivered
        } else if (status === 'shipped') {
            return '#3b82f6'; // Blue for shipped
        } else {
            return '#f59e0b'; // Yellow for pending/processing
        }
    };

    // ✅ NEW: Get background color based on order status (subtle)
    const getBgColor = (order) => {
        const status = order.orderStatus || 'pending';
        
        if (status === 'cancelled') {
            return 'rgba(239, 68, 68, 0.03)'; // Light red
        } else if (status.includes('return') || order.returnStatus) {
            return 'rgba(249, 115, 22, 0.03)'; // Light orange
        } else if (status === 'delivered') {
            return 'rgba(16, 185, 129, 0.03)'; // Light green
        } else if (status === 'shipped') {
            return 'rgba(59, 130, 246, 0.03)'; // Light blue
        } else {
            return 'rgba(245, 158, 11, 0.03)'; // Light yellow
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#f59e0b',
            processing: '#3b82f6',
            shipped: '#10b981',
            delivered: '#059669',
            cancelled: '#ef4444',
            'return-requested': '#f97316',
            'return-approved': '#8b5cf6',
            'return-rejected': '#ef4444',
            returned: '#6b7280'
        };
        return colors[status] || '#6b7280';
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: <Schedule sx={{ fontSize: 16 }} />,
            processing: <LocalShipping sx={{ fontSize: 16 }} />,
            shipped: <LocalShipping sx={{ fontSize: 16 }} />,
            delivered: <CheckCircle sx={{ fontSize: 16 }} />,
            cancelled: <Cancel sx={{ fontSize: 16 }} />,
            'return-requested': <AssignmentReturn sx={{ fontSize: 16 }} />,
            'return-approved': <CheckCircle sx={{ fontSize: 16 }} />,
            'return-rejected': <Cancel sx={{ fontSize: 16 }} />,
            returned: <AssignmentReturn sx={{ fontSize: 16 }} />
        };
        return icons[status] || <Schedule sx={{ fontSize: 16 }} />;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const isReturnAvailable = (order) => {
        if (order.orderStatus !== 'delivered') return false;
        
        const deliveryDate = new Date(order.deliveredAt || order.updatedAt);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - deliveryDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
        return daysDifference <= 2;
    };

    const getRemainingReturnDays = (order) => {
        if (order.orderStatus !== 'delivered') return 0;
        
        const deliveryDate = new Date(order.deliveredAt || order.updatedAt);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - deliveryDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
        return Math.max(0, 2 - daysDifference);
    };

    const handleSubmitFeedback = async (orderId, rating, feedback) => {
        try {
            console.log('📝 Starting feedback submission...');
            
            const result = await submitFeedback(orderId, rating, feedback);
            
            if (result.success) {
                const newSubmitted = new Set([...submittedFeedbacks, orderId]);
                setSubmittedFeedbacks(newSubmitted);
                localStorage.setItem('submittedFeedbacks', JSON.stringify([...newSubmitted]));
                
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you!',
                    text: result.message || 'Your feedback has been submitted successfully.',
                    confirmButtonColor: '#059669',
                    timer: 2500,
                    showConfirmButton: false
                });
            }
            
        } catch (error) {
            console.error('❌ Feedback submission failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Submit',
                text: error.message || 'Failed to submit feedback. Please try again later.',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    const handleReturnRequest = async (orderId) => {
        const order = orders.find(o => o._id === orderId);
        
        if (!isReturnAvailable(order)) {
            Swal.fire({
                icon: 'error',
                title: 'Return Not Available',
                text: 'Return period has expired. Returns are only available within 2 days of delivery.',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        if (returnRequests.has(orderId) || order.returnStatus) {
            Swal.fire({
                icon: 'info',
                title: 'Return Already Requested',
                text: 'You have already requested a return for this order.',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        const returnReasons = [
            'Defective/Damaged Product',
            'Wrong Item Received',
            'Size/Fit Issues',
            'Product Not as Described',
            'Quality Issues',
            'Changed My Mind',
            'Other'
        ];

        const { value: formValues } = await Swal.fire({
            title: 'Request Return & Refund',
            html: `
                <div style="text-align: left; margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Reason for Return:</label>
                    <select id="return-reason" class="swal2-input" style="margin-bottom: 1rem;">
                        <option value="">Select a reason</option>
                        ${returnReasons.map(reason => `<option value="${reason}">${reason}</option>`).join('')}
                    </select>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Additional Comments (Optional):</label>
                    <textarea id="return-comments" class="swal2-textarea" placeholder="Please provide additional details about the issue..."></textarea>
                    <div style="margin-top: 1rem; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem; border-left: 4px solid #3b82f6;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">Return Policy:</h4>
                        <ul style="margin: 0; padding-left: 1.5rem; color: #4b5563; font-size: 0.9rem;">
                            <li>Returns are accepted within 2 days of delivery</li>
                            <li>Items must be in original condition</li>
                            <li>Refund will be processed after item inspection</li>
                            <li>Processing time: 3-5 business days</li>
                        </ul>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Submit Return Request',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#f97316',
            preConfirm: () => {
                const reason = document.getElementById('return-reason').value;
                const comments = document.getElementById('return-comments').value;
                
                if (!reason) {
                    Swal.showValidationMessage('Please select a reason for return');
                    return false;
                }
                
                return { reason, comments };
            },
            width: '600px'
        });

        if (formValues) {
            try {
                await requestReturn(orderId, formValues.reason, formValues.comments);
                
                const newReturnRequests = new Set([...returnRequests, orderId]);
                setReturnRequests(newReturnRequests);
                localStorage.setItem('returnRequests', JSON.stringify([...newReturnRequests]));

                Swal.fire({
                    icon: 'success',
                    title: 'Return Request Submitted!',
                    html: `
                        <div style="text-align: left;">
                            <p><strong>Your return request has been submitted successfully.</strong></p>
                            <div style="margin-top: 1rem; padding: 1rem; background-color: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #3b82f6;">
                                <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">What happens next?</h4>
                                <ol style="margin: 0; padding-left: 1.5rem; color: #4b5563; font-size: 0.9rem;">
                                    <li>Our team will review your request within 24 hours</li>
                                    <li>If approved, we'll email you return instructions</li>
                                    <li>Package and send the item back to us</li>
                                    <li>Refund will be processed after inspection</li>
                                </ol>
                            </div>
                        </div>
                    `,
                    confirmButtonColor: '#059669',
                    width: '500px'
                });

                getOrders();

            } catch (error) {
                console.error('Return request error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Request Failed',
                    text: 'Failed to submit return request. Please try again later.',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    const handleBackToHome = () => {
        window.location.href = '/';
    };

    // ✅ UPDATED RENDER ORDER CARD WITH RETURN STATUS DISPLAY
    const renderOrderCard = (order) => (
        <Grid item xs={12} md={6} lg={4} key={order._id}>
            <Paper sx={{ 
                border: `2px solid ${getBorderColor(order)}`, // ✅ Colored border
                borderRadius: 3,
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: getBgColor(order), // ✅ Subtle background color
                '&:hover': {
                    boxShadow: `0 8px 15px 0 ${getBorderColor(order)}30`, // ✅ Colored shadow on hover
                    transform: 'translateY(-4px)',
                    borderColor: getBorderColor(order)
                }
            }}>
                {/* Order Header */}
                <Box sx={{ 
                    bgcolor: `${getBorderColor(order)}15`, // ✅ Header matches border color
                    p: 2.5,
                    borderBottom: `1px solid ${getBorderColor(order)}30`
                }}>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>
                            Order #{order._id?.slice(-8).toUpperCase()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 12, color: '#64748b' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {formatDate(order.createdAt)}
                            </Typography>
                        </Box>
                        
                        {/* ✅ FIXED: Only show return availability for delivered orders that have NO return status */}
                        {order.orderStatus === 'delivered' && 
                         !order.orderStatus?.includes('return') && 
                         !order.returnStatus && 
                         !returnRequests.has(order._id) && (
                            <Box sx={{ mt: 1 }}>
                                {isReturnAvailable(order) ? (
                                    <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600, fontSize: '0.75rem' }}>
                                        ✓ Return available ({getRemainingReturnDays(order)} days remaining)
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500, fontSize: '0.75rem' }}>
                                        Return period expired
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Box>

                    {/* ✅ ENHANCED STATUS DISPLAY WITH RETURN STATUS */}
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ gap: 0.5 }}>
                        {/* Main Order Status */}
                        <Chip
                            icon={getStatusIcon(order.orderStatus || 'pending')}
                            label={(order.orderStatus || 'pending').replace('-', ' ').toUpperCase()}
                            size="small"
                            sx={{
                                bgcolor: getStatusColor(order.orderStatus || 'pending'),
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem'
                            }}
                        />
                        
                        {/* ✅ NEW: Return Status Chip */}
                        {order.returnStatus && (
                            <Chip
                                icon={
                                    order.returnStatus === 'approved' ? <CheckCircle sx={{ fontSize: 14 }} /> :
                                    order.returnStatus === 'rejected' ? <Cancel sx={{ fontSize: 14 }} /> :
                                    order.returnStatus === 'requested' ? <Schedule sx={{ fontSize: 14 }} /> :
                                    <AssignmentReturn sx={{ fontSize: 14 }} />
                                }
                                label={
                                    order.returnStatus === 'approved' ? 'RETURN APPROVED' :
                                    order.returnStatus === 'rejected' ? 'RETURN REJECTED' :
                                    order.returnStatus === 'requested' ? 'RETURN PENDING' :
                                    order.returnStatus.toUpperCase()
                                }
                                size="small"
                                sx={{
                                    bgcolor: 
                                        order.returnStatus === 'approved' ? '#10b981' :
                                        order.returnStatus === 'rejected' ? '#ef4444' :
                                        order.returnStatus === 'requested' ? '#f59e0b' :
                                        '#6b7280',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                    animation: order.returnStatus === 'approved' ? 'pulse 2s ease-in-out infinite' : 'none',
                                    '@keyframes pulse': {
                                        '0%': { opacity: 1 },
                                        '50%': { opacity: 0.7 },
                                        '100%': { opacity: 1 }
                                    }
                                }}
                            />
                        )}
                        
                        {/* ✅ NEW: Show if return request was submitted locally */}
                        {!order.returnStatus && returnRequests.has(order._id) && (
                            <Chip
                                icon={<Schedule sx={{ fontSize: 14 }} />}
                                label="RETURN SUBMITTED"
                                size="small"
                                sx={{
                                    bgcolor: '#f59e0b',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.7rem'
                                }}
                            />
                        )}
                    </Stack>

                    {/* ✅ NEW: Return Status Message */}
                    {order.returnStatus && (
                        <Box sx={{ 
                            mt: 1.5, 
                            p: 1.5, 
                            borderRadius: 1, 
                            bgcolor: 
                                order.returnStatus === 'approved' ? 'rgba(16, 185, 129, 0.1)' :
                                order.returnStatus === 'rejected' ? 'rgba(239, 68, 68, 0.1)' :
                                'rgba(245, 158, 11, 0.1)',
                            border: `1px solid ${
                                order.returnStatus === 'approved' ? '#10b981' :
                                order.returnStatus === 'rejected' ? '#ef4444' :
                                '#f59e0b'
                            }30`
                        }}>
                            <Typography variant="body2" sx={{ 
                                color: 
                                    order.returnStatus === 'approved' ? '#059669' :
                                    order.returnStatus === 'rejected' ? '#dc2626' :
                                    '#d97706',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                mb: 0.5
                            }}>
                                {order.returnStatus === 'approved' && 
                                    '✅ Return approved! Refund will be processed within 3-5 business days.'
                                }
                                {order.returnStatus === 'rejected' && 
                                    '❌ Return request rejected. You can keep the product.'
                                }
                                {order.returnStatus === 'requested' && 
                                    '⏳ Return request is being reviewed by the vendor.'
                                }
                            </Typography>
                            
                            {/* Show vendor comments if available */}
                            {order.returnComments && order.returnComments.includes('Vendor Response:') && (
                                <Typography variant="body2" sx={{ 
                                    color: '#6b7280',
                                    fontSize: '0.7rem',
                                    fontStyle: 'italic'
                                }}>
                                    Vendor: {order.returnComments.split('Vendor Response:')[1]?.trim()}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
                
                {/* Order Items */}
                <Box sx={{ p: 2.5, flex: 1 }}>
                    <Stack spacing={2}>
                        {order.items.slice(0, 2).map((item, index) => ( // Show only first 2 items
                            <Box key={item._id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {item.product?.images?.length > 0 ? (
                                        <Box
                                            component="img"
                                            src={`${host}/uploads/products/${item.product.images[0]}`}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                objectFit: 'cover',
                                                borderRadius: 1.5,
                                                border: '1px solid #e2e8f0'
                                            }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                bgcolor: '#e2e8f0',
                                                borderRadius: 1.5,
                                                border: '1px solid #e2e8f0',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#64748b',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            N/A
                                        </Box>
                                    )}

                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontWeight: 600, 
                                                color: '#1e293b',
                                                fontSize: '0.85rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {item.product?.name || 'Unknown Product'}
                                        </Typography>
                                        <Stack direction="row" spacing={2}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                                Qty: {item.quantity}
                                            </Typography>
                                            <Typography variant="body2" sx={{ 
                                                fontWeight: 600,
                                                color: '#1e293b',
                                                fontSize: '0.75rem'
                                            }}>
                                                {formatPrice(item.price)}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                                {index < Math.min(order.items.length, 2) - 1 && (
                                    <Divider sx={{ mt: 2 }} />
                                )}
                            </Box>
                        ))}
                        
                        {/* Show "+X more items" if there are more than 2 items */}
                        {order.items.length > 2 && (
                            <Typography variant="body2" color="text.secondary" sx={{ 
                                textAlign: 'center', 
                                fontStyle: 'italic',
                                fontSize: '0.75rem',
                                mt: 1
                            }}>
                                +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                            </Typography>
                        )}
                    </Stack>
                </Box>
                
                {/* Order Footer */}
                <Box sx={{ 
                    bgcolor: `${getBorderColor(order)}08`, // ✅ Footer matches border color (lighter)
                    p: 2.5,
                    borderTop: `1px solid ${getBorderColor(order)}30`,
                    mt: 'auto'
                }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 700,
                        color: '#1e293b',
                        mb: 2,
                        fontSize: '1rem'
                    }}>
                        Total: {formatPrice(order.totalAmount)}
                    </Typography>
                    
                    {/* Action Buttons Stack */}
                    <Stack spacing={1}>
                        {/* Cancel Order Button */}
                        {(order.orderStatus || 'pending') === 'pending' && (
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<Cancel sx={{ fontSize: 16 }} />}
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#ef4444',
                                        cancelButtonColor: '#d1d5db',
                                        confirmButtonText: 'Yes, cancel it!',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            cancelOrder(order._id);
                                            Swal.fire('Cancelled!', 'The order has been cancelled.', 'success');
                                        }
                                    });
                                }}
                                sx={{
                                    borderColor: '#ef4444',
                                    color: '#ef4444',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.8rem'
                                }}
                            >
                                Cancel Order
                            </Button>
                        )}

                        {/* ✅ UPDATED Return Order Button Logic - Hide if ANY return status exists */}
                        {order.orderStatus === 'delivered' && 
                         !order.returnStatus && // ✅ Hide if ANY return status exists
                         !returnRequests.has(order._id) && (
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<AssignmentReturn sx={{ fontSize: 16 }} />}
                                disabled={!isReturnAvailable(order)}
                                onClick={() => handleReturnRequest(order._id)}
                                sx={{
                                    borderColor: isReturnAvailable(order) ? '#f97316' : '#9ca3af',
                                    color: isReturnAvailable(order) ? '#f97316' : '#9ca3af',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    '&:hover': {
                                        borderColor: isReturnAvailable(order) ? '#ea580c' : '#9ca3af',
                                        bgcolor: isReturnAvailable(order) ? '#fff7ed' : 'transparent'
                                    }
                                }}
                            >
                                {isReturnAvailable(order) ? 'Return Order' : 'Return Expired'}
                            </Button>
                        )}
                        
                        {/* Feedback button */}
                        {(order.orderStatus === 'delivered') && (
                            <Button
                                variant="contained"
                                size="small"
                                disabled={submittedFeedbacks.has(order._id)}
                                onClick={() => {
                                    if (submittedFeedbacks.has(order._id)) {
                                        Swal.fire({
                                            icon: 'info',
                                            title: 'Already Submitted',
                                            text: 'You have already given feedback for this order.',
                                            confirmButtonColor: '#3b82f6'
                                        });
                                        return;
                                    }
                                    
                                    Swal.fire({
                                        title: 'Rate your order',
                                        html: `
                                            <div style="margin-bottom: 1rem;">
                                                <div id="rating"></div>
                                            </div>
                                            <textarea id="feedback" class="swal2-textarea" placeholder="Share your experience..."></textarea>
                                        `,
                                        didOpen: () => {
                                            const container = Swal.getHtmlContainer().querySelector('#rating');
                                            const stars = Array.from({ length: 5 }, (_, i) => {
                                                const star = document.createElement('span');
                                                star.innerHTML = '★';
                                                star.style.cursor = 'pointer';
                                                star.style.fontSize = '2rem';
                                                star.style.color = '#ddd';
                                                star.style.margin = '0 5px';
                                                star.addEventListener('click', () => {
                                                    stars.forEach((s, index) => {
                                                        s.style.color = index <= i ? '#fbbf24' : '#ddd';
                                                    });
                                                    container.dataset.rating = i + 1;
                                                });
                                                container.appendChild(star);
                                                return star;
                                            });
                                        },
                                        preConfirm: () => {
                                            const rating = Swal.getHtmlContainer().querySelector('#rating').dataset.rating;
                                            const feedback = Swal.getHtmlContainer().querySelector('#feedback').value;
                                            if (!rating) {
                                                Swal.showValidationMessage('Please select a rating');
                                                return false;
                                            }
                                            return { rating: parseInt(rating), feedback };
                                        },
                                        showCancelButton: true,
                                        confirmButtonText: 'Submit Feedback',
                                        cancelButtonText: 'Cancel',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            handleSubmitFeedback(order._id, result.value.rating, result.value.feedback);
                                        }
                                    });
                                }}
                                sx={{
                                    bgcolor: submittedFeedbacks.has(order._id) ? '#9ca3af' : '#1e293b',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    '&:hover': {
                                        bgcolor: submittedFeedbacks.has(order._id) ? '#9ca3af' : '#334155'
                                    },
                                    '&:disabled': {
                                        color: 'white'
                                    }
                                }}
                            >
                                {submittedFeedbacks.has(order._id) ? 'Feedback Submitted ✓' : 'Give Feedback'}
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Paper>
        </Grid>
    );

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            bgcolor: '#fafafa'
        }}>
            <Header />
            <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>

                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={handleBackToHome}
                        sx={{ 
                            mb: 3,
                            color: '#64748b',
                            '&:hover': {
                                bgcolor: '#f1f5f9'
                            }
                        }}
                    >
                        Back to Home
                    </Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Receipt sx={{ fontSize: 32, color: '#475569' }} />
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                            Order History
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Track and manage your orders
                    </Typography>
                </Box>

                {/* ✅ SMALLER STATS SUMMARY CARDS - 3 in a row */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={4}>
                        <Card sx={{ 
                            p: 2, 
                            textAlign: 'center', 
                            border: '2px solid #10b981',
                            bgcolor: '#ecfdf5',
                            borderRadius: 2
                        }}>
                            <ShoppingCart sx={{ fontSize: 28, color: '#10b981', mb: 0.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#065f46' }}>
                                {active.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                Active Orders
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ 
                            p: 2, 
                            textAlign: 'center', 
                            border: '2px solid #f97316',
                            bgcolor: '#fff7ed',
                            borderRadius: 2
                        }}>
                            <Undo sx={{ fontSize: 28, color: '#f97316', mb: 0.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#c2410c' }}>
                                {returns.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                Returns/Refunds
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ 
                            p: 2, 
                            textAlign: 'center', 
                            border: '2px solid #ef4444',
                            bgcolor: '#fef2f2',
                            borderRadius: 2
                        }}>
                            <Block sx={{ fontSize: 28, color: '#ef4444', mb: 0.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#dc2626' }}>
                                {cancelled.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                Cancelled Orders
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/* ✅ BEAUTIFUL COLORED TAB NAVIGATION */}
                <Paper sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                py: 2.5,
                                minHeight: 'auto',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(16, 185, 129, 0.1)'
                                }
                            },
                            '& .MuiTabs-indicator': {
                                height: 4,
                                borderRadius: '2px 2px 0 0',
                                background: 'linear-gradient(135deg, #10b981, #059669)'
                            },
                            '& .Mui-selected': {
                                color: '#059669 !important',
                                fontWeight: '700 !important',
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))'
                            }
                        }}
                    >
                        <Tab 
                            icon={<ShoppingCart sx={{ color: activeTab === 0 ? '#059669' : '#64748b' }} />} 
                            label={`Active Orders (${active.length})`}
                            iconPosition="start"
                            sx={{
                                background: activeTab === 0 
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))' 
                                    : 'transparent'
                            }}
                        />
                        <Tab 
                            icon={<AssignmentReturn sx={{ color: activeTab === 1 ? '#f97316' : '#64748b' }} />} 
                            label={`Returns (${returns.length})`}
                            iconPosition="start"
                            sx={{
                                background: activeTab === 1 
                                    ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(194, 65, 12, 0.1))' 
                                    : 'transparent',
                                '&.Mui-selected': {
                                    color: '#f97316 !important'
                                }
                            }}
                        />
                        <Tab 
                            icon={<Cancel sx={{ color: activeTab === 2 ? '#ef4444' : '#64748b' }} />} 
                            label={`Cancelled (${cancelled.length})`}
                            iconPosition="start"
                            sx={{
                                background: activeTab === 2 
                                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))' 
                                    : 'transparent',
                                '&.Mui-selected': {
                                    color: '#ef4444 !important'
                                }
                            }}
                        />
                    </Tabs>
                </Paper>

                {/* ✅ ORDERS CONTENT BASED ON ACTIVE TAB */}
                {orders.length === 0 ? (
                    <Card sx={{ 
                        textAlign: 'center', 
                        py: 8,
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                        borderRadius: 3
                    }}>
                        <CardContent>
                            <Avatar sx={{ 
                                bgcolor: '#f1f5f9', 
                                width: 80, 
                                height: 80, 
                                mx: 'auto', 
                                mb: 3 
                            }}>
                                <ShoppingBag sx={{ fontSize: 40, color: '#64748b' }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ mb: 1, color: '#334155' }}>
                                No orders found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                You haven't placed any orders yet. Start exploring our products.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => window.location.href = '/products'}
                                sx={{ 
                                    bgcolor: '#1e293b',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': {
                                        bgcolor: '#334155'
                                    }
                                }}
                            >
                                Start Shopping
                            </Button>
                        </CardContent>
                    </Card>
                ) : getCurrentOrders().length === 0 ? (
                    <Card sx={{ 
                        textAlign: 'center', 
                        py: 8,
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                        borderRadius: 3
                    }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 1, color: '#334155' }}>
                                No {activeTab === 0 ? 'active' : activeTab === 1 ? 'return' : 'cancelled'} orders
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {activeTab === 0 && 'All your orders are either completed, returned, or cancelled.'}
                                {activeTab === 1 && 'You have no return requests at the moment.'}
                                {activeTab === 2 && 'You have no cancelled orders.'}
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {getCurrentOrders().map((order) => renderOrderCard(order))}
                    </Grid>
                )}
            </Container>
            <Footer />
        </Box>
    );
};

export default Orders;


