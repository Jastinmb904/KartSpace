
// const express = require("express");
// const router = express.Router();
// const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
// require('dotenv').config();


// // Import all controller functions
// const {
//   registerCustomer,
//   loginCustomer,
//   getAllProducts,
//   getProductById,
//   getAllCategories,
//   getCart,
//   addToCart,
//   updateCartItem,
//   removeFromCart,
//   createOrder,
//   getOrders,
//   cancelOrder,
//   submitFeedback,
//   socialLogin,
//   sendOTP,
//   verifyOTP,
//   completeRegistration,
//   resendOTP
// } = require("../controller/UserController");


// // Import middleware
// const { VerifyCustomerToken } = require("../middleware/authCustomer");


// // Import email service for password reset
// const { sendPasswordResetEmail, testEmailConfiguration } = require("../services/emailservice");


// // Multer configuration for file uploads
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/customer");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });


// // Rate limiting middleware
// const rateLimit = require('express-rate-limit');
// const forgotPasswordLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // 5 attempts per window per IP
//   message: {
//     success: false,
//     message: 'Too many password reset attempts. Please try again in 15 minutes.'
//   },
//   standardHeaders: true,
//   legacyHeaders: false
// });


// // ============= AUTHENTICATION ROUTES =============


// // Registration - Traditional Method (Single Step)
// router.post("/register", upload.single("profile"), registerCustomer);


// // Registration - OTP Based Method (Multi-Step)
// router.post("/send-otp", sendOTP);
// router.post("/verify-otp", verifyOTP);
// router.post("/complete-registration", upload.single("profile"), completeRegistration);
// router.post("/resend-otp", resendOTP);


// // Login
// router.post("/login", loginCustomer);


// // Social Login (Google, Facebook, GitHub)
// router.post("/social-login", socialLogin);


// // ============= PRODUCT & CATEGORY ROUTES =============


// // Get all products with filters and pagination
// router.get("/products", getAllProducts);


// // Get single product by ID
// router.get("/products/:id", getProductById);


// // Get all categories
// router.get("/categories", getAllCategories);


// // ============= CART MANAGEMENT ROUTES =============


// // Get user's cart
// router.get("/cart", VerifyCustomerToken, getCart);


// // Add product to cart
// router.post("/cart/add", VerifyCustomerToken, addToCart);


// // Update cart item quantity
// router.put("/cart/update", VerifyCustomerToken, updateCartItem);


// // Remove product from cart
// router.delete("/cart/remove/:productId", VerifyCustomerToken, removeFromCart);


// // ============= ORDER MANAGEMENT ROUTES =============


// // Create new order
// router.post("/order/create", VerifyCustomerToken, createOrder);


// // Get user's orders
// router.get("/orders", VerifyCustomerToken, getOrders);


// // Cancel order
// router.put("/orders/:orderId/cancel", VerifyCustomerToken, cancelOrder);


// // Submit order feedback
// router.post("/orders/:orderId/feedback", VerifyCustomerToken, submitFeedback);


// // ============= EMAIL TEST ROUTE =============
// router.get('/test-email', async (req, res) => {
//   try {
//     console.log('🧪 Testing enhanced email configuration...');
    
//     const result = await testEmailConfiguration();
    
//     console.log('✅ Test email sent successfully:', result.messageId);
//     res.json({ 
//       success: true, 
//       message: 'Test email sent! Check your Gmail inbox (and spam folder).',
//       messageId: result.messageId,
//       timestamp: new Date().toISOString(),
//       note: 'If you receive the test email, your registration and password reset emails will work perfectly!'
//     });


//   } catch (error) {
//     console.error('❌ Test email failed:', error.message);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message,
//       solution: 'Generate fresh Gmail App Password at https://myaccount.google.com/apppasswords',
//       tips: [
//         'Check spam/junk folder',
//         'Ensure 2FA is enabled on Gmail',
//         'Use 16-character app password',
//         'Check network firewall settings'
//       ]
//     });
//   }
// });


// // ============= PASSWORD RESET FUNCTIONS =============


// // Generate 6-digit OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };


