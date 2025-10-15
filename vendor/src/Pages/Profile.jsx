// import React, { useContext, useEffect, useState } from 'react';
// import { VendorContext } from '../Context/Context';
// import {
//     Box,
//     Paper,
//     Typography,
//     TextField,
//     Button,
//     Grid,
//     Avatar,
//     CircularProgress
// } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';
// import {config} from '../Config/Config';

// const Profile = () => {
//     const { vendor, getVendorProfile, updateVendorProfile, loading } = useContext(VendorContext);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         shopName: '',
//         address: ''
//     });
//     const [profileImage, setProfileImage] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState('');
//     const {host}=config;

//     useEffect(() => {
//         getVendorProfile();
//     }, []);

//     useEffect(() => {
//         if (vendor) {
//             setFormData({
//                 name: vendor.name || '',
//                 phone: vendor.phone || '',
//                 shopName: vendor.shopName || '',
//                 address: vendor.address || ''
//             });
//             setPreviewUrl(vendor.profileImage ? `/uploads/vendor/${vendor.profileImage}` : '');
//         }
//     }, [vendor]);

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setProfileImage(file);
//             setPreviewUrl(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const submitData = new FormData();
//         Object.keys(formData).forEach(key => {
//             submitData.append(key, formData[key]);
//         });
//         if (profileImage) {
//             submitData.append('profileImage', profileImage);
//         }
//         await updateVendorProfile(submitData);
//     };

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
//                     Profile Settings
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     Manage your account information
//                 </Typography>
//             </Paper>

//             <Paper sx={{ p: 3, borderRadius: 2 }}>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} display="flex" justifyContent="center">
//                             <Box sx={{ position: 'relative' }}>
//                                 <Avatar
//                                     src={`http://localhost:9000/uploads/vendor/${vendor?.profileImage || ''}`}
//                                     sx={{ width: 120, height: 120, mb: 2 }}
//                                 />
//                                 <input
//                                     accept="image/*"
//                                     type="file"
//                                     id="profile-image"
//                                     hidden
//                                     onChange={handleImageChange}
//                                 />
//                                 <label htmlFor="profile-image">
//                                     <Button
//                                         component="span"
//                                         variant="contained"
//                                         startIcon={<PhotoCamera />}
//                                         sx={{ position: 'absolute', bottom: 0, right: -20 }}
//                                     >
//                                         Change
//                                     </Button>
//                                 </label>
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Phone"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleInputChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Shop Name"
//                                 name="shopName"
//                                 value={formData.shopName}
//                                 onChange={handleInputChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Address"
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleInputChange}
//                                 multiline
//                                 rows={2}
//                             />
//                         </Grid>
//                         <Grid item xs={12} display="flex" justifyContent="flex-end">
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 disabled={loading}
//                                 sx={{ minWidth: 120 }}
//                             >
//                                 {loading ? <CircularProgress size={24} /> : 'Save Changes'}
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Paper>
//         </Box>
//     );
// };

// export default Profile;



// import React, { useContext, useEffect, useState, useMemo } from 'react';
// import { VendorContext } from '../Context/Context';
// import {
//     Box,
//     Paper,
//     Typography,
//     TextField,
//     Button,
//     Grid,
//     Avatar,
//     CircularProgress,
//     Card,
//     CardContent,
//     useTheme,
//     useMediaQuery,
//     Fade,
//     Slide,
//     IconButton,
//     Tooltip,
//     Alert,
//     Snackbar
// } from '@mui/material';
// import { PhotoCamera, Person, Phone, Store, LocationOn, Save, Edit } from '@mui/icons-material';
// import { tokens } from '../theme';
// import { config } from '../Config/Config';

// const Profile = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const isXlDevices = useMediaQuery("(min-width: 1260px)");
//     const isMdDevices = useMediaQuery("(min-width: 724px)");
//     const isDarkMode = theme.palette.mode === 'dark';

//     const { vendor, getVendorProfile, updateVendorProfile, loading } = useContext(VendorContext);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         shopName: '',
//         address: ''
//     });
//     const [profileImage, setProfileImage] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState('');
//     const [alertOpen, setAlertOpen] = useState(false);
//     const [isHovered, setIsHovered] = useState({});
//     const { host } = config;

