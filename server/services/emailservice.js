// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Debug: Log environment variables (remove in production)
// console.log('EMAIL_USER:', process.env.EMAIL_USER);
// console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
// console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
// console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0);

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Test the transporter
// transporter.verify((error, success) => {
//   if (error) {
//     console.log('❌ Email transporter error:', error);
//   } else {
//     console.log('✅ Email server is ready to send messages');
//   }
// });

// // 🎨 PROFESSIONAL RESPONSIVE ANIMATED TEMPLATE
// async function sendVerificationEmail(email, otp, name = 'User') {
//   const mailOptions = {
//     from: `"${process.env.EMAIL_FROM}" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: '🔐 Email Verification - Secure Access Code',
//     html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <title>Email Verification</title>
//         <!--[if mso]>
//         <noscript>
//           <xml>
//             <o:OfficeDocumentSettings>
//               <o:PixelsPerInch>96</o:PixelsPerInch>
//             </o:OfficeDocumentSettings>
//           </xml>
//         </noscript>
//         <![endif]-->
//         <style>
//           /* Reset & Base Styles */
//           * { box-sizing: border-box; }
//           body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
//           table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
//           img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
          
//           /* CSS Animations */
//           @keyframes slideInFromTop {
//             0% { opacity: 0; transform: translateY(-30px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
          
//           @keyframes fadeInUp {
//             0% { opacity: 0; transform: translateY(20px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
          
//           @keyframes pulse {
//             0%, 100% { transform: scale(1); }
//             50% { transform: scale(1.02); }
//           }
          
//           @keyframes glow {
//             0%, 100% { box-shadow: 0 0 15px rgba(79, 70, 229, 0.2); }
//             50% { box-shadow: 0 0 25px rgba(79, 70, 229, 0.4); }
//           }
          
//           @keyframes shimmer {
//             0% { background-position: -200% center; }
//             100% { background-position: 200% center; }
//           }
          
//           .animated-header { animation: slideInFromTop 0.8s ease-out; }
//           .animated-content { animation: fadeInUp 1s ease-out 0.3s both; }
//           .animated-otp { animation: fadeInUp 1.2s ease-out 0.6s both, pulse 2s infinite 2s; }
//           .glow-effect { animation: glow 3s infinite 3s; }
//           .shimmer-bg {
//             background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 25%, #ec4899 50%, #7c3aed 75%, #4f46e5 100%);
//             background-size: 200% 100%;
//             animation: shimmer 3s infinite;
//           }
          
//           /* Desktop Styles (Default) */
//           .container { 
//             max-width: 600px; 
//             margin: 0 auto; 
//             background: white; 
//             border-radius: 24px; 
//             overflow: hidden; 
//             box-shadow: 0 25px 50px rgba(0,0,0,0.15);
//           }
          
//           .header-container { 
//             padding: 50px 40px; 
//             text-align: center; 
//             position: relative; 
//           }
          
//           .header-title { 
//             color: white; 
//             margin: 0; 
//             font-size: 32px; 
//             font-weight: 700; 
//             text-shadow: 2px 2px 8px rgba(0,0,0,0.3); 
//             letter-spacing: 1px; 
//           }
          
//           .main-content { 
//             padding: 50px 40px; 
//             text-align: center; 
//             background: white; 
//           }
          
//           .welcome-title { 
//             color: #1e293b; 
//             margin: 0 0 15px; 
//             font-size: 28px; 
//             font-weight: 600; 
//           }
          
//           .otp-container { 
//             margin: 50px 0; 
//           }
          
//           .otp-code { 
//             font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace; 
//             font-size: 48px; 
//             font-weight: 800; 
//             color: #1e293b; 
//             letter-spacing: 12px; 
//             text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
//             display: inline-block;
//             padding: 15px 25px;
//             background: rgba(79, 70, 229, 0.08);
//             border-radius: 12px;
//             border: 2px dashed #4f46e5;
//             word-break: break-all;
//             line-height: 1.2;
//           }
          
//           .info-cards { 
//             display: block; 
//             margin: 40px 0; 
//             max-width: 500px; 
//             margin: 40px auto; 
//           }
          
