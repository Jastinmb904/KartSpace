// import React, { useState, useContext, useEffect } from 'react';
// import {
//     Box, Paper, Typography, Button, TextField, Modal,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     IconButton, FormControl, InputLabel, Select, MenuItem,
//     Grid, CircularProgress, Chip, Avatar, AvatarGroup, Collapse,
//     Accordion, AccordionSummary, AccordionDetails
// } from '@mui/material';
// import { 
//     Add as AddIcon, 
//     Edit as EditIcon, 
//     Delete as DeleteIcon,
//     ExpandMore as ExpandMoreIcon,
//     Visibility as ViewIcon,
//     Image as ImageIcon
// } from '@mui/icons-material';
// import { VendorContext } from '../Context/Context';
// import Swal from 'sweetalert2';
// import {config} from '../Config/Config';

// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '80%',
//     maxWidth: 700,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 2,
//     maxHeight: '90vh',
//     overflow: 'auto'
// };

// const Products = () => {
//     const { 
//         products, 
//         getProducts, 
//         addProduct, 
//         updateProduct, 
//         deleteProduct, 
//         getCategories,
//         loading 
//     } = useContext(VendorContext);
//     const {host} = config;
    
//     const [openModal, setOpenModal] = useState(false);
//     const [modalMode, setModalMode] = useState('add');
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [submitting, setSubmitting] = useState(false);
//     const [expandedRows, setExpandedRows] = useState({});
//     const [viewImagesModal, setViewImagesModal] = useState(false);
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         stock: '',
//         status: 'active',
//         specifications: {
//             brand: '',
//             model: '',
//             color: '',
//             size: '',
//             weight: '',
//             material: '',
//             warranty: '',
//             features: '',
//             dimensions: '',
//             manufacturer: ''
//         },
//         images: []
//     });

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             await getProducts();
//             const response = await getCategories();
//             if (response && response.success) {
//                 setCategories(response.categories || []);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             Swal.fire('Error', 'Failed to load data', 'error');
//         }
//     };

//     const resetFormData = () => ({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         stock: '',
//         status: 'active',
//         specifications: {
//             brand: '',
//             model: '',
//             color: '',
//             size: '',
//             weight: '',
//             material: '',
//             warranty: '',
//             features: '',
//             dimensions: '',
//             manufacturer: ''
//         },
//         images: []
//     });

//     const handleOpenModal = (mode, product = null) => {
//         setModalMode(mode);
//         if (product) {
//             setSelectedProduct(product);
//             setFormData({
//                 name: product.name || '',
//                 description: product.description || '',
//                 price: product.price || '',
//                 category: product.category?._id || '',
//                 stock: product.stock || '',
//                 status: product.status || 'active',
//                 specifications: {
//                     brand: product.specifications?.brand || '',
//                     model: product.specifications?.model || '',
//                     color: product.specifications?.color || '',
//                     size: product.specifications?.size || '',
//                     weight: product.specifications?.weight || '',
//                     material: product.specifications?.material || '',
//                     warranty: product.specifications?.warranty || '',
//                     features: product.specifications?.features || '',
//                     dimensions: product.specifications?.dimensions || '',
//                     manufacturer: product.specifications?.manufacturer || ''
//                 },
//                 images: []
//             });
//         } else {
//             setSelectedProduct(null);
//             setFormData(resetFormData());
//         }
//         setOpenModal(true);
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//         setSelectedProduct(null);
//         setFormData(resetFormData());
//         setSubmitting(false);
//     };

//     const handleInputChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const handleSpecificationChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             specifications: {
//                 ...prev.specifications,
//                 [field]: value
//             }
//         }));
//     };

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setFormData(prev => ({ ...prev, images: files }));
//     };

//     const validateForm = () => {
//         const errors = [];
        
//         if (!formData.name.trim()) errors.push('Product name is required');
//         if (!formData.description.trim()) errors.push('Description is required');
//         if (!formData.price || parseFloat(formData.price) <= 0) errors.push('Valid price is required');
//         if (!formData.category) errors.push('Category is required');
//         if (!formData.stock || parseInt(formData.stock) < 0) errors.push('Valid stock quantity is required');
//         if (modalMode === 'add' && formData.images.length === 0) errors.push('At least one image is required');
        
//         if (errors.length > 0) {
//             Swal.fire({
//                 title: 'Validation Error',
//                 html: errors.join('<br>'),
//                 icon: 'error'
//             });
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
        
//         try {
//             const updateData = {
//                 name: formData.name,
//                 description: formData.description,
//                 price: formData.price,
//                 category: formData.category,
//                 stock: formData.stock,
//                 status: formData.status,
//                 specifications: formData.specifications,
//                 images: formData.images
//             };

//             if (modalMode === 'add') {
//                 await addProduct(updateData);
//                 Swal.fire('Success', 'Product added successfully', 'success');
//             } else {
//                 await updateProduct(selectedProduct._id, updateData);
//                 Swal.fire('Success', 'Product updated successfully', 'success');
//             }
            
//             handleCloseModal();
//             await fetchData();
//         } catch (error) {
//             console.error('Operation failed:', error);
//             Swal.fire(
//                 'Error',
//                 error.response?.data?.message || `Failed to ${modalMode} product`,
//                 'error'
//             );
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             const result = await Swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, delete it!'
//             });

//             if (result.isConfirmed) {
//                 const deleteResult = await deleteProduct(id);
//                 if (deleteResult && deleteResult.success) {
//                     await fetchData();
//                     Swal.fire('Deleted!', 'Product has been deleted.', 'success');
//                 } else {
//                     throw new Error(deleteResult?.message || 'Delete failed');
//                 }
//             }
//         } catch (error) {
//             console.error('Delete error:', error);
//             Swal.fire('Error', 'Failed to delete product', 'error');
//         }
//     };

//     const toggleRowExpansion = (productId) => {
//         setExpandedRows(prev => ({
//             ...prev,
//             [productId]: !prev[productId]
//         }));
//     };