//     // Define consistent color scheme matching Dashboard
//     const themeColors = useMemo(() => ({
//         primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
//         primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
//         primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
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

//     useEffect(() => {
//         getVendorProfile();
//     }, []);

//     useEffect(() => {
//         if (vendor) {
//             setFormData({
//                 name: vendor.name || '',
//                 phone: vendor.phone || '',
//                 shopName: vendor.shopName || '',
//                 address: vendor.address || ''
//             });
//             if (vendor.profileImage) {
//                 setPreviewUrl(`${host}/uploads/vendor/${vendor.profileImage}`);
//             }
//         }
//     }, [vendor, host]);

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setProfileImage(file);
//             setPreviewUrl(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const submitData = new FormData();
//         Object.keys(formData).forEach(key => {
//             submitData.append(key, formData[key]);
//         });
//         if (profileImage) {
//             submitData.append('profileImage', profileImage);
//         }
//         await updateVendorProfile(submitData);
//         setAlertOpen(true);
//     };

//     // COMPACT Enhanced Form Field Component
//     const EnhancedTextField = ({ icon, label, name, value, onChange, multiline, rows, required, ...props }) => {
//         const [fieldHovered, setFieldHovered] = useState(false);
//         const [fieldFocused, setFieldFocused] = useState(false);
        
//         return (
//             <Box 
//                 position="relative"
//                 onMouseEnter={() => setFieldHovered(true)}
//                 onMouseLeave={() => setFieldHovered(false)}
//             >
//                 <TextField
//                     fullWidth
//                     label={label}
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     multiline={multiline}
//                     rows={rows}
//                     required={required}
//                     onFocus={() => setFieldFocused(true)}
//                     onBlur={() => setFieldFocused(false)}
//                     size="small" // MADE SMALLER
//                     {...props}
//                     sx={{
//                         '& .MuiOutlinedInput-root': {
//                             background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                             backdropFilter: 'blur(10px)',
//                             borderRadius: 2, // REDUCED BORDER RADIUS
//                             transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                             transform: fieldHovered || fieldFocused ? 'scale(1.01)' : 'scale(1)',
//                             boxShadow: fieldHovered || fieldFocused
//                                 ? isDarkMode
//                                     ? `0 6px 20px ${colors.primary[900]}30` // REDUCED SHADOW
//                                     : '0 6px 20px rgba(139, 92, 246, 0.1)'
//                                 : isDarkMode
//                                     ? `0 3px 10px ${colors.primary[900]}20` // REDUCED SHADOW
//                                     : '0 3px 10px rgba(167, 139, 250, 0.08)',
//                             '& fieldset': {
//                                 border: `1.5px solid ${fieldFocused ? themeColors.primary : fieldHovered ? themeColors.border.hover : themeColors.border.default}`, // THINNER BORDER
//                                 transition: 'all 0.3s ease',
//                             },
//                             '&:hover fieldset': {
//                                 border: `1.5px solid ${themeColors.border.hover}`,
//                             },
//                             '&.Mui-focused fieldset': {
//                                 border: `2px solid ${themeColors.primary}`,
//                                 boxShadow: `0 0 0 2px ${themeColors.primary}15`, // REDUCED GLOW
//                             },
//                         },
//                         '& .MuiInputLabel-root': {
//                             color: themeColors.text.secondary,
//                             fontWeight: 500,
//                             fontSize: '0.9rem', // SMALLER FONT
//                             '&.Mui-focused': {
//                                 color: themeColors.primary,
//                                 fontWeight: 600,
//                             },
//                             '&.MuiInputLabel-shrink': {
//                                 transform: 'translate(14px, -9px) scale(0.8)', // ADJUSTED SCALE
//                                 background: themeColors.background.primary,
//                                 padding: '0 6px', // REDUCED PADDING
//                                 borderRadius: '3px',
//                             },
//                         },
//                         '& .MuiOutlinedInput-input': {
//                             color: themeColors.text.primary,
//                             fontWeight: 500,
//                             padding: multiline ? '12px 10px' : '14px 10px', // REDUCED PADDING
//                             fontSize: '0.9rem', // SMALLER FONT
//                             scrollbarWidth: 'none',
//                             msOverflowStyle: 'none',
//                             '&::-webkit-scrollbar': {
//                                 display: 'none',
//                             },
//                             '&::placeholder': {
//                                 color: themeColors.text.secondary,
//                                 opacity: 0.7,
//                             },
//                         },
//                         '& .MuiInputBase-multiline': {
//                             padding: 0,
//                             '& textarea': {
//                                 scrollbarWidth: 'none',
//                                 msOverflowStyle: 'none',
//                                 '&::-webkit-scrollbar': {
//                                     display: 'none',
//                                 },
//                             },
//                         },
//                     }}
//                     InputProps={{
//                         endAdornment: icon && (
//                             <Box
//                                 sx={{
//                                     color: fieldFocused ? themeColors.primary : themeColors.text.secondary,
//                                     transition: 'color 0.3s ease',
//                                     mr: 0.5, // REDUCED MARGIN
//                                     '& svg': {
//                                         fontSize: '1.2rem', // SMALLER ICON
//                                     },
//                                 }}
//                             >
//                                 {icon}
//                             </Box>
//                         ),
//                     }}
//                 />
//             </Box>
//         );
//     };

