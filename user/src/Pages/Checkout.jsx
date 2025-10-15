// import React, { useState, useContext } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Paper,
//     TextField,
//     Button,
//     Radio,
//     RadioGroup,
//     FormControlLabel,
//     FormControl,
//     FormLabel,
//     Grid,
//     Divider,
//     Alert,
//     Card,
//     CardContent,
//     Chip,
//     Avatar,
//     Fade,
//     Slide
// } from '@mui/material';
// import { 
//     LocalShipping, 
//     Person, 
//     Payment, 
//     ShoppingCart,
//     QrCode,
//     AccountBalanceWallet,
//     MonetizationOn,
//     Lock
// } from '@mui/icons-material';
// import { userContext } from '../Context/Context';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import qrimage from '../assets/qr.png';

// const Checkout = () => {
//     const { cart, createOrder } = useContext(userContext);
//     const [formData, setFormData] = useState({
//         shippingAddress: {
//             street: '',
//             city: '',
//             state: '',
//             pincode: '',
//             country: 'India'
//         },
//         contactInfo: {
//             name: '',
//             phone: '',
//             email: ''
//         },
//         paymentMethod: 'COD',
//         paymentDetails: {
//             upiId: '',
//             transactionId: ''
//         }
//     });

//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Validation functions
//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const validatePhone = (phone) => {
//         const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
//         return phoneRegex.test(phone);
//     };

//     const validatePincode = (pincode) => {
//         const pincodeRegex = /^[1-9][0-9]{5}$/; // Indian pincode format
//         return pincodeRegex.test(pincode);
//     };

//     const validateUpiId = (upiId) => {
//         const upiRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;
//         return upiRegex.test(upiId);
//     };

//     const validateTransactionId = (transactionId) => {
//         return transactionId.length >= 8 && transactionId.length <= 20;
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         // Shipping Address Validations
//         if (!formData.shippingAddress.street.trim()) {
//             newErrors['shippingAddress.street'] = 'Street address is required';
//         } else if (formData.shippingAddress.street.trim().length < 10) {
//             newErrors['shippingAddress.street'] = 'Please enter a complete address (minimum 10 characters)';
//         }

//         if (!formData.shippingAddress.city.trim()) {
//             newErrors['shippingAddress.city'] = 'City is required';
//         } else if (formData.shippingAddress.city.trim().length < 2) {
//             newErrors['shippingAddress.city'] = 'Please enter a valid city name';
//         }

//         if (!formData.shippingAddress.state.trim()) {
//             newErrors['shippingAddress.state'] = 'State is required';
//         } else if (formData.shippingAddress.state.trim().length < 2) {
//             newErrors['shippingAddress.state'] = 'Please enter a valid state name';
//         }

//         if (!formData.shippingAddress.pincode.trim()) {
//             newErrors['shippingAddress.pincode'] = 'Pincode is required';
//         } else if (!validatePincode(formData.shippingAddress.pincode)) {
//             newErrors['shippingAddress.pincode'] = 'Please enter a valid 6-digit pincode';
//         }

//         // Contact Information Validations
//         if (!formData.contactInfo.name.trim()) {
//             newErrors['contactInfo.name'] = 'Full name is required';
//         } else if (formData.contactInfo.name.trim().length < 2) {
//             newErrors['contactInfo.name'] = 'Name must be at least 2 characters long';
//         } else if (!/^[a-zA-Z\s]+$/.test(formData.contactInfo.name.trim())) {
//             newErrors['contactInfo.name'] = 'Name can only contain letters and spaces';
//         }

//         if (!formData.contactInfo.phone.trim()) {
//             newErrors['contactInfo.phone'] = 'Phone number is required';
//         } else if (!validatePhone(formData.contactInfo.phone)) {
//             newErrors['contactInfo.phone'] = 'Please enter a valid 10-digit mobile number';
//         }

//         if (!formData.contactInfo.email.trim()) {
//             newErrors['contactInfo.email'] = 'Email is required';
//         } else if (!validateEmail(formData.contactInfo.email)) {
//             newErrors['contactInfo.email'] = 'Please enter a valid email address';
//         }

//         // UPI Payment Validations
//         if (formData.paymentMethod === 'UPI') {
//             if (!formData.paymentDetails.upiId.trim()) {
//                 newErrors['paymentDetails.upiId'] = 'UPI ID is required';
//             } else if (!validateUpiId(formData.paymentDetails.upiId)) {
//                 newErrors['paymentDetails.upiId'] = 'Please enter a valid UPI ID (e.g., user@paytm)';
//             }

//             if (!formData.paymentDetails.transactionId.trim()) {
//                 newErrors['paymentDetails.transactionId'] = 'Transaction ID is required';
//             } else if (!validateTransactionId(formData.paymentDetails.transactionId)) {
//                 newErrors['paymentDetails.transactionId'] = 'Transaction ID must be 8-20 characters long';
//             }
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
        
//         // Clear specific field error when user starts typing
//         if (errors[name]) {
//             setErrors(prev => {
//                 const newErrors = { ...prev };
//                 delete newErrors[name];
//                 return newErrors;
//             });
//         }

