
// const secretKey = "ecom";
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const Customer = require("../models/Customer");
// const Product = require("../models/Product");
// const Category = require("../models/Category");
// const Order = require('../models/Order');
// const Feedback = require('../models/Feedback');

// // ✅ IMPORT EMAIL SERVICES
// const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailservice');

// // Generate 6-digit OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // ====== OTP + REGISTRATION FLOW ======

// // ✅ SEND REGISTRATION OTP - WITH EMAIL SENDING
// const sendOTP = async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;
    
//     console.log('📧 REGISTRATION OTP REQUEST FOR:', email);
    
//     // Enhanced validation
//     if (!name || !email || !phone) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Name, email, and phone are required" 
//       });
//     }
    
//     // Email format validation
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Please enter a valid email address" 
//       });
//     }
    
//     // Phone validation
//     if (!/^\+?[\d\s\-\(\)]{10,}$/.test(phone.trim())) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Please enter a valid phone number" 
//       });
//     }
    
//     // Name validation
//     if (name.trim().length < 2) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Name must be at least 2 characters long" 
//       });
//     }
    
//     // Check if user already exists and is verified
//     const existingCustomer = await Customer.findOne({ email, isVerified: true });
//     if (existingCustomer) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Email is already registered and verified" 
//       });
//     }
    
//     // Generate OTP and expiry
//     const otp = generateOTP();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
//     console.log(`🔢 Generated Registration OTP: ${otp} for: ${email}`);
    
//     // Find or create customer record
//     let customer = await Customer.findOne({ email });
//     if (customer) {
//       // Update existing record
//       customer.tempData = { name, email, phone };
//       customer.verificationOTP = otp;
//       customer.otpExpiry = otpExpiry;
//       customer.isVerified = false;
//       console.log('📝 Updated existing customer record');
//     } else {
//       // Create new temporary record
//       customer = new Customer({
//         name: 'temp_' + Date.now(),
//         email,
//         password: 'temp_password',
//         phone,
//         tempData: { name, email, phone },
//         verificationOTP: otp,
//         otpExpiry,
//         isVerified: false
//       });
//       console.log('✨ Created new customer record');
//     }
    
//     await customer.save();
//     console.log('💾 Customer record saved successfully');
    
//     // ✅ TRY TO SEND EMAIL FIRST
//     try {
//       await sendVerificationEmail(email, otp, name);
//       console.log('✅ Registration OTP email sent successfully');
      
//       res.status(200).json({
//         success: true,
//         message: "Registration OTP sent to your email! Please check your inbox and spam folder.",
//         tempId: customer._id,
//         emailSent: true
//       });
      
//     } catch (emailError) {
//       console.error('❌ Email sending failed:', emailError.message);
      
//       // ✅ FALLBACK TO CONSOLE IF EMAIL FAILS
//       console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
//       console.log('📧 EMAIL FAILED - CONSOLE FALLBACK FOR:', email);
//       console.log('👤 USER NAME:', name);
//       console.log('📱 PHONE:', phone);
//       console.log('🔑 REGISTRATION OTP CODE:', otp);
//       console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
//       console.log('💡 USE THIS OTP IN YOUR REGISTRATION FORM');
//       console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
//       res.status(200).json({
//         success: true,
//         message: "Email sending failed, but OTP generated! Check your server console for the OTP code.",
//         tempId: customer._id,
//         emailSent: false,
//         fallback: true
//       });
//     }
    
//   } catch (error) {
//     console.error("💥 Send OTP error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error", 
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // ✅ VERIFY REGISTRATION OTP
// const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp, tempId } = req.body;
    
//     // Validation
//     if (!email || !otp) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Email and OTP are required" 
//       });
//     }
    
//     if (!/^\d{6}$/.test(otp)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "OTP must be 6 digits" 
//       });
//     }
    
//     console.log(`🔍 Verifying OTP: ${otp} for email: ${email}`);
    
//     // Find customer with valid OTP
//     const customer = await Customer.findOne({
//       email,
//       verificationOTP: otp,
//       otpExpiry: { $gt: new Date() }
//     });
    
//     if (!customer) {
//       console.log('❌ Invalid or expired OTP');
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid or expired OTP" 
//       });
//     }
    
//     // Clear OTP fields
//     customer.verificationOTP = null;
//     customer.otpExpiry = null;
//     await customer.save();
    
//     console.log('✅ OTP verified successfully');
    
//     res.status(200).json({
//       success: true,
//       message: "Email verified successfully! Now create your password.",
//       tempId: customer._id,
//       verifiedData: customer.tempData
//     });
    
//   } catch (error) {
//     console.error("❌ Verify OTP error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error", 
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // ✅ COMPLETE REGISTRATION
// // ✅ COMPLETE REGISTRATION - FIXED VERSION
// const completeRegistration = async (req, res) => {
//   try {
//     const { tempId, password } = req.body;
    
//     if (!tempId || !password) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Temporary ID and password are required" 
//       });
//     }
    
//     if (password.length < 6) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Password must be at least 6 characters long" 
//       });
//     }
    