//     return (
//         <Box 
//             sx={{
//                 m: "20px",
//                 position: 'relative',
//                 height: '85vh',
//                 overflow: 'hidden',
//                 '& *': {
//                     scrollbarWidth: 'none !important',
//                     msOverflowStyle: 'none !important',
//                     '&::-webkit-scrollbar': {
//                         display: 'none !important',
//                         width: '0px !important',
//                         background: 'transparent !important',
//                     },
//                 },
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
//             }}
//         >
//             <Snackbar
//                 open={alertOpen}
//                 autoHideDuration={3000}
//                 onClose={() => setAlertOpen(false)}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//                 <Alert
//                     severity="success"
//                     sx={{ 
//                         borderRadius: 3,
//                         border: `2px solid ${themeColors.success}30`,
//                         background: themeColors.background.primary,
//                         backdropFilter: 'blur(10px)',
//                         color: themeColors.text.primary,
//                         '& .MuiAlert-icon': {
//                             color: themeColors.success
//                         },
//                     }}
//                     onClose={() => setAlertOpen(false)}
//                 >
//                     Profile updated successfully!
//                 </Alert>
//             </Snackbar>

//             {/* COMPACT Header Section */}
//             <Slide direction="down" in={true} timeout={800}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}> {/* REDUCED MARGIN */}
//                     <Box>
//                         <Typography 
//                             variant="h3" // SMALLER VARIANT
//                             color={themeColors.text.primary}
//                             fontWeight="bold" 
//                             sx={{ mb: "3px" }} // REDUCED MARGIN
//                         >
//                             PROFILE SETTINGS
//                         </Typography>
//                         <Typography 
//                             variant="h6" // SMALLER VARIANT
//                             color={themeColors.primary}
//                             fontWeight={500}
//                         >
//                             Manage your account information
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Slide>

