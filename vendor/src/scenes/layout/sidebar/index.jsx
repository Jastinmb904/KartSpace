
// import { Avatar, Box, IconButton, Typography, useTheme, useMediaQuery, Badge, Fade, Slide } from "@mui/material";
// import { useContext, useState, useMemo } from "react";
// import { tokens } from "../../../theme";
// import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
// import {
//   BarChartOutlined,
//   CalendarTodayOutlined,
//   ContactsOutlined,
//   DashboardOutlined,
//   DonutLargeOutlined,
//   HelpOutlineOutlined,
//   MapOutlined,
//   MenuOutlined,
//   PeopleAltOutlined,
//   PersonOutlined,
//   ReceiptOutlined,
//   TimelineOutlined,
//   WavesOutlined,
//   MessageOutlined,
//   Store,
//   LocalMall,
//   CardGiftcard,
//   ShoppingCart,
// } from "@mui/icons-material";
// import avatar from "../../../assets/images/avatar.png";
// import logo from "../../../assets/images/logo.png";
// import Item from "./Item";
// import { ToggledContext } from "../../../App";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import StorefrontIcon from '@mui/icons-material/Store';
// import RateReviewOutlined from "@mui/icons-material/RateReviewOutlined";

// const SideBar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isHovered, setIsHovered] = useState({});
//   // REMOVED: sidebarHovered state - no more auto hover expansion
//   const { toggled, setToggled } = useContext(ToggledContext);
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const isDarkMode = theme.palette.mode === 'dark';

//   // Shopping icons for background animation (only in light mode)
//   const shoppingIcons = [
//     { Icon: ShoppingCart, delay: '0s', duration: '15s', x: '10%', y: '20%' },
//     { Icon: Store, delay: '5s', duration: '18s', x: '80%', y: '30%' },
//     { Icon: LocalMall, delay: '3s', duration: '20s', x: '15%', y: '60%' },
//     { Icon: CardGiftcard, delay: '8s', duration: '16s', x: '75%', y: '70%' },
//   ];

//   // Define consistent color scheme
//   const themeColors = {
//     primary: '#8b5cf6',
//     primaryLight: '#a78bfa',
//     primaryDark: '#7c3aed',
//     text: {
//       primary: isDarkMode ? '#f3f4f6' : '#1f2937',
//       secondary: isDarkMode ? '#d1d5db' : '#6b7280',
//       accent: isDarkMode ? '#e5e7eb' : '#374151',
//       onPrimary: '#ffffff',
//     },
//     background: {
//       primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.98)',
//       secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
//       hover: isDarkMode ? colors.primary[300] : 'rgba(139, 92, 246, 0.1)',
//       card: isDarkMode ? colors.primary[300] : 'rgba(255, 255, 255, 0.9)',
//     },
//     border: {
//       default: isDarkMode ? colors.primary[600] : '#a78bfa',
//       hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
//     },
//   };

//   // FIXED: Only use manual toggle state - no auto expansion
//   const isExpanded = !collapsed;

//   // Memoize styles for better performance
//   const sidebarStyles = useMemo(() => ({
//     backgroundColor: 'transparent',
//     rootStyles: {
//       border: 0,
//       height: "100%",
//       background: isDarkMode 
//         ? `linear-gradient(180deg, ${colors.primary[400]} 0%, ${colors.primary[500]} 100%)`
//         : `linear-gradient(180deg, rgba(254, 252, 255, 0.98) 0%, rgba(250, 249, 255, 0.95) 100%)`,
//       backdropFilter: 'blur(20px)',
//       boxShadow: isDarkMode
//         ? "4px 0px 30px rgba(0, 0, 0, 0.3)"
//         : "4px 0px 30px rgba(139, 92, 246, 0.15)",
//       transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//       position: 'relative',
//       overflow: 'hidden',
//       // FIXED: Width controlled only by manual toggle
//       width: isExpanded ? '280px' : '80px',
//       '&::before': !isDarkMode && {
//         content: '""',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: `
//           radial-gradient(circle at 20% 20%, #f3e8ff 0%, transparent 40%),
//           radial-gradient(circle at 80% 80%, #e0e7ff 0%, transparent 40%),
//           radial-gradient(circle at 40% 60%, #ddd6fe 0%, transparent 40%)
//         `,
//         zIndex: 0,
//         pointerEvents: 'none',
//       },
//       '&::after': {
//         content: '""',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '4px',
//         height: '100%',
//         background: `linear-gradient(180deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//         animation: 'shimmer 3s ease-in-out infinite',
//       },
//       '@keyframes shimmer': {
//         '0%': { backgroundPosition: '0% 0%' },
//         '50%': { backgroundPosition: '0% 100%' },
//         '100%': { backgroundPosition: '0% 0%' }
//       }
//     }
//   }), [colors.primary, isDarkMode, themeColors, isExpanded]);

