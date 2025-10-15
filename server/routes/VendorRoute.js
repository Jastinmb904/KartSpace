



// const express = require("express"); 
// const router = express.Router(); 
// const multer = require("multer"); 
// const { 
//     registerVendor, 
//     loginVendor,
//     getVendorProducts,     
//     addProduct,     
//     updateProduct,     
//     deleteProduct,
//     getCategories,
//     verifyVendor,
//     getVendorOrders,
//     updateOrderStatus,
//     getVendorFeedbacks,
//     sendMessage,
//     deleteMessage,getVendorMessages,
//     deleteFeedback,getVendorProfile,updateVendorProfile} = require("../controller/Vendor"); 
// const { VerifyVendorToken } = require('../middleware/authVendor'); 
// const path = require('path');  

// // Configure multer storage for vendor profile images
// const storage = multer.diskStorage({     
//     destination: (req, file, cb) => {         
//         cb(null, "./uploads/vendor");  // Make sure this directory exists     
//     },     
//     filename: (req, file, cb) => {         
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);         
//         cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);     
//     } 
// });  

// const upload = multer({ storage: storage });  

// // Configure multer for product images 
// const productStorage = multer.diskStorage({     
//     destination: (req, file, cb) => {         
//         cb(null, "./uploads/products");     
//     },     
//     filename: (req, file, cb) => {         
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);         
//         cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));     
//     } 
// });  

// const uploadProduct = multer({      
//     storage: productStorage,     
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB 
// });  

// // Auth routes 
// router.post("/register", upload.single('profileImage'), registerVendor);  
// router.post("/login", loginVendor); 
// router.get("/verify", VerifyVendorToken, verifyVendor);  

// // Product routes 
// router.get("/products", VerifyVendorToken, getVendorProducts); 
// router.post("/products", VerifyVendorToken, uploadProduct.array('images', 5), addProduct); 
// // Fixed: Add multer middleware to PUT route for handling image uploads
// router.put("/products/:id", VerifyVendorToken, uploadProduct.array('images', 5), updateProduct); 
// router.delete("/products/:id", VerifyVendorToken, deleteProduct); 
// router.get("/categories", VerifyVendorToken, getCategories);  
// router.post('/messages', VerifyVendorToken, sendMessage);
// router.delete('/messages/:id', VerifyVendorToken, deleteMessage);
// router.get('/messages', VerifyVendorToken, getVendorMessages);

// // Order routes
// router.get("/orders", VerifyVendorToken, getVendorOrders);
// router.put("/orders/:orderId/status", VerifyVendorToken, updateOrderStatus);

// // Feedback routes
// router.get("/feedbacks", VerifyVendorToken, getVendorFeedbacks);
// router.delete("/feedbacks/:id", VerifyVendorToken, deleteFeedback);

// // Profile routes
// router.get("/profile", VerifyVendorToken, getVendorProfile);
// router.put("/profile", VerifyVendorToken, upload.single('profileImage'), updateVendorProfile);


// // ✅ ADD THIS CODE RIGHT HERE (before module.exports)

// // Quick fix route for existing UPI orders that show "Paid" but have pending status in DB
// router.post('/fix-upi-payments', VerifyVendorToken, async (req, res) => {
//   try {
//     const Order = require('../models/Order');
    
//     // Update payment status for delivered UPI orders that are stuck at "pending"
//     const result = await Order.updateMany(
//       { 
//         paymentMethod: 'UPI',
//         orderStatus: 'delivered',
//         paymentStatus: 'pending'
//       },
//       { 
//         paymentStatus: 'paid'  // Change from 'pending' to 'paid'
//       }
//     );
    
//     console.log(`✅ Fixed ${result.modifiedCount} UPI orders`);
    
//     res.json({ 
//       success: true,
//       message: `Updated ${result.modifiedCount} UPI orders to 'paid' status`,
//       modifiedCount: result.modifiedCount 
//     });
//   } catch (error) {
//     console.error('❌ Error fixing UPI payments:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error',
//       error: error.message 
//     });
//   }
// });



// // ✅ ADD THESE ROUTES TO YOUR EXISTING VendorRoute.js FILE

// // Get return requests for vendor
// router.get("/return-requests", VerifyVendorToken, async (req, res) => {
//     try {
//         const vendorId = req.vendor.id;
//         const { status = 'all', page = 1, limit = 10 } = req.query;

