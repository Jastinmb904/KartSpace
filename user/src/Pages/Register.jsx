// import React, { useState, useContext } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { 
//   TextField, 
//   Button,
//   Typography,
//   Alert,
//   LinearProgress,
//   Chip,
//   Fade,
//   Stepper,
//   Step,
//   StepLabel,
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import {
//     Visibility,
//     VisibilityOff,
//     Person,
//     Email,
//     Phone,
//     Lock,
//     CheckCircle,
//     Security,
//     ArrowBack,
//     ArrowForward,
//     ErrorOutline,
//     ShoppingCart,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { userContext } from '../Context/Context';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { config } from '../Config/Config';

// // ✨ ANIMATIONS
// const slideIn = keyframes`
//   from { opacity: 0; transform: translateY(30px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // 🎨 MAIN CONTAINER - NO SCROLL
// const RegisterContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   background: linear-gradient(135deg, #ffffff 0%, #f1e3ff 100%);
//   display: flex;
//   flex-direction: column;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//   position: relative;
//   overflow: hidden;
//   box-sizing: border-box;
  
//   @media (max-width: 768px) {
//     overflow-y: auto;
//   }
// `;

// // 🛒 LOGO IN LEFT CORNER
// const LogoCorner = styled.div`
//   position: absolute;
//   top: 20px;
//   left: 30px;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   z-index: 10;
  
//   @media (max-width: 768px) {
//     top: 15px;
//     left: 20px;
//     gap: 6px;
//   }
// `;

// const CornerLogoIcon = styled(ShoppingCart)`
//   && {
//     font-size: 2rem;
//     color: #4f46e5;
    
//     @media (max-width: 768px) {
//       font-size: 1.8rem;
//     }
//   }
// `;

// const CornerLogoText = styled.h1`
//   font-size: 1.8rem;
//   font-weight: 800;
//   margin: 0;
//   color: #4f46e5;
//   font-family: 'Georgia', 'Times New Roman', serif;
//   letter-spacing: -1px;
  
//   @media (max-width: 768px) {
//     font-size: 1.4rem;
//   }
// `;

// // 🎯 CONTENT AREA - FIT TO VIEWPORT
// const ContentArea = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: stretch;
//   justify-content: center;
//   padding: 10px;
//   margin-top: 60px;
//   height: calc(100vh - 60px);
//   overflow: hidden;
//   box-sizing: border-box;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     margin-top: 50px;
//     height: calc(100vh - 50px);
//     padding: 5px;
//   }
// `;

// // 📦 FORM CONTAINER - NO OVERFLOW
// const RegisterForm = styled.form`
//   display: flex;
//   width: 100%;
//   max-width: 1400px;
//   height: 100%;
//   background: transparent;
//   box-shadow: none;
//   animation: ${slideIn} 0.8s ease-out;
//   gap: 0;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     height: auto;
//     overflow-y: auto;
//   }
// `;

// // 📝 FORM SECTION - COMPACT
// const FormSection = styled.div`
//   flex: 0.85;
//   padding: 20px 40px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   width: 100%;
//   max-width: 600px;
//   height: 100%;
//   overflow: hidden;
//   box-sizing: border-box;
  
//   @media (max-width: 1024px) {
//     flex: 0.9;
//     padding: 15px 30px;
//     max-width: 550px;
//   }
  
//   @media (max-width: 768px) {
//     padding: 15px;
//     flex: none;
//     max-width: 100%;
//     align-items: center;
//     height: auto;
//     overflow: visible;
//   }
// `;

// // 🖼️ IMAGE SECTION - FIT PERFECTLY
// const ImageSection = styled.div`
//   flex: 1.15;
//   background-image: url('https://static.vecteezy.com/system/resources/previews/023/658/113/non_2x/modern-happy-female-lifestyle-fashion-portrait-beautiful-attractive-young-woman-girl-enjoy-stylish-walk-with-shopping-bag-packages-on-the-street-trendy-outfit-on-shopping-mall-browse-product-free-png.png');
//   background-position: left center;
//   background-repeat: no-repeat;
//   background-size: contain;
//   height: 100%;
//   display: flex;
//   align-items: flex-start;
//   justify-content: flex-start;
//   position: relative;
//   overflow: hidden;
//   margin: 0;
//   padding: 0;
  
//   @media (max-width: 1024px) {
//     background-size: contain;
//     flex: 1;
//   }
  
//   @media (max-width: 768px) {
//     flex: none;
//     height: 250px;
//     order: -1;
//     background-position: center;
//     background-size: contain;
//     width: 100%;
//   }
// `;

// // 🎯 HEADER - COMPACT
// const RegisterHeader = styled.div`
//   text-align: left;
//   margin-bottom: 15px;
//   width: 100%;
  
//   @media (max-width: 768px) {
//     text-align: center;
//     margin-bottom: 12px;
//   }
// `;

// const RegisterTitle = styled.h2`
//   font-size: 2rem;
//   font-weight: 700;
//   margin: 10px 0 5px 0;
//   background: linear-gradient(45deg, #4f46e5, #7c3aed);
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-family: Georgia, 'Times New Roman', serif;
  
//   @media (max-width: 1024px) {
//     font-size: 1.8rem;
//   }
  
//   @media (max-width: 768px) {
//     font-size: 1.6rem;
//   }
// `;

// const RegisterSubtitle = styled.p`
//   color: #666666;
//   font-size: 14px;
//   margin: 0 0 15px 0;
//   font-weight: 400;
  
//   @media (max-width: 768px) {
//     font-size: 13px;
//     margin: 0 0 12px 0;
//   }
// `;

// // 📧 STYLED TEXTFIELD - COMPACT
// const StyledTextField = styled(TextField)`
//   && {
//     width: 100%;
//     max-width: 450px;
//     margin-bottom: 12px;

//     @media (max-width: 768px) {
//       max-width: 100%;
//       margin-bottom: 10px;
//     }

//     .MuiOutlinedInput-root {
//       border-radius: 10px;
//       background: rgba(255, 255, 255, 0.9);
//       transition: all 0.3s ease;

//       input {
//         padding: 12px 14px;
//         font-size: 0.95rem;
        
//         @media (max-width: 768px) {
//           padding: 10px 12px;
//           font-size: 0.9rem;
//         }
//       }

//       &:hover {
//         background: rgba(255, 255, 255, 0.95);
//         transform: translateY(-1px);
//         box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//       }

//       &.Mui-focused {
//         background: white;
//         box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
//         transform: translateY(-1px);
//       }

//       &.Mui-error {
//         border-color: #ef4444;
//         background: #fef2f2;
//       }
//     }

//     .MuiInputLabel-root {
//       color: #5f6368;
//       font-size: 0.95rem;
      
//       @media (max-width: 768px) {
//         font-size: 0.9rem;
//       }
      
//       &.Mui-focused {
//         color: #4f46e5;
//       }
      
//       &.Mui-error {
//         color: #ef4444;
//       }
//     }

//     .MuiFormHelperText-root {
//       margin-left: 4px;
//       margin-top: 4px;
//       font-size: 12px;
      
//       @media (max-width: 768px) {
//         font-size: 11px;
//       }
      
//       &.Mui-error {
//         color: #ef4444;
//       }
//     }

//     .MuiInputAdornment-root {
//       .MuiSvgIcon-root {
//         font-size: 1.2rem;
        
//         @media (max-width: 768px) {
//           font-size: 1.1rem;
//         }
//       }
//     }
//   }
// `;

// // 🔵 REGISTER BUTTON - COMPACT
// const RegisterButton = styled(Button)`
//   && {
//     width: 100%;
//     max-width: 450px;
//     padding: 12px;
//     background: linear-gradient(45deg, #4f46e5, #7c3aed);
//     color: white;
//     border: none;
//     border-radius: 10px;
//     font-size: 15px;
//     font-weight: 600;
//     cursor: pointer;
//     margin-bottom: 10px;
//     text-transform: none;
//     box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
//     transition: all 0.3s ease;

//     @media (max-width: 768px) {
//       max-width: 100%;
//       font-size: 14px;
//       padding: 11px;
//     }

//     &:hover {
//       background: linear-gradient(45deg, #3730a3, #5b21b6);
//       box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
//       transform: translateY(-1px);
//     }

//     &:disabled {
//       background: linear-gradient(45deg, #9ca3af, #6b7280);
//       cursor: not-allowed;
//       transform: none;
//     }
//   }
// `;

// // 🔙 BACK BUTTON - COMPACT
// const BackButton = styled(Button)`
//   && {
//     width: 100%;
//     max-width: 450px;
//     padding: 10px;
//     background: transparent;
//     color: #64748b;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     font-size: 13px;
//     font-weight: 500;
//     cursor: pointer;
//     margin-bottom: 10px;
//     text-transform: none;
//     transition: all 0.3s ease;

//     @media (max-width: 768px) {
//       max-width: 100%;
//       font-size: 12px;
//       padding: 9px;
//     }

//     &:hover {
//       background: rgba(100, 116, 139, 0.08);
//       color: #475569;
//       border-color: #cbd5e1;
//     }
//   }
// `;

// // 📝 FOOTER - COMPACT
// const Footer = styled.div`
//   text-align: left;
//   font-size: 13px;
//   color: #5f6368;
//   margin-top: 10px;
//   width: 100%;
//   max-width: 450px;
  
//   @media (max-width: 768px) {
//     text-align: center;
//     max-width: 100%;
//     font-size: 12px;
//     margin-top: 8px;
//   }
// `;

// const SigninLink = styled.button`
//   background: none;
//   border: none;
//   color: #4f46e5;
//   cursor: pointer;
//   font-weight: 600;
//   text-decoration: underline;
//   font-size: inherit;
  
//   &:hover {
//     color: #3730a3;
//   }
// `;

// // 🎨 STEPPER - COMPACT
// const StyledStepper = styled(Stepper)`
//   && {
//     margin-bottom: 15px;
//     width: 100%;
//     max-width: 450px;
    
//     @media (max-width: 768px) {
//       max-width: 100%;
//       margin-bottom: 12px;
//     }
    
//     .MuiStepLabel-root .Mui-completed {
//       color: #22c55e;
//     }
    
//     .MuiStepLabel-root .Mui-active {
//       color: #4f46e5;
//     }
    
//     .MuiStepConnector-root {
//       top: 18px;
//       left: calc(-50% + 14px);
//       right: calc(50% + 14px);
      
//       .MuiStepConnector-line {
//         border-color: #e0e7ff;
//         border-top-width: 2px;
//         border-radius: 1px;
//       }
      
//       &.Mui-active .MuiStepConnector-line {
//         border-color: #4f46e5;
//       }
      
//       &.Mui-completed .MuiStepConnector-line {
//         border-color: #22c55e;
//       }
//     }
    
//     .MuiStepLabel-label {
//       font-weight: 600;
//       font-size: 12px;
//       margin-top: 6px;
      
//       @media (max-width: 768px) {
//         font-size: 11px;
//       }
//     }
    
//     .MuiStep-root {
//       padding-left: 0;
//       padding-right: 0;
//     }
    
//     .MuiStepIcon-root {
//       width: 28px;
//       height: 28px;
      
//       @media (max-width: 768px) {
//         width: 24px;
//         height: 24px;
//       }
//     }
//   }
// `;

// // 🚨 ALERT - COMPACT
// const StyledAlert = styled(Alert)`
//   && {
//     margin-bottom: 12px;
//     border-radius: 8px;
//     width: 100%;
//     max-width: 450px;
    
//     @media (max-width: 768px) {
//       max-width: 100%;
//       margin-bottom: 10px;
//     }
    
//     &.MuiAlert-standardInfo {
//       background: linear-gradient(135deg, #dbeafe, #bfdbfe);
//       border: 1px solid #3b82f6;
//       color: #1e40af;
//     }
    
//     &.MuiAlert-standardSuccess {
//       background: linear-gradient(135deg, #dcfce7, #bbf7d0);
//       border: 1px solid #22c55e;
//       color: #15803d;
//     }
//   }
// `;

// // 🎯 MAIN COMPONENT
// const Register = () => {
//     const { host } = config;
//     const navigate = useNavigate();
    
//     const [activeStep, setActiveStep] = useState(0);
//     const [tempId, setTempId] = useState('');
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         otp: '',
//     });
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [passwordStrength, setPasswordStrength] = useState(0);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [touched, setTouched] = useState({});
//     const [otpSent, setOtpSent] = useState(false);
//     const [canResendOTP, setCanResendOTP] = useState(true);
//     const [resendTimer, setResendTimer] = useState(0);

//     const steps = ['Basic Info', 'Email Verification', 'Create Password'];

//     // All your existing functions remain the same...
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (touched[name]) validateField(name, value);
//         if (name === 'password') calculatePasswordStrength(value);
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         setTouched(prev => ({ ...prev, [name]: true }));
//         validateField(name, value);
//     };

//     const calculatePasswordStrength = (password) => {
//         let strength = 0;
//         if (password.length >= 6) strength += 25;
//         if (password.length >= 8) strength += 25;
//         if (/[A-Z]/.test(password)) strength += 15;
//         if (/[a-z]/.test(password)) strength += 15;
//         if (/[0-9]/.test(password)) strength += 10;
//         if (/[^A-Za-z0-9]/.test(password)) strength += 10;
//         setPasswordStrength(strength);
//     };

//     const getPasswordStrengthColor = () => {
//         if (passwordStrength < 30) return 'error';
//         if (passwordStrength < 60) return 'warning';
//         if (passwordStrength < 80) return 'info';
//         return 'success';
//     };

//     const getPasswordStrengthText = () => {
//         if (passwordStrength < 30) return 'Weak';
//         if (passwordStrength < 60) return 'Fair';
//         if (passwordStrength < 80) return 'Good';
//         return 'Strong';
//     };

//     const validateField = (name, value) => {
//         const newErrors = { ...errors };
        
//         switch (name) {
//             case 'name':
//                 if (!value.trim()) {
//                     newErrors.name = 'Full name is required';
//                 } else if (value.trim().length < 2) {
//                     newErrors.name = 'Name must be at least 2 characters long';
//                 } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
//                     newErrors.name = 'Name can only contain letters and spaces';
//                 } else {
//                     delete newErrors.name;
//                 }
//                 break;
//             case 'email':
//                 if (!value.trim()) {
//                     newErrors.email = 'Email address is required';
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
//                     newErrors.password = 'Password must be at least 6 characters long';
//                 } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
//                     newErrors.password = 'Password must contain at least one letter and one number';
//                 } else {
//                     delete newErrors.password;
//                 }
//                 break;
//             case 'phone':
//                 if (!value.trim()) {
//                     newErrors.phone = 'Phone number is required';
//                 } else {
//                     const cleanPhone = value.replace(/[^\d+]/g, '');
//                     if (cleanPhone.length < 10) {
//                         newErrors.phone = 'Phone number must be at least 10 digits';
//                     } else if (!/^[\+]?[1-9][\d]{9,14}$/.test(cleanPhone)) {
//                         newErrors.phone = 'Please enter a valid phone number';
//                     } else {
//                         delete newErrors.phone;
//                     }
//                 }
//                 break;
//             case 'otp':
//                 if (!value.trim()) {
//                     newErrors.otp = 'Verification code is required';
//                 } else if (!/^\d{6}$/.test(value.trim())) {
//                     newErrors.otp = 'Please enter the 6-digit code sent to your email';
//                 } else {
//                     delete newErrors.otp;
//                 }
//                 break;
//             default:
//                 break;
//         }
        
//         setErrors(newErrors);
//     };

//     const validateStep = (step) => {
//         const newErrors = {};
        
//         if (step === 0) {
//             if (!formData.name.trim()) newErrors.name = 'Full name is required';
//             if (!formData.email.trim()) newErrors.email = 'Email address is required';
//             if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            
//             validateField('name', formData.name);
//             validateField('email', formData.email);
//             validateField('phone', formData.phone);
//         } else if (step === 1) {
//             if (!formData.otp.trim()) newErrors.otp = 'Verification code is required';
//         } else if (step === 2) {
//             if (!formData.password) newErrors.password = 'Password is required';
//         }
        
//         setErrors(prev => ({ ...prev, ...newErrors }));
//         return Object.keys({ ...errors, ...newErrors }).length === 0;
//     };

//     const handleSendOTP = async () => {
//         if (!validateStep(0)) return;
        
//         setIsSubmitting(true);
//         try {
//             const response = await axios.post(`${host}/customer/send-otp`, {
//                 name: formData.name,
//                 email: formData.email,
//                 phone: formData.phone
//             });

//             if (response.data.success) {
//                 setTempId(response.data.tempId);
//                 setOtpSent(true);
//                 setActiveStep(1);
//                 startResendTimer();
                
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Verification Code Sent!',
//                     text: `A 6-digit code has been sent to ${formData.email}`,
//                     timer: 3000,
//                     showConfirmButton: false
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Unable to Send Code',
//                     text: response.data.message
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Network Error',
//                 text: error.response?.data?.message || 'Unable to send verification code. Please try again.'
//             });
//         }
//         setIsSubmitting(false);
//     };

//     const handleVerifyOTP = async () => {
//         if (!validateStep(1)) return;
        
//         setIsSubmitting(true);
//         try {
//             const response = await axios.post(`${host}/customer/verify-otp`, {
//                 email: formData.email,
//                 otp: formData.otp,
//                 tempId: tempId
//             });

//             if (response.data.success) {
//                 setActiveStep(2);
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Email Verified!',
//                     text: 'Your email has been verified successfully. Now create your password.',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Invalid Verification Code',
//                     text: 'The code you entered is incorrect or expired. Please try again.'
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Verification Failed',
//                 text: error.response?.data?.message || 'Unable to verify your email. Please check the code and try again.'
//             });
//         }
//         setIsSubmitting(false);
//     };

//     const handleCompleteRegistration = async () => {
//         if (!validateStep(2)) return;
        
//         setIsSubmitting(true);
//         try {
//             const response = await axios.post(`${host}/customer/complete-registration`, {
//                 tempId: tempId,
//                 password: formData.password
//             });

//             if (response.data.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: '🎉 Welcome to KartSpace!',
//                     text: 'Your account has been created successfully! You can now sign in and start shopping.',
//                     confirmButtonText: 'Go to Sign In',
//                     confirmButtonColor: '#4f46e5'
//                 }).then(() => {
//                     navigate('/login');
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Registration Failed',
//                     text: response.data.message || 'Unable to complete registration. Please try again.'
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Registration Error',
//                 text: error.response?.data?.message || 'Unable to create your account. Please try again.'
//             });
//         }
//         setIsSubmitting(false);
//     };

//     const handleResendOTP = async () => {
//         if (!canResendOTP) return;
        
//         try {
//             const response = await axios.post(`${host}/customer/resend-otp`, {
//                 email: formData.email
//             });

//             if (response.data.success) {
//                 startResendTimer();
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Code Resent!',
//                     text: 'A new verification code has been sent to your email',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Resend Failed',
//                 text: 'Unable to resend verification code. Please try again.'
//             });
//         }
//     };

//     const startResendTimer = () => {
//         setCanResendOTP(false);
//         setResendTimer(60);
        
//         const timer = setInterval(() => {
//             setResendTimer(prev => {
//                 if (prev <= 1) {
//                     setCanResendOTP(true);
//                     clearInterval(timer);
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//     };

//     const isFieldValid = (fieldName) => {
//         return touched[fieldName] && !errors[fieldName] && formData[fieldName].trim();
//     };

//     const renderStepContent = (step) => {
//         switch (step) {
//             case 0:
//                 return (
//                     <div style={{ width: '100%' }}>
//                         <StyledTextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="name"
//                             label="Full Name"
//                             type="text"
//                             autoFocus
//                             placeholder="Enter your full name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.name && !!errors.name}
//                             helperText={touched.name && errors.name}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Person color={isFieldValid('name') ? 'success' : 'action'} />
//                                     </InputAdornment>
//                                 ),
//                                 endAdornment: isFieldValid('name') ? (
//                                     <InputAdornment position="end">
//                                         <CheckCircle color="success" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : touched.name && errors.name ? (
//                                     <InputAdornment position="end">
//                                         <ErrorOutline color="error" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : null,
//                             }}
//                         />

//                         <StyledTextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="email"
//                             label="Email Address"
//                             type="email"
//                             placeholder="user@example.com"
//                             value={formData.email}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.email && !!errors.email}
//                             helperText={touched.email && errors.email}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Email color={isFieldValid('email') ? 'success' : 'action'} />
//                                     </InputAdornment>
//                                 ),
//                                 endAdornment: isFieldValid('email') ? (
//                                     <InputAdornment position="end">
//                                         <CheckCircle color="success" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : touched.email && errors.email ? (
//                                     <InputAdornment position="end">
//                                         <ErrorOutline color="error" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : null,
//                             }}
//                         />

//                         <StyledTextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="phone"
//                             label="Phone Number"
//                             type="tel"
//                             placeholder="+1234567890"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.phone && !!errors.phone}
//                             helperText={touched.phone && errors.phone}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Phone color={isFieldValid('phone') ? 'success' : 'action'} />
//                                     </InputAdornment>
//                                 ),
//                                 endAdornment: isFieldValid('phone') ? (
//                                     <InputAdornment position="end">
//                                         <CheckCircle color="success" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : touched.phone && errors.phone ? (
//                                     <InputAdornment position="end">
//                                         <ErrorOutline color="error" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : null,
//                             }}
//                         />
//                     </div>
//                 );

//             case 1:
//                 return (
//                     <div style={{ width: '100%' }}>
//                         <StyledAlert severity="info">
//                             We've sent a 6-digit verification code to <strong>{formData.email}</strong>. Please check your inbox and enter the code below.
//                         </StyledAlert>

//                         <StyledTextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="otp"
//                             label="Enter Verification Code"
//                             type="text"
//                             autoFocus
//                             placeholder="123456"
//                             value={formData.otp}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.otp && !!errors.otp}
//                             helperText={touched.otp && errors.otp}
//                             inputProps={{ 
//                                 maxLength: 6, 
//                                 style: { 
//                                     textAlign: 'center', 
//                                     fontSize: '20px', 
//                                     letterSpacing: '6px',
//                                     fontFamily: 'monospace',
//                                     fontWeight: 'bold',
//                                 } 
//                             }}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Security color={isFieldValid('otp') ? 'success' : 'action'} />
//                                     </InputAdornment>
//                                 ),
//                                 endAdornment: isFieldValid('otp') ? (
//                                     <InputAdornment position="end">
//                                         <CheckCircle color="success" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : touched.otp && errors.otp ? (
//                                     <InputAdornment position="end">
//                                         <ErrorOutline color="error" fontSize="small" />
//                                     </InputAdornment>
//                                 ) : null,
//                             }}
//                         />

//                         <div style={{ textAlign: 'center', marginTop: '12px' }}>
//                             {canResendOTP ? (
//                                 <button 
//                                     type="button"
//                                     onClick={handleResendOTP}
//                                     style={{
//                                         background: 'none',
//                                         border: 'none',
//                                         color: '#4f46e5',
//                                         cursor: 'pointer',
//                                         fontWeight: '600',
//                                         textDecoration: 'underline',
//                                         fontSize: '13px'
//                                     }}
//                                 >
//                                     Didn't receive the code? Resend
//                                 </button>
//                             ) : (
//                                 <Typography variant="body2" color="text.secondary" style={{ fontSize: '13px' }}>
//                                     You can request a new code in {resendTimer} seconds
//                                 </Typography>
//                             )}
//                         </div>
//                     </div>
//                 );

//             case 2:
//                 return (
//                     <div style={{ width: '100%' }}>
//                         <StyledAlert severity="success">
//                             🎉 Email verified successfully! Now create a secure password to complete your KartSpace account setup.
//                         </StyledAlert>

//                         <StyledTextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Create Password"
//                             type={showPassword ? 'text' : 'password'}
//                             autoFocus
//                             placeholder="Enter a strong password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.password && !!errors.password}
//                             helperText={touched.password && errors.password}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Lock color={isFieldValid('password') ? 'success' : 'action'} />
//                                     </InputAdornment>
//                                 ),
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             edge="end"
//                                             size="small"
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />

//                         {formData.password && (
//                             <Fade in timeout={300}>
//                                 <div style={{ marginTop: '12px', marginBottom: '12px', width: '100%', maxWidth: '450px' }}>
//                                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
//                                         <Typography variant="caption" color="text.secondary" style={{ fontSize: '12px' }}>
//                                             Password Strength:
//                                         </Typography>
//                                         <Chip
//                                             label={getPasswordStrengthText()}
//                                             size="small"
//                                             color={getPasswordStrengthColor()}
//                                             variant="outlined"
//                                             style={{ fontSize: '11px', height: '20px' }}
//                                         />
//                                     </div>
//                                     <LinearProgress
//                                         variant="determinate"
//                                         value={passwordStrength}
//                                         color={getPasswordStrengthColor()}
//                                         sx={{ 
//                                             height: 6, 
//                                             borderRadius: 3,
//                                             background: 'rgba(0,0,0,0.1)',
//                                         }}
//                                     />
//                                 </div>
//                             </Fade>
//                         )}
//                     </div>
//                 );

//             default:
//                 return null;
//         }
//     };

//     const getStepButtonText = (step) => {
//         switch (step) {
//             case 0: return 'Send Verification Code';
//             case 1: return 'Verify Email';
//             case 2: return 'Create KartSpace Account';
//             default: return 'Next';
//         }
//     };

//     const handleStepSubmit = () => {
//         switch (activeStep) {
//             case 0: handleSendOTP(); break;
//             case 1: handleVerifyOTP(); break;
//             case 2: handleCompleteRegistration(); break;
//             default: break;
//         }
//     };

//     return (
//         <RegisterContainer>
//             <LogoCorner>
//                 <CornerLogoIcon />
//                 <CornerLogoText>KartSpace</CornerLogoText>
//             </LogoCorner>

//             <ContentArea>
//                 <RegisterForm onSubmit={(e) => { e.preventDefault(); handleStepSubmit(); }} autoComplete="off">
//                     <FormSection>
//                         <input 
//                             type="text" 
//                             name="fake-username" 
//                             autoComplete="username" 
//                             style={{
//                                 position: 'absolute',
//                                 left: '-9999px',
//                                 width: '1px',
//                                 height: '1px',
//                                 opacity: 0,
//                                 pointerEvents: 'none'
//                             }}
//                             tabIndex="-1"
//                         />

//                         <RegisterHeader>
//                             <RegisterTitle>Create Account</RegisterTitle>
//                             <RegisterSubtitle>Join us today and get started on your shopping journey</RegisterSubtitle>
//                         </RegisterHeader>

//                         <StyledStepper activeStep={activeStep}>
//                             {steps.map((label) => (
//                                 <Step key={label}>
//                                     <StepLabel>{label}</StepLabel>
//                                 </Step>
//                             ))}
//                         </StyledStepper>

//                         <div style={{ minHeight: '200px', width: '100%' }}>
//                             {renderStepContent(activeStep)}
//                         </div>

//                         <RegisterButton 
//                             type="submit" 
//                             disabled={isSubmitting}
//                             startIcon={activeStep === 2 ? null : <ArrowForward />}
//                         >
//                             {isSubmitting ? 'Processing...' : getStepButtonText(activeStep)}
//                         </RegisterButton>

//                         <Footer>
//                             Already have a KartSpace account?{' '}
//                             <SigninLink 
//                                 type="button"
//                                 onClick={() => navigate('/login')}
//                             >
//                                 Sign In Here
//                             </SigninLink>
//                         </Footer>

//                         {activeStep > 0 && (
//                             <BackButton
//                                 onClick={() => setActiveStep(prev => prev - 1)}
//                                 startIcon={<ArrowBack />}
//                             >
//                                 Back to Previous Step
//                             </BackButton>
//                         )}
//                     </FormSection>
                    
//                     <ImageSection />
//                 </RegisterForm>
//             </ContentArea>
//         </RegisterContainer>
//     );
// };

// export default Register;

import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  TextField, 
  Button,
  Typography,
  Alert,
  LinearProgress,
  Chip,
  Fade,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Person,
    Email,
    Phone,
    Lock,
    CheckCircle,
    Security,
    ArrowBack,
    ArrowForward,
    ErrorOutline,
    ShoppingCart,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { config } from '../Config/Config';

// ✨ ANIMATIONS
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🎨 MAIN CONTAINER - MATCHING LOGIN STYLE
const RegisterContainer = styled.div`
  height: 94vh;
  background-color: #e6e6e6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

// 📦 FORM CONTAINER - MATCHING LOGIN STYLE
const RegisterForm = styled.form`
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

// 🖼️ IMAGE SECTION - UPDATED WITH YOUR NEW IMAGE
const ImageSection = styled.div`
  flex: 1;
  background: url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?cs=srgb&dl=pexels-frendsmans-1926769.jpg&fm=jpg') center/cover;
  background-repeat: no-repeat;
  min-height: 500px;
  
  @media (max-width: 768px) {
    min-height: 500px;
    order: -1;
    background-position: center;
    background-size: cover;
    width: 100%;
  }
`;

// 📝 FORM SECTION - MATCHING LOGIN STYLE
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

// 🎯 HEADER - MATCHING LOGIN STYLE
const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const RegisterTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
  font-family: Georgia, 'Times New Roman', serif;
`;

const RegisterSubtitle = styled.p`
  color: #666666;
  font-size: 14px;
  margin: 0 0 20px 0;  /* ✅ REDUCED SPACING */
  font-weight: 400;
`;

// 📧 STYLED TEXTFIELD - MATCHING LOGIN STYLE
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

      &.Mui-error {
        border-color: #ef4444;
        background: #fef2f2;
      }
    }

    .MuiInputLabel-root {
      color: #5f6368;
      
      &.Mui-focused {
        color: #4285f4;
      }
      
      &.Mui-error {
        color: #ef4444;
      }
    }

    .MuiFormHelperText-root {
      margin-left: 4px;
      margin-top: 4px;
      font-size: 12px;
      
      &.Mui-error {
        color: #ef4444;
      }
    }
  }
`;

// 🔵 REGISTER BUTTON - MATCHING LOGIN STYLE
const RegisterButton = styled(Button)`
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

// 🔙 BACK BUTTON - MATCHING LOGIN STYLE
const BackButton = styled(Button)`
  && {
    width: 100%;
    padding: 10px;
    background: transparent;
    color: #64748b;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 10px;
    text-transform: none;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(100, 116, 139, 0.08);
      color: #475569;
      border-color: #cbd5e1;
    }
  }
