// const mongoose=require('mongoose');

// const customerSchema=new mongoose.Schema({
//     name:
//     {
//         type:String,
//         require:true,
//     },
//     email:
//     {
//         type:String,
//         require:true,
//     },
//     password:
//     {
//         type:String,
//         require:true,
//     },
//     phone:
//     {
//         type:String,
//         require:true,
//     },
//     cart: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             default: 1
//         }
//     }]
// });

// module.exports=mongoose.model('Customer',customerSchema);



// const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: String,
//         default: ''
//     },
//     socialProvider: {
//         type: String,
//         default: null
//     },
//     socialId: {
//         type: String,
//         default: null
//     },
//     profileImage: {
//         type: String,
//         default: ''
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     // 🆕 ADD THESE FIELDS FOR EMAIL VERIFICATION
//     verificationOTP: {
//         type: String,
//         default: null
//     },
//     otpExpiry: {
//         type: Date,
//         default: null
//     },
//     tempData: {
//         name: String,
//         email: String,
//         phone: String,
//         createdAt: { type: Date, default: Date.now, expires: 1800 } // 30 minutes expiry
//     },
//     cart: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             default: 1
//         }
//     }]
// }, {
//     timestamps: true
// });

// // THIS FIXES THE OverwriteModelError:
// module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);










// const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: String,
//         default: ''
//     },
//     socialProvider: {
//         type: String,
//         default: null
//     },
//     socialId: {
//         type: String,
//         default: null
//     },
//     profileImage: {
//         type: String,
//         default: ''
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     // 🆕 EMAIL VERIFICATION FIELDS
//     verificationOTP: {
//         type: String,
//         default: null
//     },
//     otpExpiry: {
//         type: Date,
//         default: null
//     },
//     tempData: {
//         name: String,
//         email: String,
//         phone: String,
//         createdAt: { type: Date, default: Date.now, expires: 1800 }
//     },
//     // 🆕 PASSWORD RESET FIELDS - ADD THESE
//     resetPasswordToken: {
//         type: String,
//         default: null
//     },
//     resetPasswordExpires: {
//         type: Date,
//         default: null
//     },
//     cart: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             default: 1
//         }
//     }]
// }, {
//     timestamps: true
// });

// module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);






// const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: String,
//         default: ''
//     },
//     socialProvider: {
//         type: String,
//         default: null
//     },
//     socialId: {
//         type: String,
//         default: null
//     },
//     profileImage: {
//         type: String,
//         default: ''
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     // EMAIL VERIFICATION FIELDS
//     verificationOTP: {
//         type: String,
//         default: null
//     },
//     otpExpiry: {
//         type: Date,
//         default: null
//     },
//     tempData: {
//         name: String,
//         email: String,
//         phone: String,
//         createdAt: { type: Date, default: Date.now, expires: 1800 }
//     },
//     // ✅ PASSWORD RESET OTP FIELDS - ADD THESE
//     resetPasswordOTP: {
//         type: String,
//         default: null
//     },
//     resetOTPExpiry: {
//         type: Date,
//         default: null
//     },
//     cart: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             default: 1
//         }
//     }]
// }, {
//     timestamps: true
// });

// module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);




// const mongoose = require('mongoose');


// const customerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: String,
//         default: ''
//     },
//     socialProvider: {
//         type: String,
//         default: null
//     },
//     socialId: {
//         type: String,
//         default: null
//     },
//     profileImage: {
//         type: String,
//         default: ''
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     // EMAIL VERIFICATION FIELDS
//     verificationOTP: {
//         type: String,
//         default: null
//     },
//     otpExpiry: {
//         type: Date,
//         default: null
//     },
//     tempData: {
//         name: String,
//         email: String,
//         phone: String,
//         createdAt: { type: Date, default: Date.now, expires: 1800 }
//     },
//     // ✅ PASSWORD RESET OTP FIELDS - ADD THESE
//     resetPasswordOTP: {
//         type: String,
//         default: null
//     },
//     resetOTPExpiry: {
//         type: Date,
//         default: null
//     },
//    cart: [{
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         default: 1
//     },
//     // ✅ ADD SIZE SELECTION - NEW FIELD
//     selectedSize: {
//         type: String,
//         required: false // Optional for backward compatibility
//     }
// }]

// }, {
//     timestamps: true
// });


// module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);





const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: ''
    },
    socialProvider: {
        type: String,
        default: null
    },
    socialId: {
        type: String,
        default: null
    },
    profileImage: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // EMAIL VERIFICATION FIELDS
    verificationOTP: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    // ✅ FIXED - REMOVED expires: 1800 TO MAKE DATA PERMANENT
    tempData: {
        name: String,
        email: String,
        phone: String,
        createdAt: { type: Date, default: Date.now }
    },
    // PASSWORD RESET OTP FIELDS
    resetPasswordOTP: {
        type: String,
        default: null
    },
    resetOTPExpiry: {
        type: Date,
        default: null
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        selectedSize: {
            type: String,
            required: false
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