//     console.log('🔍 Finding customer with tempId:', tempId);
    
//     const customer = await Customer.findById(tempId);
//     if (!customer || !customer.tempData) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid registration session. Please start again." 
//       });
//     }
    
//     if (customer.verificationOTP !== null) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Email not verified. Please verify your email first." 
//       });
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // ✅ TRANSFER DATA FROM TEMPDATA TO PERMANENT FIELDS
//     customer.name = customer.tempData.name;
//     customer.email = customer.tempData.email;
//     customer.phone = customer.tempData.phone;
//     customer.password = hashedPassword;
//     customer.isVerified = true;
    
//     // ✅ COMPLETELY REMOVE TEMP DATA AND OTP FIELDS
//     customer.tempData = undefined; // This removes the field completely
//     customer.verificationOTP = undefined;
//     customer.otpExpiry = undefined;
    
//     // Handle profile image if uploaded
//     if (req.file) {
//       customer.profileImage = req.file.filename;
//     }
    
//     // ✅ SAVE THE CUSTOMER WITH PERMANENT DATA
//     await customer.save();
    
//     console.log('✅ Registration completed successfully for:', customer.email);
//     console.log('✅ User data is now permanent like the first user');
    
//     res.status(201).json({ 
//       success: true, 
//       message: "Account created successfully! You can now login." 
//     });
    
//   } catch (error) {
//     console.error("❌ Complete registration error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error", 
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // ✅ RESEND REGISTRATION OTP - WITH EMAIL SENDING
// const resendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     if (!email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Email is required" 
//       });
//     }
    
//     console.log('🔄 Resending registration OTP to:', email);
    
//     const customer = await Customer.findOne({ email, isVerified: false });
//     if (!customer || !customer.tempData) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid email or registration session expired" 
//       });
//     }
    
//     // Generate new OTP
//     const otp = generateOTP();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
//     customer.verificationOTP = otp;
//     customer.otpExpiry = otpExpiry;
//     await customer.save();
    
//     console.log(`🔢 Generated New Registration OTP: ${otp}`);
    
//     // ✅ TRY TO SEND EMAIL FIRST
//     try {
//       await sendVerificationEmail(customer.email, otp, customer.tempData.name);
//       console.log('✅ Registration OTP resent via email successfully');
      
//       res.status(200).json({ 
//         success: true, 
//         message: "New registration OTP sent to your email! Check your inbox and spam folder.",
//         emailSent: true
//       });
      
//     } catch (emailError) {
//       console.error('❌ Resend email failed:', emailError.message);
      
//       // ✅ CONSOLE FALLBACK
//       console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
//       console.log('📧 RESEND EMAIL FAILED - CONSOLE FALLBACK FOR:', email);
//       console.log('👤 USER NAME:', customer.tempData.name);
//       console.log('🔑 NEW REGISTRATION OTP CODE:', otp);
//       console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
//       console.log('💡 USE THIS NEW OTP IN YOUR REGISTRATION FORM');
//       console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
//       res.status(200).json({ 
//         success: true, 
//         message: "Email sending failed, but new OTP generated! Check your server console for the OTP code.",
//         emailSent: false,
//         fallback: true
//       });
//     }
    
//   } catch (error) {
//     console.error("❌ Resend OTP error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error", 
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // ========== LOGIN & PROFILE ========== 

// // ✅ TRADITIONAL REGISTER (BACKUP)
// const registerCustomer = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;
//     const existingCustomer = await Customer.findOne({ email });
//     if (existingCustomer) {
//       return res.status(400).json({ message: "Customer already exists", success: false });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newCustomer = await new Customer({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       isVerified: true
//     }).save();
//     res.status(201).json({ message: "Customer registered successfully", success: true });
//   } catch (error) {
//     console.error("Error registering customer:", error);
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// // ✅ LOGIN CUSTOMER
// const loginCustomer = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     console.log('🔐 Login attempt:', { email });
    
//     if (!email || !password) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Email and password are required" 
//       });
//     }

//     const customer = await Customer.findOne({ email: email.toLowerCase() });
//     console.log('👤 User found:', !!customer);
    
//     if (!customer) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid credentials" 
//       });
//     }

//     if (!customer.isVerified) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Please verify your email before logging in" 
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(password, customer.password);
//     console.log('🔒 Password valid:', isPasswordValid);
    
//     if (!isPasswordValid) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid credentials" 
//       });
//     }

//     const token = jwt.sign({ 
//       id: customer._id, 
//       email: customer.email 
//     }, secretKey, { 
//       expiresIn: '60d' 
//     });

//     console.log('✅ Login successful for:', customer.email);

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       success: true,
//       user: {
//         id: customer._id,
//         name: customer.name,
//         email: customer.email,
//         profileImage: customer.profileImage || '',
//         provider: 'email'
//       }
//     });

//   } catch (error) {
//     console.error("❌ Login error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error" 
//     });
//   }
// };

