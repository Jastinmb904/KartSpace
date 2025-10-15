// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './Pages/Home'
// import Login from './Pages/Login'
// import Register from './Pages/Register'
// // import NutritionistList from './Pages/NutritionistList'
// import Context from './Context/Context'
// import ProtectedRoute from './components/ProtectedRoute'
// import ProductList from './Pages/ProductList'
// import ProductView from './Pages/ProductView'
// // import AboutUs from './Pages/About'
// // import NutritionistProfile from './Pages/NutritionistProfile'
// // import RequestHistory from './Pages/RequestHistory'
// // import ApplyMealPlan from './Pages/ApplyMealPlan'
// // import UserRequests from './Pages/UserRequests'
// import Cart from './Pages/Cart';
// import Checkout from './Pages/Checkout'
// import Orders from './Pages/Orders'
// import About from './Pages/About'
// import HelpCenter from './Pages/HelpCenter'

// function App() {
//   return (
//     <Router>
//       <Context>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/help" element={<HelpCenter />} />

//           {/* Protected Routes */}
//           <Route path="/products" element={
//             <ProtectedRoute>
//               <ProductList/>
//             </ProtectedRoute>
//           } />
//           <Route path="/product/:id" element={
//             <ProtectedRoute>
//               <ProductView/>
//             </ProtectedRoute>
//           } />
//           <Route path="/checkout" element={
//             <ProtectedRoute>
//               <Checkout/>
//             </ProtectedRoute>
//           } />
//           <Route path="/orders" element={
//             <ProtectedRoute>
//               <Orders/>
//             </ProtectedRoute>
//           } />
//           {/* Add other protected routes here */}
//           <Route path="/about" element={
//             <ProtectedRoute>
//               <About/>
//             </ProtectedRoute>
//           } />
//           <Route path="/meal-plans" element={
//             <ProtectedRoute>
//               {/* <UserRequests /> */}
//             </ProtectedRoute>
//           } />
//           <Route path="/cart" element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           } />
//           {/* Add other protected routes here */}
//         </Routes>
//       </Context>
//     </Router>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './Pages/Home'
// import Login from './Pages/Login'
// import Register from './Pages/Register'
// import Context from './Context/Context'
// import ProtectedRoute from './components/ProtectedRoute'
// import ProductList from './Pages/ProductList'
// import ProductView from './Pages/ProductView'
// import Cart from './Pages/Cart';
// import Checkout from './Pages/Checkout'
// import Orders from './Pages/Orders'
// import About from './Pages/About'
// import HelpCenter from './Pages/HelpCenter'

// function App() {
//   // ✅ ADD LOADING STATE TO PREVENT IMMEDIATE REDIRECTS
//   const [isAuthReady, setIsAuthReady] = useState(false);

//   // ✅ ENHANCED TOKEN SYNC WITH LOADING STATE
//   useEffect(() => {
//     const syncTokensAndAuth = () => {
//       const authToken = localStorage.getItem("authToken");
//       const userToken = localStorage.getItem("userToken");
      
//       // Sync tokens in both directions
//       if (authToken && !userToken) {
//         localStorage.setItem("userToken", authToken);
//       }
//       if (userToken && !authToken) {
//         localStorage.setItem("authToken", userToken);
//       }
      
//       // Mark authentication as ready
//       setIsAuthReady(true);
//     };

//     // Small delay to ensure everything is synced
//     const timer = setTimeout(syncTokensAndAuth, 50);
//     return () => clearTimeout(timer);
//   }, []);

//   // ✅ SHOW LOADING UNTIL AUTH IS READY
//   if (!isAuthReady) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         fontSize: '16px',
//         color: '#666'
//       }}>
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Context>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/help" element={<HelpCenter />} />

//           {/* Protected Routes */}
//           <Route path="/products" element={
//             <ProtectedRoute>
//               <ProductList/>
//             </ProtectedRoute>
//           } />
//           <Route path="/product/:id" element={
//             <ProtectedRoute>
//               <ProductView/>
//             </ProtectedRoute>
//           } />
//           <Route path="/checkout" element={
//             <ProtectedRoute>
//               <Checkout/>
//             </ProtectedRoute>
//           } />
//           <Route path="/orders" element={
//             <ProtectedRoute>
//               <Orders/>
//             </ProtectedRoute>
//           } />
//           <Route path="/cart" element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </Context>
//     </Router>
//   );
// }

// export default App;


import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Context from './Context/Context'
import ProtectedRoute from './components/ProtectedRoute'

// Import Pages
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import About from './Pages/About'
import HelpCenter from './Pages/HelpCenter'
import ProductList from './Pages/ProductList'
import ProductView from './Pages/ProductView'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Orders from './Pages/Orders'

// Import Components
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    console.log('🚀 App initializing...');
    
    const syncTokensAndAuth = () => {
      const authToken = localStorage.getItem("authToken");
      const userToken = localStorage.getItem("userToken");
      
      // Sync tokens in both directions
      if (authToken && !userToken) {
        localStorage.setItem("userToken", authToken);
      }
      if (userToken && !authToken) {
        localStorage.setItem("authToken", userToken);
      }
      
      // Mark authentication as ready
      setIsAuthReady(true);
      console.log('✅ Auth ready');
    };

    // Small delay to ensure everything is synced
    const timer = setTimeout(syncTokensAndAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen
  if (!isAuthReady) {
    return (
       <div style={{
      backgroundColor: 'white',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px'
    }}>
      ✅ KartSpace is Working!
    </div>
  );
}

  console.log('🎯 Rendering main app');

  return (
    <Router>
      <Context>
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpCenter />} />

            {/* Protected Routes */}
            <Route path="/products" element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <ProductView />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />

            {/* 404 Fallback Route */}
            <Route path="*" element={
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                fontFamily: 'Arial, sans-serif'
              }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>404</h1>
                <p style={{ fontSize: '1.2rem', margin: '0 0 2rem 0' }}>Page Not Found</p>
                <button 
                  onClick={() => window.location.href = '/'} 
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Go Home
                </button>
              </div>
            } />
          </Routes>
        </div>
      </Context>
    </Router>
  );
}

export default App;
