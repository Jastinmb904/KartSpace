
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Chip,
//   Button,
//   IconButton,
//   Rating,
//   Alert,
//   Card,
//   CardContent,
//   Skeleton,
//   Divider,
//   Avatar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText
// } from '@mui/material';
// import {
//   ShoppingCart,
//   Add,
//   Remove,
//   ArrowBack,
//   LocalOffer,
//   CheckCircle,
//   Error,
//   Warning,
//   Inventory,
//   CalendarToday,
//   Business,
//   Info,
//   Security,
//   Assignment,
//   LocalShipping,
//   Store,
//   Category,
//   Numbers,
//   DateRange,
//   Memory,
//   Palette,
//   Speed,
//   Build,
//   Phone,
//   Computer,
//   Verified,
//   CreditCard
// } from '@mui/icons-material';
// import { userContext } from '../Context/Context';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { config } from '../Config/Config';
// import Swal from 'sweetalert2';


// const ProductView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { host } = config;
//   const { addToCart } = useContext(userContext);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState(null);
//   // ✅ ADD SIZE SELECTION STATE
//   const [selectedSize, setSelectedSize] = useState('');
//   const [availableSizes, setAvailableSizes] = useState([]);


//   useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${host}/customer/products/${id}`);
//       const data = await response.json();
      
//       if (data.success && data.product) {
//         setProduct(data.product);
//         setError(null);
        
//         console.log('Product data:', data.product);
//         console.log('Product category:', data.product.category);
        
//         // ✅ ONLY EXTRACT SIZES FOR SPECIFIC CATEGORIES
//         const categoriesRequiringSize = [
//           'dress', 'dresses', 'men', 'mens', 'women', 'womens', 
//           'kids', 'children', 'shoes', 'footwear', 'apparel', 
//           'clothing', 'fashion', 'shirts', 'pants', 'jeans'
//         ];
        
//         let shouldShowSizes = false;
//         if (data.product.category && data.product.category.name) {
//           const categoryName = data.product.category.name.toLowerCase();
//           shouldShowSizes = categoriesRequiringSize.some(cat => 
//             categoryName.includes(cat)
//           );
//         }
        
//         console.log('Should show sizes:', shouldShowSizes);
        
//         let sizes = [];
//         if (shouldShowSizes && data.product.specifications) {
//           const specs = data.product.specifications;
          
//           // Extract sizes from specifications
//           if (specs.Size) {
//             const sizeText = specs.Size;
//             console.log('Size text found:', sizeText);
            
//             // Extract numbers from text like "Available in 28, 30, 32, 34, 36, 38"
//             const matches = sizeText.match(/\b\d+\b/g);
//             if (matches) {
//               sizes = matches;
//             }
//             // Also handle letter sizes like S, M, L, XL
//             else if (sizeText.includes('S') || sizeText.includes('M') || sizeText.includes('L')) {
//               const letterMatches = sizeText.match(/\b(XS|S|M|L|XL|XXL|XXXL)\b/g);
//               if (letterMatches) {
//                 sizes = letterMatches;
//               }
//             }
//           }
//           else if (specs.size) {
//             if (specs.size.includes(',')) {
//               sizes = specs.size.split(',').map(s => s.trim()).filter(s => s);
//             } else {
//               const matches = specs.size.match(/\b\d+\b/g) || specs.size.match(/\b(XS|S|M|L|XL|XXL|XXXL)\b/g);
//               if (matches) {
//                 sizes = matches;
//               }
//             }
//           }
//           else if (specs.sizes) {
//             sizes = specs.sizes.split(',').map(s => s.trim()).filter(s => s);
//           }
//         }
        
//         setAvailableSizes(sizes);
//         console.log('✅ Final available sizes:', sizes);
//         console.log('✅ Will show size selection:', sizes.length > 0);
//       } else {
//         setError('Product not found');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       setError('Failed to load product. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (id) {
//     fetchProduct();
//   }
// }, [id, host]);


//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(price);
//   };


//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };


//   const getStockStatus = (stock) => {
//     if (stock === 0) return { color: 'error', text: 'Out of Stock', icon: <Error /> };
//     if (stock <= 5) return { color: 'warning', text: `Only ${stock} left`, icon: <Warning /> };
//     return { color: 'success', text: 'In Stock', icon: <CheckCircle /> };
//   };


//   const getStatusChip = (status) => {
//     const statusColors = {
//       active: 'success',
//       inactive: 'error',
//       pending: 'warning'
//     };
//     return (
//       <Chip 
//         label={status.toUpperCase()} 
//         color={statusColors[status] || 'default'}
//         size="small"
//         variant="filled"
//       />
//     );
//   };


//   const handleQuantityChange = (change) => {
//     const newQuantity = quantity + change;
//     if (newQuantity >= 1 && newQuantity <= product.stock) {
//       setQuantity(newQuantity);
//     }
//   };


//   // ✅ UPDATE HANDLEADDTOCART TO INCLUDE SIZE VALIDATION
//   const handleAddToCart = async () => {
//   console.log('🛒 Starting add to cart process...');
//   console.log('Product ID:', product._id);
//   console.log('Quantity:', quantity);
//   console.log('Selected Size:', selectedSize);
  
//   // Check if user is logged in
//   const token = localStorage.getItem('authToken') || localStorage.getItem('userToken');
//   console.log('Auth token exists:', !!token);
  
//   if (!token) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Please Login First',
//       text: 'You need to be logged in to add items to cart'
//     });
//     return;
//   }
    
//     try {
//       console.log('Adding to cart with size:', { productId: product._id, quantity, selectedSize });
//       await addToCart(product._id, quantity, selectedSize);
//       Swal.fire({
//         icon: 'success',
//         title: 'Added to Cart!',
//         text: `${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''} has been added to your cart.`,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to add item to cart. Please try again.',
//       });
//     }
//   };


