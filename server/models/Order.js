
// const mongoose = require('mongoose');


// const orderSchema = new mongoose.Schema({
//     customer: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Customer',
//         required: true
//     },
//     items: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         vendor: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Vendor',
//             required: true
//         },
//         // ✅ ADD SIZE SELECTION - NEW FIELD
//         selectedSize: {
//             type: String,
//             required: false // Make it optional for existing orders
//         }
//     }],
//     shippingAddress: {
//         street: String,
//         city: String,
//         state: String,
//         pincode: String,
//         country: String
//     },
//     contactInfo: {
//         name: String,
//         phone: String,
//         email: String
//     },
//     totalAmount: {
//         type: Number,
//         required: true
//     },
//     paymentMethod: {
//         type: String,
//         enum: ['COD', 'UPI'],
//         required: true
//     },
//     paymentDetails: {
//         upiId: String,
//         transactionId: String,
//         upiQRImage: String
//     },
//     paymentStatus: {
//         type: String,
//         enum: ['pending', 'completed', 'failed'],
//         default: 'pending'
//     },
//     orderStatus: {
//         type: String,
//         enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//         default: 'pending'
//     }
// }, {
//     timestamps: true
// });


// module.exports = mongoose.model('Order', orderSchema);





const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
            required: true
        },
        selectedSize: {
            type: String,
            required: false
        }
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    contactInfo: {
        name: String,
        phone: String,
        email: String
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI'],
        required: true
    },
    paymentDetails: {
        upiId: String,
        transactionId: String,
        upiQRImage: String
    },
   paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'paid'], // ✅ ADD 'paid' HERE
    default: 'pending'
},

    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'return-requested', 'return-approved', 'return-rejected', 'returned'],
        default: 'pending'
    },
    
    // ✅ NEW: Return-related fields
    returnStatus: {
        type: String,
        enum: ['requested', 'approved', 'rejected', 'completed', 'cancelled'],
        default: null
    },
    returnReason: {
        type: String,
        default: null
    },
    returnComments: {
        type: String,
        default: null
    },
    returnRequestedAt: {
        type: Date,
        default: null
    },
    returnProcessedAt: {
        type: Date,
        default: null
    },
    returnProcessedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        default: null
    },
    returnImages: [{
        type: String
    }],
    refundAmount: {
        type: Number,
        default: null
    },
    refundStatus: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: null
    },
    refundProcessedAt: {
        type: Date,
        default: null
    },
    
    // ✅ NEW: Delivery tracking
    deliveredAt: {
        type: Date,
        default: null
    },
    
    // ✅ NEW: Feedback system
    // feedback: {
    //     rating: {
    //         type: Number,
    //         min: 1,
    //         max: 5
    //     },
    //     comment: String,
    //     submittedAt: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
