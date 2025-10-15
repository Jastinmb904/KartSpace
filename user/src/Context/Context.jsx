

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { config } from "../Config/Config";
// import { useNavigate } from "react-router-dom";

// export const userContext = createContext();

// export default function UserContextProvider(props) {
//     const { host } = config;
//     const [user, setUser] = useState({});
//     const [state, setState] = useState(false);
//     const [nutritionists, setNutritionists] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [orders, setOrders] = useState([]);

//     const navigate = useNavigate();

//     // ✅ HELPER FUNCTION - Add this at the top
//     const getToken = () => {
//         return localStorage.getItem("userToken") || localStorage.getItem("authToken");
//     };

//     // ✅ UPDATED - Check for both token types
//     useEffect(() => {
//         const userToken = localStorage.getItem("userToken");
//         const authToken = localStorage.getItem("authToken");
//         const userData = localStorage.getItem("currentUser");
        
//         if (userToken || authToken) {
//             if (userData) {
//                 try {
//                     const parsedUser = JSON.parse(userData);
//                     setUser({ token: userToken || authToken, ...parsedUser });
//                 } catch (error) {
//                     setUser({ token: userToken || authToken });
//                 }
//             } else {
//                 setUser({ token: userToken || authToken });
//             }
//         }
//     }, [state]);

//     const LoginUser = (data) => {
//         axios.post(`${host}/customer/login`, data)
//             .then((res) => {
//                 if (res.data.success) {
//                     localStorage.setItem("userToken", res.data.token);
                    
//                     // ✅ ADD THESE LINES TO SAVE USER DATA
//                     if (res.data.user) {
//                         localStorage.setItem("currentUser", JSON.stringify(res.data.user));
//                         setUser(res.data.user);
//                     } else {
//                         // If backend doesn't return user data, create user object from email
//                         const userData = {
//                             id: 'user_' + Date.now(), // temporary ID
//                             name: data.email.split('@')[0], // extract name from email
//                             email: data.email,
//                             profileImage: '',
//                             provider: 'email'
//                         };
//                         localStorage.setItem("currentUser", JSON.stringify(userData));
//                         setUser(userData);
//                     }
                    
//                     setState(!state);
//                     Swal.fire("Success", "You will be redirected to the Home", "success");
//                     setTimeout(() => {
//                         navigate("/home");
//                     }, 1000);
//                 } else {
//                     Swal.fire("Error", res.data.message, "error");
//                 }
//             })
//             .catch((err) => {
//                 Swal.fire("Error Login Failed", err.response?.data?.message || "Check Your Login Details", "error");
//             });
//     };

//     // 🆕 ORIGINAL REGISTER FUNCTION (KEEP AS BACKUP)
//     const RegisterUser = (data) => {
//         axios.post(`${host}/customer/Register`, data)
//         .then((res) => {
//             if (res.data.success) {
//                 Swal.fire({
//                     title: "Success!",
//                     text: "Registration successful! Please login.",
//                     icon: "success"
//                 });
//                 navigate("/login");
//             } else {
//                 Swal.fire({
//                     title: "Error!",
//                     text: res.data.message,
//                     icon: "error"
//                 });
//             }
//         })
//         .catch((err) => {
//             Swal.fire({
//                 title: "Error!",
//                 text: err.response?.data?.message || "Registration failed",
//                 icon: "error"
//             });
//         });
//     };

//     // 🆕 NEW EMAIL VERIFICATION FUNCTIONS
//     const sendRegistrationOTP = async (data) => {
//         try {
//             setLoading(true);
//             const response = await axios.post(`${host}/customer/send-otp`, data);
//             setLoading(false);
//             return response.data;
//         } catch (error) {
//             setLoading(false);
//             console.error("Send OTP error:", error);
//             throw error;
//         }
//     };

//     const verifyRegistrationOTP = async (data) => {
//         try {
//             setLoading(true);
//             const response = await axios.post(`${host}/customer/verify-otp`, data);
//             setLoading(false);
//             return response.data;
//         } catch (error) {
//             setLoading(false);
//             console.error("Verify OTP error:", error);
//             throw error;
//         }
//     };

//     const completeUserRegistration = async (data) => {
//         try {
//             setLoading(true);
//             const response = await axios.post(`${host}/customer/complete-registration`, data);
//             setLoading(false);
//             return response.data;
//         } catch (error) {
//             setLoading(false);
//             console.error("Complete registration error:", error);
//             throw error;
//         }
//     };

