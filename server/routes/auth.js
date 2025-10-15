const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const { sendPasswordResetEmail, sendPasswordResetConfirmation, testEmailConfiguration } = require('../services/emailservice');

const router = express.Router();

// Password Reset Token Model (inline to avoid import issues)
const mongoose = require('mongoose');

const passwordResetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Expires in 1 hour (3600 seconds)
  }
});

// Prevent re-compilation errors
const PasswordResetToken = mongoose.models.PasswordResetToken || 
  mongoose.model('PasswordResetToken', passwordResetTokenSchema);

// Rate limiting middleware
const rateLimit = require('express-rate-limit');

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window per IP
  message: {
    success: false,
    message: 'Too many password reset attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// MUST TEST THIS ROUTE FIRST - Email Configuration Test
router.get('/test-email', async (req, res) => {
  try {
    console.log('🧪 Running email configuration test...');
    
    const result = await testEmailConfiguration();
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully! Check your Gmail inbox (kartspace075@gmail.com).',
      messageId: result.messageId,
      timestamp: new Date().toISOString(),
      emailServer: process.env.EMAIL_USER || 'kartspace075@gmail.com',
      smtpConfig: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false
      }
    });
    
  } catch (error) {
    console.error('❌ Email test route failed:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Email test failed. Check server logs for details.',
      error: error.message,
      debug: {
        emailUser: process.env.EMAIL_USER,
        emailPasswordExists: !!process.env.EMAIL_PASSWORD,
        clientUrl: process.env.CLIENT_URL,
        errorCode: error.code,
        errorCommand: error.command,
        nodeEnv: process.env.NODE_ENV
      }
    });
  }
});

// Forgot Password Route - Enhanced with detailed logging
router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    console.log('🔐 Processing forgot password request...');
    console.log('📧 Email received:', email);
    console.log('🕒 Timestamp:', new Date().toISOString());

    // Input validation
    if (!email) {
      console.log('❌ Validation failed: Email is required');
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Find user in database
    console.log('🔍 Searching for user in database...');
    const user = await Customer.findOne({ 
      email: email.toLowerCase().trim(),
      isVerified: true
    });

    if (!user) {
      console.log('❌ User not found or not verified for email:', email);
      return res.status(404).json({
        success: false,
        message: 'No verified account found with this email address. Please check your email or complete registration first.'
      });
    }

    console.log('✅ User found successfully:');
    console.log('  - User ID:', user._id.toString());
    console.log('  - User Name:', user.name);
    console.log('  - User Email:', user.email);
    console.log('  - Verified:', user.isVerified);

    // Clean up any existing reset tokens for this user
    console.log('🧹 Cleaning up old reset tokens...');
    const deleteResult = await PasswordResetToken.deleteMany({ userId: user._id });
    console.log('🗑️ Deleted', deleteResult.deletedCount, 'old reset tokens');

    // Generate cryptographically secure reset token
    console.log('🔑 Generating secure reset token...');
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('🔑 Generated reset token (first 8 chars):', resetToken.substring(0, 8) + '...');
    
    // Hash token for database storage (security best practice)
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log('🔒 Token hashed for database storage');

    // Save hashed token to database with expiration
    console.log('💾 Saving reset token to database...');
    const tokenDoc = new PasswordResetToken({
      userId: user._id,
      token: hashedToken
    });
    
    const savedToken = await tokenDoc.save();
    console.log('✅ Reset token saved successfully:');
    console.log('  - Token ID:', savedToken._id.toString());
    console.log('  - User ID:', savedToken.userId.toString());
    console.log('  - Expires at:', new Date(savedToken.createdAt.getTime() + 3600000).toISOString());

    // Send password reset email
    console.log('📧 Preparing to send password reset email...');
    console.log('📤 Email details:');
    console.log('  - To:', user.email);
    console.log('  - Name:', user.name);
    console.log('  - User ID:', user._id.toString());
    console.log('  - Reset token (for email):', resetToken.substring(0, 8) + '...');

    try {
      console.log('🚀 Calling sendPasswordResetEmail function...');
      
      const emailResult = await sendPasswordResetEmail(
        user.email, 
        resetToken, // Send plain token in email (not hashed)
        user._id.toString(), 
        user.name
      );
      
      console.log('🎉 PASSWORD RESET EMAIL SENT SUCCESSFULLY!');
      console.log('📨 Email result:', emailResult);
      console.log('📨 Message ID:', emailResult.messageId);
      
      // Success response
      res.json({
        success: true,
        message: 'Password reset link has been sent to your email address. Please check your inbox and spam folder. The link will expire in 1 hour.',
        debug: process.env.NODE_ENV === 'development' ? {
          messageId: emailResult.messageId,
          tokenId: savedToken._id.toString(),
          userId: user._id.toString(),
          userEmail: user.email,
          expiresAt: new Date(savedToken.createdAt.getTime() + 3600000).toISOString()
        } : {
          messageId: emailResult.messageId
        }
      });

    } catch (emailError) {
      console.error('💥 EMAIL SENDING FAILED:');
      console.error('📧 Email Error Type:', emailError.constructor.name);
      console.error('📧 Email Error Message:', emailError.message);
      console.error('📧 Email Error Code:', emailError.code);
      console.error('📧 Email Error Command:', emailError.command);
      console.error('📧 Email Error Response Code:', emailError.responseCode);
      console.error('📧 Full Email Error Stack:', emailError.stack);
      
      // Clean up the saved token since email failed
      try {
        await PasswordResetToken.deleteOne({ _id: savedToken._id });
        console.log('🧹 Cleaned up failed reset token');
      } catch (cleanupError) {
        console.error('❌ Failed to cleanup token:', cleanupError.message);
      }
      
      // Return detailed error for debugging
      res.status(500).json({
        success: false,
        message: 'Failed to send password reset email. Please try again or contact support.',
        error: emailError.message,
        debug: process.env.NODE_ENV === 'development' ? {
          errorType: emailError.constructor.name,
          errorCode: emailError.code,
          errorCommand: emailError.command,
          responseCode: emailError.responseCode,
          smtpSettings: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            user: process.env.EMAIL_USER
          },
          environment: {
            emailUser: process.env.EMAIL_USER,
            emailPasswordExists: !!process.env.EMAIL_PASSWORD,
            clientUrl: process.env.CLIENT_URL,
            nodeEnv: process.env.NODE_ENV
          }
        } : {
          errorCode: emailError.code
        }
      });
    }

  } catch (error) {
    console.error('💥 FORGOT PASSWORD ROUTE ERROR:');
    console.error('🚨 Route Error Type:', error.constructor.name);
    console.error('🚨 Route Error Message:', error.message);
    console.error('🚨 Route Error Stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error during password reset request. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
      debug: process.env.NODE_ENV === 'development' ? {
        errorType: error.constructor.name,
        timestamp: new Date().toISOString()
      } : undefined
    });
  }
});