//             {/* COMPACT SCROLLABLE CONTENT */}
//             <Box
//                 sx={{
//                     height: 'calc(100vh - 140px)', // REDUCED HEIGHT
//                     overflow: 'auto',
//                     scrollbarWidth: 'none',
//                     msOverflowStyle: 'none',
//                     '&::-webkit-scrollbar': {
//                         display: 'none',
//                     },
//                     paddingRight: '17px',
//                     marginRight: '-17px',
//                 }}
//             >
//                 <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
//                     {/* COMPACT FORM CONTAINER */}
//                     <Box
//                         sx={{
//                             maxWidth: '900px', // REDUCED MAX WIDTH
//                             margin: '0 auto', // CENTER THE FORM
//                         }}
//                     >
//                         <Card
//                             onMouseEnter={() => setIsHovered(prev => ({ ...prev, mainCard: true }))}
//                             onMouseLeave={() => setIsHovered(prev => ({ ...prev, mainCard: false }))}
//                             sx={{
//                                 background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//                                 backdropFilter: 'blur(10px)',
//                                 border: `2px solid ${isHovered.mainCard ? themeColors.border.hover : themeColors.border.default}`,
//                                 borderRadius: 3, // REDUCED BORDER RADIUS
//                                 overflow: 'hidden',
//                                 position: 'relative',
//                                 transform: isHovered.mainCard ? 'translateY(-2px)' : 'translateY(0)', // REDUCED TRANSFORM
//                                 transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                                 boxShadow: isHovered.mainCard 
//                                     ? isDarkMode
//                                         ? `0 15px 35px -10px ${colors.primary[900]}50` // REDUCED SHADOW
//                                         : '0 15px 35px rgba(139, 92, 246, 0.12), 0 8px 18px rgba(139, 92, 246, 0.08)'
//                                     : isDarkMode
//                                         ? undefined
//                                         : '0 8px 25px rgba(167, 139, 250, 0.08), 0 4px 12px rgba(167, 139, 250, 0.04)',
//                                 backgroundImage: !isDarkMode && `
//                                     radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//                                     radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
//                                     radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
//                                 `,
//                                 '&::before': {
//                                     content: '""',
//                                     position: 'absolute',
//                                     top: 0,
//                                     left: 0,
//                                     right: 0,
//                                     height: '3px', // REDUCED HEIGHT
//                                     background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//                                     animation: 'shimmer 2s ease-in-out infinite',
//                                 },
//                                 '@keyframes shimmer': {
//                                     '0%': { backgroundPosition: '-200% 0' },
//                                     '100%': { backgroundPosition: '200% 0' }
//                                 }
//                             }}
//                         >
//                             <CardContent sx={{ p: 3 }}> {/* REDUCED PADDING */}
//                                 <form onSubmit={handleSubmit}>
//                                     <Grid container spacing={3}> {/* REDUCED SPACING */}
//                                         {/* COMPACT Profile Image Section */}
//                                         <Grid item xs={12} display="flex" justifyContent="center" mb={2}> {/* REDUCED MARGIN */}
//                                             <Fade in={true} timeout={1200} style={{ transitionDelay: '400ms' }}>
//                                                 <Box 
//                                                     sx={{ 
//                                                         position: 'relative',
//                                                         display: 'flex',
//                                                         flexDirection: 'column',
//                                                         alignItems: 'center',
//                                                         gap: 1.5 // REDUCED GAP
//                                                     }}
//                                                 >
//                                                     <Box
//                                                         sx={{
//                                                             position: 'relative',
//                                                             '&:hover .photo-overlay': {
//                                                                 opacity: 1,
//                                                             }
//                                                         }}
//                                                     >
//                                                         <Avatar
//                                                             src={previewUrl || '/default-avatar.png'}
//                                                             alt="Profile Picture"
//                                                             sx={{ 
//                                                                 width: 100, // REDUCED SIZE
//                                                                 height: 100, // REDUCED SIZE
//                                                                 border: `3px solid ${themeColors.primary}`, // THINNER BORDER
//                                                                 boxShadow: isDarkMode 
//                                                                     ? `0 6px 25px ${colors.primary[900]}50` // REDUCED SHADOW
//                                                                     : '0 6px 25px rgba(139, 92, 246, 0.25)',
//                                                                 transition: 'all 0.3s ease',
//                                                                 fontSize: '2.5rem', // SMALLER FONT
//                                                                 backgroundColor: themeColors.background.secondary,
//                                                                 color: themeColors.text.secondary,
//                                                                 '&:hover': {
//                                                                     transform: 'scale(1.03)', // REDUCED SCALE
//                                                                     boxShadow: isDarkMode 
//                                                                         ? `0 8px 30px ${colors.primary[900]}70`
//                                                                         : '0 8px 30px rgba(139, 92, 246, 0.35)',
//                                                                 }
//                                                             }}
//                                                         >
//                                                             {!previewUrl && formData.name && formData.name.charAt(0).toUpperCase()}
//                                                             {!previewUrl && !formData.name && <Person sx={{ fontSize: '2.5rem' }} />}
//                                                         </Avatar>
                                                        
//                                                         <Box
//                                                             className="photo-overlay"
//                                                             sx={{
//                                                                 position: 'absolute',
//                                                                 top: 0,
//                                                                 left: 0,
//                                                                 right: 0,
//                                                                 bottom: 0,
//                                                                 borderRadius: '50%',
//                                                                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                                 opacity: 0,
//                                                                 transition: 'opacity 0.3s ease',
//                                                                 cursor: 'pointer',
//                                                             }}
//                                                         >
//                                                             <PhotoCamera sx={{ color: 'white', fontSize: '1.5rem' }} /> {/* SMALLER ICON */}
//                                                         </Box>
//                                                     </Box>