`;

// 📝 FOOTER - MATCHING LOGIN STYLE
const Footer = styled.div`
  text-align: center;
  font-size: 14px;
  color: #5f6368;
  margin-top: 10px;
`;

const SigninLink = styled.button`
  background: none;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  font-size: inherit;
  
  &:hover {
    color: #1557b0;
  }
`;

// 🎨 STEPPER - MATCHING LOGIN STYLE
const StyledStepper = styled(Stepper)`
  && {
    margin-bottom: 30px;
    
    .MuiStepLabel-root .Mui-completed {
      color: #22c55e;
    }
    
    .MuiStepLabel-root .Mui-active {
      color: #4285f4;
    }
    
    .MuiStepConnector-root {
      top: 18px;
      left: calc(-50% + 14px);
      right: calc(50% + 14px);
      
      .MuiStepConnector-line {
        border-color: #e0e7ff;
        border-top-width: 2px;
        border-radius: 1px;
      }
      
      &.Mui-active .MuiStepConnector-line {
        border-color: #4285f4;
      }
      
      &.Mui-completed .MuiStepConnector-line {
        border-color: #22c55e;
      }
    }
    
    .MuiStepLabel-label {
      font-weight: 600;
      font-size: 12px;
      margin-top: 6px;
    }
    
    .MuiStep-root {
      padding-left: 0;
      padding-right: 0;
    }
    
    .MuiStepIcon-root {
      width: 28px;
      height: 28px;
    }
  }