//   // FIXED: Handle toggle button click - only manual control
//   const handleToggle = () => {
//     if (isNonMobile) {
//       setCollapsed(!collapsed);
//     } else {
//       setToggled(!toggled);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         height: '100vh',
//         '&::before': !isDarkMode && {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: `
//             radial-gradient(circle at 20% 20%, #f3e8ff 0%, transparent 50%),
//             radial-gradient(circle at 80% 80%, #e0e7ff 0%, transparent 50%)
//           `,
//           zIndex: -2,
//           pointerEvents: 'none',
//         },
//         '@keyframes floatUpDown': {
//           '0%': { transform: 'translateY(0px) rotate(0deg)' },
//           '25%': { transform: 'translateY(-10px) rotate(2deg)' },
//           '50%': { transform: 'translateY(-20px) rotate(-1deg)' },
//           '75%': { transform: 'translateY(-10px) rotate(3deg)' },
//           '100%': { transform: 'translateY(0px) rotate(0deg)' }
//         },
//         '@keyframes floatLeftRight': {
//           '0%': { transform: 'translateX(0px) rotate(0deg)' },
//           '33%': { transform: 'translateX(10px) rotate(5deg)' },
//           '66%': { transform: 'translateX(-5px) rotate(-2deg)' },
//           '100%': { transform: 'translateX(0px) rotate(0deg)' }
//         },
//       }}
//       // REMOVED: All hover handlers - no auto expansion
//     >
//       {/* Animated Background Icons (only in light mode and when expanded) */}
//       {!isDarkMode && isExpanded && shoppingIcons.map((item, index) => {
//         const animationType = index % 2 === 0 ? 'floatUpDown' : 'floatLeftRight';
        
//         return (
//           <item.Icon
//             key={index}
//             sx={{
//               position: 'absolute',
//               left: item.x,
//               top: item.y,
//               fontSize: '1.5rem',
//               color: 'rgba(139, 92, 246, 0.06)',
//               animation: `${animationType} ${item.duration} ease-in-out infinite`,
//               animationDelay: item.delay,
//               zIndex: 1,
//               pointerEvents: 'none',
//               filter: 'blur(0.5px)',
//             }}
//           />
//         );
//       })}

//       <Sidebar
//         {...sidebarStyles}
//         collapsed={!isExpanded} // FIXED: Only manual control
//         onBackdropClick={() => setToggled(false)}
//         toggled={toggled}
//         breakPoint="md"
//       >
//         <Menu
//           menuItemStyles={{
//             button: { 
//               ":hover": { 
//                 background: "transparent",
//                 transform: "translateX(8px)",
//                 transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
//               } 
//             },
//           }}
//         >
//           {/* Header Section */}
//           <MenuItem
//             rootStyles={{
//               margin: "15px 0 25px 0",
//               color: themeColors.text.primary,
//               zIndex: 10,
//               position: 'relative',
//             }}
//           >
//             <Fade in={true} timeout={800}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: isExpanded ? "space-between" : "center",
//                   padding: isExpanded ? "0 15px" : "0",
//                 }}
//               >
//                 {/* Show title only when expanded */}
//                 {isExpanded && (
//                   <Slide direction="right" in={true} timeout={1000}>
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       gap="15px"
//                       sx={{ 
//                         transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                         transform: "translateX(0)",
//                         "&:hover": {
//                           transform: "translateX(8px)"
//                         }
//                       }}
//                     >
//                       <Typography
//                         variant="h4"
//                         fontWeight="700"
//                         textTransform="capitalize"
//                         sx={{
//                           color: isDarkMode ? '#f3f4f6' : '#1f2937',
//                           background: isDarkMode 
//                             ? `linear-gradient(135deg, #a78bfa, #8b5cf6, #c4b5fd)`
//                             : `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
//                           backgroundClip: 'text',
//                           textFillColor: 'transparent',
//                           WebkitBackgroundClip: 'text',
//                           WebkitTextFillColor: 'transparent',
//                           letterSpacing: "1px",
//                           fontSize: "1.6rem",
//                           fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//                           // textShadow: isDarkMode 
//                           //   ? "0 0 20px rgba(234, 232, 241, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)"
//                           //   : "1px 1px 2px rgba(139, 92, 246, 0.1)",
//                           position: 'relative',
//                           // animation: isDarkMode && 'glow 3s ease-in-out infinite alternate',
//                           // filter: isDarkMode && 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.4))',
//                           '@keyframes glow': {
//                             '0%': { 
//                               filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.4)) brightness(1)',
//                               textShadow: "0 0 20px rgba(167, 139, 250, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)"
//                             },
//                             '100%': { 
//                               filter: 'drop-shadow(0 0 20px rgba(167, 139, 250, 0.8)) brightness(1.2)',
//                               textShadow: "0 0 30px rgba(167, 139, 250, 0.8), 0 0 60px rgba(139, 92, 246, 0.5)"
//                             }
//                           }
//                         }}
//                       >
//                         ShopMart
//                       </Typography>
//                     </Box>
//                   </Slide>
//                 )}
                
