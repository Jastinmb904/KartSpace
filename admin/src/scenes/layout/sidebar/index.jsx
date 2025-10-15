// /* eslint-disable react/prop-types */
// import { Avatar, Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
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
//   CategoryOutlined,
//   FeedbackOutlined
// } from "@mui/icons-material";
// import avatar from "../../../assets/images/avatar.png";
// import logo from "../../../assets/images/logo.png";
// import Item from "./Item";
// import { ToggledContext } from "../../../App";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// const SideBar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const { toggled, setToggled } = useContext(ToggledContext);
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const isNonMobile = useMediaQuery("(min-width:600px)");

//   // Memoize styles for better performance
//   const sidebarStyles = useMemo(() => ({
//     backgroundColor: colors.primary[400],
//     rootStyles: {
//       border: 0,
//       height: "100%",
//       boxShadow: "2px 0px 20px rgba(0, 0, 0, 0.1)",
//       transition: "all 0.3s ease"
//     }
//   }), [colors.primary]);

//   return (
//     <Sidebar
//       {...sidebarStyles}
//       collapsed={collapsed}
//       onBackdropClick={() => setToggled(false)}
//       toggled={toggled}
//       breakPoint="md"
//     >
//       <Menu
//         menuItemStyles={{
//           button: { 
//             ":hover": { 
//               background: "transparent",
//               transform: "translateX(5px)",
//               transition: "all 0.3s ease"
//             } 
//           },
//         }}
//       >
//         <MenuItem
//           rootStyles={{
//             margin: "10px 0 20px 0",
//             color: colors.gray[100],
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "0 10px"
//             }}
//           >
//             {!collapsed && (
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 gap="12px"
//                 sx={{ 
//                   transition: "all .3s ease",
//                   transform: "translateX(0)",
//                   "&:hover": {
//                     transform: "translateX(5px)"
//                   }
//                 }}
//               >
//                 {/* <img
//                   style={{ 
//                     width: "35px", 
//                     height: "35px", 
//                     borderRadius: "10px",
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//                   }}
//                   src={logo}
//                   alt="Ecom"
//                   loading="lazy"
//                 /> */}
//                 <Typography
//                   variant="h4"
//                   fontWeight="bold"
//                   textTransform="capitalize"
//                   color={colors.greenAccent[500]}
//                   sx={{
//                     letterSpacing: "0.5px",
//                     textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
//                     fontSize: "1.6rem"
//                   }}
//                 >
//                   ShopMart
//                 </Typography>
//               </Box>
//             )}
//             <IconButton 
//               onClick={() => setCollapsed(!collapsed)}
//               sx={{
//                 backgroundColor: colors.primary[300],
//                 borderRadius: "12px",
//                 "&:hover": {
//                   backgroundColor: colors.primary[200],
//                 }
//               }}
//               aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//             >
//               <MenuOutlined />
//             </IconButton>
//           </Box>
//         </MenuItem>
//       </Menu>

//       {!collapsed && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "15px",
//             mb: "25px",
//             padding: "10px",
//             background: `linear-gradient(145deg, ${colors.primary[300]}, ${colors.primary[500]})`,
//             margin: "0 15px",
//             borderRadius: "15px",
//             boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
//           }}
//         >
//           <Box sx={{ textAlign: "center" }}>
//             <Typography 
//               variant="h3" 
//               fontWeight="bold" 
//               color={colors.gray[100]}
//               sx={{
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
//                 letterSpacing: "1px"
//               }}
//             >
//               Admin Panel
//             </Typography>
//           </Box>
//         </Box>
//       )}

//       <Box 
//         mb={5} 
//         pl={collapsed ? undefined : "5%"}
//         sx={{
//           "& .ps-menu-button": {
//             borderRadius: "10px",
//             margin: "5px 15px",
//             padding: "10px 15px",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               backgroundColor: `${colors.primary[300]} !important`,
//               transform: "translateX(5px)"
//             }
//           }
//         }}
//       >
//         <Menu
//           menuItemStyles={{
//             button: {
//               ":hover": {
//                 color: colors.greenAccent[500],
//                 background: "transparent",
//                 transition: "all .4s ease",
//               },
//             },
//           }}
//         >
//           <Item
//             title="Dashboard"
//             path="/dashboard"
//             colors={colors}
//             icon={<DashboardOutlined />}
//           />

//           <Typography
//             variant="h6"
//             color={colors.gray[300]}
//             sx={{ 
//               m: "25px 0 15px 20px",
//               fontSize: "0.8rem",
//               letterSpacing: "1.5px",
//               textTransform: "uppercase",
//               opacity: 0.8
//             }}
//           >
//             {!collapsed ? "Data" : " "}
//           </Typography>