//           .info-card { 
//             background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
//             padding: 20px; 
//             border-radius: 16px; 
//             border-left: 5px solid #f59e0b; 
//             text-align: left; 
//             box-shadow: 0 4px 15px rgba(245, 158, 11, 0.15);
//             margin-bottom: 20px;
//             transition: all 0.3s ease;
//           }
          
//           .footer-container { 
//             background: linear-gradient(135deg, #1e293b 0%, #334155 100%); 
//             color: white; 
//             padding: 40px; 
//             text-align: center; 
//           }
          
//           /* Tablet Styles */
//           @media only screen and (max-width: 768px) {
//             .container { 
//               margin: 10px !important; 
//               border-radius: 16px !important; 
//               max-width: calc(100% - 20px) !important;
//             }
            
//             .header-container { 
//               padding: 40px 30px !important; 
//             }
            
//             .header-title { 
//               font-size: 28px !important; 
//               letter-spacing: 0.5px !important;
//             }
            
//             .main-content { 
//               padding: 40px 30px !important; 
//             }
            
//             .welcome-title { 
//               font-size: 24px !important; 
//             }
            
//             .otp-container { 
//               margin: 40px 0 !important; 
//             }
            
//             .otp-code { 
//               font-size: 40px !important; 
//               letter-spacing: 8px !important; 
//               padding: 12px 20px !important;
//             }
            
//             .info-cards { 
//               margin: 30px 0 !important; 
//             }
            
//             .info-card { 
//               padding: 18px !important; 
//               margin-bottom: 15px !important;
//             }
            
//             .footer-container { 
//               padding: 30px !important; 
//             }
//           }
          
//           /* Mobile Styles */
//           @media only screen and (max-width: 480px) {
//             body { 
//               padding: 10px !important; 
//               background-size: cover !important;
//             }
            
//             .container { 
//               margin: 0 !important; 
//               border-radius: 12px !important; 
//               max-width: 100% !important;
//               box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
//             }
            
//             .header-container { 
//               padding: 30px 20px !important; 
//             }
            
//             .header-title { 
//               font-size: 22px !important; 
//               line-height: 1.3 !important;
//             }
            
//             .header-subtitle { 
//               font-size: 14px !important; 
//             }
            
//             .main-content { 
//               padding: 30px 20px !important; 
//             }
            
//             .welcome-title { 
//               font-size: 20px !important; 
//               margin-bottom: 10px !important;
//             }
            
//             .welcome-text { 
//               font-size: 14px !important; 
//               line-height: 1.5 !important;
//             }
            
//             .otp-container { 
//               margin: 30px 0 !important; 
//             }
            
//             .otp-label { 
//               font-size: 12px !important; 
//               margin-bottom: 15px !important;
//             }
            
//             .otp-wrapper { 
//               padding: 20px 15px !important; 
//               border-radius: 16px !important;
//             }
            
//             .otp-code { 
//               font-size: 32px !important; 
//               letter-spacing: 6px !important; 
//               padding: 10px 15px !important;
//               line-height: 1.1 !important;
//               word-spacing: -5px !important;
//             }
            
//             .info-cards { 
//               margin: 25px 0 !important; 
//             }
            
//             .info-card { 
//               padding: 15px !important; 
//               margin-bottom: 12px !important;
//               border-radius: 12px !important;
//             }
            
//             .info-card-title { 
//               font-size: 14px !important; 
//             }
            
//             .info-card-text { 
//               font-size: 12px !important; 
//             }
            
//             .cta-container { 
//               margin: 25px 0 !important; 
//               padding: 20px !important;
//             }
            
//             .cta-title { 
//               font-size: 14px !important; 
//             }
            
//             .cta-text { 
//               font-size: 12px !important; 
//             }
            
//             .footer-container { 
//               padding: 25px 20px !important; 
//             }
            
//             .footer-title { 
//               font-size: 16px !important; 
//             }
            
//             .footer-text { 
//               font-size: 12px !important; 
//             }
            
//             .footer-bottom { 
//               font-size: 10px !important; 
//             }
//           }
          
//           /* Extra Small Mobile */
//           @media only screen and (max-width: 320px) {
//             .header-title { 
//               font-size: 18px !important; 
//             }
            
//             .welcome-title { 
//               font-size: 18px !important; 
//             }
            
//             .otp-code { 
//               font-size: 28px !important; 
//               letter-spacing: 4px !important; 
//               padding: 8px 12px !important;
//             }
            