// Reset Password Route - Complete implementation
router.post('/reset-password', async (req, res) => {
  try {
    const { token, userId, newPassword } = req.body;

    console.log('🔄 Processing password reset...');
    console.log('👤 User ID:', userId);
    console.log('🔑 Token (first 8 chars):', token ? token.substring(0, 8) + '...' : 'undefined');
    console.log('🔒 New password length:', newPassword ? newPassword.length : 0);

    // Input validation
    if (!token || !userId || !newPassword) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Reset token, user ID, and new password are all required'
      });
    }

    if (newPassword.length < 6) {
      console.log('❌ Validation failed: Password too short');
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Hash the provided token to match database storage
    console.log('🔒 Hashing provided token for database lookup...');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find valid, non-expired reset token
    console.log('🔍 Searching for valid reset token in database...');
    const resetTokenDoc = await PasswordResetToken.findOne({
      userId,
      token: hashedToken
    });

    if (!resetTokenDoc) {
      console.log('❌ Invalid or expired reset token for user:', userId);
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token. Please request a new reset link.'
      });
    }

    console.log('✅ Valid reset token found:');
    console.log('  - Token ID:', resetTokenDoc._id.toString());
    console.log('  - Created at:', resetTokenDoc.createdAt);
    console.log('  - Expires at:', new Date(resetTokenDoc.createdAt.getTime() + 3600000));

    // Find user account
    console.log('🔍 Finding user account...');
    const user = await Customer.findById(userId);
    if (!user) {
      console.log('❌ User account not found with ID:', userId);
      return res.status(404).json({
        success: false,
        message: 'User account not found'
      });
    }

    console.log('✅ User account found:');
    console.log('  - User Name:', user.name);
    console.log('  - User Email:', user.email);

    // Hash new password with high salt rounds for security
    console.log('🔒 Hashing new password...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log('✅ New password hashed successfully');

    // Update user password in database
    console.log('💾 Updating user password in database...');
    user.password = hashedPassword;
    user.passwordResetAt = new Date();
    await user.save();
    console.log('✅ User password updated successfully');

    // Delete the used reset token to prevent reuse
    console.log('🗑️ Deleting used reset token...');
    await PasswordResetToken.deleteOne({ _id: resetTokenDoc._id });
    console.log('✅ Used reset token deleted');

    // Send confirmation email (optional but good practice)
    try {
      console.log('📧 Sending password reset confirmation email...');
      await sendPasswordResetConfirmation(user.email, user.name);
      console.log('✅ Confirmation email sent');
    } catch (confirmationError) {
      console.warn('⚠️ Confirmation email failed (non-critical):', confirmationError.message);
    }

    console.log('🎉 PASSWORD RESET COMPLETED SUCCESSFULLY!');
    console.log('👤 User:', user.email);
    console.log('🕒 Completed at:', new Date().toISOString());

    // Success response
    res.json({
      success: true,
      message: 'Password has been reset successfully! You can now login with your new password.',
      debug: process.env.NODE_ENV === 'development' ? {
        userId: user._id.toString(),
        userEmail: user.email,
        resetCompletedAt: new Date().toISOString()
      } : undefined
    });

  } catch (error) {
    console.error('💥 RESET PASSWORD ROUTE ERROR:');
    console.error('🚨 Error Type:', error.constructor.name);
    console.error('🚨 Error Message:', error.message);
    console.error('🚨 Error Stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error during password reset. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
});

