

// import React, { useState, useEffect, useContext, useMemo } from 'react';
// import swal from 'sweetalert2';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import SearchIcon from '@mui/icons-material/Search';
// import { Badge, Drawer, Box, Typography, IconButton, Button, Card, CardContent, Grid, Divider } from '@mui/material';
// import { Add, Remove, Delete, Close, LocalShipping, Security } from '@mui/icons-material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { config } from '../Config/Config';
// import { userContext } from '../Context/Context';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

// const Header = () => {
//   const { host } = config || {};
//   const { cart, getCart, user, updateCartItem, removeFromCart } = useContext(userContext) || { 
//     cart: [], 
//     getCart: () => {}, 
//     user: null,
//     updateCartItem: () => {},
//     removeFromCart: () => {}
//   };
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  
//   // ✅ ADD THESE NEW STATE VARIABLES FOR AUTHENTICATION
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
  
//   const open = Boolean(anchorEl);

//   // ✅ ADD THIS USEEFFECT TO CHECK AUTHENTICATION STATUS
//   useEffect(() => {
//     const checkAuth = () => {
//       const userToken = localStorage.getItem('userToken');
//       const authToken = localStorage.getItem('authToken');
//       const userData = localStorage.getItem('currentUser');
      
//       if ((userToken || authToken) && userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setCurrentUser(parsedUser);
//           setIsAuthenticated(true);
//         } catch (error) {
//           localStorage.removeItem('userToken');
//           localStorage.removeItem('authToken');
//           localStorage.removeItem('currentUser');
//           setIsAuthenticated(false);
//           setCurrentUser(null);
//         }
//       } else {
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//       }
//     };
    
//     checkAuth();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);

//     // ✅ UPDATE THIS TO USE AUTHENTICATION STATE
//     if (isAuthenticated && typeof getCart === 'function') {
//       getCart();
//     }

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isAuthenticated, getCart]);

//   const cartCount = useMemo(() => (Array.isArray(cart) ? cart.length : 0), [cart]);

//   // **EXACTLY LIKE YOUR HOME PAGE - Category data with refs and scrolling**
//   const categoryIcons = [
//     { icon: "👗", title: "Fashion", color: "#667eea", sectionId: "fashion-section", clickable: true },
//     { icon: "📱", title: "Electronics", color: "#ff6b35", sectionId: "smartphone-section", clickable: true },
//     { icon: "👜", title: "Bags", color: "#43e97b", sectionId: "bags-section", clickable: true },
//     { icon: "👟", title: "Footwear", color: "#4facfe", sectionId: "footwear-section", clickable: true },
//     { icon: "🛒", title: "Groceries", color: "#38a169", sectionId: "grocery-section", clickable: true },
//     { icon: "💄", title: "Beauty", color: "#ed64a6", sectionId: "beauty-section", clickable: true },
//     { icon: "⌚", title: "Watches", color: "#8b5cf6", sectionId: "watches-section", clickable: true },
//     { icon: "🌿", title: "Wellness", color: "#38b2ac", sectionId: "wellness-section", clickable: false },
//     { icon: "💍", title: "Jewellery", color: "#9f7aea", sectionId: "jewellery-section", clickable: false }
//   ];

//   // **EXACTLY LIKE YOUR HOME PAGE - Smooth scroll function**
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//         inline: 'nearest'
//       });
//     }
//   };

//   // **EXACTLY LIKE YOUR HOME PAGE - Category navigation handler**
//   const handleCategoryNavigation = (sectionId) => {
//     if (location.pathname === '/') {
//       scrollToSection(sectionId);
//     } else {
//       navigate('/');
//       setTimeout(() => {
//         scrollToSection(sectionId);
//       }, 500);
//     }
//   };

//   // Cart utility functions
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(price);
//   };

//   const getTotalItems = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   // Handle search functionality
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
//       setSearchTerm('');
//     }
//   };

//   const handleSearchKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch(e);
//     }
//   };