//         console.log('📋 Fetching return requests for vendor:', vendorId);

//         const Order = require('../models/Order');
        
//         // Build query
//         let query = {
//             'items.vendor': vendorId,
//             returnStatus: { $ne: null }
//         };

//         if (status !== 'all') {
//             query.returnStatus = status;
//         }

//         // Get return requests with pagination
//         const returnRequests = await Order.find(query)
//             .populate('customer', 'name email phone')
//             .populate('items.product', 'name images category')
//             .populate('items.vendor', 'businessName')
//             .sort({ returnRequestedAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         // Get total count
//         const totalCount = await Order.countDocuments(query);

//         // Filter items for this vendor only
//         const processedRequests = returnRequests.map(order => ({
//             ...order.toObject(),
//             items: order.items.filter(item => item.vendor._id.toString() === vendorId)
//         }));

//         res.json({
//             success: true,
//             returnRequests: processedRequests,
//             pagination: {
//                 currentPage: parseInt(page),
//                 totalPages: Math.ceil(totalCount / limit),
//                 totalItems: totalCount,
//                 hasNext: page * limit < totalCount,
//                 hasPrev: page > 1
//             },
//             stats: {
//                 requested: await Order.countDocuments({ ...query, returnStatus: 'requested' }),
//                 approved: await Order.countDocuments({ ...query, returnStatus: 'approved' }),
//                 rejected: await Order.countDocuments({ ...query, returnStatus: 'rejected' }),
//                 completed: await Order.countDocuments({ ...query, returnStatus: 'completed' })
//             }
//         });

//     } catch (error) {
//         console.error('💥 Return requests fetch error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch return requests'
//         });
//     }
// });

// // Process return request (approve/reject)
// router.put("/return-requests/:orderId/process", VerifyVendorToken, async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { action, vendorComments } = req.body;
//         const vendorId = req.vendor.id;

//         console.log('🔄 Processing return request:', { orderId, action, vendorId });

//         // Validation
//         if (!['approve', 'reject'].includes(action)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Action must be either "approve" or "reject"'
//             });
//         }

//         const Order = require('../models/Order');
        
//         // Find the order and verify vendor ownership
//         const order = await Order.findOne({
//             _id: orderId,
//             'items.vendor': vendorId,
//             returnStatus: 'requested'
//         }).populate('customer', 'name email phone')
//           .populate('items.product', 'name')
//           .populate('items.vendor', 'businessName');

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Return request not found or already processed'
//             });
//         }

//         // Update return status
//         const newReturnStatus = action === 'approve' ? 'approved' : 'rejected';
//         const newOrderStatus = action === 'approve' ? 'return-approved' : 'return-rejected';
        
//         order.returnStatus = newReturnStatus;
//         order.orderStatus = newOrderStatus;
//         order.returnProcessedAt = new Date();
//         order.returnProcessedBy = vendorId;
        
//         if (vendorComments) {
//             order.returnComments = (order.returnComments || '') + '\n\nVendor Response: ' + vendorComments;
//         }

//         // If approved, calculate refund amount
//         if (action === 'approve') {
//             order.refundAmount = order.totalAmount;
//             order.refundStatus = 'pending';
//         }

//         await order.save();

//         console.log(`✅ Return request ${action}ed successfully`);

//         res.json({
//             success: true,
//             message: `Return request ${action}ed successfully`,
//             order: {
//                 id: order._id,
//                 returnStatus: order.returnStatus,
//                 orderStatus: order.orderStatus,
//                 refundAmount: order.refundAmount,
//                 processedAt: order.returnProcessedAt
//             }
//         });

//     } catch (error) {
//         console.error('💥 Process return request error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to process return request'
//         });
//     }
// });

// // Get return request details
// router.get("/return-requests/:orderId", VerifyVendorToken, async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const vendorId = req.vendor.id;

//         const Order = require('../models/Order');
        
//         const order = await Order.findOne({
//             _id: orderId,
//             'items.vendor': vendorId
//         }).populate('customer', 'name email phone profileImage')
//           .populate('items.product', 'name images category price')
//           .populate('items.vendor', 'businessName')
//           .populate('returnProcessedBy', 'businessName');

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Return request not found'
//             });
//         }

//         // Filter items for this vendor only
//         const vendorItems = order.items.filter(item => 
//             item.vendor._id.toString() === vendorId
//         );