// // ✅ SOCIAL LOGIN
// const socialLogin = async (req, res) => {
//   try {
//     const { provider, uid, email, displayName, photoURL } = req.body;
//     if (!email) {
//       return res.status(400).json({ success: false, message: 'Email is required for social login' });
//     }
//     if (!provider || !uid) {
//       return res.status(400).json({ success: false, message: 'Provider and UID are required' });
//     }
//     let customer = await Customer.findOne({ email });
//     if (!customer) {
//       customer = new Customer({
//         name: displayName || email.split('@')[0],
//         email,
//         password: await bcrypt.hash(uid + 'social123', 10),
//         socialProvider: provider,
//         socialId: uid,
//         profileImage: photoURL || '',
//         isVerified: true,
//         cart: []
//       });
//       await customer.save();
//     } else {
//       if (!customer.socialProvider) {
//         customer.socialProvider = provider;
//         customer.socialId = uid;
//         customer.profileImage = photoURL || customer.profileImage;
//         await customer.save();
//       }
//     }
//     const token = jwt.sign({ id: customer._id, email: customer.email }, secretKey, { expiresIn: '60d' });
//     res.status(200).json({
//       success: true,
//       message: 'Social login successful!',
//       token,
//       user: {
//         id: customer._id,
//         name: customer.name,
//         email: customer.email,
//         profileImage: customer.profileImage,
//         provider
//       }
//     });
//   } catch (error) {
//     console.error('Social login error:', error);
//     res.status(500).json({ success: false, message: 'Social login failed - Internal server error', error: error.message });
//   }
// };

// // ========== PRODUCTS/CATEGORY/CART ========== 

// // ✅ GET ALL PRODUCTS
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ status: 'active' })
//       .populate('category', 'name')
//       .populate('vendor', 'name');
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Internal server error fetching products", error: error.message });
//   }
// };

// // ✅ GET PRODUCT BY ID
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate('category', 'name')
//       .populate('vendor', 'name');
//     if (!product) {
//       return res.status(404).json({ message: "Product not found", success: false });
//     }
//     res.status(200).json({ success: true, product });
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).json({ success: false, message: "Internal server error fetching product", error: error.message });
//   }
// };

// // ✅ GET ALL CATEGORIES
// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json({ success: true, categories });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ success: false, message: "Internal server error fetching categories", error: error.message });
//   }
// };

// // ✅ GET CART
// const getCart = async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.customer.id)
//       .populate({ path: 'cart.product', select: 'name price images stock' });
//     if (!customer) {
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }
//     res.status(200).json({ success: true, cart: customer.cart });
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     res.status(500).json({ success: false, message: "Internal server error fetching cart", error: error.message });
//   }
// };

// // ✅ ADD TO CART
// // ✅ UPDATE ADDTOCART FUNCTION - Add selectedSize parameter
// // ✅ UPDATE ADDTOCART FUNCTION - Add selectedSize parameter
// // ✅ CONDITIONAL SIZE VALIDATION - Only for dress, apparel, and shoes
// const addToCart = async (req, res) => {
//   try {
//     console.log('\n🛒 === ADD TO CART FUNCTION START ===');
//     console.log('Request Body:', req.body);
//     console.log('Customer from Token:', req.customer);
    
//     const { productId, quantity, selectedSize } = req.body;
    
//     // Basic validation
//     if (!productId) {
//       console.error('❌ Missing productId');
//       return res.status(400).json({ 
//         success: false, 
//         message: "Product ID is required" 
//       });
//     }
    
//     if (!quantity || quantity < 1) {
//       console.error('❌ Invalid quantity');
//       return res.status(400).json({ 
//         success: false, 
//         message: "Valid quantity is required" 
//       });
//     }
    
//     if (!req.customer || !req.customer.id) {
//       console.error('❌ No customer authentication');
//       return res.status(401).json({ 
//         success: false, 
//         message: "Authentication required" 
//       });
//     }
    
//     console.log('✅ Validation passed - Finding customer and product');
    
//     const customer = await Customer.findById(req.customer.id);
//     if (!customer) {
//       console.error('❌ Customer not found');
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }
    
//     const product = await Product.findById(productId);
//     if (!product) {
//       console.error('❌ Product not found');
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
    
//     if (product.stock < quantity) {
//       console.error('❌ Insufficient stock');
//       return res.status(400).json({ success: false, message: "Insufficient stock" });
//     }
    
//     console.log('✅ Adding to cart');
    
//     // Find existing cart item
//     const cartItemIndex = customer.cart.findIndex(item => 
//       item.product.toString() === productId && 
//       (selectedSize ? item.selectedSize === selectedSize : !item.selectedSize)
//     );
    
//     if (cartItemIndex > -1) {
//       customer.cart[cartItemIndex].quantity = quantity;
//       if (selectedSize) {
//         customer.cart[cartItemIndex].selectedSize = selectedSize;
//       }
//     } else {
//       const cartItem = { product: productId, quantity };
//       if (selectedSize) {
//         cartItem.selectedSize = selectedSize;
//       }
//       customer.cart.push(cartItem);
//     }
    