//     const handleViewImages = (images) => {
//         setSelectedImages(images || []);
//         setViewImagesModal(true);
//     };

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'INR'
//         }).format(price || 0);
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     const renderSpecifications = (specs) => {
//         if (!specs) return 'N/A';
        
//         const specEntries = Object.entries(specs).filter(([key, value]) => 
//             value && key !== '_id' && key !== '__v'
//         );
        
//         if (specEntries.length === 0) return 'N/A';
        
//         return (
//             <Box sx={{ maxWidth: 300 }}>
//                 {specEntries.slice(0, 3).map(([key, value]) => (
//                     <Chip
//                         key={key}
//                         label={`${key}: ${value}`}
//                         size="small"
//                         variant="outlined"
//                         sx={{ m: 0.25, fontSize: '0.7rem' }}
//                     />
//                 ))}
//                 {specEntries.length > 3 && (
//                     <Typography variant="caption" color="textSecondary">
//                         ...and {specEntries.length - 3} more
//                     </Typography>
//                 )}
//             </Box>
//         );
//     };

//     const renderExpandedDetails = (product) => (
//         <Box sx={{ p: 2, bgcolor: 'grey', borderRadius: 1,color:'white',fontWeight:'bold' }}>
//             <Grid container spacing={3}>
//                 {/* Product Info */}
//                 <Grid item xs={12} md={4}>
//                     <Typography variant="h6" gutterBottom color="primary">
//                         Product Information
//                     </Typography>
//                     <Typography variant="body2" gutterBottom>
//                         <strong>Description:</strong> {product.description}
//                     </Typography>
//                     <Typography variant="body2" gutterBottom>
//                         <strong>Created:</strong> {formatDate(product.createdAt)}
//                     </Typography>
//                     <Typography variant="body2">
//                         <strong>Updated:</strong> {formatDate(product.updatedAt)}
//                     </Typography>
//                 </Grid>

//                 {/* Images */}
//                 <Grid item xs={12} md={4}>
//                     <Typography variant="h6" gutterBottom color="primary">
//                         Images ({product.images?.length || 0})
//                     </Typography>
//                     {product.images && product.images.length > 0 ? (
//                         <Box>
//                             <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
//                                 {product.images.map((image, index) => (
//                                     <Avatar
//                                         key={index}
//                                         src={`${host}/uploads/products/${image}`}
//                                         sx={{ width: 40, height: 40 }}
//                                     >
//                                         <ImageIcon />
//                                     </Avatar>
//                                 ))}
//                             </AvatarGroup>
//                             <Button
//                                 size="small"
//                                 variant="outlined"
//                                 onClick={() => handleViewImages(product.images)}
//                                 sx={{ mt: 1 }}
//                                 startIcon={<ViewIcon />}
//                             >
//                                 View All
//                             </Button>
//                         </Box>
//                     ) : (
//                         <Typography variant="body2" color="textSecondary">
//                             No images available
//                         </Typography>
//                     )}
//                 </Grid>

//                 {/* Specifications */}
//                 <Grid item xs={12} md={4}>
//                     <Typography variant="h6" gutterBottom color="primary">
//                         Specifications
//                     </Typography>
//                     {product.specifications ? (
//                         <Box>
//                             {Object.entries(product.specifications)
//                                 .filter(([key, value]) => value && key !== '_id' && key !== '__v')
//                                 .map(([key, value]) => (
//                                     <Typography key={key} variant="body2" gutterBottom>
//                                         <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
//                                     </Typography>
//                                 ))
//                             }
//                         </Box>
//                     ) : (
//                         <Typography variant="body2" color="textSecondary">
//                             No specifications available
//                         </Typography>
//                     )}
//                 </Grid>
//             </Grid>
//         </Box>
//     );

//     return (
//         <Box sx={{ p: { xs: 2, sm: 3 } }}>
//             <Paper elevation={2} sx={{
//                 p: 3,
//                 mb: 3,
//                 borderRadius: 2,
//                 background: 'linear-gradient(135deg, #1976d2, #64b5f6)',
//                 color: 'white'
//             }}>
//                 <Typography variant="h5" fontWeight="bold">
//                     Products Management
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     Manage your product inventory
//                 </Typography>
//             </Paper>

//             <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => handleOpenModal('add')}
//                 sx={{ mb: 3 }}
//                 disabled={loading}
//             >
//                 Add New Product
//             </Button>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell width="30px"></TableCell>
//                             <TableCell>Product Details</TableCell>
//                             <TableCell>Category</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Stock</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Images</TableCell>
//                             <TableCell>Specifications</TableCell>
//                             <TableCell align="right">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={9} align="center">
//                                     <CircularProgress size={24} />
//                                     <Typography sx={{ ml: 1 }}>Loading...</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : !products || products.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={9} align="center">
//                                     <Typography color="textSecondary">
//                                         No products found
//                                     </Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             products.map((product) => (
//                                 <React.Fragment key={product._id}>
//                                     <TableRow>
//                                         <TableCell>
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={() => toggleRowExpansion(product._id)}
//                                             >
//                                                 <ExpandMoreIcon 
//                                                     sx={{
//                                                         transform: expandedRows[product._id] 
//                                                             ? 'rotate(180deg)' 
//                                                             : 'rotate(0deg)',
//                                                         transition: 'transform 0.3s'
//                                                     }}
//                                                 />
//                                             </IconButton>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Box>
//                                                 <Typography variant="body2" fontWeight="medium">
//                                                     {product.name}
//                                                 </Typography>
//                                                 <Typography variant="caption" display="block" color="textSecondary">
//                                                     {product.description?.slice(0, 50)}
//                                                     {product.description?.length > 50 ? '...' : ''}
//                                                 </Typography>
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>{product.category?.name || 'N/A'}</TableCell>
//                                         <TableCell>
//                                             <Typography variant="body2" fontWeight="medium">
//                                                 {formatPrice(product.price)}
//                                             </Typography>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Typography
//                                                 color={product.stock > 0 ? 'text.primary' : 'error.main'}
//                                                 fontWeight="medium"
//                                             >
//                                                 {product.stock}
//                                             </Typography>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Chip
//                                                 label={product.status?.toUpperCase()}
//                                                 color={product.status === 'active' ? 'success' : 'error'}
//                                                 size="small"
//                                                 variant="outlined"
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             {product.images && product.images.length > 0 ? (
//                                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                                     <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 30, height: 30 } }}>
//                                                         {product.images.slice(0, 3).map((image, index) => (
//                                                             <Avatar
//                                                                 key={index}
//                                                                 src={`${host}/uploads/products/${image}`}
//                                                                 sx={{ width: 30, height: 30 }}
//                                                             >
//                                                                 <ImageIcon fontSize="small" />
//                                                             </Avatar>
//                                                         ))}
//                                                     </AvatarGroup>
//                                                     <Typography variant="caption">
//                                                         ({product.images.length})
//                                                     </Typography>
//                                                 </Box>
//                                             ) : (
//                                                 <Typography variant="caption" color="textSecondary">
//                                                     No images
//                                                 </Typography>
//                                             )}
//                                         </TableCell>
//                                         <TableCell>
//                                             {renderSpecifications(product.specifications)}
//                                         </TableCell>
//                                         <TableCell align="right">
//                                             <IconButton
//                                                 color="primary"
//                                                 onClick={() => handleOpenModal('edit', product)}
//                                                 size="small"
//                                             >
//                                                 <EditIcon sx={{color:'orange'}}/>
//                                             </IconButton>
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={() => handleDelete(product._id)}
//                                                 size="small"
//                                             >
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell colSpan={9} sx={{ p: 0 }}>
//                                             <Collapse in={expandedRows[product._id]} timeout="auto" unmountOnExit>
//                                                 {renderExpandedDetails(product)}
//                                             </Collapse>
//                                         </TableCell>
//                                     </TableRow>
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Image Viewer Modal */}
//             <Modal
//                 open={viewImagesModal}
//                 onClose={() => setViewImagesModal(false)}
//             >
//                 <Box sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: '80%',
//                     maxWidth: 800,
//                     bgcolor: 'background.paper',
//                     boxShadow: 24,
//                     p: 4,
//                     borderRadius: 2,
//                     maxHeight: '90vh',
//                     overflow: 'auto'
//                 }}>
//                     <Typography variant="h6" mb={2}>
//                         Product Images ({selectedImages.length})
//                     </Typography>
//                     <Grid container spacing={2}>
//                         {selectedImages.map((image, index) => (
//                             <Grid item xs={12} sm={6} md={4} key={index}>
//                                 <Box
//                                     component="img"
//                                     src={`${host}/uploads/products/${image}`}
//                                     alt={`Product image ${index + 1}`}
//                                     sx={{
//                                         width: '100%',
//                                         height: 200,
//                                         objectFit: 'cover',
//                                         borderRadius: 1,
//                                         border: '1px solid',
//                                         borderColor: 'grey.300'
//                                     }}
//                                 />
//                                 <Typography variant="caption" display="block" textAlign="center" mt={1}>
//                                     {image}
//                                 </Typography>
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
//                         <Button onClick={() => setViewImagesModal(false)}>
//                             Close
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>

//             {/* Add/Edit Product Modal */}
//             <Modal
//                 open={openModal}
//                 onClose={handleCloseModal}
//                 disableEscapeKeyDown={submitting}
//             >
//                 <Box sx={modalStyle}>
//                     <Typography variant="h6" component="h2" mb={3}>
//                         {modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
//                     </Typography>
//                     <form onSubmit={handleSubmit}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="Product Name"
//                                     value={formData.name}
//                                     onChange={(e) => handleInputChange('name', e.target.value)}
//                                     required
//                                     disabled={submitting}
//                                     error={!formData.name.trim()}
//                                     helperText={!formData.name.trim() ? 'Product name is required' : ''}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <FormControl fullWidth required error={!formData.category}>
//                                     <InputLabel>Category</InputLabel>
//                                     <Select
//                                         value={formData.category}
//                                         onChange={(e) => handleInputChange('category', e.target.value)}
//                                         disabled={submitting}
//                                         label="Category"
//                                     >
//                                         {categories.map((category) => (
//                                             <MenuItem key={category._id} value={category._id}>
//                                                 {category.name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                     {!formData.category && (
//                                         <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
//                                             Category is required
//                                         </Typography>
//                                     )}
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     fullWidth
//                                     type="number"
//                                     label="Price"
//                                     value={formData.price}
//                                     onChange={(e) => handleInputChange('price', e.target.value)}
//                                     required
//                                     disabled={submitting}
//                                     inputProps={{ min: 0, step: 0.01 }}
//                                     error={!formData.price || parseFloat(formData.price) <= 0}
//                                     helperText={!formData.price || parseFloat(formData.price) <= 0 ? 'Valid price is required' : ''}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     fullWidth
//                                     type="number"
//                                     label="Stock"
//                                     value={formData.stock}
//                                     onChange={(e) => handleInputChange('stock', e.target.value)}
//                                     required
//                                     disabled={submitting}
//                                     inputProps={{ min: 0 }}
//                                     error={!formData.stock || parseInt(formData.stock) < 0}
//                                     helperText={!formData.stock || parseInt(formData.stock) < 0 ? 'Valid stock quantity is required' : ''}
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     multiline
//                                     rows={4}
//                                     label="Description"
//                                     value={formData.description}
//                                     onChange={(e) => handleInputChange('description', e.target.value)}
//                                     required
//                                     disabled={submitting}
//                                     error={!formData.description.trim()}
//                                     helperText={!formData.description.trim() ? 'Description is required' : ''}
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <input
//                                     accept="image/*"
//                                     type="file"
//                                     multiple
//                                     onChange={handleImageChange}
//                                     style={{ display: 'none' }}
//                                     id="image-upload"
//                                     disabled={submitting}
//                                 />
//                                 <label htmlFor="image-upload">
//                                     <Button 
//                                         variant="outlined" 
//                                         component="span"
//                                         disabled={submitting}
//                                         sx={{color:'white',
//                                             backgroundColor: 'blue',
//                                         }}
//                                     >
//                                         Upload Images
//                                     </Button>
//                                 </label>
//                                 {formData.images.length > 0 && (
//                                     <Typography variant="caption" display="block" sx={{ mt: 1 }}>
//                                         {formData.images.length} file(s) selected
//                                     </Typography>
//                                 )}
//                             </Grid>
                            
//                             {/* Specifications Section */}
//                             <Grid item xs={12}>
//                                 <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                                     Specifications
//                                 </Typography>
//                                 <Grid container spacing={2}>
//                                     {Object.entries(formData.specifications).map(([key, value]) => (
//                                         <Grid item xs={12} sm={6} key={key}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={key.charAt(0).toUpperCase() + key.slice(1)}
//                                                 value={value}
//                                                 onChange={(e) => handleSpecificationChange(key, e.target.value)}
//                                                 disabled={submitting}
//                                                 multiline={key === 'features'}
//                                                 rows={key === 'features' ? 3 : 1}
//                                             />
//                                         </Grid>
//                                     ))}
//                                 </Grid>
//                             </Grid>
                            
//                             <Grid item xs={12}>
//                                 <FormControl fullWidth>
//                                     <InputLabel>Status</InputLabel>
//                                     <Select
//                                         value={formData.status}
//                                         onChange={(e) => handleInputChange('status', e.target.value)}
//                                         disabled={submitting}
//                                         label="Status"
//                                     >
//                                         <MenuItem value="active">Active</MenuItem>
//                                         <MenuItem value="inactive">Inactive</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Grid>
//                         </Grid>
                        
//                         <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                             <Button 
//                                 onClick={handleCloseModal}
//                                 disabled={submitting}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button 
//                                 type="submit" 
//                                 variant="contained"
//                                 disabled={submitting}
//                                 startIcon={submitting ? <CircularProgress size={20} /> : null}
//                             >
//                                 {submitting 
//                                     ? 'Processing...' 
//                                     : modalMode === 'add' ? 'Add Product' : 'Update Product'
//                                 }
//                             </Button>
//                         </Box>
//                     </form>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default Products;



import React, { useState, useContext, useEffect, useMemo, memo } from 'react';
import {
    Box, Paper, Typography, Button, TextField, Modal,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, FormControl, InputLabel, Select, MenuItem,
    Grid, CircularProgress, Chip, Avatar, AvatarGroup, Collapse,
    Card, CardContent, useTheme, useMediaQuery, Fade, Slide, Tooltip
} from '@mui/material';
import { 
    Add as AddIcon, 
    Edit as EditIcon, 
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    Visibility as ViewIcon,
    Image as ImageIcon,
    Store,
    LocalMall,
    CardGiftcard,
    ShoppingCart,
    Inventory
} from '@mui/icons-material';
import { VendorContext } from '../Context/Context';
import { tokens } from '../theme';
import Swal from 'sweetalert2';
import { config } from '../Config/Config';

// Enhanced Modal Style
const getModalStyle = (themeColors, isDarkMode) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 900,
    background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
    backdropFilter: 'blur(15px)',
    boxShadow: isDarkMode 
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
        : '0 25px 50px rgba(139, 92, 246, 0.2)',
    border: `2px solid ${themeColors.border.default}`,
    borderRadius: 4,
    p: 4,
    maxHeight: '95vh',
    overflow: 'auto',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
        borderRadius: '16px 16px 0 0',
        animation: 'shimmer 2s ease-in-out infinite',
    },
    '@keyframes shimmer': {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' }
    },
    // Hide scrollbar
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
});