//   const handleCategoryClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (sectionId) => {
//     handleCategoryNavigation(sectionId);
//     handleClose();
//   };

//   // Cart handlers
//   const handleCartClick = (e) => {
//     e.preventDefault();
//     setCartDrawerOpen(true);
//   };

//   const handleCartClose = () => {
//     setCartDrawerOpen(false);
//   };

//   const handleContinueShopping = () => {
//     setCartDrawerOpen(false);
//     navigate('/');
//   };

//   const handleCheckout = () => {
//     navigate('/checkout');
//     setCartDrawerOpen(false);
//   };

//   // ✅ UPDATE LOGOUT FUNCTION TO CLEAR ALL TOKENS AND UPDATE STATE
//   const onLogout = () => {
//     swal
//       .fire({
//         title: 'Are you sure?',
//         text: 'You will be logged out.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, Logout!',
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           // Clear both types of tokens
//           localStorage.removeItem('userToken');
//           localStorage.removeItem('authToken');
//           localStorage.removeItem('currentUser');
          
//           // Update state immediately
//           setCurrentUser(null);
//           setIsAuthenticated(false);
          
//           // Navigate to login
//           navigate('/login');
//         }
//       });
//   };

//   const styles = {
//     root: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000,
//       background: '#fff',
//       borderBottom: '1px solid #eee',
//     },
//     promoBar: {
//       height: 40,
//       background: '#f6f6f6',
//       color: '#333',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: 14,
//       padding: '0 16px',
//     },
//     headerWrap: {
//       background: isScrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
//       backdropFilter: isScrolled ? 'saturate(180%) blur(10px)' : 'none',
//       transition: 'all 0.25s ease',
//       boxShadow: isScrolled ? '0 4px 14px rgba(0,0,0,0.06)' : 'none',
//     },
//     bar: {
//       height: 72,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       maxWidth: 1280,
//       margin: '0 auto',
//       padding: '0 20px',
//       gap: 16,
//     },
//     logoIcon: {
//       width: 40,
//       height: 40,
//       borderRadius: 10,
//       background: 'linear-gradient(135deg, #ff6a3d, #ff2d55)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: '#fff',
//       fontWeight: 800,
//       fontSize: 18,
//     },
//     logoTextCol: {
//       display: 'flex',
//       flexDirection: 'column',
//       lineHeight: 1.1,
//     },
//     brandTop: {
//       fontSize: 18,
//       fontWeight: 800,
//       letterSpacing: 0.8,
//       color: '#111',
//     },
//     brandBottom: {
//       fontSize: 12,
//       color: '#777',
//       letterSpacing: 2,
//       textTransform: 'uppercase',
//     },
//     center: {
//       flex: 1,
//       minWidth: 320,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     searchWrap: {
//       width: '100%',
//       maxWidth: 680,
//       position: 'relative',
//     },
//     searchForm: {
//       width: '100%',
//       display: 'flex',
//       position: 'relative',
//     },
//     searchInput: {
//       width: '100%',
//       height: 44,
//       borderRadius: 10,
//       border: `1px solid ${searchFocused ? '#a5b4fc' : '#e5e7eb'}`,
//       padding: '0 48px 0 16px',
//       fontSize: 14,
//       background: searchFocused ? '#fff' : '#f4f5f7',
//       color: '#111827',
//       outline: 'none',
//       transition: 'all 0.2s ease',
//       boxShadow: searchFocused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
//     },
//     searchBtn: {
//       position: 'absolute',
//       right: 8,
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: 32,
//       height: 32,
//       borderRadius: 8,
//       border: '1px solid #e5e7eb',
//       background: '#fff',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       color: '#374151',
//     },
//     right: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: 18,
//       minWidth: 360,
//       justifyContent: 'flex-end',
//     },
//     topLink: {
//       color: '#374151',
//       textDecoration: 'none',
//       fontSize: 13,
//       whiteSpace: 'nowrap',
//       transition: 'color 0.2s ease',
//     },
//     iconBtn: {
//       color: '#111827',
//       textDecoration: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: 40,
//       height: 40,
//       borderRadius: 10,
//       background: '#f3f4f6',
//       border: '1px solid #e5e7eb',
//       transition: 'all 0.2s ease',
//       cursor: 'pointer',
//     },
//     authButton: {
//       padding: '0 14px',
//       background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
//       color: '#fff',
//       border: 'none',
//       boxShadow: '0 6px 16px rgba(139,92,246,0.25)',
//       fontWeight: 600,
//       fontSize: 14,
//       height: 40,
//       borderRadius: 10,
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       textDecoration: 'none',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     bottomBar: {
//       height: 52,
//       display: 'flex',
//       alignItems: 'center',
//       borderTop: '1px solid #eee',
//       background: '#fff',
//     },
//     bottomInner: {
//       maxWidth: 1280,
//       margin: '0 auto',
//       padding: '0 20px',
//       width: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       gap: 16,
//     },
//     leftNav: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: 14,
//     },
//     shopByCategories: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: 10,
//       padding: '10px 12px',
//       borderRadius: 10,
//       border: '1px solid #e5e7eb',
//       background: '#fff',
//       fontWeight: 600,
//       color: '#111',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       minWidth: 'auto',
//       whiteSpace: 'nowrap',
//     },
//     navLinks: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: 18,
//       marginLeft: 4,
//     },
//     navLink: {
//       textDecoration: 'none',
//       color: '#222',
//       fontSize: 14,
//       transition: 'all 0.2s ease',
//       fontWeight: 500,
//       padding: '8px 0',
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       minWidth: 'auto',
//       cursor: 'pointer',
//     },
//     deliveryNote: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: 10,
//       color: '#333',
//       fontSize: 14,
//       whiteSpace: 'nowrap',
//     },
//     customMenuItem: {
//       padding: '12px 20px',
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#374151',
//       transition: 'all 0.2s ease',
//       borderRadius: '0',
//       margin: '0 8px',
//       whiteSpace: 'nowrap',
//       minWidth: 'auto',
//       width: 'auto',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//     },
//     spacer: { height: 40 + 72 + 52 },
//   };

//   return (
//     <>
//       <header style={styles.root}>
//         {/* Top Promo Bar */}
//         <div style={styles.promoBar}>
//           Get up to 50% off new season styles, limited time only
//         </div>

//         {/* Main Header */}
//         <div style={styles.headerWrap}>
//           <div style={styles.bar}>
//             {/* Left: Logo */}
//             <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 12 }}>
//               <div style={styles.logoIcon}>CS</div>
//               <div style={styles.logoTextCol}>
//                 <div style={styles.brandTop}>CLASSYSHOP</div>
//                 <div style={styles.brandBottom}>BIG MEGA STORE</div>
//               </div>
//             </a>

//             {/* Center: Search */}
//             <div style={styles.center}>
//               <div style={styles.searchWrap}>
//                 <form onSubmit={handleSearch} style={styles.searchForm}>
//                   <input
//                     type="text"
//                     placeholder="Search for products..."
//                     aria-label="Search products"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onFocus={() => setSearchFocused(true)}
//                     onBlur={() => setSearchFocused(false)}
//                     onKeyPress={handleSearchKeyPress}
//                     style={styles.searchInput}
//                   />
//                   <button
//                     type="submit"
//                     aria-label="Search"
//                     style={styles.searchBtn}
//                     onMouseEnter={(e) => {
//                       e.target.style.background = '#f9fafb';
//                       e.target.style.borderColor = '#d1d5db';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.background = '#fff';
//                       e.target.style.borderColor = '#e5e7eb';
//                     }}
//                   >
//                     <SearchIcon fontSize="small" />
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Right: Links + User + Icons */}
//             <div style={styles.right}>
//               <a 
//                 href="/help" 
//                 style={styles.topLink}
//                 onMouseEnter={(e) => e.target.style.color = '#111'}
//                 onMouseLeave={(e) => e.target.style.color = '#374151'}
//               >
//                 Help Center
//               </a>
//               <a 
//                 href="/orders" 
//                 style={styles.topLink}
//                 onMouseEnter={(e) => e.target.style.color = '#111'}
//                 onMouseLeave={(e) => e.target.style.color = '#374151'}
//               >
//                 Order Tracking
//               </a>