// // ✅ STEP 1: SEND PASSWORD RESET OTP - WITH EMAIL SENDING
// router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     console.log('🔐 PASSWORD RESET OTP REQUEST FOR:', email);
    
//     // Basic validation
//     if (!email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email is required' 
//       });
//     }


//     // Email format validation
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Please enter a valid email address' 
//       });
//     }


//     // Find user
//     const Customer = require('../models/Customer');
//     const user = await Customer.findOne({ 
//       email: email.toLowerCase().trim(),
//       isVerified: true 
//     });
    
//     if (!user) {
//       console.log('❌ User not found for email:', email);
//       return res.status(404).json({ 
//         success: false, 
//         message: 'No verified account found with this email address' 
//       });
//     }


//     console.log('✅ User found - ID:', user._id, 'Name:', user.name);


//     // Generate OTP and expiry
//     const resetOTP = generateOTP();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
//     console.log(`🔢 Generated Reset OTP: ${resetOTP} for email: ${email}`);
    
//     // Save OTP to user
//     user.resetPasswordOTP = resetOTP;
//     user.resetOTPExpiry = otpExpiry;
//     await user.save();
    
//     console.log('💾 Reset OTP saved to database');


//     // ✅ TRY TO SEND EMAIL FIRST
//     try {
//       await sendPasswordResetEmail(user.email, resetOTP, user.name);
//       console.log('✅ Password reset OTP email sent successfully');
      
//       res.json({ 
//         success: true, 
//         message: 'Password reset OTP sent to your email address. Please check your inbox and spam folder.',
//         email: email,
//         emailSent: true
//       });
      
//     } catch (emailError) {
//       console.error('❌ Password reset email sending failed:', emailError.message);
      
//       // ✅ CONSOLE FALLBACK IF EMAIL FAILS
//       console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
//       console.log('📧 PASSWORD RESET EMAIL FAILED - CONSOLE FALLBACK');
//       console.log('👤 USER:', user.name, '(' + user.email + ')');
//       console.log('🔑 PASSWORD RESET OTP CODE:', resetOTP);
//       console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
//       console.log('💡 USE THIS OTP TO RESET YOUR PASSWORD');
//       console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
//       res.json({ 
//         success: true, 
//         message: 'Email sending failed, but reset OTP generated! Check your server console for the OTP code.',
//         email: email,
//         emailSent: false,
//         fallback: true
//       });
//     }


//   } catch (error) {
//     console.error('💥 FORGOT PASSWORD ERROR:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error. Please try again.' 
//     });
//   }
// });


// // ✅ STEP 2: VERIFY RESET OTP
// router.post('/verify-reset-otp', async (req, res) => {
//   try {
//     const { email, otp } = req.body;
    
//     console.log('🔍 Verifying reset OTP:', otp, 'for email:', email);
    
//     // Validation
//     if (!email || !otp) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email and OTP are required' 
//       });
//     }
    
//     if (!/^\d{6}$/.test(otp)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'OTP must be 6 digits' 
//       });
//     }
    
//     // Find user with valid OTP
//     const Customer = require('../models/Customer');
//     const user = await Customer.findOne({
//       email: email.toLowerCase().trim(),
//       resetPasswordOTP: otp,
//       resetOTPExpiry: { $gt: new Date() }
//     });
    
//     if (!user) {
//       console.log('❌ Invalid or expired reset OTP');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid or expired OTP. Please request a new reset OTP.' 
//       });
//     }
    
//     console.log('✅ Reset OTP verified successfully');
    
//     res.json({
//       success: true,
//       message: 'OTP verified successfully! You can now set a new password.',
//       userId: user._id.toString()
//     });
    
//   } catch (error) {
//     console.error('❌ Verify reset OTP error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error'
//     });
//   }
// });


// // ✅ STEP 3: RESET PASSWORD WITH OTP
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
    
//     console.log('🔄 Processing password reset with OTP for:', email);
    
//     // Input validation
//     if (!email || !otp || !newPassword) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email, OTP, and new password are required' 
//       });
//     }
    
//     if (newPassword.length < 6) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Password must be at least 6 characters long' 
//       });
//     }
    