// Enhanced TextField Component
const EnhancedTextField = memo(({ themeColors, isDarkMode, colors, ...props }) => {
    const [fieldHovered, setFieldHovered] = useState(false);
    const [fieldFocused, setFieldFocused] = useState(false);
    
    return (
        <Box 
            position="relative"
            onMouseEnter={() => setFieldHovered(true)}
            onMouseLeave={() => setFieldHovered(false)}
        >
            <TextField
                {...props}
                onFocus={(e) => {
                    setFieldFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFieldFocused(false);
                    props.onBlur?.(e);
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: fieldHovered || fieldFocused ? 'scale(1.01)' : 'scale(1)',
                        boxShadow: fieldHovered || fieldFocused
                            ? isDarkMode
                                ? `0 7px 22px ${colors.primary[900]}35`
                                : '0 7px 22px rgba(139, 92, 246, 0.12)'
                            : isDarkMode
                                ? `0 4px 12px ${colors.primary[900]}25`
                                : '0 4px 12px rgba(167, 139, 250, 0.09)',
                        '& fieldset': {
                            border: `2px solid ${fieldFocused ? themeColors.primary : fieldHovered ? themeColors.border.hover : themeColors.border.default}`,
                            transition: 'all 0.3s ease',
                        },
                        '&:hover fieldset': {
                            border: `2px solid ${themeColors.border.hover}`,
                        },
                        '&.Mui-focused fieldset': {
                            border: `2px solid ${themeColors.primary}`,
                            boxShadow: `0 0 0 3px ${themeColors.primary}20`,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: themeColors.text.secondary,
                        fontWeight: 500,
                        '&.Mui-focused': {
                            color: themeColors.primary,
                            fontWeight: 600,
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        color: themeColors.text.primary,
                        fontWeight: 500,
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    },
                    '& .MuiInputBase-multiline': {
                        '& textarea': {
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        },
                    },
                    ...props.sx
                }}
            />
        </Box>
    );
});

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isDarkMode = theme.palette.mode === 'dark';

    const { 
        products, 
        getProducts, 
        addProduct, 
        updateProduct, 
        deleteProduct, 
        getCategories,
        loading 
    } = useContext(VendorContext);
    const { host } = config;
    
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});
    const [viewImagesModal, setViewImagesModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isHovered, setIsHovered] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        status: 'active',
        specifications: {
            brand: '',
            model: '',
            color: '',
            size: '',
            weight: '',
            material: '',
            warranty: '',
            features: '',
            dimensions: '',
            manufacturer: ''
        },
        images: []
    });

    // Shopping icons for background animation (only in light mode)
    const shoppingIcons = [
        { Icon: ShoppingCart, delay: '0s', duration: '12s', x: '8%', y: '15%' },
        { Icon: Store, delay: '3s', duration: '15s', x: '85%', y: '25%' },
        { Icon: LocalMall, delay: '1s', duration: '18s', x: '10%', y: '70%' },
        { Icon: Inventory, delay: '4s', duration: '14s', x: '80%', y: '65%' },
        { Icon: CardGiftcard, delay: '6s', duration: '16s', x: '15%', y: '45%' },
    ];

    // Define consistent color scheme matching Dashboard
    const themeColors = useMemo(() => ({
        primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
        primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
        primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
        text: {
            primary: isDarkMode ? colors.gray[100] : '#1f2937',
            secondary: isDarkMode ? colors.gray[300] : '#6b7280',
            accent: isDarkMode ? colors.gray[200] : '#374151',
        },
        background: {
            primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
            secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
            hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
        },
        border: {
            default: isDarkMode ? colors.primary[600] : '#a78bfa',
            hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
        },
        success: isDarkMode ? colors.greenAccent[500] : '#10b981',
        warning: isDarkMode ? '#fbbf24' : '#f59e0b',
        error: isDarkMode ? colors.redAccent[500] : '#ef4444',
        info: isDarkMode ? colors.blueAccent[500] : '#3b82f6',
    }), [isDarkMode, colors]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await getProducts();
            const response = await getCategories();
            if (response && response.success) {
                setCategories(response.categories || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire('Error', 'Failed to load data', 'error');
        }
    };

    const resetFormData = () => ({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        status: 'active',
        specifications: {
            brand: '',
            model: '',
            color: '',
            size: '',
            weight: '',
            material: '',
            warranty: '',
            features: '',
            dimensions: '',
            manufacturer: ''
        },
        images: []
    });

    const handleOpenModal = (mode, product = null) => {
        setModalMode(mode);
        if (product) {
            setSelectedProduct(product);
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                category: product.category?._id || '',
                stock: product.stock || '',
                status: product.status || 'active',
                specifications: {
                    brand: product.specifications?.brand || '',
                    model: product.specifications?.model || '',
                    color: product.specifications?.color || '',
                    size: product.specifications?.size || '',
                    weight: product.specifications?.weight || '',
                    material: product.specifications?.material || '',
                    warranty: product.specifications?.warranty || '',
                    features: product.specifications?.features || '',
                    dimensions: product.specifications?.dimensions || '',
                    manufacturer: product.specifications?.manufacturer || ''
                },
                images: []
            });
        } else {
            setSelectedProduct(null);
            setFormData(resetFormData());
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
        setFormData(resetFormData());
        setSubmitting(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSpecificationChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            specifications: {
                ...prev.specifications,
                [field]: value
            }
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({ ...prev, images: files }));
    };

    const validateForm = () => {
        const errors = [];
        
        if (!formData.name.trim()) errors.push('Product name is required');
        if (!formData.description.trim()) errors.push('Description is required');
        if (!formData.price || parseFloat(formData.price) <= 0) errors.push('Valid price is required');
        if (!formData.category) errors.push('Category is required');
        if (!formData.stock || parseInt(formData.stock) < 0) errors.push('Valid stock quantity is required');
        if (modalMode === 'add' && formData.images.length === 0) errors.push('At least one image is required');
        
        if (errors.length > 0) {
            Swal.fire({
                title: 'Validation Error',
                html: errors.join('<br>'),
                icon: 'error'
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        try {
            setSubmitting(true);
            const updateData = {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                category: formData.category,
                stock: formData.stock,
                status: formData.status,
                specifications: formData.specifications,
                images: formData.images
            };

            if (modalMode === 'add') {
                await addProduct(updateData);
                Swal.fire('Success', 'Product added successfully', 'success');
            } else {
                await updateProduct(selectedProduct._id, updateData);
                Swal.fire('Success', 'Product updated successfully', 'success');
            }
            
            handleCloseModal();
            await fetchData();
        } catch (error) {
            console.error('Operation failed:', error);
            Swal.fire(
                'Error',
                error.response?.data?.message || `Failed to ${modalMode} product`,
                'error'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: themeColors.primary,
                cancelButtonColor: themeColors.error,
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const deleteResult = await deleteProduct(id);
                if (deleteResult && deleteResult.success) {
                    await fetchData();
                    Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                } else {
                    throw new Error(deleteResult?.message || 'Delete failed');
                }
            }
        } catch (error) {
            console.error('Delete error:', error);
            Swal.fire('Error', 'Failed to delete product', 'error');
        }
    };

    const toggleRowExpansion = (productId) => {
        setExpandedRows(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const handleViewImages = (images) => {
        setSelectedImages(images || []);
        setViewImagesModal(true);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price || 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderSpecifications = (specs) => {
        if (!specs) return 'N/A';
        
        const specEntries = Object.entries(specs).filter(([key, value]) => 
            value && key !== '_id' && key !== '__v'
        );
        
        if (specEntries.length === 0) return 'N/A';
        
        return (
            <Box sx={{ maxWidth: 300 }}>
                {specEntries.slice(0, 3).map(([key, value]) => (
                    <Chip
                        key={key}
                        label={`${key}: ${value}`}
                        size="small"
                        variant="outlined"
                        sx={{ 
                            m: 0.25, 
                            fontSize: '0.7rem',
                            backgroundColor: `${themeColors.primary}15`,
                            borderColor: `${themeColors.primary}30`,
                            color: themeColors.text.primary
                        }}
                    />
                ))}
                {specEntries.length > 3 && (
                    <Typography variant="caption" color={themeColors.text.secondary}>
                        ...and {specEntries.length - 3} more
                    </Typography>
                )}
            </Box>
        );
    };

    const renderExpandedDetails = (product) => (
        <Box sx={{ 
            p: 3, 
            background: `linear-gradient(135deg, ${themeColors.background.secondary} 0%, ${themeColors.background.primary} 100%)`,
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: `1px solid ${themeColors.border.default}`,
            m: 2
        }}>
            <Grid container spacing={3}>
                {/* Product Info */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom sx={{ color: themeColors.primary, fontWeight: 600 }}>
                        Product Information
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{ color: themeColors.text.primary }}>
                        <strong>Description:</strong> {product.description}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{ color: themeColors.text.primary }}>
                        <strong>Created:</strong> {formatDate(product.createdAt)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                        <strong>Updated:</strong> {formatDate(product.updatedAt)}
                    </Typography>
                </Grid>

                {/* Images */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom sx={{ color: themeColors.primary, fontWeight: 600 }}>
                        Images ({product.images?.length || 0})
                    </Typography>
                    {product.images && product.images.length > 0 ? (
                        <Box>
                            <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                                {product.images.map((image, index) => (
                                    <Avatar
                                        key={index}
                                        src={`${host}/uploads/products/${image}`}
                                        sx={{ 
                                            width: 40, 
                                            height: 40,
                                            border: `2px solid ${themeColors.primary}` 
                                        }}
                                    >
                                        <ImageIcon />
                                    </Avatar>
                                ))}
                            </AvatarGroup>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleViewImages(product.images)}
                                sx={{ 
                                    mt: 1,
                                    borderColor: themeColors.primary,
                                    color: themeColors.primary,
                                    '&:hover': {
                                        backgroundColor: `${themeColors.primary}15`,
                                        borderColor: themeColors.primaryDark
                                    }
                                }}
                                startIcon={<ViewIcon />}
                            >
                                View All
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant="body2" color={themeColors.text.secondary}>
                            No images available
                        </Typography>
                    )}
                </Grid>

                {/* Specifications */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom sx={{ color: themeColors.primary, fontWeight: 600 }}>
                        Specifications
                    </Typography>
                    {product.specifications ? (
                        <Box>
                            {Object.entries(product.specifications)
                                .filter(([key, value]) => value && key !== '_id' && key !== '__v')
                                .map(([key, value]) => (
                                    <Typography key={key} variant="body2" gutterBottom sx={{ color: themeColors.text.primary }}>
                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                    </Typography>
                                ))
                            }
                        </Box>
                    ) : (
                        <Typography variant="body2" color={themeColors.text.secondary}>
                            No specifications available
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box 
            sx={{
                m: "20px",
                position: 'relative',
                minHeight: '85vh',
                // Hide all scrollbars
                '& *': {
                    scrollbarWidth: 'none !important',
                    msOverflowStyle: 'none !important',
                    '&::-webkit-scrollbar': {
                        display: 'none !important',
                    },
                },
                '&::before': !isDarkMode && {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
                        linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
                    `,
                    zIndex: -2,
                    pointerEvents: 'none',
                },
                '@keyframes floatUpDown': {
                    '0%': { transform: 'translateY(0px) rotate(0deg)' },
                    '25%': { transform: 'translateY(-15px) rotate(5deg)' },
                    '50%': { transform: 'translateY(-30px) rotate(-3deg)' },
                    '75%': { transform: 'translateY(-15px) rotate(8deg)' },
                    '100%': { transform: 'translateY(0px) rotate(0deg)' }
                },
                '@keyframes floatLeftRight': {
                    '0%': { transform: 'translateX(0px) rotate(0deg)' },
                    '33%': { transform: 'translateX(20px) rotate(10deg)' },
                    '66%': { transform: 'translateX(-10px) rotate(-5deg)' },
                    '100%': { transform: 'translateX(0px) rotate(0deg)' }
                },
            }}
        >
            {/* Animated Background Icons (only in light mode) */}
            {!isDarkMode && shoppingIcons.map((item, index) => {
                const animationType = index % 2 === 0 ? 'floatUpDown' : 'floatLeftRight';
                
                return (
                    <item.Icon
                        key={index}
                        sx={{
                            position: 'fixed',
                            left: item.x,
                            top: item.y,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            color: 'rgba(139, 92, 246, 0.08)',
                            animation: `${animationType} ${item.duration} ease-in-out infinite`,
                            animationDelay: item.delay,
                            zIndex: -1,
                            pointerEvents: 'none',
                            filter: 'blur(0.5px)',
                        }}
                    />
                );
            })}

            {/* Header Section */}
            <Slide direction="down" in={true} timeout={800}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box>
                        <Typography 
                            variant="h2" 
                            color={themeColors.text.primary}
                            fontWeight="bold" 
                            sx={{ mb: "5px" }}
                        >
                            PRODUCTS MANAGEMENT
                        </Typography>
                        <Typography 
                            variant="h5" 
                            color={themeColors.primary}
                            fontWeight={500}
                        >
                            Manage your product inventory
                        </Typography>
                    </Box>
                </Box>
            </Slide>

            {/* Add Product Button */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Box mb={3}>
                    <Tooltip title="Add New Product">
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenModal('add')}
                            disabled={loading}
                            onMouseEnter={() => setIsHovered(prev => ({ ...prev, addBtn: true }))}
                            onMouseLeave={() => setIsHovered(prev => ({ ...prev, addBtn: false }))}
                            sx={{
                                backgroundColor: themeColors.primary,
                                borderRadius: 3,
                                py: 1.5,
                                px: 3,
                                fontWeight: 600,
                                textTransform: 'none',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                boxShadow: `0 4px 15px ${themeColors.primary}40`,
                                color: 'white',
                                transform: isHovered.addBtn ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                                '&::before': !isDarkMode && {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                    transition: 'left 0.6s',
                                },
                                '&:hover': { 
                                    backgroundColor: themeColors.primaryDark,
                                    boxShadow: `0 8px 25px ${themeColors.primaryDark}60`,
                                    '&::before': !isDarkMode && {
                                        left: '100%',
                                    },
                                },
                                '&:disabled': {
                                    backgroundColor: `${themeColors.primary}60`,
                                    color: 'rgba(255, 255, 255, 0.7)',
                                },
                            }}
                        >
                            Add New Product
                        </Button>
                    </Tooltip>
                </Box>
            </Fade>

            {/* Products Table */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
                <Card
                    onMouseEnter={() => setIsHovered(prev => ({ ...prev, table: true }))}
                    onMouseLeave={() => setIsHovered(prev => ({ ...prev, table: false }))}
                    sx={{
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${isHovered.table ? themeColors.border.hover : themeColors.border.default}`,
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        transform: isHovered.table ? 'translateY(-4px)' : 'translateY(0)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        boxShadow: isHovered.table 
                            ? isDarkMode
                                ? `0 20px 40px -12px ${colors.primary[900]}60`
                                : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
                            : isDarkMode
                                ? undefined
                                : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
                            radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
                        `,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
                            animation: 'shimmer 2s ease-in-out infinite',
                        },
                        '@keyframes shimmer': {
                            '0%': { backgroundPosition: '-200% 0' },
                            '100%': { backgroundPosition: '200% 0' }
                        }
                    }}
                >
                    <TableContainer sx={{ 
                        maxHeight: 'calc(100vh - 300px)',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="30px" sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}></TableCell>
                                    <TableCell sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Product Details</TableCell>
                                    <TableCell sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Category</TableCell>
                                    <TableCell sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Price</TableCell>
                                    <TableCell sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Stock</TableCell>
                                    <TableCell sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Status</TableCell>
                                    <TableCell sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Images</TableCell>
                                    <TableCell sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Specifications</TableCell>
                                    <TableCell align="right" sx={{ 
                                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                        color: themeColors.text.primary,
                                        fontWeight: 600,
                                        borderBottom: `2px solid ${themeColors.border.default}`
                                    }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                                <CircularProgress size={24} sx={{ color: themeColors.primary }} />
                                                <Typography sx={{ color: themeColors.text.primary }}>Loading products...</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : !products || products.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                            <Box display="flex" flex-direction="column" alignItems="center" gap={2}>
                                                <Inventory sx={{ fontSize: 48, color: themeColors.text.secondary, opacity: 0.5 }} />
                                                <Typography color={themeColors.text.secondary}>
                                                    No products found. Add your first product to get started!
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    products.map((product, index) => (
                                        <React.Fragment key={product._id}>
                                            <TableRow 
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: themeColors.background.hover,
                                                    },
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                            >
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => toggleRowExpansion(product._id)}
                                                        sx={{
                                                            color: themeColors.primary,
                                                            '&:hover': {
                                                                backgroundColor: `${themeColors.primary}15`
                                                            }
                                                        }}
                                                    >
                                                        <ExpandMoreIcon 
                                                            sx={{
                                                                transform: expandedRows[product._id] 
                                                                    ? 'rotate(180deg)' 
                                                                    : 'rotate(0deg)',
                                                                transition: 'transform 0.3s'
                                                            }}
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight="medium" sx={{ color: themeColors.text.primary }}>
                                                            {product.name}
                                                        </Typography>
                                                        <Typography variant="caption" display="block" color={themeColors.text.secondary}>
                                                            {product.description?.slice(0, 50)}
                                                            {product.description?.length > 50 ? '...' : ''}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ color: themeColors.text.primary }}>
                                                    {product.category?.name || 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight="medium" sx={{ color: themeColors.success }}>
                                                        {formatPrice(product.price)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        color={product.stock > 0 ? themeColors.success : themeColors.error}
                                                        fontWeight="medium"
                                                    >
                                                        {product.stock}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={product.status?.toUpperCase()}
                                                        color={product.status === 'active' ? 'success' : 'error'}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            backgroundColor: product.status === 'active' 
                                                                ? `${themeColors.success}15` 
                                                                : `${themeColors.error}15`,
                                                            borderColor: product.status === 'active' 
                                                                ? themeColors.success 
                                                                : themeColors.error,
                                                            color: product.status === 'active' 
                                                                ? themeColors.success 
                                                                : themeColors.error
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {product.images && product.images.length > 0 ? (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 30, height: 30, border: `2px solid ${themeColors.primary}` } }}>
                                                                {product.images.slice(0, 3).map((image, imgIndex) => (
                                                                    <Avatar
                                                                        key={imgIndex}
                                                                        src={`${host}/uploads/products/${image}`}
                                                                        sx={{ width: 30, height: 30 }}
                                                                    >
                                                                        <ImageIcon fontSize="small" />
                                                                    </Avatar>
                                                                ))}
                                                            </AvatarGroup>
                                                            <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                                                                ({product.images.length})
                                                            </Typography>
                                                        </Box>
                                                    ) : (
                                                        <Typography variant="caption" color={themeColors.text.secondary}>
                                                            No images
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {renderSpecifications(product.specifications)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box display="flex" gap={1} justifyContent="flex-end">
                                                        <Tooltip title="Edit Product">
                                                            <IconButton
                                                                onClick={() => handleOpenModal('edit', product)}
                                                                size="small"
                                                                sx={{
                                                                    color: themeColors.warning,
                                                                    '&:hover': {
                                                                        backgroundColor: `${themeColors.warning}15`,
                                                                        transform: 'scale(1.1)'
                                                                    },
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete Product">
                                                            <IconButton
                                                                onClick={() => handleDelete(product._id)}
                                                                size="small"
                                                                sx={{
                                                                    color: themeColors.error,
                                                                    '&:hover': {
                                                                        backgroundColor: `${themeColors.error}15`,
                                                                        transform: 'scale(1.1)'
                                                                    },
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={9} sx={{ p: 0, border: 'none' }}>
                                                    <Collapse in={expandedRows[product._id]} timeout="auto" unmountOnExit>
                                                        {renderExpandedDetails(product)}
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Fade>

            {/* Image Viewer Modal */}
            <Modal
                open={viewImagesModal}
                onClose={() => setViewImagesModal(false)}
            >
                <Box sx={getModalStyle(themeColors, isDarkMode)}>
                    <Typography variant="h6" mb={2} sx={{ color: themeColors.text.primary, fontWeight: 600 }}>
                        Product Images ({selectedImages.length})
                    </Typography>
                    <Grid container spacing={2}>
                        {selectedImages.map((image, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    component="img"
                                    src={`${host}/uploads/products/${image}`}
                                    alt={`Product image ${index + 1}`}
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        border: `2px solid ${themeColors.border.default}`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            border: `2px solid ${themeColors.primary}`
                                        }
                                    }}
                                />
                                <Typography variant="caption" display="block" textAlign="center" mt={1} sx={{ color: themeColors.text.secondary }}>
                                    {image}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button 
                            onClick={() => setViewImagesModal(false)}
                            sx={{
                                color: themeColors.primary,
                                borderColor: themeColors.primary,
                                '&:hover': {
                                    backgroundColor: `${themeColors.primary}15`
                                }
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Add/Edit Product Modal */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                disableEscapeKeyDown={submitting}
            >
                <Box sx={getModalStyle(themeColors, isDarkMode)}>
                    <Typography variant="h5" component="h2" mb={3} sx={{ color: themeColors.text.primary, fontWeight: 600 }}>
                        {modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <EnhancedTextField
                                    fullWidth
                                    label="Product Name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                    disabled={submitting}
                                    error={!formData.name.trim()}
                                    helperText={!formData.name.trim() ? 'Product name is required' : ''}
                                    themeColors={themeColors}
                                    isDarkMode={isDarkMode}
                                    colors={colors}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required error={!formData.category}>
                                    <InputLabel sx={{ color: themeColors.text.secondary }}>Category</InputLabel>
                                    <Select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        disabled={submitting}
                                        label="Category"
                                        sx={{
                                            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                            borderRadius: 3,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.border.default}`,
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.border.hover}`,
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.primary}`,
                                            },
                                            '& .MuiSelect-select': {
                                                color: themeColors.text.primary
                                            }
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {!formData.category && (
                                        <Typography variant="caption" color={themeColors.error} sx={{ ml: 2, mt: 0.5 }}>
                                            Category is required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <EnhancedTextField
                                    fullWidth
                                    type="number"
                                    label="Price (₹)"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    required
                                    disabled={submitting}
                                    inputProps={{ min: 0, step: 0.01 }}
                                    error={!formData.price || parseFloat(formData.price) <= 0}
                                    helperText={!formData.price || parseFloat(formData.price) <= 0 ? 'Valid price is required' : ''}
                                    themeColors={themeColors}
                                    isDarkMode={isDarkMode}
                                    colors={colors}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <EnhancedTextField
                                    fullWidth
                                    type="number"
                                    label="Stock Quantity"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange('stock', e.target.value)}
                                    required
                                    disabled={submitting}
                                    inputProps={{ min: 0 }}
                                    error={!formData.stock || parseInt(formData.stock) < 0}
                                    helperText={!formData.stock || parseInt(formData.stock) < 0 ? 'Valid stock quantity is required' : ''}
                                    themeColors={themeColors}
                                    isDarkMode={isDarkMode}
                                    colors={colors}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <EnhancedTextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Product Description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    required
                                    disabled={submitting}
                                    error={!formData.description.trim()}
                                    helperText={!formData.description.trim() ? 'Description is required' : ''}
                                    themeColors={themeColors}
                                    isDarkMode={isDarkMode}
                                    colors={colors}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        multiple
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                        disabled={submitting}
                                    />
                                    <label htmlFor="image-upload">
                                        <Button 
                                            variant="contained" 
                                            component="span"
                                            disabled={submitting}
                                            startIcon={<ImageIcon />}
                                            sx={{
                                                backgroundColor: themeColors.info,
                                                color: 'white',
                                                borderRadius: 3,
                                                px: 3,
                                                py: 1.5,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: themeColors.primary,
                                                    transform: 'scale(1.02)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Upload Product Images
                                        </Button>
                                    </label>
                                    {formData.images.length > 0 && (
                                        <Typography variant="body2" sx={{ mt: 1, color: themeColors.success }}>
                                            ✓ {formData.images.length} file(s) selected
                                        </Typography>
                                    )}
                                    {modalMode === 'add' && formData.images.length === 0 && (
                                        <Typography variant="caption" sx={{ mt: 1, color: themeColors.error, display: 'block' }}>
                                            At least one image is required for new products
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            
                            {/* Specifications Section */}
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 2, color: themeColors.primary, fontWeight: 600 }}>
                                    Product Specifications
                                </Typography>
                                <Grid container spacing={2}>
                                    {Object.entries(formData.specifications).map(([key, value]) => (
                                        <Grid item xs={12} sm={6} key={key}>
                                            <EnhancedTextField
                                                fullWidth
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                value={value}
                                                onChange={(e) => handleSpecificationChange(key, e.target.value)}
                                                disabled={submitting}
                                                multiline={key === 'features'}
                                                rows={key === 'features' ? 3 : 1}
                                                themeColors={themeColors}
                                                isDarkMode={isDarkMode}
                                                colors={colors}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ color: themeColors.text.secondary }}>Product Status</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        disabled={submitting}
                                        label="Product Status"
                                        sx={{
                                            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                            borderRadius: 3,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.border.default}`,
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.border.hover}`,
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                border: `2px solid ${themeColors.primary}`,
                                            },
                                            '& .MuiSelect-select': {
                                                color: themeColors.text.primary
                                            }
                                        }}
                                    >
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button 
                                onClick={handleCloseModal}
                                disabled={submitting}
                                sx={{
                                    color: themeColors.text.secondary,
                                    borderColor: themeColors.text.secondary,
                                    '&:hover': {
                                        backgroundColor: `${themeColors.text.secondary}15`
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant="contained"
                                disabled={submitting}
                                startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
                                sx={{
                                    backgroundColor: themeColors.primary,
                                    color: 'white',
                                    borderRadius: 3,
                                    px: 3,
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    minWidth: 150,
                                    '&:hover': {
                                        backgroundColor: themeColors.primaryDark,
                                        transform: 'scale(1.02)'
                                    },
                                    '&:disabled': {
                                        backgroundColor: `${themeColors.primary}60`
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {submitting 
                                    ? 'Processing...' 
                                    : modalMode === 'add' ? 'Add Product' : 'Update Product'
                                }
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default Products;