//                                                     <input
//                                                         accept="image/*"
//                                                         type="file"
//                                                         id="profile-image-input"
//                                                         hidden
//                                                         onChange={handleImageChange}
//                                                     />
//                                                     <label htmlFor="profile-image-input">
//                                                         <Tooltip title="Change Profile Picture">
//                                                             <Button
//                                                                 component="span"
//                                                                 variant="contained"
//                                                                 size="small" // SMALLER BUTTON
//                                                                 startIcon={<PhotoCamera sx={{ fontSize: '1rem' }} />} // SMALLER ICON
//                                                                 sx={{
//                                                                     backgroundColor: themeColors.primary,
//                                                                     borderRadius: 2, // REDUCED BORDER RADIUS
//                                                                     py: 1, // REDUCED PADDING
//                                                                     px: 2, // REDUCED PADDING
//                                                                     fontWeight: 600,
//                                                                     textTransform: 'none',
//                                                                     fontSize: '0.85rem', // SMALLER FONT
//                                                                     transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                                                                     boxShadow: `0 3px 12px ${themeColors.primary}35`, // REDUCED SHADOW
//                                                                     color: 'white',
//                                                                     '&:hover': { 
//                                                                         backgroundColor: themeColors.primaryDark,
//                                                                         transform: 'translateY(-1px) scale(1.01)', // REDUCED TRANSFORM
//                                                                         boxShadow: `0 6px 20px ${themeColors.primaryDark}50`,
//                                                                     },
//                                                                 }}
//                                                             >
//                                                                 Change Photo
//                                                             </Button>
//                                                         </Tooltip>
//                                                     </label>
//                                                 </Box>
//                                             </Fade>
//                                         </Grid>

//                                         {/* COMPACT Form Fields */}
//                                         <Grid item xs={12} md={6}>
//                                             <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
//                                                 <Box>
//                                                     <EnhancedTextField
//                                                         label="Full Name"
//                                                         name="name"
//                                                         value={formData.name}
//                                                         onChange={handleInputChange}
//                                                         icon={<Person />}
//                                                         required
//                                                         placeholder="Enter your full name"
//                                                     />
//                                                 </Box>
//                                             </Slide>
//                                         </Grid>

//                                         <Grid item xs={12} md={6}>
//                                             <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '700ms' }}>
//                                                 <Box>
//                                                     <EnhancedTextField
//                                                         label="Phone Number"
//                                                         name="phone"
//                                                         value={formData.phone}
//                                                         onChange={handleInputChange}
//                                                         icon={<Phone />}
//                                                         required
//                                                         placeholder="Enter your phone number"
//                                                         type="tel"
//                                                     />
//                                                 </Box>
//                                             </Slide>
//                                         </Grid>

//                                         <Grid item xs={12} md={6}>
//                                             <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
//                                                 <Box>
//                                                     <EnhancedTextField
//                                                         label="Shop Name"
//                                                         name="shopName"
//                                                         value={formData.shopName}
//                                                         onChange={handleInputChange}
//                                                         icon={<Store />}
//                                                         required
//                                                         placeholder="Enter your shop name"
//                                                     />
//                                                 </Box>
//                                             </Slide>
//                                         </Grid>

//                                         <Grid item xs={12} md={6}>
//                                             <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '900ms' }}>
//                                                 <Box>
//                                                     <EnhancedTextField
//                                                         label="Address"
//                                                         name="address"
//                                                         value={formData.address}
//                                                         onChange={handleInputChange}
//                                                         multiline={true}
//                                                         rows={2} // REDUCED ROWS
//                                                         icon={<LocationOn />}
//                                                         required
//                                                         placeholder="Enter your complete address"
//                                                     />
//                                                 </Box>
//                                             </Slide>
//                                         </Grid>