//         res.json({
//             success: true,
//             returnRequest: {
//                 ...order.toObject(),
//                 items: vendorItems
//             }
//         });

//     } catch (error) {
//         console.error('💥 Return request details error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch return request details'
//         });
//     }
// });



// // ✅ ADD THESE ROUTES TO YOUR EXISTING VendorRoute.js FILE

// const Order = require('../models/Order');

// // Get return requests for vendor
// // ✅ CORRECT VENDOR RETURN REQUESTS ROUTE
// // ✅ WORKING VENDOR RETURN REQUESTS ROUTE
// router.get("/return-requests", VerifyVendorToken, async (req, res) => {
//     try {
//         const vendorId = req.vendor.id;
//         console.log('🔍 Vendor ID:', vendorId);

//         const Order = require('../models/Order');
        
//         // ✅ SIMPLE QUERY - FIND ALL RETURN REQUESTS FOR THIS VENDOR
//         const returnRequests = await Order.find({
//             'items.vendor': vendorId,
//             returnStatus: { $ne: null }
//         })
//         .populate('customer', 'name email phone')
//         .populate('items.product', 'name images category')
//         .populate('items.vendor', 'name')
//         .sort({ returnRequestedAt: -1 });

//         console.log('✅ Found return requests:', returnRequests.length);

//         // ✅ FILTER ITEMS FOR THIS VENDOR
//         const processedRequests = returnRequests.map(order => ({
//             ...order.toObject(),
//             items: order.items.filter(item => 
//                 item.vendor && item.vendor._id.toString() === vendorId
//             )
//         }));

//         res.json({
//             success: true,
//             returnRequests: processedRequests,
//             pagination: { totalPages: 1 },
//             stats: {
//                 requested: processedRequests.filter(r => r.returnStatus === 'requested').length,
//                 approved: processedRequests.filter(r => r.returnStatus === 'approved').length,
//                 rejected: processedRequests.filter(r => r.returnStatus === 'rejected').length,
//                 completed: processedRequests.filter(r => r.returnStatus === 'completed').length
//             }
//         });
//     } catch (error) {
//         console.error('💥 Return requests error:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch return requests' });
//     }
// });



// module.exports = router;




const express = require("express"); 
const router = express.Router(); 
const multer = require("multer"); 
const { 
    registerVendor, 
    loginVendor,
    getVendorProducts,     
    addProduct,     
    updateProduct,     
    deleteProduct,
    getCategories,
    verifyVendor,
    getVendorOrders,
    updateOrderStatus,
    getVendorFeedbacks,
    sendMessage,
    deleteMessage,getVendorMessages,
    deleteFeedback,getVendorProfile,updateVendorProfile} = require("../controller/Vendor"); 
const { VerifyVendorToken } = require('../middleware/authVendor'); 
const path = require('path');  

// Configure multer storage for vendor profile images
const storage = multer.diskStorage({     
    destination: (req, file, cb) => {         
        cb(null, "./uploads/vendor");  // Make sure this directory exists     
    },     
    filename: (req, file, cb) => {         
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);         
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);     
    } 
});  

const upload = multer({ storage: storage });  

// Configure multer for product images 
const productStorage = multer.diskStorage({     
    destination: (req, file, cb) => {         
        cb(null, "./uploads/products");     
    },     
    filename: (req, file, cb) => {         
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);         
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));     
    } 
});  

const uploadProduct = multer({      
    storage: productStorage,     
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB 
});  

// Auth routes 
router.post("/register", upload.single('profileImage'), registerVendor);  
router.post("/login", loginVendor); 
router.get("/verify", VerifyVendorToken, verifyVendor);  

// Product routes 
router.get("/products", VerifyVendorToken, getVendorProducts); 
router.post("/products", VerifyVendorToken, uploadProduct.array('images', 5), addProduct); 
// Fixed: Add multer middleware to PUT route for handling image uploads
router.put("/products/:id", VerifyVendorToken, uploadProduct.array('images', 5), updateProduct); 
router.delete("/products/:id", VerifyVendorToken, deleteProduct); 
router.get("/categories", VerifyVendorToken, getCategories);  
router.post('/messages', VerifyVendorToken, sendMessage);
router.delete('/messages/:id', VerifyVendorToken, deleteMessage);
router.get('/messages', VerifyVendorToken, getVendorMessages);