//     // Find user with valid OTP
//     const Customer = require('../models/Customer');
//     const user = await Customer.findOne({
//       email: email.toLowerCase().trim(),
//       resetPasswordOTP: otp,
//       resetOTPExpiry: { $gt: new Date() }
//     });
    
//     if (!user) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid or expired OTP. Please request a new reset OTP.' 
//       });
//     }
    
//     console.log('✅ Valid reset OTP found for user:', user.email);
    
//     // Hash new password
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);
    
//     // Update password and clear OTP
//     user.password = hashedPassword;
//     user.resetPasswordOTP = null;
//     user.resetOTPExpiry = null;
//     user.passwordResetAt = new Date();
//     await user.save();
    
//     console.log('✅ Password reset completed successfully for:', user.email);
    
//     res.json({
//       success: true,
//       message: 'Password has been reset successfully! You can now login with your new password.'
//     });
    
//   } catch (error) {
//     console.error('💥 RESET PASSWORD ERROR:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error during password reset'
//     });
//   }
// });


// // ✅ RESEND RESET OTP - WITH EMAIL SENDING
// router.post('/resend-reset-otp', async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     if (!email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email is required' 
//       });
//     }
    
//     console.log('🔄 Resending reset OTP to:', email);
    
//     const Customer = require('../models/Customer');
//     const user = await Customer.findOne({ 
//       email: email.toLowerCase().trim(),
//       isVerified: true
//     });
    
//     if (!user) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid email address' 
//       });
//     }
    
//     // Generate new OTP
//     const resetOTP = generateOTP();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
//     user.resetPasswordOTP = resetOTP;
//     user.resetOTPExpiry = otpExpiry;
//     await user.save();
    
//     console.log(`🔢 New Reset OTP generated: ${resetOTP}`);
    
//     // ✅ TRY TO SEND EMAIL FIRST
//     try {
//       await sendPasswordResetEmail(user.email, resetOTP, user.name);
//       console.log('✅ Reset OTP resent via email successfully');
      
//       res.json({ 
//         success: true, 
//         message: 'New reset OTP sent to your email. Please check your inbox and spam folder.',
//         emailSent: true
//       });
      
//     } catch (emailError) {
//       console.error('❌ Failed to resend reset OTP via email:', emailError.message);
      
//       // ✅ CONSOLE FALLBACK
//       console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
//       console.log('📧 RESEND RESET EMAIL FAILED - CONSOLE FALLBACK');
//       console.log('👤 USER:', user.name, '(' + user.email + ')');
//       console.log('🔑 NEW PASSWORD RESET OTP CODE:', resetOTP);
//       console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
//       console.log('💡 USE THIS NEW OTP TO RESET YOUR PASSWORD');
//       console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
//       res.json({ 
//         success: true, 
//         message: 'Email sending failed, but new reset OTP generated! Check your server console for the OTP code.',
//         emailSent: false,
//         fallback: true
//       });
//     }
    
//   } catch (error) {
//     console.error('❌ Resend reset OTP error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error'
//     });
//   }
// });


// // ============= HEALTH CHECK ROUTE =============
// router.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Customer API is running',
//     timestamp: new Date().toISOString(),
//     version: '1.0.0'
//   });
// });


// // ============= USER PROFILE ROUTES =============


// // Get user profile
// router.get('/profile', VerifyCustomerToken, async (req, res) => {
//   try {
//     const Customer = require('../models/Customer');
//     const user = await Customer.findById(req.customer.id)
//       .select('-password -resetPasswordOTP -verificationOTP')
//       .populate('cart.product', 'name price images');
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       user
//     });
//   } catch (error) {
//     console.error('Profile fetch error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch profile'
//     });
//   }
// });


// // Update user profile
// router.put('/profile', VerifyCustomerToken, upload.single('profile'), async (req, res) => {
//   try {
//     const { name, phone } = req.body;
//     const Customer = require('../models/Customer');
    
//     const updateData = {};
//     if (name) updateData.name = name;
//     if (phone) updateData.phone = phone;
//     if (req.file) updateData.profileImage = req.file.filename;
    
//     const user = await Customer.findByIdAndUpdate(
//       req.customer.id,
//       updateData,
//       { new: true }
//     ).select('-password -resetPasswordOTP -verificationOTP');
    