//                                         {/* COMPACT Submit Button */}
//                                         <Grid item xs={12} display="flex" justifyContent="flex-end" mt={1}> {/* REDUCED MARGIN */}
//                                             <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
//                                                 <Button
//                                                     type="submit"
//                                                     variant="contained"
//                                                     disabled={loading}
//                                                     startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Save sx={{ fontSize: '1.1rem' }} />} // SMALLER ICONS
//                                                     sx={{
//                                                         backgroundColor: themeColors.primary,
//                                                         borderRadius: 2, // REDUCED BORDER RADIUS
//                                                         py: 1.2, // REDUCED PADDING
//                                                         px: 3, // REDUCED PADDING
//                                                         fontWeight: 600,
//                                                         textTransform: 'none',
//                                                         fontSize: '1rem', // SMALLER FONT
//                                                         minWidth: 140, // REDUCED WIDTH
//                                                         position: 'relative',
//                                                         overflow: 'hidden',
//                                                         transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                                                         boxShadow: `0 3px 12px ${themeColors.primary}35`, // REDUCED SHADOW
//                                                         color: 'white',
//                                                         '&::before': !isDarkMode && {
//                                                             content: '""',
//                                                             position: 'absolute',
//                                                             top: 0,
//                                                             left: '-100%',
//                                                             width: '100%',
//                                                             height: '100%',
//                                                             background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
//                                                             transition: 'left 0.6s',
//                                                         },
//                                                         '&:hover': { 
//                                                             backgroundColor: themeColors.primaryDark,
//                                                             transform: 'translateY(-1px) scale(1.01)', // REDUCED TRANSFORM
//                                                             boxShadow: `0 6px 20px ${themeColors.primaryDark}50`,
//                                                             '&::before': !isDarkMode && {
//                                                                 left: '100%',
//                                                             },
//                                                         },
//                                                         '&:active': {
//                                                             transform: 'translateY(0) scale(0.99)', // REDUCED TRANSFORM
//                                                         },
//                                                         '&:disabled': {
//                                                             backgroundColor: `${themeColors.primary}60`,
//                                                             color: 'rgba(255, 255, 255, 0.7)',
//                                                             transform: 'none',
//                                                         },
//                                                     }}
//                                                 >
//                                                     {loading ? 'Saving...' : 'Save Changes'}
//                                                 </Button>
//                                             </Slide>
//                                         </Grid>
//                                     </Grid>
//                                 </form>
//                             </CardContent>
//                         </Card>
//                     </Box>
//                 </Fade>
//             </Box>
//         </Box>
//     );
// };