// Order routes
router.get("/orders", VerifyVendorToken, getVendorOrders);
router.put("/orders/:orderId/status", VerifyVendorToken, updateOrderStatus);

// Feedback routes
router.get("/feedbacks", VerifyVendorToken, getVendorFeedbacks);
router.delete("/feedbacks/:id", VerifyVendorToken, deleteFeedback);

// Profile routes
router.get("/profile", VerifyVendorToken, getVendorProfile);
router.put("/profile", VerifyVendorToken, upload.single('profileImage'), updateVendorProfile);


// ✅ ADD THIS CODE RIGHT HERE (before module.exports)

// Quick fix route for existing UPI orders that show "Paid" but have pending status in DB
router.post('/fix-upi-payments', VerifyVendorToken, async (req, res) => {
  try {
    const Order = require('../models/Order');
    
    // Update payment status for delivered UPI orders that are stuck at "pending"
    const result = await Order.updateMany(
      { 
        paymentMethod: 'UPI',
        orderStatus: 'delivered',
        paymentStatus: 'pending'
      },
      { 
        paymentStatus: 'paid'  // Change from 'pending' to 'paid'
      }
    );
    
    console.log(`✅ Fixed ${result.modifiedCount} UPI orders`);
    
    res.json({ 
      success: true,
      message: `Updated ${result.modifiedCount} UPI orders to 'paid' status`,
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    console.error('❌ Error fixing UPI payments:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});



// ✅ ADD THESE ROUTES TO YOUR EXISTING VendorRoute.js FILE

// Get return requests for vendor
router.get("/return-requests", VerifyVendorToken, async (req, res) => {
    try {
        const vendorId = req.vendor.id;
        const { status = 'all', page = 1, limit = 10 } = req.query;

        console.log('📋 Fetching return requests for vendor:', vendorId);

        const Order = require('../models/Order');
        
        // Build query
        let query = {
            'items.vendor': vendorId,
            returnStatus: { $ne: null }
        };

        if (status !== 'all') {
            query.returnStatus = status;
        }

        // Get return requests with pagination
        const returnRequests = await Order.find(query)
            .populate('customer', 'name email phone')
            .populate('items.product', 'name images category')
            .populate('items.vendor', 'businessName')
            .sort({ returnRequestedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Get total count
        const totalCount = await Order.countDocuments(query);

        // Filter items for this vendor only
        const processedRequests = returnRequests.map(order => ({
            ...order.toObject(),
            items: order.items.filter(item => item.vendor._id.toString() === vendorId)
        }));

        res.json({
            success: true,
            returnRequests: processedRequests,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / limit),
                totalItems: totalCount,
                hasNext: page * limit < totalCount,
                hasPrev: page > 1
            },
            stats: {
                requested: await Order.countDocuments({ ...query, returnStatus: 'requested' }),
                approved: await Order.countDocuments({ ...query, returnStatus: 'approved' }),
                rejected: await Order.countDocuments({ ...query, returnStatus: 'rejected' }),
                completed: await Order.countDocuments({ ...query, returnStatus: 'completed' })
            }
        });

    } catch (error) {
        console.error('💥 Return requests fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch return requests'
        });
    }
});

// Process return request (approve/reject)
// ✅ FIXED - Process return request (approve/reject)
// Debug version - Process return request
// ✅ FIXED - Process return request function
router.put("/return-requests/:orderId/process", VerifyVendorToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { action, vendorComments } = req.body;
        const vendorId = req.vendor.id;

        console.log('🔄 Processing return:', action, 'for order:', orderId);

        const Order = require('../models/Order');
        const order = await Order.findOne({
            _id: orderId,
            'items.vendor': vendorId,
            returnStatus: 'requested'
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Return request not found'
            });
        }

        // Update return status ONLY - Don't change orderStatus
        order.returnStatus = action === 'approve' ? 'approved' : 'rejected';
        order.returnProcessedAt = new Date();
        order.returnProcessedBy = vendorId;
        
        if (vendorComments) {
            order.returnComments = (order.returnComments || '') + '\n\nVendor Response: ' + vendorComments;
        }

        // ✅ ONLY deduct revenue for APPROVED returns
        if (action === 'approve') {
            order.refundAmount = order.totalAmount;
            order.refundStatus = 'pending';
            
            const Vendor = require('../models/Vendor');
            await Vendor.findByIdAndUpdate(vendorId, {
                $inc: { 
                    totalRevenue: -order.totalAmount,
                    platformFees: -(order.totalAmount * 0.05)
                }
            });
            console.log(`✅ APPROVED: Revenue deducted ₹${order.totalAmount}`);
        } else {
            console.log(`✅ REJECTED: Revenue unchanged ₹0`);
        }

        await order.save();

        res.json({
            success: true,
            message: `Return request ${action}ed successfully`
        });

    } catch (error) {
        console.error('Error processing return:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process return request'
        });
    }
});


// Get return request details
router.get("/return-requests/:orderId", VerifyVendorToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const vendorId = req.vendor.id;

        const Order = require('../models/Order');
        
        const order = await Order.findOne({
            _id: orderId,
            'items.vendor': vendorId
        }).populate('customer', 'name email phone profileImage')
          .populate('items.product', 'name images category price')
          .populate('items.vendor', 'businessName')
          .populate('returnProcessedBy', 'businessName');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Return request not found'
            });
        }

        // Filter items for this vendor only
        const vendorItems = order.items.filter(item => 
            item.vendor._id.toString() === vendorId
        );

        res.json({
            success: true,
            returnRequest: {
                ...order.toObject(),
                items: vendorItems
            }
        });

    } catch (error) {
        console.error('💥 Return request details error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch return request details'
        });
    }
});



