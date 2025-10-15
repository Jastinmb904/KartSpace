
// import { useState, useEffect, useCallback, useContext, useMemo, memo } from 'react';
// import {
//   Box,
//   Button,
//   IconButton,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Card,
//   CardContent,
//   Skeleton,
//   Alert,
//   Tooltip,  
//   Stack,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
//   Badge,
//   Fade,
//   LinearProgress,
//   Paper,
//   Avatar,
//   Slide,
// } from "@mui/material";
// import {
//   DownloadOutlined,
//   PointOfSale,
//   Refresh,
//   Inventory,
//   ShoppingCart,
//   Feedback,
//   LocalShipping,
//   Cancel,
//   CheckCircle,
//   HourglassEmpty,
//   Star,
//   CalendarToday,
//   PieChart as PieChartIcon,
//   TrendingUp,
//   TrendingDown,
//   Store,
//   LocalMall,
//   CardGiftcard,
//   AccountBalance,
// } from "@mui/icons-material";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
// import { Header, StatBox } from "../../components";
// import { tokens } from "../../theme";
// import { VendorContext } from "../../Context/Context";
// import { cloneElement } from 'react';


// // MEMOIZED STAT CARD COMPONENT - Prevents unnecessary re-renders
// const EnhancedStatCard = memo(({ title, subtitle, value, icon, progress, increase, trend, color, index, themeColors, isDarkMode, colors }) => {
//   const isPositiveTrend = trend === 'up';
//   // Each card has its own isolated hover state
//   const [isCardHovered, setIsCardHovered] = useState(false);
  
//   return (
//     <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
//       <Card
//         onMouseEnter={() => setIsCardHovered(true)}
//         onMouseLeave={() => setIsCardHovered(false)}
//         sx={{
//           height: '100%',
//           background: isDarkMode 
//             ? `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[500]} 100%)`
//             : `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//           backdropFilter: 'blur(10px)',
//           border: `2px solid ${isCardHovered ? themeColors.border.hover : themeColors.border.default}`,
//           borderRadius: 4,
//           overflow: 'hidden',
//           position: 'relative',
//           transform: isCardHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
//           transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//           boxShadow: isCardHovered 
//             ? isDarkMode
//               ? `0 20px 40px -12px ${color}40`
//               : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
//             : isDarkMode
//               ? `0 10px 30px ${colors.primary[900]}40`
//               : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
//           backgroundImage: !isDarkMode && `
//             radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//             radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
//             radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
//           `,
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//             animation: 'shimmer 2s ease-in-out infinite',
//           },
//           '@keyframes shimmer': {
//             '0%': { backgroundPosition: '-200% 0' },
//             '100%': { backgroundPosition: '200% 0' }
//           }
//         }}
//       >
//         <CardContent sx={{ p: 3, height: '100%' }}>
//           <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
//             <Box>
//               <Typography 
//                 variant="h4" 
//                 sx={{ 
//                   fontWeight: 700,
//                   color: themeColors.text.primary,
//                   mb: 0.5,
//                   fontSize: '1.8rem',
//                   background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
//                   backgroundClip: !isDarkMode && 'text',
//                   textFillColor: !isDarkMode && 'transparent',
//                   WebkitBackgroundClip: !isDarkMode && 'text',
//                   WebkitTextFillColor: !isDarkMode && 'transparent',
//                 }}
//               >
//                 {value}
//               </Typography>
//               <Typography 
//                 variant="body2" 
//                 sx={{ 
//                   color: themeColors.text.secondary,
//                   fontWeight: 500,
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.5px'
//                 }}
//               >
//                 {subtitle}
//               </Typography>
//             </Box>
//             <Avatar
//               sx={{
//                 bgcolor: isDarkMode ? `${color}20` : `${themeColors.primary}15`,
//                 width: 56,
//                 height: 56,
//                 border: isDarkMode ? `2px solid ${color}30` : `2px solid ${themeColors.primary}30`,
//                 animation: 'bounce 2s ease-in-out infinite',
//                 '@keyframes bounce': {
//                   '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
//                   '40%': { transform: 'translateY(-3px)' },
//                   '60%': { transform: 'translateY(-2px)' }
//                 }
//               }}
//             >
//               {cloneElement(icon, { 
//                 sx: { 
//                   color: isDarkMode ? color : themeColors.primary, 
//                   fontSize: 28 
//                 } 
//               })}
//             </Avatar>
//           </Box>


//           <Box mb={2}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//               <Typography 
//                 variant="caption" 
//                 color={themeColors.text.secondary}
//               >
//                 Progress
//               </Typography>
//               <Typography 
//                 variant="caption" 
//                 color={themeColors.text.secondary}
//               >
//                 {Math.round(progress * 100)}%
//               </Typography>
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress * 100}
//               sx={{
//                 height: 6,
//                 borderRadius: 3,
//                 bgcolor: isDarkMode ? colors.primary[600] : `${themeColors.primary}20`,
//                 '& .MuiLinearProgress-bar': {
//                   bgcolor: isDarkMode ? color : themeColors.primary,
//                   borderRadius: 3,
//                 }
//               }}
//             />
//           </Box>


//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: themeColors.text.accent,
//                 fontWeight: 500
//               }}
//             >
//               {increase}
//             </Typography>
//             <Box 
//               display="flex" 
//               alignItems="center" 
//               gap={0.5}
//               sx={{
//                 color: isPositiveTrend ? themeColors.success : themeColors.error
//               }}
//             >
//               {isPositiveTrend ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
//               <Typography variant="caption" sx={{ fontWeight: 600 }}>
//                 {isPositiveTrend ? '+14%' : '-5%'}
//               </Typography>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </Fade>
//   );
// });


// // MEMOIZED PIE CHART COMPONENT
// const PieChartCard = memo(({ themeColors, isDarkMode, colors, orders, loading, pieChartData, CustomTooltip }) => {
//   const [pieChartHovered, setPieChartHovered] = useState(false);


//   return (
//     <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
//       <Card
//         onMouseEnter={() => setPieChartHovered(true)}
//         onMouseLeave={() => setPieChartHovered(false)}
//         sx={{
//           height: '100%',
//           background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//           backdropFilter: 'blur(10px)',
//           border: `2px solid ${pieChartHovered ? themeColors.border.hover : themeColors.border.default}`,
//           borderRadius: 4,
//           overflow: 'hidden',
//           position: 'relative',
//           transform: pieChartHovered ? 'translateY(-4px)' : 'translateY(0)',
//           transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//           boxShadow: pieChartHovered 
//             ? isDarkMode
//               ? `0 20px 40px -12px ${colors.primary[900]}60`
//               : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
//             : isDarkMode
//               ? undefined
//               : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
//           backgroundImage: !isDarkMode && `
//             radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//             radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
//             radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
//           `,
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//             animation: 'shimmer 2s ease-in-out infinite',
//           },
//         }}
//       >
//         <CardContent sx={{ p: 3, height: '100%' }}>
//           <Box
//             display="flex"
//             alignItems="center"
//             gap={1}
//             mb={3}
//             pb={2}
//             borderBottom={`2px solid ${themeColors.border.default}`}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: `${themeColors.primary}15`,
//                 width: 40,
//                 height: 40,
//                 border: `2px solid ${themeColors.primary}30`,
//               }}
//             >
//               <PieChartIcon 
//                 sx={{ 
//                   color: themeColors.primary
//                 }} 
//               />
//             </Avatar>
//             <Typography 
//               color={themeColors.text.primary} 
//               variant="h5" 
//               fontWeight="600"
//             >
//               Order Status Distribution
//             </Typography>
//           </Box>