//   // Helper function to get icon for specification key
//   const getSpecIcon = (key) => {
//     const keyLower = key.toLowerCase();
//     if (keyLower.includes('brand')) return <Business />;
//     if (keyLower.includes('model')) return <Category />;
//     if (keyLower.includes('color')) return <Palette />;
//     if (keyLower.includes('size') || keyLower.includes('dimension')) return <Numbers />;
//     if (keyLower.includes('weight')) return <Speed />;
//     if (keyLower.includes('memory') || keyLower.includes('storage')) return <Memory />;
//     if (keyLower.includes('processor') || keyLower.includes('cpu')) return <Computer />;
//     if (keyLower.includes('screen') || keyLower.includes('display')) return <Phone />;
//     if (keyLower.includes('material')) return <Build />;
//     return <Info />;
//   };


//   if (loading) {
//     return (
//       <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
//         <Header />
//         <Container maxWidth="xl" sx={{ py: 2, mt: 1, flex: 1 }}>
//           <Skeleton variant="rectangular" width="100%" height={400} />
//         </Container>
//         <Footer />
//       </Box>
//     );
//   }


//   if (error || !product) {
//     return (
//       <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
//         <Header />
//         <Container maxWidth="xl" sx={{ py: 2, mt: 1, flex: 1 }}>
//           <Alert severity="error" sx={{ mb: 4 }}>
//             <Typography variant="h6">Error</Typography>
//             {error || 'Product not found'}
//           </Alert>
//           <Button 
//             variant="contained" 
//             startIcon={<ArrowBack />}
//             onClick={() => navigate('/products')}
//           >
//             Back to Products
//           </Button>
//         </Container>
//         <Footer />
//       </Box>
//     );
//   }


//   const stockStatus = getStockStatus(product.stock);
//   const isOutOfStock = product.stock === 0;
//   const isInactive = product.status !== 'active';


//   return (
//     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
//       <Header />
      
//       <Container maxWidth="xl" sx={{ py: 1, mt: 0, flex: 1 }}>
//         <Box sx={{ mb: 2, mt: 1 }}>
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={() => navigate(-1)}
//             sx={{
//               color: '#64748b',
//               fontSize: '1rem',
//               fontWeight: 500,
//               textTransform: 'none',
//               padding: '8px 16px',
//               borderRadius: '12px',
//               bgcolor: 'white',
//               border: '2px solid #e2e8f0',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 bgcolor: '#f1f5f9',
//                 borderColor: '#cbd5e1',
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
//               }
//             }}
//           >
//             Back to Products
//           </Button>
//         </Box>


//         {/* Main Product Form Container */}
//         <Paper 
//           elevation={0}
//           sx={{ 
//             display: 'flex',
//             flexDirection: { xs: 'column', lg: 'row' },
//             gap: 4,
//             borderRadius: 4,
//             p: 4,
//             bgcolor: 'white',
//             boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
//             border: '1px solid #f1f5f9',
//             mb: 3,
//             position: 'relative',
//             height: '600px',
//             overflow: 'hidden'
//           }}
//         >
//           {/* Status Badge */}
//           <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }}>
//             {getStatusChip(product.status)}
//           </Box>


//           {/* Image Section */}
//           <Box sx={{ 
//             flexShrink: 0, 
//             width: { xs: '100%', lg: '450px' },
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column'
//           }}>
//             <Box
//               sx={{
//                 width: '100%',
//                 height: '400px',
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 bgcolor: '#fafbfc',
//                 border: '1px solid #f1f5f9',
//                 mb: 2
//               }}
//             >
//               <Box
//                 component="img"
//                 src={`${host}/uploads/products/${product.images[selectedImage]}`}
//                 alt={product.name}
//                 sx={{
//                   maxWidth: '100%',
//                   maxHeight: '100%',
//                   objectFit: 'contain',
//                   objectPosition: 'center'
//                 }}
//                 onError={(e) => {
//                   e.target.src = '/placeholder-image.jpg';
//                 }}
//               />
//             </Box>
            
//             <Box
//               sx={{
//                 display: 'flex',
//                 gap: 1,
//                 overflowX: 'auto',
//                 pb: 1,
//                 height: '120px',
//                 scrollbarWidth: 'none',
//                 '&::-webkit-scrollbar': { 
//                   display: 'none'
//                 }
//               }}
//             >
//               {product.images.map((image, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     minWidth: '90px',
//                     width: '90px',
//                     height: '90px',
//                     borderRadius: 2,
//                     overflow: 'hidden',
//                     cursor: 'pointer',
//                     border: selectedImage === index ? '2px solid #ef4444' : '1px solid #e5e7eb',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     bgcolor: '#fafbfc',
//                     '&:hover': { borderColor: '#ef4444' }
//                   }}
//                   onClick={() => setSelectedImage(index)}
//                 >
//                   <Box
//                     component="img"
//                     src={`${host}/uploads/products/${image}`}
//                     alt={`Thumbnail ${index + 1}`}
//                     sx={{
//                       maxWidth: '100%',
//                       maxHeight: '100%',
//                       objectFit: 'contain'
//                     }}
//                     onError={(e) => {
//                       e.target.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Box>
//           </Box>


//           {/* Content Section - NO SCROLLBAR */}
//           <Box sx={{ 
//             flex: 1,
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column'
//           }}>
//             <Box 
//               sx={{ 
//                 flex: 1,
//                 overflowY: 'auto',
//                 scrollbarWidth: 'none',
//                 '&::-webkit-scrollbar': { 
//                   display: 'none'
//                 }
//               }}
//             >
//               <Typography 
//                 variant="h4" 
//                 sx={{ 
//                   fontWeight: 800, 
//                   color: '#1e293b', 
//                   mb: 2,
//                   lineHeight: 1.2
//                 }}
//               >
//                 {product.name}
//               </Typography>