// ✅ ADD THESE ROUTES TO YOUR EXISTING VendorRoute.js FILE

// const Order = require('../models/Order');

// Get return requests for vendor
// ✅ CORRECT VENDOR RETURN REQUESTS ROUTE
// ✅ WORKING VENDOR RETURN REQUESTS ROUTE
// router.get("/return-requests", VerifyVendorToken, async (req, res) => {
//     try {
//         const vendorId = req.vendor.id;
//         console.log('🔍 Vendor ID:', vendorId);

//         const Order = require('../models/Order');
        
//         // ✅ SIMPLE QUERY - FIND ALL RETURN REQUESTS FOR THIS VENDOR
//         const returnRequests = await Order.find({
//             'items.vendor': vendorId,
//             returnStatus: { $ne: null }
//         })
//         .populate('customer', 'name email phone')
//         .populate('items.product', 'name images category')
//         .populate('items.vendor', 'name')
//         .sort({ returnRequestedAt: -1 });

//         console.log('✅ Found return requests:', returnRequests.length);

//         // ✅ FILTER ITEMS FOR THIS VENDOR
//         const processedRequests = returnRequests.map(order => ({
//             ...order.toObject(),
//             items: order.items.filter(item => 
//                 item.vendor && item.vendor._id.toString() === vendorId
//             )
//         }));

//         res.json({
//             success: true,
//             returnRequests: processedRequests,
//             pagination: { totalPages: 1 },
//             stats: {
//                 requested: processedRequests.filter(r => r.returnStatus === 'requested').length,
//                 approved: processedRequests.filter(r => r.returnStatus === 'approved').length,
//                 rejected: processedRequests.filter(r => r.returnStatus === 'rejected').length,
//                 completed: processedRequests.filter(r => r.returnStatus === 'completed').length
//             }
//         });
//     } catch (error) {
//         console.error('💥 Return requests error:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch return requests' });
//     }
// });

// ✅ Add this route to reset revenue - Temporary fix
router.post('/reset-revenue', VerifyVendorToken, async (req, res) => {
    try {
        const vendorId = req.vendor.id;
        const Order = require('../models/Order');
        const Vendor = require('../models/Vendor');
        
        const orders = await Order.find({ 'items.vendor': vendorId });
        
        let correctRevenue = 0;
        
        orders.forEach(order => {
            // Only skip approved returns
            if (order.returnStatus === 'approved') {
                console.log(`Skipping approved return: ₹${order.totalAmount}`);
                return;
            }
            
            // Include everything else that's delivered
            if (order.orderStatus === 'delivered') {
                correctRevenue += order.totalAmount;
                console.log(`Including: ₹${order.totalAmount} (${order.returnStatus || 'normal'})`);
            }
        });
        
        await Vendor.findByIdAndUpdate(vendorId, {
            totalRevenue: correctRevenue,
            platformFees: correctRevenue * 0.05
        });
        
        res.json({ 
            success: true, 
            message: `Revenue reset to ₹${correctRevenue}`,
            correctRevenue 
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


module.exports = router;