//           {loading ? (
//             <Box display="flex" justifyContent="center" alignItems="center" height={300}>
//               <Skeleton 
//                 variant="circular" 
//                 width={200} 
//                 height={200}
//                 sx={{
//                   bgcolor: `${themeColors.primary}20`,
//                 }}
//               />
//             </Box>
//           ) : orders.length === 0 ? (
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               height={300}
//               gap={2}
//             >
//               <PieChartIcon
//                 sx={{
//                   fontSize: 48,
//                   color: themeColors.text.secondary,
//                   opacity: 0.5
//                 }}
//               />
//               <Typography 
//                 color={themeColors.text.secondary} 
//                 textAlign="center"
//               >
//                 No order data to display
//               </Typography>
//             </Box>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieChartData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   innerRadius={40}
//                   paddingAngle={5}
//                   dataKey="value"
//                   animationBegin={0}
//                   animationDuration={800}
//                 >
//                   {pieChartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <RechartsTooltip content={<CustomTooltip />} />
//                 <Legend
//                   verticalAlign="bottom"
//                   height={36}
//                   iconType="circle"
//                   wrapperStyle={{
//                     color: themeColors.text.primary,
//                     fontSize: '12px'
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>
//     </Slide>
//   );
// });


// // MEMOIZED ORDERS CARD COMPONENT
// const OrdersCard = memo(({ themeColors, isDarkMode, colors, orders, loading, formatCurrency }) => {
//   const [ordersCardHovered, setOrdersCardHovered] = useState(false);


//   return (
//     <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
//       <Card
//         onMouseEnter={() => setOrdersCardHovered(true)}
//         onMouseLeave={() => setOrdersCardHovered(false)}
//         sx={{
//           height: '100%',
//           background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
//           backdropFilter: 'blur(10px)',
//           border: `2px solid ${ordersCardHovered ? themeColors.border.hover : themeColors.border.default}`,
//           borderRadius: 4,
//           overflow: 'hidden',
//           position: 'relative',
//           transform: ordersCardHovered ? 'translateY(-4px)' : 'translateY(0)',
//           transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//           boxShadow: ordersCardHovered 
//             ? isDarkMode
//               ? `0 20px 40px -12px ${colors.primary[900]}60`
//               : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
//             : isDarkMode
//               ? undefined
//               : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
//           backgroundImage: !isDarkMode && `
//             radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 0.8) 0%, transparent 20%),
//             radial-gradient(circle at 80% 80%, rgba(237, 233, 254, 0.6) 0%, transparent 20%),
//             radial-gradient(circle at 40% 40%, rgba(250, 245, 255, 0.9) 0%, transparent 20%)
//           `,
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
//             animation: 'shimmer 2s ease-in-out infinite',
//           },
//         }}
//       >
//         <Box
//           p={3}
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           borderBottom={`2px solid ${themeColors.border.default}`}
//           sx={{
//             position: 'sticky',
//             top: 0,
//             bgcolor: 'inherit',
//             zIndex: 1
//           }}
//         >
//           <Box display="flex" alignItems="center" gap={1}>
//             <Avatar
//               sx={{
//                 bgcolor: `${themeColors.primary}15`,
//                 width: 40,
//                 height: 40,
//                 border: `2px solid ${themeColors.primary}30`,
//               }}
//             >
//               <ShoppingCart 
//                 sx={{ 
//                   color: themeColors.primary
//                 }} 
//               />
//             </Avatar>
//             <Typography 
//               color={themeColors.text.primary} 
//               variant="h5" 
//               fontWeight="600"
//             >
//               Recent Orders
//             </Typography>
//           </Box>
//           <Chip
//             label={`${orders.length} Total`}
//             size="small"
//             sx={{
//               bgcolor: `${themeColors.primary}15`,
//               color: themeColors.primary,
//               fontWeight: 600,
//               border: `1px solid ${themeColors.primary}30`
//             }}
//           />
//         </Box>