//     res.json({
//       success: true,
//       message: 'Profile updated successfully',
//       user
//     });
//   } catch (error) {
//     console.error('Profile update error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update profile'
//     });
//   }
// });


// // ✅ ADD THESE DEBUG ROUTES - NEW CODE ADDED HERE
// // Debug route to manually drop TTL index
// router.get('/drop-ttl-index', async (req, res) => {
//   try {
//     const mongoose = require('mongoose');
//     const db = mongoose.connection.db;
    
//     // Get collection info
//     const collections = await db.listCollections({ name: 'customers' }).toArray();
//     if (collections.length === 0) {
//       return res.json({ 
//         success: true, 
//         message: 'Customers collection not found - this is normal for new databases' 
//       });
//     }
    
//     // Get indexes
//     const indexes = await db.collection('customers').indexes();
//     console.log('📋 Current indexes:', indexes);
    
//     // Try to drop TTL index
//     try {
//       await db.collection('customers').dropIndex('tempData.createdAt_1');
//       res.json({ 
//         success: true, 
//         message: 'TTL index dropped successfully! Users will now be stored permanently.',
//         indexes: indexes
//       });
//     } catch (dropError) {
//       if (dropError.message.includes('index not found')) {
//         res.json({ 
//           success: true, 
//           message: 'TTL index not found - users will be stored permanently!',
//           indexes: indexes
//         });
//       } else {
//         throw dropError;
//       }
//     }
    
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message,
//       message: 'Error managing TTL index'
//     });
//   }
// });

// // Debug user data route
// router.get('/debug-user/:email', async (req, res) => {
//   try {
//     const Customer = require('../models/Customer');
//     const user = await Customer.findOne({ email: req.params.email });
    
//     if (!user) {
//       return res.json({
//         success: false,
//         message: 'User not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         isVerified: user.isVerified,
//         hasTempData: !!user.tempData,
//         tempData: user.tempData,
//         hasVerificationOTP: !!user.verificationOTP,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//         status: user.isVerified ? 'PERMANENT USER ✅' : 'TEMPORARY USER ⏳'
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ✅ ADD THESE ROUTES AT THE END OF YOUR EXISTING CustomerRoute.js FILE

// // Request return for an order
// router.post("/orders/:orderId/return-request", VerifyCustomerToken, async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { reason, comments } = req.body;
//         const customerId = req.customer.id;

//         console.log('🔄 Return request initiated:', { orderId, reason, customerId });

//         // Find the order
//         const Order = require('../models/Order');
//         const order = await Order.findOne({ 
//             _id: orderId, 
//             customer: customerId 
//         }).populate('items.product').populate('items.vendor');

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         // Check if order is delivered
//         if (order.orderStatus !== 'delivered') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Only delivered orders can be returned'
//             });
//         }

//         // Check if return period is still valid (2 days)
//         const deliveryDate = new Date(order.deliveredAt || order.updatedAt);
//         const currentDate = new Date();
//         const timeDifference = currentDate.getTime() - deliveryDate.getTime();
//         const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

//         if (daysDifference > 2) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Return period has expired. Returns are only available within 2 days of delivery.'
//             });
//         }

//         // Check if return already requested
//         if (order.returnStatus) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Return has already been requested for this order'
//             });
//         }

//         // Update order with return request
//         order.returnStatus = 'requested';
//         order.returnReason = reason;
//         order.returnComments = comments;
//         order.returnRequestedAt = new Date();
//         order.orderStatus = 'return-requested';

//         await order.save();

//         console.log('✅ Return request saved successfully');

//         // Notify vendors
//         const vendorIds = [...new Set(order.items.map(item => item.vendor._id.toString()))];
//         console.log('📧 Vendors to notify about return request:', vendorIds);

//         res.json({
//             success: true,
//             message: 'Return request submitted successfully. Vendors will review your request within 24 hours.',
//             order
//         });

//     } catch (error) {
//         console.error('💥 Return request error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to process return request'
//         });
//     }
// });


// // ✅ CORRECT CUSTOMER RETURN REQUEST ROUTE