//     await customer.save();
//     await customer.populate('cart.product');
    
//     console.log('✅ Cart updated successfully');
//     console.log('=== END ADD TO CART FUNCTION ===\n');
    
//     res.status(200).json({ success: true, cart: customer.cart });
    
//   } catch (error) {
//     console.error('\n💥 ADD TO CART ERROR 💥');
//     console.error('Error:', error.message);
//     console.error('Stack:', error.stack);
//     console.error('==============================\n');
    
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error", 
//       error: error.message 
//     });
//   }
// };



// // ✅ UPDATE UPDATECARTITEM FUNCTION - Add selectedSize parameter
// const updateCartItem = async (req, res) => {
//   try {
//     const { productId, quantity, selectedSize } = req.body; // ADD selectedSize
//     const customer = await Customer.findById(req.customer.id);
//     if (!customer) {
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }
    
//     const cartItemIndex = customer.cart.findIndex(item => 
//       item.product.toString() === productId &&
//       (selectedSize ? item.selectedSize === selectedSize : !item.selectedSize)
//     );
    
//     if (cartItemIndex === -1) {
//       return res.status(404).json({ success: false, message: "Product not found in cart" });
//     }
    
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     if (product.stock < quantity) {
//       return res.status(400).json({ success: false, message: "Insufficient stock" });
//     }
    
//     customer.cart[cartItemIndex].quantity = quantity;
//     await customer.save();
//     await customer.populate('cart.product');
//     res.status(200).json({ success: true, cart: customer.cart });
//   } catch (error) {
//     console.error("Error updating cart item:", error);
//     res.status(500).json({ success: false, message: "Internal server error updating cart", error: error.message });
//   }
// };

// // ✅ UPDATE REMOVEFROMCART FUNCTION - Add selectedSize parameter
// const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { selectedSize } = req.query; // GET selectedSize from query params
//     const customer = await Customer.findById(req.customer.id);
//     if (!customer) {
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }
    
//     customer.cart = customer.cart.filter(item => {
//       if (selectedSize) {
//         return !(item.product.toString() === productId && item.selectedSize === selectedSize);
//       }
//       return item.product.toString() !== productId;
//     });
    
//     await customer.save();
//     await customer.populate('cart.product');
//     res.status(200).json({ success: true, cart: customer.cart });
//   } catch (error) {
//     console.error("Error removing from cart:", error);
//     res.status(500).json({ success: false, message: "Internal server error removing from cart", error: error.message });
//   }
// };

// // ✅ UPDATE CREATEORDER FUNCTION - Include selectedSize in orders
// const createOrder = async (req, res) => {
//   try {
//     const { shippingAddress, contactInfo, paymentMethod, paymentDetails } = req.body;
//     const customer = await Customer.findById(req.customer.id).populate('cart.product');
//     if (!customer || !customer.cart.length) {
//       return res.status(400).json({ success: false, message: "Cart is empty" });
//     }
    
//     const vendorOrders = {};
//     let totalAmount = 0;
    
//     for (const cartItem of customer.cart) {
//       const product = await Product.findById(cartItem.product._id);
//       if (!product) {
//         return res.status(404).json({ success: false, message: `Product not found: ${cartItem.product._id}` });
//       }
//       if (product.stock < cartItem.quantity) {
//         return res.status(400).json({ success: false, message: `Insufficient stock for product: ${product.name}` });
//       }
      
//       const vendorId = product.vendor.toString();
//       if (!vendorOrders[vendorId]) {
//         vendorOrders[vendorId] = { items: [], totalAmount: 0 };
//       }
      
//       const orderItem = {
//         product: product._id,
//         quantity: cartItem.quantity,
//         price: product.price,
//         vendor: product.vendor
//       };
      
//       // ✅ ADD SELECTEDSIZE TO ORDER ITEM
//       if (cartItem.selectedSize) {
//         orderItem.selectedSize = cartItem.selectedSize;
//       }
      
//       vendorOrders[vendorId].items.push(orderItem);
//       vendorOrders[vendorId].totalAmount += product.price * cartItem.quantity;
//       totalAmount += product.price * cartItem.quantity;
//     }
    
//     const orders = [];
//     for (const vendorId in vendorOrders) {
//       const vendorOrder = new Order({
//         customer: customer._id,
//         items: vendorOrders[vendorId].items,
//         shippingAddress,
//         contactInfo,
//         totalAmount: vendorOrders[vendorId].totalAmount,
//         paymentMethod,
//         paymentDetails: paymentMethod === 'UPI' ? paymentDetails : undefined
//       });
//       orders.push(await vendorOrder.save());
//       for (const item of vendorOrders[vendorId].items) {
//         await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
//       }
//     }
//     customer.cart = [];
//     await customer.save();
//     res.status(201).json({ success: true, orders });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ success: false, message: "Internal server error creating order", error: error.message });
//   }
// };

// // Keep all your other existing functions unchanged...
// // (Rest of your UserController.js file remains exactly the same)