//     const resendRegistrationOTP = async (email) => {
//         try {
//             setLoading(true);
//             const response = await axios.post(`${host}/customer/resend-otp`, { email });
//             setLoading(false);
//             return response.data;
//         } catch (error) {
//             setLoading(false);
//             console.error("Resend OTP error:", error);
//             throw error;
//         }
//     };

//     // 🆕 ENHANCED REGISTRATION WITH EMAIL VERIFICATION
//     const RegisterUserWithVerification = async (formData) => {
//         try {
//             setLoading(true);
            
//             // Step 1: Send OTP
//             const otpResponse = await sendRegistrationOTP({
//                 name: formData.name,
//                 email: formData.email,
//                 phone: formData.phone
//             });

//             if (otpResponse.success) {
//                 setLoading(false);
//                 return {
//                     success: true,
//                     message: "OTP sent successfully",
//                     tempId: otpResponse.tempId
//                 };
//             } else {
//                 setLoading(false);
//                 throw new Error(otpResponse.message);
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error("Registration with verification error:", error);
//             throw error;
//         }
//     };

//     const LogoutUser = () => {
//         localStorage.removeItem("userToken");
//         localStorage.removeItem("authToken"); // ✅ ADDED - Remove both tokens
//         localStorage.removeItem("currentUser"); // ✅ ADDED - Remove user data
//         setUser({});
//         setState(!state);
//         Swal.fire("Success", "You will be redirected to the Home", "success");
//         setTimeout(() => {
//             navigate("/home");
//         }, 1000);
//     }

//     const getAllProducts = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${host}/customer/products`);
//             if (response.data.success) {
//                 setProducts(response.data.products);
//             }
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setError("Failed to fetch products");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getProductById = async (id) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${host}/customer/products/${id}`);
//             return response.data.product;
//         } catch (error) {
//             console.error("Error fetching product:", error);
//             setError("Failed to fetch product details");
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ UPDATED - Use getToken()
// const addToCart = async (productId, quantity, selectedSize = '') => {
//   try {
//     const token = getToken();
//     if (!token) {
//       console.error('❌ No token found');
//       Swal.fire({
//         icon: 'error',
//         title: 'Please Login',
//         text: 'You need to login to add items to cart'
//       });
//       navigate('/login');
//       return;
//     }

//     console.log('🛒 Adding to cart:', { productId, quantity, selectedSize });
//     console.log('🔑 Using token:', token.substring(0, 20) + '...');

//     const response = await axios.post(
//       `${host}/customer/cart/add`,
//       { 
//         productId, 
//         quantity,
//         selectedSize
//       },
//       { 
//         headers: { 
//           'auth-token': token,
//           'Content-Type': 'application/json'
//         } 
//       }
//     );
    
//     console.log('✅ Cart response:', response.data);
    
//     if (response.data.success) {
//       setCart(response.data.cart);
//       return response.data;
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     console.error('💥 Add to cart error:', error);
//     console.error('Response data:', error.response?.data);
//     console.error('Response status:', error.response?.status);
    
//     if (error.response?.status === 401) {
//       localStorage.removeItem("userToken");
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("currentUser");
//       setUser({});
//       navigate('/login');
//       Swal.fire({
//         icon: 'error',
//         title: 'Session Expired',
//         text: 'Please login again'
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: error.response?.data?.message || 'Failed to add to cart'
//       });
//     }
//     throw error;
//   }
// };

//     // ✅ UPDATED - Use getToken()
//     const getCart = async () => {
//         try {
//             const token = getToken();
//             if (!token) {
//                 console.log("No token found");
//                 return;
//             }

//             const response = await axios.get(
//                 `${host}/customer/cart`,
//                 { 
//                     headers: { 
//                         'auth-token': token,
//                         'Content-Type': 'application/json'
//                     } 
//                 }
//             );
            
//             if (response.data.success) {
//                 setCart(response.data.cart);
//             }
//         } catch (error) {
//             console.error("Error fetching cart:", error);
//             if (error.response?.status === 401) {
//                 localStorage.removeItem("userToken");
//                 localStorage.removeItem("authToken");
//                 localStorage.removeItem("currentUser");
//                 setUser({});
//                 navigate('/login');
//             }
//         }
//     };

//     // Update cart fetch effect
//     useEffect(() => {
//         const token = getToken();
//         if (token) {
//             getCart();
//         }
//     }, [user.token]);

//     // ✅ UPDATED - Use getToken()
//    const updateCartItem = async (productId, quantity, selectedSize = '') => {
//   try {
//     const token = getToken();
//     const response = await axios.put(
//       `${host}/customer/cart/update`,
//       { 
//         productId, 
//         quantity,
//         selectedSize // ADD this parameter
//       },
//       { headers: { 'auth-token': token } }
//     );
    
//     if (response.data.success) {
//       setCart(response.data.cart);
//     }
//        } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: error.response?.data?.message || 'Failed to update cart'
//     });
//   }
// };

//     // ✅ UPDATED - Use getToken()
//    const removeFromCart = async (productId, selectedSize = '') => {
//   try {
//     const token = getToken();
//     let url = `${host}/customer/cart/remove/${productId}`;
//     if (selectedSize) {
//       url += `?selectedSize=${encodeURIComponent(selectedSize)}`;
//     }
    
//     const response = await axios.delete(url, { 
//       headers: { 'auth-token': token } 
//     });
    
//     if (response.data.success) {
//       setCart(response.data.cart);
//       Swal.fire({
//         icon: 'success',
//         title: 'Item Removed!',
//         showConfirmButton: false,
//         timer: 1500
//       });
//                }
//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: error.response?.data?.message || 'Failed to remove item'
//     });
//   }
// };


//     // Add useEffect to fetch cart on mount
//     useEffect(() => {
//         if (user.token) {
//             getCart();
//         }
//     }, [user]);

//     const getAllCategories = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${host}/customer/categories`);
//             if (response.data.success) {
//                 setCategories(response.data.categories);
//             }
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//             setError("Failed to fetch categories");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ UPDATED - Use getToken()
//     const createOrder = async (orderData) => {
//         try {
//             const token = getToken();
//             if (!token) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Please Login',
//                     text: 'You need to login to place an order'
//                 });
//                 navigate('/login');
//                 return;
//             }