//             .info-card { 
//               padding: 12px !important; 
//             }
//           }
          
//           /* Dark Mode Support */
//           @media (prefers-color-scheme: dark) {
//             .container { 
//               box-shadow: 0 25px 50px rgba(0,0,0,0.3) !important; 
//             }
//           }
          
//           /* High Contrast Mode */
//           @media (prefers-contrast: high) {
//             .otp-code { 
//               border: 3px solid #000 !important; 
//               background: #fff !important; 
//             }
//           }
          
//           /* Reduced Motion */
//           @media (prefers-reduced-motion: reduce) {
//             .animated-header,
//             .animated-content,
//             .animated-otp,
//             .glow-effect,
//             .shimmer-bg {
//               animation: none !important;
//             }
//           }
//         </style>
//       </head>
//       <body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; min-height: 100vh;">
        
//         <div class="container">
          
//           <!-- Animated Header -->
//           <div class="animated-header shimmer-bg header-container">
//             <div style="position: relative; z-index: 2;">
//               <div style="background: rgba(255,255,255,0.15); padding: 30px; border-radius: 20px; backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2);">
//                 <h1 class="header-title">🛡️ SECURE VERIFICATION</h1>
//                 <p class="header-subtitle" style="color: rgba(255,255,255,0.95); margin: 15px 0 0; font-size: 16px; font-weight: 400; letter-spacing: 0.5px;">Professional Email Authentication</p>
//               </div>
//             </div>
//           </div>
          
//           <!-- Main Content with Animation -->
//           <div class="animated-content main-content">
            
//             <!-- Professional Welcome -->
//             <div style="margin-bottom: 40px;">
//               <h2 class="welcome-title">Welcome, ${name}!</h2>
//               <p class="welcome-text" style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0; max-width: 400px; margin: 0 auto;">
//                 To ensure the security of your account, please verify your email address using the authentication code below.
//               </p>
//             </div>
            
//             <!-- Enhanced OTP Container -->
//             <div class="animated-otp otp-container">
//               <p class="otp-label" style="color: #475569; font-size: 14px; margin: 0 0 20px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Your Verification Code</p>
              
//               <div class="glow-effect otp-wrapper" style="background: linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%); border: 3px solid #e2e8f0; padding: 30px 25px; border-radius: 20px; display: inline-block; position: relative; overflow: hidden; box-shadow: 0 15px 35px rgba(30, 41, 59, 0.1); max-width: 90%; word-wrap: break-word;">
                
//                 <!-- Decorative Elements -->
//                 <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent 49%, rgba(79, 70, 229, 0.05) 50%, transparent 51%); transform: rotate(-45deg); animation: shimmer 4s infinite;"></div>
                
//                 <!-- OTP Code - Fully Responsive -->
//                 <div style="position: relative; z-index: 2;">
//                   <code class="otp-code">${otp}</code>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Professional Info Cards -->
//             <div class="info-cards">
              
//               <!-- Security Card -->
//               <div class="info-card" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left-color: #f59e0b;">
//                 <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
//                   <span style="font-size: 20px; margin-right: 12px; margin-top: 2px;">🔒</span>
//                   <div>
//                     <h4 class="info-card-title" style="margin: 0 0 5px; color: #92400e; font-weight: 600; font-size: 16px;">Security Notice</h4>
//                     <p class="info-card-text" style="margin: 0; color: #b45309; font-size: 14px; line-height: 1.4;">Keep this code confidential. Never share it with anyone for your security.</p>
//                   </div>
//                 </div>
//               </div>
              
//               <!-- Timer Card -->
//               <div class="info-card" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left-color: #3b82f6;">
//                 <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
//                   <span style="font-size: 20px; margin-right: 12px; margin-top: 2px;">⏰</span>
//                   <div>
//                     <h4 class="info-card-title" style="margin: 0 0 5px; color: #1d4ed8; font-weight: 600; font-size: 16px;">Time Limit</h4>
//                     <p class="info-card-text" style="margin: 0; color: #2563eb; font-size: 14px; line-height: 1.4;">This code expires in <strong>10 minutes</strong> for your protection.</p>
//                   </div>
//                 </div>
//               </div>
              
