// import React, { useState, useContext, useEffect } from 'react';
// import {
//     Box, Paper, Typography, TextField, InputAdornment,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     IconButton, Chip, Avatar, Tooltip, Button
// } from '@mui/material';
// import { Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { AdminContext } from '../Context/Context';
// import Swal from 'sweetalert2';

// const Vendors = () => {
//     const { getVendors, updateVendorStatus, deleteVendor } = useContext(AdminContext);
//     const [vendors, setVendors] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);

//     const fetchVendors = async () => {
//         try {
//             const data = await getVendors();
//             if (data.success) {
//                 setVendors(data.vendors);
//             }
//         } catch (error) {
//             console.error('Error fetching vendors:', error);
//             Swal.fire('Error', 'Failed to load vendors', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchVendors();
//     }, []);

//     const handleStatusChange = async (vendorId, isApproved) => {
//         try {
//             const result = await updateVendorStatus(vendorId, isApproved);
//             if (result.success) {
//                 Swal.fire('Success', result.message, 'success');
//                 fetchVendors();
//             }
//         } catch (error) {
//             Swal.fire('Error', 'Failed to update vendor status', 'error');
//         }
//     };

//     const handleDeleteVendor = async (vendorId) => {
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
//                 const success = await deleteVendor(vendorId);
//                 if (success) {
//                     Swal.fire('Deleted!', 'Vendor has been deleted.', 'success');
//                     fetchVendors();
//                 }
//             }
//         } catch (error) {
//             Swal.fire('Error', 'Failed to delete vendor', 'error');
//         }
//     };

//     const filteredVendors = vendors.filter(vendor =>
//         vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vendor.shopName?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handlechat=async(vendorId)=>{
//         window.location.href=`/chat/${vendorId}`
//     }

//     return (
//         <Box sx={{ p: { xs: 2, sm: 3 } }}>
//             <Paper
//                 elevation={2}
//                 sx={{
//                     p: 3,
//                     mb: 3,
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #1976d2, #64b5f6)',
//                     color: 'white'
//                 }}
//             >
//                 <Typography variant="h5" fontWeight="bold">
//                     Vendors Management
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     Manage and monitor vendor accounts
//                 </Typography>
//             </Paper>

//             <Paper sx={{ p: 2, mb: 3 }}>
//                 <TextField
//                     fullWidth
//                     placeholder="Search vendors..."
//                     variant="outlined"
//                     size="small"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Paper>

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 800 }}>
//                     <TableHead>
//                         <TableRow sx={{ bgcolor: 'black' }}>
//                             <TableCell>Vendor</TableCell>
//                             <TableCell>Shop Name</TableCell>
//                             <TableCell>Contact</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">
//                                     <Typography>Loading vendors...</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : filteredVendors.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">
//                                     <Typography>No vendors found</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             filteredVendors.map((vendor) => (
//                                 <TableRow key={vendor._id}>
//                                     <TableCell>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// <Avatar src={`http://localhost:9000/uploads/vendor/${vendor.profileImage}`} />
//                                             <Typography>{vendor.name}</Typography>
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell>{vendor.shopName}</TableCell>
//                                     <TableCell>
//                                         <Typography>{vendor.email}</Typography>
//                                         <Typography variant="body2" color="textSecondary">
//                                             {vendor.phone}
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell>
//                                         <Chip
//                                             label={vendor.isApproved ? 'Approved' : 'Pending'}
//                                             color={vendor.isApproved ? 'success' : 'warning'}
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                     <TableCell>
//                                         {!vendor.isApproved && (
//                                             <Button
//                                                 size="small"
//                                                 color="success"
//                                                 onClick={() => handleStatusChange(vendor._id, true)}
//                                             >
//                                                 Approve
//                                             </Button>
//                                         )}
//                                         {vendor.isApproved && (
//                                             <Button
//                                                 size="small"
//                                                 color="warning"
//                                                 onClick={() => handleStatusChange(vendor._id, false)}
//                                             >
//                                                 Reject
//                                             </Button>
//                                         )}
//                                         <Tooltip title="Delete Vendor">
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={() => handleDeleteVendor(vendor._id)}
//                                             >
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Button
//                                             size="small"
//                                             color="primary"
//                                             sx={{
//                                                 color:'green',
//                                                 bgcolor:"orange"
//                                             }}
//                                             onClick={() => handlechat(vendor._id)}
//                                         >
//                                             Chat
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

// export default Vendors;

// import React, { useState, useContext, useEffect, useMemo } from 'react';
// import {
//     Box, Paper, Typography, TextField, InputAdornment,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     IconButton, Chip, Avatar, Tooltip, Button, useTheme, Skeleton, Fade, Slide
// } from '@mui/material';
// import { 
//     Search as SearchIcon, 
//     Delete as DeleteIcon, 
//     Store, 
//     Email, 
//     Phone, 
//     CheckCircle, 
//     Cancel,
//     Chat as ChatIcon,
//     Business,
//     Message,
//     Pending as PendingIcon
// } from '@mui/icons-material';
// import { AdminContext } from '../Context/Context';
// import Swal from 'sweetalert2';

// // Tokens function for theme colors (same as before)
// const tokens = (mode) => ({
//   ...(mode === "dark"
//     ? {
//         gray: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#4d4d4d",
//           700: "#333333",
//           800: "#1a1a1a",
//           900: "#0f0f0f",
//         },
//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#1F2A40",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },
//         greenAccent: {
//           100: "#dbf5ee",
//           200: "#b7ebde",
//           300: "#94e2cd",
//           400: "#70d8bd",
//           500: "#4cceac",
//           600: "#3da58a",
//           700: "#2e7c67",
//           800: "#1e5245",
//           900: "#0f2922",
//         },
//         redAccent: {
//           100: "#f8dcdb",
//           200: "#f1b9b7",
//           300: "#e99592",
//           400: "#e2726e",
//           500: "#db4f4a",
//           600: "#af3f3b",
//           700: "#832f2c",
//           800: "#58201e",
//           900: "#2c100f",
//         },
//         blueAccent: {
//           100: "#e1e2fe",
//           200: "#c3c6fd",
//           300: "#a4a9fc",
//           400: "#868dfb",
//           500: "#6870fa",
//           600: "#535ac8",
//           700: "#3e4396",
//           800: "#2a2d64",
//           900: "#151632",
//         },
//       }
//     : {
//         gray: {
//           100: "#141414",
//           200: "#292929",
//           300: "#3d3d3d",
//           400: "#525252",
//           500: "#666666",
//           600: "#858585",
//           700: "#a3a3a3",
//           800: "#c2c2c2",
//           900: "#e0e0e0",
//         },
//         primary: {
//           100: "#040509",
//           200: "#080b12",
//           300: "#0c101b",
//           400: "#f2f0f0",
//           500: "#141b2d",
//           600: "#1F2A40",
//           700: "#727681",
//           800: "#a1a4ab",
//           900: "#d0d1d5",
//         },
//         greenAccent: {
//           100: "#0f2922",
//           200: "#1e5245",
//           300: "#2e7c67",
//           400: "#3da58a",
//           500: "#4cceac",
//           600: "#70d8bd",
//           700: "#94e2cd",
//           800: "#b7ebde",
//           900: "#dbf5ee",
//         },
//         redAccent: {
//           100: "#2c100f",
//           200: "#58201e",
//           300: "#832f2c",
//           400: "#af3f3b",
//           500: "#db4f4a",
//           600: "#e2726e",
//           700: "#e99592",
//           800: "#f1b9b7",
//           900: "#f8dcdb",
//         },
//         blueAccent: {
//           100: "#151632",
//           200: "#2a2d64",
//           300: "#3e4396",
//           400: "#535ac8",
//           500: "#6870fa",
//           600: "#868dfb",
//           700: "#a4a9fc",
//           800: "#c3c6fd",
//           900: "#e1e2fe",
//         },
//       }),
// });

