// import React, { useState } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { 
//   TextField, 
//   Button,
//   Alert,
//   InputAdornment,
//   CircularProgress,
// } from '@mui/material';
// import {
//     Email,
//     ArrowBack,
//     CheckCircle,
//     ErrorOutline,
//     ShoppingCart,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { config } from '../Config/Config';

// // ✨ ANIMATIONS
// const slideIn = keyframes`
//   from { opacity: 0; transform: translateY(30px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // 🎨 STYLED COMPONENTS
// const ForgotPasswordContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   background: linear-gradient(135deg, #ffffff 0%, #f1e3ff 100%);
//   display: flex;
//   flex-direction: column;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//   position: relative;
//   overflow: hidden;
// `;

// const LogoCorner = styled.div`
//   position: absolute;
//   top: 20px;
//   left: 30px;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   z-index: 10;
// `;

// const CornerLogoIcon = styled(ShoppingCart)`
//   && { font-size: 2rem; color: #4f46e5; }
// `;

// const CornerLogoText = styled.h1`
//   font-size: 1.8rem;
//   font-weight: 800;
//   margin: 0;
//   color: #4f46e5;
//   font-family: 'Georgia', 'Times New Roman', serif;
// `;

// const ContentArea = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
// `;

// const ForgotPasswordForm = styled.form`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-radius: 20px;
//   padding: 50px 40px;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//   animation: ${slideIn} 0.8s ease-out;
//   width: 100%;
//   max-width: 450px;
// `;

// const ForgotPasswordHeader = styled.div`
//   text-align: center;
//   margin-bottom: 40px;
// `;

// const ForgotPasswordTitle = styled.h2`
//   font-size: 2.2rem;
//   font-weight: 700;
//   margin: 0 0 12px 0;
//   background: linear-gradient(45deg, #4f46e5, #7c3aed);
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-family: Georgia, 'Times New Roman', serif;
// `;

// const ForgotPasswordSubtitle = styled.p`
//   color: #666666;
//   font-size: 16px;
//   margin: 0;
//   line-height: 1.5;
// `;

// const StyledTextField = styled(TextField)`
//   && {
//     width: 100%;
//     margin-bottom: 24px;

//     .MuiOutlinedInput-root {
//       border-radius: 12px;
//       background: rgba(255, 255, 255, 0.9);
//       transition: all 0.3s ease;

//       &:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//       }

//       &.Mui-focused {
//         box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
//         transform: translateY(-2px);
//       }
//     }
//   }
// `;

// const ResetButton = styled(Button)`
//   && {
//     width: 100%;
//     padding: 16px;
//     background: linear-gradient(45deg, #4f46e5, #7c3aed);
//     color: white;
//     border-radius: 12px;
//     font-size: 16px;
//     font-weight: 600;
//     text-transform: none;
//     margin-bottom: 20px;
//     box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);

//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 12px 35px rgba(79, 70, 229, 0.4);
//     }

//     &:disabled {
//       background: #9ca3af;
//       transform: none;
//     }
//   }
// `;

// const BackButton = styled(Button)`
//   && {
//     width: 100%;
//     padding: 14px;
//     color: #64748b;
//     border: 1px solid #e2e8f0;
//     border-radius: 10px;
//     text-transform: none;
//   }
// `;

// const ForgotPassword = () => {
//     const { host } = config;
//     const navigate = useNavigate();
    
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [touched, setTouched] = useState(false);

//     const validateEmail = (email) => {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         if (!email.trim()) {
//             setError('Email address is required');
//             return;
//         }