//               <!-- Action Card -->
//               <div class="info-card" style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left-color: #22c55e;">
//                 <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
//                   <span style="font-size: 20px; margin-right: 12px; margin-top: 2px;">🎯</span>
//                   <div>
//                     <h4 class="info-card-title" style="margin: 0 0 5px; color: #15803d; font-weight: 600; font-size: 16px;">Next Step</h4>
//                     <p class="info-card-text" style="margin: 0; color: #16a34a; font-size: 14px; line-height: 1.4;">Enter this code on the verification page to complete your registration.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Professional Call to Action -->
//             <div class="cta-container" style="margin: 40px 0;">
//               <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0;">
//                 <p class="cta-title" style="color: #475569; font-size: 16px; font-weight: 500; margin: 0 0 10px;">Ready to continue?</p>
//                 <p class="cta-text" style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Return to the verification page and enter your secure code to activate your account.</p>
//               </div>
//             </div>
            
//           </div>
          
//           <!-- Professional Footer -->
//           <div class="footer-container">
//             <div style="margin-bottom: 25px;">
//               <h3 class="footer-title" style="color: white; margin: 0 0 15px; font-size: 20px; font-weight: 600;">Need Assistance?</h3>
//               <p class="footer-text" style="margin: 0; font-size: 14px; opacity: 0.9; line-height: 1.6; max-width: 400px; margin: 0 auto;">
//                 If you didn't request this verification code, please ignore this email. Your account security is our top priority.
//               </p>
//             </div>
            
//             <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 25px; margin-top: 25px;">
//               <div style="margin-bottom: 15px;">
//                 <p style="margin: 0; font-size: 16px; font-weight: 500; color: rgba(255,255,255,0.95);">${process.env.EMAIL_FROM || 'Your Company'}</p>
//               </div>
//               <p class="footer-bottom" style="margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.5;">
//                 © 2025 All rights reserved. This is an automated security message.<br>
//                 Please do not reply to this email.
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <!-- Additional Professional Styling -->
//         <div style="text-align: center; margin-top: 20px;">
//           <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0;">
//             Powered by secure email verification technology
//           </p>
//         </div>
        
//       </body>
//       </html>
//     `,
//     text: `Hello ${name}! Your email verification code is: ${otp}. This code expires in 10 minutes. Please keep this code confidential. If you didn't request this code, please ignore this email.`
//   };
  
//   try {
//     const result = await transporter.sendMail(mailOptions);
//     console.log('✅ Professional responsive email sent successfully:', result.messageId);
//     return result;
//   } catch (error) {
//     console.error('❌ Failed to send email:', error);
//     throw error;
//   }
// }

// module.exports = { sendVerificationEmail };



const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('📧 Email Configuration Debug:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
console.log('CLIENT_URL:', process.env.CLIENT_URL);

// ✅ FIXED TRANSPORTER - Added TLS certificate bypass for self-signed certificate error
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,                    // Use STARTTLS port 587
  secure: false,                // false for STARTTLS; true for SSL
  auth: {
    user: process.env.EMAIL_USER || 'kartspace075@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'emjgkmqqddyfljlj'
  },
  requireTLS: true,             // Force TLS upgrade
  family: 4,                    // ✅ Force IPv4 - prevents IPv6 ECONNREFUSED errors
  connectionTimeout: 60000,     // 60 second timeout
  greetingTimeout: 30000,       // 30 second greeting timeout
  socketTimeout: 75000,         // 75 second socket timeout
  // ✅ FIX FOR SELF-SIGNED CERTIFICATE ERROR
  tls: {
    rejectUnauthorized: false   // Allow self-signed certificates (fixes antivirus/firewall issues)
  }
});