//                 {/* Toggle button */}
//                 <IconButton 
//                   onClick={handleToggle}
//                   onMouseEnter={() => setIsHovered(prev => ({ ...prev, menu: true }))}
//                   onMouseLeave={() => setIsHovered(prev => ({ ...prev, menu: false }))}
//                   sx={{
//                     backgroundColor: isDarkMode ? colors.primary[300] : `${themeColors.primary}20`,
//                     borderRadius: "15px",
//                     width: "45px",
//                     height: "45px",
//                     transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                     border: `2px solid ${isDarkMode ? colors.primary[200] : themeColors.primary}30`,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     transform: isHovered.menu ? 'scale(1.1) rotate(180deg)' : 'scale(1) rotate(0deg)',
//                     boxShadow: isHovered.menu 
//                       ? `0 8px 25px ${themeColors.primary}40`
//                       : `0 4px 15px ${themeColors.primary}20`,
//                     '&::before': {
//                       content: '""',
//                       position: 'absolute',
//                       top: 0,
//                       left: '-100%',
//                       width: '100%',
//                       height: '100%',
//                       background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
//                       transition: 'left 0.6s',
//                     },
//                     "&:hover": {
//                       backgroundColor: isDarkMode ? colors.primary[200] : `${themeColors.primary}30`,
//                       '&::before': {
//                         left: '100%',
//                       },
//                     }
//                   }}
//                   aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//                 >
//                   <MenuOutlined sx={{ color: isDarkMode ? colors.gray[100] : themeColors.primary }} />
//                 </IconButton>
//               </Box>
//             </Fade>
//           </MenuItem>
//         </Menu>

//         {/* Vendor Panel Card - Show only when expanded */}
//         {isExpanded && (
//           <Slide direction="right" in={true} timeout={1000} style={{ transitionDelay: '300ms' }}>
//             <Box
//               onMouseEnter={() => setIsHovered(prev => ({ ...prev, panel: true }))}
//               onMouseLeave={() => setIsHovered(prev => ({ ...prev, panel: false }))}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: "15px",
//                 mb: "30px",
//                 padding: "20px 15px",
//                 background: isDarkMode
//                   ? `linear-gradient(145deg, ${colors.primary[300]}, ${colors.primary[500]})`
//                   : `linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)`,
//                 backdropFilter: 'blur(10px)',
//                 margin: "0 20px",
//                 borderRadius: "20px",
//                 border: isDarkMode 
//                   ? `2px solid ${colors.primary[200]}`
//                   : `2px solid ${themeColors.primary}30`,
//                 position: 'relative',
//                 zIndex: 10,
//                 transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                 transform: isHovered.panel ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
//                 boxShadow: isHovered.panel
//                   ? isDarkMode
//                     ? "0 15px 35px rgba(0,0,0,0.3)"
//                     : "0 15px 35px rgba(139, 92, 246, 0.2)"
//                   : isDarkMode
//                     ? "inset 0 2px 4px rgba(0,0,0,0.1)"
//                     : "0 8px 25px rgba(139, 92, 246, 0.1)",
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: '3px',
//                   background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//                   borderRadius: '20px 20px 0 0',
//                   animation: 'shimmer 2s ease-in-out infinite',
//                 },
//               }}
//             >
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography 
//                   variant="h3" 
//                   fontWeight="700" 
//                   sx={{
//                     color: isDarkMode ? colors.gray[100] : themeColors.text.primary,
//                     textShadow: isDarkMode ? "2px 2px 4px rgba(0,0,0,0.3)" : "1px 1px 2px rgba(139, 92, 246, 0.1)",
//                     letterSpacing: "1.5px",
//                     background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary})`,
//                     backgroundClip: !isDarkMode && 'text',
//                     textFillColor: !isDarkMode && 'transparent',
//                     WebkitBackgroundClip: !isDarkMode && 'text',
//                     WebkitTextFillColor: !isDarkMode && 'transparent',
//                     fontSize: "1.4rem",
//                   }}
//                 >
//                   Vendor Panel
//                 </Typography>
//               </Box>
//             </Box>
//           </Slide>
//         )}