// // ✅ GET ORDERS
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ customer: req.customer.id })
//       .populate('items.product')
//       .populate('items.vendor', 'shopName')
//       .sort('-createdAt');
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Internal server error fetching orders", error: error.message });
//   }
// };

// // ✅ CANCEL ORDER
// const cancelOrder = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
//     if (order.customer.toString() !== req.customer.id) {
//       return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
//     }
//     if (order.orderStatus !== 'pending') {
//       return res.status(400).json({ success: false, message: "Order cannot be cancelled at this stage" });
//     }
//     order.orderStatus = 'cancelled';
//     await order.save();
//     res.status(200).json({ success: true, message: "Order cancelled successfully" });
//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     res.status(500).json({ success: false, message: "Internal server error cancelling order", error: error.message });
//   }
// };

// // ========== FEEDBACK ========== 

// // ✅ SUBMIT FEEDBACK
// const submitFeedback = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { rating, feedback } = req.body;
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
//     if (order.feedback) {
//       return res.status(400).json({ success: false, message: "Feedback already submitted for this order" });
//     }
//     const newFeedback = new Feedback({
//       order: orderId,
//       customer: req.customer.id,
//       rating,
//       comment: feedback
//     });
//     const savedFeedback = await newFeedback.save();
//     order.feedback = savedFeedback._id;
//     await order.save();
//     res.status(200).json({ success: true, message: "Feedback submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting feedback:", error);
//     res.status(500).json({ success: false, message: "Internal server error submitting feedback", error: error.message });
//   }
// };

// // ========== EXPORT ALL FUNCTIONS ========== 

// module.exports = { 
//   // Registration & Authentication
//   registerCustomer, 
//   loginCustomer,
//   socialLogin, 
  
//   // OTP Registration Flow
//   sendOTP,           // ✅ Send registration OTP via email
//   verifyOTP,         // ✅ Verify registration OTP
//   completeRegistration,  // ✅ Complete registration after OTP verification
//   resendOTP,         // ✅ Resend registration OTP via email
  
//   // Products & Categories
//   getAllProducts,
//   getProductById,
//   getAllCategories,
  
//   // Cart Management
//   getCart,
//   addToCart,
//   updateCartItem,
//   removeFromCart,
  
//   // Order Management
//   createOrder,
//   getOrders,
//   cancelOrder,
  
//   // Feedback
//   submitFeedback
// };





const secretKey = "ecom";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require('../models/Order');
const Feedback = require('../models/Feedback');

// ✅ IMPORT EMAIL SERVICES
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailservice');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ====== OTP + REGISTRATION FLOW ======

