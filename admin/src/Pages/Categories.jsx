// import React, { useState, useContext, useEffect } from 'react';
// import {
//     Box, Paper, Typography, Button,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     Modal, TextField, IconButton
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { AdminContext } from '../Context/Context';
// import Swal from 'sweetalert2';

// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 2
// };

// const Categories = () => {
//     const { getCategories, addCategory, updateCategory, deleteCategory } = useContext(AdminContext);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [openModal, setOpenModal] = useState(false);
//     const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [categoryName, setCategoryName] = useState('');

//     const fetchCategories = async () => {
//         try {
//             const data = await getCategories();
//             if (data.success) {
//                 setCategories(data.categories);
//             }
//         } catch (error) {
//             Swal.fire('Error', 'Failed to load categories', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const handleOpenModal = (mode, category = null) => {
//         setModalMode(mode);
//         setSelectedCategory(category);
//         setCategoryName(category ? category.name : '');
//         setOpenModal(true);
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//         setSelectedCategory(null);
//         setCategoryName('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (modalMode === 'add') {
//                 const result = await addCategory(categoryName);
//                 if (result.success) {
//                     Swal.fire('Success', 'Category added successfully', 'success');
//                 }
//             } else {
//                 const result = await updateCategory(selectedCategory._id, categoryName);
//                 if (result.success) {
//                     Swal.fire('Success', 'Category updated successfully', 'success');
//                 }
//             }
//             handleCloseModal();
//             fetchCategories();
//         } catch (error) {
//             Swal.fire('Error', error.response?.data?.message || 'Operation failed', 'error');
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
//                 const response = await deleteCategory(id);
//                 if (response.success) {
//                     Swal.fire('Deleted!', 'Category has been deleted.', 'success');
//                     fetchCategories();
//                 }
//             }
//         } catch (error) {
//             Swal.fire('Error', 'Failed to delete category', 'error');
//         }
//     };

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
//                     Categories Management
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     Manage product categories
//                 </Typography>
//             </Paper>

//             <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mb: 3, color: 'green', fontWeight: 'bold', backgroundColor: 'white' }}
//                 onClick={() => handleOpenModal('add')}
//             >
//                 Add New Category
//             </Button>

