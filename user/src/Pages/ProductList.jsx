

// import React, { useContext, useEffect, useState } from 'react';
// import { Grid, Box, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem, TextField, Chip, IconButton, Card, CardMedia, CardContent, Fade, Zoom, Button, Badge, Tooltip } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Search, Filter, ShoppingBag, Star,Favorite as Heart,Visibility as Eye, GridView, ViewList, Sort, LocalOffer, Verified, TrendingUp } from '@mui/icons-material';
// import { userContext } from '../Context/Context';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import Loading from '../components/Loading';
// import Section from '../components/Section';
// import Banner from '../components/Banner';
// import bgimage from '../assets/banner.png';
// import { config } from '../Config/Config';

// const ProductList = () => {
//     const {host} = config;
//     const { products = [], getAllProducts, loading } = useContext(userContext);
//     const navigate = useNavigate();
//     const [searchTerm, setSearchTerm] = useState('');
//     const [priceRange, setPriceRange] = useState([0, 100000]);
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [categories, setCategories] = useState([]);
//     const [viewMode, setViewMode] = useState('grid');
//     const [sortBy, setSortBy] = useState('name');
//     const [favorites, setFavorites] = useState(new Set());
//     const [showFilters, setShowFilters] = useState(false);
//     const [hoveredProduct, setHoveredProduct] = useState(null);
    
//     useEffect(() => {
//         getAllProducts();
//         fetch(`${host}/customer/categories`)
//             .then(res => res.json())
//             .then(data => {
//                 if (data.success) {
//                     setCategories(data.categories);
//                 }
//             })
//             .catch(err => console.error('Error fetching categories:', err));
//     }, []);

//     // ADDED: Helper function to normalize text for better matching
//     const normalizeText = (text) => {
//         if (!text) return '';
//         return text
//             .toLowerCase()
//             .replace(/[^\w\s]/g, '') // Remove special characters like apostrophes, hyphens
//             .replace(/\s+/g, ' ')    // Normalize multiple spaces to single space
//             .trim();
//     };

//     const handlePriceChange = (event, newValue) => {
//         setPriceRange([0, newValue]);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     const toggleFavorite = (productId) => {
//         setFavorites(prev => {
//             const newFavorites = new Set(prev);
//             if (newFavorites.has(productId)) {
//                 newFavorites.delete(productId);
//             } else {
//                 newFavorites.add(productId);
//             }
//             return newFavorites;
//         });
//     };

//     const sortProducts = (products) => {
//         switch (sortBy) {
//             case 'price-low':
//                 return [...products].sort((a, b) => a.price - b.price);
//             case 'price-high':
//                 return [...products].sort((a, b) => b.price - a.price);
//             case 'name':
//                 return [...products].sort((a, b) => a.name.localeCompare(b.name));
//             case 'newest':
//                 return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             default:
//                 return products;
//         }
//     };

//     // FIXED: Enhanced filtering logic with better category name matching
//     const filteredProducts = sortProducts(
//         products.filter(product => {
//             // Enhanced search logic - search in multiple fields
//             const searchTermLower = searchTerm.toLowerCase().trim();
            
//             if (searchTermLower === '') {
//                 // If no search term, only apply category and price filters
//                 const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
//                 const matchesCategory = selectedCategory === 'all' || 
//                     (product.category && product.category._id === selectedCategory);
//                 return matchesPrice && matchesCategory;
//             }

//             const normalizedSearchTerm = normalizeText(searchTermLower);
            
//             const matchesSearch = 
//                 normalizeText(product.name).includes(normalizedSearchTerm) ||
//                 normalizeText(product.description).includes(normalizedSearchTerm) ||
//                 (product.specifications?.brand && normalizeText(product.specifications.brand).includes(normalizedSearchTerm)) ||
//                 (product.specifications?.model && normalizeText(product.specifications.model).includes(normalizedSearchTerm)) ||
//                 // FIXED: Better category name matching - handles "mens watches" vs "Men's Watches"
//                 (product.category?.name && normalizeText(product.category.name).includes(normalizedSearchTerm)) ||
//                 // Search in all specification values
//                 (product.specifications && Object.values(product.specifications).some(value => 
//                     typeof value === 'string' && normalizeText(value).includes(normalizedSearchTerm)
//                 ));
            
//             // Price filtering
//             const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            
//             // Category filtering - when searching, show all categories unless specifically filtered
//             const matchesCategory = selectedCategory === 'all' || 
//                 (product.category && product.category._id === selectedCategory);
            
//             return matchesSearch && matchesPrice && matchesCategory;
//         })
//     );

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             maximumFractionDigits: 0
//         }).format(price);
//     };

//     const getDiscountPercentage = (product) => {
//         if (product.price >= 50000) return 30;
//         if (product.price >= 25000) return 25;
//         if (product.price >= 10000) return 20;
//         if (product.price >= 5000) return 15;
//         return 10;
//     };

//     const handleProductNavigation = (product) => {
//         if (product.stock === 0) {
//             alert('Product is out of stock');
//             return;
//         }
//         navigate(`/product/${product._id}`);
//     };

//     const clearAllFilters = () => {
//         setSearchTerm('');
//         setSelectedCategory('all');
//         setPriceRange([0, 100000]);
//         setSortBy('name');
//     };

//     if (loading) return <Loading />;

//     // Rest of your component remains the same...
//     return (
//         <Box sx={{ 
//             minHeight: '100vh', 
//             display: 'flex', 
//             flexDirection: 'column',
//             pt: '84px'
//         }}>
//             <Header />
            
