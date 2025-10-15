import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../Config/Config";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const { host } = config;
  const [admin, setAdmin] = useState(null);
  const [state, setState] = useState(false);
  const [nutritionists, setNutritionists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Check if admin is logged in on component mount

  const LoginAdmin = (data) => {
    axios
        .post(`${host}/admin/login`, data)
        .then((res) => {
            if (res.data.success) {
                localStorage.setItem("adminToken", res.data.token);
                setAdmin(res.data.admin);
                setState(!state);
                Swal.fire({
                    title: "Success",
                    text: "Login successful",
                    icon: "success"
                });
                navigate("/dashboard");
            } else {
                Swal.fire({
                    title: "Error",
                    text: res.data.message,
                    icon: "error"
                });
            }
        })
        .catch((err) => {
            console.error("Login error:", err);
            Swal.fire({
                title: "Error",
                text: err.response?.data?.message || "Login failed",
                icon: "error"
            });
        });
  };

  const LogoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    setState(!state);
    navigate("/login");
  };


  const getUsers = async () => {
      try {
          const token = localStorage.getItem("adminToken");
          const response = await axios.get(
              `${host}/admin/users`,
              { headers: { 'auth-token': token } }
          );
          return response.data;
      } catch (error) {
          console.error("Error fetching users:", error);
          throw error;
      }
  };

  const deleteUser = async (userId) => {
      try {
          const token = localStorage.getItem("adminToken");
          const response = await axios.delete(
              `${host}/admin/users/${userId}`,
              { headers: { 'auth-token': token } }
          );
          return response.data.success;
      } catch (error) {
          console.error("Error deleting user:", error);
          throw error;
      }
  };

  const getVendors = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
            `${host}/admin/vendors`,
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching vendors:", error);
        throw error;
    }
};

const updateVendorStatus = async (vendorId, isApproved) => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.put(
            `${host}/admin/vendors/${vendorId}/status`,
            { isApproved },
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating vendor status:", error);
        throw error;
    }
};

const deleteVendor = async (vendorId) => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.delete(
            `${host}/admin/vendors/${vendorId}`,
            { headers: { 'auth-token': token } }
        );
        return response.data.success;
    } catch (error) {
        console.error("Error deleting vendor:", error);
        throw error;
    }
};

const getCategories = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
            `${host}/admin/categories`,
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const addCategory = async (name) => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.post(
            `${host}/admin/categories`,
            { name },
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

const updateCategory = async (id, name) => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.put(
            `${host}/admin/categories/${id}`,
            { name },
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.delete(
            `${host}/admin/categories/${id}`,
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

const getFeedbacks = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
            `${host}/admin/feedbacks`,
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        throw error;
    }
};

const deleteFeedback = async (feedbackId) => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.delete(
            `${host}/admin/feedbacks/${feedbackId}`,
            { headers: { 'auth-token': token } }
        );
        return response.data.success;
    } catch (error) {
        console.error("Error deleting feedback:", error);
        throw error;
    }
};

const getOrders = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
            `${host}/admin/orders`,
            { headers: { 'auth-token': token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

const getDashboardStats = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        
        // First get all orders to calculate revenue properly
        const ordersResponse = await axios.get(
            `${host}/admin/orders`,
            { headers: { 'auth-token': token } }
        );
        
        // Get basic stats
        const statsResponse = await axios.get(
            `${host}/admin/dashboard/stats`,
            { headers: { 'auth-token': token } }
        );

        if (statsResponse.data.success && ordersResponse.data.success) {
            const orders = ordersResponse.data.orders || [];
            
            // Calculate revenue using the same logic as vendor dashboard
            let totalRevenue = 0;
            
            orders.forEach((order) => {
                // Skip cancelled orders completely
                if (order.orderStatus?.toLowerCase() === 'cancelled') {
                    return;
                }
                
                // For COD orders: Only count if delivered
                if (order.paymentMethod?.toLowerCase() === 'cod') {
                    if (order.orderStatus?.toLowerCase() === 'delivered') {
                        totalRevenue += order.totalAmount;
                    }
                }
                // For UPI orders: Count if delivered (since they're pre-paid)
                else if (order.paymentMethod?.toLowerCase() === 'upi') {
                    if (order.orderStatus?.toLowerCase() === 'delivered') {
                        totalRevenue += order.totalAmount;
                    }
                }
            });

            // Calculate monthly growth for delivered orders only
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            
            const recentDeliveredOrders = orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= lastMonth && 
                       order.orderStatus?.toLowerCase() === 'delivered' &&
                       (order.paymentMethod?.toLowerCase() === 'cod' || 
                        order.paymentMethod?.toLowerCase() === 'upi');
            });
            
            const monthlyRevenue = recentDeliveredOrders.reduce((sum, order) => 
                sum + order.totalAmount, 0
            );
            
            const revenueGrowth = totalRevenue > 0 ? 
                ((monthlyRevenue / totalRevenue) * 100).toFixed(1) : 0;

            return {
                success: true,
                stats: {
                    totalUsers: statsResponse.data.stats.totalUsers || 0,
                    totalVendors: statsResponse.data.stats.totalVendors || 0,
                    totalRevenue: totalRevenue, // Corrected revenue calculation
                    totalOrders: orders.length,
                    monthlyGrowth: {
                        users: statsResponse.data.stats.monthlyGrowth?.users || 12.5,
                        vendors: statsResponse.data.stats.monthlyGrowth?.vendors || 8.3,
                        revenue: parseFloat(revenueGrowth),
                        orders: statsResponse.data.stats.monthlyGrowth?.orders || 18.9,
                    }
                }
            };
        }
        
        return statsResponse.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
};

// Add to the context provider value
return (
    <AdminContext.Provider
        value={{
              LoginAdmin,
              admin,
              setAdmin,
              state,
              setState,
              LogoutAdmin,
              getUsers,
              deleteUser,
              getVendors,
              updateVendorStatus,
              deleteVendor,
              getCategories,
              addCategory,
              updateCategory,
              deleteCategory,
              getFeedbacks,
              deleteFeedback,
              getOrders,
              getDashboardStats
          }}
      >
          {children}
      </AdminContext.Provider>
  );
}