//         {/* Menu Items */}
//         <Box 
//           mb={5} 
//           pl={isExpanded ? "5%" : undefined}
//           sx={{
//             position: 'relative',
//             zIndex: 10,
//             "& .ps-menu-button": {
//               borderRadius: "15px",
//               margin: isExpanded ? "8px 20px" : "8px 10px",
//               padding: isExpanded ? "15px 20px" : "15px 10px",
//               transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//               position: 'relative',
//               overflow: 'hidden',
//               "&:hover": {
//                 backgroundColor: `${themeColors.background.hover} !important`,
//                 transform: isExpanded ? "translateX(10px) scale(1.02)" : "scale(1.1)",
//                 boxShadow: `0 8px 25px ${themeColors.primary}20`,
//                 border: `2px solid ${themeColors.primary}30`,
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '4px',
//                   height: '100%',
//                   background: `linear-gradient(180deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
//                   borderRadius: '0 15px 15px 0',
//                 }
//               }
//             }
//           }}
//         >
//           <Menu
//             menuItemStyles={{
//               button: {
//                 ":hover": {
//                   color: isDarkMode ? colors.greenAccent[500] : themeColors.primary,
//                   background: "transparent",
//                   transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                 },
//               },
//             }}
//           >
//             <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
//               <div>
//                 <Item
//                   title="Dashboard"
//                   path="/dashboard"
//                   colors={colors}
//                   icon={<DashboardOutlined />}
//                   isExpanded={isExpanded}
//                 />
//               </div>
//             </Fade>

//             {/* Show section title only when expanded */}
//             {isExpanded && (
//               <Slide direction="right" in={true} timeout={800} style={{ transitionDelay: '500ms' }}>
//                 <Typography
//                   variant="h6"
//                   sx={{ 
//                     m: "30px 0 20px 25px",
//                     fontSize: "0.85rem",
//                     letterSpacing: "2px",
//                     textTransform: "uppercase",
//                     fontWeight: 700,
//                     color: isDarkMode ? colors.gray[300] : themeColors.text.secondary,
//                     position: 'relative',
//                     '&::after': {
//                       content: '""',
//                       position: 'absolute',
//                       bottom: '-5px',
//                       left: 0,
//                       width: '30px',
//                       height: '2px',
//                       background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
//                       borderRadius: '1px',
//                     }
//                   }}
//                 >
//                   Manage
//                 </Typography>
//               </Slide>
//             )}

//             {/* Menu Items with staggered animations */}
//             {[
//               { title: "Profile", path: "/profile", icon: <ContactsOutlined />, delay: '600ms' },
//               { title: "Products", path: "/products", icon: <StorefrontIcon />, delay: '700ms' },
//               { title: "Orders", path: "/orders", icon: <PeopleAltOutlined />, delay: '800ms' },
//               { title: "Payments", path: "/payments", icon: <AttachMoneyIcon />, delay: '900ms' },
//               { title: "Message", path: "/message", icon: <MessageOutlined />, delay: '1000ms' },
//               { title: "Feedbacks", path: "/feedbacks", icon: <RateReviewOutlined />, delay: '1100ms' },
//             ].map((item, index) => (
//               <Fade key={item.path} in={true} timeout={800} style={{ transitionDelay: item.delay }}>
//                 <div>
//                   <Item
//                     title={item.title}
//                     path={item.path}
//                     colors={colors}
//                     icon={item.icon}
//                     isExpanded={isExpanded}
//                   />
//                 </div>
//               </Fade>
//             ))}
//           </Menu>
//         </Box>
//       </Sidebar>
//     </Box>
//   );
// };