//               <Rating value={4.7} readOnly precision={0.1} size="medium" sx={{ mb: 2 }} />


//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
//                 <Typography 
//                   variant="h4" 
//                   sx={{ 
//                     fontWeight: 800, 
//                     color: '#ef4444',
//                     fontSize: '2rem'
//                   }}
//                 >
//                   {formatPrice(product.price)}
//                 </Typography>
//                 <Chip 
//                   icon={<LocalOffer />} 
//                   label="Best Price" 
//                   color="secondary" 
//                   variant="filled"
//                   sx={{ fontWeight: 600 }}
//                 />
//               </Box>


//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   lineHeight: 1.8, 
//                   mb: 3, 
//                   color: '#475569',
//                   fontSize: '1rem'
//                 }}
//               >
//                 {product.description}
//               </Typography>


//               <Alert 
//                 severity={stockStatus.color} 
//                 icon={stockStatus.icon}
//                 sx={{ mb: 3, borderRadius: 2 }}
//               >
//                 <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                   {stockStatus.text}
//                 </Typography>
//               </Alert>


//               {/* ✅ SIZE SELECTION SECTION - NEW */}
//               {availableSizes.length > 0 && !isOutOfStock && !isInactive && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1e293b' }}>
//                     Select Size:
//                   </Typography>
//                   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
//                     {availableSizes.map((size) => (
//                       <Button
//                         key={size}
//                         variant={selectedSize === size ? "contained" : "outlined"}
//                         onClick={() => setSelectedSize(size)}
//                         sx={{
//                           minWidth: '50px',
//                           height: '45px',
//                           borderRadius: 2,
//                           fontWeight: 600,
//                           fontSize: '0.9rem',
//                           backgroundColor: selectedSize === size ? '#1e293b' : 'transparent',
//                           borderColor: selectedSize === size ? '#1e293b' : '#e2e8f0',
//                           color: selectedSize === size ? 'white' : '#64748b',
//                           '&:hover': {
//                             backgroundColor: selectedSize === size ? '#334155' : '#f1f5f9',
//                             borderColor: '#1e293b',
//                           },
//                         }}
//                       >
//                         {size}
//                       </Button>
//                     ))}
//                   </Box>
//                   {!selectedSize && (
//                     <Typography variant="caption" sx={{ color: '#ef4444', mt: 1, display: 'block', fontWeight: 500 }}>
//                       * Please select a size to continue
//                     </Typography>
//                   )}
//                 </Box>
//               )}


//               {!isOutOfStock && !isInactive && (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
//                   <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                     Quantity:
//                   </Typography>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     border: '2px solid #e5e7eb', 
//                     borderRadius: 2,
//                     bgcolor: 'white'
//                   }}>
//                     <IconButton 
//                       onClick={() => handleQuantityChange(-1)}
//                       disabled={quantity <= 1}
//                     >
//                       <Remove />
//                     </IconButton>
//                     <Typography sx={{ px: 3, minWidth: 60, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>
//                       {quantity}
//                     </Typography>
//                     <IconButton 
//                       onClick={() => handleQuantityChange(1)}
//                       disabled={quantity >= product.stock}
//                     >
//                       <Add />
//                     </IconButton>
//                   </Box>
//                   <Typography variant="body2" color="text.secondary">
//                     Max: {product.stock}
//                   </Typography>
//                 </Box>
//               )}


//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 startIcon={<ShoppingCart />}
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || isInactive || (availableSizes.length > 0 && !selectedSize)}
//                 sx={{ 
//                   py: 2,
//                   fontSize: '1.1rem',
//                   fontWeight: 700,
//                   borderRadius: 2,
//                   boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
//                   mb: 3,
//                   opacity: (availableSizes.length > 0 && !selectedSize) ? 0.6 : 1,
//                 }}
//               >
//                 {isOutOfStock ? 'Out of Stock' : 'ADD TO CART'}
//               </Button>


//               {/* 4 Feature Points */}
//               <Grid container spacing={2} sx={{ mb: 2 }}>
//                 <Grid item xs={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, bgcolor: '#f8f9ff', borderRadius: 2 }}>
//                     <LocalShipping color="primary" sx={{ fontSize: 20 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Free Delivery</Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, bgcolor: '#f0f9ff', borderRadius: 2 }}>
//                     <Security color="primary" sx={{ fontSize: 20 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Warranty</Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, bgcolor: '#f0fdf4', borderRadius: 2 }}>
//                     <Verified color="primary" sx={{ fontSize: 20 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Authentic</Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, bgcolor: '#fefce8', borderRadius: 2 }}>
//                     <CreditCard color="primary" sx={{ fontSize: 20 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Easy Returns</Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Paper>


//         {/* Product Information & Detailed Specifications */}
//         <Grid container spacing={4}>
//           {/* Product Information Cards */}
//           <Grid item xs={12} md={6}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '500px' }}>
//               <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
//                 Product Information
//               </Typography>


//               {/* Brand Card */}
//               <Card 
//                 elevation={0} 
//                 sx={{ 
//                   flex: 1,
//                   borderRadius: 3, 
//                   border: '2px solid #e1f5fe',
//                   background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 8px 25px rgba(33, 150, 243, 0.15)'
//                   }
//                 }}
//               >
//                 <CardContent sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Avatar sx={{ bgcolor: '#2196f3', width: 48, height: 48 }}>
//                       <Business sx={{ fontSize: 24 }} />
//                     </Avatar>
//                     <Box>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                         Brand
//                       </Typography>
//                       <Typography variant="h5" sx={{ fontWeight: 700, color: '#1565c0' }}>
//                         {product.specifications?.brand || 'N/A'}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>