// ✅ SEND REGISTRATION OTP - WITH EMAIL SENDING
const sendOTP = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    console.log('📧 REGISTRATION OTP REQUEST FOR:', email);
    
    // Enhanced validation
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email, and phone are required" 
      });
    }
    
    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter a valid email address" 
      });
    }
    
    // Phone validation
    if (!/^\+?[\d\s\-\(\)]{10,}$/.test(phone.trim())) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter a valid phone number" 
      });
    }
    
    // Name validation
    if (name.trim().length < 2) {
      return res.status(400).json({ 
        success: false, 
        message: "Name must be at least 2 characters long" 
      });
    }
    
    // Check if user already exists and is verified
    const existingCustomer = await Customer.findOne({ email, isVerified: true });
    if (existingCustomer) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is already registered and verified" 
      });
    }
    
    // Generate OTP and expiry
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    console.log(`🔢 Generated Registration OTP: ${otp} for: ${email}`);
    
    // Find or create customer record
    let customer = await Customer.findOne({ email });
    if (customer) {
      // Update existing record
      customer.tempData = { name, email, phone };
      customer.verificationOTP = otp;
      customer.otpExpiry = otpExpiry;
      customer.isVerified = false;
      console.log('📝 Updated existing customer record');
    } else {
      // Create new temporary record
      customer = new Customer({
        name: 'temp_' + Date.now(),
        email,
        password: 'temp_password',
        phone,
        tempData: { name, email, phone },
        verificationOTP: otp,
        otpExpiry,
        isVerified: false
      });
      console.log('✨ Created new customer record');
    }
    
    await customer.save();
    console.log('💾 Customer record saved successfully');
    
    // ✅ TRY TO SEND EMAIL FIRST
    try {
      await sendVerificationEmail(email, otp, name);
      console.log('✅ Registration OTP email sent successfully');
      
      res.status(200).json({
        success: true,
        message: "Registration OTP sent to your email! Please check your inbox and spam folder.",
        tempId: customer._id,
        emailSent: true
      });
      
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      
      // ✅ FALLBACK TO CONSOLE IF EMAIL FAILS
      console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
      console.log('📧 EMAIL FAILED - CONSOLE FALLBACK FOR:', email);
      console.log('👤 USER NAME:', name);
      console.log('📱 PHONE:', phone);
      console.log('🔑 REGISTRATION OTP CODE:', otp);
      console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
      console.log('💡 USE THIS OTP IN YOUR REGISTRATION FORM');
      console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
      res.status(200).json({
        success: true,
        message: "Email sending failed, but OTP generated! Check your server console for the OTP code.",
        tempId: customer._id,
        emailSent: false,
        fallback: true
      });
    }
    
  } catch (error) {
    console.error("💥 Send OTP error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ✅ VERIFY REGISTRATION OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp, tempId } = req.body;
    
    // Validation
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and OTP are required" 
      });
    }
    
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP must be 6 digits" 
      });
    }
    
    console.log(`🔍 Verifying OTP: ${otp} for email: ${email}`);
    
    // Find customer with valid OTP
    const customer = await Customer.findOne({
      email,
      verificationOTP: otp,
      otpExpiry: { $gt: new Date() }
    });
    
    if (!customer) {
      console.log('❌ Invalid or expired OTP');
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired OTP" 
      });
    }
    
    // Clear OTP fields
    customer.verificationOTP = null;
    customer.otpExpiry = null;
    await customer.save();
    
    console.log('✅ OTP verified successfully');
    
    res.status(200).json({
      success: true,
      message: "Email verified successfully! Now create your password.",
      tempId: customer._id,
      verifiedData: customer.tempData
    });
    
  } catch (error) {
    console.error("❌ Verify OTP error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ✅ COMPLETE REGISTRATION
// ✅ COMPLETE REGISTRATION - FIXED VERSION
const completeRegistration = async (req, res) => {
  try {
    const { tempId, password } = req.body;
    
    if (!tempId || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Temporary ID and password are required" 
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 6 characters long" 
      });
    }
    
    console.log('🔍 Finding customer with tempId:', tempId);
    
    const customer = await Customer.findById(tempId);
    if (!customer || !customer.tempData) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid registration session. Please start again." 
      });
    }
    
    if (customer.verificationOTP !== null) {
      return res.status(400).json({ 
        success: false, 
        message: "Email not verified. Please verify your email first." 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ✅ TRANSFER DATA FROM TEMPDATA TO PERMANENT FIELDS
    customer.name = customer.tempData.name;
    customer.email = customer.tempData.email;
    customer.phone = customer.tempData.phone;
    customer.password = hashedPassword;
    customer.isVerified = true;
    
    // ✅ COMPLETELY REMOVE TEMP DATA AND OTP FIELDS
    customer.tempData = undefined; // This removes the field completely
    customer.verificationOTP = undefined;
    customer.otpExpiry = undefined;
    
    // Handle profile image if uploaded
    if (req.file) {
      customer.profileImage = req.file.filename;
    }
    
    // ✅ SAVE THE CUSTOMER WITH PERMANENT DATA
    await customer.save();
    
    console.log('✅ Registration completed successfully for:', customer.email);
    console.log('✅ User data is now permanent like the first user');
    
    res.status(201).json({ 
      success: true, 
      message: "Account created successfully! You can now login." 
    });
    
  } catch (error) {
    console.error("❌ Complete registration error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ✅ RESEND REGISTRATION OTP - WITH EMAIL SENDING
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }
    
    console.log('🔄 Resending registration OTP to:', email);
    
    const customer = await Customer.findOne({ email, isVerified: false });
    if (!customer || !customer.tempData) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email or registration session expired" 
      });
    }
    
    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    customer.verificationOTP = otp;
    customer.otpExpiry = otpExpiry;
    await customer.save();
    
    console.log(`🔢 Generated New Registration OTP: ${otp}`);
    
    // ✅ TRY TO SEND EMAIL FIRST
    try {
      await sendVerificationEmail(customer.email, otp, customer.tempData.name);
      console.log('✅ Registration OTP resent via email successfully');
      
      res.status(200).json({ 
        success: true, 
        message: "New registration OTP sent to your email! Check your inbox and spam folder.",
        emailSent: true
      });
      
    } catch (emailError) {
      console.error('❌ Resend email failed:', emailError.message);
      
      // ✅ CONSOLE FALLBACK
      console.log('\n🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢');
      console.log('📧 RESEND EMAIL FAILED - CONSOLE FALLBACK FOR:', email);
      console.log('👤 USER NAME:', customer.tempData.name);
      console.log('🔑 NEW REGISTRATION OTP CODE:', otp);
      console.log('⏰ EXPIRES:', otpExpiry.toLocaleString());
      console.log('💡 USE THIS NEW OTP IN YOUR REGISTRATION FORM');
      console.log('🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢\n');
      
      res.status(200).json({ 
        success: true, 
        message: "Email sending failed, but new OTP generated! Check your server console for the OTP code.",
        emailSent: false,
        fallback: true
      });
    }
    
  } catch (error) {
    console.error("❌ Resend OTP error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ========== LOGIN & PROFILE ========== 

// ✅ TRADITIONAL REGISTER (BACKUP)
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await new Customer({
      name,
      email,
      password: hashedPassword,
      phone,
      isVerified: true
    }).save();
    res.status(201).json({ message: "Customer registered successfully", success: true });
  } catch (error) {
    console.error("Error registering customer:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ LOGIN CUSTOMER
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login attempt:', { email });
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    const customer = await Customer.findOne({ email: email.toLowerCase() });
    console.log('👤 User found:', !!customer);
    
    if (!customer) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    if (!customer.isVerified) {
      return res.status(400).json({ 
        success: false, 
        message: "Please verify your email before logging in" 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);
    console.log('🔒 Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign({ 
      id: customer._id, 
      email: customer.email 
    }, secretKey, { 
      expiresIn: '60d' 
    });

    console.log('✅ Login successful for:', customer.email);

    res.status(200).json({
      message: "Login successful",
      token,
      success: true,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        profileImage: customer.profileImage || '',
        provider: 'email'
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

// ✅ SOCIAL LOGIN
const socialLogin = async (req, res) => {
  try {
    const { provider, uid, email, displayName, photoURL } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required for social login' });
    }
    if (!provider || !uid) {
      return res.status(400).json({ success: false, message: 'Provider and UID are required' });
    }
    let customer = await Customer.findOne({ email });
    if (!customer) {
      customer = new Customer({
        name: displayName || email.split('@')[0],
        email,
        password: await bcrypt.hash(uid + 'social123', 10),
        socialProvider: provider,
        socialId: uid,
        profileImage: photoURL || '',
        isVerified: true,
        cart: []
      });
      await customer.save();
    } else {
      if (!customer.socialProvider) {
        customer.socialProvider = provider;
        customer.socialId = uid;
        customer.profileImage = photoURL || customer.profileImage;
        await customer.save();
      }
    }
    const token = jwt.sign({ id: customer._id, email: customer.email }, secretKey, { expiresIn: '60d' });
    res.status(200).json({
      success: true,
      message: 'Social login successful!',
      token,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        profileImage: customer.profileImage,
        provider
      }
    });
  } catch (error) {
    console.error('Social login error:', error);
    res.status(500).json({ success: false, message: 'Social login failed - Internal server error', error: error.message });
  }
};

// ========== PRODUCTS/CATEGORY/CART ========== 

// ✅ GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' })
      .populate('category', 'name')
      .populate('vendor', 'name');
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal server error fetching products", error: error.message });
  }
};

// ✅ GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('vendor', 'name');
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Internal server error fetching product", error: error.message });
  }
};