// // ✅ WORKING FEEDBACK ROUTE - Add this to CustomerRoute.js
// // ✅ ADD THIS ROUTE TO CustomerRoute.js (before module.exports)
// router.post("/orders/:orderId/feedback", VerifyCustomerToken, async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { rating, feedback } = req.body;
//         const customerId = req.customer.id;

//         console.log('📝 Feedback submission:', { orderId, rating, feedback, customerId });

//         // Input validation
//         if (!rating || rating < 1 || rating > 5) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Rating must be between 1 and 5'
//             });
//         }

//         const Order = require('../models/Order');

//         // Find the order
//         const order = await Order.findOne({ 
//             _id: orderId, 
//             customer: customerId 
//         });

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         // Check if order is delivered
//         if (order.orderStatus !== 'delivered') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Can only provide feedback for delivered orders'
//             });
//         }

//         // Check if feedback already exists
//         if (order.feedback && order.feedback.rating) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Feedback already submitted for this order'
//             });
//         }

//         // ✅ UPDATE ORDER WITH FEEDBACK (using your model structure)
//         order.feedback = {
//             rating: parseInt(rating),
//             comment: feedback || '',
//             submittedAt: new Date()
//         };

//         await order.save();

//         console.log('✅ Feedback saved successfully');

//         res.json({
//             success: true,
//             message: 'Feedback submitted successfully',
//             feedback: order.feedback
//         });

//     } catch (error) {
//         console.error('💥 Feedback submission error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to submit feedback'
//         });
//     }
// });


// module.exports = router;









const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
require('dotenv').config();


// Import all controller functions
const {
  registerCustomer,
  loginCustomer,
  getAllProducts,
  getProductById,
  getAllCategories,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  createOrder,
  getOrders,
  cancelOrder,
  submitFeedback,
  socialLogin,
  sendOTP,
  verifyOTP,
  completeRegistration,
  resendOTP
} = require("../controller/UserController");


// Import middleware
const { VerifyCustomerToken } = require("../middleware/authCustomer");


// Import email service for password reset
const { sendPasswordResetEmail, testEmailConfiguration } = require("../services/emailservice");


// Multer configuration for file uploads
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/customer");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });


// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window per IP
  message: {
    success: false,
    message: 'Too many password reset attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});


// ============= AUTHENTICATION ROUTES =============


// Registration - Traditional Method (Single Step)
router.post("/register", upload.single("profile"), registerCustomer);


// Registration - OTP Based Method (Multi-Step)
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/complete-registration", upload.single("profile"), completeRegistration);
router.post("/resend-otp", resendOTP);


// Login
router.post("/login", loginCustomer);


// Social Login (Google, Facebook, GitHub)
router.post("/social-login", socialLogin);


// ============= PRODUCT & CATEGORY ROUTES =============


// Get all products with filters and pagination
router.get("/products", getAllProducts);


// Get single product by ID
router.get("/products/:id", getProductById);


// Get all categories
router.get("/categories", getAllCategories);


// ============= CART MANAGEMENT ROUTES =============


// Get user's cart
router.get("/cart", VerifyCustomerToken, getCart);


// Add product to cart
router.post("/cart/add", VerifyCustomerToken, addToCart);


// Update cart item quantity
router.put("/cart/update", VerifyCustomerToken, updateCartItem);


// Remove product from cart
router.delete("/cart/remove/:productId", VerifyCustomerToken, removeFromCart);


// ============= ORDER MANAGEMENT ROUTES =============


// Create new order
router.post("/order/create", VerifyCustomerToken, createOrder);


// Get user's orders
router.get("/orders", VerifyCustomerToken, getOrders);


// Cancel order
router.put("/orders/:orderId/cancel", VerifyCustomerToken, cancelOrder);


// Submit order feedback
router.post("/orders/:orderId/feedback", VerifyCustomerToken, submitFeedback);


// ============= EMAIL TEST ROUTE =============
router.get('/test-email', async (req, res) => {
  try {
    console.log('🧪 Testing enhanced email configuration...');
    
    const result = await testEmailConfiguration();
    
    console.log('✅ Test email sent successfully:', result.messageId);
    res.json({ 
      success: true, 
      message: 'Test email sent! Check your Gmail inbox (and spam folder).',
      messageId: result.messageId,
      timestamp: new Date().toISOString(),
      note: 'If you receive the test email, your registration and password reset emails will work perfectly!'
    });


  } catch (error) {
    console.error('❌ Test email failed:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      solution: 'Generate fresh Gmail App Password at https://myaccount.google.com/apppasswords',
      tips: [
        'Check spam/junk folder',
        'Ensure 2FA is enabled on Gmail',
        'Use 16-character app password',
        'Check network firewall settings'
      ]
    });
  }
});