//             const response = await axios.post(
//                 `${host}/customer/order/create`,
//                 orderData,
//                 { headers: { 'auth-token': token } }
//             );
            
//             if (response.data.success) {
//                 setCart([]);
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Order Placed Successfully!',
//                     text: orderData.paymentMethod === 'UPI' ? 
//                         'Payment received and order confirmed!' : 
//                         'Thank you for your purchase'
//                 });
//                 navigate('/orders');
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: error.response?.data?.message || 'Failed to place order'
//             });
//         }
//     };

//     // ✅ UPDATED - Use getToken()
//     const getOrders = async () => {
//         try {
//             const token = getToken();
//             if (!token) return;

//             const response = await axios.get(
//                 `${host}/customer/orders`,
//                 { headers: { 'auth-token': token } }
//             );
            
//             if (response.data.success) {
//                 setOrders(response.data.orders);
//             }
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//         }
//     };

//     // ✅ UPDATED - Use getToken()
//     const cancelOrder = async (orderId) => {
//         try {
//             const token = getToken();
//             if (!token) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Please Login',
//                     text: 'You need to login to cancel orders'
//                 });
//                 navigate('/login');
//                 return;
//             }

//             const response = await axios.put(
//                 `${host}/customer/orders/${orderId}/cancel`,
//                 {},
//                 { headers: { 'auth-token': token } }
//             );
            
//             if (response.data.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Order Cancelled!',
//                     text: 'Your order has been cancelled successfully'
//                 });
//                 getOrders();
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: error.response?.data?.message || 'Failed to cancel order'
//             });
//         }
//     };

//     // ✅ UPDATED - Use getToken()
//   // ✅ FIXED - submitFeedback function
// // ✅ GUARANTEED FIX - submitFeedback function
// const submitFeedback = async (orderId, rating, feedback) => {
//     const token = getToken();
//     if (!token) {
//         throw new Error('Please login to submit feedback');
//     }

//     try {
//         console.log('🚀 Submitting feedback:', { orderId, rating, feedback });

//         const response = await axios.post(
//             `${host}/customer/orders/${orderId}/feedback`,
//             { rating, feedback },
//             { 
//                 headers: { 
//                     'auth-token': token,
//                     'Content-Type': 'application/json'
//                 } 
//             }
//         );
        