// ✅ GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Internal server error fetching categories", error: error.message });
  }
};

// ✅ GET CART
const getCart = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id)
      .populate({ path: 'cart.product', select: 'name price images stock' });
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    res.status(200).json({ success: true, cart: customer.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error fetching cart", error: error.message });
  }
};

// ✅ ADD TO CART
// ✅ UPDATE ADDTOCART FUNCTION - Add selectedSize parameter
// ✅ UPDATE ADDTOCART FUNCTION - Add selectedSize parameter
// ✅ CONDITIONAL SIZE VALIDATION - Only for dress, apparel, and shoes
const addToCart = async (req, res) => {
  try {
    console.log('\n🛒 === ADD TO CART FUNCTION START ===');
    console.log('Request Body:', req.body);
    console.log('Customer from Token:', req.customer);
    
    const { productId, quantity, selectedSize } = req.body;
    
    // Basic validation
    if (!productId) {
      console.error('❌ Missing productId');
      return res.status(400).json({ 
        success: false, 
        message: "Product ID is required" 
      });
    }
    
    if (!quantity || quantity < 1) {
      console.error('❌ Invalid quantity');
      return res.status(400).json({ 
        success: false, 
        message: "Valid quantity is required" 
      });
    }
    
    if (!req.customer || !req.customer.id) {
      console.error('❌ No customer authentication');
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }
    
    console.log('✅ Validation passed - Finding customer and product');
    
    const customer = await Customer.findById(req.customer.id);
    if (!customer) {
      console.error('❌ Customer not found');
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      console.error('❌ Product not found');
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    if (product.stock < quantity) {
      console.error('❌ Insufficient stock');
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }
    
    console.log('✅ Adding to cart');
    
    // Find existing cart item
    const cartItemIndex = customer.cart.findIndex(item => 
      item.product.toString() === productId && 
      (selectedSize ? item.selectedSize === selectedSize : !item.selectedSize)
    );
    
    if (cartItemIndex > -1) {
      customer.cart[cartItemIndex].quantity = quantity;
      if (selectedSize) {
        customer.cart[cartItemIndex].selectedSize = selectedSize;
      }
    } else {
      const cartItem = { product: productId, quantity };
      if (selectedSize) {
        cartItem.selectedSize = selectedSize;
      }
      customer.cart.push(cartItem);
    }
    
    await customer.save();
    await customer.populate('cart.product');
    
    console.log('✅ Cart updated successfully');
    console.log('=== END ADD TO CART FUNCTION ===\n');
    
    res.status(200).json({ success: true, cart: customer.cart });
    
  } catch (error) {
    console.error('\n💥 ADD TO CART ERROR 💥');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('==============================\n');
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};



// ✅ UPDATE UPDATECARTITEM FUNCTION - Add selectedSize parameter
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, selectedSize } = req.body; // ADD selectedSize
    const customer = await Customer.findById(req.customer.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    
    const cartItemIndex = customer.cart.findIndex(item => 
      item.product.toString() === productId &&
      (selectedSize ? item.selectedSize === selectedSize : !item.selectedSize)
    );
    
    if (cartItemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }
    
    customer.cart[cartItemIndex].quantity = quantity;
    await customer.save();
    await customer.populate('cart.product');
    res.status(200).json({ success: true, cart: customer.cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ success: false, message: "Internal server error updating cart", error: error.message });
  }
};