// ============= PASSWORD RESET FUNCTIONS =============


// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// ✅ STEP 1: SEND PASSWORD RESET OTP - WITH EMAIL SENDING
router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('🔐 PASSWORD RESET OTP REQUEST FOR:', email);
    
    // Basic validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }


    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }


    // Find user
    const Customer = require('../models/Customer');
    const user = await Customer.findOne({ 
      email: email.toLowerCase().trim(),
      isVerified: true 
    });
    
    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(404).json({ 
        success: false, 
        message: 'No verified account found with this email address' 
      });
    }


    console.log('✅ User found - ID:', user._id, 'Name:', user.name);


    // Generate OTP and expiry
    const resetOTP = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    console.log(`🔢 Generated Reset OTP: ${resetOTP} for email: ${email}`);
    
    // Save OTP to user
    user.resetPasswordOTP = resetOTP;
    user.resetOTPExpiry = otpExpiry;
    await user.save();
    
    console.log('💾 Reset OTP saved to database');


    // ✅ TRY TO SEND EMAIL FIRST
    try {
      await sendPasswordResetEmail(user.email, resetOTP, user.name);
      console.log('✅ Password reset OTP email sent successfully');
      
      res.json({ 
        success: true, 
        message: 'Password reset OTP sent to your email address. Please check your inbox and spam folder.',
        email: email,
        emailSent: true
      });
      
    } catch (emailError) {
      console.error('❌ Password reset email sending failed:', emailError.message);
      
      // ✅ CONSOLE FALLBACK IF EMAIL FAILS
      console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
      console.log('📧 PASSWORD RESET EMAIL FAILED - CONSOLE FALLBACK');
      console.log('👤 USER:', user.name, '(' + user.email + ')');
      console.log('🔑 PASSWORD RESET OTP CODE:', resetOTP);
      console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
      console.log('💡 USE THIS OTP TO RESET YOUR PASSWORD');
      console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
      res.json({ 
        success: true, 
        message: 'Email sending failed, but reset OTP generated! Check your server console for the OTP code.',
        email: email,
        emailSent: false,
        fallback: true
      });
    }


  } catch (error) {
    console.error('💥 FORGOT PASSWORD ERROR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again.' 
    });
  }
});


// ✅ STEP 2: VERIFY RESET OTP
router.post('/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    console.log('🔍 Verifying reset OTP:', otp, 'for email:', email);
    
    // Validation
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and OTP are required' 
      });
    }
    
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP must be 6 digits' 
      });
    }
    
    // Find user with valid OTP
    const Customer = require('../models/Customer');
    const user = await Customer.findOne({
      email: email.toLowerCase().trim(),
      resetPasswordOTP: otp,
      resetOTPExpiry: { $gt: new Date() }
    });
    
    if (!user) {
      console.log('❌ Invalid or expired reset OTP');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired OTP. Please request a new reset OTP.' 
      });
    }
    
    console.log('✅ Reset OTP verified successfully');
    
    res.json({
      success: true,
      message: 'OTP verified successfully! You can now set a new password.',
      userId: user._id.toString()
    });
    
  } catch (error) {
    console.error('❌ Verify reset OTP error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error'
    });
  }
});


