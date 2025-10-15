import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  TextField, 
  Button,
  Alert,
  InputAdornment,
  IconButton,
  LinearProgress,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
    Lock,
    Visibility,
    VisibilityOff,
    CheckCircle,
    ErrorOutline,
    ShoppingCart,
} from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { config } from '../Config/Config';

// Same styled components as ForgotPassword
const ResetPasswordContainer = styled.div`
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

const ResetPasswordForm = styled.form`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${keyframes`
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  `} 0.8s ease-out;
  width: 100%;
  max-width: 450px;
`;

const ResetPasswordHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ResetPasswordTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Georgia, 'Times New Roman', serif;
`;

const ResetPasswordSubtitle = styled.p`
  color: #666666;
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin-bottom: 20px;

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
    margin-top: 10px;
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

const ResetPassword = () => {
    const { host } = config;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});

    const token = searchParams.get('token');
    const userId = searchParams.get('id');

    useEffect(() => {
        if (!token || !userId) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Reset Link',
                text: 'The password reset link is invalid or expired.',
                confirmButtonColor: '#4f46e5'
            }).then(() => {
                navigate('/forgot-password');
            });
        }
    }, [token, userId, navigate]);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength += 20;
        if (password.length >= 8) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        return Math.min(strength, 100);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name);
    };

    const validateField = (fieldName) => {
        const newErrors = { ...errors };

        if (fieldName === 'password') {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            } else {
                delete newErrors.password;
            }
        }

        if (fieldName === 'confirmPassword') {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            } else {
                delete newErrors.confirmPassword;
            }
        }

        setErrors(newErrors);
        return !newErrors[fieldName];
    };

    const validateForm = () => {
        const passwordValid = validateField('password');
        const confirmValid = validateField('confirmPassword');
        return passwordValid && confirmValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${host}/auth/reset-password`, {
                token,
                userId,
                newPassword: formData.password
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
            
            Swal.fire({
                icon: 'error',
                title: 'Reset Failed',
                text: errorMessage,
                confirmButtonColor: '#4f46e5'
            });
        }

        setIsSubmitting(false);
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

    return (
        <ResetPasswordContainer>
            <LogoCorner>
                <CornerLogoIcon />
                <CornerLogoText>KartSpace</CornerLogoText>
            </LogoCorner>

            <ContentArea>
                <ResetPasswordForm onSubmit={handleSubmit}>
                    <ResetPasswordHeader>
                        <ResetPasswordTitle>Reset Password</ResetPasswordTitle>
                        <ResetPasswordSubtitle>
                            Create a new secure password for your KartSpace account.
                        </ResetPasswordSubtitle>
                    </ResetPasswordHeader>

                    <StyledTextField
                        fullWidth
                        name="password"
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        disabled={isSubmitting}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color={touched.password && !errors.password && formData.password ? 'success' : 'action'} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {formData.password && (
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '14px', color: '#666' }}>Password Strength:</span>
                                <Chip
                                    label={getPasswordStrengthText()}
                                    size="small"
                                    color={getPasswordStrengthColor()}
                                    variant="outlined"
                                />
                            </div>
                            <LinearProgress
                                variant="determinate"
                                value={passwordStrength}
                                color={getPasswordStrengthColor()}
                                sx={{ height: 8, borderRadius: 4 }}
                            />
                        </div>
                    )}

                    <StyledTextField
                        fullWidth
                        name="confirmPassword"
                        label="Confirm New Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && !!errors.confirmPassword}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        disabled={isSubmitting}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color={touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'success' : 'action'} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? (
                                        <CheckCircle color="success" fontSize="small" />
                                    ) : touched.confirmPassword && errors.confirmPassword ? (
                                        <ErrorOutline color="error" fontSize="small" />
                                    ) : (
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <ResetButton 
                        type="submit" 
                        disabled={isSubmitting || !formData.password || !formData.confirmPassword || !!errors.password || !!errors.confirmPassword}
                    >
                        {isSubmitting ? (
                            <>
                                <CircularProgress size={20} color="inherit" style={{ marginRight: '8px' }} />
                                Resetting...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </ResetButton>
                </ResetPasswordForm>
            </ContentArea>
        </ResetPasswordContainer>
    );
};

export default ResetPassword;