// ✅ UPDATE REMOVEFROMCART FUNCTION - Add selectedSize parameter
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { selectedSize } = req.query; // GET selectedSize from query params
    const customer = await Customer.findById(req.customer.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    
    customer.cart = customer.cart.filter(item => {
      if (selectedSize) {
        return !(item.product.toString() === productId && item.selectedSize === selectedSize);
      }
      return item.product.toString() !== productId;
    });
    
    await customer.save();
    await customer.populate('cart.product');
    res.status(200).json({ success: true, cart: customer.cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error removing from cart", error: error.message });
  }
};

// ✅ UPDATE CREATEORDER FUNCTION - Include selectedSize in orders
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, contactInfo, paymentMethod, paymentDetails } = req.body;
    const customer = await Customer.findById(req.customer.id).populate('cart.product');
    if (!customer || !customer.cart.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    
    const vendorOrders = {};
    let totalAmount = 0;
    
    for (const cartItem of customer.cart) {
      const product = await Product.findById(cartItem.product._id);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${cartItem.product._id}` });
      }
      if (product.stock < cartItem.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for product: ${product.name}` });
      }
      
      const vendorId = product.vendor.toString();
      if (!vendorOrders[vendorId]) {
        vendorOrders[vendorId] = { items: [], totalAmount: 0 };
      }
      
      const orderItem = {
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
        vendor: product.vendor
      };
      
      // ✅ ADD SELECTEDSIZE TO ORDER ITEM
      if (cartItem.selectedSize) {
        orderItem.selectedSize = cartItem.selectedSize;
      }
      
      vendorOrders[vendorId].items.push(orderItem);
      vendorOrders[vendorId].totalAmount += product.price * cartItem.quantity;
      totalAmount += product.price * cartItem.quantity;
    }
    
    const orders = [];
    for (const vendorId in vendorOrders) {
      const vendorOrder = new Order({
        customer: customer._id,
        items: vendorOrders[vendorId].items,
        shippingAddress,
        contactInfo,
        totalAmount: vendorOrders[vendorId].totalAmount,
        paymentMethod,
        paymentDetails: paymentMethod === 'UPI' ? paymentDetails : undefined
      });
      orders.push(await vendorOrder.save());
      for (const item of vendorOrders[vendorId].items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      }
    }
    customer.cart = [];
    await customer.save();
    res.status(201).json({ success: true, orders });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error creating order", error: error.message });
  }
};

// Keep all your other existing functions unchanged...
// (Rest of your UserController.js file remains exactly the same)

// ✅ GET ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.customer.id })
      .populate('items.product')
      .populate('items.vendor', 'shopName')
      .sort('-createdAt');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error fetching orders", error: error.message });
  }
};

// ✅ CANCEL ORDER
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.customer.toString() !== req.customer.id) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
    }
    if (order.orderStatus !== 'pending') {
      return res.status(400).json({ success: false, message: "Order cannot be cancelled at this stage" });
    }
    order.orderStatus = 'cancelled';
    await order.save();
    res.status(200).json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ success: false, message: "Internal server error cancelling order", error: error.message });
  }
};

// ========== FEEDBACK ========== 

// ✅ SUBMIT FEEDBACK
const submitFeedback = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { rating, feedback } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.feedback) {
      return res.status(400).json({ success: false, message: "Feedback already submitted for this order" });
    }
    const newFeedback = new Feedback({
      order: orderId,
      customer: req.customer.id,
      rating,
      comment: feedback
    });
    const savedFeedback = await newFeedback.save();
    order.feedback = savedFeedback._id;
    await order.save();
    res.status(200).json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ success: false, message: "Internal server error submitting feedback", error: error.message });
  }
};

// ========== EXPORT ALL FUNCTIONS ========== 

module.exports = { 
  // Registration & Authentication
  registerCustomer, 
  loginCustomer,
  socialLogin, 
  
  // OTP Registration Flow
  sendOTP,           // ✅ Send registration OTP via email
  verifyOTP,         // ✅ Verify registration OTP
  completeRegistration,  // ✅ Complete registration after OTP verification
  resendOTP,         // ✅ Resend registration OTP via email
  
  // Products & Categories
  getAllProducts,
  getProductById,
  getAllCategories,
  
  // Cart Management
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  
  // Order Management
  createOrder,
  getOrders,
  cancelOrder,
  
  // Feedback
  submitFeedback
};