//             {/* Enhanced Hero Banner */}
//             <Box sx={{
//                 background: 'linear-gradient(135deg, rgba(107, 116, 154, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
//                 py: 8,
//                 position: 'relative',
//                 overflow: 'hidden'
//             }}>
//                 <Box sx={{
//                     position: 'absolute',
//                     top: 0,
//                     right: 0,
//                     width: '50%',
//                     height: '100%',
//                     background: 'url(' + bgimage + ')',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     opacity: 0.3
//                 }} />
                
//                 <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, position: 'relative', zIndex: 1 }}>
//                     <Fade in timeout={1000}>
//                         <Box sx={{ mb: 6 }}>
//                             <Typography variant="h2" sx={{ 
//                                 color: 'white', 
//                                 fontWeight: 800, 
//                                 mb: 2,
//                                 textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
//                             }}>
//                                 Discover Amazing Products
//                             </Typography>
//                             <Typography variant="h5" sx={{ 
//                                 color: 'rgba(255,255,255,0.9)', 
//                                 fontWeight: 300,
//                                 textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
//                             }}>
//                                 Browse through our premium collection
//                             </Typography>
//                         </Box>
//                     </Fade>

//                     {/* Enhanced Search & Filter Section */}
//                     <Paper 
//                         elevation={20} 
//                         sx={{ 
//                             p: 4,
//                             borderRadius: 4,
//                             background: 'rgba(255, 255, 255, 0.95)',
//                             backdropFilter: 'blur(10px)',
//                             border: '1px solid rgba(255, 255, 255, 0.2)'
//                         }}
//                     >
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                             <Search sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Search by product name, brand, category (e.g., mens watches), or specifications..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 sx={{ 
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 3,
//                                         fontSize: '1.1rem',
//                                         '&:hover fieldset': {
//                                             borderColor: 'primary.main',
//                                         }
//                                     }
//                                 }}
//                             />
//                             <IconButton 
//                                 onClick={() => setShowFilters(!showFilters)}
//                                 sx={{ 
//                                     ml: 2, 
//                                     bgcolor: showFilters ? 'primary.main' : 'transparent',
//                                     color: showFilters ? 'white' : 'primary.main',
//                                     '&:hover': {
//                                         bgcolor: 'primary.main',
//                                         color: 'white'
//                                     }
//                                 }}
//                             >
//                                 <Filter />
//                             </IconButton>
//                         </Box>
                        
//                         {/* Active filters display */}
//                         {(searchTerm || selectedCategory !== 'all' || priceRange[1] < 100000) && (
//                             <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
//                                 <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>
//                                     Active filters:
//                                 </Typography>
//                                 {searchTerm && (
//                                     <Chip 
//                                         label={`Search: "${searchTerm}"`}
//                                         onDelete={() => setSearchTerm('')}
//                                         size="small"
//                                         color="primary"
//                                     />
//                                 )}
//                                 {selectedCategory !== 'all' && (
//                                     <Chip 
//                                         label={`Category: ${categories.find(c => c._id === selectedCategory)?.name || 'Unknown'}`}
//                                         onDelete={() => setSelectedCategory('all')}
//                                         size="small"
//                                         color="primary"
//                                     />
//                                 )}
//                                 {priceRange[1] < 100000 && (
//                                     <Chip 
//                                         label={`Price: Up to ${formatPrice(priceRange[1])}`}
//                                         onDelete={() => setPriceRange([0, 100000])}
//                                         size="small"
//                                         color="primary"
//                                     />
//                                 )}
//                                 <Button 
//                                     size="small" 
//                                     onClick={clearAllFilters}
//                                     sx={{ ml: 1 }}
//                                 >
//                                     Clear All
//                                 </Button>
//                             </Box>
//                         )}
                        
//                         <Fade in={showFilters}>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={12} md={4}>
//                                     <FormControl fullWidth>
//                                         <InputLabel>Category</InputLabel>
//                                         <Select
//                                             value={selectedCategory}
//                                             onChange={handleCategoryChange}
//                                             label="Category"
//                                             sx={{ borderRadius: 2 }}
//                                         >
//                                             <MenuItem value="all">All Categories</MenuItem>
//                                             {categories.map(category => (
//                                                 <MenuItem key={category._id} value={category._id}>
//                                                     {category.name}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12} md={4}>
//                                     <FormControl fullWidth>
//                                         <InputLabel>Sort By</InputLabel>
//                                         <Select
//                                             value={sortBy}
//                                             onChange={(e) => setSortBy(e.target.value)}
//                                             label="Sort By"
//                                             sx={{ borderRadius: 2 }}
//                                         >
//                                             <MenuItem value="name">Name A-Z</MenuItem>
//                                             <MenuItem value="price-low">Price: Low to High</MenuItem>
//                                             <MenuItem value="price-high">Price: High to Low</MenuItem>
//                                             <MenuItem value="newest">Newest First</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12} md={4}>
//                                     <Typography gutterBottom sx={{ fontWeight: 600 }}>Price Range</Typography>
//                                     <Slider
//                                         value={priceRange[1]}
//                                         onChange={handlePriceChange}
//                                         min={0}
//                                         max={100000}
//                                         valueLabelDisplay="auto"
//                                         valueLabelFormat={(value) => formatPrice(value)}
//                                         sx={{
//                                             '& .MuiSlider-thumb': {
//                                                 width: 24,
//                                                 height: 24,
//                                                 backgroundColor: '#1976d2',
//                                                 border: '2px solid white',
//                                                 boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
//                                             },
//                                             '& .MuiSlider-track': {
//                                                 height: 8,
//                                                 backgroundColor: '#1976d2',
//                                             },
//                                             '& .MuiSlider-rail': {
//                                                 height: 8,
//                                                 backgroundColor: '#e0e7ff',
//                                             },
//                                             '& .MuiSlider-valueLabel': {
//                                                 fontSize: '0.85rem',
//                                                 fontWeight: 600,
//                                                 backgroundColor: '#1976d2',
//                                                 color: 'white',
//                                                 '&::before': {
//                                                     borderTopColor: '#1976d2'
//                                                 }
//                                             }
//                                         }}
//                                     />
//                                     <Box sx={{ 
//                                         display: 'flex', 
//                                         justifyContent: 'space-between', 
//                                         alignItems: 'center',
//                                         mt: 2,
//                                         px: 1
//                                     }}>
//                                         <Typography 
//                                             variant="body2" 
//                                             sx={{ 
//                                                 color: '#64748b',
//                                                 fontSize: '0.875rem',
//                                                 fontWeight: 500
//                                             }}
//                                         >
//                                             Min: {formatPrice(0)}
//                                         </Typography>
//                                         <Typography 
//                                             variant="body2" 
//                                             sx={{ 
//                                                 color: '#1976d2',
//                                                 fontSize: '0.875rem',
//                                                 fontWeight: 600
//                                             }}
//                                         >
//                                             Max: {formatPrice(priceRange[1])}
//                                         </Typography>
//                                     </Box>
//                                 </Grid>
//                             </Grid>
//                         </Fade>
//                     </Paper>
//                 </Box>
//             </Box>

//             <Section sx={{ py: 6, bgcolor: '#f8fafc' }}>
//                 <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3 }}>
//                     {/* Results Header */}
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//                         <Box>
//                             <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a202c' }}>
//                                 Our Products
//                             </Typography>
//                             <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
//                                 {filteredProducts.length} products found
//                                 {searchTerm && ` for "${searchTerm}"`}
//                             </Typography>
//                         </Box>
                        
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                             <IconButton 
//                                 onClick={() => setViewMode('grid')}
//                                 color={viewMode === 'grid' ? 'primary' : 'default'}
//                                 sx={{ 
//                                     bgcolor: viewMode === 'grid' ? 'primary.light' : 'transparent',
//                                     '&:hover': { bgcolor: 'primary.light' }
//                                 }}
//                             >
//                                 <GridView />
//                             </IconButton>
//                         </Box>
//                     </Box>
                    
//                     {filteredProducts.length > 0 ? (
//                         <Grid container spacing={2}>
//                             {filteredProducts.map((product, index) => {
//                                 const discount = getDiscountPercentage(product);
//                                 const originalPrice = Math.round(product.price / (1 - discount / 100));
                                
//                                 return (
//                                     <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product._id}>
//                                         <Zoom in timeout={200 + index * 100}>
//                                             <Card
//                                                 onMouseEnter={() => setHoveredProduct(product._id)}
//                                                 onMouseLeave={() => setHoveredProduct(null)}
//                                                 onClick={() => handleProductNavigation(product)}
//                                                 sx={{
//                                                     height: '100%',
//                                                     width:'350px',
//                                                     borderRadius: 3,
//                                                     overflow: 'hidden',
//                                                     position: 'relative',
//                                                     cursor: 'pointer',
//                                                     transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
//                                                     transform: hoveredProduct === product._id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
//                                                     boxShadow: hoveredProduct === product._id 
//                                                         ? '0 15px 30px rgba(0,0,0,0.12)' 
//                                                         : '0 3px 8px rgba(0,0,0,0.06)',
//                                                     '&::before': {
//                                                         content: '""',
//                                                         position: 'absolute',
//                                                         top: 0,
//                                                         left: 0,
//                                                         right: 0,
//                                                         bottom: 0,
//                                                         background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
//                                                         opacity: hoveredProduct === product._id ? 1 : 0,
//                                                         transition: 'opacity 0.3s ease',
//                                                         zIndex: 1,
//                                                         pointerEvents: 'none'
//                                                     }
//                                                 }}
//                                             >
//                                                 {/* Product Image */}
//                                                 <Box sx={{ position: 'relative', overflow: 'hidden' }}>
//                                                     <CardMedia
//                                                         component="img"
//                                                         height="200"
//                                                         image={`${host}/uploads/products/${product.images[0]}`}
//                                                         alt={product.name}
//                                                         sx={{
//                                                             transition: 'transform 0.5s ease',
//                                                             transform: hoveredProduct === product._id ? 'scale(1.08)' : 'scale(1)',
//                                                         }}
//                                                     />
                                                    
//                                                     {/* Badges */}
//                                                     <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
//                                                         <Chip 
//                                                             label={`${discount}% OFF`}
//                                                             size="small"
//                                                             sx={{ 
//                                                                 bgcolor: '#ff4757', 
//                                                                 color: 'white', 
//                                                                 fontWeight: 700,
//                                                                 fontSize: '0.7rem',
//                                                                 height: 20,
//                                                                 mb: 0.5
//                                                             }}
//                                                         />
//                                                         {product.stock < 10 && (
//                                                             <Chip 
//                                                                 label="Limited"
//                                                                 size="small"
//                                                                 sx={{ 
//                                                                     bgcolor: '#ffa502', 
//                                                                     color: 'white', 
//                                                                     fontWeight: 600,
//                                                                     fontSize: '0.65rem',
//                                                                     height: 18,
//                                                                     display: 'block'
//                                                                 }}
//                                                             />
//                                                         )}
//                                                     </Box>

//                                                     <Box sx={{ 
//                                                         position: 'absolute', 
//                                                         top: 8, 
//                                                         right: 8, 
//                                                         display: 'flex', 
//                                                         flexDirection: 'column', 
//                                                         gap: 0.5,
//                                                         opacity: hoveredProduct === product._id ? 1 : 0,
//                                                         transform: hoveredProduct === product._id ? 'translateX(0)' : 'translateX(15px)',
//                                                         transition: 'all 0.3s ease',
//                                                         zIndex: 2
//                                                     }}>
//                                                     </Box>
//                                                 </Box>

//                                                 <CardContent sx={{ p: 2, position: 'relative', zIndex: 2 }}>
//                                                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
//                                                         <Chip 
//                                                             label={product.specifications?.brand || 'Brand'}
//                                                             size="small"
//                                                             variant="outlined"
//                                                             sx={{ 
//                                                                 fontWeight: 600,
//                                                                 fontSize: '0.65rem',
//                                                                 height: 20
//                                                             }}
//                                                         />
//                                                     </Box>

//                                                     <Typography 
//                                                         variant="subtitle1" 
//                                                         sx={{ 
//                                                             fontWeight: 700, 
//                                                             mb: 1,
//                                                             color: '#1a202c',
//                                                             display: '-webkit-box',
//                                                             WebkitLineClamp: 2,
//                                                             WebkitBoxOrient: 'vertical',
//                                                             overflow: 'hidden',
//                                                             fontSize: '0.9rem',
//                                                             lineHeight: 1.3
//                                                         }}
//                                                     >
//                                                         {product.name}
//                                                     </Typography>

//                                                     <Typography 
//                                                         variant="body2" 
//                                                         sx={{ 
//                                                             color: '#64748b', 
//                                                             mb: 1.5,
//                                                             display: '-webkit-box',
//                                                             WebkitLineClamp: 1,
//                                                             WebkitBoxOrient: 'vertical',
//                                                             overflow: 'hidden',
//                                                             lineHeight: 1.3,
//                                                             fontSize: '0.75rem'
//                                                         }}
//                                                     >
//                                                         {product.description}
//                                                     </Typography>

//                                                     <Box sx={{ mb: 2 }}>
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//                                                             <Typography variant="h6" sx={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>
//                                                                 {formatPrice(product.price)}
//                                                             </Typography>
//                                                             <Typography 
//                                                                 variant="caption" 
//                                                                 sx={{ 
//                                                                     textDecoration: 'line-through', 
//                                                                     color: '#94a3b8',
//                                                                     fontSize: '0.7rem'
//                                                                 }}
//                                                             >
//                                                                 {formatPrice(originalPrice)}
//                                                             </Typography>
//                                                         </Box>
//                                                         <Typography variant="caption" sx={{ color: '#059669', fontWeight: 600, fontSize: '0.65rem' }}>
//                                                             Save {formatPrice(originalPrice - product.price)}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                                                         <Box sx={{
//                                                             width: 6,
//                                                             height: 6,
//                                                             borderRadius: '50%',
//                                                             bgcolor: product.stock > 10 ? '#10b981' : product.stock > 0 ? '#f59e0b' : '#ef4444',
//                                                             mr: 0.5
//                                                         }} />
//                                                         <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.65rem' }}>
//                                                             {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Limited' : 'Out of Stock'}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Button
//                                                         fullWidth
//                                                         variant="contained"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             e.preventDefault();
//                                                             handleProductNavigation(product);
//                                                         }}
//                                                         size="small"
//                                                         sx={{
//                                                             py: 1,
//                                                             borderRadius: 2,
//                                                             fontWeight: 700,
//                                                             fontSize: '0.75rem',
//                                                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                                             '&:hover': {
//                                                                 background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
//                                                                 transform: 'translateY(-1px)',
//                                                                 boxShadow: '0 6px 15px rgba(102, 126, 234, 0.3)'
//                                                             },
//                                                             transition: 'all 0.3s ease'
//                                                         }}
//                                                         startIcon={<ShoppingBag sx={{ fontSize: '16px !important' }} />}
//                                                     >
//                                                         View Details
//                                                     </Button>
//                                                 </CardContent>
//                                             </Card>
//                                         </Zoom>
//                                     </Grid>
//                                 );
//                             })}
//                         </Grid>
//                     ) : (
//                         <Paper 
//                             sx={{ 
//                                 p: 8, 
//                                 textAlign: 'center',
//                                 borderRadius: 4,
//                                 background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
//                                 border: '2px dashed #e2e8f0'
//                             }}
//                         >
//                             <ShoppingBag sx={{ fontSize: 80, color: '#cbd5e1', mb: 3 }} />
//                             <Typography variant="h5" sx={{ fontWeight: 700, color: '#475569', mb: 2 }}>
//                                 No products found
//                             </Typography>
//                             <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
//                                 We couldn't find any products matching your search criteria.
//                                 {searchTerm && ` Try different keywords or browse our categories.`}
//                             </Typography>
//                             <Button 
//                                 variant="outlined" 
//                                 onClick={clearAllFilters}
//                                 sx={{ borderRadius: 3, px: 4 }}
//                             >
//                                 Clear All Filters
//                             </Button>
//                         </Paper>
//                     )}
//                 </Box>
//             </Section>

//             <Footer />
//         </Box>
//     );
// };

// export default ProductList;





import React, { useContext, useEffect, useState } from 'react';
import { Grid, Box, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem, TextField, Chip, IconButton, Card, CardMedia, CardContent, Fade, Zoom, Button, Badge, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ShoppingBag, Star,Favorite as Heart,Visibility as Eye, GridView, ViewList, Sort, LocalOffer, Verified, TrendingUp } from '@mui/icons-material';
import { userContext } from '../Context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Section from '../components/Section';
import Banner from '../components/Banner';
// REMOVED: import bgimage from '../assets/banner.png';
import { config } from '../Config/Config';

const ProductList = () => {
    const {host} = config;
    const { products = [], getAllProducts, loading } = useContext(userContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');
    const [favorites, setFavorites] = useState(new Set());
    const [showFilters, setShowFilters] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    
    // FIXED: New background image URL
    const backgroundImageUrl = 'https://img.freepik.com/free-vector/flat-shopping-center-social-media-cover-template_23-2149330485.jpg';

    // Enhanced category grouping logic
    const getCategoryGroup = (categoryName) => {
        if (!categoryName) return 'Others';
        
        const name = categoryName.toLowerCase().trim();
        
        // Watches group
        if (name.includes('watch')) {
            return 'Watches';
        }
        // Fashion group  
        if (name.includes('wear') || name.includes('clothing') || name.includes('apparel') || 
            name.includes('fashion') || name.includes('shirt') || name.includes('pants') || 
            name.includes('dress') || name.includes('jacket') || name.includes('jeans')) {
            return 'Fashion';
        }
        // Electronics group
        if (name.includes('phone') || name.includes('smartphone') || name.includes('mobile') ||
            name.includes('laptop') || name.includes('computer') || name.includes('tablet') ||
            name.includes('electronics') || name.includes('gadget')) {
            return 'Electronics';
        }
        // Accessories group
        if (name.includes('bag') || name.includes('wallet') || name.includes('belt') ||
            name.includes('accessories') || name.includes('jewelry') || name.includes('sunglasses')) {
            return 'Accessories';
        }
        // Beauty group
        if (name.includes('beauty') || name.includes('cosmetic') || name.includes('makeup') ||
            name.includes('skincare') || name.includes('perfume') || name.includes('fragrance')) {
            return 'Beauty';
        }
        // Footwear group
        if (name.includes('shoe') || name.includes('footwear') || name.includes('sneaker') ||
            name.includes('boot') || name.includes('sandal')) {
            return 'Footwear';
        }
        // Groceries group
        if (name.includes('grocery') || name.includes('food') || name.includes('beverage') ||
            name.includes('snack') || name.includes('drink')) {
            return 'Groceries';
        }
        
        return 'Others';
    };

    // Create grouped categories
    const [groupedCategories, setGroupedCategories] = useState({});
    
    useEffect(() => {
        getAllProducts();
        fetch(`${host}/customer/categories`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCategories(data.categories);
                    
                    // Group categories by main category
                    const grouped = {};
                    data.categories.forEach(category => {
                        const group = getCategoryGroup(category.name);
                        if (!grouped[group]) {
                            grouped[group] = [];
                        }
                        grouped[group].push(category);
                    });
                    
                    setGroupedCategories(grouped);
                    console.log('Grouped categories:', grouped);
                }
            })
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    // Helper function to normalize text for better matching
    const normalizeText = (text) => {
        if (!text) return '';
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove special characters like apostrophes, hyphens
            .replace(/\s+/g, ' ')    // Normalize multiple spaces to single space
            .trim();
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange([0, newValue]);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    const sortProducts = (products) => {
        switch (sortBy) {
            case 'price-low':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...products].sort((a, b) => b.price - a.price);
            case 'name':
                return [...products].sort((a, b) => a.name.localeCompare(b.name));
            case 'newest':
                return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            default:
                return products;
        }
    };

    // Enhanced filtering by main category groups
    const filteredProducts = sortProducts(
        products.filter(product => {
            // STEP 1: Category filtering by groups
            let matchesCategory = false;
            
            if (selectedCategory === 'all') {
                matchesCategory = true;
            } else {
                // Check if selectedCategory is a main group or specific category
                const isMainGroup = Object.keys(groupedCategories).includes(selectedCategory);
                
                if (isMainGroup) {
                    // Filter by main group - include all products from subcategories in this group
                    const categoriesInGroup = groupedCategories[selectedCategory] || [];
                    matchesCategory = categoriesInGroup.some(cat => 
                        product.category && product.category._id === cat._id
                    );
                } else {
                    // Filter by specific category ID (fallback for individual categories)
                    matchesCategory = product.category && product.category._id === selectedCategory;
                }
            }
            
            if (!matchesCategory) {
                return false;
            }
            
            // STEP 2: Price filtering
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            if (!matchesPrice) {
                return false;
            }
            
            // STEP 3: Search filtering (only if search term exists)
            if (!searchTerm.trim()) {
                return true;
            }

            const normalizedSearchTerm = normalizeText(searchTerm);
            
            const matchesSearch = 
                normalizeText(product.name).includes(normalizedSearchTerm) ||
                normalizeText(product.description).includes(normalizedSearchTerm) ||
                (product.specifications?.brand && normalizeText(product.specifications.brand).includes(normalizedSearchTerm)) ||
                (product.specifications?.model && normalizeText(product.specifications.model).includes(normalizedSearchTerm)) ||
                (product.specifications && Object.values(product.specifications).some(value => 
                    typeof value === 'string' && normalizeText(value).includes(normalizedSearchTerm)
                ));
            
            return matchesSearch;
        })
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const getDiscountPercentage = (product) => {
        if (product.price >= 50000) return 30;
        if (product.price >= 25000) return 25;
        if (product.price >= 10000) return 20;
        if (product.price >= 5000) return 15;
        return 10;
    };

    const handleProductNavigation = (product) => {
        if (product.stock === 0) {
            alert('Product is out of stock');
            return;
        }
        navigate(`/product/${product._id}`);
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setPriceRange([0, 100000]);
        setSortBy('name');
    };

    // Get selected category name for display
    const getSelectedCategoryName = () => {
        if (selectedCategory === 'all') return 'All Categories';
        
        // Check if it's a main group
        if (Object.keys(groupedCategories).includes(selectedCategory)) {
            return selectedCategory;
        }
        
        // Otherwise, find the specific category
        const category = categories.find(c => c._id === selectedCategory);
        return category ? category.name : 'Unknown Category';
    };

    // Get product count for categories/groups
    const getCategoryProductCount = (categoryKey) => {
        if (categoryKey === 'all') return products.length;
        
        // Check if it's a main group
        if (Object.keys(groupedCategories).includes(categoryKey)) {
            const categoriesInGroup = groupedCategories[categoryKey] || [];
            return products.filter(product =>
                categoriesInGroup.some(cat => 
                    product.category && product.category._id === cat._id
                )
            ).length;
        }
        
        // Otherwise, it's a specific category
        return products.filter(p => p.category && p.category._id === categoryKey).length;
    };

    // Get emoji for category groups
    const getCategoryEmoji = (groupName) => {
        switch(groupName) {
            case 'Watches': return '⌚';
            case 'Fashion': return '👕';
            case 'Electronics': return '📱';
            case 'Accessories': return '👜';
            case 'Beauty': return '💄';
            case 'Footwear': return '👟';
            case 'Groceries': return '🛒';
            default: return '📦';
        }
    };

    if (loading) return <Loading />;

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            pt: '0px'
        }}>
            <Header />
            
            {/* FIXED: Enhanced Hero Banner with new background image */}
            <Box sx={{
                background: 'linear-gradient(135deg, rgba(107, 116, 154, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%)',
                py: 4,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* FIXED: New background image */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.2,
                    zIndex: 0
                }} />
                
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, position: 'relative', zIndex: 1 }}>
                    <Fade in timeout={1000}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h2" sx={{ 
                                color: 'white', 
                                fontWeight: 800, 
                                mb: 1,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                fontSize: { xs: '2rem', md: '3rem' }
                            }}>
                                Discover Amazing Products
                            </Typography>
                            <Typography variant="h5" sx={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontWeight: 300,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                fontSize: { xs: '1.2rem', md: '1.5rem' }
                            }}>
                                Browse through our premium collection
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Enhanced Search & Filter Section */}
                    <Paper 
                        elevation={20} 
                        sx={{ 
                            p: 3,
                            borderRadius: 6,
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Search sx={{ 
                                color: 'primary.main', 
                                mr: 2, 
                                fontSize: 28,
                                p: 0.5,
                                borderRadius: 2,
                                bgcolor: 'rgba(25, 118, 210, 0.08)'
                            }} />
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search by product name, brand, or specifications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 4,
                                        fontSize: '1rem',
                                        bgcolor: 'rgba(248, 250, 252, 0.8)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(248, 250, 252, 1)',
                                            '& fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2
                                            }
                                        },
                                        '&.Mui-focused': {
                                            bgcolor: 'white',
                                            '& fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                                boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)'
                                            }
                                        },
                                        '& fieldset': {
                                            borderColor: 'rgba(0, 0, 0, 0.12)',
                                            transition: 'all 0.3s ease'
                                        }
                                    },
                                    '& .MuiInputBase-input': {
                                        py: 1.5,
                                        '&::placeholder': {
                                            color: 'rgba(0, 0, 0, 0.5)',
                                            fontWeight: 400
                                        }
                                    }
                                }}
                            />
                            <IconButton 
                                onClick={() => setShowFilters(!showFilters)}
                                sx={{ 
                                    ml: 2, 
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: showFilters ? 'primary.main' : 'rgba(25, 118, 210, 0.08)',
                                    color: showFilters ? 'white' : 'primary.main',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: showFilters ? 'primary.dark' : 'primary.main',
                                        color: 'white',
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            >
                                <Filter />
                            </IconButton>
                        </Box>
                        
                        {/* Active filters display */}
                        {(searchTerm || selectedCategory !== 'all' || priceRange[1] < 100000) && (
                            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ mr: 1, fontWeight: 600, color: '#1976d2' }}>
                                    Active filters:
                                </Typography>
                                {selectedCategory !== 'all' && (
                                    <Chip 
                                        label={`${getCategoryEmoji(getSelectedCategoryName())} ${getSelectedCategoryName()} (${getCategoryProductCount(selectedCategory)} items)`}
                                        onDelete={() => setSelectedCategory('all')}
                                        size="small"
                                        color="primary"
                                        sx={{ 
                                            borderRadius: 2, 
                                            fontWeight: 700,
                                            bgcolor: 'primary.main',
                                            color: 'white'
                                        }}
                                    />
                                )}
                                {searchTerm && (
                                    <Chip 
                                        label={`🔍 "${searchTerm}"`}
                                        onDelete={() => setSearchTerm('')}
                                        size="small"
                                        color="secondary"
                                        sx={{ borderRadius: 2, fontWeight: 600 }}
                                    />
                                )}
                                {priceRange[1] < 100000 && (
                                    <Chip 
                                        label={`💰 Up to ${formatPrice(priceRange[1])}`}
                                        onDelete={() => setPriceRange([0, 100000])}
                                        size="small"
                                        color="info"
                                        sx={{ borderRadius: 2 }}
                                    />
                                )}
                                <Button 
                                    size="small" 
                                    onClick={clearAllFilters}
                                    sx={{ 
                                        ml: 1,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        color: '#d32f2f'
                                    }}
                                >
                                    Clear All ✕
                                </Button>
                            </Box>
                        )}
                        
                        <Fade in={showFilters}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontWeight: 600 }}>Category</InputLabel>
                                        <Select
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            label="Category"
                                            sx={{ 
                                                borderRadius: 3,
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(0, 0, 0, 0.12)'
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'primary.main',
                                                    borderWidth: 2
                                                }
                                            }}
                                        >
                                            <MenuItem value="all" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                                🏷️ All Categories ({products.length})
                                            </MenuItem>
                                            
                                            {/* Main category groups */}
                                            {Object.keys(groupedCategories).sort().map(groupName => {
                                                const count = getCategoryProductCount(groupName);
                                                return (
                                                    <MenuItem 
                                                        key={groupName} 
                                                        value={groupName} 
                                                        sx={{ 
                                                            fontWeight: 700,
                                                            fontSize: '1rem',
                                                            color: '#1976d2',
                                                            bgcolor: 'rgba(25, 118, 210, 0.05)',
                                                            mb: 0.5,
                                                            borderRadius: 1,
                                                            mx: 0.5
                                                        }}
                                                    >
                                                        {getCategoryEmoji(groupName)} {groupName} ({count})
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontWeight: 600 }}>Sort By</InputLabel>
                                        <Select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            label="Sort By"
                                            sx={{ 
                                                borderRadius: 3,
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(0, 0, 0, 0.12)'
                                                }
                                            }}
                                        >
                                            <MenuItem value="name">🔤 Name A-Z</MenuItem>
                                            <MenuItem value="price-low">💰 Price: Low to High</MenuItem>
                                            <MenuItem value="price-high">💎 Price: High to Low</MenuItem>
                                            <MenuItem value="newest">🆕 Newest First</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
                                        💰 Price Range
                                    </Typography>
                                    <Slider
                                        value={priceRange[1]}
                                        onChange={handlePriceChange}
                                        min={0}
                                        max={100000}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => formatPrice(value)}
                                        sx={{
                                            '& .MuiSlider-thumb': {
                                                width: 24,
                                                height: 24,
                                                backgroundColor: '#1976d2',
                                                border: '2px solid white',
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                            },
                                            '& .MuiSlider-track': {
                                                height: 8,
                                                backgroundColor: '#1976d2',
                                            },
                                            '& .MuiSlider-rail': {
                                                height: 8,
                                                backgroundColor: '#e0e7ff',
                                            },
                                            '& .MuiSlider-valueLabel': {
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                backgroundColor: '#1976d2',
                                                color: 'white',
                                                '&::before': {
                                                    borderTopColor: '#1976d2'
                                                }
                                            }
                                        }}
                                    />
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        mt: 2,
                                        px: 1
                                    }}>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: '#64748b',
                                                fontSize: '0.875rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            Min: {formatPrice(0)}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: '#1976d2',
                                                fontSize: '0.875rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            Max: {formatPrice(priceRange[1])}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Fade>
                    </Paper>
                </Box>
            </Box>

            <Section sx={{ py: 4, bgcolor: '#f8fafc' }}>
                <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3 }}>
                    {/* Results Header with enhanced category display */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a202c', display: 'flex', alignItems: 'center', gap: 1 }}>
                                {selectedCategory === 'all' ? '🏷️ All Products' : `${getCategoryEmoji(getSelectedCategoryName())} ${getSelectedCategoryName()}`}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
                                <strong>{filteredProducts.length}</strong> products found
                                {searchTerm && ` for "${searchTerm}"`}
                                {selectedCategory !== 'all' && ` in ${getSelectedCategoryName()}`}
                            </Typography>
                            
                            {/* Show subcategories included when main group is selected */}
                            {selectedCategory !== 'all' && Object.keys(groupedCategories).includes(selectedCategory) && (
                                <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block' }}>
                                    Including: {groupedCategories[selectedCategory]?.map(cat => cat.name).join(', ')}
                                </Typography>
                            )}
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                                onClick={() => setViewMode('grid')}
                                color={viewMode === 'grid' ? 'primary' : 'default'}
                                sx={{ 
                                    bgcolor: viewMode === 'grid' ? 'primary.light' : 'transparent',
                                    '&:hover': { bgcolor: 'primary.light' }
                                }}
                            >
                                <GridView />
                            </IconButton>
                        </Box>
                    </Box>
                    
                    {filteredProducts.length > 0 ? (
                        <Grid container spacing={2}>
                            {filteredProducts.map((product, index) => {
                                const discount = getDiscountPercentage(product);
                                const originalPrice = Math.round(product.price / (1 - discount / 100));
                                
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product._id}>
                                        <Zoom in timeout={200 + index * 100}>
                                            <Card
                                                onMouseEnter={() => setHoveredProduct(product._id)}
                                                onMouseLeave={() => setHoveredProduct(null)}
                                                onClick={() => handleProductNavigation(product)}
                                                sx={{
                                                    height: '100%',
                                                    width: '100%',
                                                    maxWidth: '350px',
                                                    mx: 'auto',
                                                    borderRadius: 3,
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                    transform: hoveredProduct === product._id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                                                    boxShadow: hoveredProduct === product._id 
                                                        ? '0 15px 30px rgba(0,0,0,0.12)' 
                                                        : '0 3px 8px rgba(0,0,0,0.06)',
                                                    border: selectedCategory !== 'all' ? '2px solid rgba(25, 118, 210, 0.1)' : 'none',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                                        opacity: hoveredProduct === product._id ? 1 : 0,
                                                        transition: 'opacity 0.3s ease',
                                                        zIndex: 1,
                                                        pointerEvents: 'none'
                                                    }
                                                }}
                                            >
                                                {/* Product Image */}
                                                <Box sx={{ 
                                                    position: 'relative', 
                                                    overflow: 'hidden',
                                                    height: 240, // Increased height since we removed category chip
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: '#f8fafc'
                                                }}>
                                                    <CardMedia
                                                        component="img"
                                                        image={`${host}/uploads/products/${product.images[0]}`}
                                                        alt={product.name}
                                                        sx={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                            objectPosition: 'center',
                                                            transition: 'transform 0.3s ease',
                                                            transform: hoveredProduct === product._id ? 'scale(1.05)' : 'scale(1)',
                                                        }}
                                                    />
                                                    
                                                    {/* Badges */}
                                                    <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
                                                        <Chip 
                                                            label={`${discount}% OFF`}
                                                            size="small"
                                                            sx={{ 
                                                                bgcolor: '#ff4757', 
                                                                color: 'white', 
                                                                fontWeight: 700,
                                                                fontSize: '0.7rem',
                                                                height: 20,
                                                                mb: 0.5
                                                            }}
                                                        />
                                                        {product.stock < 10 && (
                                                            <Chip 
                                                                label="Limited"
                                                                size="small"
                                                                sx={{ 
                                                                    bgcolor: '#ffa502', 
                                                                    color: 'white', 
                                                                    fontWeight: 600,
                                                                    fontSize: '0.65rem',
                                                                    height: 18,
                                                                    display: 'block'
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>

                                                {/* FIXED: Removed category chip from card content */}
                                                <CardContent sx={{ p: 2, position: 'relative', zIndex: 2 }}>
                                                    <Typography 
                                                        variant="subtitle1" 
                                                        sx={{ 
                                                            fontWeight: 700, 
                                                            mb: 1,
                                                            color: '#1a202c',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            fontSize: '1rem', // Slightly larger since we have more space
                                                            lineHeight: 1.3
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Typography>

                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            color: '#64748b', 
                                                            mb: 1.5,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2, // Increased from 1 to 2 lines
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            lineHeight: 1.4,
                                                            fontSize: '0.875rem' // Slightly larger
                                                        }}
                                                    >
                                                        {product.description}
                                                    </Typography>

                                                    <Box sx={{ mb: 2 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#059669', fontSize: '1.1rem' }}>
                                                                {formatPrice(product.price)}
                                                            </Typography>
                                                            <Typography 
                                                                variant="caption" 
                                                                sx={{ 
                                                                    textDecoration: 'line-through', 
                                                                    color: '#94a3b8',
                                                                    fontSize: '0.75rem'
                                                                }}
                                                            >
                                                                {formatPrice(originalPrice)}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="caption" sx={{ color: '#059669', fontWeight: 600, fontSize: '0.7rem' }}>
                                                            Save {formatPrice(originalPrice - product.price)}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                        <Box sx={{
                                                            width: 6,
                                                            height: 6,
                                                            borderRadius: '50%',
                                                            bgcolor: product.stock > 10 ? '#10b981' : product.stock > 0 ? '#f59e0b' : '#ef4444',
                                                            mr: 0.5
                                                        }} />
                                                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                                                            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Limited Stock' : 'Out of Stock'}
                                                        </Typography>
                                                    </Box>

                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            handleProductNavigation(product);
                                                        }}
                                                        size="medium" // Changed from small to medium
                                                        sx={{
                                                            py: 1.2, // Increased padding
                                                            borderRadius: 2,
                                                            fontWeight: 700,
                                                            fontSize: '0.8rem', // Slightly larger text
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            '&:hover': {
                                                                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 6px 15px rgba(102, 126, 234, 0.3)'
                                                            },
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                        startIcon={<ShoppingBag sx={{ fontSize: '18px !important' }} />}
                                                    >
                                                        View Details
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Zoom>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : (
                        <Paper 
                            sx={{ 
                                p: 8, 
                                textAlign: 'center',
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                                border: '2px dashed #e2e8f0'
                            }}
                        >
                            <ShoppingBag sx={{ fontSize: 80, color: '#cbd5e1', mb: 3 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#475569', mb: 2 }}>
                                No products found
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
                                {selectedCategory !== 'all' 
                                    ? `No products found in "${getSelectedCategoryName()}" category.`
                                    : 'We couldn\'t find any products matching your search criteria.'
                                }
                                {searchTerm && ` Try different keywords or browse our categories.`}
                            </Typography>
                            <Button 
                                variant="outlined" 
                                onClick={clearAllFilters}
                                sx={{ borderRadius: 3, px: 4 }}
                            >
                                Clear All Filters
                            </Button>
                        </Paper>
                    )}
                </Box>
            </Section>

            <Footer />
        </Box>
    );
};

export default ProductList;