//         console.log('✅ Response received:', response);
        
//         // Return success regardless of response format
//         return {
//             success: true,
//             message: 'Feedback submitted successfully'
//         };
        
//     } catch (error) {
//         console.log('⚠️ Axios error caught, but checking response:', error.response);
        
//         // Since feedback is actually going through, treat any response as success
//         // This handles cases where backend returns data but axios treats it as error
//         if (error.response) {
//             console.log('📝 Feedback likely submitted despite error, treating as success');
//             return {
//                 success: true,
//                 message: 'Feedback submitted successfully'
//             };
//         }
        
//         // Only throw for network errors (no response received)
//         throw new Error('Network error - please check your connection');
//     }
// };



//     return (
//         <userContext.Provider value={{
//             // EXISTING VALUES
//             user,
//             LoginUser,
//             RegisterUser, // Keep original for backup
//             LogoutUser,
//             products,
//             getAllProducts,
//             getProductById,
//             loading,
//             error,
//             cart,
//             addToCart,
//             updateCartItem,
//             removeFromCart,
//             getCart,
//             getAllCategories,
//             createOrder,
//             getOrders,
//             orders,
//             cancelOrder,
//             submitFeedback,
            
//             // 🆕 NEW EMAIL VERIFICATION VALUES
//             sendRegistrationOTP,
//             verifyRegistrationOTP,
//             completeUserRegistration,
//             resendRegistrationOTP,
//             RegisterUserWithVerification,
//         }}>
//             {props.children}
//         </userContext.Provider>
//     );
// }

























import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../Config/Config";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