// export default SideBar;









import { Avatar, Box, IconButton, Typography, useTheme, useMediaQuery, Badge, Fade, Slide } from "@mui/material";
import { useContext, useState, useMemo } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  WavesOutlined,
  MessageOutlined,
  Store,
  LocalMall,
  CardGiftcard,
  ShoppingCart,
  AssignmentReturn, // ✅ ADD THIS IMPORT
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StorefrontIcon from '@mui/icons-material/Store';
import RateReviewOutlined from "@mui/icons-material/RateReviewOutlined";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState({});
  // REMOVED: sidebarHovered state - no more auto hover expansion
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isDarkMode = theme.palette.mode === 'dark';

  // Shopping icons for background animation (only in light mode)
  const shoppingIcons = [
    { Icon: ShoppingCart, delay: '0s', duration: '15s', x: '10%', y: '20%' },
    { Icon: Store, delay: '5s', duration: '18s', x: '80%', y: '30%' },
    { Icon: LocalMall, delay: '3s', duration: '20s', x: '15%', y: '60%' },
    { Icon: CardGiftcard, delay: '8s', duration: '16s', x: '75%', y: '70%' },
  ];

  // Define consistent color scheme
  const themeColors = {
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    text: {
      primary: isDarkMode ? '#f3f4f6' : '#1f2937',
      secondary: isDarkMode ? '#d1d5db' : '#6b7280',
      accent: isDarkMode ? '#e5e7eb' : '#374151',
      onPrimary: '#ffffff',
    },
    background: {
      primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.98)',
      secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
      hover: isDarkMode ? colors.primary[300] : 'rgba(139, 92, 246, 0.1)',
      card: isDarkMode ? colors.primary[300] : 'rgba(255, 255, 255, 0.9)',
    },
    border: {
      default: isDarkMode ? colors.primary[600] : '#a78bfa',
      hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
    },
  };

  // FIXED: Only use manual toggle state - no auto expansion
  const isExpanded = !collapsed;

  // Memoize styles for better performance
  const sidebarStyles = useMemo(() => ({
    backgroundColor: 'transparent',
    rootStyles: {
      border: 0,
      height: "100%",
      background: isDarkMode 
        ? `linear-gradient(180deg, ${colors.primary[400]} 0%, ${colors.primary[500]} 100%)`
        : `linear-gradient(180deg, rgba(254, 252, 255, 0.98) 0%, rgba(250, 249, 255, 0.95) 100%)`,
      backdropFilter: 'blur(20px)',
      boxShadow: isDarkMode
        ? "4px 0px 30px rgba(0, 0, 0, 0.3)"
        : "4px 0px 30px rgba(139, 92, 246, 0.15)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: 'relative',
      overflow: 'hidden',
      // FIXED: Width controlled only by manual toggle
      width: isExpanded ? '280px' : '80px',
      '&::before': !isDarkMode && {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, #f3e8ff 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, #e0e7ff 0%, transparent 40%),
          radial-gradient(circle at 40% 60%, #ddd6fe 0%, transparent 40%)
        `,
        zIndex: 0,
        pointerEvents: 'none',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        background: `linear-gradient(180deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
        animation: 'shimmer 3s ease-in-out infinite',
      },
      '@keyframes shimmer': {
        '0%': { backgroundPosition: '0% 0%' },
        '50%': { backgroundPosition: '0% 100%' },
        '100%': { backgroundPosition: '0% 0%' }
      }
    }
  }), [colors.primary, isDarkMode, themeColors, isExpanded]);

  // FIXED: Handle toggle button click - only manual control
  const handleToggle = () => {
    if (isNonMobile) {
      setCollapsed(!collapsed);
    } else {
      setToggled(!toggled);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        '&::before': !isDarkMode && {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, #f3e8ff 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, #e0e7ff 0%, transparent 50%)
          `,
          zIndex: -2,
          pointerEvents: 'none',
        },
        '@keyframes floatUpDown': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-10px) rotate(3deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' }
        },
        '@keyframes floatLeftRight': {
          '0%': { transform: 'translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateX(10px) rotate(5deg)' },
          '66%': { transform: 'translateX(-5px) rotate(-2deg)' },
          '100%': { transform: 'translateX(0px) rotate(0deg)' }
        },
      }}
      // REMOVED: All hover handlers - no auto expansion
    >
      {/* Animated Background Icons (only in light mode and when expanded) */}
      {!isDarkMode && isExpanded && shoppingIcons.map((item, index) => {
        const animationType = index % 2 === 0 ? 'floatUpDown' : 'floatLeftRight';
        
        return (
          <item.Icon
            key={index}
            sx={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              fontSize: '1.5rem',
              color: 'rgba(139, 92, 246, 0.06)',
              animation: `${animationType} ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
              zIndex: 1,
              pointerEvents: 'none',
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}

      <Sidebar
        {...sidebarStyles}
        collapsed={!isExpanded} // FIXED: Only manual control
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="md"
      >
        <Menu
          menuItemStyles={{
            button: { 
              ":hover": { 
                background: "transparent",
                transform: "translateX(8px)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              } 
            },
          }}
        >
          {/* Header Section */}
          <MenuItem
            rootStyles={{
              margin: "15px 0 25px 0",
              color: themeColors.text.primary,
              zIndex: 10,
              position: 'relative',
            }}
          >
            <Fade in={true} timeout={800}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isExpanded ? "space-between" : "center",
                  padding: isExpanded ? "0 15px" : "0",
                }}
              >
                {/* Show title only when expanded */}
                {isExpanded && (
                  <Slide direction="right" in={true} timeout={1000}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="15px"
                      sx={{ 
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transform: "translateX(0)",
                        "&:hover": {
                          transform: "translateX(8px)"
                        }
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight="700"
                        textTransform="capitalize"
                        sx={{
                          color: isDarkMode ? '#f3f4f6' : '#1f2937',
                          background: isDarkMode 
                            ? `linear-gradient(135deg, #a78bfa, #8b5cf6, #c4b5fd)`
                            : `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                          backgroundClip: 'text',
                          textFillColor: 'transparent',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: "1px",
                          fontSize: "1.6rem",
                          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                          position: 'relative',
                        }}
                      >
                        ShopMart
                      </Typography>
                    </Box>
                  </Slide>
                )}
                
                {/* Toggle button */}
                <IconButton 
                  onClick={handleToggle}
                  onMouseEnter={() => setIsHovered(prev => ({ ...prev, menu: true }))}
                  onMouseLeave={() => setIsHovered(prev => ({ ...prev, menu: false }))}
                  sx={{
                    backgroundColor: isDarkMode ? colors.primary[300] : `${themeColors.primary}20`,
                    borderRadius: "15px",
                    width: "45px",
                    height: "45px",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    border: `2px solid ${isDarkMode ? colors.primary[200] : themeColors.primary}30`,
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isHovered.menu ? 'scale(1.1) rotate(180deg)' : 'scale(1) rotate(0deg)',
                    boxShadow: isHovered.menu 
                      ? `0 8px 25px ${themeColors.primary}40`
                      : `0 4px 15px ${themeColors.primary}20`,
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
                    "&:hover": {
                      backgroundColor: isDarkMode ? colors.primary[200] : `${themeColors.primary}30`,
                      '&::before': {
                        left: '100%',
                      },
                    }
                  }}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <MenuOutlined sx={{ color: isDarkMode ? colors.gray[100] : themeColors.primary }} />
                </IconButton>
              </Box>
            </Fade>
          </MenuItem>
        </Menu>

        {/* Vendor Panel Card - Show only when expanded */}
        {isExpanded && (
          <Slide direction="right" in={true} timeout={1000} style={{ transitionDelay: '300ms' }}>
            <Box
              onMouseEnter={() => setIsHovered(prev => ({ ...prev, panel: true }))}
              onMouseLeave={() => setIsHovered(prev => ({ ...prev, panel: false }))}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
                mb: "30px",
                padding: "20px 15px",
                background: isDarkMode
                  ? `linear-gradient(145deg, ${colors.primary[300]}, ${colors.primary[500]})`
                  : `linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)`,
                backdropFilter: 'blur(10px)',
                margin: "0 20px",
                borderRadius: "20px",
                border: isDarkMode 
                  ? `2px solid ${colors.primary[200]}`
                  : `2px solid ${themeColors.primary}30`,
                position: 'relative',
                zIndex: 10,
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: isHovered.panel ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: isHovered.panel
                  ? isDarkMode
                    ? "0 15px 35px rgba(0,0,0,0.3)"
                    : "0 15px 35px rgba(139, 92, 246, 0.2)"
                  : isDarkMode
                    ? "inset 0 2px 4px rgba(0,0,0,0.1)"
                    : "0 8px 25px rgba(139, 92, 246, 0.1)",
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
                  borderRadius: '20px 20px 0 0',
                  animation: 'shimmer 2s ease-in-out infinite',
                },
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography 
                  variant="h3" 
                  fontWeight="700" 
                  sx={{
                    color: isDarkMode ? colors.gray[100] : themeColors.text.primary,
                    textShadow: isDarkMode ? "2px 2px 4px rgba(0,0,0,0.3)" : "1px 1px 2px rgba(139, 92, 246, 0.1)",
                    letterSpacing: "1.5px",
                    background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary})`,
                    backgroundClip: !isDarkMode && 'text',
                    textFillColor: !isDarkMode && 'transparent',
                    WebkitBackgroundClip: !isDarkMode && 'text',
                    WebkitTextFillColor: !isDarkMode && 'transparent',
                    fontSize: "1.4rem",
                  }}
                >
                  Vendor Panel
                </Typography>
              </Box>
            </Box>
          </Slide>
        )}

        {/* Menu Items */}
        <Box 
          mb={5} 
          pl={isExpanded ? "5%" : undefined}
          sx={{
            position: 'relative',
            zIndex: 10,
            "& .ps-menu-button": {
              borderRadius: "15px",
              margin: isExpanded ? "8px 20px" : "8px 10px",
              padding: isExpanded ? "15px 20px" : "15px 10px",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              position: 'relative',
              overflow: 'hidden',
              "&:hover": {
                backgroundColor: `${themeColors.background.hover} !important`,
                transform: isExpanded ? "translateX(10px) scale(1.02)" : "scale(1.1)",
                boxShadow: `0 8px 25px ${themeColors.primary}20`,
                border: `2px solid ${themeColors.primary}30`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: `linear-gradient(180deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                  borderRadius: '0 15px 15px 0',
                }
              }
            }
          }}
        >
          <Menu
            menuItemStyles={{
              button: {
                ":hover": {
                  color: isDarkMode ? colors.greenAccent[500] : themeColors.primary,
                  background: "transparent",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                },
              },
            }}
          >
            <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
              <div>
                <Item
                  title="Dashboard"
                  path="/dashboard"
                  colors={colors}
                  icon={<DashboardOutlined />}
                  isExpanded={isExpanded}
                />
              </div>
            </Fade>

            {/* Show section title only when expanded */}
            {isExpanded && (
              <Slide direction="right" in={true} timeout={800} style={{ transitionDelay: '500ms' }}>
                <Typography
                  variant="h6"
                  sx={{ 
                    m: "30px 0 20px 25px",
                    fontSize: "0.85rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: isDarkMode ? colors.gray[300] : themeColors.text.secondary,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-5px',
                      left: 0,
                      width: '30px',
                      height: '2px',
                      background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                      borderRadius: '1px',
                    }
                  }}
                >
                  Manage
                </Typography>
              </Slide>
            )}

            {/* Menu Items with staggered animations */}
            {[
              { title: "Profile", path: "/profile", icon: <ContactsOutlined />, delay: '600ms' },
              { title: "Products", path: "/products", icon: <StorefrontIcon />, delay: '700ms' },
              { title: "Orders", path: "/orders", icon: <PeopleAltOutlined />, delay: '800ms' },
              { title: "Return Requests", path: "/return-requests", icon: <AssignmentReturn />, delay: '850ms' }, // ✅ ADD THIS LINE
              { title: "Payments", path: "/payments", icon: <AttachMoneyIcon />, delay: '900ms' },
              { title: "Message", path: "/message", icon: <MessageOutlined />, delay: '1000ms' },
              { title: "Feedbacks", path: "/feedbacks", icon: <RateReviewOutlined />, delay: '1100ms' },
            ].map((item, index) => (
              <Fade key={item.path} in={true} timeout={800} style={{ transitionDelay: item.delay }}>
                <div>
                  <Item
                    title={item.title}
                    path={item.path}
                    colors={colors}
                    icon={item.icon}
                    isExpanded={isExpanded}
                  />
                </div>
              </Fade>
            ))}
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SideBar;