//               {/* Cart Button */}
//               <button 
//                 onClick={handleCartClick}
//                 style={{...styles.iconBtn, border: 'none'}} 
//                 aria-label="Cart"
//                 onMouseEnter={(e) => {
//                   e.target.style.background = '#e5e7eb';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.background = '#f3f4f6';
//                 }}
//               >
//                 <Badge badgeContent={getTotalItems()} color="error">
//                   <ShoppingCartIcon />
//                 </Badge>
//               </button>

//               {/* ✅ UPDATED AUTH BUTTON SECTION WITH PROPER CONDITIONAL RENDERING */}
//               {isAuthenticated && currentUser ? (
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <span style={{ fontSize: 13, color: '#374151' }}>
//                     Hi, {currentUser.name}
//                   </span>
//                   <button onClick={onLogout} style={styles.authButton}>
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <a href="/login" style={styles.authButton}>
//                   Login
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* Bottom Navigation */}
//           <div style={styles.bottomBar}>
//             <div style={styles.bottomInner}>
//               <div style={styles.leftNav}>
//                 <button 
//                   type="button" 
//                   style={styles.shopByCategories} 
//                   onClick={handleCategoryClick}
//                 >
//                   <span style={{ display: 'inline-flex', width: 18, height: 18, alignItems: 'center', justifyContent: 'center' }}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                       <path d="M3 6h18M3 12h18M3 18h18" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                   </span>
//                   <span>SHOP BY CATEGORIES</span>
//                 </button>
                
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleClose}
//                   PaperProps={{
//                     style: {
//                       borderRadius: '12px',
//                       boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
//                       border: '1px solid #e5e7eb',
//                       padding: '8px 0',
//                       minWidth: '200px',
//                     }
//                   }}
//                 >
//                   {categoryIcons.map((category) => (
//                     <MenuItem 
//                       key={category.sectionId}
//                       onClick={() => handleMenuItemClick(category.sectionId)}
//                       style={styles.customMenuItem}
//                       onMouseEnter={(e) => {
//                         e.target.style.backgroundColor = '#f3f4f6';
//                         e.target.style.color = '#111827';
//                         e.target.style.transform = 'translateX(4px)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.backgroundColor = 'transparent';
//                         e.target.style.color = '#374151';
//                         e.target.style.transform = 'translateX(0)';
//                       }}
//                     >
//                       <span style={{ marginRight: '8px' }}>{category.icon}</span>
//                       {category.title}
//                     </MenuItem>
//                   ))}
//                 </Menu>

