// const express=require("express")
// const app=express();
// app.use(express.json())
// const cors=require('cors')
// const path = require('path');

// const connectToMongo=require("./DB.js")
// connectToMongo()

// app.use(cors())

// const port=9000;
// app.listen(port,()=>{
//     console.log("................................")
//     console.log("Server is running on port,"+port)
// })

// app.use("/customer", require("./routes/CustomerRoute"));
// app.use("/uploads/customer", express.static("./uploads/customer"));

// app.use("/admin", require("./routes/AdminRoute"));
// app.use("/uploads/admin", express.static("./uploads/admin"));

// app.use("/vendor", require("./routes/VendorRoute")); // Note the leading slash
// app.use("/uploads/vendor", express.static("./uploads/vendor"));

// // Add this line to serve product images
// app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));

// const express = require("express");
// const app = express();
// const cors = require('cors');
// const path = require('path');

// // Load environment variables FIRST
// require('dotenv').config();

// // Database connection
// const connectToMongo = require("./DB.js");
// connectToMongo();

// // Middleware - Order is important!
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5175'],
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use("/customer", require("./routes/CustomerRoute"));
// app.use("/uploads/customer", express.static(path.join(__dirname, "uploads/customer")));

// app.use("/admin", require("./routes/AdminRoute"));
// app.use("/uploads/admin", express.static(path.join(__dirname, "uploads/admin")));

// app.use("/vendor", require("./routes/VendorRoute"));
// app.use("/uploads/vendor", express.static(path.join(__dirname, "uploads/vendor")));