//         <CardContent sx={{ p: 0, height: 'calc(100% - 80px)', overflow: 'auto' }}>
//           {loading ? (
//             <Box p={2}>
//               {[...Array(5)].map((_, index) => (
//                 <Skeleton
//                   key={index}
//                   height={80}
//                   sx={{
//                     my: 1,
//                     transform: 'scale(1, 0.8)',
//                     borderRadius: 1,
//                     bgcolor: `${themeColors.primary}20`,
//                   }}
//                 />
//               ))}
//             </Box>
//           ) : orders.length === 0 ? (
//             <Box
//               p={4}
//               textAlign="center"
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: 2,
//                 height: '100%',
//                 justifyContent: 'center'
//               }}
//             >
//               <ShoppingCart
//                 sx={{
//                   fontSize: 48,
//                   color: themeColors.text.secondary,
//                   opacity: 0.5
//                 }}
//               />
//               <Typography 
//                 color={themeColors.text.secondary}
//               >
//                 No orders yet
//               </Typography>
//             </Box>
//           ) : (
//             <List sx={{ p: 0 }}>
//               {orders.slice(0, 5).map((order, index) => (
//                 <ListItem
//                   key={order._id}
//                   divider={index !== orders.length - 1}
//                   sx={{
//                     py: 2,
//                     px: 3,
//                     transition: 'all 0.2s ease',
//                     '&:hover': {
//                       bgcolor: themeColors.background.hover,
//                       transform: 'scale(1.01)'
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={
//                       <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Box display="flex" alignItems="center" gap={1}>
//                           <Typography
//                             variant="subtitle1"
//                             color={themeColors.text.primary}
//                             sx={{ fontWeight: 600 }}
//                           >
//                             #{order._id}
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             sx={{ 
//                               fontStyle: 'italic',
//                               fontWeight: "bold",
//                               color: themeColors.warning,
//                               fontSize: 14,
//                               textTransform: 'uppercase'
//                             }}
//                           >
//                             {order.customer?.name || 'Customer'}
//                           </Typography>
//                         </Box>
//                         <Typography
//                           variant="subtitle1"
//                           color={themeColors.success}
//                           sx={{ fontWeight: 600 }}
//                         >
//                           {formatCurrency(order.totalAmount)}
//                         </Typography>
//                       </Box>
//                     }
//                     secondary={
//                       <Box display="flex" alignItems="center" gap={2} mt={1}>
//                         <Chip
//                           size="small"
//                           label={(order.orderStatus || order.status || 'pending').toUpperCase()}
//                           icon={
//                             order.status === 'delivered' ? <CheckCircle /> :
//                             order.status === 'shipped' ? <LocalShipping /> :
//                             order.status === 'cancelled' ? <Cancel /> :
//                             <HourglassEmpty />
//                           }
//                           sx={{
//                             bgcolor: 
//                               order.status === 'delivered' 
//                                 ? `${themeColors.success}20`
//                                 : order.status === 'shipped' 
//                                   ? `${themeColors.info}20`
//                                   : order.status === 'cancelled' 
//                                     ? `${themeColors.error}20`
//                                     : `${themeColors.text.secondary}20`,
//                             color: 
//                               order.status === 'delivered' 
//                                 ? themeColors.success
//                                 : order.status === 'shipped' 
//                                   ? themeColors.info
//                                   : order.status === 'cancelled' 
//                                     ? themeColors.error
//                                     : themeColors.text.secondary,
//                             '& .MuiChip-icon': {
//                               color: 'inherit'
//                             }
//                           }}
//                         />
//                         <Box
//                           display="flex"
//                           alignItems="center"
//                           gap={0.5}
//                           sx={{
//                             color: themeColors.text.secondary,
//                             '& svg': { fontSize: 14 }
//                           }}
//                         >
//                           <CalendarToday />
//                           {new Date(order.createdAt).toLocaleDateString(undefined, {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </Box>
//                       </Box>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </CardContent>
//       </Card>
//     </Slide>
//   );
// });


// function Dashboard() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const isXlDevices = useMediaQuery("(min-width: 1260px)");
//   const isMdDevices = useMediaQuery("(min-width: 724px)");
//   const isDarkMode = theme.palette.mode === 'dark';


//   const {
//     products,
//     orders,
//     feedbacks,
//     getProducts,
//     getOrders,
//     getFeedbacks,
//     loading,
//   } = useContext(VendorContext);


//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const [alertOpen, setAlertOpen] = useState(false);


//   // Shopping icons for background animation (only in light mode)
//   const shoppingIcons = [
//     { Icon: ShoppingCart, delay: '0s', duration: '8s', x: '5%', y: '10%' },
//     { Icon: Store, delay: '2s', duration: '10s', x: '90%', y: '15%' },
//     { Icon: LocalMall, delay: '1s', duration: '12s', x: '15%', y: '75%' },
//     { Icon: Inventory, delay: '3s', duration: '9s', x: '85%', y: '70%' },
//     { Icon: CardGiftcard, delay: '4s', duration: '11s', x: '10%', y: '45%' },
//     { Icon: PointOfSale, delay: '5s', duration: '7s', x: '80%', y: '35%' },
//   ];


//   // Define consistent color scheme matching sidebar - MEMOIZED
//   const themeColors = useMemo(() => ({
//     primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
//     primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
//     primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
//     text: {
//       primary: isDarkMode ? colors.gray[100] : '#1f2937',
//       secondary: isDarkMode ? colors.gray[300] : '#6b7280',
//       accent: isDarkMode ? colors.gray[200] : '#374151',
//     },
//     background: {
//       primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
//       secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
//       hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
//     },
//     border: {
//       default: isDarkMode ? colors.primary[600] : '#a78bfa',
//       hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
//     },
//     success: isDarkMode ? colors.greenAccent[500] : '#10b981',
//     warning: isDarkMode ? '#fbbf24' : '#f59e0b',
//     error: isDarkMode ? colors.redAccent[500] : '#ef4444',
//     info: isDarkMode ? colors.blueAccent[500] : '#3b82f6',
//   }), [isDarkMode, colors]);


//   const fetchData = useCallback(async () => {
//     try {
//       setRefreshing(true);
//       await Promise.all([getProducts(), getOrders(), getFeedbacks()]);
//       setLastUpdated(new Date());
//       setAlertOpen(true);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);


//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);


//   // Calculate metrics - MEMOIZED
//   // ✅ CORRECT - Only count revenue when money is actually received
// // ✅ CORRECT - Only count revenue when money is actually received
// // ✅ FIXED - Properly handles UPI orders with exact field matching
// // ✅ FIXED - Properly includes UPI orders that are both paid and delivered
// const metrics = useMemo(() => {
//     let totalRevenue = 0;
    
//     orders.forEach((order) => {
//         // For COD orders: Only count if delivered
//         if (order.paymentMethod?.toLowerCase() === 'cod') {
//             if (order.orderStatus?.toLowerCase() === 'delivered') {
//                 totalRevenue += order.totalAmount;
//             }
//         }
//         // For UPI orders: Count if delivered (since they show "Paid" in UI)
//         else if (order.paymentMethod?.toLowerCase() === 'upi') {
//             if (order.orderStatus?.toLowerCase() === 'delivered') {
//                 totalRevenue += order.totalAmount;
//                 console.log('✅ Added UPI revenue:', order.totalAmount);
//             }
//         }
//     });

//     const avgRating = feedbacks.length > 0
//         ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length
//         : 0;
    
//     return {
//         totalRevenue,
//         avgRating: avgRating.toFixed(1),
//         pendingOrders: orders.filter(order => 
//             order.status?.toLowerCase() === 'pending' || 
//             order.orderStatus?.toLowerCase() === 'pending'
//         ).length,
//         activeProducts: products.filter(product => product.status === 'active').length,
//     };
// }, [orders, feedbacks, products]);


//  // ✅ This will now be correct since totalRevenue is fixed
// const platformFeesPaid = useMemo(() => {
//     return (metrics.totalRevenue || 0) * 0.05;
// }, [metrics.totalRevenue]);



//   // Prepare pie chart data - MEMOIZED
//   const pieChartData = useMemo(() => {
//     const statusCounts = orders.reduce((acc, order) => {
//       const status = order.orderStatus || order.status || 'pending';
//       acc[status] = (acc[status] || 0) + 1;
//       return acc;
//     }, {});


//     const chartColors = {
//       delivered: themeColors.success,
//       shipped: themeColors.info,
//       cancelled: themeColors.error,
//       pending: themeColors.text.secondary,
//     };


//     return Object.entries(statusCounts).map(([status, count]) => ({
//       name: status.charAt(0).toUpperCase() + status.slice(1),
//       value: count,
//       color: chartColors[status] || themeColors.text.secondary,
//     }));
//   }, [orders, themeColors]);


//   const formatCurrency = useCallback((amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(amount);
//   }, []);


//   const CustomTooltip = useCallback(({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0];
//       return (
//         <Box
//           sx={{
//             bgcolor: themeColors.background.primary,
//             backdropFilter: 'blur(10px)',
//             p: 1.5,
//             borderRadius: 2,
//             border: `2px solid ${themeColors.border.default}`,
//             boxShadow: isDarkMode 
//               ? `0 4px 12px ${colors.primary[900]}40`
//               : '0 4px 12px rgba(139, 92, 246, 0.15)',
//           }}
//         >
//           <Typography 
//             variant="body2" 
//             color={themeColors.text.primary}
//             fontWeight={600}
//           >
//             {data.name}: {data.value} order{data.value !== 1 ? 's' : ''}
//           </Typography>
//           <Typography 
//             variant="caption" 
//             color={themeColors.text.secondary}
//           >
//             {((data.value / orders.length) * 100).toFixed(1)}% of total
//           </Typography>
//         </Box>
//       );
//     }
//     return null;
//   }, [themeColors, isDarkMode, colors, orders.length]);


//   return (
//     <Box 
//       sx={{
//         m: "20px",
//         position: 'relative',
//         minHeight: '100vh',
//         '&::before': !isDarkMode && {
//           content: '""',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: `
//             radial-gradient(circle at 20% 50%, #f3e8ff 0%, transparent 50%),
//             radial-gradient(circle at 80% 20%, #e0e7ff 0%, transparent 50%),
//             radial-gradient(circle at 40% 80%, #ddd6fe 0%, transparent 50%),
//             linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)
//           `,
//           zIndex: -2,
//           pointerEvents: 'none',
//         },
//         '@keyframes floatUpDown': {
//           '0%': { transform: 'translateY(0px) rotate(0deg)' },
//           '25%': { transform: 'translateY(-15px) rotate(5deg)' },
//           '50%': { transform: 'translateY(-30px) rotate(-3deg)' },
//           '75%': { transform: 'translateY(-15px) rotate(8deg)' },
//           '100%': { transform: 'translateY(0px) rotate(0deg)' }
//         },
//         '@keyframes floatLeftRight': {
//           '0%': { transform: 'translateX(0px) rotate(0deg)' },
//           '33%': { transform: 'translateX(20px) rotate(10deg)' },
//           '66%': { transform: 'translateX(-10px) rotate(-5deg)' },
//           '100%': { transform: 'translateX(0px) rotate(0deg)' }
//         },
//         '@keyframes pulse': {
//           '0%': { opacity: 0.3, transform: 'scale(1)' },
//           '50%': { opacity: 0.6, transform: 'scale(1.1)' },
//           '100%': { opacity: 0.3, transform: 'scale(1)' }
//         }
//       }}
//     >
//       {/* Animated Background Icons (only in light mode) */}
//       {!isDarkMode && shoppingIcons.map((item, index) => {
//         const animationType = index % 3 === 0 ? 'floatUpDown' : 
//                             index % 3 === 1 ? 'floatLeftRight' : 'pulse';
        
//         return (
//           <item.Icon
//             key={index}
//             sx={{
//               position: 'fixed',
//               left: item.x,
//               top: item.y,
//               fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
//               color: 'rgba(139, 92, 246, 0.08)',
//               animation: `${animationType} ${item.duration} ease-in-out infinite`,
//               animationDelay: item.delay,
//               zIndex: -1,
//               pointerEvents: 'none',
//               filter: 'blur(0.5px)',
//             }}
//           />
//         );
//       })}


//       <Fade in={alertOpen} timeout={1000}>
//         <Alert
//           severity="success"
//           sx={{ 
//             mb: 2,
//             borderRadius: 3,
//             border: `2px solid ${themeColors.success}30`,
//             background: themeColors.background.primary,
//             backdropFilter: 'blur(10px)',
//             color: themeColors.text.primary,
//             '& .MuiAlert-icon': {
//               color: themeColors.success
//             },
//             '& .MuiAlert-message': {
//               color: themeColors.text.primary
//             }
//           }}
//           onClose={() => setAlertOpen(false)}
//         >
//           Dashboard updated successfully
//         </Alert>
//       </Fade>


//       <Slide direction="down" in={true} timeout={800}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <Box>
//             <Typography 
//               variant="h2" 
//               color={themeColors.text.primary}
//               fontWeight="bold" 
//               sx={{ mb: "5px" }}
//             >
//               DASHBOARD
//             </Typography>
//             <Typography 
//               variant="h5" 
//               color={themeColors.primary}
//               fontWeight={500}
//             >
//               Welcome to your vendor dashboard
//             </Typography>
//           </Box>
//           <Tooltip title={`Last updated: ${lastUpdated.toLocaleTimeString()}`}>
//             <Button
//               onClick={fetchData}
//               startIcon={<Refresh sx={{ color: 'white' }} />}
//               disabled={refreshing}
//               variant="contained"
//               sx={{
//                 backgroundColor: themeColors.primary,
//                 borderRadius: 3,
//                 py: 1.5,
//                 px: 3,
//                 fontWeight: 600,
//                 textTransform: 'none',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                 boxShadow: `0 4px 15px ${themeColors.primary}40`,
//                 color: 'white',
//                 '&::before': !isDarkMode && {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: '-100%',
//                   width: '100%',
//                   height: '100%',
//                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
//                   transition: 'left 0.6s',
//                 },
//                 '&:hover': { 
//                   backgroundColor: themeColors.primaryDark,
//                   transform: 'translateY(-2px) scale(1.02)',
//                   boxShadow: `0 8px 25px ${themeColors.primaryDark}60`,
//                   '&::before': !isDarkMode && {
//                     left: '100%',
//                   },
//                 },
//                 '&:active': {
//                   transform: 'translateY(0) scale(0.98)',
//                 },
//                 '&:disabled': {
//                   backgroundColor: `${themeColors.primary}60`,
//                   color: 'rgba(255, 255, 255, 0.7)',
//                 },
//               }}
//             >
//               {refreshing ? 'Refreshing...' : 'Refresh'}
//             </Button>
//           </Tooltip>
//         </Box>
//       </Slide>


//       <Box
//         display="grid"
//         gridTemplateColumns={
//           isXlDevices
//             ? "repeat(15, 1fr)"
//             : isMdDevices
//             ? "repeat(6, 1fr)"
//             : "repeat(3, 1fr)"
//         }
//         gap="20px"
//       >
//         {/* MEMOIZED STAT CARDS - NO MORE BLINKING */}
//         {loading ? (
//           [...Array(5)].map((_, index) => (
//             <Box key={index} gridColumn="span 3">
//               <Card 
//                 sx={{ 
//                   height: 200, 
//                   bgcolor: themeColors.background.primary,
//                   borderRadius: 4,
//                   border: `2px solid ${themeColors.border.default}`,
//                 }}
//               >
//                 <CardContent>
//                   <Skeleton 
//                     variant="rectangular" 
//                     height={160}
//                     sx={{
//                       bgcolor: `${themeColors.primary}20`,
//                       borderRadius: 2
//                     }}
//                   />
//                 </CardContent>
//               </Card>
//             </Box>
//           ))
//         ) : (
//           <>
//             <Box gridColumn="span 3">
//               <EnhancedStatCard
//                 value={products.length.toString()}
//                 subtitle="Total Products"
//                 progress={metrics.activeProducts / (products.length || 1)}
//                 increase={`${metrics.activeProducts} Active`}
//                 icon={<Inventory />}
//                 trend="up"
//                 color={themeColors.success}
//                 index={0}
//                 themeColors={themeColors}
//                 isDarkMode={isDarkMode}
//                 colors={colors}
//               />
//             </Box>


//             <Box gridColumn="span 3">
//               <EnhancedStatCard
//                 value={orders.length.toString()}
//                 subtitle="Total Orders"
//                 progress={1 - (metrics.pendingOrders / (orders.length || 1))}
//                 increase={`${metrics.pendingOrders} Pending`}
//                 icon={<ShoppingCart />}
//                 trend="up"
//                 color={themeColors.info}
//                 index={1}
//                 themeColors={themeColors}
//                 isDarkMode={isDarkMode}
//                 colors={colors}
//               />
//             </Box>


//             <Box gridColumn="span 3">
//               <EnhancedStatCard
//                 value={metrics.avgRating}
//                 subtitle="Average Rating"
//                 progress={metrics.avgRating / 5}
//                 increase={`${feedbacks.length} Reviews`}
//                 icon={<Star />}
//                 trend="up"
//                 color={themeColors.warning}
//                 index={2}
//                 themeColors={themeColors}
//                 isDarkMode={isDarkMode}
//                 colors={colors}
//               />
//             </Box>


//             <Box gridColumn="span 3">
//               <EnhancedStatCard
//                 value={formatCurrency(metrics.totalRevenue)}
//                 subtitle="Total Revenue"
//                 progress={0.75}
//                 increase="This Month"
//                 icon={<PointOfSale />}
//                 trend="up"
//                 color={themeColors.success}
//                 index={3}
//                 themeColors={themeColors}
//                 isDarkMode={isDarkMode}
//                 colors={colors}
//               />
//             </Box>

//             {/* Platform Fees Paid Card */}
//             <Box gridColumn="span 3">
//               <EnhancedStatCard
//                 value={formatCurrency(platformFeesPaid)}
//                 subtitle="Platform Fees Paid"
//                 progress={0.95}
//                 increase="5% of revenue"
//                 icon={<AccountBalance />}
//                 trend="up"
//                 color={themeColors.error}
//                 index={4}
//                 themeColors={{
//                   ...themeColors,
//                   primary: themeColors.error,
//                   primaryLight: '#f87171',
//                   primaryDark: '#dc2626',
//                 }}
//                 isDarkMode={isDarkMode}
//                 colors={colors}
//               />
//             </Box>
//           </>
//         )}


//         {/* MEMOIZED PIE CHART - NO INTERFERENCE */}
//         <Box gridColumn={isXlDevices ? "span 6" : "span 6"} gridRow="span 2">
//           <PieChartCard
//             themeColors={themeColors}
//             isDarkMode={isDarkMode}
//             colors={colors}
//             orders={orders}
//             loading={loading}
//             pieChartData={pieChartData}
//             CustomTooltip={CustomTooltip}
//           />
//         </Box>


//         {/* MEMOIZED ORDERS CARD - NO INTERFERENCE */}
//         <Box gridColumn={isXlDevices ? "span 9" : "span 6"} gridRow="span 2">
//           <OrdersCard
//             themeColors={themeColors}
//             isDarkMode={isDarkMode}
//             colors={colors}
//             orders={orders}
//             loading={loading}
//             formatCurrency={formatCurrency}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// }


// export default Dashboard;







import { useState, useEffect, useCallback, useContext, useMemo, memo } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Skeleton,
  Alert,
  Tooltip,  
  Stack,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Badge,
  Fade,
  LinearProgress,
  Paper,
  Avatar,
  Slide,
} from "@mui/material";
import {
  DownloadOutlined,
  PointOfSale,
  Refresh,
  Inventory,
  ShoppingCart,
  Feedback,
  LocalShipping,
  Cancel,
  CheckCircle,
  HourglassEmpty,
  Star,
  CalendarToday,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  Store,
  LocalMall,
  CardGiftcard,
  AccountBalance,
} from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Header, StatBox } from "../../components";
import { tokens } from "../../theme";
import { VendorContext } from "../../Context/Context";
import { cloneElement } from 'react';


// MEMOIZED STAT CARD COMPONENT - Prevents unnecessary re-renders
const EnhancedStatCard = memo(({ title, subtitle, value, icon, progress, increase, trend, color, index, themeColors, isDarkMode, colors }) => {
  const isPositiveTrend = trend === 'up';
  // Each card has its own isolated hover state
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  return (
    <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
      <Card
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        sx={{
          height: '100%',
          background: isDarkMode 
            ? `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[500]} 100%)`
            : `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
          backdropFilter: 'blur(10px)',
          border: `2px solid ${isCardHovered ? themeColors.border.hover : themeColors.border.default}`,
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          transform: isCardHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: isCardHovered 
            ? isDarkMode
              ? `0 20px 40px -12px ${color}40`
              : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
            : isDarkMode
              ? `0 10px 30px ${colors.primary[900]}40`
              : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
          backgroundImage: !isDarkMode && `
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
            background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
            animation: 'shimmer 2s ease-in-out infinite',
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '-200% 0' },
            '100%': { backgroundPosition: '200% 0' }
          }
        }}
      >
        <CardContent sx={{ p: 3, height: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: themeColors.text.primary,
                  mb: 0.5,
                  fontSize: '1.8rem',
                  background: !isDarkMode && `linear-gradient(135deg, ${themeColors.primaryDark}, ${themeColors.primary}, ${themeColors.primaryLight})`,
                  backgroundClip: !isDarkMode && 'text',
                  textFillColor: !isDarkMode && 'transparent',
                  WebkitBackgroundClip: !isDarkMode && 'text',
                  WebkitTextFillColor: !isDarkMode && 'transparent',
                }}
              >
                {value}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: themeColors.text.secondary,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {subtitle}
              </Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: isDarkMode ? `${color}20` : `${themeColors.primary}15`,
                width: 56,
                height: 56,
                border: isDarkMode ? `2px solid ${color}30` : `2px solid ${themeColors.primary}30`,
                animation: 'bounce 2s ease-in-out infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-3px)' },
                  '60%': { transform: 'translateY(-2px)' }
                }
              }}
            >
              {cloneElement(icon, { 
                sx: { 
                  color: isDarkMode ? color : themeColors.primary, 
                  fontSize: 28 
                } 
              })}
            </Avatar>
          </Box>


          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography 
                variant="caption" 
                color={themeColors.text.secondary}
              >
                Progress
              </Typography>
              <Typography 
                variant="caption" 
                color={themeColors.text.secondary}
              >
                {Math.round(progress * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: isDarkMode ? colors.primary[600] : `${themeColors.primary}20`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: isDarkMode ? color : themeColors.primary,
                  borderRadius: 3,
                }
              }}
            />
          </Box>


          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography 
              variant="body2" 
              sx={{ 
                color: themeColors.text.accent,
                fontWeight: 500
              }}
            >
              {increase}
            </Typography>
            <Box 
              display="flex" 
              alignItems="center" 
              gap={0.5}
              sx={{
                color: isPositiveTrend ? themeColors.success : themeColors.error
              }}
            >
              {isPositiveTrend ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {isPositiveTrend ? '+14%' : '-5%'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
});