//                 <nav style={styles.navLinks}>
//                   <a 
//                     href="/" 
//                     style={styles.navLink}
//                     onClick={(e) => {
//                       if (location.pathname !== '/') {
//                         e.preventDefault();
//                         navigate('/');
//                       }
//                     }}
//                   >
//                     Home
//                   </a>
//                   {categoryIcons.filter(cat => cat.clickable).slice(0, 6).map((category) => (
//                     <a 
//                       key={category.sectionId}
//                       href="#" 
//                       style={styles.navLink}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleCategoryNavigation(category.sectionId);
//                       }}
//                       onMouseEnter={(e) => {
//                         e.target.style.color = '#111';
//                         e.target.style.transform = 'translateY(-1px)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.color = '#222';
//                         e.target.style.transform = 'translateY(0)';
//                       }}
//                     >
//                       {category.title}
//                     </a>
//                   ))}
//                 </nav>
//               </div>

//               <div style={styles.deliveryNote}>
//                 <LocalShippingOutlinedIcon fontSize="small" />
//                 <span>Free  Delivery</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Spacer */}
//       <div style={styles.spacer} />

//       {/* Cart Drawer - Keep your existing cart drawer code */}
//       <Drawer
//         anchor="right"
//         open={cartDrawerOpen}
//         onClose={handleCartClose}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: { xs: '100%', sm: 450 },
//             backgroundColor: '#f8fafc',
//           }
//         }}
//       >
//         {/* Your existing cart drawer content remains the same */}
//         <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ 
//             p: 2, 
//             borderBottom: '1px solid #e2e8f0',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             backgroundColor: 'white'
//           }}>
//             <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
//               Shopping Cart ({getTotalItems()})
//             </Typography>
//             <IconButton onClick={handleCartClose} size="small">
//               <Close />
//             </IconButton>
//           </Box>