// const Vendors = () => {
//     const { 
//         getVendors, 
//         updateVendorStatus, 
//         deleteVendor,
//         getPendingMessageCount,
//         getUnreadMessageCount,
//         subscribeToNewMessages,
//         unsubscribeFromNewMessages
//     } = useContext(AdminContext);
    
//     const [vendors, setVendors] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [pendingMessageCounts, setPendingMessageCounts] = useState({});
//     const [totalPendingMessages, setTotalPendingMessages] = useState(0);
    
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const isDarkMode = theme.palette.mode === 'dark';

//     // Purple Color Scheme
//     const themeColors = useMemo(() => ({
//         primary: '#8b5cf6',
//         primaryLight: '#a78bfa',
//         primaryDark: '#7c3aed',
//         text: {
//             primary: isDarkMode ? colors.gray[100] : '#1f2937',
//             secondary: isDarkMode ? colors.gray[300] : '#6b7280',
//             accent: isDarkMode ? colors.gray[200] : '#374151',
//         },
//         background: {
//             primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
//             secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
//             hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
//         },
//         border: {
//             default: isDarkMode ? colors.primary[600] : '#a78bfa',
//             hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
//         },
//         success: isDarkMode ? colors.greenAccent[500] : '#10b981',
//         warning: isDarkMode ? '#fbbf24' : '#f59e0b',
//         error: isDarkMode ? colors.redAccent[500] : '#ef4444',
//         info: isDarkMode ? colors.blueAccent[500] : '#3b82f6',
//     }), [isDarkMode, colors]);

//     // Update pending message count
//     const updatePendingMessageCount = async (vendorId, newCount) => {
//         setPendingMessageCounts(prev => ({
//             ...prev,
//             [vendorId]: newCount
//         }));
//         calculateTotalPendingMessages();
//     };

//     const calculateTotalPendingMessages = () => {
//         const total = Object.values(pendingMessageCounts).reduce((sum, count) => sum + count, 0);
//         setTotalPendingMessages(total);
//     };

