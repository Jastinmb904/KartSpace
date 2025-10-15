// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import {
//   Box,
//   Button,
//   IconButton,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
//   Avatar,
//   LinearProgress,
//   Tooltip,
//   Menu,
//   MenuItem,
//   Alert,
//   Skeleton,
//   Tab,
//   Tabs,
//   Stack,
//   Badge,
//   Fade,
//   Zoom,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import {
//   DownloadOutlined,
//   PersonAdd,
//   PointOfSale,
//   Traffic,
//   TrendingUp,
//   TrendingDown,
//   Refresh,
//   MoreVert,
//   ShoppingCart,
//   Store,
//   AttachMoney,
//   Group,
//   Dashboard as DashboardIcon,
//   Analytics,
//   Schedule,
//   FilterList,
//   GetApp,
//   LocalShipping,
//   Cancel,
//   CheckCircle,
//   HourglassEmpty,
//   Inventory,
//   Star,
//   Warning,
//   Info,
//   CalendarToday,
//   Settings,
// } from "@mui/icons-material";
// import {
//   PieChart as RechartsPieChart,
//   Cell,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as RechartsTooltip,
//   Legend,
//   BarChart as RechartsBarChart,
//   Bar,
//   LineChart as RechartsLineChart,
//   Line,
//   RadialBarChart,
//   RadialBar,
//   ComposedChart,
//   Pie,
// } from "recharts";
// import Assessment from '@mui/icons-material/Assessment';
// import { AdminContext } from '../../Context/Context'; // Import AdminContext

// // Default color theme fallback
// const defaultColors = {
//   primary: {
//     400: '#1e293b',
//     500: '#0f172a',
//     600: '#020617',
//     900: '#000000'
//   },
//   gray: {
//     100: '#f1f5f9',
//     300: '#cbd5e1',
//     400: '#94a3b8',
//     500: '#64748b',
//     600: '#475569'
//   },
//   blueAccent: {
//     400: '#3b82f6',
//     500: '#2563eb',
//     600: '#1d4ed8',
//     700: '#1e40af'
//   },
//   greenAccent: {
//     500: '#22c55e',
//     600: '#16a34a'
//   },
//   redAccent: {
//     500: '#ef4444'
//   },
//   yellowAccent: {
//     500: '#eab308',
//     600: '#ca8a04'
//   },
//   purpleAccent: {
//     500: '#a855f7'
//   }
// };

// function Dashboard() {
//   const theme = useTheme();
//   const { getDashboardStats } = useContext(AdminContext); // Use AdminContext

//   // Safe color access with fallback
//   const getColors = () => {
//     try {
//       // Try to use your tokens function if available
//       if (typeof tokens !== 'undefined') {
//         return tokens(theme.palette.mode);
//       }
//     } catch (error) {
//       console.warn('Tokens function not available, using default colors');
//     }
//     return defaultColors;
//   };

//   const colors = getColors();
//   const isXlDevices = useMediaQuery("(min-width: 1260px)");
//   const isMdDevices = useMediaQuery("(min-width: 724px)");
//   const isXsDevices = useMediaQuery("(max-width: 436px)");

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalVendors: 0,
//     totalRevenue: 0,
//     totalOrders: 0,
//     recentOrders: [],
//     monthlyGrowth: {
//       users: 0,
//       vendors: 0,
//       revenue: 0,
//       orders: 0,
//     },
//     topProducts: [],
//     salesTrend: [],
//     vendorStats: {
//       active: 0,
//       pending: 0,
//       suspended: 0,
//     },
//     orderStatus: {
//       pending: 0,
//       processing: 0,
//       shipped: 0,
//       delivered: 0,
//       cancelled: 0,
//     },
//     categoryStats: [],
//     revenueByMonth: [],
//     topVendors: [],
//     customerStats: {
//       new: 0,
//       returning: 0,
//       vip: 0,
//     },
//     performanceMetrics: {
//       avgOrderValue: 0,
//       conversionRate: 0,
//       customerSatisfaction: 0,
//       deliveryTime: 0,
//     }
//   });