// ✅ STEP 3: RESET PASSWORD WITH OTP
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    console.log('🔄 Processing password reset with OTP for:', email);
    
    // Input validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, OTP, and new password are required' 
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }
    
    // Find user with valid OTP
    const Customer = require('../models/Customer');
    const user = await Customer.findOne({
      email: email.toLowerCase().trim(),
      resetPasswordOTP: otp,
      resetOTPExpiry: { $gt: new Date() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired OTP. Please request a new reset OTP.' 
      });
    }
    
    console.log('✅ Valid reset OTP found for user:', user.email);
    
    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetPasswordOTP = null;
    user.resetOTPExpiry = null;
    user.passwordResetAt = new Date();
    await user.save();
    
    console.log('✅ Password reset completed successfully for:', user.email);
    
    res.json({
      success: true,
      message: 'Password has been reset successfully! You can now login with your new password.'
    });
    
  } catch (error) {
    console.error('💥 RESET PASSWORD ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during password reset'
    });
  }
});


// ✅ RESEND RESET OTP - WITH EMAIL SENDING
router.post('/resend-reset-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }
    
    console.log('🔄 Resending reset OTP to:', email);
    
    const Customer = require('../models/Customer');
    const user = await Customer.findOne({ 
      email: email.toLowerCase().trim(),
      isVerified: true
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address' 
      });
    }
    
    // Generate new OTP
    const resetOTP = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    user.resetPasswordOTP = resetOTP;
    user.resetOTPExpiry = otpExpiry;
    await user.save();
    
    console.log(`🔢 New Reset OTP generated: ${resetOTP}`);
    
    // ✅ TRY TO SEND EMAIL FIRST
    try {
      await sendPasswordResetEmail(user.email, resetOTP, user.name);
      console.log('✅ Reset OTP resent via email successfully');
      
      res.json({ 
        success: true, 
        message: 'New reset OTP sent to your email. Please check your inbox and spam folder.',
        emailSent: true
      });
      
    } catch (emailError) {
      console.error('❌ Failed to resend reset OTP via email:', emailError.message);
      
      // ✅ CONSOLE FALLBACK
      console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
      console.log('📧 RESEND RESET EMAIL FAILED - CONSOLE FALLBACK');
      console.log('👤 USER:', user.name, '(' + user.email + ')');
      console.log('🔑 NEW PASSWORD RESET OTP CODE:', resetOTP);
      console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
      console.log('💡 USE THIS NEW OTP TO RESET YOUR PASSWORD');
      console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
      res.json({ 
        success: true, 
        message: 'Email sending failed, but new reset OTP generated! Check your server console for the OTP code.',
        emailSent: false,
        fallback: true
      });
    }
    
  } catch (error) {
    console.error('❌ Resend reset OTP error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error'
    });
  }
});


// ============= HEALTH CHECK ROUTE =============
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Customer API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});


// ============= USER PROFILE ROUTES =============


// Get user profile
router.get('/profile', VerifyCustomerToken, async (req, res) => {
  try {
    const Customer = require('../models/Customer');
    const user = await Customer.findById(req.customer.id)
      .select('-password -resetPasswordOTP -verificationOTP')
      .populate('cart.product', 'name price images');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});


// Update user profile
router.put('/profile', VerifyCustomerToken, upload.single('profile'), async (req, res) => {
  try {
    const { name, phone } = req.body;
    const Customer = require('../models/Customer');
    
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (req.file) updateData.profileImage = req.file.filename;
    
    const user = await Customer.findByIdAndUpdate(
      req.customer.id,
      updateData,
      { new: true }
    ).select('-password -resetPasswordOTP -verificationOTP');
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});


// ✅ ADD THESE DEBUG ROUTES - NEW CODE ADDED HERE
// Debug route to manually drop TTL index
router.get('/drop-ttl-index', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const db = mongoose.connection.db;
    
    // Get collection info
    const collections = await db.listCollections({ name: 'customers' }).toArray();
    if (collections.length === 0) {
      return res.json({ 
        success: true, 
        message: 'Customers collection not found - this is normal for new databases' 
      });
    }
    
    // Get indexes
    const indexes = await db.collection('customers').indexes();
    console.log('📋 Current indexes:', indexes);
    
    // Try to drop TTL index
    try {
      await db.collection('customers').dropIndex('tempData.createdAt_1');
      res.json({ 
        success: true, 
        message: 'TTL index dropped successfully! Users will now be stored permanently.',
        indexes: indexes
      });
    } catch (dropError) {
      if (dropError.message.includes('index not found')) {
        res.json({ 
          success: true, 
          message: 'TTL index not found - users will be stored permanently!',
          indexes: indexes
        });
      } else {
        throw dropError;
      }
    }
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      message: 'Error managing TTL index'
    });
  }
});