//             <TableContainer 
//                 component={Paper} 
//                 sx={{ 
//                     borderRadius: 3,
//                     overflow: 'hidden',
//                     boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//                     // background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
//                     border: '1px solid rgba(255,255,255,0.2)'
//                 }}
//             >
//                 <Table sx={{ minWidth: 650 }}>
//                     <TableHead>
//                         <TableRow sx={{
//                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                             '& .MuiTableCell-head': {
//                                 color: 'white',
//                                 fontWeight: 'bold',
//                                 fontSize: '1.1rem',
//                                 textTransform: 'uppercase',
//                                 letterSpacing: '0.5px',
//                                 borderBottom: 'none',
//                                 py: 2.5
//                             }
//                         }}>
//                             <TableCell>Name</TableCell>
//                             <TableCell align="right">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell 
//                                     colSpan={2} 
//                                     align="center"
//                                     sx={{
//                                         py: 6,
//                                         fontSize: '1.1rem',
//                                         color: '#666',
//                                         fontStyle: 'italic'
//                                     }}
//                                 >
//                                     Loading...
//                                 </TableCell>
//                             </TableRow>
//                         ) : categories.length === 0 ? (
//                             <TableRow>
//                                 <TableCell 
//                                     colSpan={2} 
//                                     align="center"
//                                     sx={{
//                                         py: 6,
//                                         fontSize: '1.1rem',
//                                         color: '#666',
//                                         fontStyle: 'italic'
//                                     }}
//                                 >
//                                     No categories found
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             categories.map((category, index) => (
//                                 <TableRow 
//                                     key={category._id}
//                                     sx={{
//                                         '&:hover': {
//                                             background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
//                                             transform: 'translateY(-1px)',
//                                             boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
//                                         },
//                                         transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                                         borderLeft: '4px solid transparent',
//                                         '&:hover': {
//                                             ...{
//                                                 background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
//                                                 transform: 'translateY(-1px)',
//                                                 boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
//                                             },
//                                             borderLeft: '4px solid #667eea'
//                                         }
//                                     }}
//                                 >
//                                     <TableCell sx={{
//                                         fontSize: '1rem',
//                                         fontWeight: '500',
//                                         color: 'yellow',
//                                         py: 2.5,
//                                         px: 3,
//                                         borderBottom: '1px solid rgba(0,0,0,0.06)'
//                                     }}>
//                                         {category.name}
//                                     </TableCell>
//                                     <TableCell 
//                                         align="right"
//                                         sx={{
//                                             py: 2.5,
//                                             px: 3,
//                                             borderBottom: '1px solid rgba(0,0,0,0.06)'
//                                         }}
//                                     >
//                                         <IconButton
//                                             onClick={() => handleOpenModal('edit', category)}
//                                             sx={{
//                                                 mr: 1,
//                                                 background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//                                                 color: 'white',
//                                                 borderRadius: '12px',
//                                                 padding: '8px',
//                                                 '&:hover': {
//                                                     background: 'linear-gradient(135deg, #43a3f5 0%, #0ee9f5 100%)',
//                                                     transform: 'translateY(-2px)',
//                                                     boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)'
//                                                 },
//                                                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                                                 '& .MuiSvgIcon-root': {
//                                                     fontSize: '1.2rem'
//                                                 }
//                                             }}
//                                         >
//                                             <EditIcon />
//                                         </IconButton>

//                                         <IconButton
//                                             onClick={() => handleDelete(category._id)}
//                                             sx={{
//                                                 background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
//                                                 color: 'white',
//                                                 borderRadius: '12px',
//                                                 padding: '8px',
//                                                 '&:hover': {
//                                                     background: 'linear-gradient(135deg, #ff5252 0%, #e53935 100%)',
//                                                     transform: 'translateY(-2px)',
//                                                     boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
//                                                 },
//                                                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                                                 '& .MuiSvgIcon-root': {
//                                                     fontSize: '1.2rem'
//                                                 }
//                                             }}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Modal
//                 open={openModal}
//                 onClose={handleCloseModal}
//             >
//                 <Box sx={modalStyle}>
//                     <Typography variant="h6" component="h2" mb={3}>
//                         {modalMode === 'add' ? 'Add New Category' : 'Edit Category'}
//                     </Typography>
//                     <form onSubmit={handleSubmit}>
//                         <TextField
//                             fullWidth
//                             label="Category Name"
//                             value={categoryName}
//                             onChange={(e) => setCategoryName(e.target.value)}
//                             required
//                             sx={{ mb: 3 }}
//                         />
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                             <Button onClick={handleCloseModal}>Cancel</Button>
//                             <Button type="submit" variant="contained">
//                                 {modalMode === 'add' ? 'Add' : 'Update'}
//                             </Button>
//                         </Box>
//                     </form>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default Categories;



import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
    Box, Paper, Typography, Button, useTheme, Skeleton, Fade, Slide,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Modal, TextField, IconButton, Avatar, Chip
} from '@mui/material';
import { 
    Edit as EditIcon, 
    Delete as DeleteIcon, 
    Add as AddIcon,
    Category as CategoryIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { AdminContext } from '../Context/Context';
import Swal from 'sweetalert2';

// Tokens function for theme colors
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

const Categories = () => {
    const { getCategories, addCategory, updateCategory, deleteCategory } = useContext(AdminContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === 'dark';

    // Purple Color Scheme
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
        success: isDarkMode ? colors.greenAccent : '#10b981',
        warning: isDarkMode ? '#fbbf24' : '#f59e0b',
        error: isDarkMode ? colors.redAccent : '#ef4444',
        info: isDarkMode ? colors.blueAccent : '#3b82f6',
    }), [isDarkMode, colors]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to load categories',
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
        fetchCategories();
    }, []);

    const handleOpenModal = (mode, category = null) => {
        setModalMode(mode);
        setSelectedCategory(category);
        setCategoryName(category ? category.name : '');
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCategory(null);
        setCategoryName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                const result = await addCategory(categoryName);
                if (result.success) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Category added successfully',
                        icon: 'success',
                        background: isDarkMode ? colors.primary[400] : '#ffffff',
                        color: themeColors.text.primary,
                        confirmButtonColor: themeColors.primary
                    });
                }
            } else {
                const result = await updateCategory(selectedCategory._id, categoryName);
                if (result.success) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Category updated successfully',
                        icon: 'success',
                        background: isDarkMode ? colors.primary[400] : '#ffffff',
                        color: themeColors.text.primary,
                        confirmButtonColor: themeColors.primary
                    });
                }
            }
            handleCloseModal();
            fetchCategories();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Operation failed',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
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
                confirmButtonText: 'Yes, delete it!',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary
            });

            if (result.isConfirmed) {
                const response = await deleteCategory(id);
                if (response.success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Category has been deleted.',
                        icon: 'success',
                        background: isDarkMode ? colors.primary[400] : '#ffffff',
                        color: themeColors.text.primary,
                        confirmButtonColor: themeColors.primary
                    });
                    fetchCategories();
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete category',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
        }
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
            {/* Enhanced Header Section */}
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
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                                sx={{
                                    bgcolor: `${themeColors.primary}15`,
                                    width: 56,
                                    height: 56,
                                    border: `2px solid ${themeColors.primary}30`,
                                }}
                            >
                                <CategoryIcon sx={{ color: themeColors.primary, fontSize: 28 }} />
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
                                    Categories Management
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: themeColors.text.secondary,
                                        fontWeight: 500
                                    }}
                                >
                                    Manage product categories
                                </Typography>
                            </Box>
                        </Box>
                        
                        {/* Category Stats */}
                        <Chip
                            icon={<CategoryIcon fontSize="small" />}
                            label={`Total Categories: ${categories.length}`}
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
                    </Box>
                </Paper>
            </Slide>

            {/* Add Category Button */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenModal('add')}
                        sx={{
                            background: `linear-gradient(135deg, ${themeColors.success}, ${colors.greenAccent[400]})`,
                            color: 'white',
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            boxShadow: `0 8px 25px ${themeColors.success}30`,
                            '&:hover': {
                                background: `linear-gradient(135deg, ${colors.greenAccent[600]}, ${themeColors.success})`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 12px 35px ${themeColors.success}40`,
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Add New Category
                    </Button>
                </Box>
            </Fade>

            {/* Enhanced Table */}
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
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow 
                                sx={{ 
                                    background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                    '& .MuiTableCell-head': {
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        borderBottom: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        py: 2.5
                                    }
                                }}
                            >
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <CategoryIcon fontSize="small" />
                                        Category Name
                                    </Box>
                                </TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell 
                                        colSpan={2} 
                                        align="center"
                                        sx={{ py: 6, color: themeColors.text.secondary }}
                                    >
                                        Loading categories...
                                    </TableCell>
                                </TableRow>
                            ) : categories.length === 0 ? (
                                <TableRow>
                                    <TableCell 
                                        colSpan={2} 
                                        align="center"
                                        sx={{ py: 6, color: themeColors.text.secondary }}
                                    >
                                        No categories found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category, index) => (
                                    <TableRow 
                                        key={category._id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: themeColors.background.hover,
                                                transform: 'translateY(-1px)',
                                                transition: 'all 0.2s ease'
                                            },
                                            '& .MuiTableCell-body': {
                                                color: themeColors.text.primary,
                                                borderBottom: `1px solid ${themeColors.border.default}30`,
                                                py: 2.5,
                                                px: 3
                                            }
                                        }}
                                    >
                                        <TableCell>
                                            <Typography 
                                                fontWeight="600"
                                                sx={{ 
                                                    color: themeColors.text.primary,
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                {category.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                                <IconButton
                                                    onClick={() => handleOpenModal('edit', category)}
                                                    sx={{
                                                        background: `linear-gradient(135deg, ${themeColors.info}, ${colors.blueAccent[400]})`,
                                                        color: 'white',
                                                        borderRadius: 2,
                                                        padding: '8px',
                                                        '&:hover': {
                                                            background: `linear-gradient(135deg, ${colors.blueAccent[600]}, ${themeColors.info})`,
                                                            transform: 'translateY(-2px) scale(1.05)',
                                                            boxShadow: `0 8px 25px ${themeColors.info}40`
                                                        },
                                                        transition: 'all 0.3s ease',
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: '1.2rem'
                                                        }
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => handleDelete(category._id)}
                                                    sx={{
                                                        background: `linear-gradient(135deg, ${themeColors.error}, ${colors.redAccent[400]})`,
                                                        color: 'white',
                                                        borderRadius: 2,
                                                        padding: '8px',
                                                        '&:hover': {
                                                            background: `linear-gradient(135deg, ${colors.redAccent[600]}, ${themeColors.error})`,
                                                            transform: 'translateY(-2px) scale(1.05)',
                                                            boxShadow: `0 8px 25px ${themeColors.error}40`
                                                        },
                                                        transition: 'all 0.3s ease',
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: '1.2rem'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fade>

            {/* Enhanced Modal */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Fade in={openModal} timeout={500}>
                    <Box
                        sx={{
                            width: { xs: '90%', sm: 500 },
                            background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${themeColors.border.default}`,
                            borderRadius: 4,
                            boxShadow: isDarkMode
                                ? `0 25px 50px ${colors.primary[900]}60`
                                : '0 25px 50px rgba(139, 92, 246, 0.25)',
                            overflow: 'hidden',
                            position: 'relative',
                            '&::before': !isDarkMode && {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `
                                    radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.4) 0%, transparent 30%),
                                    radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.3) 0%, transparent 30%)
                                `,
                                pointerEvents: 'none',
                            }
                        }}
                    >
                        {/* Modal Header */}
                        <Box
                            sx={{
                                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                color: 'white',
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '4px',
                                    background: `linear-gradient(90deg, ${themeColors.primaryDark}, ${themeColors.primaryLight})`,
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <CategoryIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {modalMode === 'add' ? 'Add New Category' : 'Edit Category'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        {modalMode === 'add' ? 'Create a new product category' : 'Update category information'}
                                    </Typography>
                                </Box>
                            </Box>
                            <IconButton
                                onClick={handleCloseModal}
                                sx={{
                                    color: 'white',
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Modal Content */}
                        <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Category Name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{
                                        mb: 4,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: isDarkMode ? `${colors.primary[100]}` : 'rgba(255, 255, 255, 0.9)',
                                            border: `2px solid ${themeColors.border.default}`,
                                            '&:hover': {
                                                borderColor: themeColors.border.hover,
                                            },
                                            '&.Mui-focused': {
                                                borderColor: themeColors.primary,
                                                boxShadow: `0 0 0 3px ${themeColors.primary}20`,
                                            }
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: isDarkMode ? colors.gray[700] : themeColors.text.secondary,
                                            fontWeight: 500,
                                            '&.Mui-focused': {
                                                color: themeColors.primary,
                                            }
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: isDarkMode ? colors.gray[900] : themeColors.text.primary,
                                            fontSize: '1.1rem',
                                            py: 1.5
                                        }
                                    }}
                                />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button 
                                        onClick={handleCloseModal}
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 3,
                                            borderColor: themeColors.border.default,
                                            color: themeColors.text.primary,
                                            borderWidth: '2px',
                                            px: 3,
                                            py: 1.5,
                                            fontWeight: 600,
                                            '&:hover': {
                                                borderColor: themeColors.border.hover,
                                                backgroundColor: themeColors.background.hover,
                                            }
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        variant="contained"
                                        sx={{
                                            borderRadius: 3,
                                            background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                                            color: 'white',
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            '&:hover': {
                                                background: `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary})`,
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 12px 35px ${themeColors.primary}40`
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {modalMode === 'add' ? 'Add Category' : 'Update Category'}
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default Categories;
