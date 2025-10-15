// import React, { useState, useContext } from 'react';
// import {
//     Box,
//     Paper,
//     TextField,
//     Button,
//     Typography,
//     Container,
//     Link,
//     InputAdornment,
//     IconButton,
//     Alert,
//     Fade,
//     Zoom,
//     Divider,
//     Checkbox,
//     FormControlLabel,
// } from '@mui/material';
// import {
//     Visibility,
//     VisibilityOff,
//     Email,
//     Lock,
//     Login as LoginIcon,
//     Google,
//     Facebook,
//     GitHub,
// } from '@mui/icons-material';
// import { userContext } from '../Context/Context';
// import { Link as RouterLink } from 'react-router-dom';

// const Login = () => {
//     const { LoginUser } = useContext(userContext);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [touched, setTouched] = useState({});
//     const [rememberMe, setRememberMe] = useState(false);
//     const [loginAttempts, setLoginAttempts] = useState(0);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });

//         // Real-time validation for touched fields
//         if (touched[name]) {
//             validateField(name, value);
//         }
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         setTouched({
//             ...touched,
//             [name]: true
//         });
//         validateField(name, value);
//     };

//     const validateField = (name, value) => {
//         const newErrors = { ...errors };
        
//         switch (name) {
//             case 'email':
//                 if (!value.trim()) {
//                     newErrors.email = 'Email is required';
//                 } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//                     newErrors.email = 'Please enter a valid email address';
//                 } else {
//                     delete newErrors.email;
//                 }
//                 break;
                
//             case 'password':
//                 if (!value) {
//                     newErrors.password = 'Password is required';
//                 } else if (value.length < 6) {
//                     newErrors.password = 'Password must be at least 6 characters';
//                 } else {
//                     delete newErrors.password;
//                 }
//                 break;
                
//             default:
//                 break;
//         }
        
//         setErrors(newErrors);
//     };

//     const validateForm = () => {
//         const newErrors = {};
        
//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = 'Please enter a valid email address';
//         }
        
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         // Mark all fields as touched
//         setTouched({
//             email: true,
//             password: true,
//         });
        
//         if (validateForm()) {
//             try {
//                 await LoginUser(formData);
//                 setLoginAttempts(0);
//             } catch (error) {
//                 setLoginAttempts(prev => prev + 1);
//                 console.error('Login failed:', error);
//             }
//         }
        
//         setIsSubmitting(false);
//     };

//     const isFieldValid = (fieldName) => {
//         return touched[fieldName] && !errors[fieldName] && formData[fieldName].trim();
//     };

//     const handleSocialLogin = (provider) => {
//         console.log(`Login with ${provider}`);
//         // Implement social login logic here
//     };

//     return (
//         <Container component="main" maxWidth="sm">
//             <Box
//                 sx={{
//                     minHeight: '100vh',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     padding: 3,
//                 }}
//             >
//                 <Fade in timeout={800}>
//                     <Paper 
//                         elevation={20} 
//                         sx={{ 
//                             p: 5, 
//                             width: '100%',
//                             maxWidth: 450,
//                             borderRadius: 4,
//                             background: 'rgba(255, 255, 255, 0.95)',
//                             backdropFilter: 'blur(20px)',
//                             boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
//                             border: '1px solid rgba(255, 255, 255, 0.2)',
//                         }}
//                     >
//                         <Zoom in timeout={600}>
//                             <Box sx={{ textAlign: 'center', mb: 4 }}>
//                                 <Box
//                                     sx={{
//                                         width: 80,
//                                         height: 80,
//                                         borderRadius: '50%',
//                                         background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         margin: '0 auto 20px',
//                                         boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)',
//                                     }}
//                                 >
//                                     <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
//                                 </Box>
//                                 <Typography 
//                                     component="h1" 
//                                     variant="h4" 
//                                     sx={{ 
//                                         fontWeight: 700,
//                                         background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                         backgroundClip: 'text',
//                                         WebkitBackgroundClip: 'text',
//                                         WebkitTextFillColor: 'transparent',
//                                         mb: 1
//                                     }}
//                                 >
//                                     Welcome Back
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary">
//                                     Sign in to your account
//                                 </Typography>
//                             </Box>
//                         </Zoom>

//                         {loginAttempts >= 3 && (
//                             <Fade in>
//                                 <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
//                                     Multiple failed attempts detected. Please check your credentials.
//                                 </Alert>
//                             </Fade>
//                         )}

//                         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                                 autoFocus
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 error={touched.email && !!errors.email}
//                                 helperText={touched.email && errors.email}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Email color={isFieldValid('email') ? 'success' : 'action'} />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 3,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         transition: 'all 0.3s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
//                                         },
//                                     },
//                                 }}
//                             />

//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 id="password"
//                                 autoComplete="current-password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 error={touched.password && !!errors.password}
//                                 helperText={touched.password && errors.password}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Lock color={isFieldValid('password') ? 'success' : 'action'} />
//                                         </InputAdornment>
//                                     ),
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 edge="end"
//                                                 size="small"
//                                                 sx={{
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(102, 126, 234, 0.1)',
//                                                     },
//                                                 }}
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 3,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         transition: 'all 0.3s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
//                                         },
//                                     },
//                                 }}
//                             />

//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 disabled={isSubmitting}
//                                 sx={{ 
//                                     mt: 2, 
//                                     mb: 3,
//                                     py: 1.8,
//                                     borderRadius: 3,
//                                     background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                     boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
//                                     fontSize: '1.1rem',
//                                     fontWeight: 600,
//                                     textTransform: 'none',
//                                     '&:hover': {
//                                         background: 'linear-gradient(45deg, #5a6fd8, #6a42a0)',
//                                         boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
//                                         transform: 'translateY(-2px)',
//                                     },
//                                     '&:disabled': {
//                                         background: 'rgba(0,0,0,0.12)',
//                                         transform: 'none',
//                                         boxShadow: 'none',
//                                     },
//                                     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                                 }}
//                             >
//                                 {isSubmitting ? 'Signing In...' : 'Sign In'}
//                             </Button>

//                             <Box sx={{ textAlign: 'center' }}>
//                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                     Don't have an account?
//                                 </Typography>
//                                 <Link 
//                                     component={RouterLink} 
//                                     to="/register"
//                                     sx={{
//                                         textDecoration: 'none',
//                                         fontWeight: 600,
//                                         fontSize: '1.1rem',
//                                         background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                         backgroundClip: 'text',
//                                         WebkitBackgroundClip: 'text',
//                                         WebkitTextFillColor: 'transparent',
//                                         '&:hover': {
//                                             textDecoration: 'underline',
//                                         },
//                                     }}
//                                 >
//                                     Create Account
//                                 </Link>
//                             </Box>
//                         </Box>
//                     </Paper>
//                 </Fade>
//             </Box>
//         </Container>
//     );
// };

// export default Login;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Box,
//     Paper,
//     TextField,
//     Button,
//     Typography,
//     Container,
//     Link,
//     InputAdornment,
//     IconButton,
//     Alert,
//     Fade,
//     Zoom,
//     Divider,
//     Checkbox,
//     FormControlLabel,
// } from '@mui/material';
// import {
//     Visibility,
//     VisibilityOff,
//     Email,
//     Lock,
//     Login as LoginIcon,
//     Google,
//     Facebook,
//     GitHub,
// } from '@mui/icons-material';
// import { userContext } from '../Context/Context';
// import { Link as RouterLink } from 'react-router-dom';
// import { config, auth } from "../Config/Config";
// import { 
//     signInWithPopup, 
//     GoogleAuthProvider, 
//     FacebookAuthProvider, 
//     GithubAuthProvider 
// } from 'firebase/auth';

// const Login = () => {
//     const navigate = useNavigate();
//     const { LoginUser } = useContext(userContext);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [touched, setTouched] = useState({});
//     const [rememberMe, setRememberMe] = useState(false);
//     const [loginAttempts, setLoginAttempts] = useState(0);
//     const [socialLoading, setSocialLoading] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });

//         if (touched[name]) {
//             validateField(name, value);
//         }
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         setTouched({
//             ...touched,
//             [name]: true
//         });
//         validateField(name, value);
//     };

//     const validateField = (name, value) => {
//         const newErrors = { ...errors };
        
//         switch (name) {
//             case 'email':
//                 if (!value.trim()) {
//                     newErrors.email = 'Email is required';
//                 } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//                     newErrors.email = 'Please enter a valid email address';
//                 } else {
//                     delete newErrors.email;
//                 }
//                 break;
                
//             case 'password':
//                 if (!value) {
//                     newErrors.password = 'Password is required';
//                 } else if (value.length < 6) {
//                     newErrors.password = 'Password must be at least 6 characters';
//                 } else {
//                     delete newErrors.password;
//                 }
//                 break;
                
//             default:
//                 break;
//         }
        
//         setErrors(newErrors);
//     };

//     const validateForm = () => {
//         const newErrors = {};
        
//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = 'Please enter a valid email address';
//         }
        
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         setTouched({
//             email: true,
//             password: true,
//         });
        
//         if (validateForm()) {
//             try {
//                 await LoginUser(formData);
//                 setLoginAttempts(0);
//                 navigate('/', { replace: true });
//             } catch (error) {
//                 setLoginAttempts(prev => prev + 1);
//                 console.error('Login failed:', error);
//             }
//         }
        
//         setIsSubmitting(false);
//     };

//     const isFieldValid = (fieldName) => {
//         return touched[fieldName] && !errors[fieldName] && formData[fieldName].trim();
//     };

//     const handleSocialLogin = async (providerName) => {
//     setSocialLoading(providerName);
//     try {
//         let provider;
        
//         switch (providerName) {
//             case 'google':
//                 provider = new GoogleAuthProvider();
//                 break;
//             case 'facebook':
//                 provider = new FacebookAuthProvider();
//                 break;
//             case 'github':
//                 provider = new GithubAuthProvider();
//                 break;
//             default:
//                 throw new Error('Unsupported provider');
//         }

//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
        
//         try {
//             const response = await fetch(`${config.host}/customer/social-login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     provider: providerName,
//                     uid: user.uid,
//                     email: user.email,
//                     displayName: user.displayName,
//                     photoURL: user.photoURL,
//                 }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('✅ Backend success:', data);
                
//                 localStorage.setItem('authToken', data.token);
//                 localStorage.setItem('currentUser', JSON.stringify(data.user));
                
//                 // ✅ Navigate directly without calling LoginUser
//                 navigate('/', { replace: true });
//                 setSocialLoading('');
//                 return; // ✅ Exit here to prevent further execution
//             }
            
//         } catch (backendError) {
//             console.warn('⚠️ Backend error:', backendError);
//         }

//         // Fallback Firebase-only auth
//         const userData = {
//             id: user.uid,
//             name: user.displayName || user.email.split('@')[0],
//             email: user.email,
//             profileImage: user.photoURL || '',
//             provider: providerName
//         };
        
//         localStorage.setItem('authToken', user.accessToken || 'firebase_token');
//         localStorage.setItem('currentUser', JSON.stringify(userData));
        
//         navigate('/', { replace: true });
//         setSocialLoading('');
        
//     } catch (error) {
//         console.error(`❌ ${providerName} login failed:`, error);
//         setSocialLoading('');
//         // Don't show alert, just log the error
//     }
// };


//     return (
//         <Container component="main" maxWidth="sm">
//             <Box
//                 sx={{
//                     minHeight: '100vh',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     padding: 3,
//                 }}
//             >
//                 <Fade in timeout={800}>
//                     <Paper 
//                         elevation={20} 
//                         sx={{ 
//                             p: 5, 
//                             width: '100%',
//                             maxWidth: 450,
//                             borderRadius: 4,
//                             background: 'rgba(255, 255, 255, 0.95)',
//                             backdropFilter: 'blur(20px)',
//                             boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
//                             border: '1px solid rgba(255, 255, 255, 0.2)',
//                         }}
//                     >
//                         <Zoom in timeout={600}>
//                             <Box sx={{ textAlign: 'center', mb: 4 }}>
//                                 <Box
//                                     sx={{
//                                         width: 80,
//                                         height: 80,
//                                         borderRadius: '50%',
//                                         background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         margin: '0 auto 20px',
//                                         boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)',
//                                     }}
//                                 >
//                                     <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
//                                 </Box>
//                                 <Typography 
//                                     component="h1" 
//                                     variant="h4" 
//                                     sx={{ 
//                                         fontWeight: 700,
//                                         background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                         backgroundClip: 'text',
//                                         WebkitBackgroundClip: 'text',
//                                         WebkitTextFillColor: 'transparent',
//                                         mb: 1
//                                     }}
//                                 >
//                                     Welcome Back
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary">
//                                     Sign in to your account
//                                 </Typography>
//                             </Box>
//                         </Zoom>

//                         {/* Social Login Buttons */}
//                         <Box sx={{ mb: 3 }}>
//                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                                 {/* Google Login */}
//                                 <Button
//                                  type="button"  // ✅ Add this line
//                                   fullWidth
//                                       variant="outlined"
//                                     startIcon={<Google />}
//                                      onClick={() => handleSocialLogin('google')}
//                                     disabled={socialLoading !== '' || isSubmitting}
//                                     sx={{
//                                         py: 1.5,
//                                         borderRadius: 3,
//                                         borderColor: '#4285f4',
//                                         color: '#4285f4',
//                                         textTransform: 'none',
//                                         fontSize: '1rem',
//                                         fontWeight: 500,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         '&:hover': {
//                                             backgroundColor: '#4285f4',
//                                             color: 'white',
//                                             borderColor: '#4285f4',
//                                             transform: 'translateY(-1px)',
//                                             boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
//                                         },
//                                         '&:disabled': {
//                                             backgroundColor: 'rgba(0,0,0,0.04)',
//                                             borderColor: 'rgba(0,0,0,0.12)',
//                                             color: 'rgba(0,0,0,0.26)',
//                                         },
//                                         transition: 'all 0.3s ease',
//                                     }}
//                                 >
//                                     {socialLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
//                                 </Button>

//                                 {/* Facebook Login */}
//                                 <Button
//                                     fullWidth
//                                     variant="outlined"
//                                     startIcon={<Facebook />}
//                                     onClick={() => handleSocialLogin('facebook')}
//                                     disabled={socialLoading !== '' || isSubmitting}
//                                     sx={{
//                                         py: 1.5,
//                                         borderRadius: 3,
//                                         borderColor: '#1877f2',
//                                         color: '#1877f2',
//                                         textTransform: 'none',
//                                         fontSize: '1rem',
//                                         fontWeight: 500,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         '&:hover': {
//                                             backgroundColor: '#1877f2',
//                                             color: 'white',
//                                             borderColor: '#1877f2',
//                                             transform: 'translateY(-1px)',
//                                             boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
//                                         },
//                                         '&:disabled': {
//                                             backgroundColor: 'rgba(0,0,0,0.04)',
//                                             borderColor: 'rgba(0,0,0,0.12)',
//                                             color: 'rgba(0,0,0,0.26)',
//                                         },
//                                         transition: 'all 0.3s ease',
//                                     }}
//                                 >
//                                     {socialLoading === 'facebook' ? 'Connecting...' : 'Continue with Facebook'}
//                                 </Button>

//                                 {/* GitHub Login */}
//                                 <Button
//                                     fullWidth
//                                     variant="outlined"
//                                     startIcon={<GitHub />}
//                                     onClick={() => handleSocialLogin('github')}
//                                     disabled={socialLoading !== '' || isSubmitting}
//                                     sx={{
//                                         py: 1.5,
//                                         borderRadius: 3,
//                                         borderColor: '#333',
//                                         color: '#333',
//                                         textTransform: 'none',
//                                         fontSize: '1rem',
//                                         fontWeight: 500,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         '&:hover': {
//                                             backgroundColor: '#333',
//                                             color: 'white',
//                                             borderColor: '#333',
//                                             transform: 'translateY(-1px)',
//                                             boxShadow: '0 4px 12px rgba(51, 51, 51, 0.3)',
//                                         },
//                                         '&:disabled': {
//                                             backgroundColor: 'rgba(0,0,0,0.04)',
//                                             borderColor: 'rgba(0,0,0,0.12)',
//                                             color: 'rgba(0,0,0,0.26)',
//                                         },
//                                         transition: 'all 0.3s ease',
//                                     }}
//                                 >
//                                     {socialLoading === 'github' ? 'Connecting...' : 'Continue with GitHub'}
//                                 </Button>
//                             </Box>
//                         </Box>

//                         {/* Divider */}
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                             <Divider sx={{ flex: 1, bgcolor: 'rgba(0,0,0,0.12)' }} />
//                             <Typography 
//                                 variant="body2" 
//                                 sx={{ 
//                                     mx: 2, 
//                                     color: 'text.secondary',
//                                     fontWeight: 500 
//                                 }}
//                             >
//                                 or continue with email
//                             </Typography>
//                             <Divider sx={{ flex: 1, bgcolor: 'rgba(0,0,0,0.12)' }} />
//                         </Box>

//                         {loginAttempts >= 3 && (
//                             <Fade in>
//                                 <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
//                                     Multiple failed attempts detected. Please check your credentials.
//                                 </Alert>
//                             </Fade>
//                         )}

//                         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                                 autoFocus
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 error={touched.email && !!errors.email}
//                                 helperText={touched.email && errors.email}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Email color={isFieldValid('email') ? 'success' : 'action'} />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 3,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         transition: 'all 0.3s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
//                                         },
//                                     },
//                                 }}
//                             />

//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 id="password"
//                                 autoComplete="current-password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 error={touched.password && !!errors.password}
//                                 helperText={touched.password && errors.password}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Lock color={isFieldValid('password') ? 'success' : 'action'} />
//                                         </InputAdornment>
//                                     ),
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 edge="end"
//                                                 size="small"
//                                                 sx={{
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(102, 126, 234, 0.1)',
//                                                     },
//                                                 }}
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 3,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         transition: 'all 0.3s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                             boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
//                                         },
//                                     },
//                                 }}
//                             />

//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 disabled={isSubmitting}
//                                 sx={{ 
//                                     mt: 2, 
//                                     mb: 3,
//                                     py: 1.8,
//                                     borderRadius: 3,
//                                     background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                     boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
//                                     fontSize: '1.1rem',
//                                     fontWeight: 600,
//                                     textTransform: 'none',
//                                     '&:hover': {
//                                         background: 'linear-gradient(45deg, #5a6fd8, #6a42a0)',
//                                         boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
//                                         transform: 'translateY(-2px)',
//                                     },
//                                     '&:disabled': {
//                                         background: 'rgba(0,0,0,0.12)',
//                                         transform: 'none',
//                                         boxShadow: 'none',
//                                     },
//                                     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                                 }}
//                             >
//                                 {isSubmitting ? 'Signing In...' : 'Sign In'}
//                             </Button>

//                             <Box sx={{ textAlign: 'center' }}>
//                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                     Don't have an account?
//                                 </Typography>
//                                 <Link 
//                                     component={RouterLink} 
//                                     to="/register"
//                                     sx={{
//                                         textDecoration: 'none',
//                                         fontWeight: 600,
//                                         fontSize: '1.1rem',
//                                         background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                         backgroundClip: 'text',
//                                         WebkitBackgroundClip: 'text',
//                                         WebkitTextFillColor: 'transparent',
//                                         '&:hover': {
//                                             textDecoration: 'underline',
//                                         },
//                                     }}
//                                 >
//                                     Create Account
//                                 </Link>
//                             </Box>
//                         </Box>
//                     </Paper>
//                 </Fade>
//             </Box>
//         </Container>
//     );
// };

// export default Login;


// import React, { useState, useContext } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { 
//   TextField, 
//   Button 
// } from '@mui/material';
// import { Google } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { userContext } from '../Context/Context';
// import { auth } from '../Config/Config';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { config } from '../Config/Config';

// // ✨ ANIMATIONS
// const slideIn = keyframes`
//   from { opacity: 0; transform: translateY(30px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // 🎨 BACKGROUND WITH COLOR
// const LoginContainer = styled.div`
//   height: 94vh;
//   background-color: #e6e6e6ff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
// `;

// // 📦 FORM CONTAINER
// const LoginForm = styled.form`
//   display: flex;
//   max-width: 900px;
//   width: 100%;
//   background: white;
//   border-radius: 16px;
//   overflow: hidden;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//   animation: ${slideIn} 0.8s ease-out;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     max-width: 400px;
//   }
// `;

// // 🖼️ IMAGE SECTION
// const ImageSection = styled.div`
//   flex: 1;
//   background: url('https://images.squarespace-cdn.com/content/v1/61cccdf24b15db3d8a4a4d3c/1115021b-ac00-4e4c-a0b3-5210792849d4/dom-hill-nimElTcTNyY-unsplash.jpg') center/cover;
//   min-height: 500px;
  
//   @media (max-width: 768px) {
//     min-height: 200px;
//   }
// `;

// // 📝 FORM SECTION
// const FormSection = styled.div`
//   flex: 1;
//   padding: 50px 50px 15px 50px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
  
//   @media (max-width: 768px) {
//     padding: 30px 30px 10px 30px;
//   }
// `;

// // 🎯 HEADER
// const LoginHeader = styled.div`
//   text-align: center;
//   margin-bottom: 40px;
// `;

// const LoginTitle = styled.h1`
//   font-size: 2.5rem;
//   font-weight: 700;
//   margin-bottom: 8px;
//   color: #1a1a1a;
//   font-family: Georgia, 'Times New Roman', serif;
// `;

// const LoginSubtitle = styled.p`
//   color: #666666;
//   font-size: 14px;
//   margin: 0 0 32px 0;
//   font-weight: 400;
// `;

// // 📧 EMAIL SECTION
// const EmailSection = styled.div`
//   margin-bottom: 30px;
// `;

// // 📧 STYLED TEXTFIELD - NO AUTOCOMPLETE
// const StyledTextField = styled(TextField)`
//   && {
//     width: 100%;
//     margin-bottom: 16px;

//     .MuiOutlinedInput-root {
//       border-radius: 8px;
//       background: #f8fafc;

//       &:hover {
//         background: #f1f5f9;
//       }

//       &.Mui-focused {
//         background: white;
//         box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
//       }
//     }

//     .MuiInputLabel-root {
//       color: #5f6368;
      
//       &.Mui-focused {
//         color: #4285f4;
//       }
//     }
//   }
// `;

// // 🏷️ CHECKBOX & FORGOT PASSWORD
// const CheckboxContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 16px 0 24px 0;
//   font-size: 14px;
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   color: #5f6368;
//   cursor: pointer;
  
//   input {
//     margin-right: 8px;
//     cursor: pointer;
//   }
// `;

// const ForgotLink = styled.button`
//   background: none;
//   border: none;
//   color: #1a73e8;
//   cursor: pointer;
//   font-size: 14px;
  
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// // 🔵 LOGIN BUTTON
// const LoginButton = styled(Button)`
//   && {
//     width: 100%;
//     padding: 12px;
//     background: #1f2937;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     font-size: 16px;
//     font-weight: 500;
//     cursor: pointer;
//     margin-bottom: 4px;
//     text-transform: none;

//     &:hover {
//       background: #374151;
//     }

//     &:disabled {
//       background: #9ca3af;
//       cursor: not-allowed;
//     }
//   }
// `;

// // ➖ DIVIDER
// const Divider = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 2px 0 2px 0;
  
//   &::before,
//   &::after {
//     content: '';
//     flex: 1;
//     height: 1px;
//     background: #e8eaed;
//   }
  
//   span {
//     padding: 0 16px;
//     color: #5f6368;
//     font-size: 14px;
//   }
// `;

// // 🔵 GOOGLE BUTTON
// const GoogleLoginButton = styled(Button)`
//   && {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     padding: 14px 16px;
//     background: white;
//     border: 1px solid #dadce0;
//     border-radius: 8px;
//     font-size: 16px;
//     color: #3c4043;
//     cursor: pointer;
//     margin: 0 0 8px 0;
//     text-transform: none;
//     transition: all 0.2s ease;

//     &:hover {
//       box-shadow: 0 2px 8px rgba(32, 33, 36, 0.28);
//       transform: translateY(-1px);
//     }

//     .MuiSvgIcon-root {
//       margin-right: 12px;
//       width: 20px;
//       height: 20px;
//     }

//     &:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }
//   }
// `;

// // 📝 FOOTER
// const Footer = styled.div`
//   text-align: center;
//   font-size: 14px;
//   color: #5f6368;
// `;

// const SignupLink = styled.button`
//   background: none;
//   border: none;
//   color: #1a73e8;
//   cursor: pointer;
//   font-weight: 500;
//   text-decoration: underline;
  
//   &:hover {
//     color: #1557b0;
//   }
// `;

// // 🎯 MAIN COMPONENT
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [socialLoading, setSocialLoading] = useState('');

//   const { LoginUser } = useContext(userContext);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert('Email and password are required');
//       return;
//     }
    
//     setIsSubmitting(true);
//     const loginData = { email, password };
//     LoginUser(loginData);
//     setIsSubmitting(false);
//   };

//   const handleSocialLogin = async (e) => {
//     e.preventDefault();
//     setSocialLoading('google');
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
      
//       try {
//         const response = await fetch(`${config.host}/customer/social-login`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             provider: 'google',
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           localStorage.setItem('authToken', data.token);
//           localStorage.setItem('currentUser', JSON.stringify(data.user));
//           navigate('/', { replace: true });
//         }
//       } catch (backendError) {
//         console.warn('⚠️ Backend error:', backendError);
//       }

//       setSocialLoading('');
//     } catch (error) {
//       console.error('❌ Google login failed:', error);
//       setSocialLoading('');
//     }
//   };

//   return (
//     <LoginContainer>
//       <LoginForm onSubmit={handleSubmit} autoComplete="off">
//         <ImageSection />
        
//         <FormSection>
//           {/* 🚫 HIDDEN DUMMY FIELDS TO DISABLE AUTOFILL */}
//           <input 
//             type="text" 
//             name="fake-username" 
//             autoComplete="username" 
//             style={{
//               position: 'absolute',
//               left: '-9999px',
//               width: '1px',
//               height: '1px',
//               opacity: 0,
//               pointerEvents: 'none'
//             }}
//             tabIndex="-1"
//           />
//           <input 
//             type="password" 
//             name="fake-password" 
//             autoComplete="current-password" 
//             style={{
//               position: 'absolute',
//               left: '-9999px',
//               width: '1px',
//               height: '1px',
//               opacity: 0,
//               pointerEvents: 'none'
//             }}
//             tabIndex="-1"
//           />

//           <LoginHeader>
//             <LoginTitle>YOUR WELCOME!</LoginTitle>
//             <LoginSubtitle>Timelessly chic and enduringly fashionable.</LoginSubtitle>
//           </LoginHeader>

//           <EmailSection>
//             {/* 📧 EMAIL INPUT - NO AUTOFILL */}
//             <StyledTextField
//               label="Email"
//               type="email"
//               name="user-email-field"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               variant="outlined"
//               autoComplete="nope"
//               inputProps={{ 
//                 autoComplete: "nope",
//                 autoCorrect: "off",
//                 autoCapitalize: "none"
//               }}
//             />
            
//             {/* 🔒 PASSWORD INPUT - NO AUTOFILL */}
//             <StyledTextField
//               label="Password"
//               type="password"
//               name="user-password-field"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               variant="outlined"
//               autoComplete="new-password"
//               inputProps={{ 
//                 autoComplete: "new-password",
//                 autoCorrect: "off",
//                 autoCapitalize: "none"
//               }}
//             />
            
//             <CheckboxContainer>
//               <CheckboxLabel>
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 Remember me
//               </CheckboxLabel>
//               <ForgotLink type="button">
//                 Forgot password?
//               </ForgotLink>
//             </CheckboxContainer>

//             <LoginButton 
//               type="submit" 
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Signing In...' : 'Log in'}
//             </LoginButton>
//           </EmailSection>

//           <Divider><span>or continue with</span></Divider>

//           <GoogleLoginButton
//             type="button"
//             onClick={handleSocialLogin}
//             disabled={socialLoading === 'google'}
//           >
//             <Google />
//             {socialLoading === 'google' ? 'Signing in...' : 'Continue with Google'}
//           </GoogleLoginButton>

//           <Footer>
//             Don't have an account?{' '}
//             <SignupLink 
//               type="button"
//               onClick={() => navigate('/register')}
//             >
//               Create  Account
//             </SignupLink>
//           </Footer>
//         </FormSection>
//       </LoginForm>
//     </LoginContainer>
//   );
// };

// export default Login;


// import React, { useState, useContext } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { 
//   TextField, 
//   Button 
// } from '@mui/material';
// import { Google } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { userContext } from '../Context/Context';
// import { auth } from '../Config/Config';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { config } from '../Config/Config';

// // ✨ ANIMATIONS
// const slideIn = keyframes`
//   from { opacity: 0; transform: translateY(30px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // 🎨 BACKGROUND WITH COLOR
// const LoginContainer = styled.div`
//   height: 94vh;
//   background-color: #e6e6e6ff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
// `;

// // 📦 FORM CONTAINER
// const LoginForm = styled.form`
//   display: flex;
//   max-width: 900px;
//   width: 100%;
//   background: white;
//   border-radius: 16px;
//   overflow: hidden;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//   animation: ${slideIn} 0.8s ease-out;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     max-width: 400px;
//   }
// `;

// // 🖼️ IMAGE SECTION
// const ImageSection = styled.div`
//   flex: 1;
//   background: url('https://images.squarespace-cdn.com/content/v1/61cccdf24b15db3d8a4a4d3c/1115021b-ac00-4e4c-a0b3-5210792849d4/dom-hill-nimElTcTNyY-unsplash.jpg') center/cover;
//   min-height: 500px;
  
//   @media (max-width: 768px) {
//     min-height: 200px;
//   }
// `;

// // 📝 FORM SECTION
// const FormSection = styled.div`
//   flex: 1;
//   padding: 50px 50px 15px 50px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
  
//   @media (max-width: 768px) {
//     padding: 30px 30px 10px 30px;
//   }
// `;

// // 🎯 HEADER
// const LoginHeader = styled.div`
//   text-align: center;
//   margin-bottom: 40px;
// `;

// const LoginTitle = styled.h1`
//   font-size: 2.5rem;
//   font-weight: 700;
//   margin-bottom: 8px;
//   color: #1a1a1a;
//   font-family: Georgia, 'Times New Roman', serif;
// `;

// const LoginSubtitle = styled.p`
//   color: #666666;
//   font-size: 14px;
//   margin: 0 0 32px 0;
//   font-weight: 400;
// `;

// // 📧 EMAIL SECTION
// const EmailSection = styled.div`
//   margin-bottom: 30px;
// `;

// // 📧 STYLED TEXTFIELD
// const StyledTextField = styled(TextField)`
//   && {
//     width: 100%;
//     margin-bottom: 16px;

//     .MuiOutlinedInput-root {
//       border-radius: 8px;
//       background: #f8fafc;

//       &:hover {
//         background: #f1f5f9;
//       }

//       &.Mui-focused {
//         background: white;
//         box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
//       }
//     }

//     .MuiInputLabel-root {
//       color: #5f6368;
      
//       &.Mui-focused {
//         color: #4285f4;
//       }
//     }
//   }
// `;

// // 🏷️ CHECKBOX & FORGOT PASSWORD
// const CheckboxContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 16px 0 24px 0;
//   font-size: 14px;
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   color: #5f6368;
//   cursor: pointer;
  
//   input {
//     margin-right: 8px;
//     cursor: pointer;
//   }
// `;

// const ForgotLink = styled.button`
//   background: none;
//   border: none;
//   color: #1a73e8;
//   cursor: pointer;
//   font-size: 14px;
  
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// // 🔵 LOGIN BUTTON
// const LoginButton = styled(Button)`
//   && {
//     width: 100%;
//     padding: 12px;
//     background: #1f2937;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     font-size: 16px;
//     font-weight: 500;
//     cursor: pointer;
//     margin-bottom: 4px;
//     text-transform: none;

//     &:hover {
//       background: #374151;
//     }

//     &:disabled {
//       background: #9ca3af;
//       cursor: not-allowed;
//     }
//   }
// `;

// // ➖ DIVIDER
// const Divider = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 2px 0 2px 0;
  
//   &::before,
//   &::after {
//     content: '';
//     flex: 1;
//     height: 1px;
//     background: #e8eaed;
//   }
  
//   span {
//     padding: 0 16px;
//     color: #5f6368;
//     font-size: 14px;
//   }
// `;

// // 🔵 GOOGLE BUTTON
// const GoogleLoginButton = styled(Button)`
//   && {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     padding: 14px 16px;
//     background: white;
//     border: 1px solid #dadce0;
//     border-radius: 8px;
//     font-size: 16px;
//     color: #3c4043;
//     cursor: pointer;
//     margin: 0 0 8px 0;
//     text-transform: none;
//     transition: all 0.2s ease;

//     &:hover {
//       box-shadow: 0 2px 8px rgba(32, 33, 36, 0.28);
//       transform: translateY(-1px);
//     }

//     .MuiSvgIcon-root {
//       margin-right: 12px;
//       width: 20px;
//       height: 20px;
//     }

//     &:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }
//   }
// `;

// // 📝 FOOTER
// const Footer = styled.div`
//   text-align: center;
//   font-size: 14px;
//   color: #5f6368;
// `;

// const SignupLink = styled.button`
//   background: none;
//   border: none;
//   color: #1a73e8;
//   cursor: pointer;
//   font-weight: 500;
//   text-decoration: underline;
  
//   &:hover {
//     color: #1557b0;
//   }
// `;

// // 🎯 MAIN COMPONENT
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [socialLoading, setSocialLoading] = useState('');

//   const { LoginUser } = useContext(userContext);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert('Email and password are required');
//       return;
//     }
    
//     setIsSubmitting(true);
//     const loginData = { email, password };
//     LoginUser(loginData);
//     setIsSubmitting(false);
//   };

//   // ✨ Handle Forgot Password Navigation
//   const handleForgotPassword = () => {
//     navigate('/forgot-password');
//   };

//   const handleSocialLogin = async (e) => {
//     e.preventDefault();
//     setSocialLoading('google');
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
      
//       try {
//         const response = await fetch(`${config.host}/customer/social-login`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             provider: 'google',
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           localStorage.setItem('authToken', data.token);
//           localStorage.setItem('currentUser', JSON.stringify(data.user));
//           navigate('/', { replace: true });
//         }
//       } catch (backendError) {
//         console.warn('⚠️ Backend error:', backendError);
//       }

//       setSocialLoading('');
//     } catch (error) {
//       console.error('❌ Google login failed:', error);
//       setSocialLoading('');
//     }
//   };

//   return (
//     <LoginContainer>
//       <LoginForm onSubmit={handleSubmit} autoComplete="off">
//         <ImageSection />
        
//         <FormSection>
//           {/* Hidden dummy fields to disable autofill */}
//           <input 
//             type="text" 
//             name="fake-username" 
//             autoComplete="username" 
//             style={{
//               position: 'absolute',
//               left: '-9999px',
//               width: '1px',
//               height: '1px',
//               opacity: 0,
//               pointerEvents: 'none'
//             }}
//             tabIndex="-1"
//           />
//           <input 
//             type="password" 
//             name="fake-password" 
//             autoComplete="current-password" 
//             style={{
//               position: 'absolute',
//               left: '-9999px',
//               width: '1px',
//               height: '1px',
//               opacity: 0,
//               pointerEvents: 'none'
//             }}
//             tabIndex="-1"
//           />

//           <LoginHeader>
//             <LoginTitle>WELCOME!</LoginTitle>
//             <LoginSubtitle>Timelessly chic and enduringly fashionable.</LoginSubtitle>
//           </LoginHeader>

//           <EmailSection>
//             {/* Email Input */}
//             <StyledTextField
//               label="Email"
//               type="email"
//               name="user-email-field"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               variant="outlined"
//               autoComplete="nope"
//               inputProps={{ 
//                 autoComplete: "nope",
//                 autoCorrect: "off",
//                 autoCapitalize: "none"
//               }}
//             />
            
//             {/* Password Input */}
//             <StyledTextField
//               label="Password"
//               type="password"
//               name="user-password-field"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               variant="outlined"
//               autoComplete="new-password"
//               inputProps={{ 
//                 autoComplete: "new-password",
//                 autoCorrect: "off",
//                 autoCapitalize: "none"
//               }}
//             />
            
//             <CheckboxContainer>
//               <CheckboxLabel>
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 Remember me
//               </CheckboxLabel>
//               {/* Forgot Password Link */}
//               <ForgotLink type="button" onClick={handleForgotPassword}>
//                 Forgot password?
//               </ForgotLink>
//             </CheckboxContainer>

//             <LoginButton 
//               type="submit" 
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Signing In...' : 'Log in'}
//             </LoginButton>
//           </EmailSection>

//           <Divider><span>or continue with</span></Divider>

//           <GoogleLoginButton
//             type="button"
//             onClick={handleSocialLogin}
//             disabled={socialLoading === 'google'}
//           >
//             <Google />
//             {socialLoading === 'google' ? 'Signing in...' : 'Continue with Google'}
//           </GoogleLoginButton>

//           <Footer>
//             Don't have an account?{' '}
//             <SignupLink 
//               type="button"
//               onClick={() => navigate('/register')}
//             >
//               Create Account
//             </SignupLink>
//           </Footer>
//         </FormSection>
//       </LoginForm>
//     </LoginContainer>
//   );
// };

// export default Login;






import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  TextField, 
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { 
    Google,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/Context';
import { auth } from '../Config/Config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { config } from '../Config/Config';

// ✨ ANIMATIONS
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🎨 BACKGROUND WITH COLOR
const LoginContainer = styled.div`
  height: 94vh;
  background-color: #e6e6e6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

// 📦 FORM CONTAINER
const LoginForm = styled.form`
  display: flex;
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.8s ease-out;
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 400px;
  }
`;

// 🖼️ IMAGE SECTION
const ImageSection = styled.div`
  flex: 1;
  background: url('https://images.squarespace-cdn.com/content/v1/61cccdf24b15db3d8a4a4d3c/1115021b-ac00-4e4c-a0b3-5210792849d4/dom-hill-nimElTcTNyY-unsplash.jpg') center/cover;
  min-height: 500px;
  
  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

// 📝 FORM SECTION
const FormSection = styled.div`
  flex: 1;
  padding: 50px 50px 15px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 30px 30px 10px 30px;
  }
`;

// 🎯 HEADER
const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LoginTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
  font-family: Georgia, 'Times New Roman', serif;
`;

const LoginSubtitle = styled.p`
  color: #666666;
  font-size: 14px;
  margin: 0 0 32px 0;
  font-weight: 400;
`;

// 📧 EMAIL SECTION
const EmailSection = styled.div`
  margin-bottom: 30px;
`;

// 📧 STYLED TEXTFIELD
const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin-bottom: 16px;

    .MuiOutlinedInput-root {
      border-radius: 8px;
      background: #f8fafc;

      &:hover {
        background: #f1f5f9;
      }

      &.Mui-focused {
        background: white;
        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
      }
    }

    .MuiInputLabel-root {
      color: #5f6368;
      
      &.Mui-focused {
        color: #4285f4;
      }
    }
  }
`;

// 🏷️ CHECKBOX & FORGOT PASSWORD
const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 24px 0;
  font-size: 14px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #5f6368;
  cursor: pointer;
  
  input {
    margin-right: 8px;
    cursor: pointer;
  }
`;

const ForgotLink = styled.button`
  background: none;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

// 🔵 LOGIN BUTTON
const LoginButton = styled(Button)`
  && {
    width: 100%;
    padding: 12px;
    background: #1f2937;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 4px;
    text-transform: none;

    &:hover {
      background: #374151;
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }
`;

// ➖ DIVIDER
const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0 2px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e8eaed;
  }
  
  span {
    padding: 0 16px;
    color: #5f6368;
    font-size: 14px;
  }
`;

// 🔵 GOOGLE BUTTON
const GoogleLoginButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px 16px;
    background: white;
    border: 1px solid #dadce0;
    border-radius: 8px;
    font-size: 16px;
    color: #3c4043;
    cursor: pointer;
    margin: 0 0 8px 0;
    text-transform: none;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 2px 8px rgba(32, 33, 36, 0.28);
      transform: translateY(-1px);
    }

    .MuiSvgIcon-root {
      margin-right: 12px;
      width: 20px;
      height: 20px;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

// 📝 FOOTER
const Footer = styled.div`
  text-align: center;
  font-size: 14px;
  color: #5f6368;
`;

const SignupLink = styled.button`
  background: none;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  
  &:hover {
    color: #1557b0;
  }
`;

// 🎯 MAIN COMPONENT
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ SHOW/HIDE PASSWORD STATE

  const { LoginUser } = useContext(userContext);
  const navigate = useNavigate();

  // ✅ TOGGLE PASSWORD VISIBILITY FUNCTION
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Email and password are required');
      return;
    }
    
    setIsSubmitting(true);
    const loginData = { email, password };
    LoginUser(loginData);
    setIsSubmitting(false);
  };

  // ✨ Handle Forgot Password Navigation
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSocialLogin = async (e) => {
    e.preventDefault();
    setSocialLoading('google');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      try {
        const response = await fetch(`${config.host}/customer/social-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: 'google',
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          navigate('/', { replace: true });
        }
      } catch (backendError) {
        console.warn('⚠️ Backend error:', backendError);
      }

      setSocialLoading('');
    } catch (error) {
      console.error('❌ Google login failed:', error);
      setSocialLoading('');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit} autoComplete="off">
        <ImageSection />
        
        <FormSection>
          {/* Hidden dummy fields to disable autofill */}
          <input 
            type="text" 
            name="fake-username" 
            autoComplete="username" 
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex="-1"
          />
          <input 
            type="password" 
            name="fake-password" 
            autoComplete="current-password" 
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex="-1"
          />

          <LoginHeader>
            <LoginTitle>WELCOME!</LoginTitle>
            <LoginSubtitle>Timelessly chic and enduringly fashionable.</LoginSubtitle>
          </LoginHeader>

          <EmailSection>
            {/* Email Input */}
            <StyledTextField
              label="Email"
              type="email"
              name="user-email-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              autoComplete="nope"
              inputProps={{ 
                autoComplete: "nope",
                autoCorrect: "off",
                autoCapitalize: "none"
              }}
            />
            
            {/* ✅ PASSWORD INPUT WITH SHOW/HIDE TOGGLE */}
            <StyledTextField
              label="Password"
              type={showPassword ? 'text' : 'password'} // ✅ DYNAMIC TYPE
              name="user-password-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              autoComplete="new-password"
              inputProps={{ 
                autoComplete: "new-password",
                autoCorrect: "off",
                autoCapitalize: "none"
              }}
              // ✅ INPUT PROPS WITH SHOW/HIDE BUTTON
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <CheckboxContainer>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </CheckboxLabel>
              {/* Forgot Password Link */}
              <ForgotLink type="button" onClick={handleForgotPassword}>
                Forgot password?
              </ForgotLink>
            </CheckboxContainer>

            <LoginButton 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Log in'}
            </LoginButton>
          </EmailSection>

          <Divider><span>or continue with</span></Divider>

          <GoogleLoginButton
            type="button"
            onClick={handleSocialLogin}
            disabled={socialLoading === 'google'}
          >
            <Google />
            {socialLoading === 'google' ? 'Signing in...' : 'Continue with Google'}
          </GoogleLoginButton>

          <Footer>
            Don't have an account?{' '}
            <SignupLink 
              type="button"
              onClick={() => navigate('/register')}
            >
              Create Account
            </SignupLink>
          </Footer>
        </FormSection>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