//         if (name.includes('.')) {
//             const [parent, child] = name.split('.');
//             setFormData(prev => ({
//                 ...prev,
//                 [parent]: {
//                     ...prev[parent],
//                     [child]: value
//                 }
//             }));
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!validateForm()) {
//             // Scroll to first error
//             const firstErrorField = document.querySelector('.Mui-error');
//             if (firstErrorField) {
//                 firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//             return;
//         }

//         setIsSubmitting(true);
        
//         try {
//             await createOrder(formData);
//         } catch (error) {
//             console.error('Order creation failed:', error);
//             // Handle error (you might want to show an error message)
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const calculateTotal = () => {
//         return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
//     };

//     return (
//         <Box sx={{ 
//             minHeight: '100vh', 
//             display: 'flex', 
//             flexDirection: 'column',
//             backgroundColor: '#f8fafc'
//         }}>
//             <Header />
//             <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
//                 <Box sx={{ mb: 4 }}>
//                     <Typography 
//                         variant="h4" 
//                         sx={{
//                             fontWeight: 600,
//                             color: '#1e293b',
//                             mb: 1
//                         }}
//                     >
//                         Checkout
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         Review your order and complete your purchase
//                     </Typography>
//                 </Box>

//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={8}>
//                         <Paper 
//                             elevation={0}
//                             sx={{ 
//                                 mb: 3,
//                                 borderRadius: 2,
//                                 border: '1px solid #e2e8f0',
//                                 backgroundColor: 'white',
//                                 transition: 'all 0.2s ease',
//                                 '&:hover': {
//                                     borderColor: '#cbd5e1',
//                                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                                 }
//                             }}
//                         >
//                             <Box sx={{ p: 3 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                                     <Box sx={{ 
//                                         width: 40,
//                                         height: 40,
//                                         borderRadius: '8px',
//                                         backgroundColor: '#f1f5f9',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         mr: 2
//                                     }}>
//                                         <LocalShipping sx={{ color: '#475569', fontSize: 20 }} />
//                                     </Box>
//                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
//                                         Shipping Address
//                                     </Typography>
//                                 </Box>
//                                 <Grid container spacing={2.5}>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             label="Street Address"
//                                             name="shippingAddress.street"
//                                             value={formData.shippingAddress.street}
//                                             onChange={handleChange}
//                                             required
//                                             variant="outlined"
//                                             error={!!errors['shippingAddress.street']}
//                                             helperText={errors['shippingAddress.street']}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: '8px',
//                                                     '& fieldset': {
//                                                         borderColor: '#e2e8f0'
//                                                     },
//                                                     '&:hover fieldset': {
//                                                         borderColor: '#94a3b8'
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="City"
//                                             name="shippingAddress.city"
//                                             value={formData.shippingAddress.city}
//                                             onChange={handleChange}
//                                             required
//                                             variant="outlined"
//                                             error={!!errors['shippingAddress.city']}
//                                             helperText={errors['shippingAddress.city']}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: '8px',
//                                                     '& fieldset': {
//                                                         borderColor: '#e2e8f0'
//                                                     },
//                                                     '&:hover fieldset': {
//                                                         borderColor: '#94a3b8'
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="State"
//                                             name="shippingAddress.state"
//                                             value={formData.shippingAddress.state}
//                                             onChange={handleChange}
//                                             required
//                                             variant="outlined"
//                                             error={!!errors['shippingAddress.state']}
//                                             helperText={errors['shippingAddress.state']}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: '8px',
//                                                     '& fieldset': {
//                                                         borderColor: '#e2e8f0'
//                                                     },
//                                                     '&:hover fieldset': {
//                                                         borderColor: '#94a3b8'
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="Pincode"
//                                             name="shippingAddress.pincode"
//                                             value={formData.shippingAddress.pincode}
//                                             onChange={handleChange}
//                                             required
//                                             variant="outlined"
//                                             error={!!errors['shippingAddress.pincode']}
//                                             helperText={errors['shippingAddress.pincode']}
//                                             inputProps={{ maxLength: 6 }}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: '8px',
//                                                     '& fieldset': {
//                                                         borderColor: '#e2e8f0'
//                                                     },
//                                                     '&:hover fieldset': {
//                                                         borderColor: '#94a3b8'
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Paper>

//                         <Paper 
//                             elevation={0}
//                             sx={{ 
//                                 mb: 3,
//                                 borderRadius: 2,
//                                 border: '1px solid #e2e8f0',
//                                 backgroundColor: 'white',
//                                 transition: 'all 0.2s ease',
//                                 '&:hover': {
//                                     borderColor: '#cbd5e1',
//                                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                                 }
//                             }}
//                         >
//                             <Box sx={{ p: 3 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                                     <Box sx={{ 
//                                         width: 40,
//                                         height: 40,
//                                         borderRadius: '8px',
//                                         backgroundColor: '#f1f5f9',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         mr: 2
//                                     }}>
//                                         <Person sx={{ color: '#475569', fontSize: 20 }} />
//                                     </Box>
//                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
//                                         Contact Information
//                                     </Typography>
//                                 </Box>
//                                 <Grid container spacing={2.5}>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             label="Full Name"
//                                             name="contactInfo.name"
//                                             value={formData.contactInfo.name}
//                                             onChange={handleChange}
//                                             required
//                                             variant="outlined"
//                                             error={!!errors['contactInfo.name']}
//                                             helperText={errors['contactInfo.name']}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: '8px',
//                                                     '& fieldset': {
//                                                         borderColor: '#e2e8f0'
//                                                     },
//                                                     '&:hover fieldset': {
//                                                         borderColor: '#94a3b8'
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="Phone Number"
//                                             name="contactInfo.phone"
//                                             value={formData.contactInfo.phone}
//                                             onChange={handleChange}
//                                             required
//                                             variant="outlined"
//                                             error={!!errors['contactInfo.phone']}
//                                             helperText={errors['contactInfo.phone']}
//                                             inputProps={{ maxLength: 10 }}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: '8px',
//                                                     '& fieldset': {
//                                                         borderColor: '#e2e8f0'
//                                                     },
//                                                     '&:hover fieldset': {
//                                                         borderColor: '#94a3b8'
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="Email"
//                                             name="contactInfo.email"
//                                             type="email"
//                                             value={formData.contactInfo.email}
//                                             onChange={handleChange}
//                                             required
//                                             variant="outlined"
//                                             error={!!errors['contactInfo.email']}
//                                             helperText={errors['contactInfo.email']}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: '8px',
//                                                     '& fieldset': {
//                                                         borderColor: '#e2e8f0'
//                                                     },
//                                                     '&:hover fieldset': {
//                                                         borderColor: '#94a3b8'
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Paper>

//                         <Paper 
//                             elevation={0}
//                             sx={{ 
//                                 borderRadius: 2,
//                                 border: '1px solid #e2e8f0',
//                                 backgroundColor: 'white',
//                                 transition: 'all 0.2s ease',
//                                 '&:hover': {
//                                     borderColor: '#cbd5e1',
//                                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                                 }
//                             }}
//                         >
//                             <Box sx={{ p: 3 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                                     <Box sx={{ 
//                                         width: 40,
//                                         height: 40,
//                                         borderRadius: '8px',
//                                         backgroundColor: '#f1f5f9',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         mr: 2
//                                     }}>
//                                         <Payment sx={{ color: '#475569', fontSize: 20 }} />
//                                     </Box>
//                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
//                                         Payment Method
//                                     </Typography>
//                                 </Box>
//                                 <FormControl component="fieldset">
//                                     <RadioGroup
//                                         name="paymentMethod"
//                                         value={formData.paymentMethod}
//                                         onChange={handleChange}
//                                     >
//                                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                                             <Paper 
//                                                 variant="outlined"
//                                                 sx={{ 
//                                                     p: 2.5,
//                                                     cursor: 'pointer',
//                                                     border: formData.paymentMethod === 'COD' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
//                                                     borderRadius: 2,
//                                                     backgroundColor: formData.paymentMethod === 'COD' ? '#f8faff' : 'white',
//                                                     transition: 'all 0.2s ease',
//                                                     '&:hover': {
//                                                         borderColor: '#3b82f6',
//                                                         backgroundColor: '#f8faff'
//                                                     }
//                                                 }}
//                                                 onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'COD' }))}
//                                             >
//                                                 <FormControlLabel 
//                                                     value="COD" 
//                                                     control={<Radio sx={{ color: '#3b82f6' }} />}
//                                                     label={
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                                                             <MonetizationOn sx={{ color: '#475569', fontSize: 20 }} />
//                                                             <Box>
//                                                                 <Typography fontWeight={500} sx={{ color: '#1e293b' }}>
//                                                                     Cash on Delivery
//                                                                 </Typography>
//                                                                 <Typography variant="body2" color="text.secondary">
//                                                                     Pay when your order arrives
//                                                                 </Typography>
//                                                             </Box>
//                                                         </Box>
//                                                     }
//                                                     sx={{ margin: 0, width: '100%' }}
//                                                 />
//                                             </Paper>
                                            
//                                             <Paper 
//                                                 variant="outlined"
//                                                 sx={{ 
//                                                     p: 2.5,
//                                                     cursor: 'pointer',
//                                                     border: formData.paymentMethod === 'UPI' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
//                                                     borderRadius: 2,
//                                                     backgroundColor: formData.paymentMethod === 'UPI' ? '#f8faff' : 'white',
//                                                     transition: 'all 0.2s ease',
//                                                     '&:hover': {
//                                                         borderColor: '#3b82f6',
//                                                         backgroundColor: '#f8faff'
//                                                     }
//                                                 }}
//                                                 onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'UPI' }))}
//                                             >
//                                                 <FormControlLabel 
//                                                     value="UPI" 
//                                                     control={<Radio sx={{ color: '#3b82f6' }} />}
//                                                     label={
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                                                             <AccountBalanceWallet sx={{ color: '#475569', fontSize: 20 }} />
//                                                             <Box>
//                                                                 <Typography fontWeight={500} sx={{ color: '#1e293b' }}>
//                                                                     UPI Payment
//                                                                 </Typography>
//                                                                 <Typography variant="body2" color="text.secondary">
//                                                                     Pay instantly using UPI
//                                                                 </Typography>
//                                                             </Box>
//                                                         </Box>
//                                                     }
//                                                     sx={{ margin: 0, width: '100%' }}
//                                                 />
//                                             </Paper>
//                                         </Box>
//                                     </RadioGroup>
//                                 </FormControl>

//                                 {formData.paymentMethod === 'UPI' && (
//                                     <Paper 
//                                         elevation={0}
//                                         sx={{ 
//                                             mt: 3, 
//                                             p: 3, 
//                                             borderRadius: 2,
//                                             backgroundColor: '#f8fafc',
//                                             border: '1px solid #e2e8f0'
//                                         }}
//                                     >
//                                         <Box sx={{ textAlign: 'center', mb: 3 }}>
//                                             <Box sx={{ 
//                                                 width: 48,
//                                                 height: 48,
//                                                 borderRadius: '12px',
//                                                 backgroundColor: '#3b82f6',
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                                 mx: 'auto',
//                                                 mb: 2
//                                             }}>
//                                                 <QrCode sx={{ color: 'white', fontSize: 24 }} />
//                                             </Box>
//                                             <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
//                                                 Scan QR Code to Pay
//                                             </Typography>
//                                             <Typography variant="body2" color="text.secondary">
//                                                 Use any UPI app to scan and pay
//                                             </Typography>
//                                         </Box>
//                                         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//                                             <Paper 
//                                                 elevation={0}
//                                                 sx={{ 
//                                                     p: 2,
//                                                     borderRadius: 2,
//                                                     backgroundColor: 'white',
//                                                     border: '1px solid #e2e8f0'
//                                                 }}
//                                             >
//                                                 <Box 
//                                                     component="img"
//                                                     src={qrimage}
//                                                     alt="UPI QR Code"
//                                                     sx={{ 
//                                                         width: 160, 
//                                                         height: 160,
//                                                         borderRadius: 1
//                                                     }}
//                                                 />
//                                             </Paper>
//                                         </Box>
//                                         <Grid container spacing={2}>
//                                             <Grid item xs={12}>
//                                                 <TextField
//                                                     fullWidth
//                                                     label="UPI ID"
//                                                     name="paymentDetails.upiId"
//                                                     value={formData.paymentDetails.upiId}
//                                                     onChange={handleChange}
//                                                     required={formData.paymentMethod === 'UPI'}
//                                                     variant="outlined"
//                                                     error={!!errors['paymentDetails.upiId']}
//                                                     helperText={errors['paymentDetails.upiId'] || 'e.g., yourname@paytm'}
//                                                     sx={{
//                                                         '& .MuiOutlinedInput-root': {
//                                                             borderRadius: '8px',
//                                                             backgroundColor: 'white',
//                                                             '& fieldset': {
//                                                                 borderColor: '#e2e8f0'
//                                                             },
//                                                             '&:hover fieldset': {
//                                                                 borderColor: '#94a3b8'
//                                                             }
//                                                         }
//                                                     }}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={12}>
//                                                 <TextField
//                                                     fullWidth
//                                                     label="Transaction ID"
//                                                     name="paymentDetails.transactionId"
//                                                     value={formData.paymentDetails.transactionId}
//                                                     onChange={handleChange}
//                                                     required={formData.paymentMethod === 'UPI'}
//                                                     error={!!errors['paymentDetails.transactionId']}
//                                                     helperText={errors['paymentDetails.transactionId'] || 'Enter the UPI transaction ID after payment'}
//                                                     variant="outlined"
//                                                     sx={{
//                                                         '& .MuiOutlinedInput-root': {
//                                                             borderRadius: '8px',
//                                                             backgroundColor: 'white',
//                                                             '& fieldset': {
//                                                                 borderColor: '#e2e8f0'
//                                                             },
//                                                             '&:hover fieldset': {
//                                                                 borderColor: '#94a3b8'
//                                                             }
//                                                         }
//                                                     }}
//                                                 />
//                                             </Grid>
//                                         </Grid>
//                                     </Paper>
//                                 )}
//                             </Box>
//                         </Paper>
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                         <Paper 
//                             elevation={0}
//                             sx={{ 
//                                 borderRadius: 2,
//                                 border: '1px solid #e2e8f0',
//                                 backgroundColor: 'white',
//                                 position: 'sticky',
//                                 top: 20
//                             }}
//                         >
//                             <Box sx={{ p: 3 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                                     <Box sx={{ 
//                                         width: 40,
//                                         height: 40,
//                                         borderRadius: '8px',
//                                         backgroundColor: '#f1f5f9',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         mr: 2
//                                     }}>
//                                         <ShoppingCart sx={{ color: '#475569', fontSize: 20 }} />
//                                     </Box>
//                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
//                                         Order Summary
//                                     </Typography>
//                                 </Box>
                                
//                                 <Box sx={{ mb: 3 }}>
//                                     {cart.map((item) => (
//                                         <Box key={item.product._id} sx={{ 
//                                             display: 'flex', 
//                                             justifyContent: 'space-between', 
//                                             alignItems: 'center',
//                                             py: 2,
//                                             borderBottom: '1px solid #f1f5f9',
//                                             '&:last-child': {
//                                                 borderBottom: 'none'
//                                             }
//                                         }}>
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography fontWeight={500} sx={{ color: '#1e293b', mb: 0.5 }}>
//                                                     {item.product.name}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     Quantity: {item.quantity}
//                                                 </Typography>
//                                             </Box>
//                                             <Typography fontWeight={600} sx={{ color: '#1e293b' }}>
//                                                 ₹{item.product.price * item.quantity}
//                                             </Typography>
//                                         </Box>
//                                     ))}
//                                 </Box>
                                
//                                 <Divider sx={{ my: 2 }} />
                                
//                                 <Box sx={{ 
//                                     display: 'flex',
//                                     justifyContent: 'space-between', 
//                                     alignItems: 'center',
//                                     mb: 3,
//                                     py: 2,
//                                     backgroundColor: '#f8fafc',
//                                     borderRadius: 1.5,
//                                     px: 2
//                                 }}>
//                                     <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
//                                         Total
//                                     </Typography>
//                                     <Typography variant="h5" fontWeight={700} sx={{ color: '#1e293b' }}>
//                                         ₹{calculateTotal()}
//                                     </Typography>
//                                 </Box>
                                
//                                 <Button
//                                     fullWidth
//                                     variant="contained"
//                                     size="large"
//                                     onClick={handleSubmit}
//                                     startIcon={<Lock />}
//                                     sx={{ 
//                                         py: 1.5,
//                                         fontSize: '1rem',
//                                         fontWeight: 600,
//                                         borderRadius: 2,
//                                         backgroundColor: '#1e293b',
//                                         boxShadow: 'none',
//                                         textTransform: 'none',
//                                         '&:hover': {
//                                             backgroundColor: '#0f172a',
//                                             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                                         }
//                                     }}
//                                 >
//                                     Place Order
//                                 </Button>
                                
//                                 <Box sx={{ 
//                                     display: 'flex', 
//                                     alignItems: 'center', 
//                                     justifyContent: 'center',
//                                     mt: 2,
//                                     gap: 1
//                                 }}>
//                                     <Lock sx={{ fontSize: 14, color: '#64748b' }} />
//                                     <Typography variant="caption" color="text.secondary">
//                                         Your payment information is secure
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Container>
//             <Footer />
//         </Box>
//     );
// };

// export default Checkout;



import React, { useState, useContext } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Grid,
    Divider,
    Alert,
    Card,
    CardContent,
    Chip,
    Avatar,
    Fade,
    Slide
} from '@mui/material';
import { 
    LocalShipping, 
    Person, 
    Payment, 
    ShoppingCart,
    QrCode,
    AccountBalanceWallet,
    MonetizationOn,
    Lock
} from '@mui/icons-material';
import { userContext } from '../Context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import qrimage from '../assets/qr.png';

const Checkout = () => {
    const { cart, createOrder } = useContext(userContext);
    const [formData, setFormData] = useState({
        shippingAddress: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
        },
        contactInfo: {
            name: '',
            phone: '',
            email: ''
        },
        paymentMethod: 'COD',
        paymentDetails: {
            upiId: '',
            transactionId: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // NEW: State for saved addresses and contacts
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 1,
            name: 'Home',
            street: '123 Main Street, Apartment 4B',
             city: 'Bangalore',
            state: 'Karnataka', 
            pincode: '400001',
            country: 'India'
        },
        {
            id: 2,
            name: 'Office',
            street: '456 Business Park, Floor 3',
            city: 'Bangalore',
            state: 'Karnataka', 
            pincode: '411001',
            country: 'India'
        }
    ]);

    const [savedContacts, setSavedContacts] = useState([
        {
            id: 1,
            name: 'Personal',
            fullName: 'Jastin',
            phone: '9876543210',
            email: 'jastin@gmail.com'
        },
        {
            id: 2,
            name: 'Work',
            fullName: 'Jastin ',
            phone: '9123456789',
            email: 'jastin@gmail.com'
        }
    ]);

    const [showSavedAddresses, setShowSavedAddresses] = useState(false);
    const [showSavedContacts, setShowSavedContacts] = useState(false);

    // NEW: Helper functions for selecting saved data
    const selectSavedAddress = (address) => {
        setFormData(prev => ({
            ...prev,
            shippingAddress: {
                street: address.street,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
                country: address.country
            }
        }));
        setShowSavedAddresses(false);
    };

    const selectSavedContact = (contact) => {
        setFormData(prev => ({
            ...prev,
            contactInfo: {
                name: contact.fullName,
                phone: contact.phone,
                email: contact.email
            }
        }));
        setShowSavedContacts(false);
    };

    // ALL YOUR EXISTING VALIDATION FUNCTIONS - UNCHANGED
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
        return phoneRegex.test(phone);
    };

    const validatePincode = (pincode) => {
        const pincodeRegex = /^[1-9][0-9]{5}$/; // Indian pincode format
        return pincodeRegex.test(pincode);
    };

    const validateUpiId = (upiId) => {
        const upiRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;
        return upiRegex.test(upiId);
    };

    const validateTransactionId = (transactionId) => {
        return transactionId.length >= 8 && transactionId.length <= 20;
    };

    const validateForm = () => {
        const newErrors = {};

        // Shipping Address Validations
        if (!formData.shippingAddress.street.trim()) {
            newErrors['shippingAddress.street'] = 'Street address is required';
        } else if (formData.shippingAddress.street.trim().length < 10) {
            newErrors['shippingAddress.street'] = 'Please enter a complete address (minimum 10 characters)';
        }

        if (!formData.shippingAddress.city.trim()) {
            newErrors['shippingAddress.city'] = 'City is required';
        } else if (formData.shippingAddress.city.trim().length < 2) {
            newErrors['shippingAddress.city'] = 'Please enter a valid city name';
        }

        if (!formData.shippingAddress.state.trim()) {
            newErrors['shippingAddress.state'] = 'State is required';
        } else if (formData.shippingAddress.state.trim().length < 2) {
            newErrors['shippingAddress.state'] = 'Please enter a valid state name';
        }

        if (!formData.shippingAddress.pincode.trim()) {
            newErrors['shippingAddress.pincode'] = 'Pincode is required';
        } else if (!validatePincode(formData.shippingAddress.pincode)) {
            newErrors['shippingAddress.pincode'] = 'Please enter a valid 6-digit pincode';
        }

        // Contact Information Validations
        if (!formData.contactInfo.name.trim()) {
            newErrors['contactInfo.name'] = 'Full name is required';
        } else if (formData.contactInfo.name.trim().length < 2) {
            newErrors['contactInfo.name'] = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.contactInfo.name.trim())) {
            newErrors['contactInfo.name'] = 'Name can only contain letters and spaces';
        }

        if (!formData.contactInfo.phone.trim()) {
            newErrors['contactInfo.phone'] = 'Phone number is required';
        } else if (!validatePhone(formData.contactInfo.phone)) {
            newErrors['contactInfo.phone'] = 'Please enter a valid 10-digit mobile number';
        }

        if (!formData.contactInfo.email.trim()) {
            newErrors['contactInfo.email'] = 'Email is required';
        } else if (!validateEmail(formData.contactInfo.email)) {
            newErrors['contactInfo.email'] = 'Please enter a valid email address';
        }

        // UPI Payment Validations
        if (formData.paymentMethod === 'UPI') {
            if (!formData.paymentDetails.upiId.trim()) {
                newErrors['paymentDetails.upiId'] = 'UPI ID is required';
            } else if (!validateUpiId(formData.paymentDetails.upiId)) {
                newErrors['paymentDetails.upiId'] = 'Please enter a valid UPI ID (e.g., user@paytm)';
            }

            if (!formData.paymentDetails.transactionId.trim()) {
                newErrors['paymentDetails.transactionId'] = 'Transaction ID is required';
            } else if (!validateTransactionId(formData.paymentDetails.transactionId)) {
                newErrors['paymentDetails.transactionId'] = 'Transaction ID must be 8-20 characters long';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Clear specific field error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to first error
            const firstErrorField = document.querySelector('.Mui-error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setIsSubmitting(true);
        
        try {
            await createOrder(formData);
        } catch (error) {
            console.error('Order creation failed:', error);
            // Handle error (you might want to show an error message)
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: '#f8fafc'
        }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="h4" 
                        sx={{
                            fontWeight: 600,
                            color: '#1e293b',
                            mb: 1
                        }}
                    >
                        Checkout
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Review your order and complete your purchase
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* ENHANCED SHIPPING ADDRESS SECTION */}
                        <Paper 
                            elevation={0}
                            sx={{ 
                                mb: 3,
                                borderRadius: 2,
                                border: '1px solid #e2e8f0',
                                backgroundColor: 'white',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: '#cbd5e1',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }
                            }}
                        >
                            <Box sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ 
                                            width: 40,
                                            height: 40,
                                            borderRadius: '8px',
                                            backgroundColor: '#f1f5f9',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2
                                        }}>
                                            <LocalShipping sx={{ color: '#475569', fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                            Shipping Address
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                                        sx={{
                                            textTransform: 'none',
                                            borderColor: '#e2e8f0',
                                            color: '#475569',
                                            '&:hover': {
                                                borderColor: '#3b82f6',
                                                backgroundColor: '#f8faff'
                                            }
                                        }}
                                    >
                                        {showSavedAddresses ? 'Hide Saved' : 'Use Saved Address'}
                                    </Button>
                                </Box>

                                {/* NEW: Saved Addresses Section */}
                                <Slide direction="down" in={showSavedAddresses} mountOnEnter unmountOnExit>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 2, color: '#64748b' }}>
                                            Select from saved addresses:
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {savedAddresses.map((address) => (
                                                <Grid item xs={12} sm={6} key={address.id}>
                                                    <Paper
                                                        variant="outlined"
                                                        sx={{
                                                            p: 2,
                                                            cursor: 'pointer',
                                                            borderRadius: 2,
                                                            border: '1px solid #e2e8f0',
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                borderColor: '#3b82f6',
                                                                backgroundColor: '#f8faff'
                                                            }
                                                        }}
                                                        onClick={() => selectSavedAddress(address)}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                            <Chip 
                                                                label={address.name} 
                                                                size="small" 
                                                                sx={{ 
                                                                    backgroundColor: '#f1f5f9',
                                                                    color: '#475569',
                                                                    fontWeight: 500
                                                                }} 
                                                            />
                                                        </Box>
                                                        <Typography variant="body2" sx={{ color: '#1e293b', mb: 0.5 }}>
                                                            {address.street}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {address.city}, {address.state} - {address.pincode}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Divider sx={{ mt: 3, mb: 2 }} />
                                        <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                                            Or enter new address:
                                        </Typography>
                                    </Box>
                                </Slide>

                                {/* YOUR EXISTING ADDRESS FORM - UNCHANGED */}
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Street Address"
                                            name="shippingAddress.street"
                                            value={formData.shippingAddress.street}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            error={!!errors['shippingAddress.street']}
                                            helperText={errors['shippingAddress.street']}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#e2e8f0'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#94a3b8'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            name="shippingAddress.city"
                                            value={formData.shippingAddress.city}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            error={!!errors['shippingAddress.city']}
                                            helperText={errors['shippingAddress.city']}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#e2e8f0'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#94a3b8'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="State"
                                            name="shippingAddress.state"
                                            value={formData.shippingAddress.state}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            error={!!errors['shippingAddress.state']}
                                            helperText={errors['shippingAddress.state']}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#e2e8f0'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#94a3b8'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Pincode"
                                            name="shippingAddress.pincode"
                                            value={formData.shippingAddress.pincode}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            error={!!errors['shippingAddress.pincode']}
                                            helperText={errors['shippingAddress.pincode']}
                                            inputProps={{ maxLength: 6 }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#e2e8f0'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#94a3b8'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        {/* ENHANCED CONTACT INFORMATION SECTION */}
                        <Paper 
                            elevation={0}
                            sx={{ 
                                mb: 3,
                                borderRadius: 2,
                                border: '1px solid #e2e8f0',
                                backgroundColor: 'white',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: '#cbd5e1',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }
                            }}
                        >
                            <Box sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ 
                                            width: 40,
                                            height: 40,
                                            borderRadius: '8px',
                                            backgroundColor: '#f1f5f9',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2
                                        }}>
                                            <Person sx={{ color: '#475569', fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                            Contact Information
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setShowSavedContacts(!showSavedContacts)}
                                        sx={{
                                            textTransform: 'none',
                                            borderColor: '#e2e8f0',
                                            color: '#475569',
                                            '&:hover': {
                                                borderColor: '#3b82f6',
                                                backgroundColor: '#f8faff'
                                            }
                                        }}
                                    >
                                        {showSavedContacts ? 'Hide Saved' : 'Use Saved Contact'}
                                    </Button>
                                </Box>

                                {/* NEW: Saved Contacts Section */}
                                <Slide direction="down" in={showSavedContacts} mountOnEnter unmountOnExit>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 2, color: '#64748b' }}>
                                            Select from saved contacts:
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {savedContacts.map((contact) => (
                                                <Grid item xs={12} sm={6} key={contact.id}>
                                                    <Paper
                                                        variant="outlined"
                                                        sx={{
                                                            p: 2,
                                                            cursor: 'pointer',
                                                            borderRadius: 2,
                                                            border: '1px solid #e2e8f0',
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                borderColor: '#3b82f6',
                                                                backgroundColor: '#f8faff'
                                                            }
                                                        }}
                                                        onClick={() => selectSavedContact(contact)}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                            <Chip 
                                                                label={contact.name} 
                                                                size="small" 
                                                                sx={{ 
                                                                    backgroundColor: '#f1f5f9',
                                                                    color: '#475569',
                                                                    fontWeight: 500
                                                                }} 
                                                            />
                                                        </Box>
                                                        <Typography variant="body2" sx={{ color: '#1e293b', mb: 0.5 }}>
                                                            {contact.fullName}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {contact.phone} • {contact.email}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Divider sx={{ mt: 3, mb: 2 }} />
                                        <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                                            Or enter new contact:
                                        </Typography>
                                    </Box>
                                </Slide>

                                {/* YOUR EXISTING CONTACT FORM - UNCHANGED */}
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            name="contactInfo.name"
                                            value={formData.contactInfo.name}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            error={!!errors['contactInfo.name']}
                                            helperText={errors['contactInfo.name']}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#e2e8f0'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#94a3b8'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="contactInfo.phone"
                                            value={formData.contactInfo.phone}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            error={!!errors['contactInfo.phone']}
                                            helperText={errors['contactInfo.phone']}
                                            inputProps={{ maxLength: 10 }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#e2e8f0'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#94a3b8'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="contactInfo.email"
                                            type="email"
                                            value={formData.contactInfo.email}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            error={!!errors['contactInfo.email']}
                                            helperText={errors['contactInfo.email']}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#e2e8f0'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#94a3b8'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        {/* MODIFIED PAYMENT SECTION WITH ORDER SUMMARY ON RIGHT WHEN UPI SELECTED */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={formData.paymentMethod === 'UPI' ? 8 : 12}>
                                <Paper 
                                    elevation={0}
                                    sx={{ 
                                        borderRadius: 2,
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: 'white',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            borderColor: '#cbd5e1',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <Box sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                            <Box sx={{ 
                                                width: 40,
                                                height: 40,
                                                borderRadius: '8px',
                                                backgroundColor: '#f1f5f9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mr: 2
                                            }}>
                                                <Payment sx={{ color: '#475569', fontSize: 20 }} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                                Payment Method
                                            </Typography>
                                        </Box>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                name="paymentMethod"
                                                value={formData.paymentMethod}
                                                onChange={handleChange}
                                            >
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                    <Paper 
                                                        variant="outlined"
                                                        sx={{ 
                                                            p: 2.5,
                                                            cursor: 'pointer',
                                                            border: formData.paymentMethod === 'COD' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                                            borderRadius: 2,
                                                            backgroundColor: formData.paymentMethod === 'COD' ? '#f8faff' : 'white',
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                borderColor: '#3b82f6',
                                                                backgroundColor: '#f8faff'
                                                            }
                                                        }}
                                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'COD' }))}
                                                    >
                                                        <FormControlLabel 
                                                            value="COD" 
                                                            control={<Radio sx={{ color: '#3b82f6' }} />}
                                                            label={
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                                    <MonetizationOn sx={{ color: '#475569', fontSize: 20 }} />
                                                                    <Box>
                                                                        <Typography fontWeight={500} sx={{ color: '#1e293b' }}>
                                                                            Cash on Delivery
                                                                        </Typography>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Pay when your order arrives
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            }
                                                            sx={{ margin: 0, width: '100%' }}
                                                        />
                                                    </Paper>
                                                    
                                                    <Paper 
                                                        variant="outlined"
                                                        sx={{ 
                                                            p: 2.5,
                                                            cursor: 'pointer',
                                                            border: formData.paymentMethod === 'UPI' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                                            borderRadius: 2,
                                                            backgroundColor: formData.paymentMethod === 'UPI' ? '#f8faff' : 'white',
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                borderColor: '#3b82f6',
                                                                backgroundColor: '#f8faff'
                                                            }
                                                        }}
                                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'UPI' }))}
                                                    >
                                                        <FormControlLabel 
                                                            value="UPI" 
                                                            control={<Radio sx={{ color: '#3b82f6' }} />}
                                                            label={
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                                    <AccountBalanceWallet sx={{ color: '#475569', fontSize: 20 }} />
                                                                    <Box>
                                                                        <Typography fontWeight={500} sx={{ color: '#1e293b' }}>
                                                                            UPI Payment
                                                                        </Typography>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Pay instantly using UPI
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            }
                                                            sx={{ margin: 0, width: '100%' }}
                                                        />
                                                    </Paper>
                                                </Box>
                                            </RadioGroup>
                                        </FormControl>

                                        {formData.paymentMethod === 'UPI' && (
                                            <Paper 
                                                elevation={0}
                                                sx={{ 
                                                    mt: 3, 
                                                    p: 3, 
                                                    borderRadius: 2,
                                                    backgroundColor: '#f8fafc',
                                                    border: '1px solid #e2e8f0'
                                                }}
                                            >
                                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                                    <Box sx={{ 
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: '12px',
                                                        backgroundColor: '#3b82f6',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mx: 'auto',
                                                        mb: 2
                                                    }}>
                                                        <QrCode sx={{ color: 'white', fontSize: 24 }} />
                                                    </Box>
                                                    <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                                                        Scan QR Code to Pay
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Use any UPI app to scan and pay
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                                    <Paper 
                                                        elevation={0}
                                                        sx={{ 
                                                            p: 2,
                                                            borderRadius: 2,
                                                            backgroundColor: 'white',
                                                            border: '1px solid #e2e8f0'
                                                        }}
                                                    >
                                                        <Box 
                                                            component="img"
                                                            src={qrimage}
                                                            alt="UPI QR Code"
                                                            sx={{ 
                                                                width: 160, 
                                                                height: 160,
                                                                borderRadius: 1
                                                            }}
                                                        />
                                                    </Paper>
                                                </Box>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="UPI ID"
                                                            name="paymentDetails.upiId"
                                                            value={formData.paymentDetails.upiId}
                                                            onChange={handleChange}
                                                            required={formData.paymentMethod === 'UPI'}
                                                            variant="outlined"
                                                            error={!!errors['paymentDetails.upiId']}
                                                            helperText={errors['paymentDetails.upiId'] || 'e.g., yourname@paytm'}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: 'white',
                                                                    '& fieldset': {
                                                                        borderColor: '#e2e8f0'
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: '#94a3b8'
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Transaction ID"
                                                            name="paymentDetails.transactionId"
                                                            value={formData.paymentDetails.transactionId}
                                                            onChange={handleChange}
                                                            required={formData.paymentMethod === 'UPI'}
                                                            error={!!errors['paymentDetails.transactionId']}
                                                            helperText={errors['paymentDetails.transactionId'] || 'Enter the UPI transaction ID after payment'}
                                                            variant="outlined"
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: 'white',
                                                                    '& fieldset': {
                                                                        borderColor: '#e2e8f0'
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: '#94a3b8'
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* ORDER SUMMARY - SHOWS ON RIGHT WHEN UPI IS SELECTED */}
                            {formData.paymentMethod === 'UPI' && (
                                <Grid item xs={12} md={4}>
                                    <Paper 
                                        elevation={0}
                                        sx={{ 
                                            borderRadius: 2,
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: 'white',
                                            position: 'sticky',
                                            top: 20
                                        }}
                                    >
                                        <Box sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                                <Box sx={{ 
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: '8px',
                                                    backgroundColor: '#f1f5f9',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mr: 2
                                                }}>
                                                    <ShoppingCart sx={{ color: '#475569', fontSize: 20 }} />
                                                </Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                                    Order Summary
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ mb: 3 }}>
                                                {cart.map((item) => (
                                                    <Box key={item.product._id} sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between', 
                                                        alignItems: 'center',
                                                        py: 2,
                                                        borderBottom: '1px solid #f1f5f9',
                                                        '&:last-child': {
                                                            borderBottom: 'none'
                                                        }
                                                    }}>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography fontWeight={500} sx={{ color: '#1e293b', mb: 0.5 }}>
                                                                {item.product.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Quantity: {item.quantity}
                                                            </Typography>
                                                        </Box>
                                                        <Typography fontWeight={600} sx={{ color: '#1e293b' }}>
                                                            ₹{item.product.price * item.quantity}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                            
                                            <Divider sx={{ my: 2 }} />
                                            
                                            <Box sx={{ 
                                                display: 'flex',
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                mb: 3,
                                                py: 2,
                                                backgroundColor: '#f8fafc',
                                                borderRadius: 1.5,
                                                px: 2
                                            }}>
                                                <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                                                    Total
                                                </Typography>
                                                <Typography variant="h5" fontWeight={700} sx={{ color: '#1e293b' }}>
                                                    ₹{calculateTotal()}
                                                </Typography>
                                            </Box>
                                            
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                size="large"
                                                onClick={handleSubmit}
                                                startIcon={<Lock />}
                                                sx={{ 
                                                    py: 1.5,
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    borderRadius: 2,
                                                    backgroundColor: '#1e293b',
                                                    boxShadow: 'none',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#0f172a',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                    }
                                                }}
                                            >
                                                Place Order
                                            </Button>
                                            
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                mt: 2,
                                                gap: 1
                                            }}>
                                                <Lock sx={{ fontSize: 14, color: '#64748b' }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    Your payment information is secure
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>

                        {/* ORDER SUMMARY - SHOWS BELOW WHEN COD IS SELECTED */}
                        {formData.paymentMethod === 'COD' && (
                            <Paper 
                                elevation={0}
                                sx={{ 
                                    mt: 3,
                                    borderRadius: 2,
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: 'white'
                                }}
                            >
                                <Box sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Box sx={{ 
                                            width: 40,
                                            height: 40,
                                            borderRadius: '8px',
                                            backgroundColor: '#f1f5f9',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2
                                        }}>
                                            <ShoppingCart sx={{ color: '#475569', fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                            Order Summary
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{ mb: 3 }}>
                                        {cart.map((item) => (
                                            <Box key={item.product._id} sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                py: 2,
                                                borderBottom: '1px solid #f1f5f9',
                                                '&:last-child': {
                                                    borderBottom: 'none'
                                                }
                                            }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography fontWeight={500} sx={{ color: '#1e293b', mb: 0.5 }}>
                                                        {item.product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Quantity: {item.quantity}
                                                    </Typography>
                                                </Box>
                                                <Typography fontWeight={600} sx={{ color: '#1e293b' }}>
                                                    ₹{item.product.price * item.quantity}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    
                                    <Divider sx={{ my: 2 }} />
                                    
                                    <Box sx={{ 
                                        display: 'flex',
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        mb: 3,
                                        py: 2,
                                        backgroundColor: '#f8fafc',
                                        borderRadius: 1.5,
                                        px: 2
                                    }}>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                                            Total
                                        </Typography>
                                        <Typography variant="h5" fontWeight={700} sx={{ color: '#1e293b' }}>
                                            ₹{calculateTotal()}
                                        </Typography>
                                    </Box>
                                    
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        onClick={handleSubmit}
                                        startIcon={<Lock />}
                                        sx={{ 
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            backgroundColor: '#1e293b',
                                            boxShadow: 'none',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#0f172a',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        Place Order
                                    </Button>
                                    
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        mt: 2,
                                        gap: 1
                                    }}>
                                        <Lock sx={{ fontSize: 14, color: '#64748b' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            Your payment information is secure
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};

export default Checkout;