//   const [loading, setLoading] = useState(true); // Set initial loading to true
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [alertOpen, setAlertOpen] = useState(false);

//   const fetchStats = useCallback(async () => {
//     try {
//       setRefreshing(true);
//       setLoading(true); // Set loading to true before fetching data
//       const data = await getDashboardStats(); // Fetch data from context
//       if (data.success) {
//         setStats(data.stats); // Update stats with fetched data
//         setAlertOpen(true); // Show success alert
//       } else {
//         console.error("Failed to fetch dashboard stats:", data.message);
//         // Optionally show an error message to the user
//       }
//       setLastUpdated(new Date());
//     } catch (error) {
//       console.error("Error fetching dashboard stats:", error);
//     } finally {
//       setRefreshing(false);
//       setLoading(false); // Set loading to false after fetching data
//     }
//   }, [getDashboardStats]); // Depend on getDashboardStats

//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getGrowthColor = (growth) => {
//     return growth >= 0 ? colors.greenAccent[500] : colors.redAccent[500];
//   };

//   const getGrowthIcon = (growth) => {
//     return growth >= 0 ? <TrendingUp /> : <TrendingDown />;
//   };

//   const getOrderStatusIcon = (status) => {
//     switch (status) {
//       case 'delivered': return <CheckCircle sx={{ color: colors.greenAccent[500] }} />;
//       case 'cancelled': return <Cancel sx={{ color: colors.redAccent[500] }} />;
//       case 'shipped': return <LocalShipping sx={{ color: colors.blueAccent[500] }} />;
//       case 'processing': return <HourglassEmpty sx={{ color: colors.yellowAccent[500] }} />;
//       default: return <Schedule sx={{ color: colors.gray[500] }} />;
//     }
//   };

//   // Enhanced Stat Card Component
//   const EnhancedStatCard = ({ title, value, growth, icon, color, subtitle, progress }) => (
//     <Zoom in timeout={500}>
//       <Card 
//         sx={{ 
//           bgcolor: colors.primary[400], 
//           height: '100%',
//           transition: 'all 0.3s ease',
//           '&:hover': { 
//             transform: 'translateY(-8px)',
//             boxShadow: `0 12px 24px rgba(0,0,0,0.2)`
//           },
//           border: `1px solid ${colors.primary[500]}`,
//           borderRadius: '16px',
//           overflow: 'hidden',
//           position: 'relative',
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             width: '100px',
//             height: '100px',
//             background: `linear-gradient(135deg, ${color}20, transparent)`,
//             borderRadius: '0 0 0 100px',
//           }}
//         />
//         <CardContent sx={{ position: 'relative', zIndex: 1 }}>
//           <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//             <Box flex={1}>
//               <Typography variant="h3" fontWeight="bold" color={colors.gray[100]} mb={0.5}>
//                 {typeof value === 'number' ? value.toLocaleString() : value}
//               </Typography>
//               <Typography variant="body2" color={colors.gray[300]} mb={1}>
//                 {title}
//               </Typography>
//               {subtitle && (
//                 <Typography variant="caption" color={colors.gray[400]}>
//                   {subtitle}
//                 </Typography>
//               )}
//             </Box>
//             <Avatar 
//               sx={{ 
//                 bgcolor: `${color}20`, 
//                 color: color,
//                 width: 64, 
//                 height: 64,
//                 border: `2px solid ${color}30`
//               }}
//             >
//               {icon}
//             </Avatar>
//           </Box>
          
//           <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//             <Box display="flex" alignItems="center">
//               {getGrowthIcon(growth)}
//               <Typography 
//                 variant="body2" 
//                 color={getGrowthColor(growth)}
//                 ml="4px"
//                 fontWeight="600"
//               >
//                 {Math.abs(growth)}% this month
//               </Typography>
//             </Box>
//             {progress && (
//               <Typography variant="caption" color={colors.gray[400]}>
//                 {progress}% target
//               </Typography>
//             )}
//           </Box>
          