//           <Item
//             title="Manage Vendors"
//             path="/vendors"
//             colors={colors}
//             icon={<PeopleAltOutlined />}
//           />
//           <Item
//             title="Users"
//             path="/users"
//             colors={colors}
//             icon={<ContactsOutlined />}
//           />
//           <Item
//             title="Categories"
//             path="/categories"
//             colors={colors}
//             icon={<CategoryOutlined />}
//           />
//           <Item
//             title="Feedbacks"
//             path="/feedbacks"
//             colors={colors}
//             icon={<FeedbackOutlined />}
//           />
//         </Menu>
//       </Box>
//     </Sidebar>
//   );
// };

// export default SideBar;


/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
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
  CategoryOutlined,
  FeedbackOutlined
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isDarkMode = theme.palette.mode === 'dark';

  // Enhanced theme colors matching dashboard
  const themeColors = useMemo(() => ({
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
  }), []);

  // Memoize styles with enhanced light mode and fixed collapsed state
  const sidebarStyles = useMemo(() => ({
    backgroundColor: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
    rootStyles: {
      border: isDarkMode ? 0 : `2px solid #a78bfa`,
      height: "100%",
      borderRadius: isDarkMode ? 0 : "0 20px 20px 0",
      background: isDarkMode 
        ? colors.primary[400]
        : `linear-gradient(135deg, rgba(254, 252, 255, 0.95) 0%, rgba(250, 249, 255, 0.95) 100%)`,
      backdropFilter: isDarkMode ? "none" : "blur(20px)",
      boxShadow: isDarkMode 
        ? "2px 0px 20px rgba(0, 0, 0, 0.1)"
        : "4px 0px 30px rgba(139, 92, 246, 0.15)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "visible",
      '&::before': !isDarkMode && {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        borderRadius: "0 20px 20px 0",
      }
    }
  }), [colors.primary, isDarkMode]);

  return (
    <Sidebar
      {...sidebarStyles}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { 
            ":hover": { 
              background: isDarkMode 
                ? "transparent" 
                : "rgba(139, 92, 246, 0.08) !important",
              transform: "translateX(5px)",
              transition: "all 0.3s ease"
            } 
          },
        }}
      >
        {/* Header Section - Fixed for proper button visibility */}
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: isDarkMode ? colors.gray[100] : '#1f2937',
            height: "auto",
            minHeight: "60px",
            overflow: "visible"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
              padding: collapsed ? "10px" : "10px 15px",
              width: "100%",
              position: "relative",
              overflow: "visible"
            }}
          >
            {/* ShopMart name - Fixed dark mode visibility */}
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ 
                  transition: "all .3s ease",
                  flex: 1,
                  minWidth: 0
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  sx={{
                    letterSpacing: "1px",
                    fontSize: "1.6rem",
                    color: isDarkMode ? colors.greenAccent[500] : undefined,
                    background: !isDarkMode 
                      ? `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`
                      : undefined,
                    backgroundClip: !isDarkMode ? 'text' : undefined,
                    WebkitBackgroundClip: !isDarkMode ? 'text' : undefined,
                    WebkitTextFillColor: !isDarkMode ? 'transparent' : undefined,
                    filter: !isDarkMode ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" : undefined,
                    whiteSpace: "nowrap",
                    textShadow: "none"
                  }}
                >
                  ShopMart
                </Typography>
              </Box>
            )}
            
            {/* Menu Button - Fixed positioning and visibility */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 10,
                flexShrink: 0
              }}
            >
              <IconButton 
                onClick={() => setCollapsed(!collapsed)}
                sx={{
                  background: isDarkMode 
                    ? colors.primary[300]
                    : `linear-gradient(135deg, rgba(250, 249, 255, 0.95), rgba(254, 252, 255, 0.95))`,
                  backdropFilter: !isDarkMode && "blur(10px)",
                  border: !isDarkMode && `2px solid #a78bfa`,
                  borderRadius: "12px",
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  boxShadow: isDarkMode 
                    ? "none"
                    : `0 8px 25px rgba(139, 92, 246, 0.2)`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: isDarkMode 
                      ? colors.primary[200]
                      : 'rgba(139, 92, 246, 0.08)',
                    borderColor: !isDarkMode && '#8b5cf6',
                    transform: "scale(1.05)",
                    boxShadow: !isDarkMode && `0 12px 35px rgba(139, 92, 246, 0.3)`,
                  }
                }}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <MenuOutlined sx={{ 
                  color: isDarkMode ? colors.gray[100] : '#8b5cf6',
                  fontSize: "20px"
                }} />
              </IconButton>
            </Box>
          </Box>
        </MenuItem>
      </Menu>

      {/* Admin Panel Card - Fixed dark mode text */}
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            mb: "30px",
            padding: "25px 15px",
            background: isDarkMode
              ? `linear-gradient(145deg, ${colors.primary[300]}, ${colors.primary[500]})`
              : `linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(248, 247, 255, 0.9))`,
            backdropFilter: !isDarkMode && "blur(20px)",
            margin: "0 20px",
            borderRadius: "20px",
            border: !isDarkMode && `2px solid #a78bfa`,
            boxShadow: isDarkMode
              ? "inset 0 2px 4px rgba(0,0,0,0.1)"
              : "inset 0 4px 8px rgba(139, 92, 246, 0.1), 0 8px 25px rgba(139, 92, 246, 0.1)",
            position: "relative",
            overflow: "hidden",
            "&::before": !isDarkMode && {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
              `,
              pointerEvents: 'none',
              borderRadius: "18px",
            }
          }}
        >
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{
                fontSize: "1.6rem",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "8px",
                color: isDarkMode ? colors.gray[100] : undefined,
                background: !isDarkMode 
                  ? `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary})`
                  : undefined,
                backgroundClip: !isDarkMode ? "text" : undefined,
                WebkitBackgroundClip: !isDarkMode ? "text" : undefined,
                WebkitTextFillColor: !isDarkMode ? "transparent" : undefined,
                filter: !isDarkMode ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" : undefined,
                textShadow: "none"
              }}
            >
              Admin Panel
            </Typography>
            {!isDarkMode && (
              <Box
                sx={{
                  width: "60px",
                  height: "4px",
                  background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                  borderRadius: "2px",
                  margin: "0 auto",
                  boxShadow: `0 2px 8px ${themeColors.primary}40`
                }}
              />
            )}
          </Box>
        </Box>
      )}

      {/* Navigation Menu - FIXED for centered icons */}
      <Box 
        mb={5} 
        pl={collapsed ? undefined : "5%"}
        sx={{
          "& .ps-menu-button": {
            borderRadius: "15px !important",
            margin: "8px 15px !important",
            padding: "12px 18px !important",
            transition: "all 0.3s ease !important",
            border: !isDarkMode && "2px solid transparent !important",
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: collapsed ? "center !important" : "flex-start !important", // FIXED: Center icons when collapsed
            "&:hover": {
              backgroundColor: isDarkMode 
                ? `${colors.primary[300]} !important`
                : "rgba(139, 92, 246, 0.08) !important",
              borderColor: !isDarkMode && "#a78bfa !important",
              transform: "translateX(8px) scale(1.02) !important",
              boxShadow: !isDarkMode && "0 8px 25px rgba(139, 92, 246, 0.15) !important",
            }
          },
          // FIXED: Center icons in collapsed state
          "& .ps-menu-button .ps-menu-icon": {
            minWidth: collapsed ? "auto !important" : "35px !important",
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: "center !important",
            marginRight: collapsed ? "0 !important" : "10px !important",
          },
          // FIXED: Hide text in collapsed state
          "& .ps-menu-button .ps-menu-label": {
            display: collapsed ? "none !important" : "block !important",
          }
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: isDarkMode 
                  ? `${colors.greenAccent[500]} !important`
                  : "#8b5cf6 !important",
                background: "transparent !important",
                transition: "all .4s ease !important",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/dashboard"
            colors={colors}
            icon={<DashboardOutlined />}
          />

          <Typography
            variant="h6"
            sx={{ 
              m: "30px 0 20px 25px",
              fontSize: "0.85rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              opacity: 0.8,
              fontWeight: "600",
              color: isDarkMode ? colors.gray[300] : '#6b7280',
              position: "relative",
              paddingLeft: "15px",
              display: collapsed ? "none" : "block", // FIXED: Hide section title when collapsed
              "&::before": !isDarkMode && {
                content: '""',
                position: 'absolute',
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "8px",
                height: "8px",
                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
                borderRadius: "50%",
                boxShadow: `0 0 12px ${themeColors.primary}50`
              }
            }}
          >
            {!collapsed ? "Data Management" : " "}
          </Typography>

          <Item
            title="Manage Vendors"
            path="/vendors"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
          <Item
            title="Users"
            path="/users"
            colors={colors}
            icon={<ContactsOutlined />}
          />
          <Item
            title="Categories"
            path="/categories"
            colors={colors}
            icon={<CategoryOutlined />}
          />
          <Item
            title="Feedbacks"
            path="/feedbacks"
            colors={colors}
            icon={<FeedbackOutlined />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