`;

// 🚨 ALERT - MATCHING LOGIN STYLE
const StyledAlert = styled(Alert)`
  && {
    margin-bottom: 16px;
    border-radius: 8px;
    
    &.MuiAlert-standardInfo {
      background: #e8f4fd;
      border: 1px solid #4285f4;
      color: #1e40af;
    }
    
    &.MuiAlert-standardSuccess {
      background: #dcfce7;
      border: 1px solid #22c55e;
      color: #15803d;
    }
  }
`;

// ➖ DIVIDER - MATCHING LOGIN STYLE  
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

// 🎯 MAIN COMPONENT - YOUR EXISTING LOGIC PRESERVED
const Register = () => {
    const { host } = config;
    const navigate = useNavigate();
    
    const [activeStep, setActiveStep] = useState(0);
    const [tempId, setTempId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        otp: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [canResendOTP, setCanResendOTP] = useState(true);
    const [resendTimer, setResendTimer] = useState(0);

    const steps = ['Basic Info', 'Email Verification', 'Create Password'];

    // All your existing functions remain the same...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) validateField(name, value);
        if (name === 'password') calculatePasswordStrength(value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength += 25;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[a-z]/.test(password)) strength += 15;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        setPasswordStrength(strength);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 30) return 'error';
        if (passwordStrength < 60) return 'warning';
        if (passwordStrength < 80) return 'info';
        return 'success';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength < 30) return 'Weak';
        if (passwordStrength < 60) return 'Fair';
        if (passwordStrength < 80) return 'Good';
        return 'Strong';
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    newErrors.name = 'Full name is required';
                } else if (value.trim().length < 2) {
                    newErrors.name = 'Name must be at least 2 characters long';
                } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    newErrors.name = 'Name can only contain letters and spaces';
                } else {
                    delete newErrors.name;
                }
                break;
            case 'email':
                if (!value.trim()) {
                    newErrors.email = 'Email address is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = 'Please enter a valid email address';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required';
                } else if (value.length < 6) {
                    newErrors.password = 'Password must be at least 6 characters long';
                } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
                    newErrors.password = 'Password must contain at least one letter and one number';
                } else {
                    delete newErrors.password;
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    newErrors.phone = 'Phone number is required';
                } else {
                    const cleanPhone = value.replace(/[^\d+]/g, '');
                    if (cleanPhone.length < 10) {
                        newErrors.phone = 'Phone number must be at least 10 digits';
                    } else if (!/^[\+]?[1-9][\d]{9,14}$/.test(cleanPhone)) {
                        newErrors.phone = 'Please enter a valid phone number';
                    } else {
                        delete newErrors.phone;
                    }
                }
                break;
            case 'otp':
                if (!value.trim()) {
                    newErrors.otp = 'Verification code is required';
                } else if (!/^\d{6}$/.test(value.trim())) {
                    newErrors.otp = 'Please enter the 6-digit code sent to your email';
                } else {
                    delete newErrors.otp;
                }
                break;
            default:
                break;
        }
        
        setErrors(newErrors);
    };

    const validateStep = (step) => {
        const newErrors = {};
        
        if (step === 0) {
            if (!formData.name.trim()) newErrors.name = 'Full name is required';
            if (!formData.email.trim()) newErrors.email = 'Email address is required';
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            
            validateField('name', formData.name);
            validateField('email', formData.email);
            validateField('phone', formData.phone);
        } else if (step === 1) {
            if (!formData.otp.trim()) newErrors.otp = 'Verification code is required';
        } else if (step === 2) {
            if (!formData.password) newErrors.password = 'Password is required';
        }
        
        setErrors(prev => ({ ...prev, ...newErrors }));
        return Object.keys({ ...errors, ...newErrors }).length === 0;
    };

    const handleSendOTP = async () => {
        if (!validateStep(0)) return;
        
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${host}/customer/send-otp`, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            });

            if (response.data.success) {
                setTempId(response.data.tempId);
                setOtpSent(true);
                setActiveStep(1);
                startResendTimer();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Verification Code Sent!',
                    text: `A 6-digit code has been sent to ${formData.email}`,
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Unable to Send Code',
                    text: response.data.message
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: error.response?.data?.message || 'Unable to send verification code. Please try again.'
            });
        }
        setIsSubmitting(false);
    };

    const handleVerifyOTP = async () => {
        if (!validateStep(1)) return;
        
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${host}/customer/verify-otp`, {
                email: formData.email,
                otp: formData.otp,
                tempId: tempId
            });

            if (response.data.success) {
                setActiveStep(2);
                Swal.fire({
                    icon: 'success',
                    title: 'Email Verified!',
                    text: 'Your email has been verified successfully. Now create your password.',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Verification Code',
                    text: 'The code you entered is incorrect or expired. Please try again.'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: error.response?.data?.message || 'Unable to verify your email. Please check the code and try again.'
            });
        }
        setIsSubmitting(false);
    };

    const handleCompleteRegistration = async () => {
        if (!validateStep(2)) return;
        
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${host}/customer/complete-registration`, {
                tempId: tempId,
                password: formData.password
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: '🎉 Welcome to KartSpace!',
                    text: 'Your account has been created successfully! You can now sign in and start shopping.',
                    confirmButtonText: 'Go to Sign In',
                    confirmButtonColor: '#1f2937'
                }).then(() => {
                    navigate('/login');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: response.data.message || 'Unable to complete registration. Please try again.'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: error.response?.data?.message || 'Unable to create your account. Please try again.'
            });
        }
        setIsSubmitting(false);
    };

    const handleResendOTP = async () => {
        if (!canResendOTP) return;
        
        try {
            const response = await axios.post(`${host}/customer/resend-otp`, {
                email: formData.email
            });

            if (response.data.success) {
                startResendTimer();
                Swal.fire({
                    icon: 'success',
                    title: 'Code Resent!',
                    text: 'A new verification code has been sent to your email',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Resend Failed',
                text: 'Unable to resend verification code. Please try again.'
            });
        }
    };

    const startResendTimer = () => {
        setCanResendOTP(false);
        setResendTimer(60);
        
        const timer = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    setCanResendOTP(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const isFieldValid = (fieldName) => {
        return touched[fieldName] && !errors[fieldName] && formData[fieldName].trim();
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div style={{ width: '100%' }}>
                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Full Name"
                            type="text"
                            autoFocus
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color={isFieldValid('name') ? 'success' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: isFieldValid('name') ? (
                                    <InputAdornment position="end">
                                        <CheckCircle color="success" fontSize="small" />
                                    </InputAdornment>
                                ) : touched.name && errors.name ? (
                                    <InputAdornment position="end">
                                        <ErrorOutline color="error" fontSize="small" />
                                    </InputAdornment>
                                ) : null,
                            }}
                        />

                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="user@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color={isFieldValid('email') ? 'success' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: isFieldValid('email') ? (
                                    <InputAdornment position="end">
                                        <CheckCircle color="success" fontSize="small" />
                                    </InputAdornment>
                                ) : touched.email && errors.email ? (
                                    <InputAdornment position="end">
                                        <ErrorOutline color="error" fontSize="small" />
                                    </InputAdornment>
                                ) : null,
                            }}
                        />

                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            type="tel"
                            placeholder="+1234567890"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && !!errors.phone}
                            helperText={touched.phone && errors.phone}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone color={isFieldValid('phone') ? 'success' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: isFieldValid('phone') ? (
                                    <InputAdornment position="end">
                                        <CheckCircle color="success" fontSize="small" />
                                    </InputAdornment>
                                ) : touched.phone && errors.phone ? (
                                    <InputAdornment position="end">
                                        <ErrorOutline color="error" fontSize="small" />
                                    </InputAdornment>
                                ) : null,
                            }}
                        />
                    </div>
                );

            case 1:
                return (
                    <div style={{ width: '100%' }}>
                        <StyledAlert severity="info">
                            We've sent a 6-digit verification code to <strong>{formData.email}</strong>. Please check your inbox and enter the code below.
                        </StyledAlert>

                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="otp"
                            label="Enter Verification Code"
                            type="text"
                            autoFocus
                            placeholder="123456"
                            value={formData.otp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.otp && !!errors.otp}
                            helperText={touched.otp && errors.otp}
                            inputProps={{ 
                                maxLength: 6, 
                                style: { 
                                    textAlign: 'center', 
                                    fontSize: '20px', 
                                    letterSpacing: '6px',
                                    fontFamily: 'monospace',
                                    fontWeight: 'bold',
                                } 
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Security color={isFieldValid('otp') ? 'success' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: isFieldValid('otp') ? (
                                    <InputAdornment position="end">
                                        <CheckCircle color="success" fontSize="small" />
                                    </InputAdornment>
                                ) : touched.otp && errors.otp ? (
                                    <InputAdornment position="end">
                                        <ErrorOutline color="error" fontSize="small" />
                                    </InputAdornment>
                                ) : null,
                            }}
                        />

                        <div style={{ textAlign: 'center', marginTop: '12px' }}>
                            {canResendOTP ? (
                                <button 
                                    type="button"
                                    onClick={handleResendOTP}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#1a73e8',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        textDecoration: 'underline',
                                        fontSize: '13px'
                                    }}
                                >
                                    Didn't receive the code? Resend
                                </button>
                            ) : (
                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '13px' }}>
                                    You can request a new code in {resendTimer} seconds
                                </Typography>
                            )}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div style={{ width: '100%' }}>
                        <StyledAlert severity="success">
                            🎉 Email verified successfully! Now create a secure password to complete your KartSpace account setup.
                        </StyledAlert>

                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Create Password"
                            type={showPassword ? 'text' : 'password'}
                            autoFocus
                            placeholder="Enter a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color={isFieldValid('password') ? 'success' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {formData.password && (
                            <Fade in timeout={300}>
                                <div style={{ marginTop: '12px', marginBottom: '12px', width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                        <Typography variant="caption" color="text.secondary" style={{ fontSize: '12px' }}>
                                            Password Strength:
                                        </Typography>
                                        <Chip
                                            label={getPasswordStrengthText()}
                                            size="small"
                                            color={getPasswordStrengthColor()}
                                            variant="outlined"
                                            style={{ fontSize: '11px', height: '20px' }}
                                        />
                                    </div>
                                    <LinearProgress
                                        variant="determinate"
                                        value={passwordStrength}
                                        color={getPasswordStrengthColor()}
                                        sx={{ 
                                            height: 6, 
                                            borderRadius: 3,
                                            background: 'rgba(0,0,0,0.1)',
                                        }}
                                    />
                                </div>
                            </Fade>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    const getStepButtonText = (step) => {
        switch (step) {
            case 0: return 'Send Verification Code';
            case 1: return 'Verify Email';
            case 2: return 'Create KartSpace Account';
            default: return 'Next';
        }
    };

    const handleStepSubmit = () => {
        switch (activeStep) {
            case 0: handleSendOTP(); break;
            case 1: handleVerifyOTP(); break;
            case 2: handleCompleteRegistration(); break;
            default: break;
        }
    };

    return (
        <RegisterContainer>
            <RegisterForm onSubmit={(e) => { e.preventDefault(); handleStepSubmit(); }} autoComplete="off">
                <FormSection>
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

                    <RegisterHeader>
                        <RegisterTitle>Create Account</RegisterTitle>
                        <RegisterSubtitle>Join us today and get started on your shopping journey</RegisterSubtitle>
                    </RegisterHeader>

                    <StyledStepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </StyledStepper>

                    <div style={{ minHeight: '300px', width: '100%' }}>
                        {renderStepContent(activeStep)}
                    </div>

                    <RegisterButton 
                        type="submit" 
                        disabled={isSubmitting}
                        startIcon={activeStep === 2 ? null : <ArrowForward />}
                    >
                        {isSubmitting ? 'Processing...' : getStepButtonText(activeStep)}
                    </RegisterButton>

                    <Divider><span>or</span></Divider>

                    <Footer>
                        Already have a KartSpace account?{' '}
                        <SigninLink 
                            type="button"
                            onClick={() => navigate('/login')}
                        >
                            Sign In Here
                        </SigninLink>
                    </Footer>

                    {activeStep > 0 && (
                        <BackButton
                            onClick={() => setActiveStep(prev => prev - 1)}
                            startIcon={<ArrowBack />}
                        >
                            Back to Previous Step
                        </BackButton>
                    )}
                </FormSection>
                
                <ImageSection />
            </RegisterForm>
        </RegisterContainer>
    );
};

export default Register;