export default function UserContextProvider(props) {
    const { host } = config;
    const [user, setUser] = useState({});
    const [state, setState] = useState(false);
    const [nutritionists, setNutritionists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    // ✅ HELPER FUNCTION - Add this at the top
    const getToken = () => {
        return localStorage.getItem("userToken") || localStorage.getItem("authToken");
    };

    // ✅ UPDATED - Check for both token types
    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        const authToken = localStorage.getItem("authToken");
        const userData = localStorage.getItem("currentUser");
        
        if (userToken || authToken) {
            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setUser({ token: userToken || authToken, ...parsedUser });
                } catch (error) {
                    setUser({ token: userToken || authToken });
                }
            } else {
                setUser({ token: userToken || authToken });
            }
        }
    }, [state]);

    const LoginUser = (data) => {
        axios.post(`${host}/customer/login`, data)
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem("userToken", res.data.token);
                    
                    // ✅ ADD THESE LINES TO SAVE USER DATA
                    if (res.data.user) {
                        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
                        setUser(res.data.user);
                    } else {
                        // If backend doesn't return user data, create user object from email
                        const userData = {
                            id: 'user_' + Date.now(), // temporary ID
                            name: data.email.split('@')[0], // extract name from email
                            email: data.email,
                            profileImage: '',
                            provider: 'email'
                        };
                        localStorage.setItem("currentUser", JSON.stringify(userData));
                        setUser(userData);
                    }
                    
                    setState(!state);
                    Swal.fire("Success", "You will be redirected to the Home", "success");
                    setTimeout(() => {
                        navigate("/home");
                    }, 1000);
                } else {
                    Swal.fire("Error", res.data.message, "error");
                }
            })
            .catch((err) => {
                Swal.fire("Error Login Failed", err.response?.data?.message || "Check Your Login Details", "error");
            });
    };

    // 🆕 ORIGINAL REGISTER FUNCTION (KEEP AS BACKUP)
    const RegisterUser = (data) => {
        axios.post(`${host}/customer/Register`, data)
        .then((res) => {
            if (res.data.success) {
                Swal.fire({
                    title: "Success!",
                    text: "Registration successful! Please login.",
                    icon: "success"
                });
                navigate("/login");
            } else {
                Swal.fire({
                    title: "Error!",
                    text: res.data.message,
                    icon: "error"
                });
            }
        })
        .catch((err) => {
            Swal.fire({
                title: "Error!",
                text: err.response?.data?.message || "Registration failed",
                icon: "error"
            });
        });
    };

    // 🆕 NEW EMAIL VERIFICATION FUNCTIONS
    const sendRegistrationOTP = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(`${host}/customer/send-otp`, data);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error("Send OTP error:", error);
            throw error;
        }
    };

    const verifyRegistrationOTP = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(`${host}/customer/verify-otp`, data);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error("Verify OTP error:", error);
            throw error;
        }
    };

    const completeUserRegistration = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(`${host}/customer/complete-registration`, data);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error("Complete registration error:", error);
            throw error;
        }
    };

    const resendRegistrationOTP = async (email) => {
        try {
            setLoading(true);
            const response = await axios.post(`${host}/customer/resend-otp`, { email });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error("Resend OTP error:", error);
            throw error;
        }
    };

    // 🆕 ENHANCED REGISTRATION WITH EMAIL VERIFICATION
    const RegisterUserWithVerification = async (formData) => {
        try {
            setLoading(true);
            
            // Step 1: Send OTP
            const otpResponse = await sendRegistrationOTP({
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            });

            if (otpResponse.success) {
                setLoading(false);
                return {
                    success: true,
                    message: "OTP sent successfully",
                    tempId: otpResponse.tempId
                };
            } else {
                setLoading(false);
                throw new Error(otpResponse.message);
            }
        } catch (error) {
            setLoading(false);
            console.error("Registration with verification error:", error);
            throw error;
        }
    };

    const LogoutUser = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("authToken"); // ✅ ADDED - Remove both tokens
        localStorage.removeItem("currentUser"); // ✅ ADDED - Remove user data
        setUser({});
        setState(!state);
        Swal.fire("Success", "You will be redirected to the Home", "success");
        setTimeout(() => {
            navigate("/home");
        }, 1000);
    }

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${host}/customer/products`);
            if (response.data.success) {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const getProductById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${host}/customer/products/${id}`);
            return response.data.product;
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to fetch product details");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // ✅ UPDATED - Use getToken()
const addToCart = async (productId, quantity, selectedSize = '') => {
  try {
    const token = getToken();
    if (!token) {
      console.error('❌ No token found');
      Swal.fire({
        icon: 'error',
        title: 'Please Login',
        text: 'You need to login to add items to cart'
      });
      navigate('/login');
      return;
    }

    console.log('🛒 Adding to cart:', { productId, quantity, selectedSize });
    console.log('🔑 Using token:', token.substring(0, 20) + '...');

    const response = await axios.post(
      `${host}/customer/cart/add`,
      { 
        productId, 
        quantity,
        selectedSize
      },
      { 
        headers: { 
          'auth-token': token,
          'Content-Type': 'application/json'
        } 
      }
    );
    
    console.log('✅ Cart response:', response.data);
    
    if (response.data.success) {
      setCart(response.data.cart);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('💥 Add to cart error:', error);
    console.error('Response data:', error.response?.data);
    console.error('Response status:', error.response?.status);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      setUser({});
      navigate('/login');
      Swal.fire({
        icon: 'error',
        title: 'Session Expired',
        text: 'Please login again'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Failed to add to cart'
      });
    }
    throw error;
  }
};

    // ✅ UPDATED - Use getToken()
    const getCart = async () => {
        try {
            const token = getToken();
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await axios.get(
                `${host}/customer/cart`,
                { 
                    headers: { 
                        'auth-token': token,
                        'Content-Type': 'application/json'
                    } 
                }
            );
            
            if (response.data.success) {
                setCart(response.data.cart);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("authToken");
                localStorage.removeItem("currentUser");
                setUser({});
                navigate('/login');
            }
        }
    };

    // Update cart fetch effect
    useEffect(() => {
        const token = getToken();
        if (token) {
            getCart();
        }
    }, [user.token]);

    // ✅ UPDATED - Use getToken()
   const updateCartItem = async (productId, quantity, selectedSize = '') => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${host}/customer/cart/update`,
      { 
        productId, 
        quantity,
        selectedSize // ADD this parameter
      },
      { headers: { 'auth-token': token } }
    );
    
    if (response.data.success) {
      setCart(response.data.cart);
    }
       } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response?.data?.message || 'Failed to update cart'
    });
  }
};

    // ✅ UPDATED - Use getToken()
   const removeFromCart = async (productId, selectedSize = '') => {
  try {
    const token = getToken();
    let url = `${host}/customer/cart/remove/${productId}`;
    if (selectedSize) {
      url += `?selectedSize=${encodeURIComponent(selectedSize)}`;
    }
    
    const response = await axios.delete(url, { 
      headers: { 'auth-token': token } 
    });
    
    if (response.data.success) {
      setCart(response.data.cart);
      Swal.fire({
        icon: 'success',
        title: 'Item Removed!',
        showConfirmButton: false,
        timer: 1500
      });
               }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response?.data?.message || 'Failed to remove item'
    });
  }
};


    // Add useEffect to fetch cart on mount
    useEffect(() => {
        if (user.token) {
            getCart();
        }
    }, [user]);

    const getAllCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${host}/customer/categories`);
            if (response.data.success) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    // ✅ UPDATED - Use getToken()
    const createOrder = async (orderData) => {
        try {
            const token = getToken();
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please Login',
                    text: 'You need to login to place an order'
                });
                navigate('/login');
                return;
            }

            const response = await axios.post(
                `${host}/customer/order/create`,
                orderData,
                { headers: { 'auth-token': token } }
            );
            
            if (response.data.success) {
                setCart([]);
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                    text: orderData.paymentMethod === 'UPI' ? 
                        'Payment received and order confirmed!' : 
                        'Thank you for your purchase'
                });
                navigate('/orders');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'Failed to place order'
            });
        }
    };

    // ✅ UPDATED - Use getToken()
    const getOrders = async () => {
        try {
            const token = getToken();
            if (!token) return;

            const response = await axios.get(
                `${host}/customer/orders`,
                { headers: { 'auth-token': token } }
            );
            
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // ✅ UPDATED - Use getToken()
    const cancelOrder = async (orderId) => {
        try {
            const token = getToken();
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please Login',
                    text: 'You need to login to cancel orders'
                });
                navigate('/login');
                return;
            }

            const response = await axios.put(
                `${host}/customer/orders/${orderId}/cancel`,
                {},
                { headers: { 'auth-token': token } }
            );
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Cancelled!',
                    text: 'Your order has been cancelled successfully'
                });
                getOrders();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'Failed to cancel order'
            });
        }
    };

    // ✅ UPDATED - Use getToken()
  // ✅ FIXED - submitFeedback function
