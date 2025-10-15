import React, { useState, useContext } from 'react';
import { TextField, Button, Paper, Typography, Box, InputAdornment, IconButton, Fade, Slide } from '@mui/material';
import { VendorContext } from '../Context/Context';
import { Email, Lock, Visibility, VisibilityOff, ShoppingCart, ShoppingBag, LocalMall, Store, CardGiftcard } from '@mui/icons-material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { LoginVendor, loading } = useContext(VendorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginVendor(credentials);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Shopping icons data for animation
  const shoppingIcons = [
    { Icon: ShoppingCart, delay: '0s', duration: '8s', x: '10%', y: '20%' },
    { Icon: ShoppingBag, delay: '2s', duration: '10s', x: '85%', y: '15%' },
    { Icon: LocalMall, delay: '1s', duration: '12s', x: '20%', y: '70%' },
    { Icon: Store, delay: '3s', duration: '9s', x: '90%', y: '65%' },
    { Icon: CardGiftcard, delay: '4s', duration: '11s', x: '15%', y: '45%' },
    { Icon: ShoppingCart, delay: '5s', duration: '7s', x: '75%', y: '40%' },
    { Icon: ShoppingBag, delay: '1.5s', duration: '13s', x: '5%', y: '80%' },
    { Icon: LocalMall, delay: '3.5s', duration: '9.5s', x: '95%', y: '25%' },
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
        padding: 2,
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
              '&:hover': {
                color: 'rgba(139, 92, 246, 0.25)',
              }
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

      <Fade in={true} timeout={1000}>
        <Paper
          elevation={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            padding: { xs: 4, sm: 6 },
            width: '100%',
            maxWidth: 420,
            borderRadius: 4,
            backgroundColor: 'rgba(254, 252, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '2px solid',
            borderColor: isHovered ? '#8b5cf6' : '#a78bfa',
            boxShadow: isHovered 
              ? '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)' 
              : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
            position: 'relative',
            transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 10,
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
                mb: 4,
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
                  mb: 1,
                  letterSpacing: '-0.02em',
                  textAlign: 'center',
                  animation: 'textGlow 3s ease-in-out infinite',
                  '@keyframes textGlow': {
                    '0%, 100%': { filter: 'brightness(1)' },
                    '50%': { filter: 'brightness(1.1)' }
                  }
                }}
              >
                Vendor Portal
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#7c2d92', 
                  textAlign: 'center',
                  fontWeight: 500,
                  animation: 'fadeInUp 1s ease-out 0.5s both',
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                Welcome back! Please sign in
              </Typography>
            </Box>
          </Slide>

          <Slide direction="up" in={true} timeout={1000}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ 
                        color: '#8b5cf6',
                        fontSize: '1.2rem',
                        animation: 'bounce 2s ease-in-out infinite',
                        '@keyframes bounce': {
                          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                          '40%': { transform: 'translateY(-3px)' },
                          '60%': { transform: 'translateY(-2px)' }
                        }
                      }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
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
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(196, 181, 253, 0.2)',
                      '& fieldset': {
                        borderColor: '#a78bfa',
                      },
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(250, 249, 255, 0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(139, 92, 246, 0.25)',
                      '& fieldset': {
                        borderColor: '#8b5cf6',
                        borderWidth: '3px',
                      },
                    },
                    '& input': {
                      color: '#374151',
                      fontSize: '1rem',
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

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ 
                        color: '#8b5cf6',
                        fontSize: '1.2rem',
                        animation: 'wiggle 3s ease-in-out infinite',
                        '@keyframes wiggle': {
                          '0%, 7%': { transform: 'rotateZ(0)' },
                          '15%': { transform: 'rotateZ(-15deg)' },
                          '20%': { transform: 'rotateZ(10deg)' },
                          '25%': { transform: 'rotateZ(-10deg)' },
                          '30%': { transform: 'rotateZ(6deg)' },
                          '35%': { transform: 'rotateZ(-4deg)' },
                          '40%, 100%': { transform: 'rotateZ(0)' }
                        }
                      }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handleTogglePassword} 
                        edge="end"
                        sx={{ 
                          color: '#8b5cf6',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#5b21b6',
                            transform: 'scale(1.1) rotate(15deg)',
                          }
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
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
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(196, 181, 253, 0.2)',
                      '& fieldset': {
                        borderColor: '#a78bfa',
                      },
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(250, 249, 255, 0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(139, 92, 246, 0.25)',
                      '& fieldset': {
                        borderColor: '#8b5cf6',
                        borderWidth: '3px',
                      },
                    },
                    '& input': {
                      color: '#374151',
                      fontSize: '1rem',
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.8,
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
                    transform: 'translateY(-3px) scale(1.02)',
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
                  fontSize: '1.1rem',
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
                        width: 20,
                        height: 20,
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
                    Signing In...
                  </Box>
                ) : (
                  'Sign In to Dashboard'
                )}
              </Button>
            </form>
          </Slide>

         <Fade in={true} timeout={1500} style={{ transitionDelay: '800ms' }}>
  <Box sx={{ 
    textAlign: 'center', 
    pt: 3, 
    borderTop: '2px solid #e9d5ff',
    position: 'relative',
    animation: 'slideInFromBottom 1s ease-out 0.8s both',
    '@keyframes slideInFromBottom': {
      '0%': { 
        opacity: 0, 
        transform: 'translateY(30px)' 
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
      New to our platform?{' '}
      <a 
        href="/register" 
        style={{ 
          color: '#8b5cf6', 
          textDecoration: 'none',
          fontWeight: 600,
          position: 'relative',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#5b21b6';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#8b5cf6';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Create Your Account →
      </a>
    </Typography>
  </Box>
</Fade>

        </Paper>
      </Fade>
    </Box>
  );
};

export default Login;