// app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Server is running successfully!',
//     port: 9000,
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use(function (err, req, res, next) {
//   console.error('BACKEND ERROR:', err.message);
//   console.error('STACK:', err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Server Error',
//     error: err.message
//   });
// });

// const port = 9000;
// app.listen(port, () => {
//   console.log("................................");
//   console.log("Server is running on port," + port);
//   console.log("................................");
// });

// module.exports = app;


// const express = require("express");
// const app = express();
// const cors = require('cors');
// const path = require('path');

// // Load environment variables FIRST
// require('dotenv').config();

// // Database connection
// const connectToMongo = require("./DB.js");
// connectToMongo();

// // Middleware - Updated CORS configuration
// app.use(cors({
//   origin: [
//     'http://localhost:3000', 
//     'http://localhost:5172',  // Admin
//     'http://localhost:5173',  // Vendor
//     'http://localhost:5174',  // Admin backup port
//     'http://localhost:5175'   // User
//   ],
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use("/customer", require("./routes/CustomerRoute"));
// app.use("/uploads/customer", express.static(path.join(__dirname, "uploads/customer")));

// app.use("/admin", require("./routes/AdminRoute"));
// app.use("/uploads/admin", express.static(path.join(__dirname, "uploads/admin")));

// app.use("/vendor", require("./routes/VendorRoute"));
// app.use("/uploads/vendor", express.static(path.join(__dirname, "uploads/vendor")));

// app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Server is running successfully!',
//     port: 9000,
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use(function (err, req, res, next) {
//   console.error('BACKEND ERROR:', err.message);
//   console.error('STACK:', err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Server Error',
//     error: err.message
//   });
// });

// const port = 9000;
// app.listen(port, () => {
//   console.log("................................");
//   console.log("Server is running on port," + port);
//   console.log("................................");
// });

// module.exports = app;






// const express = require("express");
// const app = express();
// const cors = require('cors');
// const path = require('path');

// // Load environment variables FIRST
// require('dotenv').config();

// // Database connection
// const connectToMongo = require("./DB.js");
// connectToMongo();

// // ✅ FIXED CORS CONFIGURATION
// app.use(cors({
//   origin: [
//     'http://localhost:3000', 
//     'http://localhost:5172',  // Admin
//     'http://localhost:5173',  // Vendor
//     'http://localhost:5174',  // Admin backup port
//     'http://localhost:5175'   // User
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
//   optionsSuccessStatus: 200 // ✅ Handle preflight without explicit OPTIONS route
// }));

// // ✅ BODY PARSING MIDDLEWARE
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // ✅ DEBUG LOGGING FOR CART REQUESTS
// // app.use((req, res, next) => {
// //   if (req.path.includes('/cart')) {
// //     console.log('\n🛒 === CART REQUEST DEBUG ===');
// //     console.log('Method:', req.method);
// //     console.log('URL:', req.url);
// //     console.log('Headers:', req.headers);
// //     console.log('Body:', req.body);
// //     console.log('Auth Token:', req.headers['auth-token']);
// //     console.log('==========================\n');
// //   }
// //   next();
// // });

// // Routes
// app.use("/customer", require("./routes/CustomerRoute"));
// app.use("/uploads/customer", express.static(path.join(__dirname, "uploads/customer")));

// app.use("/admin", require("./routes/AdminRoute"));
// app.use("/uploads/admin", express.static(path.join(__dirname, "uploads/admin")));

// app.use("/vendor", require("./routes/VendorRoute"));
// app.use("/uploads/vendor", express.static(path.join(__dirname, "uploads/vendor")));

// app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Server is running successfully!',
//     port: 9000,
//     timestamp: new Date().toISOString()
//   });
// });

// // ✅ CATCH-ALL ROUTE (EXPRESS 5 SYNTAX) - Optional
// // app.all('/*catchall', (req, res) => {
// //   res.status(404).json({ message: 'Route not found' });
// // });

// // Error handling middleware
// app.use(function (err, req, res, next) {
//   console.error('BACKEND ERROR:', err.message);
//   console.error('STACK:', err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Server Error',
//     error: err.message
//   });
// });

// const port = 9000;
// app.listen(port, () => {
//   console.log("................................");
//   console.log("Server is running on port," + port);
//   console.log("................................");
// });

// module.exports = app;





const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');

// Load environment variables FIRST
require('dotenv').config();

// Database connection
const connectToMongo = require("./DB.js");

// ✅ NEW FUNCTION TO DROP TTL INDEX
const dropTTLIndex = async () => {
  try {
    const mongoose = require('mongoose');
    
    // Wait for database connection
    if (mongoose.connection.readyState !== 1) {
      console.log('⏳ Waiting for database connection...');
      await new Promise((resolve) => {
        mongoose.connection.on('connected', resolve);
      });
    }
    
    const db = mongoose.connection.db;
    console.log('🔍 Checking for TTL index on customers collection...');
    
    // Try to drop the TTL index if it exists
    await db.collection('customers').dropIndex('tempData.createdAt_1');
    console.log('✅ TTL index dropped successfully - Users will now be stored permanently!');
    
  } catch (error) {
    if (error.message.includes('index not found') || error.code === 27) {
      console.log('✅ TTL index not found - This is good! Users will be stored permanently.');
    } else {
      console.log('⚠️ Error dropping TTL index:', error.message);
      console.log('💡 This might be fine - the index may not exist yet.');
    }
  }
};

// ✅ CONNECT TO DATABASE AND REMOVE TTL INDEX
connectToMongo().then(() => {
  console.log('📦 Database connected successfully');
  // Remove TTL index after connection
  setTimeout(dropTTLIndex, 2000); // Wait 2 seconds for connection to stabilize
}).catch((error) => {
  console.error('❌ Database connection failed:', error);
});

// ✅ FIXED CORS CONFIGURATION
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5172',  // Admin
    'http://localhost:5173',  // Vendor
    'http://localhost:5174',  // Admin backup port
    'http://localhost:5175'   // User
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
  optionsSuccessStatus: 200 // ✅ Handle preflight without explicit OPTIONS route
}));

// ✅ BODY PARSING MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ DEBUG LOGGING FOR CART REQUESTS
// app.use((req, res, next) => {
//   if (req.path.includes('/cart')) {
//     console.log('\n🛒 === CART REQUEST DEBUG ===');
//     console.log('Method:', req.method);
//     console.log('URL:', req.url);
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     console.log('Auth Token:', req.headers['auth-token']);
//     console.log('==========================\n');
//   }
//   next();
// });

// Routes
app.use("/customer", require("./routes/CustomerRoute"));
app.use("/uploads/customer", express.static(path.join(__dirname, "uploads/customer")));

app.use("/admin", require("./routes/AdminRoute"));
app.use("/uploads/admin", express.static(path.join(__dirname, "uploads/admin")));

app.use("/vendor", require("./routes/VendorRoute"));
app.use("/uploads/vendor", express.static(path.join(__dirname, "uploads/vendor")));

app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running successfully!',
    port: 9000,
    timestamp: new Date().toISOString()
  });
});

// ✅ CATCH-ALL ROUTE (EXPRESS 5 SYNTAX) - Optional
// app.all('/*catchall', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error('BACKEND ERROR:', err.message);
  console.error('STACK:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: err.message
  });
});

const port = 9000;
app.listen(port, () => {
  console.log("................................");
  console.log("Server is running on port," + port);
  console.log("................................");
});

module.exports = app;