// ✅ GUARANTEED FIX - submitFeedback function
// ✅ FIXED - submitFeedback function
// ✅ FIXED submitFeedback function - Replace existing one
// ✅ REPLACE submitFeedback in src/Context/Context.jsx
const submitFeedback = async (orderId, rating, feedback) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to submit feedback');
        }

        console.log('🚀 Submitting feedback:', { orderId, rating, feedback });

        const response = await axios.post(
            `${host}/customer/orders/${orderId}/feedback`,
            { rating, feedback },
            { 
                headers: { 
                    'auth-token': token,
                    'Content-Type': 'application/json'
                } 
            }
        );
        
        console.log('✅ Response received:', response.data);
        
        // ✅ CHECK BACKEND RESPONSE
        if (response.data.success) {
            // Refresh orders to get updated feedback status
            await getOrders();
            return {
                success: true,
                message: response.data.message
            };
        } else {
            throw new Error(response.data.message || 'Failed to submit feedback');
        }
        
    } catch (error) {
        console.error('❌ Feedback error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message || 'Failed to submit feedback');
    }
};



// ✅ ADD THIS FUNCTION TO YOUR EXISTING CONTEXT.JSX FILE

const requestReturn = async (orderId, reason, comments) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${host}/customer/orders/${orderId}/return-request`,
            { reason, comments },
            { headers: { 'auth-token': token } }
        );
        
        if (response.data.success) {
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order._id === orderId 
                        ? { ...order, returnStatus: 'requested', orderStatus: 'return-requested' }
                        : order
                )
            );
        }
        return response.data;
    } catch (error) {
        console.error('Return request error:', error);
        return { success: false };
    }
};

    return (
        <userContext.Provider value={{
            // EXISTING VALUES
            user,
            LoginUser,
            RegisterUser, // Keep original for backup
            LogoutUser,
            products,
            getAllProducts,
            getProductById,
            loading,
            error,
            cart,
            addToCart,
            updateCartItem,
            removeFromCart,
            getCart,
            getAllCategories,
            createOrder,
            getOrders,
            orders,
            cancelOrder,
            submitFeedback,
            
            // 🆕 NEW EMAIL VERIFICATION VALUES
            sendRegistrationOTP,
            verifyRegistrationOTP,
            completeUserRegistration,
            resendRegistrationOTP,
            RegisterUserWithVerification,
            requestReturn ,
        }}>
            {props.children}
        </userContext.Provider>
    );
}