// MEMOIZED PIE CHART COMPONENT
const PieChartCard = memo(({ themeColors, isDarkMode, colors, orders, loading, pieChartData, CustomTooltip }) => {
  const [pieChartHovered, setPieChartHovered] = useState(false);


  return (
    <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
      <Card
        onMouseEnter={() => setPieChartHovered(true)}
        onMouseLeave={() => setPieChartHovered(false)}
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
          backdropFilter: 'blur(10px)',
          border: `2px solid ${pieChartHovered ? themeColors.border.hover : themeColors.border.default}`,
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          transform: pieChartHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: pieChartHovered 
            ? isDarkMode
              ? `0 20px 40px -12px ${colors.primary[900]}60`
              : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
            : isDarkMode
              ? undefined
              : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
          backgroundImage: !isDarkMode && `
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
            background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
            animation: 'shimmer 2s ease-in-out infinite',
          },
        }}
      >
        <CardContent sx={{ p: 3, height: '100%' }}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            mb={3}
            pb={2}
            borderBottom={`2px solid ${themeColors.border.default}`}
          >
            <Avatar
              sx={{
                bgcolor: `${themeColors.primary}15`,
                width: 40,
                height: 40,
                border: `2px solid ${themeColors.primary}30`,
              }}
            >
              <PieChartIcon 
                sx={{ 
                  color: themeColors.primary
                }} 
              />
            </Avatar>
            <Typography 
              color={themeColors.text.primary} 
              variant="h5" 
              fontWeight="600"
            >
              Order Status Distribution
            </Typography>
          </Box>


          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
              <Skeleton 
                variant="circular" 
                width={200} 
                height={200}
                sx={{
                  bgcolor: `${themeColors.primary}20`,
                }}
              />
            </Box>
          ) : orders.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height={300}
              gap={2}
            >
              <PieChartIcon
                sx={{
                  fontSize: 48,
                  color: themeColors.text.secondary,
                  opacity: 0.5
                }}
              />
              <Typography 
                color={themeColors.text.secondary} 
                textAlign="center"
              >
                No order data to display
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    color: themeColors.text.primary,
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </Slide>
  );
});


// MEMOIZED ORDERS CARD COMPONENT
const OrdersCard = memo(({ themeColors, isDarkMode, colors, orders, loading, formatCurrency }) => {
  const [ordersCardHovered, setOrdersCardHovered] = useState(false);


  return (
    <Slide direction="up" in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
      <Card
        onMouseEnter={() => setOrdersCardHovered(true)}
        onMouseLeave={() => setOrdersCardHovered(false)}
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${themeColors.background.primary} 0%, ${themeColors.background.secondary} 100%)`,
          backdropFilter: 'blur(10px)',
          border: `2px solid ${ordersCardHovered ? themeColors.border.hover : themeColors.border.default}`,
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          transform: ordersCardHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: ordersCardHovered 
            ? isDarkMode
              ? `0 20px 40px -12px ${colors.primary[900]}60`
              : '0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
            : isDarkMode
              ? undefined
              : '0 10px 30px rgba(167, 139, 250, 0.1), 0 5px 15px rgba(167, 139, 250, 0.05)',
          backgroundImage: !isDarkMode && `
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
            background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.primaryLight}, ${themeColors.primaryDark})`,
            animation: 'shimmer 2s ease-in-out infinite',
          },
        }}
      >
        <Box
          p={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`2px solid ${themeColors.border.default}`}
          sx={{
            position: 'sticky',
            top: 0,
            bgcolor: 'inherit',
            zIndex: 1
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              sx={{
                bgcolor: `${themeColors.primary}15`,
                width: 40,
                height: 40,
                border: `2px solid ${themeColors.primary}30`,
              }}
            >
              <ShoppingCart 
                sx={{ 
                  color: themeColors.primary
                }} 
              />
            </Avatar>
            <Typography 
              color={themeColors.text.primary} 
              variant="h5" 
              fontWeight="600"
            >
              Recent Orders
            </Typography>
          </Box>
          <Chip
            label={`${orders.length} Total`}
            size="small"
            sx={{
              bgcolor: `${themeColors.primary}15`,
              color: themeColors.primary,
              fontWeight: 600,
              border: `1px solid ${themeColors.primary}30`
            }}
          />
        </Box>


        <CardContent sx={{ p: 0, height: 'calc(100% - 80px)', overflow: 'auto' }}>
          {loading ? (
            <Box p={2}>
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  height={80}
                  sx={{
                    my: 1,
                    transform: 'scale(1, 0.8)',
                    borderRadius: 1,
                    bgcolor: `${themeColors.primary}20`,
                  }}
                />
              ))}
            </Box>
          ) : orders.length === 0 ? (
            <Box
              p={4}
              textAlign="center"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                height: '100%',
                justifyContent: 'center'
              }}
            >
              <ShoppingCart
                sx={{
                  fontSize: 48,
                  color: themeColors.text.secondary,
                  opacity: 0.5
                }}
              />
              <Typography 
                color={themeColors.text.secondary}
              >
                No orders yet
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {orders.slice(0, 5).map((order, index) => (
                <ListItem
                  key={order._id}
                  divider={index !== orders.length - 1}
                  sx={{
                    py: 2,
                    px: 3,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: themeColors.background.hover,
                      transform: 'scale(1.01)'
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography
                            variant="subtitle1"
                            color={themeColors.text.primary}
                            sx={{ fontWeight: 600 }}
                          >
                            #{order._id}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ 
                              fontStyle: 'italic',
                              fontWeight: "bold",
                              color: themeColors.warning,
                              fontSize: 14,
                              textTransform: 'uppercase'
                            }}
                          >
                            {order.customer?.name || 'Customer'}
                          </Typography>
                        </Box>
                        <Typography
                          variant="subtitle1"
                          color={themeColors.success}
                          sx={{ fontWeight: 600 }}
                        >
                          {formatCurrency(order.totalAmount)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <Chip
                          size="small"
                          label={(order.orderStatus || order.status || 'pending').toUpperCase()}
                          icon={
                            order.status === 'delivered' ? <CheckCircle /> :
                            order.status === 'shipped' ? <LocalShipping /> :
                            order.status === 'cancelled' ? <Cancel /> :
                            <HourglassEmpty />
                          }
                          sx={{
                            bgcolor: 
                              order.status === 'delivered' 
                                ? `${themeColors.success}20`
                                : order.status === 'shipped' 
                                  ? `${themeColors.info}20`
                                  : order.status === 'cancelled' 
                                    ? `${themeColors.error}20`
                                    : `${themeColors.text.secondary}20`,
                            color: 
                              order.status === 'delivered' 
                                ? themeColors.success
                                : order.status === 'shipped' 
                                  ? themeColors.info
                                  : order.status === 'cancelled' 
                                    ? themeColors.error
                                    : themeColors.text.secondary,
                            '& .MuiChip-icon': {
                              color: 'inherit'
                            }
                          }}
                        />
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                          sx={{
                            color: themeColors.text.secondary,
                            '& svg': { fontSize: 14 }
                          }}
                        >
                          <CalendarToday />
                          {new Date(order.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Slide>
  );
});


function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isDarkMode = theme.palette.mode === 'dark';


  const {
    products,
    orders,
    feedbacks,
    getProducts,
    getOrders,
    getFeedbacks,
    loading,
  } = useContext(VendorContext);


  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);


  // Shopping icons for background animation (only in light mode)
  const shoppingIcons = [
    { Icon: ShoppingCart, delay: '0s', duration: '8s', x: '5%', y: '10%' },
    { Icon: Store, delay: '2s', duration: '10s', x: '90%', y: '15%' },
    { Icon: LocalMall, delay: '1s', duration: '12s', x: '15%', y: '75%' },
    { Icon: Inventory, delay: '3s', duration: '9s', x: '85%', y: '70%' },
    { Icon: CardGiftcard, delay: '4s', duration: '11s', x: '10%', y: '45%' },
    { Icon: PointOfSale, delay: '5s', duration: '7s', x: '80%', y: '35%' },
  ];


  // Define consistent color scheme matching sidebar - MEMOIZED
  const themeColors = useMemo(() => ({
    primary: isDarkMode ? '#8b5cf6' : '#8b5cf6',
    primaryLight: isDarkMode ? '#a78bfa' : '#a78bfa',
    primaryDark: isDarkMode ? '#7c3aed' : '#7c3aed',
    text: {
      primary: isDarkMode ? colors.gray[100] : '#1f2937',
      secondary: isDarkMode ? colors.gray[300] : '#6b7280',
      accent: isDarkMode ? colors.gray[200] : '#374151',
    },
    background: {
      primary: isDarkMode ? colors.primary[400] : 'rgba(254, 252, 255, 0.95)',
      secondary: isDarkMode ? colors.primary[500] : 'rgba(250, 249, 255, 0.95)',
      hover: isDarkMode ? colors.primary[600] : 'rgba(139, 92, 246, 0.05)',
    },
    border: {
      default: isDarkMode ? colors.primary[600] : '#a78bfa',
      hover: isDarkMode ? colors.primary[500] : '#8b5cf6',
    },
    success: isDarkMode ? colors.greenAccent[500] : '#10b981',
    warning: isDarkMode ? '#fbbf24' : '#f59e0b',
    error: isDarkMode ? colors.redAccent[500] : '#ef4444',
    info: isDarkMode ? colors.blueAccent[500] : '#3b82f6',
  }), [isDarkMode, colors]);


  const fetchData = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([getProducts(), getOrders(), getFeedbacks()]);
      setLastUpdated(new Date());
      setAlertOpen(true);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData]);


  // Calculate metrics - MEMOIZED
  // ✅ CORRECT - Only count revenue when money is actually received