//               {/* Stock Card */}
//               <Card 
//                 elevation={0} 
//                 sx={{ 
//                   flex: 1,
//                   borderRadius: 3, 
//                   border: '2px solid #e8f5e8',
//                   background: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)'
//                   }
//                 }}
//               >
//                 <CardContent sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Avatar sx={{ bgcolor: '#4caf50', width: 48, height: 48 }}>
//                       <Inventory sx={{ fontSize: 24 }} />
//                     </Avatar>
//                     <Box>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                         Stock Available
//                       </Typography>
//                       <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32' }}>
//                         {product.stock} units
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>


//               {/* Date Added Card */}
//               <Card 
//                 elevation={0} 
//                 sx={{ 
//                   flex: 1,
//                   borderRadius: 3, 
//                   border: '2px solid #fff3e0',
//                   background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 8px 25px rgba(255, 152, 0, 0.15)'
//                   }
//                 }}
//               >
//                 <CardContent sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Avatar sx={{ bgcolor: '#ff9800', width: 48, height: 48 }}>
//                       <DateRange sx={{ fontSize: 24 }} />
//                     </Avatar>
//                     <Box>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                         Date Added
//                       </Typography>
//                       <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef6c00' }}>
//                         {formatDate(product.createdAt)}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           </Grid>


//           {/* Detailed Specifications with Single Heading and Two Columns */}
//           <Grid item xs={12} md={6}>
//             <Paper 
//               elevation={0}
//               sx={{ 
//                 borderRadius: 4,
//                 bgcolor: 'white',
//                 boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
//                 border: '1px solid #f1f5f9',
//                 overflow: 'hidden',
//                 height: '500px',
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}
//             >
//               {/* Single Header for Both Columns */}
//               <Box sx={{ 
//                 p: 3, 
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 textAlign: 'center'
//               }}>
//                 <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
//                   <Assignment sx={{ fontSize: 24 }} />
//                   Detailed Specifications
//                 </Typography>
//               </Box>


//               {/* Two Columns Layout */}
//               <Box sx={{ 
//                 flex: 1, 
//                 display: 'flex',
//                 height: '100%'
//               }}>
//                 {/* Left Column - Specifications */}
//                 <Box sx={{ 
//                   flex: 1, 
//                   borderRight: '1px solid #f1f5f9',
//                   display: 'flex',
//                   flexDirection: 'column'
//                 }}>
//                   {/* Sub-header for Specifications */}
//                   <Box sx={{ 
//                     p: 2, 
//                     bgcolor: '#667eea',
//                     color: 'white',
//                     textAlign: 'center'
//                   }}>
//                     <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
//                       📋 Specifications
//                     </Typography>
//                   </Box>
                  