//           <Box sx={{ flex: 1, overflow: 'auto' }}>
//             {(!cart || cart.length === 0) ? (
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center', 
//                 justifyContent: 'center',
//                 height: '100%',
//                 textAlign: 'center',
//                 p: 4
//               }}>
//                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2d3748' }}>
//                   Your Cart is currently empty
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#718096', mb: 3 }}>
//                   Browse our categories and discover our best deals!
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={handleContinueShopping}
//                   sx={{
//                     backgroundColor: '#ff5757',
//                     borderRadius: 2,
//                     px: 4,
//                     py: 1.5,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     '&:hover': {
//                       backgroundColor: '#ff4757'
//                     }
//                   }}
//                 >
//                   CONTINUE SHOPPING
//                 </Button>
//               </Box>
//             ) : (
//               <Box sx={{ p: 2 }}>
//                 {cart.map((item) => (
//                   <Card key={item.product._id} sx={{ 
//                     mb: 2, 
//                     borderRadius: 2,
//                     border: '1px solid #e2e8f0',
//                     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                   }}>
//                     <CardContent sx={{ p: 2 }}>
//                       <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={3}>
//                           <Box sx={{ position: 'relative' }}>
//                             <img
//                               src={`${host}/uploads/products/${item.product.images[0]}`}
//                               alt={item.product.name}
//                               style={{
//                                 width: '100%',
//                                 height: '60px',
//                                 objectFit: 'cover',
//                                 borderRadius: 4
//                               }}
//                               onError={(e) => {
//                                 e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
//                               }}
//                             />
//                           </Box>
//                         </Grid>
//                         <Grid item xs={9}>
//                           <Box sx={{ 
//                             display: 'flex', 
//                             justifyContent: 'space-between',
//                             alignItems: 'flex-start'
//                           }}>
//                             <Box sx={{ flex: 1, pr: 1 }}>
//                               <Typography variant="subtitle2" sx={{ 
//                                 fontWeight: 600,
//                                 fontSize: '0.875rem',
//                                 lineHeight: 1.2,
//                                 mb: 0.5,
//                                 color: '#2d3748'
//                               }}>
//                                 {item.product.name}
//                               </Typography>
//                               <Typography variant="body2" sx={{ 
//                                 fontWeight: 600,
//                                 color: '#667eea',
//                                 fontSize: '0.875rem'
//                               }}>
//                                 {formatPrice(item.product.price * item.quantity)}
//                               </Typography>
//                             </Box>
//                             <IconButton
//                               size="small"
//                               onClick={() => removeFromCart(item.product._id)}
//                               sx={{ 
//                                 color: '#e53e3e',
//                                 '&:hover': { backgroundColor: 'rgba(229,62,62,0.1)' }
//                               }}
//                             >
//                               <Delete sx={{ fontSize: 16 }} />
//                             </IconButton>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </Box>
//             )}
//           </Box>

//           {cart && cart.length > 0 && (
//             <Box sx={{ 
//               p: 3, 
//               backgroundColor: 'white',
//               borderTop: '1px solid #e2e8f0',
//               boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
//             }}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mb: 3
//               }}>
//                 <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                   Total
//                 </Typography>
//                 <Typography variant="h6" sx={{ 
//                   fontWeight: 700,
//                   color: '#2d3748'
//                 }}>
//                   {formatPrice(calculateTotal())}
//                 </Typography>
//               </Box>