//           <LinearProgress 
//             variant="determinate" 
//             value={progress || 75} 
//             sx={{ 
//               height: 6,
//               borderRadius: 3,
//               bgcolor: colors.primary[500],
//               '& .MuiLinearProgress-bar': { 
//                 bgcolor: color,
//                 borderRadius: 3,
//               }
//             }} 
//           />
//         </CardContent>
//       </Card>
//     </Zoom>
//   );

//   // Prepare data for the new charts
//   const prepareOrderStatusData = () => {
//     const orderData = stats.orderStatus || {};
//     const data = [
//       { name: 'Pending', value: orderData.pending || 25, color: colors.yellowAccent[500] },
//       { name: 'Processing', value: orderData.processing || 35, color: colors.blueAccent[500] },
//       { name: 'Shipped', value: orderData.shipped || 20, color: colors.purpleAccent[500] },
//       { name: 'Delivered', value: orderData.delivered || 45, color: colors.greenAccent[500] },
//       { name: 'Cancelled', value: orderData.cancelled || 8, color: colors.redAccent[500] },
//     ];
//     return data.filter(item => item.value > 0);
//   };

//   const prepareVendorStatusData = () => {
//     const vendorData = stats.vendorStats || {};
//     const data = [
//       { name: 'Active', value: vendorData.active || 85, color: colors.greenAccent[500] },
//       { name: 'Pending', value: vendorData.pending || 12, color: colors.yellowAccent[500] },
//       { name: 'Suspended', value: vendorData.suspended || 3, color: colors.redAccent[500] },
//     ];
//     return data.filter(item => item.value > 0);
//   };

//   const prepareRevenueAnalyticsData = () => {
//     const revenueData = stats.revenueByMonth || [];
//     // If no data from API, create sample data for demonstration
//     if (revenueData.length === 0) {
//       return Array.from({ length: 6 }, (_, i) => ({
//         month: new Date(2024, i + 6).toLocaleDateString('en-US', { month: 'short' }),
//         revenue: Math.floor(Math.random() * 50000) + 20000,
//         orders: Math.floor(Math.random() * 200) + 100,
//         users: Math.floor(Math.random() * 150) + 50,
//       }));
//     }
//     return revenueData;
//   };

//   console.log('Order Status Data:', prepareOrderStatusData());
//   console.log('Vendor Status Data:', prepareVendorStatusData());
//   console.log('Revenue Analytics Data:', prepareRevenueAnalyticsData());

//   if (loading) {
//     return (
//       <Box m="20px">
//         <Box display="flex" justifyContent="space-between" mb="20px">
//           <Box>
//             <Skeleton variant="text" width={200} height={40} />
//             <Skeleton variant="text" width={300} height={20} />
//           </Box>
//         </Box>
        
//         <Grid container spacing={3}>
//           {[1, 2, 3, 4].map((item) => (
//             <Grid item xs={12} sm={6} md={3} key={item}>
//               <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     );
//   }

//   return (
//     <Box m="20px">
//       {/* Enhanced Header Section */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb="30px">
//         <Box>
//           <Typography variant="h2" fontWeight="bold" color={colors.gray[100]} mb={1}>
//             ADMIN DASHBOARD
//           </Typography>
//           <Typography variant="h5" color={colors.gray[300]} mb={2}>
//             Real-time business analytics and insights
//           </Typography>
//           <Box display="flex" alignItems="center" gap={2}>
//             <Chip
//               icon={<CalendarToday fontSize="small" />}
//               label={`Last updated: ${lastUpdated.toLocaleTimeString()}`}
//               variant="outlined"
//               size="small"
//               sx={{ color: colors.gray[300], borderColor: colors.gray[600] }}
//             />
//             <Tooltip title="Refresh Data">
//               <IconButton 
//                 size="small" 
//                 onClick={fetchStats}
//                 disabled={refreshing}
//                 sx={{ 
//                   color: colors.gray[300],
//                   '&:hover': { bgcolor: colors.primary[500] }
//                 }}
//               >
//                 <Refresh sx={{ 
//                   fontSize: "20px",
//                   animation: refreshing ? 'spin 1s linear infinite' : 'none',
//                   '@keyframes spin': {
//                     '0%': { transform: 'rotate(0deg)' },
//                     '100%': { transform: 'rotate(360deg)' },
//                   }
//                 }} />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Box>
//       </Box>