// export default Profile;
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { VendorContext } from '../Context/Context';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    CircularProgress,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
    Fade,
    Slide,
    IconButton,
    Tooltip,
    Alert,
    Snackbar
} from '@mui/material';
import { PhotoCamera, Person, Phone, Store, LocationOn, Save, Edit } from '@mui/icons-material';
import { tokens } from '../theme';
import { config } from '../Config/Config';

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isDarkMode = theme.palette.mode === 'dark';

    const { vendor, getVendorProfile, updateVendorProfile, loading } = useContext(VendorContext);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        shopName: '',
        address: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [isHovered, setIsHovered] = useState({});
    const { host } = config;

    // Define consistent color scheme matching Dashboard
    const themeColors = useMemo(() => ({
        primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
        primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
        primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
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
        success: isDarkMode ? colors.greenAccent : '#10b981',
        warning: isDarkMode ? '#fbbf24' : '#f59e0b',
        error: isDarkMode ? colors.redAccent : '#ef4444',
        info: isDarkMode ? colors.blueAccent : '#3b82f6',
    }), [isDarkMode, colors]);

    useEffect(() => {
        getVendorProfile();
    }, []);

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || '',
                phone: vendor.phone || '',
                shopName: vendor.shopName || '',
                address: vendor.address || ''
            });
            if (vendor.profileImage) {
                setPreviewUrl(`${host}/uploads/vendor/${vendor.profileImage}`);
            }
        }
    }, [vendor, host]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });
        if (profileImage) {
            submitData.append('profileImage', profileImage);
        }
        await updateVendorProfile(submitData);
        setAlertOpen(true);
    };

    return (
        <Box 
            sx={{
                m: "20px",
                position: 'relative',
                height: '85vh',
                overflow: 'hidden',
                '& *': {
                    scrollbarWidth: 'none !important',
                    msOverflowStyle: 'none !important',
                    '&::-webkit-scrollbar': {
                        display: 'none !important',
                        width: '0px !important',
                        background: 'transparent !important',
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
            }}
        >
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    sx={{ 
                        borderRadius: 3,
                        border: `2px solid ${themeColors.success}30`,
                        background: themeColors.background.primary,
                        backdropFilter: 'blur(10px)',
                        color: themeColors.text.primary,
                        '& .MuiAlert-icon': {
                            color: themeColors.success
                        },
                    }}
                    onClose={() => setAlertOpen(false)}
                >
                    Profile updated successfully!
                </Alert>
            </Snackbar>

            {/* COMPACT Header Section */}
            <Slide direction="down" in={true} timeout={800}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box>
                        <Typography 
                            variant="h3"
                            color={themeColors.text.primary}
                            fontWeight="bold" 
                            sx={{ mb: "3px" }}
                        >
                            PROFILE SETTINGS
                        </Typography>
                        <Typography 
                            variant="h6"
                            color={themeColors.primary}
                            fontWeight={500}
                        >
                            Manage your account information
                        </Typography>
                    </Box>
                </Box>
            </Slide>

            {/* COMPACT SCROLLABLE CONTENT */}
            <Box
                sx={{
                    height: 'calc(100vh - 140px)',
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    paddingRight: '17px',
                    marginRight: '-17px',
                }}
            >
                <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                    {/* COMPACT FORM CONTAINER */}
                    <Box
                        sx={{
                            maxWidth: '900px',
                            margin: '0 auto',
                        }}
                    >
                        <Card
                            onMouseEnter={() => setIsHovered(prev => ({ ...prev, mainCard: true }))}
                            onMouseLeave={() => setIsHovered(prev => ({ ...prev, mainCard: false }))}
                            sx={{
                                background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                                backdropFilter: 'blur(10px)',
                                border: `2px solid ${isHovered.mainCard ? themeColors.border.hover : themeColors.border.default}`,
                                borderRadius: 3,
                                overflow: 'hidden',
                                position: 'relative',
                                transform: isHovered.mainCard ? 'translateY(-2px)' : 'translateY(0)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                boxShadow: isHovered.mainCard 
                                    ? isDarkMode
                                        ? `0 15px 35px -10px ${colors.primary[900]}50`
                                        : '0 15px 35px rgba(139, 92, 246, 0.12), 0 8px 18px rgba(139, 92, 246, 0.08)'
                                    : isDarkMode
                                        ? undefined
                                        : '0 8px 25px rgba(167, 139, 250, 0.08), 0 4px 12px rgba(167, 139, 250, 0.04)',
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
                                    height: '3px',
                                    background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
                                    animation: 'shimmer 2s ease-in-out infinite',
                                },
                                '@keyframes shimmer': {
                                    '0%': { backgroundPosition: '-200% 0' },
                                    '100%': { backgroundPosition: '200% 0' }
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        {/* COMPACT Profile Image Section */}
                                        <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
                                            <Fade in={true} timeout={1200} style={{ transitionDelay: '400ms' }}>
                                                <Box 
                                                    sx={{ 
                                                        position: 'relative',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: 1.5
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: 'relative',
                                                            '&:hover .photo-overlay': {
                                                                opacity: 1,
                                                            }
                                                        }}
                                                    >
                                                        <Avatar
                                                            src={previewUrl || '/default-avatar.png'}
                                                            alt="Profile Picture"
                                                            sx={{ 
                                                                width: 100,
                                                                height: 100,
                                                                border: `3px solid ${themeColors.primary}`,
                                                                boxShadow: isDarkMode 
                                                                    ? `0 6px 25px ${colors.primary[900]}50`
                                                                    : '0 6px 25px rgba(139, 92, 246, 0.25)',
                                                                transition: 'all 0.3s ease',
                                                                fontSize: '2.5rem',
                                                                backgroundColor: themeColors.background.secondary,
                                                                color: themeColors.text.secondary,
                                                                '&:hover': {
                                                                    transform: 'scale(1.03)',
                                                                    boxShadow: isDarkMode 
                                                                        ? `0 8px 30px ${colors.primary[900]}70`
                                                                        : '0 8px 30px rgba(139, 92, 246, 0.35)',
                                                                }
                                                            }}
                                                        >
                                                            {!previewUrl && formData.name && formData.name.charAt(0).toUpperCase()}
                                                            {!previewUrl && !formData.name && <Person sx={{ fontSize: '2.5rem' }} />}
                                                        </Avatar>
                                                        
                                                        <Box
                                                            className="photo-overlay"
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                borderRadius: '50%',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                opacity: 0,
                                                                transition: 'opacity 0.3s ease',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <PhotoCamera sx={{ color: 'white', fontSize: '1.5rem' }} />
                                                        </Box>
                                                    </Box>

                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="profile-image-input"
                                                        hidden
                                                        onChange={handleImageChange}
                                                    />
                                                    <label htmlFor="profile-image-input">
                                                        <Tooltip title="Change Profile Picture">
                                                            <Button
                                                                component="span"
                                                                variant="contained"
                                                                size="small"
                                                                startIcon={<PhotoCamera sx={{ fontSize: '1rem' }} />}
                                                                sx={{
                                                                    backgroundColor: themeColors.primary,
                                                                    borderRadius: 2,
                                                                    py: 1,
                                                                    px: 2,
                                                                    fontWeight: 600,
                                                                    textTransform: 'none',
                                                                    fontSize: '0.85rem',
                                                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                                    boxShadow: `0 3px 12px ${themeColors.primary}35`,
                                                                    color: 'white',
                                                                    '&:hover': { 
                                                                        backgroundColor: themeColors.primaryDark,
                                                                        transform: 'translateY(-1px) scale(1.01)',
                                                                        boxShadow: `0 6px 20px ${themeColors.primaryDark}50`,
                                                                    },
                                                                }}
                                                            >
                                                                Change Photo
                                                            </Button>
                                                        </Tooltip>
                                                    </label>
                                                </Box>
                                            </Fade>
                                        </Grid>

                                        {/* Simple TextField Components (From Working Code) */}
                                        <Grid item xs={12} md={6}>
                                            <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2,
                                                            '& fieldset': {
                                                                borderColor: themeColors.border.default,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: themeColors.border.hover,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: themeColors.primary,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: themeColors.text.secondary,
                                                            '&.Mui-focused': {
                                                                color: themeColors.primary,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Slide>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '700ms' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2,
                                                            '& fieldset': {
                                                                borderColor: themeColors.border.default,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: themeColors.border.hover,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: themeColors.primary,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: themeColors.text.secondary,
                                                            '&.Mui-focused': {
                                                                color: themeColors.primary,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Slide>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Shop Name"
                                                    name="shopName"
                                                    value={formData.shopName}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2,
                                                            '& fieldset': {
                                                                borderColor: themeColors.border.default,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: themeColors.border.hover,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: themeColors.primary,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: themeColors.text.secondary,
                                                            '&.Mui-focused': {
                                                                color: themeColors.primary,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Slide>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '900ms' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    multiline
                                                    rows={2}
                                                    size="small"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2,
                                                            '& fieldset': {
                                                                borderColor: themeColors.border.default,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: themeColors.border.hover,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: themeColors.primary,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: themeColors.text.secondary,
                                                            '&.Mui-focused': {
                                                                color: themeColors.primary,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Slide>
                                        </Grid>

                                        {/* Submit Button */}
                                        <Grid item xs={12} display="flex" justifyContent="flex-end" mt={1}>
                                            <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={loading}
                                                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Save sx={{ fontSize: '1.1rem' }} />}
                                                    sx={{
                                                        backgroundColor: themeColors.primary,
                                                        borderRadius: 2,
                                                        py: 1.2,
                                                        px: 3,
                                                        fontWeight: 600,
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
                                                        minWidth: 140,
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                        boxShadow: `0 3px 12px ${themeColors.primary}35`,
                                                        color: 'white',
                                                        '&:hover': { 
                                                            backgroundColor: themeColors.primaryDark,
                                                            transform: 'translateY(-1px) scale(1.01)',
                                                            boxShadow: `0 6px 20px ${themeColors.primaryDark}50`,
                                                        },
                                                        '&:active': {
                                                            transform: 'translateY(0) scale(0.99)',
                                                        },
                                                        '&:disabled': {
                                                            backgroundColor: `${themeColors.primary}60`,
                                                            color: 'rgba(255, 255, 255, 0.7)',
                                                            transform: 'none',
                                                        },
                                                    }}
                                                >
                                                    {loading ? 'Saving...' : 'Save Changes'}
                                                </Button>
                                            </Slide>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
};

export default Profile;