//     const fetchVendors = async () => {
//         try {
//             const data = await getVendors();
//             if (data.success) {
//                 setVendors(data.vendors);
//                 await fetchPendingMessageCounts(data.vendors);
//             }
//         } catch (error) {
//             console.error('Error fetching vendors:', error);
//             Swal.fire({
//                 title: 'Error',
//                 text: 'Failed to load vendors',
//                 icon: 'error',
//                 background: isDarkMode ? colors.primary[400] : '#ffffff',
//                 color: themeColors.text.primary,
//                 confirmButtonColor: themeColors.primary
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchPendingMessageCounts = async (vendorsList) => {
//         try {
//             const counts = {};
//             for (const vendor of vendorsList) {
//                 if (getPendingMessageCount) {
//                     const count = await getPendingMessageCount(vendor._id);
//                     counts[vendor._id] = count || 0;
//                 }
//             }
//             setPendingMessageCounts(counts);
//             calculateTotalPendingMessages();
//         } catch (error) {
//             console.error('Error fetching pending message counts:', error);
//         }
//     };

//     // Set up real-time message listening
//     useEffect(() => {
//         if (subscribeToNewMessages) {
//             const handleNewMessage = (data) => {
//                 const { vendorId, pendingCount } = data;
//                 if (pendingCount !== undefined) {
//                     updatePendingMessageCount(vendorId, pendingCount);
//                 }
//             };
            
//             subscribeToNewMessages(handleNewMessage);
//         }
        
//         return () => {
//             if (unsubscribeFromNewMessages) {
//                 unsubscribeFromNewMessages();
//             }
//         };
//     }, [vendors, subscribeToNewMessages, unsubscribeFromNewMessages]);

//     // Refresh message counts periodically
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (vendors.length > 0) {
//                 fetchPendingMessageCounts(vendors);
//             }
//         }, 30000);

//         return () => clearInterval(interval);
//     }, [vendors]);

//     useEffect(() => {
//         fetchVendors();
//     }, []);

//     useEffect(() => {
//         calculateTotalPendingMessages();
//     }, [pendingMessageCounts]);

//     const handleStatusChange = async (vendorId, isApproved) => {
//         try {
//             const result = await updateVendorStatus(vendorId, isApproved);
//             if (result.success) {
//                 Swal.fire({
//                     title: 'Success',
//                     text: result.message,
//                     icon: 'success',
//                     background: isDarkMode ? colors.primary[400] : '#ffffff',
//                     color: themeColors.text.primary,
//                     confirmButtonColor: themeColors.primary
//                 });
//                 fetchVendors();
//             }
//         } catch (error) {
//             Swal.fire({
//                 title: 'Error',
//                 text: 'Failed to update vendor status',
//                 icon: 'error',
//                 background: isDarkMode ? colors.primary[400] : '#ffffff',
//                 color: themeColors.text.primary,
//                 confirmButtonColor: themeColors.primary
//             });
//         }
//     };

//     const handleDeleteVendor = async (vendorId) => {
//         try {
//             const result = await Swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: themeColors.primary,
//                 cancelButtonColor: themeColors.error,
//                 confirmButtonText: 'Yes, delete it!',
//                 background: isDarkMode ? colors.primary[400] : '#ffffff',
//                 color: themeColors.text.primary
//             });

//             if (result.isConfirmed) {
//                 const success = await deleteVendor(vendorId);
//                 if (success) {
//                     Swal.fire({
//                         title: 'Deleted!',
//                         text: 'Vendor has been deleted.',
//                         icon: 'success',
//                         background: isDarkMode ? colors.primary[400] : '#ffffff',
//                         color: themeColors.text.primary,
//                         confirmButtonColor: themeColors.primary
//                     });
//                     fetchVendors();
//                 }
//             }
//         } catch (error) {
//             Swal.fire({
//                 title: 'Error',
//                 text: 'Failed to delete vendor',
//                 icon: 'error',
//                 background: isDarkMode ? colors.primary[400] : '#ffffff',
//                 color: themeColors.text.primary,
//                 confirmButtonColor: themeColors.primary
//             });
//         }
//     };

//     const filteredVendors = vendors.filter(vendor =>
//         vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vendor.shopName?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handlechat = async (vendorId) => {
//         // Reset pending count when entering chat
//         setPendingMessageCounts(prev => ({
//             ...prev,
//             [vendorId]: 0
//         }));
//         window.location.href = `/chat/${vendorId}`;
//     };

//     if (loading) {
//         return (
//             <Box 
//                 sx={{ 
//                     p: { xs: 2, sm: 3 },
//                     position: 'relative',
//                     minHeight: '100vh',
//                     '&::before': !isDarkMode && {
//                         content: '""',
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         background: `
//                             radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
//                             radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
//                             radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
//                             linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
//                         `,
//                         zIndex: -2,
//                         pointerEvents: 'none',
//                     }
//                 }}
//             >
//                 <Slide direction="down" in={true} timeout={800}>
//                     <Box>
//                         <Skeleton 
//                             variant="rectangular" 
//                             height={120} 
//                             sx={{ 
//                                 borderRadius: 4,
//                                 bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
//                                 mb: 3
//                             }} 
//                         />
//                         <Skeleton 
//                             variant="rectangular" 
//                             height={80} 
//                             sx={{ 
//                                 borderRadius: 2,
//                                 bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
//                                 mb: 3
//                             }} 
//                         />
//                         <Skeleton 
//                             variant="rectangular" 
//                             height={400} 
//                             sx={{ 
//                                 borderRadius: 2,
//                                 bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`
//                             }} 
//                         />
//                     </Box>
//                 </Slide>
//             </Box>
//         );
//     }

//     return (
//         <Box 
//             sx={{ 
//                 p: { xs: 2, sm: 3 },
//                 position: 'relative',
//                 minHeight: '100vh',
//                 '&::before': !isDarkMode && {
//                     content: '""',
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: `
//                         radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
//                         radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
//                         radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
//                         linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
//                     `,
//                     zIndex: -2,
//                     pointerEvents: 'none',
//                 },
//                 '& *': {
//                     scrollbarWidth: 'none !important',
//                     msOverflowStyle: 'none !important',
//                     '&::-webkit-scrollbar': {
//                         display: 'none !important',
//                     },
//                 },
//             }}
//         >
//             {/* Enhanced Header Section */}
//             <Slide direction="down" in={true} timeout={800}>
//                 <Paper
//                     elevation={0}
//                     sx={{
//                         p: 4,
//                         mb: 3,
//                         borderRadius: 4,
//                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                         backdropFilter: 'blur(10px)',
//                         border: `2px solid ${themeColors.border.default}`,
//                         overflow: 'hidden',
//                         position: 'relative',
//                         boxShadow: isDarkMode
//                             ? `0 10px 30px ${colors.primary[900]}40`
//                             : '0 10px 30px rgba(139, 92, 246, 0.15), 0 5px 15px rgba(139, 92, 246, 0.1)',
//                         backgroundImage: !isDarkMode && `
//                             radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//                             radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
//                             radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
//                         `,
//                         '&::before': {
//                             content: '""',
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             height: '4px',
//                             background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//                             animation: 'shimmer 2s ease-in-out infinite',
//                         },
//                         '@keyframes shimmer': {
//                             '0%': { backgroundPosition: '-200% 0' },
//                             '100%': { backgroundPosition: '200% 0' }
//                         }
//                     }}
//                 >
//                     <Box display="flex" alignItems="center" gap={2}>
//                         <Avatar
//                             sx={{
//                                 bgcolor: `${themeColors.primary}15`,
//                                 width: 56,
//                                 height: 56,
//                                 border: `2px solid ${themeColors.primary}30`,
//                             }}
//                         >
//                             <Store sx={{ color: themeColors.primary, fontSize: 28 }} />
//                         </Avatar>
//                         <Box>
//                             <Typography 
//                                 variant="h4" 
//                                 fontWeight="bold"
//                                 sx={{
//                                     color: themeColors.text.primary,
//                                     background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
//                                     backgroundClip: !isDarkMode && 'text',
//                                     textFillColor: !isDarkMode && 'transparent',
//                                     WebkitBackgroundClip: !isDarkMode && 'text',
//                                     WebkitTextFillColor: !isDarkMode && 'transparent',
//                                 }}
//                             >
//                                 Vendors Management
//                             </Typography>
//                             <Typography 
//                                 variant="body1" 
//                                 sx={{ 
//                                     color: themeColors.text.secondary,
//                                     fontWeight: 500
//                                 }}
//                             >
//                                 Manage and monitor vendor accounts
//                             </Typography>
//                         </Box>
//                     </Box>
                    
//                     {/* Stats Row with Pending Message Count */}
//                     <Box 
//                         display="flex" 
//                         gap={3} 
//                         mt={3}
//                         sx={{
//                             flexWrap: 'wrap',
//                             '& > *': {
//                                 minWidth: '120px'
//                             }
//                         }}
//                     >
//                         <Chip
//                             icon={<Business fontSize="small" />}
//                             label={`Total Vendors: ${vendors.length}`}
//                             sx={{
//                                 bgcolor: `${themeColors.primary}15`,
//                                 color: themeColors.text.primary,
//                                 border: `1px solid ${themeColors.border.default}`,
//                                 fontWeight: 600,
//                                 '& .MuiChip-icon': {
//                                     color: themeColors.primary
//                                 }
//                             }}
//                         />
//                         <Chip
//                             icon={<CheckCircle fontSize="small" />}
//                             label={`Approved: ${vendors.filter(v => v.isApproved).length}`}
//                             sx={{
//                                 bgcolor: `${themeColors.success}15`,
//                                 color: themeColors.text.primary,
//                                 border: `1px solid ${themeColors.success}30`,
//                                 fontWeight: 600,
//                                 '& .MuiChip-icon': {
//                                     color: themeColors.success
//                                 }
//                             }}
//                         />
//                         <Chip
//                             icon={<Cancel fontSize="small" />}
//                             label={`Pending: ${vendors.filter(v => !v.isApproved).length}`}
//                             sx={{
//                                 bgcolor: `${themeColors.warning}15`,
//                                 color: themeColors.text.primary,
//                                 border: `1px solid ${themeColors.warning}30`,
//                                 fontWeight: 600,
//                                 '& .MuiChip-icon': {
//                                     color: themeColors.warning
//                                 }
//                             }}
//                         />
//                         {/* NEW: Pending Messages Chip */}
//                         <Chip
//                             icon={<PendingIcon fontSize="small" />}
//                             label={`Pending Messages: ${totalPendingMessages}`}
//                             sx={{
//                                 bgcolor: totalPendingMessages > 0 ? `${themeColors.warning}15` : `${themeColors.primary}15`,
//                                 color: themeColors.text.primary,
//                                 border: `1px solid ${totalPendingMessages > 0 ? themeColors.warning : themeColors.primary}30`,
//                                 fontWeight: 600,
//                                 animation: totalPendingMessages > 0 ? 'pendingGlow 2s ease-in-out infinite' : 'none',
//                                 '& .MuiChip-icon': {
//                                     color: totalPendingMessages > 0 ? themeColors.warning : themeColors.primary
//                                 },
//                                 '@keyframes pendingGlow': {
//                                     '0%': { boxShadow: 'none' },
//                                     '50%': { boxShadow: `0 0 20px ${themeColors.warning}50` },
//                                     '100%': { boxShadow: 'none' }
//                                 }
//                             }}
//                         />
//                     </Box>
//                 </Paper>
//             </Slide>

//             {/* Search Section */}
//             <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
//                 <Paper 
//                     sx={{ 
//                         p: 3, 
//                         mb: 3,
//                         borderRadius: 3,
//                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                         backdropFilter: 'blur(10px)',
//                         border: `2px solid ${themeColors.border.default}`,
//                         boxShadow: isDarkMode
//                             ? `0 10px 30px ${colors.primary[900]}40`
//                             : '0 10px 30px rgba(139, 92, 246, 0.1)',
//                         backgroundImage: !isDarkMode && `
//                             radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//                             radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
//                         `,
//                     }}
//                 >
//                     <TextField
//                         fullWidth
//                         placeholder="Search by name, email, or shop name..."
//                         variant="outlined"
//                         size="medium"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon sx={{ color: themeColors.primary }} />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         sx={{
//                             '& .MuiOutlinedInput-root': {
//                                 borderRadius: 2,
//                                 backgroundColor: isDarkMode ? `${colors.primary[300]}20` : 'rgba(255, 255, 255, 0.8)',
//                                 border: `2px solid ${themeColors.border.default}`,
//                                 '&:hover': {
//                                     borderColor: themeColors.border.hover,
//                                 },
//                                 '&.Mui-focused': {
//                                     borderColor: themeColors.primary,
//                                     boxShadow: `0 0 0 3px ${themeColors.primary}20`,
//                                 }
//                             },
//                             '& .MuiOutlinedInput-input': {
//                                 color: themeColors.text.primary,
//                                 '&::placeholder': {
//                                     color: themeColors.text.secondary,
//                                     opacity: 1
//                                 }
//                             }
//                         }}
//                     />
//                 </Paper>
//             </Fade>

//             {/* Enhanced Table */}
//             <Fade in={true} timeout={1200} style={{ transitionDelay: '400ms' }}>
//                 <TableContainer 
//                     component={Paper}
//                     sx={{
//                         borderRadius: 3,
//                         background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                         backdropFilter: 'blur(10px)',
//                         border: `2px solid ${themeColors.border.default}`,
//                         overflow: 'hidden',
//                         boxShadow: isDarkMode
//                             ? `0 10px 30px ${colors.primary[900]}40`
//                             : '0 10px 30px rgba(139, 92, 246, 0.1)',
//                         backgroundImage: !isDarkMode && `
//                             radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//                             radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
//                         `,
//                     }}
//                 >
//                     <Table sx={{ minWidth: 800 }}>
//                         <TableHead>
//                             <TableRow 
//                                 sx={{ 
//                                     background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
//                                     '& .MuiTableCell-head': {
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: '1rem',
//                                         borderBottom: 'none',
//                                         textTransform: 'uppercase',
//                                         letterSpacing: '0.5px'
//                                     }
//                                 }}
//                             >
//                                 <TableCell>
//                                     <Box display="flex" alignItems="center" gap={1}>
//                                         <Store fontSize="small" />
//                                         Vendor
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Box display="flex" alignItems="center" gap={1}>
//                                         <Business fontSize="small" />
//                                         Shop Name
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Box display="flex" alignItems="center" gap={1}>
//                                         <Email fontSize="small" />
//                                         Contact
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell>Status</TableCell>
//                                 <TableCell align="center">Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                                         <Typography sx={{ color: themeColors.text.secondary }}>
//                                             Loading vendors...
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : filteredVendors.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                                         <Typography sx={{ color: themeColors.text.secondary }}>
//                                             No vendors found
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 filteredVendors.map((vendor, index) => (
//                                     <TableRow 
//                                         key={vendor._id}
//                                         sx={{
//                                             '&:hover': {
//                                                 backgroundColor: themeColors.background.hover,
//                                                 transform: 'scale(1.001)',
//                                                 transition: 'all 0.2s ease'
//                                             },
//                                             '& .MuiTableCell-body': {
//                                                 color: themeColors.text.primary,
//                                                 borderBottom: `1px solid ${themeColors.border.default}30`,
//                                                 py: 2
//                                             }
//                                         }}
//                                     >
//                                         <TableCell>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                                                 <Avatar 
//                                                     src={`http://localhost:9000/uploads/vendor/${vendor.profileImage}`}
//                                                     sx={{
//                                                         width: 45,
//                                                         height: 45,
//                                                         border: `2px solid ${themeColors.border.default}`,
//                                                         boxShadow: `0 4px 12px ${themeColors.primary}20`
//                                                     }}
//                                                 >
//                                                     {vendor.name?.charAt(0)?.toUpperCase()}
//                                                 </Avatar>
//                                                 <Box>
//                                                     <Typography 
//                                                         fontWeight="600"
//                                                         sx={{ color: themeColors.text.primary }}
//                                                     >
//                                                         {vendor.name}
//                                                     </Typography>
//                                                     <Typography 
//                                                         variant="caption"
//                                                         sx={{ color: themeColors.text.secondary }}
//                                                     >
//                                                         ID: {vendor._id?.slice(-6)}
//                                                     </Typography>
//                                                 </Box>
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Typography 
//                                                 fontWeight="500"
//                                                 sx={{ color: themeColors.text.primary }}
//                                             >
//                                                 {vendor.shopName}
//                                             </Typography>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Box>
//                                                 <Typography sx={{ color: themeColors.text.primary }}>
//                                                     {vendor.email}
//                                                 </Typography>
//                                                 <Typography 
//                                                     variant="body2" 
//                                                     sx={{ color: themeColors.text.secondary }}
//                                                 >
//                                                     {vendor.phone}
//                                                 </Typography>
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Chip
//                                                 label={vendor.isApproved ? 'Approved' : 'Pending'}
//                                                 size="small"
//                                                 sx={{
//                                                     fontWeight: 600,
//                                                     borderRadius: 2,
//                                                     ...(vendor.isApproved ? {
//                                                         bgcolor: `${themeColors.success}20`,
//                                                         color: themeColors.success,
//                                                         border: `1px solid ${themeColors.success}30`
//                                                     } : {
//                                                         bgcolor: `${themeColors.warning}20`,
//                                                         color: themeColors.warning,
//                                                         border: `1px solid ${themeColors.warning}30`
//                                                     })
//                                                 }}
//                                             />
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             <Box display="flex" gap={1} alignItems="center" justifyContent="center" flexWrap="wrap">
//                                                 {!vendor.isApproved ? (
//                                                     <Button
//                                                         size="small"
//                                                         onClick={() => handleStatusChange(vendor._id, true)}
//                                                         sx={{
//                                                             bgcolor: `${themeColors.success}15`,
//                                                             color: themeColors.success,
//                                                             border: `1px solid ${themeColors.success}30`,
//                                                             borderRadius: 2,
//                                                             minWidth: '80px',
//                                                             '&:hover': {
//                                                                 bgcolor: `${themeColors.success}25`,
//                                                                 borderColor: themeColors.success,
//                                                             }
//                                                         }}
//                                                     >
//                                                         <CheckCircle fontSize="small" sx={{ mr: 0.5 }} />
//                                                         Approve
//                                                     </Button>
//                                                 ) : (
//                                                     <Button
//                                                         size="small"
//                                                         onClick={() => handleStatusChange(vendor._id, false)}
//                                                         sx={{
//                                                             bgcolor: `${themeColors.warning}15`,
//                                                             color: themeColors.warning,
//                                                             border: `1px solid ${themeColors.warning}30`,
//                                                             borderRadius: 2,
//                                                             minWidth: '80px',
//                                                             '&:hover': {
//                                                                 bgcolor: `${themeColors.warning}25`,
//                                                                 borderColor: themeColors.warning,
//                                                             }
//                                                         }}
//                                                     >
//                                                         <Cancel fontSize="small" sx={{ mr: 0.5 }} />
//                                                         Reject
//                                                     </Button>
//                                                 )}
                                                
//                                                 <Tooltip title="Delete Vendor">
//                                                     <IconButton
//                                                         onClick={() => handleDeleteVendor(vendor._id)}
//                                                         sx={{
//                                                             color: themeColors.error,
//                                                             backgroundColor: `${themeColors.error}10`,
//                                                             border: `1px solid ${themeColors.error}30`,
//                                                             borderRadius: 2,
//                                                             '&:hover': {
//                                                                 backgroundColor: `${themeColors.error}20`,
//                                                                 borderColor: themeColors.error,
//                                                                 transform: 'scale(1.1)'
//                                                             },
//                                                             transition: 'all 0.2s ease'
//                                                         }}
//                                                     >
//                                                         <DeleteIcon fontSize="small" />
//                                                     </IconButton>
//                                                 </Tooltip>

//                                                 {/* Chat Button */}
//                                                 <Button
//                                                     size="small"
//                                                     onClick={() => handlechat(vendor._id)}
//                                                     sx={{
//                                                         bgcolor: `${themeColors.info}15`,
//                                                         color: themeColors.info,
//                                                         border: `1px solid ${themeColors.info}30`,
//                                                         borderRadius: 2,
//                                                         minWidth: '70px',
//                                                         '&:hover': {
//                                                             bgcolor: `${themeColors.info}25`,
//                                                             borderColor: themeColors.info,
//                                                             transform: 'scale(1.05)'
//                                                         },
//                                                         transition: 'all 0.2s ease',
//                                                     }}
//                                                 >
//                                                     <ChatIcon 
//                                                         fontSize="small" 
//                                                         sx={{ 
//                                                             mr: 0.5,
//                                                             color: themeColors.info
//                                                         }} 
//                                                     />
//                                                     Chat
//                                                 </Button>
                                                
//                                                 {/* PENDING MESSAGE COUNT DISPLAY NEXT TO CHAT BUTTON */}
//                                                 {pendingMessageCounts[vendor._id] > 0 && (
//                                                     <Box
//                                                         sx={{
//                                                             display: 'flex',
//                                                             alignItems: 'center',
//                                                             gap: 0.5,
//                                                             bgcolor: `${themeColors.warning}15`,
//                                                             color: themeColors.warning,
//                                                             border: `1px solid ${themeColors.warning}30`,
//                                                             borderRadius: 2,
//                                                             padding: '4px 8px',
//                                                             minWidth: '70px',
//                                                             justifyContent: 'center',
//                                                             animation: 'pendingPulse 2s ease-in-out infinite',
//                                                             '@keyframes pendingPulse': {
//                                                                 '0%': { 
//                                                                     transform: 'scale(1)',
//                                                                     backgroundColor: `${themeColors.warning}15`
//                                                                 },
//                                                                 '50%': { 
//                                                                     transform: 'scale(1.05)',
//                                                                     backgroundColor: `${themeColors.warning}25`
//                                                                 },
//                                                                 '100%': { 
//                                                                     transform: 'scale(1)',
//                                                                     backgroundColor: `${themeColors.warning}15`
//                                                                 }
//                                                             }
//                                                         }}
//                                                     >
//                                                         <PendingIcon fontSize="small" />
//                                                         <Typography 
//                                                             variant="caption" 
//                                                             fontWeight="bold"
//                                                             sx={{ color: themeColors.warning }}
//                                                         >
//                                                             {pendingMessageCounts[vendor._id]} Pending
//                                                         </Typography>
//                                                     </Box>
//                                                 )}
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Fade>
//         </Box>
//     );
// };

// export default Vendors;
import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
    Box, Paper, Typography, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, Avatar, Tooltip, Button, useTheme, Skeleton, Fade, Slide, Badge
} from '@mui/material';
import { 
    Search as SearchIcon, 
    Delete as DeleteIcon, 
    Store, 
    Email, 
    Phone, 
    CheckCircle, 
    Cancel,
    Chat as ChatIcon,
    Business,
    Message,
    Pending as PendingIcon
} from '@mui/icons-material';
import { AdminContext } from '../Context/Context';
import Swal from 'sweetalert2';
import axios from 'axios';

// Tokens function for theme colors (keep the same as before)
const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        gray: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#4d4d4d",
          700: "#333333",
          800: "#1a1a1a",
          900: "#0f0f0f",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        gray: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

const Vendors = () => {
    const { 
        getVendors, 
        updateVendorStatus, 
        deleteVendor
    } = useContext(AdminContext);
    
    const [vendors, setVendors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [pendingMessageCounts, setPendingMessageCounts] = useState({});
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === 'dark';

    // Enhanced Purple Color Scheme with better dark mode button visibility
    const themeColors = useMemo(() => ({
        primary: '#8b5cf6',
        primaryLight: '#a78bfa',
        primaryDark: '#7c3aed',
        text: {
            primary: isDarkMode ? colors.gray[100] : '#1f2937',
            secondary: isDarkMode ? colors.gray : '#6b7280',
            accent: isDarkMode ? colors.gray : '#374151',
        },
        background: {
            primary: isDarkMode ? colors.primary : 'rgba(254, 252, 255, 0.95)',
            secondary: isDarkMode ? colors.primary : 'rgba(250, 249, 255, 0.95)',
            hover: isDarkMode ? colors.primary : 'rgba(139, 92, 246, 0.05)',
        },
        border: {
            default: isDarkMode ? colors.primary : '#a78bfa',
            hover: isDarkMode ? colors.primary : '#8b5cf6',
        },
        success: isDarkMode ? '#22c55e' : '#10b981',
        warning: isDarkMode ? '#f59e0b' : '#f59e0b',
        error: isDarkMode ? '#ef4444' : '#ef4444',
        info: isDarkMode ? '#3b82f6' : '#3b82f6',
        buttons: {
            success: {
                bg: isDarkMode ? '#22c55e' : '#10b981',
                bgHover: isDarkMode ? '#16a34a' : '#059669',
                text: 'white',
                bgLight: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                border: isDarkMode ? 'rgba(34, 197, 94, 0.4)' : 'rgba(16, 185, 129, 0.3)'
            },
            warning: {
                bg: isDarkMode ? '#f59e0b' : '#f59e0b',
                bgHover: isDarkMode ? '#d97706' : '#d97706',
                text: 'white',
                bgLight: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                border: isDarkMode ? 'rgba(245, 158, 11, 0.4)' : 'rgba(245, 158, 11, 0.3)'
            },
            info: {
                bg: isDarkMode ? '#3b82f6' : '#3b82f6',
                bgHover: isDarkMode ? '#2563eb' : '#2563eb',
                text: 'white',
                bgLight: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                border: isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)'
            },
            error: {
                bg: isDarkMode ? '#ef4444' : '#ef4444',
                bgHover: isDarkMode ? '#dc2626' : '#dc2626',
                text: 'white',
                bgLight: isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                border: isDarkMode ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)'
            }
        }
    }), [isDarkMode, colors]);

    // All the existing functions remain the same (fetchPendingMessageCount, fetchAllPendingCounts, etc.)
    const fetchPendingMessageCount = async (vendorId) => {
        try {
            const res = await axios.get(`http://localhost:9000/admin/vendor-messages/${vendorId}`, {
                headers: {
                    'auth-token': localStorage.getItem('adminToken'),
                },
            });
            
            if (res.data.success) {
                const messages = res.data.messages;
                const pendingCount = messages.filter(msg => !msg.response).length;
                return pendingCount;
            }
            return 0;
        } catch (error) {
            console.error('Error fetching pending message count for vendor:', vendorId, error);
            return 0;
        }
    };

    const fetchAllPendingCounts = async (vendorsList) => {
        try {
            const counts = {};
            const countPromises = vendorsList.map(async (vendor) => {
                const count = await fetchPendingMessageCount(vendor._id);
                return { vendorId: vendor._id, count };
            });
            
            const results = await Promise.all(countPromises);
            results.forEach(({ vendorId, count }) => {
                counts[vendorId] = count;
            });
            
            setPendingMessageCounts(counts);
        } catch (error) {
            console.error('Error fetching all pending counts:', error);
        }
    };

    const fetchVendors = async () => {
        try {
            const data = await getVendors();
            if (data.success) {
                setVendors(data.vendors);
                await fetchAllPendingCounts(data.vendors);
            }
        } catch (error) {
            console.error('Error fetching vendors:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to load vendors',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (vendors.length > 0) {
                fetchAllPendingCounts(vendors);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [vendors]);

    useEffect(() => {
        fetchVendors();
    }, []);

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            if (vendors.length > 0) {
                fetchAllPendingCounts(vendors);
            }
        }, 30000);
        return () => clearInterval(refreshInterval);
    }, [vendors]);

    const handleStatusChange = async (vendorId, isApproved) => {
        try {
            const result = await updateVendorStatus(vendorId, isApproved);
            if (result.success) {
                Swal.fire({
                    title: 'Success',
                    text: result.message,
                    icon: 'success',
                    background: isDarkMode ? colors.primary[400] : '#ffffff',
                    color: themeColors.text.primary,
                    confirmButtonColor: themeColors.primary
                });
                fetchVendors();
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to update vendor status',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
        }
    };

    const handleDeleteVendor = async (vendorId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: themeColors.primary,
                cancelButtonColor: themeColors.error,
                confirmButtonText: 'Yes, delete it!',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary
            });

            if (result.isConfirmed) {
                const success = await deleteVendor(vendorId);
                if (success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Vendor has been deleted.',
                        icon: 'success',
                        background: isDarkMode ? colors.primary[400] : '#ffffff',
                        color: themeColors.text.primary,
                        confirmButtonColor: themeColors.primary
                    });
                    fetchVendors();
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete vendor',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
        }
    };

    const filteredVendors = vendors.filter(vendor =>
        vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.shopName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlechat = async (vendorId) => {
        setPendingMessageCounts(prev => ({
            ...prev,
            [vendorId]: 0
        }));
        window.location.href = `/chat/${vendorId}`;
    };

    if (loading) {
        return (
            <Box 
                sx={{ 
                    p: { xs: 2, sm: 3 },
                    position: 'relative',
                    minHeight: '100vh',
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
                    }
                }}
            >
                <Slide direction="down" in={true} timeout={800}>
                    <Box>
                        <Skeleton 
                            variant="rectangular" 
                            height={120} 
                            sx={{ 
                                borderRadius: 4,
                                bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
                                mb: 3
                            }} 
                        />
                        <Skeleton 
                            variant="rectangular" 
                            height={80} 
                            sx={{ 
                                borderRadius: 2,
                                bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
                                mb: 3
                            }} 
                        />
                        <Skeleton 
                            variant="rectangular" 
                            height={400} 
                            sx={{ 
                                borderRadius: 2,
                                bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`
                            }} 
                        />
                    </Box>
                </Slide>
            </Box>
        );
    }

    return (
        <Box 
            sx={{ 
                p: { xs: 2, sm: 3 },
                position: 'relative',
                minHeight: '100vh',
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
                '& *': {
                    scrollbarWidth: 'none !important',
                    msOverflowStyle: 'none !important',
                    '&::-webkit-scrollbar': {
                        display: 'none !important',
                    },
                },
            }}
        >
            {/* Header Section - Keep same as before */}
            <Slide direction="down" in={true} timeout={800}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 3,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: isDarkMode
                            ? `0 10px 30px ${colors.primary[900]}40`
                            : '0 10px 30px rgba(139, 92, 246, 0.15), 0 5px 15px rgba(139, 92, 246, 0.1)',
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
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            sx={{
                                bgcolor: `${themeColors.primary}15`,
                                width: 56,
                                height: 56,
                                border: `2px solid ${themeColors.primary}30`,
                            }}
                        >
                            <Store sx={{ color: themeColors.primary, fontSize: 28 }} />
                        </Avatar>
                        <Box>
                            <Typography 
                                variant="h4" 
                                fontWeight="bold"
                                sx={{
                                    color: themeColors.text.primary,
                                    background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                    backgroundClip: !isDarkMode && 'text',
                                    textFillColor: !isDarkMode && 'transparent',
                                    WebkitBackgroundClip: !isDarkMode && 'text',
                                    WebkitTextFillColor: !isDarkMode && 'transparent',
                                }}
                            >
                                Vendors Management
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: themeColors.text.secondary,
                                    fontWeight: 500
                                }}
                            >
                                Manage and monitor vendor accounts with real-time message notifications
                            </Typography>
                        </Box>
                    </Box>
                    
                    {/* Stats Row */}
                    <Box 
                        display="flex" 
                        gap={3} 
                        mt={3}
                        sx={{
                            flexWrap: 'wrap',
                            '& > *': {
                                minWidth: '120px'
                            }
                        }}
                    >
                        <Chip
                            icon={<Business fontSize="small" />}
                            label={`Total Vendors: ${vendors.length}`}
                            sx={{
                                bgcolor: `${themeColors.primary}15`,
                                color: themeColors.text.primary,
                                border: `1px solid ${themeColors.border.default}`,
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                    color: themeColors.primary
                                }
                            }}
                        />
                        <Chip
                            icon={<CheckCircle fontSize="small" />}
                            label={`Approved: ${vendors.filter(v => v.isApproved).length}`}
                            sx={{
                                bgcolor: themeColors.buttons.success.bgLight,
                                color: themeColors.text.primary,
                                border: `1px solid ${themeColors.buttons.success.border}`,
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                    color: themeColors.buttons.success.bg
                                }
                            }}
                        />
                        <Chip
                            icon={<Cancel fontSize="small" />}
                            label={`Pending: ${vendors.filter(v => !v.isApproved).length}`}
                            sx={{
                                bgcolor: themeColors.buttons.warning.bgLight,
                                color: themeColors.text.primary,
                                border: `1px solid ${themeColors.buttons.warning.border}`,
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                    color: themeColors.buttons.warning.bg
                                }
                            }}
                        />
                    </Box>
                </Paper>
            </Slide>

            {/* Search Section - Keep same as before */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Paper 
                    sx={{ 
                        p: 3, 
                        mb: 3,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        boxShadow: isDarkMode
                            ? `0 10px 30px ${colors.primary[900]}40`
                            : '0 10px 30px rgba(139, 92, 246, 0.1)',
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
                        `,
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search by name, email, or shop name..."
                        variant="outlined"
                        size="medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: themeColors.primary }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: isDarkMode ? `${colors.primary[300]}20` : 'rgba(255, 255, 255, 0.8)',
                                border: `2px solid ${themeColors.border.default}`,
                                '&:hover': {
                                    borderColor: themeColors.border.hover,
                                },
                                '&.Mui-focused': {
                                    borderColor: themeColors.primary,
                                    boxShadow: `0 0 0 3px ${themeColors.primary}20`,
                                }
                            },
                            '& .MuiOutlinedInput-input': {
                                color: themeColors.text.primary,
                                '&::placeholder': {
                                    color: themeColors.text.secondary,
                                    opacity: 1
                                }
                            }
                        }}
                    />
                </Paper>
            </Fade>

            {/* FIXED: Enhanced Table with Fixed Button Layout */}
            <Fade in={true} timeout={1200} style={{ transitionDelay: '400ms' }}>
                <TableContainer 
                    component={Paper}
                    sx={{
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${themeColors.border.default}`,
                        overflow: 'hidden',
                        boxShadow: isDarkMode
                            ? `0 10px 30px ${colors.primary[900]}40`
                            : '0 10px 30px rgba(139, 92, 246, 0.1)',
                        backgroundImage: !isDarkMode && `
                            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
                            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%)
                        `,
                    }}
                >
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow 
                                sx={{ 
                                    background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                    '& .MuiTableCell-head': {
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        borderBottom: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }
                                }}
                            >
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Store fontSize="small" />
                                        Vendor
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Business fontSize="small" />
                                        Shop Name
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Email fontSize="small" />
                                        Contact
                                    </Box>
                                </TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center" sx={{ minWidth: '300px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                        <Typography sx={{ color: themeColors.text.secondary }}>
                                            Loading vendors...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : filteredVendors.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                        <Typography sx={{ color: themeColors.text.secondary }}>
                                            No vendors found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredVendors.map((vendor, index) => (
                                    <TableRow 
                                        key={vendor._id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: themeColors.background.hover,
                                                transform: 'scale(1.001)',
                                                transition: 'all 0.2s ease'
                                            },
                                            '& .MuiTableCell-body': {
                                                color: themeColors.text.primary,
                                                borderBottom: `1px solid ${themeColors.border.default}30`,
                                                py: 2
                                            }
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar 
                                                    src={`http://localhost:9000/uploads/vendor/${vendor.profileImage}`}
                                                    sx={{
                                                        width: 45,
                                                        height: 45,
                                                        border: `2px solid ${themeColors.border.default}`,
                                                        boxShadow: `0 4px 12px ${themeColors.primary}20`
                                                    }}
                                                >
                                                    {vendor.name?.charAt(0)?.toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography 
                                                        fontWeight="600"
                                                        sx={{ color: themeColors.text.primary }}
                                                    >
                                                        {vendor.name}
                                                    </Typography>
                                                    <Typography 
                                                        variant="caption"
                                                        sx={{ color: themeColors.text.secondary }}
                                                    >
                                                        ID: {vendor._id?.slice(-6)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography 
                                                fontWeight="500"
                                                sx={{ color: themeColors.text.primary }}
                                            >
                                                {vendor.shopName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Typography sx={{ color: themeColors.text.primary }}>
                                                    {vendor.email}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    sx={{ color: themeColors.text.secondary }}
                                                >
                                                    {vendor.phone}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={vendor.isApproved ? 'Approved' : 'Pending'}
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    borderRadius: 2,
                                                    ...(vendor.isApproved ? {
                                                        bgcolor: themeColors.buttons.success.bgLight,
                                                        color: themeColors.buttons.success.bg,
                                                        border: `1px solid ${themeColors.buttons.success.border}`
                                                    } : {
                                                        bgcolor: themeColors.buttons.warning.bgLight,
                                                        color: themeColors.buttons.warning.bg,
                                                        border: `1px solid ${themeColors.buttons.warning.border}`
                                                    })
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* FIXED: Fixed Layout Grid System for Buttons */}
                                            <Box 
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'auto auto auto auto', // Fixed 4 columns
                                                    gap: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minHeight: '40px', // Fixed height to prevent jumping
                                                    width: '100%',
                                                    maxWidth: '280px',
                                                    margin: '0 auto'
                                                }}
                                            >
                                                {/* Column 1: Approve/Reject Button - Fixed Position */}
                                                <Box sx={{ gridColumn: 1, display: 'flex', justifyContent: 'center' }}>
                                                    {!vendor.isApproved ? (
                                                        <Button
                                                            size="small"
                                                            onClick={() => handleStatusChange(vendor._id, true)}
                                                            sx={{
                                                                bgcolor: themeColors.buttons.success.bgLight,
                                                                color: themeColors.buttons.success.bg,
                                                                border: `2px solid ${themeColors.buttons.success.border}`,
                                                                borderRadius: 2,
                                                                minWidth: '70px',
                                                                height: '32px',
                                                                fontSize: '0.7rem',
                                                                fontWeight: 600,
                                                                '&:hover': {
                                                                    bgcolor: themeColors.buttons.success.bg,
                                                                    color: themeColors.buttons.success.text,
                                                                    borderColor: themeColors.buttons.success.bg,
                                                                    transform: 'scale(1.05)',
                                                                },
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <CheckCircle sx={{ fontSize: '14px', mr: 0.5 }} />
                                                            Approve
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="small"
                                                            onClick={() => handleStatusChange(vendor._id, false)}
                                                            sx={{
                                                                bgcolor: themeColors.buttons.warning.bgLight,
                                                                color: themeColors.buttons.warning.bg,
                                                                border: `2px solid ${themeColors.buttons.warning.border}`,
                                                                borderRadius: 2,
                                                                minWidth: '70px',
                                                                height: '32px',
                                                                fontSize: '0.7rem',
                                                                fontWeight: 600,
                                                                '&:hover': {
                                                                    bgcolor: themeColors.buttons.warning.bg,
                                                                    color: themeColors.buttons.warning.text,
                                                                    borderColor: themeColors.buttons.warning.bg,
                                                                    transform: 'scale(1.05)',
                                                                },
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <Cancel sx={{ fontSize: '14px', mr: 0.5 }} />
                                                            Reject
                                                        </Button>
                                                    )}
                                                </Box>

                                                {/* Column 2: Delete Button - Fixed Position */}
                                                <Box sx={{ gridColumn: 2, display: 'flex', justifyContent: 'center' }}>
                                                    <Tooltip title="Delete Vendor">
                                                        <IconButton
                                                            onClick={() => handleDeleteVendor(vendor._id)}
                                                            sx={{
                                                                color: themeColors.buttons.error.bg,
                                                                backgroundColor: themeColors.buttons.error.bgLight,
                                                                border: `2px solid ${themeColors.buttons.error.border}`,
                                                                borderRadius: 2,
                                                                width: '32px',
                                                                height: '32px',
                                                                '&:hover': {
                                                                    backgroundColor: themeColors.buttons.error.bg,
                                                                    color: themeColors.buttons.error.text,
                                                                    borderColor: themeColors.buttons.error.bg,
                                                                    transform: 'scale(1.1)',
                                                                },
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ fontSize: '16px' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>

                                                {/* Column 3: Chat Button with Badge - Fixed Position */}
                                                <Box sx={{ gridColumn: 3, display: 'flex', justifyContent: 'center' }}>
                                                    <Badge
                                                        badgeContent={pendingMessageCounts[vendor._id] || 0}
                                                        color="warning"
                                                        invisible={!pendingMessageCounts[vendor._id] || pendingMessageCounts[vendor._id] === 0}
                                                        sx={{
                                                            '& .MuiBadge-badge': {
                                                                bgcolor: themeColors.buttons.warning.bg,
                                                                color: themeColors.buttons.warning.text,
                                                                fontWeight: 'bold',
                                                                fontSize: '0.7rem',
                                                                minWidth: '18px',
                                                                height: '18px',
                                                                borderRadius: '9px',
                                                                animation: pendingMessageCounts[vendor._id] > 0 ? 'badgePulse 2s ease-in-out infinite' : 'none',
                                                                '@keyframes badgePulse': {
                                                                    '0%': { transform: 'scale(1)' },
                                                                    '50%': { transform: 'scale(1.2)' },
                                                                    '100%': { transform: 'scale(1)' }
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            onClick={() => handlechat(vendor._id)}
                                                            sx={{
                                                                bgcolor: themeColors.buttons.info.bgLight,
                                                                color: themeColors.buttons.info.bg,
                                                                border: `2px solid ${themeColors.buttons.info.border}`,
                                                                borderRadius: 2,
                                                                minWidth: '60px',
                                                                height: '32px',
                                                                fontSize: '0.7rem',
                                                                fontWeight: 600,
                                                                '&:hover': {
                                                                    bgcolor: themeColors.buttons.info.bg,
                                                                    color: themeColors.buttons.info.text,
                                                                    borderColor: themeColors.buttons.info.bg,
                                                                    transform: 'scale(1.05)',
                                                                },
                                                                transition: 'all 0.2s ease',
                                                            }}
                                                        >
                                                            <ChatIcon sx={{ fontSize: '14px', mr: 0.5 }} />
                                                            Chat
                                                        </Button>
                                                    </Badge>
                                                </Box>

                                                {/* Column 4: Reserved for future actions or spacing */}
                                                <Box sx={{ gridColumn: 4, width: '20px' }}>
                                                    {/* Empty space for consistent layout */}
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fade>
        </Box>
    );
};

export default Vendors;