// Get Reset Token Info - For frontend validation (optional)
router.get('/reset-token/:token/:userId', async (req, res) => {
  try {
    const { token, userId } = req.params;

    console.log('🔍 Validating reset token for user:', userId);

    // Hash token to compare with database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find token in database
    const tokenDoc = await PasswordResetToken.findOne({
      userId,
      token: hashedToken
    });

    if (!tokenDoc) {
      console.log('❌ Invalid reset token');
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Find user (for display purposes)
    const user = await Customer.findById(userId).select('name email');
    
    console.log('✅ Valid reset token found');

    res.json({
      success: true,
      message: 'Valid reset token',
      user: {
        name: user.name,
        email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') // Mask email for security
      },
      expiresAt: tokenDoc.createdAt.getTime() + (3600 * 1000),
      isValid: true
    });

  } catch (error) {
    console.error('❌ Token validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating reset token'
    });
  }
});

// Cleanup expired tokens - Utility route (should be called by cron job)
router.post('/cleanup-expired-tokens', async (req, res) => {
  try {
    console.log('🧹 Cleaning up expired password reset tokens...');
    
    const result = await PasswordResetToken.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 60 * 60 * 1000) } // Older than 1 hour
    });

    console.log('✅ Cleanup completed:', result.deletedCount, 'expired tokens removed');

    res.json({
      success: true,
      message: `Cleaned up ${result.deletedCount} expired password reset tokens`,
      deletedCount: result.deletedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Token cleanup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during token cleanup',
      error: error.message
    });
  }
});

// Login Route (keeping your existing functionality)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    const customer = await Customer.findOne({ email: email.toLowerCase() });

    if (!customer) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    if (!customer.isVerified) {
      return res.status(400).json({ 
        success: false, 
        message: "Please verify your email before logging in" 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign({ 
      id: customer._id, 
      email: customer.email 
    }, process.env.JWT_SECRET, { 
      expiresIn: '7d' 
    });

    res.status(200).json({
      message: "Login successful",
      token,
      success: true,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        profileImage: customer.profileImage || '',
        provider: 'email'
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// Social Login Route (keeping your existing functionality)
router.post('/social-login', async (req, res) => {
  try {
    const { provider, uid, email, displayName, photoURL } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required for social login' 
      });
    }
    
    if (!provider || !uid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Provider and UID are required' 
      });
    }
    
    let customer = await Customer.findOne({ email });
    
    if (!customer) {
      customer = new Customer({
        name: displayName || email.split('@')[0],
        email,
        password: await bcrypt.hash(uid + 'social123', 10),
        socialProvider: provider,
        socialId: uid,
        profileImage: photoURL || '',
        isVerified: true,
        cart: []
      });
      await customer.save();
    } else {
      if (!customer.socialProvider) {
        customer.socialProvider = provider;
        customer.socialId = uid;
        customer.profileImage = photoURL || customer.profileImage;
        await customer.save();
      }
    }
    
    const token = jwt.sign({ 
      id: customer._id, 
      email: customer.email 
    }, process.env.JWT_SECRET, { 
      expiresIn: '7d' 
    });
    
    res.status(200).json({
      success: true,
      message: 'Social login successful!',
      token,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        profileImage: customer.profileImage,
        provider
      }
    });
    
  } catch (error) {
    console.error('Social login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Social login failed - Internal server error', 
      error: error.message 
    });
  }
});

// Health check route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Auth service is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
  });
});

module.exports = router;