//       {/* Enhanced Key Metrics */}
//       <Grid container spacing={3} mb="30px">
//         <Grid item xs={12} sm={6} md={3}>
//           <EnhancedStatCard
//             title="Total Orders"
//             value={stats.totalOrders}
//             growth={stats.monthlyGrowth?.orders ?? 0}
//             icon={<ShoppingCart />}
//             color={colors.greenAccent[500]}
//             subtitle="Active transactions"
//             progress={75}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <EnhancedStatCard
//             title="Total Revenue"
//             value={formatCurrency(stats.totalRevenue)}
//             growth={stats.monthlyGrowth?.revenue ?? 0}
//             icon={<AttachMoney />}
//             color={colors.blueAccent[500]}
//             subtitle="Net earnings"
//             progress={85}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <EnhancedStatCard
//             title="Active Vendors"
//             value={stats.totalVendors}
//             growth={stats.monthlyGrowth?.vendors ?? 0}
//             icon={<Store />}
//             color={colors.greenAccent[500]}
//             subtitle="Registered sellers"
//             progress={60}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <EnhancedStatCard
//             title="Total Users"
//             value={stats.totalUsers}
//             growth={stats.monthlyGrowth?.users ?? 0}
//             icon={<Group />}
//             color={colors.redAccent[500]}
//             subtitle="Platform members"
//             progress={90}
//           />
//         </Grid>
//       </Grid>

//     </Box>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  Alert,
  Skeleton,
  Tab,
  Tabs,
  Stack,
  Badge,
  Fade,
  Zoom,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import {
  DownloadOutlined,
  PersonAdd,
  PointOfSale,
  Traffic,
  TrendingUp,
  TrendingDown,
  Refresh,
  MoreVert,
  ShoppingCart,
  Store,
  AttachMoney,
  Group,
  Dashboard as DashboardIcon,
  Analytics,
  Schedule,
  FilterList,
  GetApp,
  LocalShipping,
  Cancel,
  CheckCircle,
  HourglassEmpty,
  Inventory,
  Star,
  Warning,
  Info,
  CalendarToday,
  Settings,
  Assessment,
  LocalMall,
  CardGiftcard,
  AccountBalance,
} from "@mui/icons-material";
import { AdminContext } from '../../Context/Context';
import Swal from 'sweetalert2';


// Tokens function for theme colors
const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        gray: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#4d4d4d",
          700: "#333333",
          800: "#1a1a1a",
          900: "#0f0f0f",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        gray: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});