//         if (!validateEmail(email)) {
//             setError('Please enter a valid email address');
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const response = await axios.post(`${host}/auth/forgot-password`, {
//                 email: email.trim().toLowerCase()
//             });

//             if (response.data.success) {
//                 setSuccess(response.data.message);
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Reset Link Sent! 📧',
//                     text: 'Please check your email for password reset instructions.',
//                     confirmButtonColor: '#4f46e5',
//                     confirmButtonText: 'Got it!'
//                 });
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || 'Failed to send reset link. Please try again.';
//             setError(errorMessage);
            
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: errorMessage,
//                 confirmButtonColor: '#4f46e5'
//             });
//         }

//         setIsSubmitting(false);
//     };

//     const isEmailValid = touched && email.trim() && validateEmail(email) && !error;

//     return (
//         <ForgotPasswordContainer>
//             <LogoCorner>
//                 <CornerLogoIcon />
//                 <CornerLogoText>KartSpace</CornerLogoText>
//             </LogoCorner>

//             <ContentArea>
//                 <ForgotPasswordForm onSubmit={handleSubmit}>
//                     <ForgotPasswordHeader>
//                         <ForgotPasswordTitle>Forgot Password?</ForgotPasswordTitle>
//                         <ForgotPasswordSubtitle>
//                             Don't worry! Enter your email address and we'll send you a link to reset your password.
//                         </ForgotPasswordSubtitle>
//                     </ForgotPasswordHeader>

//                     {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
//                     {success && <Alert severity="success" style={{ marginBottom: '20px' }}>{success}</Alert>}

//                     <StyledTextField
//                         fullWidth
//                         type="email"
//                         label="Email Address"
//                         placeholder="Enter your email address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onBlur={() => setTouched(true)}
//                         error={touched && (!email.trim() || (email.trim() && !validateEmail(email)))}
//                         helperText={touched && (!email.trim() ? 'Email is required' : (email.trim() && !validateEmail(email) ? 'Invalid email format' : ''))}
//                         disabled={isSubmitting}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <Email color={isEmailValid ? 'success' : 'action'} />
//                                 </InputAdornment>
//                             ),
//                             endAdornment: isEmailValid ? (
//                                 <InputAdornment position="end">
//                                     <CheckCircle color="success" fontSize="small" />
//                                 </InputAdornment>
//                             ) : touched && email.trim() && !validateEmail(email) ? (
//                                 <InputAdornment position="end">
//                                     <ErrorOutline color="error" fontSize="small" />
//                                 </InputAdornment>
//                             ) : null,
//                         }}
//                     />

//                     <ResetButton 
//                         type="submit" 
//                         disabled={isSubmitting || !isEmailValid}
//                     >
//                         {isSubmitting ? (
//                             <>
//                                 <CircularProgress size={20} color="inherit" style={{ marginRight: '8px' }} />
//                                 Sending...
//                             </>
//                         ) : (
//                             'Send Reset Link'
//                         )}
//                     </ResetButton>

//                     <BackButton 
//                         onClick={() => navigate('/login')}
//                         startIcon={<ArrowBack />}
//                         disabled={isSubmitting}
//                     >
//                         Back to Sign In
//                     </BackButton>
//                 </ForgotPasswordForm>
//             </ContentArea>
//         </ForgotPasswordContainer>
//     );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  TextField, 
  Button,
  Alert,
  InputAdornment,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import {
    Email,
    ArrowBack,
    CheckCircle,
    ErrorOutline,
    ShoppingCart,
    Security,
    Lock,
    Visibility,        // ✅ ADD THIS
    VisibilityOff,     // ✅ ADD THIS
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { config } from '../Config/Config';

// ✨ ANIMATIONS (keeping your existing styles)
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🎨 STYLED COMPONENTS (keeping all your existing styles)
const ForgotPasswordContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #ffffff 0%, #f1e3ff 100%);
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;
  overflow: hidden;
`;

const LogoCorner = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
`;

const CornerLogoIcon = styled(ShoppingCart)`
  && { font-size: 2rem; color: #4f46e5; }
`;

const CornerLogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  color: #4f46e5;
  font-family: 'Georgia', 'Times New Roman', serif;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ForgotPasswordForm = styled.form`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.8s ease-out;
  width: 100%;
  max-width: 450px;
`;

const ForgotPasswordHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ForgotPasswordTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Georgia, 'Times New Roman', serif;
`;

const ForgotPasswordSubtitle = styled.p`
  color: #666666;
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin-bottom: 24px;

    .MuiOutlinedInput-root {
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }

      &.Mui-focused {
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        transform: translateY(-2px);
      }
    }
  }
`;

const ResetButton = styled(Button)`
  && {
    width: 100%;
    padding: 16px;
    background: linear-gradient(45deg, #4f46e5, #7c3aed);
    color: white;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    text-transform: none;
    margin-bottom: 20px;
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(79, 70, 229, 0.4);
    }

    &:disabled {
      background: #9ca3af;
      transform: none;
    }
  }
`;

const BackButton = styled(Button)`
  && {
    width: 100%;
    padding: 14px;
    color: #64748b;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    text-transform: none;
  }
`;

const StyledStepper = styled(Stepper)`
  && {
    margin-bottom: 30px;
    
    .MuiStepLabel-root .Mui-completed {
      color: #22c55e;
    }
    
    .MuiStepLabel-root .Mui-active {
      color: #4f46e5;
    }
  }
`;

const ForgotPassword = () => {
    const { host } = config;
    const navigate = useNavigate();
    
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false); // ✅ ADD THIS STATE

    const steps = ['Enter Email', 'Verify OTP', 'New Password'];

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccess('');
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    // ✅ ADD PASSWORD TOGGLE FUNCTION
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // STEP 1: Send Reset OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.email.trim()) {
            setError('Email address is required');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${host}/customer/forgot-password`, {
                email: formData.email.trim().toLowerCase()
            });

            if (response.data.success) {
                setSuccess('Reset OTP sent to your email address!');
                setActiveStep(1);
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Sent! 📧',
                    text: 'Please check your email for the 6-digit reset code.',
                    confirmButtonColor: '#4f46e5',
                    timer: 3000
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send reset OTP. Please try again.';
            setError(errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
                confirmButtonColor: '#4f46e5'
            });
        }

        setIsSubmitting(false);
    };

    // STEP 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.otp.trim()) {
            setError('Please enter the 6-digit OTP');
            return;
        }

        if (!/^\d{6}$/.test(formData.otp)) {
            setError('OTP must be 6 digits');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${host}/customer/verify-reset-otp`, {
                email: formData.email,
                otp: formData.otp
            });

            if (response.data.success) {
                setActiveStep(2);
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Verified! ✅',
                    text: 'Now create your new password.',
                    confirmButtonColor: '#4f46e5',
                    timer: 2000
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
            setError(errorMessage);
        }

        setIsSubmitting(false);
    };

    // STEP 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.newPassword) {
            setError('Please enter a new password');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${host}/customer/reset-password`, {
                email: formData.email,
                otp: formData.otp,
                newPassword: formData.newPassword
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: '🎉 Password Reset Successful!',
                    text: 'Your password has been updated. You can now sign in with your new password.',
                    confirmButtonColor: '#4f46e5',
                    confirmButtonText: 'Go to Sign In'
                }).then(() => {
                    navigate('/login');
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again.';
            setError(errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Reset Failed',
                text: errorMessage,
                confirmButtonColor: '#4f46e5'
            });
        }

        setIsSubmitting(false);
    };

    const handleResendOTP = async () => {
        try {
            const response = await axios.post(`${host}/customer/resend-reset-otp`, {
                email: formData.email
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Resent!',
                    text: 'A new reset code has been sent to your email.',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to resend OTP',
                text: 'Please try again.',
                confirmButtonColor: '#4f46e5'
            });
        }
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <StyledTextField
                            fullWidth
                            type="email"
                            name="email"
                            label="Email Address"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && (!formData.email.trim() || (formData.email.trim() && !validateEmail(formData.email)))}
                            helperText={touched.email && (!formData.email.trim() ? 'Email is required' : (formData.email.trim() && !validateEmail(formData.email) ? 'Invalid email format' : ''))}
                            disabled={isSubmitting}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <ResetButton 
                            type="submit" 
                            onClick={handleSendOTP}
                            disabled={isSubmitting || !formData.email.trim() || !validateEmail(formData.email)}
                        >
                            {isSubmitting ? (
                                <>
                                    <CircularProgress size={20} color="inherit" style={{ marginRight: '8px' }} />
                                    Sending OTP...
                                </>
                            ) : (
                                'Send Reset OTP'
                            )}
                        </ResetButton>
                    </>
                );

            case 1:
                return (
                    <>
                        <Alert severity="info" style={{ marginBottom: '20px' }}>
                            We've sent a 6-digit reset code to <strong>{formData.email}</strong>
                        </Alert>
                        
                        <StyledTextField
                            fullWidth
                            type="text"
                            name="otp"
                            label="Enter Reset OTP"
                            placeholder="123456"
                            value={formData.otp}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            inputProps={{ 
                                maxLength: 6,
                                style: { 
                                    textAlign: 'center', 
                                    fontSize: '20px', 
                                    letterSpacing: '4px',
                                    fontFamily: 'monospace'
                                } 
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Security color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <ResetButton 
                            type="submit" 
                            onClick={handleVerifyOTP}
                            disabled={isSubmitting || !formData.otp.trim()}
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                        </ResetButton>
                        
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <button 
                                type="button"
                                onClick={handleResendOTP}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#4f46e5',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontSize: '14px'
                                }}
                            >
                                Didn't receive the code? Resend OTP
                            </button>
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                        <Alert severity="success" style={{ marginBottom: '20px' }}>
                            ✅ OTP verified! Now create your new password.
                        </Alert>
                        
                        {/* ✅ UPDATED PASSWORD FIELD WITH SHOW/HIDE */}
                        <StyledTextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'} // ✅ TOGGLE PASSWORD TYPE
                            name="newPassword"
                            label="New Password"
                            placeholder="Enter your new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                // ✅ ADD SHOW/HIDE PASSWORD BUTTON
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
                        
                        <ResetButton 
                            type="submit" 
                            onClick={handleResetPassword}
                            disabled={isSubmitting || !formData.newPassword || formData.newPassword.length < 6}
                        >
                            {isSubmitting ? 'Resetting...' : 'Reset Password'}
                        </ResetButton>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <ForgotPasswordContainer>
            <LogoCorner>
                <CornerLogoIcon />
                <CornerLogoText>KartSpace</CornerLogoText>
            </LogoCorner>

            <ContentArea>
                <ForgotPasswordForm>
                    <ForgotPasswordHeader>
                        <ForgotPasswordTitle>Reset Password</ForgotPasswordTitle>
                        <ForgotPasswordSubtitle>
                            {activeStep === 0 && "Enter your email to receive a reset code"}
                            {activeStep === 1 && "Enter the code sent to your email"}
                            {activeStep === 2 && "Create your new secure password"}
                        </ForgotPasswordSubtitle>
                    </ForgotPasswordHeader>

                    <StyledStepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </StyledStepper>

                    {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
                    {success && <Alert severity="success" style={{ marginBottom: '20px' }}>{success}</Alert>}

                    {renderStepContent()}

                    <BackButton 
                        onClick={() => {
                            if (activeStep > 0) {
                                setActiveStep(prev => prev - 1);
                            } else {
                                navigate('/login');
                            }
                        }}
                        startIcon={<ArrowBack />}
                        disabled={isSubmitting}
                    >
                        {activeStep === 0 ? 'Back to Sign In' : 'Previous Step'}
                    </BackButton>
                </ForgotPasswordForm>
            </ContentArea>
        </ForgotPasswordContainer>
    );
};

export default ForgotPassword;