//               <Button
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 startIcon={<ShoppingCartIcon />}
//                 onClick={handleCheckout}
//                 sx={{ 
//                   backgroundColor: '#667eea',
//                   borderRadius: 2,
//                   py: 1.5,
//                   fontSize: '1rem',
//                   fontWeight: 600,
//                   textTransform: 'none',
//                   mb: 2,
//                   '&:hover': {
//                     backgroundColor: '#5a67d8'
//                   }
//                 }}
//               >
//                 Proceed to Checkout
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Header;



import React, { useState, useEffect, useContext, useMemo } from 'react';
import swal from 'sweetalert2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Drawer, Box, Typography, IconButton, Button, Card, CardContent, Grid } from '@mui/material';
import { Delete, Close } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { config } from '../Config/Config';
import { userContext } from '../Context/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const Header = () => {
  const { host } = config || {};
  const { cart, getCart, user, updateCartItem, removeFromCart } = useContext(userContext) || { 
    cart: [], 
    getCart: () => {}, 
    user: null,
    updateCartItem: () => {},
    removeFromCart: () => {}
  };
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const open = Boolean(anchorEl);

  useEffect(() => {
    const checkAuth = () => {
      const userToken = localStorage.getItem('userToken');
      const authToken = localStorage.getItem('authToken');
      const userData = localStorage.getItem('currentUser');
      
      if ((userToken || authToken) && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    if (isAuthenticated && typeof getCart === 'function') {
      getCart();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated, getCart]);

  const cartCount = useMemo(() => (Array.isArray(cart) ? cart.length : 0), [cart]);

  const categoryIcons = [
    { icon: "👗", title: "Fashion", color: "#667eea", sectionId: "fashion-section", clickable: true },
    { icon: "📱", title: "Electronics", color: "#ff6b35", sectionId: "smartphone-section", clickable: true },
    { icon: "👜", title: "Bags", color: "#43e97b", sectionId: "bags-section", clickable: true },
    { icon: "👟", title: "Footwear", color: "#4facfe", sectionId: "footwear-section", clickable: true },
    { icon: "🛒", title: "Groceries", color: "#38a169", sectionId: "grocery-section", clickable: true },
    { icon: "💄", title: "Beauty", color: "#ed64a6", sectionId: "beauty-section", clickable: true },
    { icon: "⌚", title: "Watches", color: "#8b5cf6", sectionId: "watches-section", clickable: true },
    { icon: "🌿", title: "Wellness", color: "#38b2ac", sectionId: "wellness-section", clickable: false },
    { icon: "💍", title: "Jewellery", color: "#9f7aea", sectionId: "jewellery-section", clickable: false }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleCategoryNavigation = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Navigation handlers
  const handleSearchProducts = () => {
    navigate('/products');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  const handleCategoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (sectionId) => {
    handleCategoryNavigation(sectionId);
    handleClose();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setCartDrawerOpen(true);
  };

  const handleCartClose = () => {
    setCartDrawerOpen(false);
  };

  const handleContinueShopping = () => {
    setCartDrawerOpen(false);
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout');
    setCartDrawerOpen(false);
  };

  const onLogout = () => {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will be logged out.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
          
          setCurrentUser(null);
          setIsAuthenticated(false);
          
          navigate('/login');
        }
      });
  };

  const styles = {
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: '#fff',
      borderBottom: '1px solid #eee',
    },
    promoBar: {
      height: 40,
      background: '#f6f6f6',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      padding: '0 16px',
    },
    headerWrap: {
      background: isScrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
      backdropFilter: isScrolled ? 'saturate(180%) blur(10px)' : 'none',
      transition: 'all 0.25s ease',
      boxShadow: isScrolled ? '0 4px 14px rgba(0,0,0,0.06)' : 'none',
    },
    bar: {
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 20px',
      gap: 16,
    },
    logoIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'linear-gradient(135deg, #ff6a3d, #ff2d55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 800,
      fontSize: 18,
    },
    logoTextCol: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.1,
    },
    brandTop: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: 0.8,
      color: '#111',
    },
    brandBottom: {
      fontSize: 12,
      color: '#777',
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    // REMOVED: Center section completely
    right: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      minWidth: 360,
      justifyContent: 'flex-end',
    },
    // Navigation links - all the same style
    navLink: {
      color: '#374151',
      textDecoration: 'none',
      fontSize: 13,
      whiteSpace: 'nowrap',
      transition: 'color 0.2s ease',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
    },
    iconBtn: {
      color: '#111827',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 10,
      background: '#f3f4f6',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    authButton: {
      padding: '0 14px',
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      color: '#fff',
      border: 'none',
      boxShadow: '0 6px 16px rgba(139,92,246,0.25)',
      fontWeight: 600,
      fontSize: 14,
      height: 40,
      borderRadius: 10,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    bottomBar: {
      height: 52,
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid #eee',
      background: '#fff',
    },
    bottomInner: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 20px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    },
    leftNav: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    },
    shopByCategories: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 10,
      border: '1px solid #e5e7eb',
      background: '#fff',
      fontWeight: 600,
      color: '#111',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: 'auto',
      whiteSpace: 'nowrap',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      marginLeft: 4,
    },
    bottomNavLink: {
      textDecoration: 'none',
      color: '#222',
      fontSize: 14,
      transition: 'all 0.2s ease',
      fontWeight: 500,
      padding: '8px 0',
      position: 'relative',
      whiteSpace: 'nowrap',
      minWidth: 'auto',
      cursor: 'pointer',
    },
    deliveryNote: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: '#333',
      fontSize: 14,
      whiteSpace: 'nowrap',
    },
    customMenuItem: {
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      transition: 'all 0.2s ease',
      borderRadius: '0',
      margin: '0 8px',
      whiteSpace: 'nowrap',
      minWidth: 'auto',
      width: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    spacer: { height: 40 + 72 + 52 },
  };

  return (
    <>
      <header style={styles.root}>
        {/* Top Promo Bar */}
        <div style={styles.promoBar}>
          Get up to 50% off new season styles, limited time only
        </div>

        {/* Main Header */}
        <div style={styles.headerWrap}>
          <div style={styles.bar}>
            {/* Left: Logo */}
            <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration:'none', gap: 12 }}>
              <div style={styles.logoIcon}>KS</div>
              <div style={styles.logoTextCol}>
                <div style={styles.brandTop}>KartSpace</div>
                <div style={styles.brandBottom}>BIG MEGA STORE</div>
              </div>
            </a>

            {/* Right: All Navigation Links */}
            <div style={styles.right}>
              {/* Search Products - same style as other links */}
              <button 
                onClick={handleSearchProducts}
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = '#111'}
                onMouseLeave={(e) => e.target.style.color = '#374151'}
              >
                Search Products
              </button>
              
              <button 
                onClick={handleAboutClick}
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = '#111'}
                onMouseLeave={(e) => e.target.style.color = '#374151'}
              >
                About
              </button>
              
              <button 
                onClick={handleHelpClick}
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = '#111'}
                onMouseLeave={(e) => e.target.style.color = '#374151'}
              >
                Help Center
              </button>
              
              <button 
                onClick={handleOrdersClick}
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = '#111'}
                onMouseLeave={(e) => e.target.style.color = '#374151'}
              >
                Order Tracking
              </button>

              {/* Cart Button */}
              <button 
                onClick={handleCartClick}
                style={{...styles.iconBtn, border: 'none'}} 
                aria-label="Cart"
                onMouseEnter={(e) => {
                  e.target.style.background = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                }}
              >
                <Badge badgeContent={getTotalItems()} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </button>

              {/* Auth Button */}
              {isAuthenticated && currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#374151' }}>
                    Hi, {currentUser.name}
                  </span>
                  <button onClick={onLogout} style={styles.authButton}>
                    Logout
                  </button>
                </div>
              ) : (
                <a href="/login" style={styles.authButton}>
                  Login
                </a>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div style={styles.bottomBar}>
            <div style={styles.bottomInner}>
              <div style={styles.leftNav}>
                <button 
                  type="button" 
                  style={styles.shopByCategories} 
                  onClick={handleCategoryClick}
                >
                  <span style={{ display: 'inline-flex', width: 18, height: 18, alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M3 12h18M3 18h18" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>SHOP BY CATEGORIES</span>
                </button>
                
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                      border: '1px solid #e5e7eb',
                      padding: '8px 0',
                      minWidth: '200px',
                    }
                  }}
                >
                  {categoryIcons.map((category) => (
                    <MenuItem 
                      key={category.sectionId}
                      onClick={() => handleMenuItemClick(category.sectionId)}
                      style={styles.customMenuItem}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.color = '#111827';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#374151';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ marginRight: '8px' }}>{category.icon}</span>
                      {category.title}
                    </MenuItem>
                  ))}
                </Menu>

                <nav style={styles.navLinks}>
                  <a 
                    href="/" 
                    style={styles.bottomNavLink}
                    onClick={(e) => {
                      if (location.pathname !== '/') {
                        e.preventDefault();
                        navigate('/');
                      }
                    }}
                  >
                    Home
                  </a>
                  {categoryIcons.filter(cat => cat.clickable).slice(0, 6).map((category) => (
                    <a 
                      key={category.sectionId}
                      href="#" 
                      style={styles.bottomNavLink}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryNavigation(category.sectionId);
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#111';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#222';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      {category.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div style={styles.deliveryNote}>
                <LocalShippingOutlinedIcon fontSize="small" />
                <span>Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div style={styles.spacer} />

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartDrawerOpen}
        onClose={handleCartClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 450 },
            backgroundColor: '#f8fafc',
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
              Shopping Cart ({getTotalItems()})
            </Typography>
            <IconButton onClick={handleCartClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {(!cart || cart.length === 0) ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                p: 4
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2d3748' }}>
                  Your Cart is currently empty
                </Typography>
                <Typography variant="body2" sx={{ color: '#718096', mb: 3 }}>
                  Browse our categories and discover our best deals!
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleContinueShopping}
                  sx={{
                    backgroundColor: '#ff5757',
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#ff4757'
                    }
                  }}
                >
                  CONTINUE SHOPPING
                </Button>
              </Box>
            ) : (
              <Box sx={{ p: 2 }}>
                {cart.map((item) => (
                  <Card key={item.product._id} sx={{ 
                    mb: 2, 
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                          <Box sx={{ position: 'relative' }}>
                            <img
                              src={`${host}/uploads/products/${item.product.images[0]}`}
                              alt={item.product.name}
                              style={{
                                width: '100%',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: 4
                              }}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={9}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                          }}>
                            <Box sx={{ flex: 1, pr: 1 }}>
                              <Typography variant="subtitle2" sx={{ 
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                lineHeight: 1.2,
                                mb: 0.5,
                                color: '#2d3748'
                              }}>
                                {item.product.name}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 600,
                                color: '#667eea',
                                fontSize: '0.875rem'
                              }}>
                                {formatPrice(item.product.price * item.quantity)}
                              </Typography>
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() => removeFromCart(item.product._id)}
                              sx={{ 
                                color: '#e53e3e',
                                '&:hover': { backgroundColor: 'rgba(229,62,62,0.1)' }
                              }}
                            >
                              <Delete sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>

          {cart && cart.length > 0 && (
            <Box sx={{ 
              p: 3, 
              backgroundColor: 'white',
              borderTop: '1px solid #e2e8f0',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700,
                  color: '#2d3748'
                }}>
                  {formatPrice(calculateTotal())}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleCheckout}
                sx={{ 
                  backgroundColor: '#667eea',
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#5a67d8'
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
