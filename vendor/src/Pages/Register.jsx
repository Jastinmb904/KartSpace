import React, { useState, useContext } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Container,
    Link,
    Grid,
    InputAdornment,
    IconButton,
    Fade,
    Slide,
    Alert,
    Snackbar,
} from '@mui/material';
import { VendorContext } from '../Context/Context';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Email, 
    Lock, 
    Store, 
    Person, 
    Phone, 
    LocationOn, 
    Visibility, 
    VisibilityOff,
    PhotoCamera,
    ShoppingCart, 
    ShoppingBag, 
    LocalMall, 
    CardGiftcard 
} from '@mui/icons-material';

const Register = () => {
    const { RegisterVendor, loading } = useContext(VendorContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        shopName: '',
        address: '',
        profileImage: null
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'error' // 'error', 'warning', 'info', 'success'
    });

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    const showAlert = (message, severity = 'error') => {
        setAlert({
            open: true,
            message,
            severity
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // Validation for name field - only letters and spaces
        if (name === 'name') {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
            if (filteredValue !== value) {
                showAlert('Name can only contain letters and spaces', 'warning');
            }
            newValue = filteredValue;
        }
        
        // Validation for phone field - only numbers
        if (name === 'phone') {
            const filteredValue = value.replace(/[^0-9]/g, '');
            if (filteredValue !== value) {
                showAlert('Phone number can only contain numbers', 'warning');
            }
            // Limit to 10 digits
            if (filteredValue.length > 10) {
                showAlert('Phone number cannot exceed 10 digits', 'warning');
                newValue = filteredValue.slice(0, 10);
            } else {
                newValue = filteredValue;
            }
        }

        setFormData({
            ...formData,
            [name]: newValue
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                showAlert('Please upload only JPG, PNG, or WebP image files', 'error');
                return;
            }
            
            // Validate file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                showAlert('Image size must be less than 5MB', 'error');
                return;
            }

            setFormData({
                ...formData,
                profileImage: file
            });
            showAlert('Profile image uploaded successfully!', 'success');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let firstError = '';
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            if (!firstError) firstError = 'Please enter your full name';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
            if (!firstError) firstError = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = 'Name should contain only letters and spaces';
            if (!firstError) firstError = 'Name can only contain letters and spaces';
        }

        // Shop name validation
        if (!formData.shopName.trim()) {
            newErrors.shopName = 'Shop name is required';
            if (!firstError) firstError = 'Please enter your shop name';
        } else if (formData.shopName.trim().length < 2) {
            newErrors.shopName = 'Shop name must be at least 2 characters';
            if (!firstError) firstError = 'Shop name must be at least 2 characters long';
        }
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            if (!firstError) firstError = 'Please enter your email address';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            if (!firstError) firstError = 'Please enter a valid email address (e.g., user@example.com)';
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            if (!firstError) firstError = 'Please create a password';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            if (!firstError) firstError = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
            if (!firstError) firstError = 'Password must include uppercase letter, lowercase letter, and number';
        }
        
        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
            if (!firstError) firstError = 'Please enter your phone number';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
            if (!firstError) firstError = 'Phone number must be exactly 10 digits';
        }
        
        setErrors(newErrors);
        
        // Show alert for first error found
        if (firstError) {
            showAlert(firstError, 'error');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const formDataObj = new FormData();
                Object.keys(formData).forEach(key => {
                    formDataObj.append(key, formData[key]);
                });
                
                showAlert('Creating your account...', 'info');
                await RegisterVendor(formDataObj);
                showAlert('Account created successfully! Welcome to our platform!', 'success');
                
            } catch (error) {
                showAlert('Registration failed. Please try again.', 'error');
            }
        }
    };

    // Shopping icons data for animation
    const shoppingIcons = [
        { Icon: ShoppingCart, delay: '0s', duration: '8s', x: '5%', y: '10%' },
        { Icon: ShoppingBag, delay: '2s', duration: '10s', x: '90%', y: '15%' },
        { Icon: LocalMall, delay: '1s', duration: '12s', x: '15%', y: '75%' },
        { Icon: Store, delay: '3s', duration: '9s', x: '85%', y: '70%' },
        { Icon: CardGiftcard, delay: '4s', duration: '11s', x: '10%', y: '45%' },
        { Icon: ShoppingCart, delay: '5s', duration: '7s', x: '80%', y: '35%' },
        { Icon: ShoppingBag, delay: '1.5s', duration: '13s', x: '25%', y: '25%' },
        { Icon: LocalMall, delay: '3.5s', duration: '9.5s', x: '95%', y: '55%' },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: `
                    radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
                    linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
                `,
                padding: 1,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(circle at 60% 30%, rgba(196, 181, 253, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 30% 70%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)
                    `,
                    animation: 'float 6s ease-in-out infinite',
                },
                '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' }
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
                '@keyframes floatDiagonal': {
                    '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
                    '25%': { transform: 'translate(15px, -20px) rotate(15deg)' },
                    '50%': { transform: 'translate(-10px, -35px) rotate(-10deg)' },
                    '75%': { transform: 'translate(20px, -15px) rotate(20deg)' },
                    '100%': { transform: 'translate(0px, 0px) rotate(0deg)' }
                },
                '@keyframes pulse': {
                    '0%': { opacity: 0.4, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.1)' },
                    '100%': { opacity: 0.4, transform: 'scale(1)' }
                }
            }}
        >
            {/* Alert Snackbar */}
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ zIndex: 9999 }}
            >
                <Alert 
                    onClose={handleCloseAlert} 
                    severity={alert.severity}
                    variant="filled"
                    sx={{
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        '& .MuiAlert-icon': {
                            fontSize: '1.2rem'
                        }
                    }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>

            {/* Animated Shopping Icons Background */}
            {shoppingIcons.map((item, index) => {
                const animationType = index % 4 === 0 ? 'floatUpDown' : 
                                    index % 4 === 1 ? 'floatLeftRight' : 
                                    index % 4 === 2 ? 'floatDiagonal' : 'pulse';
                
                return (
                    <item.Icon
                        key={index}
                        sx={{
                            position: 'absolute',
                            left: item.x,
                            top: item.y,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            color: 'rgba(139, 92, 246, 0.15)',
                            animation: `${animationType} ${item.duration} ease-in-out infinite`,
                            animationDelay: item.delay,
                            zIndex: 1,
                            pointerEvents: 'none',
                            filter: 'blur(0.5px)',
                        }}
                    />
                );
            })}

            {/* Additional floating particles */}
            {[...Array(6)].map((_, index) => (
                <Box
                    key={`particle-${index}`}
                    sx={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(139, 92, 246, 0.3)',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `floatUpDown ${8 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            <Container component="main" maxWidth="sm" sx={{ zIndex: 10, position: 'relative' }}>
                <Fade in={true} timeout={1000}>
                    <Paper
                        elevation={0}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        sx={{
                            padding: { xs: 3, sm: 4 },
                            borderRadius: 4,
                            backgroundColor: 'rgba(254, 252, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid',
                            borderColor: isHovered ? '#8b5cf6' : '#a78bfa',
                            boxShadow: isHovered 
                                ? '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)' 
                                : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
                            position: 'relative',
                            transform: isHovered ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            backgroundImage: `
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
                                background: 'linear-gradient(90deg, #8b5cf6, #a78bfa, #c4b5fd, #ddd6fe)',
                                borderRadius: '4px 4px 0 0',
                                animation: 'shimmer 2s ease-in-out infinite',
                            },
                            '@keyframes shimmer': {
                                '0%': { backgroundPosition: '-200% 0' },
                                '100%': { backgroundPosition: '200% 0' }
                            }
                        }}
                    >
                        <Slide direction="down" in={true} timeout={800}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    mb: 3,
                                    position: 'relative'
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -10,
                                        width: '60px',
                                        height: '4px',
                                        background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
                                        borderRadius: '2px',
                                        animation: 'pulse 2s ease-in-out infinite',
                                        '@keyframes pulse': {
                                            '0%, 100%': { opacity: 0.6, transform: 'scaleX(1)' },
                                            '50%': { opacity: 1, transform: 'scaleX(1.2)' }
                                        }
                                    }}
                                />
                                <Typography 
                                    variant="h4" 
                                    gutterBottom 
                                    sx={{ 
                                        fontWeight: 700,
                                        background: 'linear-gradient(135deg, #5b21b6, #7c3aed, #8b5cf6)',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 0.5,
                                        letterSpacing: '-0.02em',
                                        textAlign: 'center',
                                        fontSize: { xs: '1.8rem', sm: '2.125rem' },
                                        animation: 'textGlow 3s ease-in-out infinite',
                                        '@keyframes textGlow': {
                                            '0%, 100%': { filter: 'brightness(1)' },
                                            '50%': { filter: 'brightness(1.1)' }
                                        }
                                    }}
                                >
                                    Join Our Team
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: '#7c2d92', 
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontSize: '0.9rem',
                                        animation: 'fadeInUp 1s ease-out 0.5s both',
                                        '@keyframes fadeInUp': {
                                            '0%': { opacity: 0, transform: 'translateY(20px)' },
                                            '100%': { opacity: 1, transform: 'translateY(0)' }
                                        }
                                    }}
                                >
                                    Create your vendor account today
                                </Typography>
                            </Box>
                        </Slide>

                        <Slide direction="up" in={true} timeout={1000}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            name="name"
                                            required
                                            size="small"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={!!errors.name}
                                            helperText={errors.name || 'Letters and spaces only'}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Person sx={{ 
                                                            color: errors.name ? '#dc2626' : '#8b5cf6',
                                                            fontSize: '1.1rem',
                                                        }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 3,
                                                    backgroundColor: 'rgba(253, 252, 255, 0.8)',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '& fieldset': {
                                                        borderColor: errors.name ? '#dc2626' : '#c4b5fd',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 8px rgba(196, 181, 253, 0.2)',
                                                        '& fieldset': {
                                                            borderColor: errors.name ? '#dc2626' : '#a78bfa',
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                                                        '& fieldset': {
                                                            borderColor: errors.name ? '#dc2626' : '#8b5cf6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& input': {
                                                        color: '#1f2937',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 500,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: errors.name ? '#dc2626' : '#7c2d92',
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        color: errors.name ? '#dc2626' : '#5b21b6',
                                                    },
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    color: errors.name ? '#dc2626' : '#6b7280',
                                                    fontSize: '0.75rem',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Shop Name"
                                            name="shopName"
                                            required
                                            size="small"
                                            value={formData.shopName}
                                            onChange={handleChange}
                                            error={!!errors.shopName}
                                            helperText={errors.shopName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Store sx={{ 
                                                            color: errors.shopName ? '#dc2626' : '#8b5cf6',
                                                            fontSize: '1.1rem',
                                                        }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 3,
                                                    backgroundColor: 'rgba(253, 252, 255, 0.8)',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '& fieldset': {
                                                        borderColor: errors.shopName ? '#dc2626' : '#c4b5fd',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 8px rgba(196, 181, 253, 0.2)',
                                                        '& fieldset': {
                                                            borderColor: errors.shopName ? '#dc2626' : '#a78bfa',
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                                                        '& fieldset': {
                                                            borderColor: errors.shopName ? '#dc2626' : '#8b5cf6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& input': {
                                                        color: '#1f2937',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 500,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: errors.shopName ? '#dc2626' : '#7c2d92',
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        color: errors.shopName ? '#dc2626' : '#5b21b6',
                                                    },
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    color: '#dc2626',
                                                    fontSize: '0.75rem',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            required
                                            size="small"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={!!errors.email}
                                            helperText={errors.email || 'Enter a valid email address'}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email sx={{ 
                                                            color: errors.email ? '#dc2626' : '#8b5cf6',
                                                            fontSize: '1.1rem',
                                                        }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 3,
                                                    backgroundColor: 'rgba(253, 252, 255, 0.8)',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '& fieldset': {
                                                        borderColor: errors.email ? '#dc2626' : '#c4b5fd',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 8px rgba(196, 181, 253, 0.2)',
                                                        '& fieldset': {
                                                            borderColor: errors.email ? '#dc2626' : '#a78bfa',
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                                                        '& fieldset': {
                                                            borderColor: errors.email ? '#dc2626' : '#8b5cf6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& input': {
                                                        color: '#1f2937',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 500,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: errors.email ? '#dc2626' : '#7c2d92',
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        color: errors.email ? '#dc2626' : '#5b21b6',
                                                    },
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    color: errors.email ? '#dc2626' : '#6b7280',
                                                    fontSize: '0.75rem',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="phone"
                                            required
                                            size="small"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            error={!!errors.phone}
                                            helperText={errors.phone || 'Enter 10-digit phone number'}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Phone sx={{ 
                                                            color: errors.phone ? '#dc2626' : '#8b5cf6',
                                                            fontSize: '1.1rem',
                                                        }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 3,
                                                    backgroundColor: 'rgba(253, 252, 255, 0.8)',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '& fieldset': {
                                                        borderColor: errors.phone ? '#dc2626' : '#c4b5fd',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 8px rgba(196, 181, 253, 0.2)',
                                                        '& fieldset': {
                                                            borderColor: errors.phone ? '#dc2626' : '#a78bfa',
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                                                        '& fieldset': {
                                                            borderColor: errors.phone ? '#dc2626' : '#8b5cf6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& input': {
                                                        color: '#1f2937',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 500,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: errors.phone ? '#dc2626' : '#7c2d92',
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        color: errors.phone ? '#dc2626' : '#5b21b6',
                                                    },
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    color: errors.phone ? '#dc2626' : '#6b7280',
                                                    fontSize: '0.75rem',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            size="small"
                                            value={formData.password}
                                            onChange={handleChange}
                                            error={!!errors.password}
                                            helperText={errors.password || 'Min 8 chars with uppercase, lowercase & number'}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock sx={{ 
                                                            color: errors.password ? '#dc2626' : '#8b5cf6',
                                                            fontSize: '1.1rem',
                                                        }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton 
                                                            onClick={() => setShowPassword(!showPassword)} 
                                                            edge="end"
                                                            size="small"
                                                            sx={{ 
                                                                color: '#8b5cf6',
                                                                transition: 'all 0.3s ease',
                                                                '&:hover': {
                                                                    color: '#5b21b6',
                                                                    transform: 'scale(1.1)',
                                                                }
                                                            }}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 3,
                                                    backgroundColor: 'rgba(253, 252, 255, 0.8)',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '& fieldset': {
                                                        borderColor: errors.password ? '#dc2626' : '#c4b5fd',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 8px rgba(196, 181, 253, 0.2)',
                                                        '& fieldset': {
                                                            borderColor: errors.password ? '#dc2626' : '#a78bfa',
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                                                        '& fieldset': {
                                                            borderColor: errors.password ? '#dc2626' : '#8b5cf6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& input': {
                                                        color: '#1f2937',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 500,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: errors.password ? '#dc2626' : '#7c2d92',
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        color: errors.password ? '#dc2626' : '#5b21b6',
                                                    },
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    color: errors.password ? '#dc2626' : '#6b7280',
                                                    fontSize: '0.75rem',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            name="address"
                                            multiline
                                            rows={2}
                                            size="small"
                                            value={formData.address}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" sx={{ alignItems: 'flex-start', mt: 0.5 }}>
                                                        <LocationOn sx={{ 
                                                            color: '#8b5cf6',
                                                            fontSize: '1.1rem',
                                                        }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 3,
                                                    backgroundColor: 'rgba(253, 252, 255, 0.8)',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '& fieldset': {
                                                        borderColor: '#c4b5fd',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 8px rgba(196, 181, 253, 0.2)',
                                                        '& fieldset': {
                                                            borderColor: '#a78bfa',
                                                        },
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(250, 249, 255, 0.9)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                                                        '& fieldset': {
                                                            borderColor: '#8b5cf6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& textarea': {
                                                        color: '#1f2937',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 500,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#7c2d92',
                                                    fontWeight: 500,
                                                    '&.Mui-focused': {
                                                        color: '#5b21b6',
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="profile-image"
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="profile-image">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                fullWidth
                                                size="small"
                                                startIcon={<PhotoCamera />}
                                                sx={{
                                                    py: 1.2,
                                                    borderRadius: 3,
                                                    background: 'rgba(253, 252, 255, 0.8)',
                                                    color: '#7c2d92',
                                                    border: '2px dashed #c4b5fd',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '&:hover': {
                                                        background: 'rgba(250, 249, 255, 0.9)',
                                                        borderColor: '#a78bfa',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 8px rgba(196, 181, 253, 0.2)',
                                                    }
                                                }}
                                            >
                                                {formData.profileImage ? formData.profileImage.name : 'Upload Profile Image (Optional)'}
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            disabled={loading}
                                            sx={{
                                                mt: 1,
                                                py: 1.5,
                                                borderRadius: 3,
                                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
                                                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                '&::before': {
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
                                                    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)',
                                                    boxShadow: '0 8px 25px rgba(124, 58, 237, 0.6)',
                                                    transform: 'translateY(-2px) scale(1.01)',
                                                    '&::before': {
                                                        left: '100%',
                                                    },
                                                },
                                                '&:active': {
                                                    transform: 'translateY(0) scale(0.98)',
                                                },
                                                '&:disabled': {
                                                    background: '#c4b5fd',
                                                    color: '#7c2d92',
                                                },
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                letterSpacing: '0.5px',
                                                animation: loading ? 'pulse 1s ease-in-out infinite' : 'none',
                                                '@keyframes pulse': {
                                                    '0%': { opacity: 1 },
                                                    '50%': { opacity: 0.7 },
                                                    '100%': { opacity: 1 }
                                                }
                                            }}
                                        >
                                            {loading ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box
                                                        sx={{
                                                            width: 18,
                                                            height: 18,
                                                            border: '2px solid #c4b5fd',
                                                            borderTop: '2px solid transparent',
                                                            borderRadius: '50%',
                                                            animation: 'spin 1s linear infinite',
                                                            '@keyframes spin': {
                                                                '0%': { transform: 'rotate(0deg)' },
                                                                '100%': { transform: 'rotate(360deg)' }
                                                            }
                                                        }}
                                                    />
                                                    Registering...
                                                </Box>
                                            ) : (
                                                'Join Our Team'
                                            )}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Slide>

                        <Fade in={true} timeout={1500} style={{ transitionDelay: '800ms' }}>
                            <Box sx={{ 
                                textAlign: 'center', 
                                pt: 2, 
                                borderTop: '2px solid #e9d5ff',
                                position: 'relative',
                                animation: 'slideInFromBottom 1s ease-out 0.8s both',
                                '@keyframes slideInFromBottom': {
                                    '0%': { 
                                        opacity: 0, 
                                        transform: 'translateY(20px)' 
                                    },
                                    '100%': { 
                                        opacity: 1, 
                                        transform: 'translateY(0)' 
                                    }
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -1,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '30px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
                                    borderRadius: '2px',
                                    animation: 'expandWidth 1s ease-out 1.2s both',
                                    '@keyframes expandWidth': {
                                        '0%': { 
                                            width: '0px',
                                            opacity: 0 
                                        },
                                        '100%': { 
                                            width: '30px',
                                            opacity: 1 
                                        }
                                    }
                                }
                            }}>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#7c2d92', 
                                        fontWeight: 500,
                                        fontSize: '0.85rem',
                                        animation: 'fadeInScale 1s ease-out 1s both',
                                        '@keyframes fadeInScale': {
                                            '0%': { 
                                                opacity: 0, 
                                                transform: 'scale(0.9)' 
                                            },
                                            '100%': { 
                                                opacity: 1, 
                                                transform: 'scale(1)' 
                                            }
                                        }
                                    }}
                                >
                                    Already have an account?{' '}
                                    <Link 
                                        component={RouterLink} 
                                        to="/login" 
                                        sx={{ 
                                            color: '#8b5cf6', 
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            position: 'relative',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                color: '#5b21b6',
                                                transform: 'scale(1.05)',
                                            }
                                        }}
                                    >
                                        Sign In →
                                    </Link>
                                </Typography>
                            </Box>
                        </Fade>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default Register;