// Debug user data route
router.get('/debug-user/:email', async (req, res) => {
  try {
    const Customer = require('../models/Customer');
    const user = await Customer.findOne({ email: req.params.email });
    
    if (!user) {
      return res.json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        hasTempData: !!user.tempData,
        tempData: user.tempData,
        hasVerificationOTP: !!user.verificationOTP,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.isVerified ? 'PERMANENT USER ✅' : 'TEMPORARY USER ⏳'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ ADD THESE ROUTES AT THE END OF YOUR EXISTING CustomerRoute.js FILE

// Request return for an order
router.post("/orders/:orderId/return-request", VerifyCustomerToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { reason, comments } = req.body;
        const customerId = req.customer.id;

        console.log('🔄 Return request initiated:', { orderId, reason, customerId });

        // Find the order
        const Order = require('../models/Order');
        const order = await Order.findOne({ 
            _id: orderId, 
            customer: customerId 
        }).populate('items.product').populate('items.vendor');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if order is delivered
        if (order.orderStatus !== 'delivered') {
            return res.status(400).json({
                success: false,
                message: 'Only delivered orders can be returned'
            });
        }

        // Check if return period is still valid (2 days)
        const deliveryDate = new Date(order.deliveredAt || order.updatedAt);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - deliveryDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysDifference > 2) {
            return res.status(400).json({
                success: false,
                message: 'Return period has expired. Returns are only available within 2 days of delivery.'
            });
        }

        // Check if return already requested
        if (order.returnStatus) {
            return res.status(400).json({
                success: false,
                message: 'Return has already been requested for this order'
            });
        }

        // Update order with return request
        order.returnStatus = 'requested';
        order.returnReason = reason;
        order.returnComments = comments;
        order.returnRequestedAt = new Date();
        // order.orderStatus = 'return-requested';

        await order.save();

        console.log('✅ Return request saved successfully');

        // Notify vendors
        const vendorIds = [...new Set(order.items.map(item => item.vendor._id.toString()))];
        console.log('📧 Vendors to notify about return request:', vendorIds);

        res.json({
            success: true,
            message: 'Return request submitted successfully. Vendors will review your request within 24 hours.',
            order
        });

    } catch (error) {
        console.error('💥 Return request error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process return request'
        });
    }
});


// ✅ CORRECT CUSTOMER RETURN REQUEST ROUTE

// ✅ WORKING FEEDBACK ROUTE - Add this to CustomerRoute.js
// ✅ ADD THIS ROUTE TO CustomerRoute.js (before module.exports)
router.post("/orders/:orderId/feedback", VerifyCustomerToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { rating, feedback } = req.body;
        const customerId = req.customer.id;

        console.log('📝 Feedback submission:', { orderId, rating, feedback, customerId });

        // Input validation
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const Order = require('../models/Order');

        // Find the order
        const order = await Order.findOne({ 
            _id: orderId, 
            customer: customerId 
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if order is delivered
        if (order.orderStatus !== 'delivered') {
            return res.status(400).json({
                success: false,
                message: 'Can only provide feedback for delivered orders'
            });
        }

        // Check if feedback already exists
        if (order.feedback && order.feedback.rating) {
            return res.status(400).json({
                success: false,
                message: 'Feedback already submitted for this order'
            });
        }

        // ✅ UPDATE ORDER WITH FEEDBACK (using your model structure)
        order.feedback = {
            rating: parseInt(rating),
            comment: feedback || '',
            submittedAt: new Date()
        };

        await order.save();

        console.log('✅ Feedback saved successfully');

        res.json({
            success: true,
            message: 'Feedback submitted successfully',
            feedback: order.feedback
        });

    } catch (error) {
        console.error('💥 Feedback submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit feedback'
        });
    }
});


module.exports = router;