// ✅ CORRECT - Only count revenue when money is actually received
// ✅ FIXED - Properly handles UPI orders with exact field matching
// ✅ FIXED - Properly includes UPI orders that are both paid and delivered
// ✅ CORRECT REVENUE CALCULATION - Fixed Dashboard Logic
// ✅ CORRECT FRONTEND REVENUE CALCULATION
const metrics = useMemo(() => {
    let totalRevenue = 0;
    
    orders.forEach((order) => {
        // ✅ ONLY skip approved returns (where customer got refund)
        if (order.returnStatus === 'approved') {
            console.log(`❌ SKIPPING APPROVED RETURN: ₹${order.totalAmount}`);
            return; // Don't count this order
        }
        
        // ✅ Include rejected returns and normal orders
        if (order.returnStatus === 'rejected') {
            console.log(`✅ INCLUDING REJECTED RETURN: ₹${order.totalAmount}`);
        }
        
        // ✅ Include normal orders with no return status
        if (!order.returnStatus) {
            console.log(`✅ INCLUDING NORMAL ORDER: ₹${order.totalAmount}`);
        }
        
        // Count revenue for delivered orders (COD and UPI)
        if (order.paymentMethod?.toLowerCase() === 'cod') {
            if (order.orderStatus?.toLowerCase() === 'delivered') {
                totalRevenue += order.totalAmount;
            }
        }
        else if (order.paymentMethod?.toLowerCase() === 'upi') {
            if (order.orderStatus?.toLowerCase() === 'delivered') {
                totalRevenue += order.totalAmount;
            }
        }
    });

    const avgRating = feedbacks.length > 0
        ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length
        : 0;
    
    return {
        totalRevenue,
        avgRating: avgRating.toFixed(1),
        pendingOrders: orders.filter(order => 
            order.status?.toLowerCase() === 'pending' || 
            order.orderStatus?.toLowerCase() === 'pending'
        ).length,
        activeProducts: products.filter(product => product.status === 'active').length,
    };
}, [orders, feedbacks, products]);




 // ✅ This will now be correct since totalRevenue is fixed