// Enhanced Stat Card Component with Professional Design
const EnhancedStatCard = React.memo(({ title, value, growth, icon, color, subtitle, progress, index, themeColors, isDarkMode, colors, isRefreshing }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  const getGrowthColor = (growth) => {
    return growth >= 0 ? themeColors.success : themeColors.error;
  };


  const getGrowthIcon = (growth) => {
    return growth >= 0 ? <TrendingUp /> : <TrendingDown />;
  };
  
  return (
    <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
      <Card
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        sx={{
          height: 280, // Increased height for bigger cards
          background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
          backdropFilter: 'blur(15px)',
          border: `2px solid ${isCardHovered ? themeColors.border.hover : themeColors.border.default}`,
          borderRadius: 6, // More rounded corners for professional look
          overflow: 'hidden',
          position: 'relative',
          transform: isCardHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)', // Enhanced hover effect
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: isCardHovered 
            ? isDarkMode
              ? `0 25px 50px -12px ${colors.primary[900]}60`
              : '0 25px 50px rgba(139, 92, 246, 0.25), 0 15px 25px rgba(139, 92, 246, 0.15)'
            : isDarkMode
              ? `0 15px 35px ${colors.primary}50`
              : '0 15px 35px rgba(167, 139, 250, 0.15), 0 8px 20px rgba(167, 139, 250, 0.08)',
          backgroundImage: !isDarkMode && `
            radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.9) 0%, transparent 20%),
            radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.7) 0%, transparent 20%),
            radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.95) 0%, transparent 20%)
          `,
          animation: isRefreshing ? 'blink 0.6s ease-in-out infinite' : 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px', // Slightly thicker top border
            background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
            animation: 'shimmer 2.5s ease-in-out infinite',
          },
          '@keyframes blink': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.3 },
            '100%': { opacity: 1 }
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '-200% 0' },
            '100%': { backgroundPosition: '200% 0' }
          }
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 1, p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={3}>
            <Box flex={1}>
              <Typography 
                variant="h2" 
                fontWeight="bold" 
                sx={{
                  color: themeColors.text.primary,
                  mb: 1,
                  fontSize: '2.5rem', // Larger font size
                  background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                  backgroundClip: !isDarkMode && 'text',
                  textFillColor: !isDarkMode && 'transparent',
                  WebkitBackgroundClip: !isDarkMode && 'text',
                  WebkitTextFillColor: !isDarkMode && 'transparent',
                }}
              >
                {typeof value === 'number' ? value.toLocaleString() : value}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: themeColors.text.secondary,
                  mb: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '1.1rem' // Larger subtitle
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: themeColors.text.secondary,
                    fontSize: '0.95rem'
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            <Avatar
              sx={{
                bgcolor: `${themeColors.primary}20`,
                width: 80, // Larger avatar
                height: 80,
                border: `3px solid ${themeColors.primary}40`,
                animation: 'bounce 2s ease-in-out infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-4px)' },
                  '60%': { transform: 'translateY(-2px)' }
                }
              }}
            >
              {React.cloneElement(icon, { 
                sx: { 
                  color: themeColors.primary, 
                  fontSize: 40 // Larger icon
                } 
              })}
            </Avatar>
          </Box>
          
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center">
              {React.cloneElement(getGrowthIcon(growth), {
                sx: { fontSize: 20, color: getGrowthColor(growth) }
              })}
              <Typography 
                variant="body1" 
                sx={{
                  color: getGrowthColor(growth),
                  ml: 1,
                  fontWeight: 700,
                  fontSize: '1rem'
                }}
              >
                {growth > 0 ? '+' : ''}{growth}% this month
              </Typography>
            </Box>
            {progress && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: themeColors.text.secondary,
                  fontWeight: 500
                }}
              >
                {progress}% target
              </Typography>
            )}
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={progress || 75} 
            sx={{ 
              height: 10, // Thicker progress bar
              borderRadius: 5,
              bgcolor: `${themeColors.primary}25`,
              '& .MuiLinearProgress-bar': { 
                bgcolor: themeColors.primary,
                borderRadius: 5,
                background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight})`,
              }
            }} 
          />
        </CardContent>
      </Card>
    </Fade>
  );
});


function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === 'dark';
  const { getDashboardStats } = useContext(AdminContext);


  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");


  // Shopping icons for background animation (only in light mode)
  const shoppingIcons = [
    { Icon: DashboardIcon, delay: '0s', duration: '12s', x: '8%', y: '15%' },
    { Icon: Analytics, delay: '3s', duration: '15s', x: '85%', y: '25%' },
    { Icon: Store, delay: '1s', duration: '18s', x: '10%', y: '70%' },
    { Icon: ShoppingCart, delay: '4s', duration: '14s', x: '80%', y: '65%' },
    { Icon: LocalMall, delay: '6s', duration: '16s', x: '15%', y: '45%' },
    { Icon: CardGiftcard, delay: '2s', duration: '20s', x: '75%', y: '35%' },
  ];


  // Define consistent color scheme matching other components
  const themeColors = useMemo(() => ({
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    text: {
      primary: isDarkMode ? colors.gray[100] : '#1f2937',
      secondary: isDarkMode ? colors.gray : '#6b7280',
      accent: isDarkMode ? colors.gray : '#374151',
    },
    background: {
      primary: isDarkMode ? colors.primary : 'rgba(254, 252, 255, 0.95)',
      secondary: isDarkMode ? colors.primary : 'rgba(250, 249, 255, 0.95)',
      hover: isDarkMode ? colors.primary : 'rgba(139, 92, 246, 0.05)',
    },
    border: {
      default: isDarkMode ? colors.primary : '#a78bfa',
      hover: isDarkMode ? colors.primary : '#8b5cf6',
    },
    success: isDarkMode ? colors.greenAccent : '#10b981',
    warning: isDarkMode ? '#fbbf24' : '#f59e0b',
    error: isDarkMode ? colors.redAccent : '#ef4444',
    info: isDarkMode ? colors.blueAccent : '#3b82f6',
  }), [isDarkMode, colors]);


  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalRevenue: 0,
    totalOrders: 0,
    monthlyGrowth: {
      users: 0,
      vendors: 0,
      revenue: 0,
      orders: 0,
    },
  });


  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');


  // Calculate Platform Revenue (5% of total revenue)
  const platformRevenue = useMemo(() => {
    return (stats.totalRevenue || 0) * 0.05;
  }, [stats.totalRevenue]);


  const fetchStats = useCallback(async () => {
    try {
      console.log('Fetching dashboard stats...');
      setRefreshing(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (getDashboardStats) {
        const data = await getDashboardStats();
        console.log('API Response:', data);
        
        if (data && data.success && data.stats) {
          setStats({
            totalUsers: data.stats.totalUsers || 0,
            totalVendors: data.stats.totalVendors || 0,
            totalRevenue: data.stats.totalRevenue || 0,
            totalOrders: data.stats.totalOrders || 0,
            monthlyGrowth: {
              users: data.stats.monthlyGrowth?.users || 12.5,
              vendors: data.stats.monthlyGrowth?.vendors || 8.3,
              revenue: data.stats.monthlyGrowth?.revenue || 15.7,
              orders: data.stats.monthlyGrowth?.orders || 18.9,
            }
          });
          
          setAlertMessage(`Dashboard data refreshed successfully! Last update: ${new Date().toLocaleTimeString()}`);
          setAlertSeverity('success');
          setAlertOpen(true);
          console.log('Stats updated successfully with API data');
        } else {
          console.error("API returned invalid data:", data?.message || 'Invalid response structure');
          setAlertMessage(`Failed to fetch dashboard stats: ${data?.message || 'Invalid response from server'}`);
          setAlertSeverity('error');
          setAlertOpen(true);
        }
      } else {
        console.warn('getDashboardStats function not available in context');
        setAlertMessage('Dashboard stats service is not available. Please check your connection.');
        setAlertSeverity('warning');
        setAlertOpen(true);
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setAlertMessage(`Error fetching dashboard stats: ${error.message || 'Network error'}`);
      setAlertSeverity('error');
      setAlertOpen(true);
      setLastUpdated(new Date());
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [getDashboardStats]);


  useEffect(() => {
    console.log('Dashboard mounted, attempting initial data fetch...');
    fetchStats();
  }, [fetchStats]);


  const handleRefresh = useCallback(() => {
    console.log('Manual refresh triggered');
    fetchStats();
  }, [fetchStats]);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };


  if (loading) {
    return (
      <Box 
        sx={{
          m: "20px",
          position: 'relative',
          minHeight: '100vh',
          '& *': {
            scrollbarWidth: 'none !important',
            msOverflowStyle: 'none !important',
            '&::-webkit-scrollbar': {
              display: 'none !important',
            },
          },
        }}
      >
        <Slide direction="down" in={true} timeout={800}>
          <Box display="flex" justifyContent="space-between" mb="20px">
            <Box>
              <Skeleton 
                variant="text" 
                width={300} 
                height={50} 
                sx={{ 
                  bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`,
                  borderRadius: 2 
                }} 
              />
              <Skeleton 
                variant="text" 
                width={400} 
                height={30} 
                sx={{ 
                  bgcolor: isDarkMode ? `${colors.primary}40` : `${themeColors.primary}20`,
                  borderRadius: 2 
                }} 
              />
            </Box>
          </Box>
        </Slide>
        
        <Grid container spacing={4}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <Fade in={true} timeout={800} style={{ transitionDelay: `${item * 200}ms` }}>
                <Skeleton 
                  variant="rectangular" 
                  height={280} 
                  sx={{ 
                    borderRadius: 6,
                    bgcolor: isDarkMode ? `${colors.primary[600]}40` : `${themeColors.primary}20`
                  }} 
                />
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }


  return (
    <Box 
      sx={{
        m: "20px",
        position: 'relative',
        minHeight: '85vh',
        '& *': {
          scrollbarWidth: 'none !important',
          msOverflowStyle: 'none !important',
          '&::-webkit-scrollbar': {
            display: 'none !important',
          },
        },
        '&::before': !isDarkMode && {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
            linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
          `,
          zIndex: -2,
          pointerEvents: 'none',
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
      }}
    >
      {/* Animated Background Icons (only in light mode) */}
      {!isDarkMode && shoppingIcons.map((item, index) => {
        const animationType = index % 2 === 0 ? 'floatUpDown' : 'floatLeftRight';
        
        return (
          <item.Icon
            key={index}
            sx={{
              position: 'fixed',
              left: item.x,
              top: item.y,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: 'rgba(139, 92, 246, 0.08)',
              animation: `${animationType} ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
              zIndex: -1,
              pointerEvents: 'none',
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}


      {/* Enhanced Header Section */}
      <Slide direction="down" in={true} timeout={800}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="30px">
          <Box>
            <Typography 
              variant="h2" 
              fontWeight="bold" 
              sx={{ 
                color: themeColors.text.primary,
                mb: 1,
                background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                backgroundClip: !isDarkMode && 'text',
                textFillColor: !isDarkMode && 'transparent',
                WebkitBackgroundClip: !isDarkMode && 'text',
                WebkitTextFillColor: !isDarkMode && 'transparent',
              }}
            >
              ADMIN DASHBOARD
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: themeColors.text.secondary, 
                mb: 2,
                fontWeight: 500
              }}
            >
              Real-time business analytics and insights
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Chip
                icon={<CalendarToday fontSize="small" />}
                label={`Last updated: ${lastUpdated.toLocaleTimeString()}`}
                variant="outlined"
                size="small"
                sx={{ 
                  color: themeColors.text.secondary, 
                  borderColor: themeColors.border.default,
                  backgroundColor: `${themeColors.primary}10`,
                  '&:hover': {
                    backgroundColor: `${themeColors.primary}20`,
                    borderColor: themeColors.border.hover
                  }
                }}
              />
              <Tooltip title="Refresh Data">
                <IconButton 
                  size="small" 
                  onClick={handleRefresh}
                  disabled={refreshing}
                  sx={{ 
                    color: themeColors.text.secondary,
                    backgroundColor: `${themeColors.primary}15`,
                    border: `1px solid ${themeColors.border.default}`,
                    '&:hover': { 
                      bgcolor: `${themeColors.primary}25`,
                      borderColor: themeColors.border.hover,
                      transform: 'scale(1.05)'
                    },
                    '&:disabled': {
                      backgroundColor: `${themeColors.primary}10`,
                      borderColor: themeColors.border.default,
                      color: themeColors.text.secondary,
                      opacity: 0.7
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Refresh sx={{ 
                    fontSize: "20px",
                    animation: refreshing ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    }
                  }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Slide>


      {/* Alert Messages */}
      {alertOpen && (
        <Fade in={alertOpen} timeout={500}>
          <Alert
            severity={alertSeverity}
            onClose={() => setAlertOpen(false)}
            sx={{
              mb: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${
                alertSeverity === 'success' ? themeColors.success + '30' :
                alertSeverity === 'error' ? themeColors.error + '30' :
                alertSeverity === 'warning' ? themeColors.warning + '30' :
                themeColors.info + '30'
              }`,
              color: themeColors.text.primary,
              '& .MuiAlert-icon': {
                color: 
                  alertSeverity === 'success' ? themeColors.success :
                  alertSeverity === 'error' ? themeColors.error :
                  alertSeverity === 'warning' ? themeColors.warning :
                  themeColors.info
              },
            }}
          >
            {alertMessage}
          </Alert>
        </Fade>
      )}


      {/* Professional Cards Layout - 2 Cards Per Row */}
      <Grid container spacing={4} mb="30px">
        <Grid item xs={12} md={6}>
          <EnhancedStatCard
            title="Total Orders"
            value={stats.totalOrders}
            growth={stats.monthlyGrowth?.orders ?? 18.9}
            icon={<ShoppingCart />}
            color={themeColors.success}
            subtitle="Active transactions"
            progress={75}
            index={0}
            themeColors={themeColors}
            isDarkMode={isDarkMode}
            colors={colors}
            isRefreshing={refreshing}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <EnhancedStatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            growth={stats.monthlyGrowth?.revenue ?? 15.7}
            icon={<AttachMoney />}
            color={themeColors.info}
            subtitle="Net earnings"
            progress={85}
            index={1}
            themeColors={themeColors}
            isDarkMode={isDarkMode}
            colors={colors}
            isRefreshing={refreshing}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <EnhancedStatCard
            title="Active Vendors"
            value={stats.totalVendors}
            growth={stats.monthlyGrowth?.vendors ?? 8.3}
            icon={<Store />}
            color={themeColors.warning}
            subtitle="Registered sellers"
            progress={60}
            index={2}
            themeColors={themeColors}
            isDarkMode={isDarkMode}
            colors={colors}
            isRefreshing={refreshing}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <EnhancedStatCard
            title="Total Users"
            value={stats.totalUsers}
            growth={stats.monthlyGrowth?.users ?? 12.5}
            icon={<Group />}
            color={themeColors.primary}
            subtitle="Platform members"
            progress={90}
            index={3}
            themeColors={themeColors}
            isDarkMode={isDarkMode}
            colors={colors}
            isRefreshing={refreshing}
          />
        </Grid>
        
        {/* Platform Revenue Card - Centered on its own row */}
        <Grid item xs={12} md={6} sx={{ mx: 'auto' }}>
          <EnhancedStatCard
            title="Platform Revenue"
            value={formatCurrency(platformRevenue)}
            growth={stats.monthlyGrowth?.revenue ?? 15.7}
            icon={<AccountBalance />}
            color="#22c55e"
            subtitle="5% of total revenue"
            progress={95}
            index={4}
            themeColors={{
              ...themeColors,
              primary: '#22c55e',
              primaryLight: '#4ade80',
              primaryDark: '#16a34a',
            }}
            isDarkMode={isDarkMode}
            colors={colors}
            isRefreshing={refreshing}
          />
        </Grid>
      </Grid>
    </Box>
  );
}


export default Dashboard;