//                   <Box sx={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
//                     <List sx={{ p: 0 }}>
//                       {product.specifications && Object.entries(product.specifications).slice(0, Math.ceil(Object.entries(product.specifications).length / 2)).map(([key, value], index) => (
//                         <React.Fragment key={key}>
//                           <ListItem 
//                             sx={{ 
//                               py: 1.5, 
//                               px: 2,
//                               bgcolor: index % 2 === 0 ? '#fafbfc' : 'white',
//                               '&:hover': { 
//                                 bgcolor: '#f1f5f9',
//                                 transform: 'translateX(2px)',
//                                 transition: 'all 0.2s ease'
//                               }
//                             }}
//                           >
//                             <ListItemIcon sx={{ minWidth: 32 }}>
//                               <Avatar 
//                                 sx={{ 
//                                   width: 24, 
//                                   height: 24, 
//                                   bgcolor: '#667eea',
//                                   color: 'white'
//                                 }}
//                               >
//                                 {React.cloneElement(getSpecIcon(key), { sx: { fontSize: 14 } })}
//                               </Avatar>
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={
//                                 <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', textTransform: 'capitalize', fontSize: '0.8rem' }}>
//                                   {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                                 </Typography>
//                               }
//                               secondary={
//                                 <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
//                                   {value || 'N/A'}
//                                 </Typography>
//                               }
//                             />
//                           </ListItem>
//                           {index < Math.ceil(Object.entries(product.specifications).length / 2) - 1 && (
//                             <Divider sx={{ 
//                               mx: 2, 
//                               borderColor: '#ffcc80',
//                               opacity: 0.7
//                             }} />
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </List>
//                   </Box>
//                 </Box>


//                 {/* Right Column - Details */}
//                 <Box sx={{ 
//                   flex: 1,
//                   display: 'flex',
//                   flexDirection: 'column'
//                 }}>
//                   {/* Sub-header for Details */}
//                   <Box sx={{ 
//                     p: 2, 
//                     bgcolor: '#ff6b6b',
//                     color: 'white',
//                     textAlign: 'center'
//                   }}>
//                     <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
//                       ℹ️ Details
//                     </Typography>
//                   </Box>


//                   <Box sx={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
//                     <List sx={{ p: 0 }}>
//                       {product.specifications && Object.entries(product.specifications).slice(Math.ceil(Object.entries(product.specifications).length / 2)).map(([key, value], index) => (
//                         <React.Fragment key={key}>
//                           <ListItem 
//                             sx={{ 
//                               py: 1.5, 
//                               px: 2,
//                               bgcolor: index % 2 === 0 ? '#fafbfc' : 'white',
//                               '&:hover': { 
//                                 bgcolor: '#f1f5f9',
//                                 transform: 'translateX(2px)',
//                                 transition: 'all 0.2s ease'
//                               }
//                             }}
//                           >
//                             <ListItemIcon sx={{ minWidth: 32 }}>
//                               <Avatar 
//                                 sx={{ 
//                                   width: 24, 
//                                   height: 24, 
//                                   bgcolor: '#ff6b6b',
//                                   color: 'white'
//                                 }}
//                               >
//                                 {React.cloneElement(getSpecIcon(key), { sx: { fontSize: 14 } })}
//                               </Avatar>
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={
//                                 <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', textTransform: 'capitalize', fontSize: '0.8rem' }}>
//                                   {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                                 </Typography>
//                               }
//                               secondary={
//                                 <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
//                                   {value || 'N/A'}
//                                 </Typography>
//                               }
//                             />
//                           </ListItem>
//                           {index < Object.entries(product.specifications).slice(Math.ceil(Object.entries(product.specifications).length / 2)).length - 1 && (
//                             <Divider sx={{ 
//                               mx: 2, 
//                               borderColor: '#ffcc80',
//                               opacity: 0.7
//                             }} />
//                           )}
//                         </React.Fragment>
//                       ))}
                      
//                       {/* Vendor and Last Updated in the second column */}
//                       <Divider sx={{ 
//                         mx: 2, 
//                         borderColor: '#ffcc80',
//                         opacity: 0.7
//                       }} />
//                       <ListItem sx={{ py: 1.5, px: 2, bgcolor: '#fafbfc' }}>
//                         <ListItemIcon sx={{ minWidth: 32 }}>
//                           <Avatar sx={{ width: 24, height: 24, bgcolor: '#9c27b0', color: 'white' }}>
//                             <Store sx={{ fontSize: 14 }} />
//                           </Avatar>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={
//                             <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: '0.8rem' }}>
//                               Vendor
//                             </Typography>
//                           }
//                           secondary={
//                             <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
//                               {product.vendor?.name || 'N/A'}
//                             </Typography>
//                           }
//                         />
//                       </ListItem>


//                       <Divider sx={{ 
//                         mx: 2, 
//                         borderColor: '#ffcc80',
//                         opacity: 0.7
//                       }} />
//                       <ListItem sx={{ py: 1.5, px: 2, bgcolor: 'white' }}>
//                         <ListItemIcon sx={{ minWidth: 32 }}>
//                           <Avatar sx={{ width: 24, height: 24, bgcolor: '#ff5722', color: 'white' }}>
//                             <CalendarToday sx={{ fontSize: 14 }} />
//                           </Avatar>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={
//                             <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: '0.8rem' }}>
//                               Last Updated
//                             </Typography>
//                           }
//                           secondary={
//                             <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
//                               {formatDate(product.updatedAt)}
//                             </Typography>
//                           }
//                         />
//                       </ListItem>
//                     </List>
//                   </Box>
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>


//       <Footer />
//     </Box>
//   );
// };


// export default ProductView;




import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  Button,
  IconButton,
  Rating,
  Alert,
  Card,
  CardContent,
  Skeleton,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ShoppingCart,
  Add,
  Remove,
  ArrowBack,
  LocalOffer,
  CheckCircle,
  Error,
  Warning,
  Inventory,
  CalendarToday,
  Business,
  Info,
  Security,
  Assignment,
  LocalShipping,
  Store,
  Category,
  Numbers,
  DateRange,
  Memory,
  Palette,
  Speed,
  Build,
  Phone,
  Computer,
  Verified,
  CreditCard
} from '@mui/icons-material';
import { userContext } from '../Context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { config } from '../Config/Config';
import Swal from 'sweetalert2';



const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { host } = config;
  const { addToCart } = useContext(userContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  // ✅ ADD SIZE SELECTION STATE
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);



  useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/customer/products/${id}`);
      const data = await response.json();
      
      if (data.success && data.product) {
        setProduct(data.product);
        setError(null);
        
        console.log('Product data:', data.product);
        console.log('Product category:', data.product.category);
        
        // ✅ ONLY EXTRACT SIZES FOR SPECIFIC CATEGORIES
        const categoriesRequiringSize = [
          'dress', 'dresses', 'men', 'mens', 'women', 'womens', 
          'kids', 'children', 'shoes', 'footwear', 'apparel', 
          'clothing', 'fashion', 'shirts', 'pants', 'jeans'
        ];
        
        let shouldShowSizes = false;
        if (data.product.category && data.product.category.name) {
          const categoryName = data.product.category.name.toLowerCase();
          shouldShowSizes = categoriesRequiringSize.some(cat => 
            categoryName.includes(cat)
          );
        }
        
        console.log('Should show sizes:', shouldShowSizes);
        
        let sizes = [];
        if (shouldShowSizes && data.product.specifications) {
          const specs = data.product.specifications;
          
          // Extract sizes from specifications
          if (specs.Size) {
            const sizeText = specs.Size;
            console.log('Size text found:', sizeText);
            
            // Extract numbers from text like "Available in 28, 30, 32, 34, 36, 38"
            const matches = sizeText.match(/\b\d+\b/g);
            if (matches) {
              sizes = matches;
            }
            // Also handle letter sizes like S, M, L, XL
            else if (sizeText.includes('S') || sizeText.includes('M') || sizeText.includes('L')) {
              const letterMatches = sizeText.match(/\b(XS|S|M|L|XL|XXL|XXXL)\b/g);
              if (letterMatches) {
                sizes = letterMatches;
              }
            }
          }
          else if (specs.size) {
            if (specs.size.includes(',')) {
              sizes = specs.size.split(',').map(s => s.trim()).filter(s => s);
            } else {
              const matches = specs.size.match(/\b\d+\b/g) || specs.size.match(/\b(XS|S|M|L|XL|XXL|XXXL)\b/g);
              if (matches) {
                sizes = matches;
              }
            }
          }
          else if (specs.sizes) {
            sizes = specs.sizes.split(',').map(s => s.trim()).filter(s => s);
          }
        }
        
        setAvailableSizes(sizes);
        console.log('✅ Final available sizes:', sizes);
        console.log('✅ Will show size selection:', sizes.length > 0);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  if (id) {
    fetchProduct();
  }
}, [id, host]);



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'error', text: 'Out of Stock', icon: <Error /> };
    if (stock <= 5) return { color: 'warning', text: `Only ${stock} left`, icon: <Warning /> };
    return { color: 'success', text: 'In Stock', icon: <CheckCircle /> };
  };



  const getStatusChip = (status) => {
    const statusColors = {
      active: 'success',
      inactive: 'error',
      pending: 'warning'
    };
    return (
      <Chip 
        label={status.toUpperCase()} 
        color={statusColors[status] || 'default'}
        size="small"
        variant="filled"
      />
    );
  };



  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };



  // ✅ UPDATE HANDLEADDTOCART TO INCLUDE SIZE VALIDATION
  const handleAddToCart = async () => {
  console.log('🛒 Starting add to cart process...');
  console.log('Product ID:', product._id);
  console.log('Quantity:', quantity);
  console.log('Selected Size:', selectedSize);
  
  // Check if user is logged in
  const token = localStorage.getItem('authToken') || localStorage.getItem('userToken');
  console.log('Auth token exists:', !!token);
  
  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Please Login First',
      text: 'You need to be logged in to add items to cart'
    });
    return;
  }
    
    try {
      console.log('Adding to cart with size:', { productId: product._id, quantity, selectedSize });
      await addToCart(product._id, quantity, selectedSize);
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: `${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''} has been added to your cart.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add item to cart. Please try again.',
      });
    }
  };



  // Helper function to get icon for specification key
  const getSpecIcon = (key) => {
    const keyLower = key.toLowerCase();
    if (keyLower.includes('brand')) return <Business />;
    if (keyLower.includes('model')) return <Category />;
    if (keyLower.includes('color')) return <Palette />;
    if (keyLower.includes('size') || keyLower.includes('dimension')) return <Numbers />;
    if (keyLower.includes('weight')) return <Speed />;
    if (keyLower.includes('memory') || keyLower.includes('storage')) return <Memory />;
    if (keyLower.includes('processor') || keyLower.includes('cpu')) return <Computer />;
    if (keyLower.includes('screen') || keyLower.includes('display')) return <Phone />;
    if (keyLower.includes('material')) return <Build />;
    return <Info />;
  };

  // ✅ HELPER FUNCTION TO TRUNCATE TEXT
  const truncateText = (text, maxWords = 15) => {
    if (!text) return 'N/A';
    const words = text.toString().split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };



  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
        <Header />
        <Container maxWidth="xl" sx={{ py: 2, mt: 1, flex: 1 }}>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Container>
        <Footer />
      </Box>
    );
  }



  if (error || !product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
        <Header />
        <Container maxWidth="xl" sx={{ py: 2, mt: 1, flex: 1 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            <Typography variant="h6">Error</Typography>
            {error || 'Product not found'}
          </Alert>
          <Button 
            variant="contained" 
            startIcon={<ArrowBack />}
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }



  const stockStatus = getStockStatus(product.stock);
  const isOutOfStock = product.stock === 0;
  const isInactive = product.status !== 'active';



  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ py: 1, mt: 0, flex: 1 }}>
        <Box sx={{ mb: 2, mt: 1 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              color: '#64748b',
              fontSize: '1rem',
              fontWeight: 500,
              textTransform: 'none',
              padding: '8px 16px',
              borderRadius: '12px',
              bgcolor: 'white',
              border: '2px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#f1f5f9',
                borderColor: '#cbd5e1',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }
            }}
          >
            Back to Products
          </Button>
        </Box>



        {/* Main Product Form Container - Responsive */}
        <Paper 
          elevation={0}
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 2, md: 4 },
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            bgcolor: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9',
            mb: 3,
            position: 'relative',
            minHeight: { xs: 'auto', lg: '600px' },
            overflow: 'hidden'
          }}
        >
          {/* Status Badge */}
          <Box sx={{ position: 'absolute', top: { xs: 10, md: 20 }, right: { xs: 10, md: 20 }, zIndex: 1 }}>
            {getStatusChip(product.status)}
          </Box>



          {/* Image Section - Responsive */}
          <Box sx={{ 
            flexShrink: 0, 
            width: { xs: '100%', lg: '450px' },
            height: { xs: 'auto', lg: '100%' },
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box
              sx={{
                width: '100%',
                height: { xs: '300px', md: '400px' },
                borderRadius: 3,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#fafbfc',
                border: '1px solid #f1f5f9',
                mb: 2
              }}
            >
              <Box
                component="img"
                src={`${host}/uploads/products/${product.images[selectedImage]}`}
                alt={product.name}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                pb: 1,
                height: { xs: '80px', md: '120px' },
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { 
                  display: 'none'
                }
              }}
            >
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: { xs: '60px', md: '90px' },
                    width: { xs: '60px', md: '90px' },
                    height: { xs: '60px', md: '90px' },
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid #ef4444' : '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fafbfc',
                    '&:hover': { borderColor: '#ef4444' }
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <Box
                    component="img"
                    src={`${host}/uploads/products/${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>



          {/* Content Section - Responsive */}
          <Box sx={{ 
            flex: 1,
            height: { xs: 'auto', lg: '100%' },
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box 
              sx={{ 
                flex: 1,
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { 
                  display: 'none'
                }
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  color: '#1e293b', 
                  mb: 2,
                  lineHeight: 1.2,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {product.name}
              </Typography>



              <Rating value={4.7} readOnly precision={0.1} size="medium" sx={{ mb: 2 }} />



              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#ef4444',
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  {formatPrice(product.price)}
                </Typography>
                <Chip 
                  icon={<LocalOffer />} 
                  label="Best Price" 
                  color="secondary" 
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </Box>



              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.8, 
                  mb: 3, 
                  color: '#475569',
                  fontSize: { xs: '0.9rem', md: '1rem' }
                }}
              >
                {product.description}
              </Typography>



              <Alert 
                severity={stockStatus.color} 
                icon={stockStatus.icon}
                sx={{ mb: 3, borderRadius: 2 }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {stockStatus.text}
                </Typography>
              </Alert>



              {/* ✅ SIZE SELECTION SECTION - Responsive */}
              {availableSizes.length > 0 && !isOutOfStock && !isInactive && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1e293b' }}>
                    Select Size:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                    {availableSizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "contained" : "outlined"}
                        onClick={() => setSelectedSize(size)}
                        sx={{
                          minWidth: { xs: '40px', md: '50px' },
                          height: { xs: '35px', md: '45px' },
                          borderRadius: 2,
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', md: '0.9rem' },
                          backgroundColor: selectedSize === size ? '#1e293b' : 'transparent',
                          borderColor: selectedSize === size ? '#1e293b' : '#e2e8f0',
                          color: selectedSize === size ? 'white' : '#64748b',
                          '&:hover': {
                            backgroundColor: selectedSize === size ? '#334155' : '#f1f5f9',
                            borderColor: '#1e293b',
                          },
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                  {!selectedSize && (
                    <Typography variant="caption" sx={{ color: '#ef4444', mt: 1, display: 'block', fontWeight: 500 }}>
                      * Please select a size to continue
                    </Typography>
                  )}
                </Box>
              )}



              {!isOutOfStock && !isInactive && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, mb: 3, flexWrap: 'wrap' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    Quantity:
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: 2,
                    bgcolor: 'white'
                  }}>
                    <IconButton 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      size="small"
                    >
                      <Remove />
                    </IconButton>
                    <Typography sx={{ px: { xs: 2, md: 3 }, minWidth: { xs: 40, md: 60 }, textAlign: 'center', fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 600 }}>
                      {quantity}
                    </Typography>
                    <IconButton 
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      size="small"
                    >
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Max: {product.stock}
                  </Typography>
                </Box>
              )}



              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isInactive || (availableSizes.length > 0 && !selectedSize)}
                sx={{ 
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
                  mb: 3,
                  opacity: (availableSizes.length > 0 && !selectedSize) ? 0.6 : 1,
                }}
              >
                {isOutOfStock ? 'Out of Stock' : 'ADD TO CART'}
              </Button>



              {/* 4 Feature Points - Responsive */}
              <Grid container spacing={{ xs: 1, md: 2 }} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: { xs: 1, md: 1.5 }, bgcolor: '#f8f9ff', borderRadius: 2 }}>
                    <LocalShipping color="primary" sx={{ fontSize: { xs: 16, md: 20 } }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', md: '0.8rem' } }}>Free Delivery</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: { xs: 1, md: 1.5 }, bgcolor: '#f0f9ff', borderRadius: 2 }}>
                    <Security color="primary" sx={{ fontSize: { xs: 16, md: 20 } }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', md: '0.8rem' } }}>Warranty</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: { xs: 1, md: 1.5 }, bgcolor: '#f0fdf4', borderRadius: 2 }}>
                    <Verified color="primary" sx={{ fontSize: { xs: 16, md: 20 } }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', md: '0.8rem' } }}>Authentic</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: { xs: 1, md: 1.5 }, bgcolor: '#fefce8', borderRadius: 2 }}>
                    <CreditCard color="primary" sx={{ fontSize: { xs: 16, md: 20 } }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', md: '0.8rem' } }}>Easy Returns</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>



        {/* Product Information & Detailed Specifications - Responsive */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Product Information Cards - Responsive */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'row', lg: 'column' }, gap: 2, overflowX: { xs: 'auto', lg: 'visible' } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 1, display: { xs: 'none', lg: 'block' } }}>
                Product Information
              </Typography>

              {/* Mobile Title */}
              <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Product Information
                </Typography>
              </Box>

              {/* Cards Container */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'row', lg: 'column' }, gap: 2, minWidth: { xs: 'max-content', lg: 'auto' } }}>
                {/* Brand Card - Responsive */}
                <Card 
                  elevation={0} 
                  sx={{ 
                    minWidth: { xs: '200px', lg: 'auto' },
                    borderRadius: 3, 
                    border: '2px solid #e1f5fe',
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(33, 150, 243, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#2196f3', width: { xs: 35, md: 40 }, height: { xs: 35, md: 40 } }}>
                        <Business sx={{ fontSize: { xs: 18, md: 20 } }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                          Brand
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1565c0', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                          {product.specifications?.brand || 'N/A'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>



                {/* Stock Card - Responsive */}
                <Card 
                  elevation={0} 
                  sx={{ 
                    minWidth: { xs: '200px', lg: 'auto' },
                    borderRadius: 3, 
                    border: '2px solid #e8f5e8',
                    background: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#4caf50', width: { xs: 35, md: 40 }, height: { xs: 35, md: 40 } }}>
                        <Inventory sx={{ fontSize: { xs: 18, md: 20 } }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                          Stock Available
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                          {product.stock} units
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>



                {/* Date Added Card - Responsive */}
                <Card 
                  elevation={0} 
                  sx={{ 
                    minWidth: { xs: '200px', lg: 'auto' },
                    borderRadius: 3, 
                    border: '2px solid #fff3e0',
                    background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(255, 152, 0, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#ff9800', width: { xs: 35, md: 40 }, height: { xs: 35, md: 40 } }}>
                        <DateRange sx={{ fontSize: { xs: 18, md: 20 } }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                          Date Added
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#ef6c00', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                          {formatDate(product.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Grid>



          {/* Detailed Specifications - Equal Columns & Responsive */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 4,
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #f1f5f9',
                overflow: 'visible'
              }}
            >
              {/* Header */}
              <Box sx={{ 
                p: { xs: 2, md: 3 }, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                  <Assignment sx={{ fontSize: { xs: 20, md: 24 } }} />
                  Detailed Specifications
                </Typography>
              </Box>



              {/* ✅ EQUAL 2 COLUMNS LAYOUT - RESPONSIVE */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                minHeight: { xs: 'auto', md: 200 }
              }}>
                {/* Left Column */}
                <Box sx={{ 
                  flex: 1, 
                  borderRight: { xs: 'none', md: '1px solid #f1f5f9' },
                  borderBottom: { xs: '1px solid #f1f5f9', md: 'none' }
                }}>
                  <List sx={{ p: 0 }}>
                    {product.specifications && Object.entries(product.specifications).slice(0, Math.ceil(Object.entries(product.specifications).length / 2)).map(([key, value], index) => (
                      <React.Fragment key={key}>
                        <ListItem 
                          sx={{ 
                            py: { xs: 1, md: 1.5 }, 
                            px: { xs: 2, md: 3 },
                            bgcolor: index % 2 === 0 ? '#fafbfc' : 'white',
                            '&:hover': { 
                              bgcolor: '#f1f5f9',
                              transform: 'translateX(2px)',
                              transition: 'all 0.2s ease'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: { xs: 35, md: 40 } }}>
                            <Avatar 
                              sx={{ 
                                width: { xs: 24, md: 28 }, 
                                height: { xs: 24, md: 28 }, 
                                bgcolor: '#667eea',
                                color: 'white'
                              }}
                            >
                              {React.cloneElement(getSpecIcon(key), { sx: { fontSize: { xs: 12, md: 14 } } })}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ 
                                fontWeight: 600, 
                                color: '#374151', 
                                textTransform: 'capitalize', 
                                fontSize: { xs: '0.75rem', md: '0.85rem' },
                                wordBreak: 'break-word'
                              }}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ 
                                color: '#6b7280', 
                                fontWeight: 500, 
                                fontSize: { xs: '0.65rem', md: '0.75rem' },
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                hyphens: 'auto'
                              }}>
                                {truncateText(value, 15)}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < Math.ceil(Object.entries(product.specifications).length / 2) - 1 && (
                          <Divider sx={{ 
                            mx: 2, 
                            borderColor: '#e5e7eb',
                            opacity: 0.8
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>



                {/* Right Column */}
                <Box sx={{ flex: 1 }}>
                  <List sx={{ p: 0 }}>
                    {product.specifications && Object.entries(product.specifications).slice(Math.ceil(Object.entries(product.specifications).length / 2)).map(([key, value], index) => (
                      <React.Fragment key={key}>
                        <ListItem 
                          sx={{ 
                            py: { xs: 1, md: 1.5 }, 
                            px: { xs: 2, md: 3 },
                            bgcolor: index % 2 === 0 ? '#fafbfc' : 'white',
                            '&:hover': { 
                              bgcolor: '#f1f5f9',
                              transform: 'translateX(2px)',
                              transition: 'all 0.2s ease'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: { xs: 35, md: 40 } }}>
                            <Avatar 
                              sx={{ 
                                width: { xs: 24, md: 28 }, 
                                height: { xs: 24, md: 28 }, 
                                bgcolor: '#667eea',
                                color: 'white'
                              }}
                            >
                              {React.cloneElement(getSpecIcon(key), { sx: { fontSize: { xs: 12, md: 14 } } })}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ 
                                fontWeight: 600, 
                                color: '#374151', 
                                textTransform: 'capitalize', 
                                fontSize: { xs: '0.75rem', md: '0.85rem' },
                                wordBreak: 'break-word'
                              }}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ 
                                color: '#6b7280', 
                                fontWeight: 500, 
                                fontSize: { xs: '0.65rem', md: '0.75rem' },
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                hyphens: 'auto'
                              }}>
                                {truncateText(value, 15)}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < Object.entries(product.specifications).slice(Math.ceil(Object.entries(product.specifications).length / 2)).length - 1 && (
                          <Divider sx={{ 
                            mx: 2, 
                            borderColor: '#e5e7eb',
                            opacity: 0.8
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                    
                    {/* Add Vendor to the right column - REMOVED LAST UPDATED */}
                    <Divider sx={{ 
                      mx: 2, 
                      borderColor: '#e5e7eb',
                      opacity: 0.8
                    }} />
                    <ListItem sx={{ py: { xs: 1, md: 1.5 }, px: { xs: 2, md: 3 }, bgcolor: '#fafbfc' }}>
                      <ListItemIcon sx={{ minWidth: { xs: 35, md: 40 } }}>
                        <Avatar sx={{ width: { xs: 24, md: 28 }, height: { xs: 24, md: 28 }, bgcolor: '#9c27b0', color: 'white' }}>
                          <Store sx={{ fontSize: { xs: 12, md: 14 } }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ 
                            fontWeight: 600, 
                            color: '#374151', 
                            fontSize: { xs: '0.75rem', md: '0.85rem' },
                            wordBreak: 'break-word'
                          }}>
                            Vendor
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ 
                            color: '#6b7280', 
                            fontWeight: 500, 
                            fontSize: { xs: '0.65rem', md: '0.75rem' },
                            wordBreak: 'break-word'
                          }}>
                            {truncateText(product.vendor?.name, 10)}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>



      <Footer />
    </Box>
  );
};



export default ProductView;
