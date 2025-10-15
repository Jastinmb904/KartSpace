// import React, { useState, useContext, useEffect } from 'react';
// import {
//     Box, Paper, Typography, TextField, InputAdornment,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     IconButton, Chip, Avatar, Tooltip
// } from '@mui/material';
// import { Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { AdminContext } from '../Context/Context';
// import Swal from 'sweetalert2';

// const Users = () => {
//     const { getUsers, deleteUser } = useContext(AdminContext);
//     const [users, setUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const data = await getUsers();
//             if (data.success) {
//                 setUsers(data.users);
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             Swal.fire('Error', 'Failed to load users', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteUser = async (userId) => {
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
//                 const success = await deleteUser(userId);
//                 if (success) {
//                     Swal.fire('Deleted!', 'User has been deleted.', 'success');
//                     fetchUsers();
//                 }
//             }
//         } catch (error) {
//             console.error('Error deleting user:', error);
//             Swal.fire('Error', 'Failed to delete user', 'error');
//         }
//     };

//     const filteredUsers = users.filter(user =>
//         user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

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
//                     Users Management
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                     View and manage all users
//                 </Typography>
//             </Paper>

//             <Paper sx={{ p: 2, mb: 3 }}>
//                 <TextField
//                     fullWidth
//                     placeholder="Search by name or email..."
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
//                             <TableCell>User</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Phone</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell align="center">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">
//                                     <Typography>Loading users...</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : filteredUsers.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">
//                                     <Typography>No users found</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             filteredUsers.map((user) => (
//                                 <TableRow key={user._id}>
//                                     <TableCell>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                                             <Avatar src={user.profileImage} />
//                                             <Typography>{user.name}</Typography>
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell>{user.email}</TableCell>
//                                     <TableCell>{user.phone || 'N/A'}</TableCell>
//                                     <TableCell>
//                                         <Chip
//                                             label={user.status || 'active'}
//                                             color={user.status === 'active' ? 'success' : 'default'}
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Tooltip title="Delete User">
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={() => handleDeleteUser(user._id)}
//                                             >
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Tooltip>
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

// export default Users;



import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
    Box, Paper, Typography, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, Avatar, Tooltip, useTheme, Skeleton, Fade, Slide
} from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon, Person, Email, Phone, Group } from '@mui/icons-material';
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

const Users = () => {
    const { getUsers, deleteUser } = useContext(AdminContext);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === 'dark';

    // UPDATED: Purple/Violet Color Scheme
    const themeColors = useMemo(() => ({
        primary: '#8b5cf6', // Violet-500
        primaryLight: '#a78bfa', // Violet-400
        primaryDark: '#7c3aed', // Violet-600
        text: {
            primary: isDarkMode ? colors.gray[100] : '#1f2937',
            secondary: isDarkMode ? colors.gray[300] : '#6b7280',
            accent: isDarkMode ? colors.gray[200] : '#374151',
        },
        background: {
            primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)', // Violet-50 based
            secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)', // Violet-100 based
            hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
        },
        border: {
            default: isDarkMode ? colors.primary[600] : '#a78bfa', // Violet-400
            hover: isDarkMode ? colors.primary[500] : '#8b5cf6', // Violet-500
        },
        success: isDarkMode ? colors.greenAccent[500] : '#10b981',
        warning: isDarkMode ? '#fbbf24' : '#f59e0b',
        error: isDarkMode ? colors.redAccent[500] : '#ef4444',
        info: isDarkMode ? colors.blueAccent[500] : '#3b82f6',
    }), [isDarkMode, colors]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            Swal.fire('Error', 'Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
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
                const success = await deleteUser(userId);
                if (success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'User has been deleted.',
                        icon: 'success',
                        background: isDarkMode ? colors.primary[400] : '#ffffff',
                        color: themeColors.text.primary,
                        confirmButtonColor: themeColors.primary
                    });
                    fetchUsers();
                }
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete user',
                icon: 'error',
                background: isDarkMode ? colors.primary[400] : '#ffffff',
                color: themeColors.text.primary,
                confirmButtonColor: themeColors.primary
            });
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Box 
                sx={{ 
                    p: { xs: 2, sm: 3 },
                    position: 'relative',
                    minHeight: '100vh',
                    // UPDATED: Purple background gradients
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
                // UPDATED: Purple background gradients
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
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar
                            sx={{
                                bgcolor: `${themeColors.primary}15`,
                                width: 56,
                                height: 56,
                                border: `2px solid ${themeColors.primary}30`,
                            }}
                        >
                            <Group sx={{ color: themeColors.primary, fontSize: 28 }} />
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
                                Users Management
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: themeColors.text.secondary,
                                    fontWeight: 500
                                }}
                            >
                                View and manage all registered users
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
                            icon={<Person fontSize="small" />}
                            label={`Total Users: ${users.length}`}
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
                            icon={<SearchIcon fontSize="small" />}
                            label={`Showing: ${filteredUsers.length}`}
                            sx={{
                                bgcolor: `${themeColors.info}15`,
                                color: themeColors.text.primary,
                                border: `1px solid ${themeColors.info}30`,
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                    color: themeColors.info
                                }
                            }}
                        />
                    </Box>
                </Paper>
            </Slide>

            {/* Search Section */}
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
                        placeholder="Search by name or email..."
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
                                        <Person fontSize="small" />
                                        User
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Email fontSize="small" />
                                        Email
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Phone fontSize="small" />
                                        Phone
                                    </Box>
                                </TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                        <Typography sx={{ color: themeColors.text.secondary }}>
                                            Loading users...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                        <Typography sx={{ color: themeColors.text.secondary }}>
                                            No users found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user, index) => (
                                    <TableRow 
                                        key={user._id}
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
                                                    src={user.profileImage}
                                                    sx={{
                                                        width: 45,
                                                        height: 45,
                                                        border: `2px solid ${themeColors.border.default}`,
                                                        boxShadow: `0 4px 12px ${themeColors.primary}20`
                                                    }}
                                                >
                                                    {user.name?.charAt(0)?.toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography 
                                                        fontWeight="600"
                                                        sx={{ color: themeColors.text.primary }}
                                                    >
                                                        {user.name}
                                                    </Typography>
                                                    <Typography 
                                                        variant="caption"
                                                        sx={{ color: themeColors.text.secondary }}
                                                    >
                                                        ID: {user._id?.slice(-6)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: themeColors.text.primary }}>
                                                {user.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: themeColors.text.primary }}>
                                                {user.phone || 'N/A'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status || 'active'}
                                                color={user.status === 'active' ? 'success' : 'default'}
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    borderRadius: 2,
                                                    ...(user.status === 'active' && {
                                                        bgcolor: `${themeColors.success}20`,
                                                        color: themeColors.success,
                                                        border: `1px solid ${themeColors.success}30`
                                                    })
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Delete User">
                                                <IconButton
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    sx={{
                                                        color: themeColors.error,
                                                        backgroundColor: `${themeColors.error}10`,
                                                        border: `1px solid ${themeColors.error}30`,
                                                        borderRadius: 2,
                                                        '&:hover': {
                                                            backgroundColor: `${themeColors.error}20`,
                                                            borderColor: themeColors.error,
                                                            transform: 'scale(1.1)'
                                                        },
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
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

export default Users;