// Test transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email transporter error:', error.message);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// ✅ PASSWORD RESET EMAIL FUNCTION - PROFESSIONAL DESIGN
async function sendPasswordResetEmail(email, resetOTP, name = 'User') {
  const mailOptions = {
    from: `"KartSpace Support" <${process.env.EMAIL_USER || 'kartspace075@gmail.com'}>`,
    to: email,
    subject: '🔐 Password Reset OTP - KartSpace',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP - KartSpace</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px 0;
            margin: 0;
            line-height: 1.6;
            color: #333333;
          }
          
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .email-header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          
          .email-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.1;
          }
          
          .brand-logo {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 8px 0;
            position: relative;
            z-index: 1;
          }
          
          .brand-tagline {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 400;
            position: relative;
            z-index: 1;
          }
          
          .email-content {
            padding: 50px 40px;
            background: #ffffff;
          }
          
          .greeting {
            font-size: 28px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 16px 0;
            text-align: center;
          }
          
          .message {
            font-size: 16px;
            color: #6b7280;
            margin: 0 0 32px 0;
            text-align: center;
            line-height: 1.7;
          }
          
          .otp-container {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 2px dashed #3b82f6;
            border-radius: 12px;
            padding: 32px;
            text-align: center;
            margin: 32px 0;
            position: relative;
          }
          
          .otp-label {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin: 0 0 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .otp-code {
            font-family: 'Courier New', Consolas, monospace;
            font-size: 42px;
            font-weight: 800;
            color: #1e40af;
            letter-spacing: 8px;
            margin: 0;
            text-shadow: 0 2px 4px rgba(30, 64, 175, 0.1);
          }
          
          .otp-instruction {
            background: #dbeafe;
            border-left: 4px solid #3b82f6;
            padding: 16px 20px;
            margin: 24px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .otp-instruction p {
            font-size: 14px;
            color: #1e40af;
            margin: 0;
            font-weight: 500;
          }
          
          .security-notice {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 20px;
            margin: 32px 0;
          }
          
          .security-notice h4 {
            font-size: 16px;
            font-weight: 600;
            color: #92400e;
            margin: 0 0 8px 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .security-notice p {
            font-size: 14px;
            color: #92400e;
            margin: 0;
            line-height: 1.5;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 32px 0;
          }
          
          .support-info {
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          }
          
          .support-info a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
          }
          
          .email-footer {
            background: #1f2937;
            padding: 32px 40px;
            text-align: center;
          }
          
          .footer-brand {
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 8px 0;
          }
          
          .footer-text {
            font-size: 13px;
            color: #9ca3af;
            margin: 0;
            line-height: 1.5;
          }
          
          @media (max-width: 600px) {
            .email-wrapper {
              margin: 10px;
              border-radius: 12px;
            }
            
            .email-content {
              padding: 30px 20px;
            }
            
            .greeting {
              font-size: 24px;
            }
            
            .otp-code {
              font-size: 36px;
              letter-spacing: 6px;
            }
            
            .otp-container {
              padding: 24px 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="email-header">
            <h1 class="brand-logo">🛒 KartSpace</h1>
            <p class="brand-tagline">Secure Password Reset</p>
          </div>
          
          <!-- Content -->
          <div class="email-content">
            <h2 class="greeting">Hello ${name}!</h2>
            <p class="message">
              We received a request to reset your password. To proceed securely, please use the verification code below:
            </p>
            
            <!-- OTP Container -->
            <div class="otp-container">
              <p class="otp-label">Your Verification Code</p>
              <p class="otp-code">${resetOTP}</p>
            </div>
            
            <!-- Instruction -->
            <div class="otp-instruction">
              <p>💡 Enter this code in your app to complete the password reset process</p>
            </div>
            
            <!-- Security Notice -->
            <div class="security-notice">
              <h4>🔒 Security Information</h4>
              <p>This verification code will expire in <strong>10 minutes</strong>. If you didn't request this password reset, please ignore this email and your account will remain secure.</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="support-info">
              <p>Need help? Contact our support team at <a href="mailto:${process.env.EMAIL_USER || 'kartspace075@gmail.com'}">${process.env.EMAIL_USER || 'kartspace075@gmail.com'}</a></p>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="email-footer">
            <p class="footer-brand">KartSpace</p>
            <p class="footer-text">© 2025 KartSpace. All rights reserved.<br>This is an automated security message.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hello ${name}! Your KartSpace password reset verification code is: ${resetOTP}. This code expires in 10 minutes. If you didn't request this, please ignore this email.`
  };
  
  try {
    console.log('📤 Sending password reset OTP to:', email);
    console.log('🔑 OTP Code:', resetOTP);
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset OTP email sent successfully!');
    console.log('📨 Message ID:', result.messageId);
    console.log('📬 Response:', result.response);
    
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ DETAILED EMAIL ERROR:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Response Code:', error.responseCode);
    console.error('Command:', error.command);
    console.error('Full Error Object:', JSON.stringify(error, null, 2));
    
    throw new Error(`Email sending failed: ${error.message}`);
  }
}

// ✅ EMAIL VERIFICATION FUNCTION - PROFESSIONAL DESIGN
async function sendVerificationEmail(email, otp, name = 'User') {
  const mailOptions = {
    from: `"KartSpace" <${process.env.EMAIL_USER || 'kartspace075@gmail.com'}>`,
    to: email,
    subject: '🔐 Email Verification - KartSpace',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - KartSpace</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            padding: 20px 0;
            margin: 0;
            line-height: 1.6;
            color: #333333;
          }
          
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .email-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          
          .email-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
          }
          
          .brand-logo {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 8px 0;
            position: relative;
            z-index: 1;
          }
          
          .brand-tagline {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 400;
            position: relative;
            z-index: 1;
          }
          
          .email-content {
            padding: 50px 40px;
            background: #ffffff;
          }
          
          .greeting {
            font-size: 28px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 16px 0;
            text-align: center;
          }
          
          .welcome-message {
            font-size: 16px;
            color: #6b7280;
            margin: 0 0 32px 0;
            text-align: center;
            line-height: 1.7;
          }
          
          .otp-container {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border: 2px dashed #10b981;
            border-radius: 12px;
            padding: 32px;
            text-align: center;
            margin: 32px 0;
            position: relative;
          }
          
          .otp-label {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin: 0 0 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .otp-code {
            font-family: 'Courier New', Consolas, monospace;
            font-size: 42px;
            font-weight: 800;
            color: #047857;
            letter-spacing: 8px;
            margin: 0;
            text-shadow: 0 2px 4px rgba(4, 120, 87, 0.1);
          }
          
          .verification-steps {
            background: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
          }
          
          .steps-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 16px 0;
            text-align: center;
          }
          
          .step {
            display: flex;
            align-items: center;
            margin: 12px 0;
            font-size: 14px;
            color: #4b5563;
          }
          
          .step-number {
            background: #10b981;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            margin-right: 12px;
            flex-shrink: 0;
          }
          
          .security-info {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 20px;
            margin: 32px 0;
          }
          
          .security-info h4 {
            font-size: 16px;
            font-weight: 600;
            color: #92400e;
            margin: 0 0 8px 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .security-info p {
            font-size: 14px;
            color: #92400e;
            margin: 0;
            line-height: 1.5;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 32px 0;
          }
          
          .welcome-note {
            background: #e0f2fe;
            border-left: 4px solid #0284c7;
            padding: 16px 20px;
            margin: 24px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .welcome-note p {
            font-size: 14px;
            color: #0c4a6e;
            margin: 0;
            font-weight: 500;
          }
          
          .email-footer {
            background: #1f2937;
            padding: 32px 40px;
            text-align: center;
          }
          
          .footer-brand {
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 8px 0;
          }
          
          .footer-text {
            font-size: 13px;
            color: #9ca3af;
            margin: 0;
            line-height: 1.5;
          }
          
          @media (max-width: 600px) {
            .email-wrapper {
              margin: 10px;
              border-radius: 12px;
            }
            
            .email-content {
              padding: 30px 20px;
            }
            
            .greeting {
              font-size: 24px;
            }
            
            .otp-code {
              font-size: 36px;
              letter-spacing: 6px;
            }
            
            .otp-container {
              padding: 24px 16px;
            }
            
            .verification-steps {
              padding: 20px 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="email-header">
            <h1 class="brand-logo">🛒 KartSpace</h1>
            <p class="brand-tagline">Account Verification</p>
          </div>
          
          <!-- Content -->
          <div class="email-content">
            <h2 class="greeting">Welcome ${name}!</h2>
            <p class="welcome-message">
              Thank you for joining KartSpace! To complete your registration and secure your account, please verify your email address.
            </p>
            
            <!-- OTP Container -->
            <div class="otp-container">
              <p class="otp-label">Your Verification Code</p>
              <p class="otp-code">${otp}</p>
            </div>
            
            <!-- Verification Steps -->
            <div class="verification-steps">
              <p class="steps-title">How to verify your account:</p>
              <div class="step">
                <div class="step-number">1</div>
                <span>Copy the verification code above</span>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <span>Return to your KartSpace registration page</span>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <span>Enter the code and complete your setup</span>
              </div>
            </div>
            
            <!-- Welcome Note -->
            <div class="welcome-note">
              <p>🎉 Once verified, you'll have full access to all KartSpace features and exclusive offers!</p>
            </div>
            
            <!-- Security Info -->
            <div class="security-info">
              <h4>⚡ Important Information</h4>
              <p>This verification code expires in <strong>10 minutes</strong>. Keep this code confidential and never share it with anyone for your security.</p>
            </div>
            
            <div class="divider"></div>
            
            <div style="text-align: center; font-size: 14px; color: #6b7280;">
              <p>Having trouble? Contact our support team at <a href="mailto:${process.env.EMAIL_USER || 'kartspace075@gmail.com'}" style="color: #10b981; text-decoration: none; font-weight: 500;">${process.env.EMAIL_USER || 'kartspace075@gmail.com'}</a></p>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="email-footer">
            <p class="footer-brand">KartSpace</p>
            <p class="footer-text">© 2025 KartSpace. All rights reserved.<br>Welcome to the KartSpace family!</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Welcome ${name}! Your KartSpace verification code is: ${otp}. This code expires in 10 minutes. Please verify your account to get started!`
  };
  
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Failed to send verification email:', error);
    throw error;
  }
}

// Password Reset Confirmation Email
async function sendPasswordResetConfirmation(email, name = 'User') {
  const mailOptions = {
    from: `"KartSpace" <${process.env.EMAIL_USER || 'kartspace075@gmail.com'}>`,
    to: email,
    subject: '✅ Password Reset Successful - KartSpace',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
      </head>
      <body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: Arial, sans-serif;">
        
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🛒 KartSpace</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0; font-size: 16px;">Password Reset Successful</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px; text-align: center;">
            
            <h2 style="color: #1e293b; margin: 0 0 15px; font-size: 24px; font-weight: 600;">
              Hello ${name}!
            </h2>
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Your KartSpace account password has been successfully reset. You can now sign in with your new password.
            </p>
            
            <!-- Security Alert -->
            <div style="background: #dcfce7; padding: 20px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #22c55e;">
              <p style="margin: 0; color: #15803d; font-size: 14px; line-height: 1.4;">
                ✅ <strong>Security Alert:</strong> If you did not make this change, please contact our support team immediately at ${process.env.EMAIL_USER}.
              </p>
            </div>
            
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: white; padding: 30px; text-align: center;">
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">
              KartSpace - Account Security
            </p>
          </div>
        </div>
        
      </body>
      </html>
    `,
    text: `Hello ${name}! Your KartSpace password has been successfully reset. If you didn't make this change, contact support immediately.`
  };
  
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    throw error;
  }
}

// Test Email Configuration
async function testEmailConfiguration() {
  try {
    console.log('🧪 Testing email configuration...');
    
    // Test connection first
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    
    // Send test email
    const testResult = await transporter.sendMail({
      from: `"KartSpace Test" <${process.env.EMAIL_USER || 'kartspace075@gmail.com'}>`,
      to: process.env.EMAIL_USER || 'kartspace075@gmail.com',
      subject: '🧪 KartSpace Email Configuration Test',
      html: `
        <div style="padding: 30px; text-align: center; font-family: Arial, sans-serif; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; border-radius: 10px;">
          <h1>✅ Email Configuration Working!</h1>
          <p style="font-size: 18px;">Your KartSpace email service is configured correctly and ready to send emails.</p>
          <p style="font-size: 14px; opacity: 0.8;">Test timestamp: ${new Date().toLocaleString()}</p>
          <p style="font-size: 12px; opacity: 0.7;">SMTP Server: ${process.env.EMAIL_USER || 'kartspace075@gmail.com'}</p>
        </div>
      `,
      text: `KartSpace Email Configuration Test - ${new Date().toLocaleString()}`
    });
    
    console.log('✅ Test email sent successfully:', testResult.messageId);
    return { success: true, messageId: testResult.messageId };
    
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    throw error;
  }
}

module.exports = { 
  transporter,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendPasswordResetConfirmation,
  testEmailConfiguration
};