const platformFeesPaid = useMemo(() => {
    return (metrics.totalRevenue || 0) * 0.05;
}, [metrics.totalRevenue]);



  // Prepare pie chart data - MEMOIZED
  const pieChartData = useMemo(() => {
    const statusCounts = orders.reduce((acc, order) => {
      const status = order.orderStatus || order.status || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});


    const chartColors = {
      delivered: themeColors.success,
      shipped: themeColors.info,
      cancelled: themeColors.error,
      pending: themeColors.text.secondary,
    };


    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: chartColors[status] || themeColors.text.secondary,
    }));
  }, [orders, themeColors]);


  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);


  const CustomTooltip = useCallback(({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <Box
          sx={{
            bgcolor: themeColors.background.primary,
            backdropFilter: 'blur(10px)',
            p: 1.5,
            borderRadius: 2,
            border: `2px solid ${themeColors.border.default}`,
            boxShadow: isDarkMode 
              ? `0 4px 12px ${colors.primary[900]}40`
              : '0 4px 12px rgba(139, 92, 246, 0.15)',
          }}
        >
          <Typography 
            variant="body2" 
            color={themeColors.text.primary}
            fontWeight={600}
          >
            {data.name}: {data.value} order{data.value !== 1 ? 's' : ''}
          </Typography>
          <Typography 
            variant="caption" 
            color={themeColors.text.secondary}
          >
            {((data.value / orders.length) * 100).toFixed(1)}% of total
          </Typography>
        </Box>
      );
    }
    return null;
  }, [themeColors, isDarkMode, colors, orders.length]);


  return (
    <Box 
      sx={{
        m: "20px",
        position: 'relative',
        minHeight: '100vh',
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
        '@keyframes pulse': {
          '0%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.1)' },
          '100%': { opacity: 0.3, transform: 'scale(1)' }
        }
      }}
    >
      {/* Animated Background Icons (only in light mode) */}
      {!isDarkMode && shoppingIcons.map((item, index) => {
        const animationType = index % 3 === 0 ? 'floatUpDown' : 
                            index % 3 === 1 ? 'floatLeftRight' : 'pulse';
        
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


      <Fade in={alertOpen} timeout={1000}>
        <Alert
          severity="success"
          sx={{ 
            mb: 2,
            borderRadius: 3,
            border: `2px solid ${themeColors.success}30`,
            background: themeColors.background.primary,
            backdropFilter: 'blur(10px)',
            color: themeColors.text.primary,
            '& .MuiAlert-icon': {
              color: themeColors.success
            },
            '& .MuiAlert-message': {
              color: themeColors.text.primary
            }
          }}
          onClose={() => setAlertOpen(false)}
        >
          Dashboard updated successfully
        </Alert>
      </Fade>


      <Slide direction="down" in={true} timeout={800}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography 
              variant="h2" 
              color={themeColors.text.primary}
              fontWeight="bold" 
              sx={{ mb: "5px" }}
            >
              DASHBOARD
            </Typography>
            <Typography 
              variant="h5" 
              color={themeColors.primary}
              fontWeight={500}
            >
              Welcome to your vendor dashboard
            </Typography>
          </Box>
          <Tooltip title={`Last updated: ${lastUpdated.toLocaleTimeString()}`}>
            <Button
              onClick={fetchData}
              startIcon={<Refresh sx={{ color: 'white' }} />}
              disabled={refreshing}
              variant="contained"
              sx={{
                backgroundColor: themeColors.primary,
                borderRadius: 3,
                py: 1.5,
                px: 3,
                fontWeight: 600,
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: `0 4px 15px ${themeColors.primary}40`,
                color: 'white',
                '&::before': !isDarkMode && {
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
                  backgroundColor: themeColors.primaryDark,
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: `0 8px 25px ${themeColors.primaryDark}60`,
                  '&::before': !isDarkMode && {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(0) scale(0.98)',
                },
                '&:disabled': {
                  backgroundColor: `${themeColors.primary}60`,
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Tooltip>
        </Box>
      </Slide>


      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(15, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gap="20px"
      >
        {/* MEMOIZED STAT CARDS - NO MORE BLINKING */}
        {loading ? (
          [...Array(5)].map((_, index) => (
            <Box key={index} gridColumn="span 3">
              <Card 
                sx={{ 
                  height: 200, 
                  bgcolor: themeColors.background.primary,
                  borderRadius: 4,
                  border: `2px solid ${themeColors.border.default}`,
                }}
              >
                <CardContent>
                  <Skeleton 
                    variant="rectangular" 
                    height={160}
                    sx={{
                      bgcolor: `${themeColors.primary}20`,
                      borderRadius: 2
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          <>
            <Box gridColumn="span 3">
              <EnhancedStatCard
                value={products.length.toString()}
                subtitle="Total Products"
                progress={metrics.activeProducts / (products.length || 1)}
                increase={`${metrics.activeProducts} Active`}
                icon={<Inventory />}
                trend="up"
                color={themeColors.success}
                index={0}
                themeColors={themeColors}
                isDarkMode={isDarkMode}
                colors={colors}
              />
            </Box>


            <Box gridColumn="span 3">
              <EnhancedStatCard
                value={orders.length.toString()}
                subtitle="Total Orders"
                progress={1 - (metrics.pendingOrders / (orders.length || 1))}
                increase={`${metrics.pendingOrders} Pending`}
                icon={<ShoppingCart />}
                trend="up"
                color={themeColors.info}
                index={1}
                themeColors={themeColors}
                isDarkMode={isDarkMode}
                colors={colors}
              />
            </Box>


            <Box gridColumn="span 3">
              <EnhancedStatCard
                value={metrics.avgRating}
                subtitle="Average Rating"
                progress={metrics.avgRating / 5}
                increase={`${feedbacks.length} Reviews`}
                icon={<Star />}
                trend="up"
                color={themeColors.warning}
                index={2}
                themeColors={themeColors}
                isDarkMode={isDarkMode}
                colors={colors}
              />
            </Box>


            <Box gridColumn="span 3">
              <EnhancedStatCard
                value={formatCurrency(metrics.totalRevenue)}
                subtitle="Total Revenue"
                progress={0.75}
                increase="This Month"
                icon={<PointOfSale />}
                trend="up"
                color={themeColors.success}
                index={3}
                themeColors={themeColors}
                isDarkMode={isDarkMode}
                colors={colors}
              />
            </Box>

            {/* Platform Fees Paid Card */}
            <Box gridColumn="span 3">
              <EnhancedStatCard
                value={formatCurrency(platformFeesPaid)}
                subtitle="Platform Fees Paid"
                progress={0.95}
                increase="5% of revenue"
                icon={<AccountBalance />}
                trend="up"
                color={themeColors.error}
                index={4}
                themeColors={{
                  ...themeColors,
                  primary: themeColors.error,
                  primaryLight: '#f87171',
                  primaryDark: '#dc2626',
                }}
                isDarkMode={isDarkMode}
                colors={colors}
              />
            </Box>
          </>
        )}


        {/* MEMOIZED PIE CHART - NO INTERFERENCE */}
        <Box gridColumn={isXlDevices ? "span 6" : "span 6"} gridRow="span 2">
          <PieChartCard
            themeColors={themeColors}
            isDarkMode={isDarkMode}
            colors={colors}
            orders={orders}
            loading={loading}
            pieChartData={pieChartData}
            CustomTooltip={CustomTooltip}
          />
        </Box>


        {/* MEMOIZED ORDERS CARD - NO INTERFERENCE */}
        <Box gridColumn={isXlDevices ? "span 9" : "span 6"} gridRow="span 2">
          <OrdersCard
            themeColors={themeColors}
            isDarkMode={isDarkMode}
            colors={colors}
            orders={orders}
            loading={loading}
            formatCurrency={formatCurrency}
          />
        </Box>
      </Box>
    </Box>
  );
}


export default Dashboard;







// const metrics = useMemo(() => {
//     let totalRevenue = 0;
    
//     console.log('🔍 DEBUGGING REVENUE CALCULATION');
//     console.log('Total orders:', orders.length);
    
//     orders.forEach((order) => {
//         console.log(`Order ${order._id}:`, {
//             returnStatus: order.returnStatus,
//             orderStatus: order.orderStatus,
//             paymentMethod: order.paymentMethod,
//             totalAmount: order.totalAmount
//         });
        
//         // Skip returned orders from revenue calculation
//         if (order.returnStatus === 'approved') {
//             console.log(`❌ SKIPPING APPROVED RETURN: ${order._id}`);
//             return; // Don't count this order
//         }
        
//         if (order.paymentMethod?.toLowerCase() === 'cod') {
//             if (order.orderStatus?.toLowerCase() === 'delivered') {
//                 totalRevenue += order.totalAmount;
//                 console.log(`✅ ADDED COD: ₹${order.totalAmount}, Total now: ₹${totalRevenue}`);
//             }
//         }
//         else if (order.paymentMethod?.toLowerCase() === 'upi') {
//             if (order.orderStatus?.toLowerCase() === 'delivered') {
//                 totalRevenue += order.totalAmount;
//                 console.log(`✅ ADDED UPI: ₹${order.totalAmount}, Total now: ₹${totalRevenue}`);
//             }
//         }
//     });

//     console.log(`🎯 FINAL TOTAL REVENUE: ₹${totalRevenue}`);

//     const avgRating = feedbacks.length > 0
//         ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length
//         : 0;
    
//     return {
//         totalRevenue,
//         avgRating: avgRating.toFixed(1),
//         pendingOrders: orders.filter(order => 
//             order.status?.toLowerCase() === 'pending' || 
//             order.orderStatus?.toLowerCase() === 'pending'
//         ).length,
//         activeProducts: products.filter(product => product.status === 'active').length,
//     };
// }, [orders, feedbacks, products]);