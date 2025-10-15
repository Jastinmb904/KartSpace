

// import React, { useState, useEffect, useContext, useRef } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useNavigate } from "react-router-dom";
// import { userContext } from '../Context/Context';
// import { config } from '../Config/Config';

// const Home = () => {
//   const {host} = config;
//   const { products = [], getAllProducts, loading } = useContext(userContext);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [activeSmartphoneCategory, setActiveSmartphoneCategory] = useState('ALL PHONES');
//   const [activeBagsCategory, setActiveBagsCategory] = useState('ALL BAGS');
//   const [activeWatchCategory, setActiveWatchCategory] = useState('ALL WATCHES');
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [currentPromoSlide, setCurrentPromoSlide] = useState(0);
//   const [activeFashionCategory, setActiveFashionCategory] = useState('ALL PRODUCTS');
//   const navigate = useNavigate();

//   // REFS FOR SMOOTH SCROLLING TO SECTIONS
//   const fashionRef = useRef(null);
//   const smartphoneRef = useRef(null);
//   const bagsRef = useRef(null);
//   const watchesRef = useRef(null);
//   const beautyRef = useRef(null);
//   const groceryRef = useRef(null);
//   const footwearRef = useRef(null);
//   const electronicsRef = useRef(null);

//   const features = [
//     {
//       icon: "🏪",
//       title: "Endless Variety",
//       description: "Explore millions of products from multiple categories all in one place.",
//       gradient: "linear-gradient(135deg, #667eea, #764ba2)",
//       image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//     },
//     {
//       icon: "🔒",
//       title: "Safe Shopping",
//       description: "Shop with confidence with our secure payment system and buyer protection.",
//       gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
//       image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//     },
//     {
//       icon: "🚚",
//       title: "Fast Delivery",
//       description: "Get your orders delivered quickly with real-time tracking.",
//       gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
//       image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//     }
//   ];

//   const statistics = [
//     { icon: "🛍️", value: "10K+", label: "Products Available", color: "#667eea" },
//     { icon: "🏷️", value: "50+", label: "Categories", color: "#4facfe" },
//     { icon: "⭐", value: "50K+", label: "Happy Customers", color: "#43e97b" },
//     { icon: "📈", value: "99%", label: "Satisfaction Rate", color: "#ff6b35" }
//   ];

//   // CATEGORY ICONS WITH CLICK HANDLERS
//   const categoryIcons = [
//     { icon: "👗", title: "Fashion", color: "#667eea", ref: fashionRef, clickable: true },
//     { icon: "📱", title: "Electronics", color: "#ff6b35", ref: smartphoneRef, clickable: true },
//     { icon: "👜", title: "Bags", color: "#43e97b", ref: bagsRef, clickable: true },
//     { icon: "👟", title: "Footwear", color: "#4facfe", ref: footwearRef, clickable: true },
//     { icon: "🛒", title: "Groceries", color: "#38a169", ref: groceryRef, clickable: true },
//     { icon: "💄", title: "Beauty", color: "#ed64a6", ref: beautyRef, clickable: true },
//     { icon: "⌚", title: "Watches", color: "#8b5cf6", ref: watchesRef, clickable: true },
//     { icon: "💍", title: "Jewellery", color: "#9f7aea", clickable: false }
//   ];

//   const heroBanners = [
//     {
//       image: "https://www.v2retail.com/wp-content/uploads/2023/07/EOSS-70-OFF-V2-Retail-Home-Page-banner-29-06-23.jpg",
//       alt: "Fashion Collection Banner"
//     },
//     {
//       image: "https://cdn.shopify.com/s/files/1/0486/5094/4664/files/web_banners_1bf84487-e84a-41b8-b816-e5cbae3e8cff.jpg?v=1630058585",
//       alt: "Electronics Banner"
//     },
//     {
//       image: "https://silkstoriesbyketki.com/wp-content/uploads/2023/06/Yellow-White-Modern-Special-Discount-Banner-.png",
//       alt: "Summer Sale Banner"
//     },
//     {
//       image: "https://cdn.shopify.com/s/files/1/0650/5922/5844/files/MARDAZ-FLAT-SALE_live-banner.gif?v=1662744615",
//       alt: "New Arrivals Banner"
//     },
//     {
//       image: "https://th.bing.com/th/id/R.ce624024749d90851bba866aa7dcbd58?rik=bW0WG%2bUF1PtvRA&riu=http%3a%2f%2fwww.tinygirlindia.com%2fcdn%2fshop%2fcollections%2fbarbie_-_1920px_x_700px-01.jpg%3fv%3d1736931768&ehk=27qHrko9S9yo3mpdjmlt3ZxUvT96novKD4Vj2c7KOjY%3d&risl=&pid=ImgRaw&r=0",
//       alt: "Kids Banner"
//     }
//   ];

//   const promoCards = [
//     {
//       id: 1,
//       title: "Big saving days sale",
//       productName: "Apple iPhone 15 128 GB, Pink",
//       price: "₹75,500.00",
//       originalPrice: "₹85,000.00",
//       buttonText: "SHOP NOW",
//       image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       background: "linear-gradient(135deg, #f8bbd9, #e91e63)",
//       isMain: true
//     },
//     {
//       id: 2,
//       title: "Buy Men's Footwear with low price",
//       price: "₹1500",
//       buttonText: "SHOP NOW",
//       image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       background: "linear-gradient(135deg, #b3e5fc, #03a9f4)",
//       isMain: false
//     },
//     {
//       id: 3,
//       title: "Buy Apple iPhone",
//       price: "₹45000",
//       buttonText: "SHOP NOW",
//       image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       background: "linear-gradient(135deg, #c8e6c9, #4caf50)",
//       isMain: false
//     }
//   ];

//   const smartphoneBrandTabs = ['ALL PHONES', 'APPLE', 'SAMSUNG', 'ONEPLUS', 'XIAOMI', 'REALME', '>'];
//   const bagsBrandTabs = ['ALL BAGS', 'HANDBAGS', 'BACKPACKS', 'TRAVEL BAGS', 'LAPTOP BAGS', 'LADIES BAGS', '>'];
//   const watchBrandTabs = ['ALL WATCHES', 'APPLE', 'SAMSUNG', 'ROLEX', 'CASIO', 'TITAN', 'FOSSIL', '>'];
//   const fashionTabs = ['ALL PRODUCTS', 'MENS WEAR', 'WOMENS WEAR', 'KIDS WEAR', '>'];

//   const singleBannerImage = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

//   // FIXED: Working bag banner image URL
//   // const bagBannerImage = "https://5.imimg.com/data5/SELLER/Default/2023/8/337854443/UO/KZ/XP/194903783/promotional-bags.jpeg";

//   // SMOOTH SCROLL FUNCTION
//   const scrollToSection = (ref) => {
//     if (ref && ref.current) {
//       ref.current.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//     fetch(`${host}/customer/categories`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setCategories(data.categories);
//         }
//       })
//       .catch(err => console.error('Error fetching categories:', err));
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPromoSlide((prev) => (prev + 1) % promoCards.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const renderStars = (rating = 5) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <span key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9', fontSize: '14px' }}>
//         ★
//       </span>
//     ));
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(price);
//   };

//   const getDiscountPercentage = (product) => {
//     if (product.price >= 50000) return 30;
//     if (product.price >= 25000) return 25;
//     if (product.price >= 10000) return 20;
//     if (product.price >= 5000) return 15;
//     return 10;
//   };

//   const getCategoryColor = (category) => {
//     return '#667eea';
//   };

//   // Product filtering functions
//   const getFashionProducts = () => {
//     const allClothingProducts = products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();
      
//       const clothingKeywords = [
//         'dress', 'shirt', 'pant', 'trouser', 'suit', 'blazer', 'kurta', 'kurti', 'saree', 
//         'top', 'skirt', 'blouse', 'jeans', 'tunic', 'lehenga', 'choli', 'salwar', 'gown', 
//         'nighty', 'jacket', 'shorts', 'vest', 't-shirt', 'polo', 'hoodie', 'sweater', 
//         'cardigan', 'sweatshirt', 'tank', 'camisole', 'jumpsuit', 'romper', 'overalls',
//         'clothing', 'apparel', 'garment', 'wear'
//       ];

//       const excludeKeywords = [
//         'shoe', 'sandal', 'slipper', 'boot', 'sneaker', 'heel', 'footwear',
//         'bag', 'purse', 'handbag', 'backpack', 'wallet', 'clutch',
//         'phone', 'mobile', 'iphone', 'smartphone', 'tablet', 'laptop',
//         'watch', 'clock', 'smartwatch',
//         'beauty', 'makeup', 'cosmetic', 'lipstick', 'foundation',
//         'jewelry', 'jewellery', 'necklace', 'ring', 'earring', 'bracelet',
//         'grocery', 'food', 'rice', 'oil', 'spices'
//       ];

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;
      
//       const isClothing = clothingKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       return isClothing;
//     });

//     if (activeFashionCategory === 'ALL PRODUCTS') {
//       return allClothingProducts;
//     }

//     return allClothingProducts.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();

//       if (activeFashionCategory === 'MENS WEAR') {
//         const menMarkers = ['men', 'male', 'boy', 'gentleman', 'gents'];
//         const excludeMarkers = [
//           'women', 'ladies', 'female', 'kurti', 'saree', 'lehenga', 'choli', 
//           'nighty', 'skirt', 'blouse', 'salwar', 'gown',
//           'kid', 'kids', 'child', 'children', 'baby', 'toddler', 'infant'
//         ];
        
//         return (
//           menMarkers.some(word => name.includes(word) || cat.includes(word)) &&
//           !excludeMarkers.some(word => name.includes(word) || cat.includes(word))
//         );
//       }

//       if (activeFashionCategory === 'WOMENS WEAR') {
//         const womenMarkers = [
//           'women', 'woman', 'ladies', 'lady', 'female', 'girl', 
//           'kurti', 'saree', 'lehenga', 'choli', 'nighty', 'skirt', 'blouse', 
//           'salwar', 'gown', 'dress', 'top', 'tunic', 'camisole'
//         ];
        
//         return womenMarkers.some(word => name.includes(word) || cat.includes(word));
//       }

//       if (activeFashionCategory === 'KIDS WEAR') {
//         const kidsMarkers = ['kid', 'kids', 'child', 'children', 'baby', 'toddler', 'infant'];
//         return kidsMarkers.some(word => name.includes(word) || cat.includes(word));
//       }

//       return true;
//     });
//   };

//   const getSmartphoneProducts = () => {
//     const phoneKeywords = [
//       'phone', 'smartphone', 'mobile', 'iphone', 'android', 'cell', 'cellular'
//     ];

//     const excludeKeywords = [
//       'bag', 'case', 'cover', 'holder', 'stand', 'charger', 'cable', 'adapter',
//       'headphone', 'earphone', 'speaker', 'accessory', 'screen', 'protector',
//       'tablet', 'laptop', 'watch', 'smartwatch', 'computer', 'monitor',
//       'shirt', 'dress', 'pant', 'clothing', 'apparel', 'shoe', 'sandal',
//       'beauty', 'makeup', 'cosmetic', 'jewelry', 'jewellery'
//     ];

//     return products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();
//       const brand = (product.specifications?.brand || '').toLowerCase();

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;

//       const isPhone = phoneKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (!isPhone) return false;

//       if (activeSmartphoneCategory === 'ALL PHONES') return true;
      
//       const categoryBrand = activeSmartphoneCategory.toLowerCase();
//       return (
//         brand.includes(categoryBrand) || 
//         name.includes(categoryBrand)
//       );
//     });
//   };

//   const getBagsProducts = () => {
//     return products.filter(product => {
//       const cat = (product.category?.name || '').toLowerCase();
      
//       const bagCategories = [
//         'bags', 'bag', 'handbags', 'backpacks', 'purses', 'luggage'
//       ];
      
//       const isBagCategory = bagCategories.some(bagCategory => 
//         cat.includes(bagCategory) || cat === bagCategory
//       );
      
//       if (!isBagCategory) return false;

//       if (activeBagsCategory === 'ALL BAGS') return true;
      
//       const name = (product.name || '').toLowerCase();
      
//       switch(activeBagsCategory) {
//         case 'HANDBAGS':
//           return name.includes('handbag') || name.includes('purse') || name.includes('clutch');
//         case 'BACKPACKS':
//           return name.includes('backpack') || name.includes('rucksack') || name.includes('school');
//         case 'TRAVEL BAGS':
//           return name.includes('travel') || name.includes('duffle') || name.includes('luggage') || name.includes('suitcase');
//         case 'LAPTOP BAGS':
//           return name.includes('laptop') || name.includes('computer') || name.includes('briefcase') || name.includes('office');
//         case 'LADIES BAGS':
//           return name.includes('ladies') || name.includes('lady') || name.includes('women') || name.includes('female');
//         default:
//           return true;
//       }
//     });
//   };

//   const getWatchProducts = () => {
//     const watchKeywords = [
//       'watch', 'watches', 'timepiece', 'smartwatch', 'wristwatch', 'chronograph'
//     ];

//     const excludeKeywords = [
//       'phone', 'mobile', 'smartphone', 'bag', 'case', 'cover', 'strap',
//       'shirt', 'dress', 'pant', 'clothing', 'apparel', 'shoe', 'sandal',
//       'beauty', 'makeup', 'cosmetic', 'jewelry', 'jewellery', 'ring', 'necklace'
//     ];

//     return products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();
//       const brand = (product.specifications?.brand || '').toLowerCase();

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;

//       const isWatch = watchKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (!isWatch) return false;

//       if (activeWatchCategory === 'ALL WATCHES') return true;
      
//       const categoryBrand = activeWatchCategory.toLowerCase();
//       return (
//         brand.includes(categoryBrand) || 
//         name.includes(categoryBrand)
//       );
//     });
//   };

//   const getBeautyProducts = () => {
//     return products.filter(product => {
//       const cat = (product.category?.name || '').toLowerCase();
//       const name = (product.name || '').toLowerCase();
      
//       const beautyCategories = [
//         'beauty products',
//         'beauty',
//         'cosmetics',
//         'makeup',
//         'personal care',
//         'skincare'
//       ];
      
//       const matchesCategory = beautyCategories.some(beautyCategory => 
//         cat.includes(beautyCategory)
//       );
      
//       if (matchesCategory) return true;
      
//       const beautyKeywords = [
//         'lipstick', 'foundation', 'mascara', 'perfume', 'shampoo', 
//         'lotion', 'cream', 'soap', 'face wash'
//       ];
      
//       return beautyKeywords.some(keyword => name.includes(keyword));
//     });
//   };

//   const getGroceryProducts = () => {
//     const groceryKeywords = [
//       'grocery', 'groceries', 'food', 'rice', 'wheat', 'dal', 'oil', 'spices',
//       'tea', 'coffee', 'sugar', 'salt', 'flour', 'milk', 'butter', 'cheese',
//       'bread', 'biscuit', 'snack', 'chocolate', 'candy', 'fruit', 'vegetable',
//       'organic', 'fresh', 'frozen', 'canned', 'packaged', 'instant', 'cooking',
//       'kitchen', 'cereal', 'pasta', 'sauce', 'juice', 'water', 'nuts',
//       'surf', 'excel', 'detergent', 'washing', 'fabric', 'tide', 'ariel',
//       'turmeric', 'haldi', 'masala', 'spice', 'chilli', 'pepper', 'cumin', 'coriander',
//       'atta', 'maida', 'besan', 'basmati', 'quinoa', 'oats', 'poha'
//     ];

//     const excludeKeywords = [
//       'phone', 'mobile', 'smartphone', 'bag', 'shirt', 'dress', 'pant', 'clothing',
//       'shoe', 'sandal', 'watch', 'jewelry', 'jewellery',
//       'beauty', 'makeup', 'cosmetic', 'lipstick', 'foundation', 'mascara', 
//       'eyeliner', 'concealer', 'powder', 'blush', 'eyeshadow', 'nail', 'polish',
//       'perfume', 'fragrance', 'cologne', 'skincare', 'lotion', 'cream', 'serum',
//       'shampoo', 'conditioner', 'soap', 'face', 'moisturizer', 'cleanser',
//       'toner', 'sunscreen', 'deodorant'
//     ];

//     return products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;

//       const isGrocery = groceryKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       return isGrocery;
//     });
//   };

//   // FIXED: Most reliable navigation fix - forces complete page reload
//   const handleProductNavigation = (product) => {
//     if (product.stock === 0) {
//       alert('Product is out of stock');
//       return;
//     }
    
//     // Force complete page reload/navigation - MOST RELIABLE
//     window.location.href = `/product/${product._id}`;
//   };

//   const handleSeeAllClick = () => {
//     navigate('/products');
//   };

//   const scrollProductsLeft = () => {
//     const container = document.getElementById('products-container');
//     if (container) {
//       container.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };

//   const scrollProductsRight = () => {
//     const container = document.getElementById('products-container');
//     if (container) {
//       container.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

//   // STYLES
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       paddingTop: '0px'
//     },
    
//     heroBannerAndCategoriesSection: {
//       backgroundColor: '#f9f1eb',
//       paddingTop: '30px',
//       paddingBottom: '30px',
//       marginTop: '-10px'
//     },
    
//     heroBannerSlider: {
//       position: 'relative',
//       width: '100%',
//       maxWidth: '1400px',
//       height: '450px',
//       margin: '0 auto 40px auto',
//       overflow: 'hidden',
//       borderRadius: '20px'
//     },

//     bannerContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       overflow: 'hidden',
//       transform: 'scale(1)',
//     },

//     bannerSlide: {
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       opacity: 0,
//       transform: 'translateX(100%) scale(1)',
//       transition: 'all 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
//       transformOrigin: 'center center'
//     },

//     activeBannerSlide: {
//       opacity: 1,
//       transform: 'translateX(0) scale(1)',
//       zIndex: 1
//     },

//     prevBannerSlide: {
//       transform: 'translateX(-100%) scale(1)'
//     },

//     nextBannerSlide: {
//       transform: 'translateX(100%) scale(1)'
//     },

//     bannerImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'fit',
//       objectPosition: 'center',
//       display: 'block',
//       transform: 'scale(1)',
//       transition: 'none',
//       maxWidth: 'none',
//       maxHeight: '100vh'
//     },

//     bannerNavButton: {
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: '50px',
//       height: '50px',
//       borderRadius: '50%',
//       border: 'none',
//       background: 'rgba(255, 255, 255, 0.9)',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       color: '#333',
//       transition: 'all 0.3s ease',
//       zIndex: 10,
//       boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
//     },

//     bannerIndicators: {
//       position: 'absolute',
//       bottom: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       display: 'flex',
//       gap: '12px',
//       zIndex: 10
//     },

//     bannerIndicator: {
//       width: '12px',
//       height: '12px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(236, 137, 137, 0.5)',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       border: '2px solid rgba(255, 176, 176, 0.7)'
//     },

//     activeBannerIndicator: {
//       backgroundColor: 'rgba(249, 214, 214, 1)',
//       transform: 'scale(1.2)'
//     },

//     categoriesContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },
    
//     categoriesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(8, 1fr)',
//       gap: '20px',
//       alignItems: 'center',
//       justifyItems: 'center'
//     },
    
//     categoryCard: {
//       backgroundColor: 'white',
//       borderRadius: '16px',
//       padding: '30px 15px',
//       textAlign: 'center',
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
//       transition: 'all 0.3s ease',
//       width: '100%',
//       maxWidth: '140px',
//       minHeight: '120px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },

//     categoryCardClickable: {
//       cursor: 'pointer',
//     },

//     categoryCardDisabled: {
//       cursor: 'not-allowed',
//       opacity: 0.6
//     },
    
//     categoryIcon: {
//       fontSize: '36px',
//       marginBottom: '12px',
//       display: 'block'
//     },
    
//     categoryTitle: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#2d3748'
//     },
    
//     popularProductsSection: {
//       padding: '50px 0',
//       backgroundColor: '#fff'
//     },
    
//     popularProductsContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },
    
//     popularProductsHeader: {
//       marginBottom: '20px'
//     },
    
//     popularProductsTitle: {
//       fontSize: '28px',
//       fontWeight: '700',
//       color: '#374151',
//       marginBottom: '15px'
//     },
    
//     popularProductsSubtitle: {
//       fontSize: '14px',
//       color: '#6b7280',
//       marginBottom: '0'
//     },

//     categoryNavigation: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       margin: '10px 0 30px 0'
//     },

//     categoryTabs: {
//       display: 'flex',
//       gap: '24px',
//       position: 'relative'
//     },
    
//     categoryTab: {
//       fontSize: '13px',
//       fontWeight: '600',
//       color: '#222',
//       cursor: 'pointer',
//       paddingBottom: '4px',
//       position: 'relative',
//       transition: 'color 0.2s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.3px',
//       borderBottom: '2px solid transparent',
//       padding: '8px 16px',
//       borderRadius: '8px'
//     },
    
//     activeCategoryTab: (color) => ({
//       color: color,
//       fontWeight: '700',
//       borderBottom: `2px solid ${color}`,
//       backgroundColor: `${color}15`
//     }),

//     arrowTab: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: '#ef4444',
//       cursor: 'pointer',
//       paddingBottom: '4px'
//     },

//     productsCarouselWrapper: {
//       position: 'relative'
//     },

//     productsScrollButton: {
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: '40px',
//       height: '40px',
//       backgroundColor: 'white',
//       border: '1px solid #e5e7eb',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       zIndex: 10,
//       fontSize: '16px',
//       color: '#374151',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//       transition: 'all 0.3s ease'
//     },

//     leftProductsButton: {
//       left: '-20px'
//     },

//     rightProductsButton: {
//       right: '-20px'
//     },

//     productsContainer: {
//       display: 'flex',
//       gap: '20px',
//       overflowX: 'auto',
//       scrollBehavior: 'smooth',
//       paddingBottom: '10px',
//       scrollbarWidth: 'none',
//       msOverflowStyle: 'none'
//     },
    
//     productCard: (borderColor) => ({
//       minWidth: '240px',
//       width: '240px',
//       backgroundColor: '#fff',
//       borderRadius: '12px',
//       overflow: 'hidden',
//       position: 'relative',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       flexShrink: 0,
//       border: `2px solid ${borderColor}`,
//       boxShadow: `0 4px 20px ${borderColor}20`
//     }),
    
//     productImageContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '280px',
//       overflow: 'hidden',
//       backgroundColor: '#f9fafb'
//     },
    
//     productImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'contain',
//       objectPosition: 'center'
//     },
    
//     discountBadge: {
//       position: 'absolute',
//       top: '12px',
//       left: '12px',
//       backgroundColor: '#ef4444',
//       color: '#fff',
//       padding: '4px 8px',
//       borderRadius: '50px',
//       fontSize: '12px',
//       fontWeight: '600'
//     },
    
//     productInfo: {
//       padding: '16px'
//     },
    
//     productBrand: {
//       fontSize: '12px',
//       color: '#6b7280',
//       marginBottom: '4px',
//       fontWeight: '500'
//     },
    
//     productName: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#1f2937',
//       marginBottom: '8px',
//       lineHeight: '1.3',
//       height: '34px',
//       overflow: 'hidden',
//       display: '-webkit-box',
//       WebkitLineClamp: 2,
//       WebkitBoxOrient: 'vertical'
//     },
    
//     productRating: {
//       display: 'flex',
//       alignItems: 'center',
//       marginBottom: '8px',
//       fontSize: '14px'
//     },
    
//     productPricing: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       marginBottom: '12px'
//     },
    
//     originalPrice: {
//       fontSize: '14px',
//       color: '#9ca3af',
//       textDecoration: 'line-through'
//     },
    
//     currentPrice: {
//       fontSize: '16px',
//       fontWeight: '700',
//       color: '#ef4444'
//     },
    
//     addToCartButton: (borderColor) => ({
//       width: '100%',
//       padding: '8px 16px',
//       backgroundColor: 'transparent',
//       border: `1px solid ${borderColor}`,
//       color: borderColor,
//       borderRadius: '6px',
//       fontSize: '12px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '6px',
//       textTransform: 'uppercase'
//     }),

//     promoSection: {
//       padding: '40px 0',
//       backgroundColor: '#f8fafc'
//     },

//     promoContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },

//     promoLayout: {
//       display: 'grid',
//       gridTemplateColumns: '2fr 1fr',
//       gap: '20px',
//       height: '300px'
//     },

//     mainPromoCard: {
//       position: 'relative',
//       borderRadius: '20px',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },

//     promoCardContent: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '40px',
//       color: 'white',
//       zIndex: 2
//     },

//     promoCardLeft: {
//       flex: 1,
//       maxWidth: '50%'
//     },

//     promoCardTitle: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '10px',
//       opacity: 0.9
//     },

//     promoCardProductName: {
//       fontSize: '32px',
//       fontWeight: '700',
//       lineHeight: '1.2',
//       marginBottom: '15px'
//     },

//     promoCardPriceText: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '5px',
//       opacity: 0.9
//     },

//     promoCardPrice: {
//       fontSize: '36px',
//       fontWeight: '800',
//       marginBottom: '25px'
//     },

//     promoCardButton: {
//       padding: '12px 24px',
//       backgroundColor: '#ef4444',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '14px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },

//     promoCardRight: {
//       flex: 1,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       maxWidth: '50%'
//     },

//     promoCardImage: {
//       width: '100%',
//       height: '250px',
//       objectFit: 'contain'
//     },

//     promoNavButtons: {
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       border: '1px solid rgba(255, 255, 255, 0.3)',
//       color: 'white',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '18px',
//       transition: 'all 0.3s ease',
//       zIndex: 3
//     },

//     promoNavLeft: {
//       left: '15px'
//     },

//     promoNavRight: {
//       right: '15px'
//     },

//     promoIndicators: {
//       position: 'absolute',
//       bottom: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       display: 'flex',
//       gap: '8px',
//       zIndex: 3
//     },

//     promoIndicator: {
//       width: '8px',
//       height: '8px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255, 255, 255, 0.4)',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },

//     activePromoIndicator: {
//       backgroundColor: 'white',
//       transform: 'scale(1.2)'
//     },

//     sidePromoCards: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '15px'
//     },

//     sidePromoCard: {
//       height: '142.5px',
//       borderRadius: '16px',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       position: 'relative'
//     },

//     sidePromoCardContent: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '20px',
//       color: 'white',
//       zIndex: 2
//     },

//     sidePromoCardLeft: {
//       flex: 1
//     },

//     sidePromoCardTitle: {
//       fontSize: '14px',
//       fontWeight: '600',
//       lineHeight: '1.3',
//       marginBottom: '8px'
//     },

//     sidePromoCardPrice: {
//       fontSize: '20px',
//       fontWeight: '800',
//       marginBottom: '10px'
//     },

//     sidePromoCardButton: {
//       padding: '6px 12px',
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       color: 'white',
//       border: '1px solid rgba(255, 255, 255, 0.3)',
//       borderRadius: '6px',
//       fontSize: '12px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       textDecoration: 'underline'
//     },

//     sidePromoCardRight: {
//       width: '80px',
//       height: '80px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },

//     sidePromoCardImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'contain'
//     },

//     singleBannerSection: {
//       padding: '40px 0',
//       backgroundColor: '#f8fafc'
//     },

//     singleBannerContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },

//     // FIXED: Image fits inside without zoom
//     singleBannerImage: {
//       width: '100%',
//       height: '350px',
//       borderRadius: '20px',
//       objectFit: 'contain',
//       objectPosition: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#fff'
//     },

//     statsSection: {
//       padding: '40px 0',
//       backgroundColor: 'white'
//     },
    
//     statsContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px',
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: '40px'
//     },
    
//     statCard: {
//       background: 'white',
//       borderRadius: '20px',
//       padding: '40px 30px',
//       textAlign: 'center',
//       boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
//       transition: 'all 0.3s ease',
//       border: '1px solid #e2e8f0'
//     },
    
//     statIcon: {
//       fontSize: '36px',
//       marginBottom: '20px'
//     },
    
//     statValue: {
//       fontSize: '36px',
//       fontWeight: '800',
//       marginBottom: '12px'
//     },
    
//     statLabel: {
//       color: '#718096',
//       fontSize: '16px',
//       fontWeight: '500'
//     },
    
//     featuresSection: {
//       padding: '50px 0',
//       backgroundColor: '#f8fafc'
//     },
    
//     sectionContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },
    
//     sectionHeader: {
//       textAlign: 'center',
//       marginBottom: '60px'
//     },
    
//     sectionTitle: {
//       fontSize: '48px',
//       fontWeight: '800',
//       color: '#2d3748',
//       marginBottom: '20px'
//     },
    
//     sectionSubtitle: {
//       fontSize: '20px',
//       color: '#718096',
//       maxWidth: '700px',
//       margin: '0 auto',
//       lineHeight: '1.6'
//     },
    
//     featuresGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//       gap: '40px'
//     },

//     featureCard: {
//       background: 'white',
//       borderRadius: '24px',
//       overflow: 'hidden',
//       boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e2e8f0',
//       transition: 'all 0.5s ease'
//     },
    
//     featureImageContainer: {
//       position: 'relative',
//       height: '250px',
//       overflow: 'hidden'
//     },
    
//     featureImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       transition: 'transform 0.3s ease'
//     },
    
//     featureImageOverlay: {
//       position: 'absolute',
//       inset: 0,
//       background: 'rgba(0, 0, 0, 0.4)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
    
//     featureIcon: {
//       width: '80px',
//       height: '80px',
//       borderRadius: '16px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '32px',
//       color: 'white',
//       transition: 'transform 0.3s ease'
//     },
    
//     featureContent: {
//       padding: '30px',
//       textAlign: 'center'
//     },
    
//     featureTitle: {
//       fontSize: '24px',
//       fontWeight: '700',
//       color: '#2d3748',
//       marginBottom: '16px'
//     },
    
//     featureDescription: {
//       color: '#718096',
//       lineHeight: '1.6',
//       fontSize: '16px'
//     }
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
//   };

//   const nextPromoSlide = () => {
//     setCurrentPromoSlide((prev) => (prev + 1) % promoCards.length);
//   };

//   const prevPromoSlide = () => {
//     setCurrentPromoSlide((prev) => (prev - 1 + promoCards.length) % promoCards.length);
//   };

//   if (loading) {
//     return (
//       <div style={{...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
//         <div style={{textAlign: 'center'}}>
//           <div style={{fontSize: '48px', marginBottom: '20px'}}>🛍️</div>
//           <div style={{fontSize: '18px', color: '#718096'}}>Loading products...</div>
//         </div>
//       </div>
//     );
//   }

//   const fashionProducts = getFashionProducts();
//   const smartphoneProducts = getSmartphoneProducts();
//   const bagsProducts = getBagsProducts();
//   const watchProducts = getWatchProducts();
//   const beautyProducts = getBeautyProducts();
//   const groceryProducts = getGroceryProducts();
//   const currentPromoCard = promoCards[currentPromoSlide];
//   const sidePromoCards = promoCards.filter((_, index) => index !== currentPromoSlide);

//   return (
//     <>
//       <div style={styles.container}>
//         <Header />

//         {/* Hero Banner + Categories Section */}
//         <section style={styles.heroBannerAndCategoriesSection}>
//           <div style={styles.heroBannerSlider}>
//             <div style={styles.bannerContainer}>
//               {heroBanners.map((banner, index) => (
//                 <div 
//                   key={index}
//                   style={{
//                     ...styles.bannerSlide,
//                     ...(index === currentSlide ? styles.activeBannerSlide : 
//                        index === (currentSlide - 1 + heroBanners.length) % heroBanners.length ? styles.prevBannerSlide : 
//                        styles.nextBannerSlide)
//                   }}
//                 >
//                   <img 
//                     src={banner.image}
//                     alt={banner.alt}
//                     style={styles.bannerImage}
//                     onLoad={(e) => {
//                       e.target.style.transform = 'scale(1)';
//                     }}
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80';
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             <button 
//               style={{...styles.bannerNavButton, left: '30px'}}
//               onClick={prevSlide}
//               onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 1)'}
//               onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
//             >
//               ‹
//             </button>
//             <button 
//               style={{...styles.bannerNavButton, right: '30px'}}
//               onClick={nextSlide}
//               onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 1)'}
//               onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
//             >
//               ›
//             </button>

//             <div style={styles.bannerIndicators}>
//               {heroBanners.map((_, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     ...styles.bannerIndicator,
//                     ...(index === currentSlide ? styles.activeBannerIndicator : {})
//                   }}
//                   onClick={() => setCurrentSlide(index)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Categories Grid */}
//           <div style={styles.categoriesContainer}>
//             <div style={styles.categoriesGrid}>
//               {categoryIcons.map((category, index) => (
//                 <div 
//                   key={index} 
//                   style={{
//                     ...styles.categoryCard,
//                     ...(category.clickable ? styles.categoryCardClickable : styles.categoryCardDisabled)
//                   }}
//                   onMouseEnter={(e) => {
//                     if (category.clickable) {
//                       e.target.style.transform = 'translateY(-8px)';
//                       e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (category.clickable) {
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
//                     }
//                   }}
//                   onClick={() => {
//                     if (category.clickable && category.ref) {
//                       scrollToSection(category.ref);
//                     }
//                   }}
//                 >
//                   <span style={{...styles.categoryIcon, color: category.color}}>
//                     {category.icon}
//                   </span>
//                   <div style={styles.categoryTitle}>{category.title}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Fashion Section */}
//         <section id="fashion-section" ref={fashionRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Fashion</h2>
//               <div style={styles.categoryNavigation}>
//                 <p style={styles.popularProductsSubtitle}>Discover clothing styles for Men, Women & Kids - Only dress/garment products.</p>
//                 <div style={styles.categoryTabs}>
//                   {fashionTabs.map((category, index) => {
//                     if (category === '>') {
//                       return (
//                         <div
//                           key={index}
//                           style={styles.arrowTab}
//                           onClick={handleSeeAllClick}
//                           onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                           onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                         >
//                           {category}
//                         </div>
//                       );
//                     }

//                     return (
//                       <div
//                         key={category}
//                         style={{
//                           ...styles.categoryTab,
//                           ...(activeFashionCategory === category ? styles.activeCategoryTab('#667eea') : {})
//                         }}
//                         onClick={() => setActiveFashionCategory(category)}
//                         onMouseEnter={(e) => {
//                           if (activeFashionCategory !== category) {
//                             e.target.style.color = '#111';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (activeFashionCategory !== category) {
//                             e.target.style.color = '#222';
//                           }
//                         }}
//                       >
//                         {category}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={scrollProductsLeft}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={scrollProductsRight}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="products-container"
//                 style={styles.productsContainer}
//               >
//                 {fashionProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
//                   const categoryColor = getCategoryColor(activeFashionCategory);
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard(categoryColor)}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = `0 8px 25px ${categoryColor}40`;
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = `0 4px 20px ${categoryColor}20`;
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton(categoryColor)}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = categoryColor;
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = categoryColor;
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {fashionProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>👗</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No clothing products found for {activeFashionCategory}</h3>
//                   <p style={{fontSize: '16px'}}>Try selecting a different category or check back later</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Promotional Cards Section */}
//         <section style={styles.promoSection}>
//           <div style={styles.promoContainer}>
//             <div style={styles.promoLayout}>
//               <div 
//                 style={{
//                   ...styles.mainPromoCard,
//                   background: currentPromoCard.background
//                 }}
//                 onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
//                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                 onClick={() => navigate('/products')}
//               >
//                 <div style={styles.promoCardContent}>
//                   <div style={styles.promoCardLeft}>
//                     <div style={styles.promoCardTitle}>{currentPromoCard.title}</div>
//                     {currentPromoCard.productName && (
//                       <h2 style={styles.promoCardProductName}>{currentPromoCard.productName}</h2>
//                     )}
//                     <div style={styles.promoCardPriceText}>Starting At Only</div>
//                     <div style={styles.promoCardPrice}>{currentPromoCard.price}</div>
//                     <button 
//                       style={styles.promoCardButton}
//                       onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
//                       onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
//                     >
//                       {currentPromoCard.buttonText}
//                     </button>
//                   </div>
//                   <div style={styles.promoCardRight}>
//                     <img 
//                       src={currentPromoCard.image} 
//                       alt={currentPromoCard.productName || currentPromoCard.title}
//                       style={styles.promoCardImage}
//                     />
//                   </div>
//                 </div>

//                 <button 
//                   style={{...styles.promoNavButtons, ...styles.promoNavLeft}}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     prevPromoSlide();
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//                 >
//                   ‹
//                 </button>
//                 <button 
//                   style={{...styles.promoNavButtons, ...styles.promoNavRight}}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     nextPromoSlide();
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//                 >
//                   ›
//                 </button>

//                 <div style={styles.promoIndicators}>
//                   {promoCards.map((_, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         ...styles.promoIndicator,
//                         ...(index === currentPromoSlide ? styles.activePromoIndicator : {})
//                       }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCurrentPromoSlide(index);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div style={styles.sidePromoCards}>
//                 {sidePromoCards.map((card) => (
//                   <div 
//                     key={card.id}
//                     style={{
//                       ...styles.sidePromoCard,
//                       background: card.background
//                     }}
//                     onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                     onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                     onClick={() => navigate('/products')}
//                   >
//                     <div style={styles.sidePromoCardContent}>
//                       <div style={styles.sidePromoCardLeft}>
//                         <div style={styles.sidePromoCardTitle}>{card.title}</div>
//                         <div style={styles.sidePromoCardPrice}>{card.price}</div>
//                         <button 
//                           style={styles.sidePromoCardButton}
//                           onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
//                           onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//                         >
//                           {card.buttonText}
//                         </button>
//                       </div>
//                       <div style={styles.sidePromoCardRight}>
//                         <img 
//                           src={card.image} 
//                           alt={card.title}
//                           style={styles.sidePromoCardImage}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Trending Smartphones Section */}
//         <section id="smartphone-section" ref={smartphoneRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Trending Smartphones</h2>
//               <p style={styles.popularProductsSubtitle}>Discover the latest smartphones with the best deals and cutting-edge technology.</p>
//             </div>

//             <div style={styles.categoryNavigation}>
//               <div></div>
//               <div style={styles.categoryTabs}>
//                 {smartphoneBrandTabs.map((category, index) => {
//                   if (category === '>') {
//                     return (
//                       <div
//                         key={index}
//                         style={styles.arrowTab}
//                         onClick={() => navigate('/products?category=smartphones')}
//                         onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                         onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                       >
//                         {category}
//                       </div>
//                     );
//                   }

//                   return (
//                     <div
//                       key={category}
//                       style={{
//                         ...styles.categoryTab,
//                         ...(activeSmartphoneCategory === category ? styles.activeCategoryTab('#ff6b35') : {})
//                       }}
//                       onClick={() => setActiveSmartphoneCategory(category)}
//                       onMouseEnter={(e) => {
//                         if (activeSmartphoneCategory !== category) {
//                           e.target.style.color = '#111';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (activeSmartphoneCategory !== category) {
//                           e.target.style.color = '#222';
//                         }
//                       }}
//                     >
//                       {category}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('smartphones-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>
              
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('smartphones-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="smartphones-container"
//                 style={styles.productsContainer}
//               >
//                 {smartphoneProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#ff6b35')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #ff6b3540';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #ff6b3520';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#3b82f6',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           📱 PHONE
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                                                
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#ff6b35')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#ff6b35';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#ff6b35';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {smartphoneProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>📱</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No smartphones found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest smartphone deals</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Single Banner Image Section */}
//         <section style={styles.singleBannerSection}>
//           <div style={styles.singleBannerContainer}>
//             <img 
//               src={singleBannerImage}
//               alt="Special Promotion Banner"
//               style={styles.singleBannerImage}
//               onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
//               onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//               onClick={() => navigate('/products')}
//             />
//           </div>
//         </section>

//         {/* FIXED: NEW Bags Banner Section - ABOVE BAGS COLLECTION
//         <section style={styles.singleBannerSection}>
//           <div style={styles.singleBannerContainer}>
//             <img 
//               src={bagBannerImage}
//               alt="Promotional Bags Banner"
//               style={styles.singleBannerImage}
//               onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
//               onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//               onClick={() => navigate('/products')}
//             />
//           </div>
//         </section> */}

//         {/* Premium Bags Collection Section */}
//         <section id="bags-section" ref={bagsRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Premium Bags Collection</h2>
//               <p style={styles.popularProductsSubtitle}>Discover stylish and functional bags for every occasion and lifestyle.</p>
//             </div>

//             <div style={styles.categoryNavigation}>
//               <div></div>
//               <div style={styles.categoryTabs}>
//                 {bagsBrandTabs.map((category, index) => {
//                   if (category === '>') {
//                     return (
//                       <div
//                         key={index}
//                         style={styles.arrowTab}
//                         onClick={() => navigate('/products?category=bags')}
//                         onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                         onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                       >
//                         {category}
//                       </div>
//                     );
//                   }

//                   return (
//                     <div
//                       key={category}
//                       style={{
//                         ...styles.categoryTab,
//                         ...(activeBagsCategory === category ? styles.activeCategoryTab('#43e97b') : {})
//                       }}
//                       onClick={() => setActiveBagsCategory(category)}
//                       onMouseEnter={(e) => {
//                         if (activeBagsCategory !== category) {
//                           e.target.style.color = '#111';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (activeBagsCategory !== category) {
//                           e.target.style.color = '#222';
//                         }
//                       }}
//                     >
//                       {category}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('bags-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('bags-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="bags-container"
//                 style={styles.productsContainer}
//               >
//                 {bagsProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#43e97b')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #43e97b40';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #43e97b20';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#43e97b',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           👜 BAG
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#43e97b')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#43e97b';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#43e97b';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {bagsProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>👜</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No bags found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest bag collections</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Premium Watches Collection Section */}
//         <section id="watches-section" ref={watchesRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Premium Watches Collection</h2>
//               <p style={styles.popularProductsSubtitle}>Discover luxury and smart watches from top brands for every style.</p>
//             </div>

//             <div style={styles.categoryNavigation}>
//               <div></div>
//               <div style={styles.categoryTabs}>
//                 {watchBrandTabs.map((category, index) => {
//                   if (category === '>') {
//                     return (
//                       <div
//                         key={index}
//                         style={styles.arrowTab}
//                         onClick={() => navigate('/products?category=watches')}
//                         onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                         onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                       >
//                         {category}
//                       </div>
//                     );
//                   }

//                   return (
//                     <div
//                       key={category}
//                       style={{
//                         ...styles.categoryTab,
//                         ...(activeWatchCategory === category ? styles.activeCategoryTab('#8b5cf6') : {})
//                       }}
//                       onClick={() => setActiveWatchCategory(category)}
//                       onMouseEnter={(e) => {
//                         if (activeWatchCategory !== category) {
//                           e.target.style.color = '#111';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (activeWatchCategory !== category) {
//                           e.target.style.color = '#222';
//                         }
//                       }}
//                     >
//                       {category}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('watches-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('watches-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="watches-container"
//                 style={styles.productsContainer}
//               >
//                 {watchProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#8b5cf6')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #8b5cf640';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #8b5cf620';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#8b5cf6',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           ⌚ WATCH
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#8b5cf6')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#8b5cf6';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#8b5cf6';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {watchProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>⌚</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No watches found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest watch collections</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Beauty Products Section */}
//         <section id="beauty-section" ref={beautyRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Beauty & Personal Care</h2>
//               <p style={styles.popularProductsSubtitle}>Discover ALL premium beauty products, cosmetics, and personal care essentials - Only beauty items, no grocery.</p>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('beauty-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('beauty-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="beauty-container"
//                 style={styles.productsContainer}
//               >
//                 {beautyProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#ed64a6')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #ed64a640';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #ed64a620';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#ed64a6',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           💄 BEAUTY
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#ed64a6')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#ed64a6';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#ed64a6';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {beautyProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>💄</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No beauty products found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest beauty products</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Grocery Products Section */}
//         <section id="grocery-section" ref={groceryRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Fresh Groceries & Food</h2>
//               <p style={styles.popularProductsSubtitle}>Shop fresh groceries, organic foods, and daily essentials for your kitchen.</p>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('grocery-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('grocery-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="grocery-container"
//                 style={styles.productsContainer}
//               >
//                 {groceryProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#38a169')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #38a16940';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #38a16920';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#38a169',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           🛒 GROCERY
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Fresh Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#38a169')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#38a169';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#38a169';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {groceryProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>🛒</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No grocery products found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for fresh groceries and food items</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Statistics Section */}
//         <section style={styles.statsSection}>
//           <div style={styles.statsContainer}>
//             {statistics.map((stat, index) => (
//               <div 
//                 key={index} 
//                 style={styles.statCard}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-8px)';
//                   e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
//                 }}
//               >
//                 <div style={styles.statIcon}>{stat.icon}</div>
//                 <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
//                 <div style={styles.statLabel}>{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Features Section */}
//         <section style={styles.featuresSection}>
//           <div style={styles.sectionContainer}>
//             <div style={styles.sectionHeader}>
//               <h2 style={styles.sectionTitle}>
//                 Why Choose <span style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>ClassyShop</span>
//               </h2>
//               <p style={styles.sectionSubtitle}>
//                 We've reimagined online shopping to be more secure, faster, and enjoyable than ever before.
//               </p>
//             </div>
            
//             <div style={styles.featuresGrid}>
//               {features.map((feature, index) => (
//                 <div 
//                   key={index}
//                   style={styles.featureCard}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = 'translateY(-12px)';
//                     e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
//                     const img = e.target.querySelector('img');
//                     if (img) img.style.transform = 'scale(1.1)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
//                     const img = e.target.querySelector('img');
//                     if (img) img.style.transform = 'scale(1)';
//                   }}
//                 >
//                   <div style={styles.featureImageContainer}>
//                     <img 
//                       src={feature.image} 
//                       alt={feature.title}
//                       style={styles.featureImage}
//                     />
//                     <div style={styles.featureImageOverlay}>
//                       <div style={{...styles.featureIcon, background: feature.gradient}}>
//                         {feature.icon}
//                       </div>
//                     </div>
//                   </div>
//                   <div style={styles.featureContent}>
//                     <h3 style={styles.featureTitle}>{feature.title}</h3>
//                     <p style={styles.featureDescription}>{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Home;



// import React, { useState, useEffect, useContext, useRef } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useNavigate } from "react-router-dom";
// import { userContext } from '../Context/Context';
// import { config } from '../Config/Config';

// const Home = () => {
//   const {host} = config;
//   const { products = [], getAllProducts, loading } = useContext(userContext);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [activeSmartphoneCategory, setActiveSmartphoneCategory] = useState('ALL PHONES');
//   const [activeBagsCategory, setActiveBagsCategory] = useState('ALL BAGS');
//   const [activeWatchCategory, setActiveWatchCategory] = useState('ALL WATCHES');
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [currentPromoSlide, setCurrentPromoSlide] = useState(0);
//   const [activeFashionCategory, setActiveFashionCategory] = useState('ALL PRODUCTS');
//   const navigate = useNavigate();

//   // REFS FOR SMOOTH SCROLLING TO SECTIONS
//   const fashionRef = useRef(null);
//   const smartphoneRef = useRef(null);
//   const bagsRef = useRef(null);
//   const watchesRef = useRef(null);
//   const beautyRef = useRef(null);
//   const groceryRef = useRef(null);
//   const footwearRef = useRef(null);
//   const electronicsRef = useRef(null);

//   const features = [
//     {
//       icon: "🏪",
//       title: "Endless Variety",
//       description: "Explore millions of products from multiple categories all in one place.",
//       gradient: "linear-gradient(135deg, #667eea, #764ba2)",
//       image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//     },
//     {
//       icon: "🔒",
//       title: "Safe Shopping",
//       description: "Shop with confidence with our secure payment system and buyer protection.",
//       gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
//       image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//     },
//     {
//       icon: "🚚",
//       title: "Fast Delivery",
//       description: "Get your orders delivered quickly with real-time tracking.",
//       gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
//       image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//     }
//   ];

//   const statistics = [
//     { icon: "🛍️", value: "10K+", label: "Products Available", color: "#667eea" },
//     { icon: "🏷️", value: "50+", label: "Categories", color: "#4facfe" },
//     { icon: "⭐", value: "50K+", label: "Happy Customers", color: "#43e97b" },
//     { icon: "📈", value: "99%", label: "Satisfaction Rate", color: "#ff6b35" }
//   ];

//   // CATEGORY ICONS WITH CLICK HANDLERS
//   const categoryIcons = [
//     { icon: "👗", title: "Fashion", color: "#667eea", ref: fashionRef, clickable: true },
//     { icon: "📱", title: "Electronics", color: "#ff6b35", ref: smartphoneRef, clickable: true },
//     { icon: "👜", title: "Bags", color: "#43e97b", ref: bagsRef, clickable: true },
//     { icon: "👟", title: "Footwear", color: "#4facfe", ref: footwearRef, clickable: true },
//     { icon: "🛒", title: "Groceries", color: "#38a169", ref: groceryRef, clickable: true },
//     { icon: "💄", title: "Beauty", color: "#ed64a6", ref: beautyRef, clickable: true },
//     { icon: "⌚", title: "Watches", color: "#8b5cf6", ref: watchesRef, clickable: true },
//     { icon: "💍", title: "Jewellery", color: "#9f7aea", clickable: false }
//   ];

//   const heroBanners = [
//     {
//       image: "https://www.v2retail.com/wp-content/uploads/2023/07/EOSS-70-OFF-V2-Retail-Home-Page-banner-29-06-23.jpg",
//       alt: "Fashion Collection Banner"
//     },
//     {
//       image: "https://cdn.shopify.com/s/files/1/0486/5094/4664/files/web_banners_1bf84487-e84a-41b8-b816-e5cbae3e8cff.jpg?v=1630058585",
//       alt: "Electronics Banner"
//     },
//     {
//       image: "https://silkstoriesbyketki.com/wp-content/uploads/2023/06/Yellow-White-Modern-Special-Discount-Banner-.png",
//       alt: "Summer Sale Banner"
//     },
//     {
//       image: "https://cdn.shopify.com/s/files/1/0650/5922/5844/files/MARDAZ-FLAT-SALE_live-banner.gif?v=1662744615",
//       alt: "New Arrivals Banner"
//     },
//     {
//       image: "https://th.bing.com/th/id/R.ce624024749d90851bba866aa7dcbd58?rik=bW0WG%2bUF1PtvRA&riu=http%3a%2f%2fwww.tinygirlindia.com%2fcdn%2fshop%2fcollections%2fbarbie_-_1920px_x_700px-01.jpg%3fv%3d1736931768&ehk=27qHrko9S9yo3mpdjmlt3ZxUvT96novKD4Vj2c7KOjY%3d&risl=&pid=ImgRaw&r=0",
//       alt: "Kids Banner"
//     }
//   ];

//   const promoCards = [
//     {
//       id: 1,
//       title: "Big saving days sale",
//       productName: "Apple iPhone 15 128 GB, Pink",
//       price: "₹75,500.00",
//       originalPrice: "₹85,000.00",
//       buttonText: "SHOP NOW",
//       image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       background: "linear-gradient(135deg, #f8bbd9, #e91e63)",
//       isMain: true
//     },
//     {
//       id: 2,
//       title: "Buy Men's Footwear with low price",
//       price: "₹1500",
//       buttonText: "SHOP NOW",
//       image: "https://i.pinimg.com/736x/78/4b/32/784b32e2315c3a94c3603e132e2234ce.jpg",
//       background: "linear-gradient(135deg, #b3e5fc, #03a9f4)",
//       isMain: false
//     },
//     {
//       id: 3,
//       title: "Buy Apple iPhone",
//       price: "₹45000",
//       buttonText: "SHOP NOW",
//       image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       background: "linear-gradient(135deg, #c8e6c9, #4caf50)",
//       isMain: false
//     }
//   ];

//   const smartphoneBrandTabs = ['ALL PHONES', 'APPLE', 'SAMSUNG', 'ONEPLUS', 'XIAOMI', 'REALME', '>'];
//   const bagsBrandTabs = ['ALL BAGS', 'HANDBAGS', 'BACKPACKS', 'TRAVEL BAGS', 'LAPTOP BAGS', 'LADIES BAGS', '>'];
//   const watchBrandTabs = ['ALL WATCHES', 'APPLE', 'SAMSUNG', 'ROLEX', 'CASIO', 'TITAN', 'FOSSIL', '>'];
//   const fashionTabs = ['ALL PRODUCTS', 'MENS WEAR', 'WOMENS WEAR', 'KIDS WEAR', '>'];

//   const singleBannerImage = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

//   // SMOOTH SCROLL FUNCTION
//   const scrollToSection = (ref) => {
//     if (ref && ref.current) {
//       ref.current.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//     fetch(`${host}/customer/categories`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setCategories(data.categories);
//         }
//       })
//       .catch(err => console.error('Error fetching categories:', err));
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPromoSlide((prev) => (prev + 1) % promoCards.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const renderStars = (rating = 5) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <span key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9', fontSize: '14px' }}>
//         ★
//       </span>
//     ));
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(price);
//   };

//   const getDiscountPercentage = (product) => {
//     if (product.price >= 50000) return 30;
//     if (product.price >= 25000) return 25;
//     if (product.price >= 10000) return 20;
//     if (product.price >= 5000) return 15;
//     return 10;
//   };

//   const getCategoryColor = (category) => {
//     return '#667eea';
//   };

//   // Product filtering functions
//   const getFashionProducts = () => {
//     const allClothingProducts = products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();
      
//       const clothingKeywords = [
//         'dress', 'shirt', 'pant', 'trouser', 'suit', 'blazer', 'kurta', 'kurti', 'saree', 
//         'top', 'skirt', 'blouse', 'jeans', 'tunic', 'lehenga', 'choli', 'salwar', 'gown', 
//         'nighty', 'jacket', 'shorts', 'vest', 't-shirt', 'polo', 'hoodie', 'sweater', 
//         'cardigan', 'sweatshirt', 'tank', 'camisole', 'jumpsuit', 'romper', 'overalls',
//         'clothing', 'apparel', 'garment', 'wear'
//       ];

//       const excludeKeywords = [
//         'shoe', 'sandal', 'slipper', 'boot', 'sneaker', 'heel', 'footwear',
//         'bag', 'purse', 'handbag', 'backpack', 'wallet', 'clutch',
//         'phone', 'mobile', 'iphone', 'smartphone', 'tablet', 'laptop',
//         'watch', 'clock', 'smartwatch',
//         'beauty', 'makeup', 'cosmetic', 'lipstick', 'foundation',
//         'jewelry', 'jewellery', 'necklace', 'ring', 'earring', 'bracelet',
//         'grocery', 'food', 'rice', 'oil', 'spices'
//       ];

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;
      
//       const isClothing = clothingKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       return isClothing;
//     });

//     if (activeFashionCategory === 'ALL PRODUCTS') {
//       return allClothingProducts;
//     }

//     return allClothingProducts.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();

//       if (activeFashionCategory === 'MENS WEAR') {
//         const menMarkers = ['men', 'male', 'boy', 'gentleman', 'gents'];
//         const excludeMarkers = [
//           'women', 'ladies', 'female', 'kurti', 'saree', 'lehenga', 'choli', 
//           'nighty', 'skirt', 'blouse', 'salwar', 'gown',
//           'kid', 'kids', 'child', 'children', 'baby', 'toddler', 'infant'
//         ];
        
//         return (
//           menMarkers.some(word => name.includes(word) || cat.includes(word)) &&
//           !excludeMarkers.some(word => name.includes(word) || cat.includes(word))
//         );
//       }

//       if (activeFashionCategory === 'WOMENS WEAR') {
//         const womenMarkers = [
//           'women', 'woman', 'ladies', 'lady', 'female', 'girl', 
//           'kurti', 'saree', 'lehenga', 'choli', 'nighty', 'skirt', 'blouse', 
//           'salwar', 'gown', 'dress', 'top', 'tunic', 'camisole'
//         ];
        
//         return womenMarkers.some(word => name.includes(word) || cat.includes(word));
//       }

//       if (activeFashionCategory === 'KIDS WEAR') {
//         const kidsMarkers = ['kid', 'kids', 'child', 'children', 'baby', 'toddler', 'infant'];
//         return kidsMarkers.some(word => name.includes(word) || cat.includes(word));
//       }

//       return true;
//     });
//   };

//   const getSmartphoneProducts = () => {
//     const phoneKeywords = [
//       'phone', 'smartphone', 'mobile', 'iphone', 'android', 'cell', 'cellular'
//     ];

//     const excludeKeywords = [
//       'bag', 'case', 'cover', 'holder', 'stand', 'charger', 'cable', 'adapter',
//       'headphone', 'earphone', 'speaker', 'accessory', 'screen', 'protector',
//       'tablet', 'laptop', 'watch', 'smartwatch', 'computer', 'monitor',
//       'shirt', 'dress', 'pant', 'clothing', 'apparel', 'shoe', 'sandal',
//       'beauty', 'makeup', 'cosmetic', 'jewelry', 'jewellery'
//     ];

//     return products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();
//       const brand = (product.specifications?.brand || '').toLowerCase();

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;

//       const isPhone = phoneKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (!isPhone) return false;

//       if (activeSmartphoneCategory === 'ALL PHONES') return true;
      
//       const categoryBrand = activeSmartphoneCategory.toLowerCase();
//       return (
//         brand.includes(categoryBrand) || 
//         name.includes(categoryBrand)
//       );
//     });
//   };

//   const getBagsProducts = () => {
//     return products.filter(product => {
//       const cat = (product.category?.name || '').toLowerCase();
      
//       const bagCategories = [
//         'bags', 'bag', 'handbags', 'backpacks', 'purses', 'luggage'
//       ];
      
//       const isBagCategory = bagCategories.some(bagCategory => 
//         cat.includes(bagCategory) || cat === bagCategory
//       );
      
//       if (!isBagCategory) return false;

//       if (activeBagsCategory === 'ALL BAGS') return true;
      
//       const name = (product.name || '').toLowerCase();
      
//       switch(activeBagsCategory) {
//         case 'HANDBAGS':
//           return name.includes('handbag') || name.includes('purse') || name.includes('clutch');
//         case 'BACKPACKS':
//           return name.includes('backpack') || name.includes('rucksack') || name.includes('school');
//         case 'TRAVEL BAGS':
//           return name.includes('travel') || name.includes('duffle') || name.includes('luggage') || name.includes('suitcase');
//         case 'LAPTOP BAGS':
//           return name.includes('laptop') || name.includes('computer') || name.includes('briefcase') || name.includes('office');
//         case 'LADIES BAGS':
//           return name.includes('ladies') || name.includes('lady') || name.includes('women') || name.includes('female');
//         default:
//           return true;
//       }
//     });
//   };

//   const getWatchProducts = () => {
//     const watchKeywords = [
//       'watch', 'watches', 'timepiece', 'smartwatch', 'wristwatch', 'chronograph'
//     ];

//     const excludeKeywords = [
//       'phone', 'mobile', 'smartphone', 'bag', 'case', 'cover', 'strap',
//       'shirt', 'dress', 'pant', 'clothing', 'apparel', 'shoe', 'sandal',
//       'beauty', 'makeup', 'cosmetic', 'jewelry', 'jewellery', 'ring', 'necklace'
//     ];

//     return products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();
//       const brand = (product.specifications?.brand || '').toLowerCase();

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;

//       const isWatch = watchKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (!isWatch) return false;

//       if (activeWatchCategory === 'ALL WATCHES') return true;
      
//       const categoryBrand = activeWatchCategory.toLowerCase();
//       return (
//         brand.includes(categoryBrand) || 
//         name.includes(categoryBrand)
//       );
//     });
//   };

//   const getBeautyProducts = () => {
//     return products.filter(product => {
//       const cat = (product.category?.name || '').toLowerCase();
//       const name = (product.name || '').toLowerCase();
      
//       const beautyCategories = [
//         'beauty products',
//         'beauty',
//         'cosmetics',
//         'makeup',
//         'personal care',
//         'skincare'
//       ];
      
//       const matchesCategory = beautyCategories.some(beautyCategory => 
//         cat.includes(beautyCategory)
//       );
      
//       if (matchesCategory) return true;
      
//       const beautyKeywords = [
//         'lipstick', 'foundation', 'mascara', 'perfume', 'shampoo', 
//         'lotion', 'cream', 'soap', 'face wash'
//       ];
      
//       return beautyKeywords.some(keyword => name.includes(keyword));
//     });
//   };

//   const getGroceryProducts = () => {
//     const groceryKeywords = [
//       'grocery', 'groceries', 'food', 'rice', 'wheat', 'dal', 'oil', 'spices',
//       'tea', 'coffee', 'sugar', 'salt', 'flour', 'milk', 'butter', 'cheese',
//       'bread', 'biscuit', 'snack', 'chocolate', 'candy', 'fruit', 'vegetable',
//       'organic', 'fresh', 'frozen', 'canned', 'packaged', 'instant', 'cooking',
//       'kitchen', 'cereal', 'pasta', 'sauce', 'juice', 'water', 'nuts',
//       'surf', 'excel', 'detergent', 'washing', 'fabric', 'tide', 'ariel',
//       'turmeric', 'haldi', 'masala', 'spice', 'chilli', 'pepper', 'cumin', 'coriander',
//       'atta', 'maida', 'besan', 'basmati', 'quinoa', 'oats', 'poha'
//     ];

//     const excludeKeywords = [
//       'phone', 'mobile', 'smartphone', 'bag', 'shirt', 'dress', 'pant', 'clothing',
//       'shoe', 'sandal', 'watch', 'jewelry', 'jewellery',
//       'beauty', 'makeup', 'cosmetic', 'lipstick', 'foundation', 'mascara', 
//       'eyeliner', 'concealer', 'powder', 'blush', 'eyeshadow', 'nail', 'polish',
//       'perfume', 'fragrance', 'cologne', 'skincare', 'lotion', 'cream', 'serum',
//       'shampoo', 'conditioner', 'soap', 'face', 'moisturizer', 'cleanser',
//       'toner', 'sunscreen', 'deodorant'
//     ];

//     return products.filter(product => {
//       const name = (product.name || '').toLowerCase();
//       const cat = (product.category?.name || '').toLowerCase();

//       const isExcluded = excludeKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       if (isExcluded) return false;

//       const isGrocery = groceryKeywords.some(word => 
//         name.includes(word) || cat.includes(word)
//       );
      
//       return isGrocery;
//     });
//   };

//   // FIXED: Most reliable navigation fix - forces complete page reload
//   const handleProductNavigation = (product) => {
//     if (product.stock === 0) {
//       alert('Product is out of stock');
//       return;
//     }
    
//     // Force complete page reload/navigation - MOST RELIABLE
//     window.location.href = `/product/${product._id}`;
//   };

//   const handleSeeAllClick = () => {
//     navigate('/products');
//   };

//   const scrollProductsLeft = () => {
//     const container = document.getElementById('products-container');
//     if (container) {
//       container.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };

//   const scrollProductsRight = () => {
//     const container = document.getElementById('products-container');
//     if (container) {
//       container.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

//   // STYLES
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       paddingTop: '0px'
//     },
    
//     heroBannerAndCategoriesSection: {
//       backgroundColor: '#f9f1eb',
//       paddingTop: '30px',
//       paddingBottom: '30px',
//       marginTop: '-10px'
//     },
    
//     heroBannerSlider: {
//       position: 'relative',
//       width: '100%',
//       maxWidth: '1400px',
//       height: '450px',
//       margin: '0 auto 40px auto',
//       overflow: 'hidden',
//       borderRadius: '20px'
//     },

//     bannerContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       overflow: 'hidden',
//       transform: 'scale(1)',
//     },

//     bannerSlide: {
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       opacity: 0,
//       transform: 'translateX(100%) scale(1)',
//       transition: 'all 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
//       transformOrigin: 'center center'
//     },

//     activeBannerSlide: {
//       opacity: 1,
//       transform: 'translateX(0) scale(1)',
//       zIndex: 1
//     },

//     prevBannerSlide: {
//       transform: 'translateX(-100%) scale(1)'
//     },

//     nextBannerSlide: {
//       transform: 'translateX(100%) scale(1)'
//     },

//     bannerImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'fit',
//       objectPosition: 'center',
//       display: 'block',
//       transform: 'scale(1)',
//       transition: 'none',
//       maxWidth: 'none',
//       maxHeight: '100vh'
//     },

//     bannerNavButton: {
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: '50px',
//       height: '50px',
//       borderRadius: '50%',
//       border: 'none',
//       background: 'rgba(255, 255, 255, 0.9)',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       color: '#333',
//       transition: 'all 0.3s ease',
//       zIndex: 10,
//       boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
//     },

//     bannerIndicators: {
//       position: 'absolute',
//       bottom: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       display: 'flex',
//       gap: '12px',
//       zIndex: 10
//     },

//     bannerIndicator: {
//       width: '12px',
//       height: '12px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(236, 137, 137, 0.5)',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       border: '2px solid rgba(255, 176, 176, 0.7)'
//     },

//     activeBannerIndicator: {
//       backgroundColor: 'rgba(249, 214, 214, 1)',
//       transform: 'scale(1.2)'
//     },

//     categoriesContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },
    
//     categoriesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(8, 1fr)',
//       gap: '20px',
//       alignItems: 'center',
//       justifyItems: 'center'
//     },
    
//     categoryCard: {
//       backgroundColor: 'white',
//       borderRadius: '16px',
//       padding: '30px 15px',
//       textAlign: 'center',
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
//       transition: 'all 0.3s ease',
//       width: '100%',
//       maxWidth: '140px',
//       minHeight: '120px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },

//     categoryCardClickable: {
//       cursor: 'pointer',
//     },

//     categoryCardDisabled: {
//       cursor: 'not-allowed',
//       opacity: 0.6
//     },
    
//     categoryIcon: {
//       fontSize: '36px',
//       marginBottom: '12px',
//       display: 'block'
//     },
    
//     categoryTitle: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#2d3748'
//     },
    
//     popularProductsSection: {
//       padding: '10px 0',
//       backgroundColor: '#fff'
//     },
    
//     popularProductsContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },
    
//     popularProductsHeader: {
//       marginBottom: '5px'
//     },
    
//   popularProductsTitle: {
//     fontSize: '28px',
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: '0px'  // Reduced gap
//   },
  
//   popularProductsSubtitle: {
//     fontSize: '14px',
//     color: '#6b7280',
//     marginBottom: '0',
//     marginTop: '0'  // No top margin
//   },

//     categoryNavigation: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       margin: '0 0 15px 0'
//     },

//     categoryTabs: {
//       display: 'flex',
//       gap: '24px',
//       position: 'relative'
//     },
    
//     categoryTab: {
//       fontSize: '13px',
//       fontWeight: '600',
//       color: '#222',
//       cursor: 'pointer',
//       paddingBottom: '4px',
//       position: 'relative',
//       transition: 'color 0.2s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.3px',
//       borderBottom: '2px solid transparent',
//       padding: '8px 16px',
//       borderRadius: '8px'
//     },
    
//     activeCategoryTab: (color) => ({
//       color: color,
//       fontWeight: '700',
//       borderBottom: `2px solid ${color}`,
//       backgroundColor: `${color}15`
//     }),

//     arrowTab: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: '#ef4444',
//       cursor: 'pointer',
//       paddingBottom: '4px'
//     },

//     productsCarouselWrapper: {
//       position: 'relative'
//     },

//     productsScrollButton: {
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: '40px',
//       height: '40px',
//       backgroundColor: 'white',
//       border: '1px solid #e5e7eb',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       zIndex: 10,
//       fontSize: '16px',
//       color: '#374151',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//       transition: 'all 0.3s ease'
//     },

//     leftProductsButton: {
//       left: '-20px'
//     },

//     rightProductsButton: {
//       right: '-20px'
//     },

//     productsContainer: {
//       display: 'flex',
//       gap: '20px',
//       overflowX: 'auto',
//       scrollBehavior: 'smooth',
//       paddingBottom: '10px',
//       scrollbarWidth: 'none',
//       msOverflowStyle: 'none'
//     },
    
//     productCard: (borderColor) => ({
//       minWidth: '240px',
//       width: '240px',
//       backgroundColor: '#fff',
//       borderRadius: '12px',
//       overflow: 'hidden',
//       position: 'relative',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       flexShrink: 0,
//       border: `2px solid ${borderColor}`,
//       boxShadow: `0 4px 20px ${borderColor}20`
//     }),
    
//     productImageContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '280px',
//       overflow: 'hidden',
//       backgroundColor: '#f9fafb'
//     },
    
//     productImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'contain',
//       objectPosition: 'center'
//     },
    
//     discountBadge: {
//       position: 'absolute',
//       top: '12px',
//       left: '12px',
//       backgroundColor: '#ef4444',
//       color: '#fff',
//       padding: '4px 8px',
//       borderRadius: '50px',
//       fontSize: '12px',
//       fontWeight: '600'
//     },
    
//     productInfo: {
//       padding: '16px'
//     },
    
//     productBrand: {
//       fontSize: '12px',
//       color: '#6b7280',
//       marginBottom: '4px',
//       fontWeight: '500'
//     },
    
//     productName: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#1f2937',
//       marginBottom: '8px',
//       lineHeight: '1.3',
//       height: '34px',
//       overflow: 'hidden',
//       display: '-webkit-box',
//       WebkitLineClamp: 2,
//       WebkitBoxOrient: 'vertical'
//     },
    
//     productRating: {
//       display: 'flex',
//       alignItems: 'center',
//       marginBottom: '8px',
//       fontSize: '14px'
//     },
    
//     productPricing: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       marginBottom: '12px'
//     },
    
//     originalPrice: {
//       fontSize: '14px',
//       color: '#9ca3af',
//       textDecoration: 'line-through'
//     },
    
//     currentPrice: {
//       fontSize: '16px',
//       fontWeight: '700',
//       color: '#ef4444'
//     },
    
//     addToCartButton: (borderColor) => ({
//       width: '100%',
//       padding: '8px 16px',
//       backgroundColor: 'transparent',
//       border: `1px solid ${borderColor}`,
//       color: borderColor,
//       borderRadius: '6px',
//       fontSize: '12px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '6px',
//       textTransform: 'uppercase'
//     }),

//     promoSection: {
//       padding: '40px 0',
//       backgroundColor: '#f8fafc'
//     },

//     promoContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },

//     promoLayout: {
//       display: 'grid',
//       gridTemplateColumns: '2fr 1fr',
//       gap: '20px',
//       height: '300px'
//     },

//     mainPromoCard: {
//       position: 'relative',
//       borderRadius: '20px',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },

//     promoCardContent: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '40px',
//       color: 'white',
//       zIndex: 2
//     },

//     promoCardLeft: {
//       flex: 1,
//       maxWidth: '50%'
//     },

//     promoCardTitle: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '10px',
//       opacity: 0.9
//     },

//     promoCardProductName: {
//       fontSize: '32px',
//       fontWeight: '700',
//       lineHeight: '1.2',
//       marginBottom: '15px'
//     },

//     promoCardPriceText: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '5px',
//       opacity: 0.9
//     },

//     promoCardPrice: {
//       fontSize: '36px',
//       fontWeight: '800',
//       marginBottom: '25px'
//     },

//     promoCardButton: {
//       padding: '12px 24px',
//       backgroundColor: '#ef4444',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '14px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },

//     promoCardRight: {
//       flex: 1,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       maxWidth: '50%'
//     },

//     promoCardImage: {
//       width: '100%',
//       height: '250px',
//       objectFit: 'contain'
//     },

//     promoNavButtons: {
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       border: '1px solid rgba(255, 255, 255, 0.3)',
//       color: 'white',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '18px',
//       transition: 'all 0.3s ease',
//       zIndex: 3
//     },

//     promoNavLeft: {
//       left: '15px'
//     },

//     promoNavRight: {
//       right: '15px'
//     },

//     promoIndicators: {
//       position: 'absolute',
//       bottom: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       display: 'flex',
//       gap: '8px',
//       zIndex: 3
//     },

//     promoIndicator: {
//       width: '8px',
//       height: '8px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255, 255, 255, 0.4)',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },

//     activePromoIndicator: {
//       backgroundColor: 'white',
//       transform: 'scale(1.2)'
//     },

//     sidePromoCards: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '15px'
//     },

//     sidePromoCard: {
//       height: '142.5px',
//       borderRadius: '16px',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       position: 'relative'
//     },

//     sidePromoCardContent: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '20px',
//       color: 'white',
//       zIndex: 2
//     },

//     sidePromoCardLeft: {
//       flex: 1
//     },

//     sidePromoCardTitle: {
//       fontSize: '14px',
//       fontWeight: '600',
//       lineHeight: '1.3',
//       marginBottom: '8px'
//     },

//     sidePromoCardPrice: {
//       fontSize: '20px',
//       fontWeight: '800',
//       marginBottom: '10px'
//     },

//     sidePromoCardButton: {
//       padding: '6px 12px',
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       color: 'white',
//       border: '1px solid rgba(255, 255, 255, 0.3)',
//       borderRadius: '6px',
//       fontSize: '12px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       textDecoration: 'underline'
//     },

//     sidePromoCardRight: {
//       width: '80px',
//       height: '80px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },

//     sidePromoCardImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'contain'
//     },

//     singleBannerSection: {
//       padding: '40px 0',
//       backgroundColor: '#f8fafc'
//     },

//     singleBannerContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },

//     singleBannerImage: {
//       width: '100%',
//       height: '350px',
//       borderRadius: '20px',
//       objectFit: 'contain',
//       objectPosition: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#fff'
//     },

//     statsSection: {
//       padding: '40px 0',
//       backgroundColor: 'white'
//     },
    
//     statsContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px',
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: '40px'
//     },
    
//     statCard: {
//       background: 'white',
//       borderRadius: '20px',
//       padding: '40px 30px',
//       textAlign: 'center',
//       boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
//       transition: 'all 0.3s ease',
//       border: '1px solid #e2e8f0'
//     },
    
//     statIcon: {
//       fontSize: '36px',
//       marginBottom: '20px'
//     },
    
//     statValue: {
//       fontSize: '36px',
//       fontWeight: '800',
//       marginBottom: '12px'
//     },
    
//     statLabel: {
//       color: '#718096',
//       fontSize: '16px',
//       fontWeight: '500'
//     },
    
//     featuresSection: {
//       padding: '50px 0',
//       backgroundColor: '#f8fafc'
//     },
    
//     sectionContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '0 20px'
//     },
    
//     sectionHeader: {
//       textAlign: 'center',
//       marginBottom: '60px'
//     },
    
//     sectionTitle: {
//       fontSize: '48px',
//       fontWeight: '800',
//       color: '#2d3748',
//       marginBottom: '20px'
//     },
    
//     sectionSubtitle: {
//       fontSize: '20px',
//       color: '#718096',
//       maxWidth: '700px',
//       margin: '0 auto',
//       lineHeight: '1.6'
//     },
    
//     featuresGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//       gap: '40px'
//     },

//     featureCard: {
//       background: 'white',
//       borderRadius: '24px',
//       overflow: 'hidden',
//       boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e2e8f0',
//       transition: 'all 0.5s ease'
//     },
    
//     featureImageContainer: {
//       position: 'relative',
//       height: '250px',
//       overflow: 'hidden'
//     },
    
//     featureImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       transition: 'transform 0.3s ease'
//     },
    
//     featureImageOverlay: {
//       position: 'absolute',
//       inset: 0,
//       background: 'rgba(0, 0, 0, 0.4)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
    
//     featureIcon: {
//       width: '80px',
//       height: '80px',
//       borderRadius: '16px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '32px',
//       color: 'white',
//       transition: 'transform 0.3s ease'
//     },
    
//     featureContent: {
//       padding: '30px',
//       textAlign: 'center'
//     },
    
//     featureTitle: {
//       fontSize: '24px',
//       fontWeight: '700',
//       color: '#2d3748',
//       marginBottom: '16px'
//     },
    
//     featureDescription: {
//       color: '#718096',
//       lineHeight: '1.6',
//       fontSize: '16px'
//     }
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
//   };

//   const nextPromoSlide = () => {
//     setCurrentPromoSlide((prev) => (prev + 1) % promoCards.length);
//   };

//   const prevPromoSlide = () => {
//     setCurrentPromoSlide((prev) => (prev - 1 + promoCards.length) % promoCards.length);
//   };

//   if (loading) {
//     return (
//       <div style={{...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
//         <div style={{textAlign: 'center'}}>
//           <div style={{fontSize: '48px', marginBottom: '20px'}}>🛍️</div>
//           <div style={{fontSize: '18px', color: '#718096'}}>Loading products...</div>
//         </div>
//       </div>
//     );
//   }

//   const fashionProducts = getFashionProducts();
//   const smartphoneProducts = getSmartphoneProducts();
//   const bagsProducts = getBagsProducts();
//   const watchProducts = getWatchProducts();
//   const beautyProducts = getBeautyProducts();
//   const groceryProducts = getGroceryProducts();
//   const currentPromoCard = promoCards[currentPromoSlide];
//   const sidePromoCards = promoCards.filter((_, index) => index !== currentPromoSlide);

//   return (
//     <>
//       <div style={styles.container}>
//         <Header />

//         {/* Hero Banner + Categories Section */}
//         <section style={styles.heroBannerAndCategoriesSection}>
//           <div style={styles.heroBannerSlider}>
//             <div style={styles.bannerContainer}>
//               {heroBanners.map((banner, index) => (
//                 <div 
//                   key={index}
//                   style={{
//                     ...styles.bannerSlide,
//                     ...(index === currentSlide ? styles.activeBannerSlide : 
//                        index === (currentSlide - 1 + heroBanners.length) % heroBanners.length ? styles.prevBannerSlide : 
//                        styles.nextBannerSlide)
//                   }}
//                 >
//                   <img 
//                     src={banner.image}
//                     alt={banner.alt}
//                     style={styles.bannerImage}
//                     onLoad={(e) => {
//                       e.target.style.transform = 'scale(1)';
//                     }}
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80';
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             <button 
//               style={{...styles.bannerNavButton, left: '30px'}}
//               onClick={prevSlide}
//               onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 1)'}
//               onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
//             >
//               ‹
//             </button>
//             <button 
//               style={{...styles.bannerNavButton, right: '30px'}}
//               onClick={nextSlide}
//               onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 1)'}
//               onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
//             >
//               ›
//             </button>

//             <div style={styles.bannerIndicators}>
//               {heroBanners.map((_, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     ...styles.bannerIndicator,
//                     ...(index === currentSlide ? styles.activeBannerIndicator : {})
//                   }}
//                   onClick={() => setCurrentSlide(index)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Categories Grid */}
//           <div style={styles.categoriesContainer}>
//             <div style={styles.categoriesGrid}>
//               {categoryIcons.map((category, index) => (
//                 <div 
//                   key={index} 
//                   style={{
//                     ...styles.categoryCard,
//                     ...(category.clickable ? styles.categoryCardClickable : styles.categoryCardDisabled)
//                   }}
//                   onMouseEnter={(e) => {
//                     if (category.clickable) {
//                       e.target.style.transform = 'translateY(-8px)';
//                       e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (category.clickable) {
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
//                     }
//                   }}
//                   onClick={() => {
//                     if (category.clickable && category.ref) {
//                       scrollToSection(category.ref);
//                     }
//                   }}
//                 >
//                   <span style={{...styles.categoryIcon, color: category.color}}>
//                     {category.icon}
//                   </span>
//                   <div style={styles.categoryTitle}>{category.title}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Fashion Section */}
//         <section id="fashion-section" ref={fashionRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Fashion</h2>
//               <div style={styles.categoryNavigation}>
//                 <p style={styles.popularProductsSubtitle}>Discover clothing styles for Men, Women & Kids - Only dress/garment products.</p>
//                 <div style={styles.categoryTabs}>
//                   {fashionTabs.map((category, index) => {
//                     if (category === '>') {
//                       return (
//                         <div
//                           key={index}
//                           style={styles.arrowTab}
//                           onClick={handleSeeAllClick}
//                           onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                           onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                         >
//                           {category}
//                         </div>
//                       );
//                     }

//                     return (
//                       <div
//                         key={category}
//                         style={{
//                           ...styles.categoryTab,
//                           ...(activeFashionCategory === category ? styles.activeCategoryTab('#667eea') : {})
//                         }}
//                         onClick={() => setActiveFashionCategory(category)}
//                         onMouseEnter={(e) => {
//                           if (activeFashionCategory !== category) {
//                             e.target.style.color = '#111';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (activeFashionCategory !== category) {
//                             e.target.style.color = '#222';
//                           }
//                         }}
//                       >
//                         {category}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={scrollProductsLeft}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={scrollProductsRight}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="products-container"
//                 style={styles.productsContainer}
//               >
//                 {fashionProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
//                   const categoryColor = getCategoryColor(activeFashionCategory);
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard(categoryColor)}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = `0 8px 25px ${categoryColor}40`;
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = `0 4px 20px ${categoryColor}20`;
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton(categoryColor)}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = categoryColor;
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = categoryColor;
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {fashionProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>👗</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No clothing products found for {activeFashionCategory}</h3>
//                   <p style={{fontSize: '16px'}}>Try selecting a different category or check back later</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Promotional Cards Section */}
//         <section style={styles.promoSection}>
//           <div style={styles.promoContainer}>
//             <div style={styles.promoLayout}>
//               <div 
//                 style={{
//                   ...styles.mainPromoCard,
//                   background: currentPromoCard.background
//                 }}
//                 onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
//                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                 onClick={() => navigate('/products')}
//               >
//                 <div style={styles.promoCardContent}>
//                   <div style={styles.promoCardLeft}>
//                     <div style={styles.promoCardTitle}>{currentPromoCard.title}</div>
//                     {currentPromoCard.productName && (
//                       <h2 style={styles.promoCardProductName}>{currentPromoCard.productName}</h2>
//                     )}
//                     <div style={styles.promoCardPriceText}>Starting At Only</div>
//                     <div style={styles.promoCardPrice}>{currentPromoCard.price}</div>
//                     <button 
//                       style={styles.promoCardButton}
//                       onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
//                       onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
//                     >
//                       {currentPromoCard.buttonText}
//                     </button>
//                   </div>
//                   <div style={styles.promoCardRight}>
//                     <img 
//                       src={currentPromoCard.image} 
//                       alt={currentPromoCard.productName || currentPromoCard.title}
//                       style={styles.promoCardImage}
//                     />
//                   </div>
//                 </div>

//                 <button 
//                   style={{...styles.promoNavButtons, ...styles.promoNavLeft}}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     prevPromoSlide();
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//                 >
//                   ‹
//                 </button>
//                 <button 
//                   style={{...styles.promoNavButtons, ...styles.promoNavRight}}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     nextPromoSlide();
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//                 >
//                   ›
//                 </button>

//                 <div style={styles.promoIndicators}>
//                   {promoCards.map((_, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         ...styles.promoIndicator,
//                         ...(index === currentPromoSlide ? styles.activePromoIndicator : {})
//                       }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCurrentPromoSlide(index);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div style={styles.sidePromoCards}>
//                 {sidePromoCards.map((card) => (
//                   <div 
//                     key={card.id}
//                     style={{
//                       ...styles.sidePromoCard,
//                       background: card.background
//                     }}
//                     onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                     onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                     onClick={() => navigate('/products')}
//                   >
//                     <div style={styles.sidePromoCardContent}>
//                       <div style={styles.sidePromoCardLeft}>
//                         <div style={styles.sidePromoCardTitle}>{card.title}</div>
//                         <div style={styles.sidePromoCardPrice}>{card.price}</div>
//                         <button 
//                           style={styles.sidePromoCardButton}
//                           onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
//                           onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//                         >
//                           {card.buttonText}
//                         </button>
//                       </div>
//                       <div style={styles.sidePromoCardRight}>
//                         <img 
//                           src={card.image} 
//                           alt={card.title}
//                           style={styles.sidePromoCardImage}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Trending Smartphones Section */}
//         <section id="smartphone-section" ref={smartphoneRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Trending Smartphones</h2>
//               <div style={styles.categoryNavigation}>
//                 <p style={styles.popularProductsSubtitle}>Discover the latest smartphones with the best deals and cutting-edge technology.</p>
//                 <div style={styles.categoryTabs}>
//                   {smartphoneBrandTabs.map((category, index) => {
//                     if (category === '>') {
//                       return (
//                         <div
//                           key={index}
//                           style={styles.arrowTab}
//                           onClick={() => navigate('/products?category=smartphones')}
//                           onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                           onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                         >
//                           {category}
//                         </div>
//                       );
//                     }

//                     return (
//                       <div
//                         key={category}
//                         style={{
//                           ...styles.categoryTab,
//                           ...(activeSmartphoneCategory === category ? styles.activeCategoryTab('#ff6b35') : {})
//                         }}
//                         onClick={() => setActiveSmartphoneCategory(category)}
//                         onMouseEnter={(e) => {
//                           if (activeSmartphoneCategory !== category) {
//                             e.target.style.color = '#111';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (activeSmartphoneCategory !== category) {
//                             e.target.style.color = '#222';
//                           }
//                         }}
//                       >
//                         {category}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('smartphones-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>
              
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('smartphones-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="smartphones-container"
//                 style={styles.productsContainer}
//               >
//                 {smartphoneProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#ff6b35')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #ff6b3540';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #ff6b3520';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#3b82f6',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           📱 PHONE
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                                                
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#ff6b35')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#ff6b35';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#ff6b35';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {smartphoneProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>📱</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No smartphones found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest smartphone deals</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Single Banner Image Section */}
//         <section style={styles.singleBannerSection}>
//           <div style={styles.singleBannerContainer}>
//             <img 
//               src={singleBannerImage}
//               alt="Special Promotion Banner"
//               style={styles.singleBannerImage}
//               onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
//               onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//               onClick={() => navigate('/products')}
//             />
//           </div>
//         </section>

//         {/* Premium Bags Collection Section */}
//         <section id="bags-section" ref={bagsRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Premium Bags Collection</h2>
//               <div style={styles.categoryNavigation}>
//                 <p style={styles.popularProductsSubtitle}>Discover stylish and functional bags for every occasion and lifestyle.</p>
//                 <div style={styles.categoryTabs}>
//                   {bagsBrandTabs.map((category, index) => {
//                     if (category === '>') {
//                       return (
//                         <div
//                           key={index}
//                           style={styles.arrowTab}
//                           onClick={() => navigate('/products?category=bags')}
//                           onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                           onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                         >
//                           {category}
//                         </div>
//                       );
//                     }

//                     return (
//                       <div
//                         key={category}
//                         style={{
//                           ...styles.categoryTab,
//                           ...(activeBagsCategory === category ? styles.activeCategoryTab('#43e97b') : {})
//                         }}
//                         onClick={() => setActiveBagsCategory(category)}
//                         onMouseEnter={(e) => {
//                           if (activeBagsCategory !== category) {
//                             e.target.style.color = '#111';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (activeBagsCategory !== category) {
//                             e.target.style.color = '#222';
//                           }
//                         }}
//                       >
//                         {category}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('bags-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('bags-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="bags-container"
//                 style={styles.productsContainer}
//               >
//                 {bagsProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#43e97b')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #43e97b40';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #43e97b20';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#43e97b',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           👜 BAG
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#43e97b')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#43e97b';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#43e97b';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {bagsProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>👜</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No bags found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest bag collections</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Premium Watches Collection Section */}
//         <section id="watches-section" ref={watchesRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Premium Watches Collection</h2>
//               <div style={styles.categoryNavigation}>
//                 <p style={styles.popularProductsSubtitle}>Discover luxury and smart watches from top brands for every style.</p>
//                 <div style={styles.categoryTabs}>
//                   {watchBrandTabs.map((category, index) => {
//                     if (category === '>') {
//                       return (
//                         <div
//                           key={index}
//                           style={styles.arrowTab}
//                           onClick={() => navigate('/products?category=watches')}
//                           onMouseEnter={(e) => e.target.style.color = '#dc2626'}
//                           onMouseLeave={(e) => e.target.style.color = '#ef4444'}
//                         >
//                           {category}
//                         </div>
//                       );
//                     }

//                     return (
//                       <div
//                         key={category}
//                         style={{
//                           ...styles.categoryTab,
//                           ...(activeWatchCategory === category ? styles.activeCategoryTab('#8b5cf6') : {})
//                         }}
//                         onClick={() => setActiveWatchCategory(category)}
//                         onMouseEnter={(e) => {
//                           if (activeWatchCategory !== category) {
//                             e.target.style.color = '#111';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (activeWatchCategory !== category) {
//                             e.target.style.color = '#222';
//                           }
//                         }}
//                       >
//                         {category}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('watches-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('watches-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="watches-container"
//                 style={styles.productsContainer}
//               >
//                 {watchProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#8b5cf6')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #8b5cf640';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #8b5cf620';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#8b5cf6',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           ⌚ WATCH
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#8b5cf6')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#8b5cf6';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#8b5cf6';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {watchProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>⌚</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No watches found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest watch collections</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Beauty Products Section */}
//         <section id="beauty-section" ref={beautyRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Beauty & Personal Care</h2>
//               <div style={styles.categoryNavigation}>
//                 <p style={styles.popularProductsSubtitle}>Discover ALL premium beauty products, cosmetics, and personal care essentials - Only beauty items, no grocery.</p>
//                 <div style={styles.categoryTabs}>
//                   {/* No tabs for beauty section as requested */}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('beauty-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('beauty-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="beauty-container"
//                 style={styles.productsContainer}
//               >
//                 {beautyProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#ed64a6')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #ed64a640';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #ed64a620';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#ed64a6',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           💄 BEAUTY
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#ed64a6')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#ed64a6';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#ed64a6';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {beautyProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>💄</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No beauty products found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for the latest beauty products</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Grocery Products Section */}
//         <section id="grocery-section" ref={groceryRef} style={styles.popularProductsSection}>
//           <div style={styles.popularProductsContainer}>
//             <div style={styles.popularProductsHeader}>
//               <h2 style={styles.popularProductsTitle}>Fresh Groceries & Food</h2>
//               <div style={styles.categoryNavigation}>
//                 <p style={styles.popularProductsSubtitle}>Shop fresh groceries, organic foods, and daily essentials for your kitchen.</p>
//                 <div style={styles.categoryTabs}>
//                   {/* No tabs for grocery section as requested */}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.productsCarouselWrapper}>
//               <button 
//                 style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('grocery-container');
//                   if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ‹
//               </button>

//               <button 
//                 style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
//                 onClick={() => {
//                   const container = document.getElementById('grocery-container');
//                   if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 ›
//               </button>

//               <div 
//                 id="grocery-container"
//                 style={styles.productsContainer}
//               >
//                 {groceryProducts.map((product) => {
//                   const discount = getDiscountPercentage(product);
//                   const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
//                   return (
//                     <div 
//                       key={product._id} 
//                       style={styles.productCard('#38a169')}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = 'translateY(-4px)';
//                         e.target.style.boxShadow = '0 8px 25px #38a16940';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = '0 4px 20px #38a16920';
//                       }}
//                       onClick={() => handleProductNavigation(product)}
//                     >
//                       <div style={styles.productImageContainer}>
//                         <img 
//                           src={`${host}/uploads/products/${product.images[0]}`} 
//                           alt={product.name} 
//                           style={styles.productImage} 
//                           onError={(e) => {
//                             e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
//                           }}
//                         />
//                         <div style={styles.discountBadge}>{discount}%</div>
                        
//                         <div style={{
//                           position: 'absolute',
//                           top: '12px',
//                           right: '12px',
//                           backgroundColor: '#38a169',
//                           color: '#fff',
//                           padding: '4px 8px',
//                           borderRadius: '50px',
//                           fontSize: '10px',
//                           fontWeight: '600'
//                         }}>
//                           🛒 GROCERY
//                         </div>
//                       </div>
                      
//                       <div style={styles.productInfo}>
//                         <div style={styles.productBrand}>{product.specifications?.brand || 'Fresh Brand'}</div>
//                         <h3 style={styles.productName}>{product.name}</h3>
                        
//                         <div style={styles.productRating}>
//                           {renderStars(5)}
//                         </div>
                        
//                         <div style={styles.productPricing}>
//                           <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
//                           <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
//                         </div>
                        
//                         <button 
//                           style={styles.addToCartButton('#38a169')}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = '#38a169';
//                             e.target.style.color = '#fff';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#38a169';
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductNavigation(product);
//                           }}
//                         >
//                           VIEW DETAILS
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {groceryProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '80px 20px',
//                   color: '#718096'
//                 }}>
//                   <div style={{fontSize: '64px', marginBottom: '24px'}}>🛒</div>
//                   <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No grocery products found</h3>
//                   <p style={{fontSize: '16px'}}>Check back later for fresh groceries and food items</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Statistics Section */}
//         <section style={styles.statsSection}>
//           <div style={styles.statsContainer}>
//             {statistics.map((stat, index) => (
//               <div 
//                 key={index} 
//                 style={styles.statCard}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-8px)';
//                   e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
//                 }}
//               >
//                 <div style={styles.statIcon}>{stat.icon}</div>
//                 <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
//                 <div style={styles.statLabel}>{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Features Section */}
//         <section style={styles.featuresSection}>
//           <div style={styles.sectionContainer}>
//             <div style={styles.sectionHeader}>
//               <h2 style={styles.sectionTitle}>
//                 Why Choose <span style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>ClassyShop</span>
//               </h2>
//               <p style={styles.sectionSubtitle}>
//                 We've reimagined online shopping to be more secure, faster, and enjoyable than ever before.
//               </p>
//             </div>
            
//             <div style={styles.featuresGrid}>
//               {features.map((feature, index) => (
//                 <div 
//                   key={index}
//                   style={styles.featureCard}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = 'translateY(-12px)';
//                     e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
//                     const img = e.target.querySelector('img');
//                     if (img) img.style.transform = 'scale(1.1)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
//                     const img = e.target.querySelector('img');
//                     if (img) img.style.transform = 'scale(1)';
//                   }}
//                 >
//                   <div style={styles.featureImageContainer}>
//                     <img 
//                       src={feature.image} 
//                       alt={feature.title}
//                       style={styles.featureImage}
//                     />
//                     <div style={styles.featureImageOverlay}>
//                       <div style={{...styles.featureIcon, background: feature.gradient}}>
//                         {feature.icon}
//                       </div>
//                     </div>
//                   </div>
//                   <div style={styles.featureContent}>
//                     <h3 style={styles.featureTitle}>{feature.title}</h3>
//                     <p style={styles.featureDescription}>{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Home;






import React, { useState, useEffect, useContext, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import { userContext } from '../Context/Context';
import { config } from '../Config/Config';

const Home = () => {
  const {host} = config;
  const { products = [], getAllProducts, loading } = useContext(userContext);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSmartphoneCategory, setActiveSmartphoneCategory] = useState('ALL PHONES');
  const [activeBagsCategory, setActiveBagsCategory] = useState('ALL BAGS');
  const [activeWatchCategory, setActiveWatchCategory] = useState('ALL WATCHES');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPromoSlide, setCurrentPromoSlide] = useState(0);
  const [activeFashionCategory, setActiveFashionCategory] = useState('ALL PRODUCTS');
  const navigate = useNavigate();

  // REFS FOR SMOOTH SCROLLING TO SECTIONS
  const fashionRef = useRef(null);
  const smartphoneRef = useRef(null);
  const bagsRef = useRef(null);
  const watchesRef = useRef(null);
  const beautyRef = useRef(null);
  const groceryRef = useRef(null);
  const footwearRef = useRef(null);
  const electronicsRef = useRef(null);

  const features = [
    {
      icon: "🏪",
      title: "Endless Variety",
      description: "Explore millions of products from multiple categories all in one place.",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: "🔒",
      title: "Safe Shopping",
      description: "Shop with confidence with our secure payment system and buyer protection.",
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Get your orders delivered quickly with real-time tracking.",
      gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // const statistics = [
  //   { icon: "🛍️", value: "10K+", label: "Products Available", color: "#667eea" },
  //   { icon: "🏷️", value: "50+", label: "Categories", color: "#4facfe" },
  //   { icon: "⭐", value: "50K+", label: "Happy Customers", color: "#43e97b" },
  //   { icon: "📈", value: "99%", label: "Satisfaction Rate", color: "#ff6b35" }
  // ];

  // CATEGORY ICONS WITH CLICK HANDLERS
  const categoryIcons = [
    { icon: "👗", title: "Fashion", color: "#667eea", ref: fashionRef, clickable: true },
    { icon: "📱", title: "Electronics", color: "#ff6b35", ref: smartphoneRef, clickable: true },
    { icon: "👜", title: "Bags", color: "#43e97b", ref: bagsRef, clickable: true },
    { icon: "👟", title: "Footwear", color: "#4facfe", ref: footwearRef, clickable: true },
    { icon: "🛒", title: "Groceries", color: "#38a169", ref: groceryRef, clickable: true },
    { icon: "💄", title: "Beauty", color: "#ed64a6", ref: beautyRef, clickable: true },
    { icon: "⌚", title: "Watches", color: "#8b5cf6", ref: watchesRef, clickable: true },
    { icon: "💍", title: "Jewellery", color: "#9f7aea", clickable: false }
  ];

  const heroBanners = [
    {
      image: "https://www.v2retail.com/wp-content/uploads/2023/07/EOSS-70-OFF-V2-Retail-Home-Page-banner-29-06-23.jpg",
      alt: "Fashion Collection Banner"
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0486/5094/4664/files/web_banners_1bf84487-e84a-41b8-b816-e5cbae3e8cff.jpg?v=1630058585",
      alt: "Electronics Banner"
    },
    {
      image: "https://silkstoriesbyketki.com/wp-content/uploads/2023/06/Yellow-White-Modern-Special-Discount-Banner-.png",
      alt: "Summer Sale Banner"
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0650/5922/5844/files/MARDAZ-FLAT-SALE_live-banner.gif?v=1662744615",
      alt: "New Arrivals Banner"
    },
    {
      image: "https://th.bing.com/th/id/R.ce624024749d90851bba866aa7dcbd58?rik=bW0WG%2bUF1PtvRA&riu=http%3a%2f%2fwww.tinygirlindia.com%2fcdn%2fshop%2fcollections%2fbarbie_-_1920px_x_700px-01.jpg%3fv%3d1736931768&ehk=27qHrko9S9yo3mpdjmlt3ZxUvT96novKD4Vj2c7KOjY%3d&risl=&pid=ImgRaw&r=0",
      alt: "Kids Banner"
    }
  ];

  // UPDATED PROMO CARDS - Only images, no text content
  const promoCards = [
    {
      id: 1,
      image: "https://static.vecteezy.com/system/resources/thumbnails/001/925/528/small_2x/black-friday-sale-banner-or-promotion-on-dark-background-online-shopping-store-with-mobile-credit-cards-and-shop-elements-illustration-vector.jpg",
      isMain: true
    },
    {
      id: 2,
      image: "https://marketplace.canva.com/EAE6uxzge6c/1/0/1600w/canva-yellow-and-white-minimalist-big-sale-banner-BjBIq-T_6j4.jpg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
      isMain: false
    },
    {
      id: 3,
      image: "https://static.vecteezy.com/system/resources/previews/053/825/953/non_2x/women-s-bag-sale-online-post-banner-template-vector.jpg",
      isMain: false
    }
  ];

  const smartphoneBrandTabs = ['ALL PHONES', 'APPLE', 'SAMSUNG', 'ONEPLUS', 'XIAOMI', 'REALME', '>'];
  const bagsBrandTabs = ['ALL BAGS', 'HANDBAGS', 'BACKPACKS', 'TRAVEL BAGS', 'LAPTOP BAGS', 'LADIES BAGS', '>'];
  const watchBrandTabs = ['ALL WATCHES', 'APPLE', 'SAMSUNG', 'ROLEX', 'CASIO', 'TITAN', 'FOSSIL', '>'];
  const fashionTabs = ['ALL PRODUCTS', 'MENS WEAR', 'WOMENS WEAR', 'KIDS WEAR', '>'];

  const singleBannerImage = "https://aircase.in/cdn/shop/articles/Cover_Images.jpg";

  // SMOOTH SCROLL FUNCTION
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    getAllProducts();
    fetch(`${host}/customer/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.categories);
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoSlide((prev) => (prev + 1) % promoCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9', fontSize: '14px' }}>
        ★
      </span>
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getDiscountPercentage = (product) => {
    if (product.price >= 50000) return 30;
    if (product.price >= 25000) return 25;
    if (product.price >= 10000) return 20;
    if (product.price >= 5000) return 15;
    return 10;
  };

  const getCategoryColor = (category) => {
    return '#667eea';
  };

  // Product filtering functions
  const getFashionProducts = () => {
    const allClothingProducts = products.filter(product => {
      const name = (product.name || '').toLowerCase();
      const cat = (product.category?.name || '').toLowerCase();
      
      const clothingKeywords = [
        'dress', 'shirt', 'pant', 'trouser', 'suit', 'blazer', 'kurta', 'kurti', 'saree', 
        'top', 'skirt', 'blouse', 'jeans', 'tunic', 'lehenga', 'choli', 'salwar', 'gown', 
        'nighty', 'jacket', 'shorts', 'vest', 't-shirt', 'polo', 'hoodie', 'sweater', 
        'cardigan', 'sweatshirt', 'tank', 'camisole', 'jumpsuit', 'romper', 'overalls',
        'clothing', 'apparel', 'garment', 'wear'
      ];

      const excludeKeywords = [
        'shoe', 'sandal', 'slipper', 'boot', 'sneaker', 'heel', 'footwear',
        'bag', 'purse', 'handbag', 'backpack', 'wallet', 'clutch',
        'phone', 'mobile', 'iphone', 'smartphone', 'tablet', 'laptop',
        'watch', 'clock', 'smartwatch',
        'beauty', 'makeup', 'cosmetic', 'lipstick', 'foundation',
        'jewelry', 'jewellery', 'necklace', 'ring', 'earring', 'bracelet',
        'grocery', 'food', 'rice', 'oil', 'spices'
      ];

      const isExcluded = excludeKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      if (isExcluded) return false;
      
      const isClothing = clothingKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      return isClothing;
    });

    if (activeFashionCategory === 'ALL PRODUCTS') {
      return allClothingProducts;
    }

    return allClothingProducts.filter(product => {
      const name = (product.name || '').toLowerCase();
      const cat = (product.category?.name || '').toLowerCase();

      if (activeFashionCategory === 'MENS WEAR') {
        const menMarkers = ['men', 'male', 'boy', 'gentleman', 'gents'];
        const excludeMarkers = [
          'women', 'ladies', 'female', 'kurti', 'saree', 'lehenga', 'choli', 
          'nighty', 'skirt', 'blouse', 'salwar', 'gown',
          'kid', 'kids', 'child', 'children', 'baby', 'toddler', 'infant'
        ];
        
        return (
          menMarkers.some(word => name.includes(word) || cat.includes(word)) &&
          !excludeMarkers.some(word => name.includes(word) || cat.includes(word))
        );
      }

      if (activeFashionCategory === 'WOMENS WEAR') {
        const womenMarkers = [
          'women', 'woman', 'ladies', 'lady', 'female', 'girl', 
          'kurti', 'saree', 'lehenga', 'choli', 'nighty', 'skirt', 'blouse', 
          'salwar', 'gown', 'dress', 'top', 'tunic', 'camisole'
        ];
        
        return womenMarkers.some(word => name.includes(word) || cat.includes(word));
      }

      if (activeFashionCategory === 'KIDS WEAR') {
        const kidsMarkers = ['kid', 'kids', 'child', 'children', 'baby', 'toddler', 'infant'];
        return kidsMarkers.some(word => name.includes(word) || cat.includes(word));
      }

      return true;
    });
  };

  const getSmartphoneProducts = () => {
    const phoneKeywords = [
      'phone', 'smartphone', 'mobile', 'iphone', 'android', 'cell', 'cellular'
    ];

    const excludeKeywords = [
      'bag', 'case', 'cover', 'holder', 'stand', 'charger', 'cable', 'adapter',
      'headphone', 'earphone', 'speaker', 'accessory', 'screen', 'protector',
      'tablet', 'laptop', 'watch', 'smartwatch', 'computer', 'monitor',
      'shirt', 'dress', 'pant', 'clothing', 'apparel', 'shoe', 'sandal',
      'beauty', 'makeup', 'cosmetic', 'jewelry', 'jewellery'
    ];

    return products.filter(product => {
      const name = (product.name || '').toLowerCase();
      const cat = (product.category?.name || '').toLowerCase();
      const brand = (product.specifications?.brand || '').toLowerCase();

      const isExcluded = excludeKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      if (isExcluded) return false;

      const isPhone = phoneKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      if (!isPhone) return false;

      if (activeSmartphoneCategory === 'ALL PHONES') return true;
      
      const categoryBrand = activeSmartphoneCategory.toLowerCase();
      return (
        brand.includes(categoryBrand) || 
        name.includes(categoryBrand)
      );
    });
  };

  const getBagsProducts = () => {
    return products.filter(product => {
      const cat = (product.category?.name || '').toLowerCase();
      
      const bagCategories = [
        'bags', 'bag', 'handbags', 'backpacks', 'purses', 'luggage'
      ];
      
      const isBagCategory = bagCategories.some(bagCategory => 
        cat.includes(bagCategory) || cat === bagCategory
      );
      
      if (!isBagCategory) return false;

      if (activeBagsCategory === 'ALL BAGS') return true;
      
      const name = (product.name || '').toLowerCase();
      
      switch(activeBagsCategory) {
        case 'HANDBAGS':
          return name.includes('handbag') || name.includes('purse') || name.includes('clutch');
        case 'BACKPACKS':
          return name.includes('backpack') || name.includes('rucksack') || name.includes('school');
        case 'TRAVEL BAGS':
          return name.includes('travel') || name.includes('duffle') || name.includes('luggage') || name.includes('suitcase');
        case 'LAPTOP BAGS':
          return name.includes('laptop') || name.includes('computer') || name.includes('briefcase') || name.includes('office');
        case 'LADIES BAGS':
          return name.includes('ladies') || name.includes('lady') || name.includes('women') || name.includes('female');
        default:
          return true;
      }
    });
  };

  const getWatchProducts = () => {
    const watchKeywords = [
      'watch', 'watches', 'timepiece', 'smartwatch', 'wristwatch', 'chronograph'
    ];

    const excludeKeywords = [
      'phone', 'mobile', 'smartphone', 'bag', 'case', 'cover', 'strap',
      'shirt', 'dress', 'pant', 'clothing', 'apparel', 'shoe', 'sandal',
      'beauty', 'makeup', 'cosmetic', 'jewelry', 'jewellery', 'ring', 'necklace'
    ];

    return products.filter(product => {
      const name = (product.name || '').toLowerCase();
      const cat = (product.category?.name || '').toLowerCase();
      const brand = (product.specifications?.brand || '').toLowerCase();

      const isExcluded = excludeKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      if (isExcluded) return false;

      const isWatch = watchKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      if (!isWatch) return false;

      if (activeWatchCategory === 'ALL WATCHES') return true;
      
      const categoryBrand = activeWatchCategory.toLowerCase();
      return (
        brand.includes(categoryBrand) || 
        name.includes(categoryBrand)
      );
    });
  };

  const getBeautyProducts = () => {
    return products.filter(product => {
      const cat = (product.category?.name || '').toLowerCase();
      const name = (product.name || '').toLowerCase();
      
      const beautyCategories = [
        'beauty products',
        'beauty',
        'cosmetics',
        'makeup',
        'personal care',
        'skincare'
      ];
      
      const matchesCategory = beautyCategories.some(beautyCategory => 
        cat.includes(beautyCategory)
      );
      
      if (matchesCategory) return true;
      
      const beautyKeywords = [
        'lipstick', 'foundation', 'mascara', 'perfume', 'shampoo', 
        'lotion', 'cream', 'soap', 'face wash'
      ];
      
      return beautyKeywords.some(keyword => name.includes(keyword));
    });
  };

  const getGroceryProducts = () => {
    const groceryKeywords = [
      'grocery', 'groceries', 'food', 'rice', 'wheat', 'dal', 'oil', 'spices',
      'tea', 'coffee', 'sugar', 'salt', 'flour', 'milk', 'butter', 'cheese',
      'bread', 'biscuit', 'snack', 'chocolate', 'candy', 'fruit', 'vegetable',
      'organic', 'fresh', 'frozen', 'canned', 'packaged', 'instant', 'cooking',
      'kitchen', 'cereal', 'pasta', 'sauce', 'juice', 'water', 'nuts',
      'surf', 'excel', 'detergent', 'washing', 'fabric', 'tide', 'ariel',
      'turmeric', 'haldi', 'masala', 'spice', 'chilli', 'pepper', 'cumin', 'coriander',
      'atta', 'maida', 'besan', 'basmati', 'quinoa', 'oats', 'poha'
    ];

    const excludeKeywords = [
      'phone', 'mobile', 'smartphone', 'bag', 'shirt', 'dress', 'pant', 'clothing',
      'shoe', 'sandal', 'watch', 'jewelry', 'jewellery',
      'beauty', 'makeup', 'cosmetic', 'lipstick', 'foundation', 'mascara', 
      'eyeliner', 'concealer', 'powder', 'blush', 'eyeshadow', 'nail', 'polish',
      'perfume', 'fragrance', 'cologne', 'skincare', 'lotion', 'cream', 'serum',
      'shampoo', 'conditioner', 'soap', 'face', 'moisturizer', 'cleanser',
      'toner', 'sunscreen', 'deodorant'
    ];

    return products.filter(product => {
      const name = (product.name || '').toLowerCase();
      const cat = (product.category?.name || '').toLowerCase();

      const isExcluded = excludeKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      if (isExcluded) return false;

      const isGrocery = groceryKeywords.some(word => 
        name.includes(word) || cat.includes(word)
      );
      
      return isGrocery;
    });
  };

  // FIXED: Most reliable navigation fix - forces complete page reload
  const handleProductNavigation = (product) => {
    if (product.stock === 0) {
      alert('Product is out of stock');
      return;
    }
    
    // Force complete page reload/navigation - MOST RELIABLE
    window.location.href = `/product/${product._id}`;
  };

  const handleSeeAllClick = () => {
    navigate('/products');
  };

  const scrollProductsLeft = () => {
    const container = document.getElementById('products-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollProductsRight = () => {
    const container = document.getElementById('products-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // STYLES
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      paddingTop: '0px'
    },
    
    heroBannerAndCategoriesSection: {
      backgroundColor: '#f9f1eb',
      paddingTop: '30px',
      paddingBottom: '30px',
      marginTop: '-10px'
    },
    
    heroBannerSlider: {
      position: 'relative',
      width: '100%',
      maxWidth: '1400px',
      height: '450px',
      margin: '0 auto 40px auto',
      overflow: 'hidden',
      borderRadius: '20px'
    },

    bannerContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      transform: 'scale(1)',
    },

    bannerSlide: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0,
      transform: 'translateX(100%) scale(1)',
      transition: 'all 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
      transformOrigin: 'center center'
    },

    activeBannerSlide: {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
      zIndex: 1
    },

    prevBannerSlide: {
      transform: 'translateX(-100%) scale(1)'
    },

    nextBannerSlide: {
      transform: 'translateX(100%) scale(1)'
    },

    bannerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'fit',
      objectPosition: 'center',
      display: 'block',
      transform: 'scale(1)',
      transition: 'none',
      maxWidth: 'none',
      maxHeight: '100vh'
    },

    bannerNavButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(255, 255, 255, 0.9)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      color: '#333',
      transition: 'all 0.3s ease',
      zIndex: 10,
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },

    bannerIndicators: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '12px',
      zIndex: 10
    },

    bannerIndicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: 'rgba(236, 137, 137, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid rgba(255, 176, 176, 0.7)'
    },

    activeBannerIndicator: {
      backgroundColor: 'rgba(249, 214, 214, 1)',
      transform: 'scale(1.2)'
    },

    categoriesContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px'
    },
    
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap: '20px',
      alignItems: 'center',
      justifyItems: 'center'
    },
    
    categoryCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '30px 15px',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      width: '100%',
      maxWidth: '140px',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },

    categoryCardClickable: {
      cursor: 'pointer',
    },

    categoryCardDisabled: {
      cursor: 'not-allowed',
      opacity: 0.6
    },
    
    categoryIcon: {
      fontSize: '36px',
      marginBottom: '12px',
      display: 'block'
    },
    
    categoryTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3748'
    },
    
  popularProductsSection: {
  padding: '10px 0 20px 0', // Reduced bottom padding from 10px to 20px
  backgroundColor: '#fff'
},
    popularProductsContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px'
    },
    
    popularProductsHeader: {
      marginBottom: '5px'
    },
    
  popularProductsTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '0px'  // Reduced gap
  },
  
  popularProductsSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '0',
    marginTop: '0'  // No top margin
  },

    categoryNavigation: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 0 15px 0'
    },

    categoryTabs: {
      display: 'flex',
      gap: '24px',
      position: 'relative'
    },
    
    categoryTab: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#222',
      cursor: 'pointer',
      paddingBottom: '4px',
      position: 'relative',
      transition: 'color 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      borderBottom: '2px solid transparent',
      padding: '8px 16px',
      borderRadius: '8px'
    },
    
    activeCategoryTab: (color) => ({
      color: color,
      fontWeight: '700',
      borderBottom: `2px solid ${color}`,
      backgroundColor: `${color}15`
    }),

    arrowTab: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#ef4444',
      cursor: 'pointer',
      paddingBottom: '4px'
    },

    productsCarouselWrapper: {
      position: 'relative'
    },

    productsScrollButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      fontSize: '16px',
      color: '#374151',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    },

    leftProductsButton: {
      left: '-20px'
    },

    rightProductsButton: {
      right: '-20px'
    },

    productsContainer: {
      display: 'flex',
      gap: '20px',
      overflowX: 'auto',
      scrollBehavior: 'smooth',
      paddingBottom: '10px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    },
    
    productCard: (borderColor) => ({
      minWidth: '240px',
      width: '240px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      flexShrink: 0,
      border: `2px solid ${borderColor}`,
      boxShadow: `0 4px 20px ${borderColor}20`
    }),
    
    productImageContainer: {
      position: 'relative',
      width: '100%',
      height: '280px',
      overflow: 'hidden',
      backgroundColor: '#f9fafb'
    },
    
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center'
    },
    
    discountBadge: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      backgroundColor: '#ef4444',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: '600'
    },
    
    productInfo: {
      padding: '16px'
    },
    
    productBrand: {
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '4px',
      fontWeight: '500'
    },
    
    productName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px',
      lineHeight: '1.3',
      height: '34px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    },
    
    productRating: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '14px'
    },

    productPricing: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    
    originalPrice: {
      fontSize: '14px',
      color: '#9ca3af',
      textDecoration: 'line-through'
    },
    
    currentPrice: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#ef4444'
    },
    
    addToCartButton: (borderColor) => ({
      width: '100%',
      padding: '8px 16px',
      backgroundColor: 'transparent',
      border: `1px solid ${borderColor}`,
      color: borderColor,
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      textTransform: 'uppercase'
    }),

    promoSection: {
      padding: '40px 0',
      backgroundColor: '#f8fafc'
    },

    promoContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px'
    },

    promoLayout: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '20px',
      height: '300px'
    },

    // UPDATED: Main promo card for image-only display
    mainPromoCard: {
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    height: '100%'
    // Removed display: 'flex' and centering properties
  },
   // UPDATED: Main promo card image to fill container properly
  promoCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // This will fill the entire container
    objectPosition: 'center',
    borderRadius: '20px',
    display: 'block' // Ensure no inline spacing issues
  },

    promoNavButtons: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      transition: 'all 0.3s ease',
      zIndex: 3
    },

    promoNavLeft: {
      left: '15px'
    },

    promoNavRight: {
      right: '15px'
    },

    promoIndicators: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: 3
    },

    promoIndicator: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    activePromoIndicator: {
      backgroundColor: 'white',
      transform: 'scale(1.2)'
    },

    sidePromoCards: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },

    // UPDATED: Side promo card for image-only display
  sidePromoCard: {
    height: '142.5px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative'
    // Removed display: 'flex' and centering properties
  },

    // UPDATED: Side promo image styling for perfect fit without zoom
   sidePromoCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // This will fill the entire container
    objectPosition: 'center',
    borderRadius: '16px',
    display: 'block' // Ensure no inline spacing issues
  },
    singleBannerSection: {
      padding: '40px 0',
      backgroundColor: '#f8fafc'
    },

  singleBannerContainer: {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 20px'
},

singleBannerImage: {
  width: '100%',
  height: '350px',           // Keep your desired height
  borderRadius: '20px',
  objectFit: 'fill',         // This stretches image to fit exactly
  objectPosition: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: '#f8fafc',
  display: 'block'
},

    statsSection: {
      padding: '40px 0',
      backgroundColor: 'white'
    },
    
    statsContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '40px'
    },
    
    statCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px 30px',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #e2e8f0'
    },
    
    statIcon: {
      fontSize: '36px',
      marginBottom: '20px'
    },
    
    statValue: {
      fontSize: '36px',
      fontWeight: '800',
      marginBottom: '12px'
    },
    
    statLabel: {
      color: '#718096',
      fontSize: '16px',
      fontWeight: '500'
    },
    
  // Reduce the padding of the Features Section
featuresSection: {
  padding: '0px 0',        // Reduced from '50px 0'
  backgroundColor: '#f8fafc'
},
    
    sectionContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px'
    },
    
   sectionHeader: {
  textAlign: 'center',
  marginBottom: '30px'      // Reduced from '60px'
},
    sectionTitle: {
      fontSize: '48px',
      fontWeight: '800',
      color: '#2d3748',
      marginBottom: '20px'
    },
    
    sectionSubtitle: {
      fontSize: '20px',
      color: '#718096',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '40px'
    },

    featureCard: {
      background: 'white',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.5s ease'
    },
    
    featureImageContainer: {
      position: 'relative',
      height: '250px',
      overflow: 'hidden'
    },
    
    featureImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    
    featureImageOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    featureIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      color: 'white',
      transition: 'transform 0.3s ease'
    },
    
    featureContent: {
      padding: '30px',
      textAlign: 'center'
    },
    
    featureTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '16px'
    },
    
    featureDescription: {
      color: '#718096',
      lineHeight: '1.6',
      fontSize: '16px'
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const nextPromoSlide = () => {
    setCurrentPromoSlide((prev) => (prev + 1) % promoCards.length);
  };

  const prevPromoSlide = () => {
    setCurrentPromoSlide((prev) => (prev - 1 + promoCards.length) % promoCards.length);
  };

  if (loading) {
    return (
      <div style={{...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '48px', marginBottom: '20px'}}>🛍️</div>
          <div style={{fontSize: '18px', color: '#718096'}}>Loading products...</div>
        </div>
      </div>
    );
  }

  const fashionProducts = getFashionProducts();
  const smartphoneProducts = getSmartphoneProducts();
  const bagsProducts = getBagsProducts();
  const watchProducts = getWatchProducts();
  const beautyProducts = getBeautyProducts();
  const groceryProducts = getGroceryProducts();
  const currentPromoCard = promoCards[currentPromoSlide];
  const sidePromoCards = promoCards.filter((_, index) => index !== currentPromoSlide);

  return (
    <>
      <div style={styles.container}>
        <Header />

        {/* Hero Banner + Categories Section */}
        <section style={styles.heroBannerAndCategoriesSection}>
          <div style={styles.heroBannerSlider}>
            <div style={styles.bannerContainer}>
              {heroBanners.map((banner, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.bannerSlide,
                    ...(index === currentSlide ? styles.activeBannerSlide : 
                       index === (currentSlide - 1 + heroBanners.length) % heroBanners.length ? styles.prevBannerSlide : 
                       styles.nextBannerSlide)
                  }}
                >
                  <img 
                    src={banner.image}
                    alt={banner.alt}
                    style={styles.bannerImage}
                    onLoad={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80';
                    }}
                  />
                </div>
              ))}
            </div>

            <button 
              style={{...styles.bannerNavButton, left: '30px'}}
              onClick={prevSlide}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 1)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
            >
              ‹
            </button>
            <button 
              style={{...styles.bannerNavButton, right: '30px'}}
              onClick={nextSlide}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 1)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
            >
              ›
            </button>

            <div style={styles.bannerIndicators}>
              {heroBanners.map((_, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.bannerIndicator,
                    ...(index === currentSlide ? styles.activeBannerIndicator : {})
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div style={styles.categoriesContainer}>
            <div style={styles.categoriesGrid}>
              {categoryIcons.map((category, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.categoryCard,
                    ...(category.clickable ? styles.categoryCardClickable : styles.categoryCardDisabled)
                  }}
                  onMouseEnter={(e) => {
                    if (category.clickable) {
                      e.target.style.transform = 'translateY(-8px)';
                      e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (category.clickable) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
                    }
                  }}
                  onClick={() => {
                    if (category.clickable && category.ref) {
                      scrollToSection(category.ref);
                    }
                  }}
                >
                  <span style={{...styles.categoryIcon, color: category.color}}>
                    {category.icon}
                  </span>
                  <div style={styles.categoryTitle}>{category.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fashion Section */}
        <section id="fashion-section" ref={fashionRef} style={styles.popularProductsSection}>
          <div style={styles.popularProductsContainer}>
            <div style={styles.popularProductsHeader}>
              <h2 style={styles.popularProductsTitle}>Fashion</h2>
              <div style={styles.categoryNavigation}>
                <p style={styles.popularProductsSubtitle}>Discover clothing styles for Men, Women & Kids - Only dress/garment products.</p>
                <div style={styles.categoryTabs}>
                  {fashionTabs.map((category, index) => {
                    if (category === '>') {
                      return (
                        <div
                          key={index}
                          style={styles.arrowTab}
                          onClick={handleSeeAllClick}
                          onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                          onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                        >
                          {category}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={category}
                        style={{
                          ...styles.categoryTab,
                          ...(activeFashionCategory === category ? styles.activeCategoryTab('#667eea') : {})
                        }}
                        onClick={() => setActiveFashionCategory(category)}
                        onMouseEnter={(e) => {
                          if (activeFashionCategory !== category) {
                            e.target.style.color = '#111';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeFashionCategory !== category) {
                            e.target.style.color = '#222';
                          }
                        }}
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={styles.productsCarouselWrapper}>
              <button 
                style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
                onClick={scrollProductsLeft}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ‹
              </button>

              <button 
                style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
                onClick={scrollProductsRight}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ›
              </button>

              <div 
                id="products-container"
                style={styles.productsContainer}
              >
                {fashionProducts.map((product) => {
                  const discount = getDiscountPercentage(product);
                  const originalPrice = Math.round(product.price / (1 - discount / 100));
                  const categoryColor = getCategoryColor(activeFashionCategory);
                  
                  return (
                    <div 
                      key={product._id} 
                      style={styles.productCard(categoryColor)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = `0 8px 25px ${categoryColor}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = `0 4px 20px ${categoryColor}20`;
                      }}
                      onClick={() => handleProductNavigation(product)}
                    >
                      <div style={styles.productImageContainer}>
                        <img 
                          src={`${host}/uploads/products/${product.images[0]}`} 
                          alt={product.name} 
                          style={styles.productImage} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div style={styles.discountBadge}>{discount}%</div>
                      </div>
                      
                      <div style={styles.productInfo}>
                        <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
                        <h3 style={styles.productName}>{product.name}</h3>
                        
                        <div style={styles.productRating}>
                          {renderStars(5)}
                        </div>
                        
                        <div style={styles.productPricing}>
                          <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
                          <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                        </div>
                        
                        <button 
                          style={styles.addToCartButton(categoryColor)}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = categoryColor;
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = categoryColor;
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductNavigation(product);
                          }}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {fashionProducts.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#718096'
                }}>
                  <div style={{fontSize: '64px', marginBottom: '24px'}}>👗</div>
                  <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No clothing products found for {activeFashionCategory}</h3>
                  <p style={{fontSize: '16px'}}>Try selecting a different category or check back later</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* UPDATED: Promotional Cards Section - Image Only */}
        <section style={styles.promoSection}>
          <div style={styles.promoContainer}>
            <div style={styles.promoLayout}>
              <div 
                style={styles.mainPromoCard}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                onClick={() => navigate('/products')}
              >
                <img 
                  src={currentPromoCard.image} 
                  alt="Promotional Banner"
                  style={styles.promoCardImage}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <button 
                  style={{...styles.promoNavButtons, ...styles.promoNavLeft}}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPromoSlide();
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  ‹
                </button>
                <button 
                  style={{...styles.promoNavButtons, ...styles.promoNavRight}}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPromoSlide();
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  ›
                </button>

                <div style={styles.promoIndicators}>
                  {promoCards.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.promoIndicator,
                        ...(index === currentPromoSlide ? styles.activePromoIndicator : {})
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPromoSlide(index);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={styles.sidePromoCards}>
                {sidePromoCards.map((card) => (
                  <div 
                    key={card.id}
                    style={styles.sidePromoCard}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    onClick={() => navigate('/products')}
                  >
                    <img 
                      src={card.image} 
                      alt="Promotional Banner"
                      style={styles.sidePromoCardImage}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trending Smartphones Section */}
        <section id="smartphone-section" ref={smartphoneRef} style={styles.popularProductsSection}>
          <div style={styles.popularProductsContainer}>
            <div style={styles.popularProductsHeader}>
              <h2 style={styles.popularProductsTitle}>Trending Smartphones</h2>
              <div style={styles.categoryNavigation}>
                <p style={styles.popularProductsSubtitle}>Discover the latest smartphones with the best deals and cutting-edge technology.</p>
                <div style={styles.categoryTabs}>
                  {smartphoneBrandTabs.map((category, index) => {
                    if (category === '>') {
                      return (
                        <div
                          key={index}
                          style={styles.arrowTab}
                          onClick={() => navigate('/products?category=smartphones')}
                          onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                          onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                        >
                          {category}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={category}
                        style={{
                          ...styles.categoryTab,
                          ...(activeSmartphoneCategory === category ? styles.activeCategoryTab('#ff6b35') : {})
                        }}
                        onClick={() => setActiveSmartphoneCategory(category)}
                        onMouseEnter={(e) => {
                          if (activeSmartphoneCategory !== category) {
                            e.target.style.color = '#111';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeSmartphoneCategory !== category) {
                            e.target.style.color = '#222';
                          }
                        }}
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={styles.productsCarouselWrapper}>
              <button 
                style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
                onClick={() => {
                  const container = document.getElementById('smartphones-container');
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ‹
              </button>
              
              <button 
                style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
                onClick={() => {
                  const container = document.getElementById('smartphones-container');
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ›
              </button>

              <div 
                id="smartphones-container"
                style={styles.productsContainer}
              >
                {smartphoneProducts.map((product) => {
                  const discount = getDiscountPercentage(product);
                  const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
                  return (
                    <div 
                      key={product._id} 
                      style={styles.productCard('#ff6b35')}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 8px 25px #ff6b3540';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 20px #ff6b3520';
                      }}
                      onClick={() => handleProductNavigation(product)}
                    >
                      <div style={styles.productImageContainer}>
                        <img 
                          src={`${host}/uploads/products/${product.images[0]}`} 
                          alt={product.name} 
                          style={styles.productImage} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div style={styles.discountBadge}>{discount}%</div>
                        
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#3b82f6',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '50px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          📱 PHONE
                        </div>
                      </div>
                      
                      <div style={styles.productInfo}>
                        <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
                        <h3 style={styles.productName}>{product.name}</h3>
                        
                        <div style={styles.productRating}>
                          {renderStars(5)}
                        </div>
                                                
                        <div style={styles.productPricing}>
                          <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
                          <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                        </div>
                        
                        <button 
                          style={styles.addToCartButton('#ff6b35')}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#ff6b35';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#ff6b35';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductNavigation(product);
                          }}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {smartphoneProducts.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#718096'
                }}>
                  <div style={{fontSize: '64px', marginBottom: '24px'}}>📱</div>
                  <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No smartphones found</h3>
                  <p style={{fontSize: '16px'}}>Check back later for the latest smartphone deals</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Single Banner Image Section */}
        <section style={styles.singleBannerSection}>
          <div style={styles.singleBannerContainer}>
            <img 
              src={singleBannerImage}
              alt="Special Promotion Banner"
              style={styles.singleBannerImage}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              onClick={() => navigate('/products')}
            />
          </div>
        </section>

        {/* Premium Bags Collection Section */}
        <section id="bags-section" ref={bagsRef} style={styles.popularProductsSection}>
          <div style={styles.popularProductsContainer}>
            <div style={styles.popularProductsHeader}>
              <h2 style={styles.popularProductsTitle}>Premium Bags Collection</h2>
              <div style={styles.categoryNavigation}>
                <p style={styles.popularProductsSubtitle}>Discover stylish and functional bags for every occasion and lifestyle.</p>
                <div style={styles.categoryTabs}>
                  {bagsBrandTabs.map((category, index) => {
                    if (category === '>') {
                      return (
                        <div
                          key={index}
                          style={styles.arrowTab}
                          onClick={() => navigate('/products?category=bags')}
                          onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                          onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                        >
                          {category}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={category}
                        style={{
                          ...styles.categoryTab,
                          ...(activeBagsCategory === category ? styles.activeCategoryTab('#43e97b') : {})
                        }}
                        onClick={() => setActiveBagsCategory(category)}
                        onMouseEnter={(e) => {
                          if (activeBagsCategory !== category) {
                            e.target.style.color = '#111';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeBagsCategory !== category) {
                            e.target.style.color = '#222';
                          }
                        }}
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={styles.productsCarouselWrapper}>
              <button 
                style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
                onClick={() => {
                  const container = document.getElementById('bags-container');
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ‹
              </button>

              <button 
                style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
                onClick={() => {
                  const container = document.getElementById('bags-container');
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ›
              </button>

              <div 
                id="bags-container"
                style={styles.productsContainer}
              >
                {bagsProducts.map((product) => {
                  const discount = getDiscountPercentage(product);
                  const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
                  return (
                    <div 
                      key={product._id} 
                      style={styles.productCard('#43e97b')}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 8px 25px #43e97b40';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 20px #43e97b20';
                      }}
                      onClick={() => handleProductNavigation(product)}
                    >
                      <div style={styles.productImageContainer}>
                        <img 
                          src={`${host}/uploads/products/${product.images[0]}`} 
                          alt={product.name} 
                          style={styles.productImage} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div style={styles.discountBadge}>{discount}%</div>
                        
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#43e97b',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '50px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          👜 BAG
                        </div>
                      </div>
                      
                      <div style={styles.productInfo}>
                        <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
                        <h3 style={styles.productName}>{product.name}</h3>
                        
                        <div style={styles.productRating}>
                          {renderStars(5)}
                        </div>
                        
                        <div style={styles.productPricing}>
                          <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
                          <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                        </div>
                        
                        <button 
                          style={styles.addToCartButton('#43e97b')}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#43e97b';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#43e97b';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductNavigation(product);
                          }}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {bagsProducts.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#718096'
                }}>
                  <div style={{fontSize: '64px', marginBottom: '24px'}}>👜</div>
                  <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No bags found</h3>
                  <p style={{fontSize: '16px'}}>Check back later for the latest bag collections</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Premium Watches Collection Section */}
        <section id="watches-section" ref={watchesRef} style={styles.popularProductsSection}>
          <div style={styles.popularProductsContainer}>
            <div style={styles.popularProductsHeader}>
              <h2 style={styles.popularProductsTitle}>Premium Watches Collection</h2>
              <div style={styles.categoryNavigation}>
                <p style={styles.popularProductsSubtitle}>Discover luxury and smart watches from top brands for every style.</p>
                <div style={styles.categoryTabs}>
                  {watchBrandTabs.map((category, index) => {
                    if (category === '>') {
                      return (
                        <div
                          key={index}
                          style={styles.arrowTab}
                          onClick={() => navigate('/products?category=watches')}
                          onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                          onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                        >
                          {category}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={category}
                        style={{
                          ...styles.categoryTab,
                          ...(activeWatchCategory === category ? styles.activeCategoryTab('#8b5cf6') : {})
                        }}
                        onClick={() => setActiveWatchCategory(category)}
                        onMouseEnter={(e) => {
                          if (activeWatchCategory !== category) {
                            e.target.style.color = '#111';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeWatchCategory !== category) {
                            e.target.style.color = '#222';
                          }
                        }}
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={styles.productsCarouselWrapper}>
              <button 
                style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
                onClick={() => {
                  const container = document.getElementById('watches-container');
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ‹
              </button>

              <button 
                style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
                onClick={() => {
                  const container = document.getElementById('watches-container');
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ›
              </button>

              <div 
                id="watches-container"
                style={styles.productsContainer}
              >
                {watchProducts.map((product) => {
                  const discount = getDiscountPercentage(product);
                  const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
                  return (
                    <div 
                      key={product._id} 
                      style={styles.productCard('#8b5cf6')}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 8px 25px #8b5cf640';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 20px #8b5cf620';
                      }}
                      onClick={() => handleProductNavigation(product)}
                    >
                      <div style={styles.productImageContainer}>
                        <img 
                          src={`${host}/uploads/products/${product.images[0]}`} 
                          alt={product.name} 
                          style={styles.productImage} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div style={styles.discountBadge}>{discount}%</div>
                        
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#8b5cf6',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '50px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          ⌚ WATCH
                        </div>
                      </div>
                      
                      <div style={styles.productInfo}>
                        <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
                        <h3 style={styles.productName}>{product.name}</h3>
                        
                        <div style={styles.productRating}>
                          {renderStars(5)}
                        </div>
                        
                        <div style={styles.productPricing}>
                          <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
                          <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                        </div>
                        
                        <button 
                          style={styles.addToCartButton('#8b5cf6')}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#8b5cf6';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#8b5cf6';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductNavigation(product);
                          }}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {watchProducts.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#718096'
                }}>
                  <div style={{fontSize: '64px', marginBottom: '24px'}}>⌚</div>
                  <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No watches found</h3>
                  <p style={{fontSize: '16px'}}>Check back later for the latest watch collections</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Beauty Products Section */}
        <section id="beauty-section" ref={beautyRef} style={styles.popularProductsSection}>
          <div style={styles.popularProductsContainer}>
            <div style={styles.popularProductsHeader}>
              <h2 style={styles.popularProductsTitle}>Beauty & Personal Care</h2>
              <div style={styles.categoryNavigation}>
                <p style={styles.popularProductsSubtitle}>Discover ALL premium beauty products, cosmetics, and personal care essentials - Only beauty items, no grocery.</p>
                <div style={styles.categoryTabs}>
                  {/* No tabs for beauty section as requested */}
                </div>
              </div>
            </div>

            <div style={styles.productsCarouselWrapper}>
              <button 
                style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
                onClick={() => {
                  const container = document.getElementById('beauty-container');
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ‹
              </button>

              <button 
                style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
                onClick={() => {
                  const container = document.getElementById('beauty-container');
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ›
              </button>

              <div 
                id="beauty-container"
                style={styles.productsContainer}
              >
                {beautyProducts.map((product) => {
                  const discount = getDiscountPercentage(product);
                  const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
                  return (
                    <div 
                      key={product._id} 
                      style={styles.productCard('#ed64a6')}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 8px 25px #ed64a640';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 20px #ed64a620';
                      }}
                      onClick={() => handleProductNavigation(product)}
                    >
                      <div style={styles.productImageContainer}>
                        <img 
                          src={`${host}/uploads/products/${product.images[0]}`} 
                          alt={product.name} 
                          style={styles.productImage} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div style={styles.discountBadge}>{discount}%</div>
                        
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#ed64a6',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '50px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          💄 BEAUTY
                        </div>
                      </div>
                      
                      <div style={styles.productInfo}>
                        <div style={styles.productBrand}>{product.specifications?.brand || 'Premium Brand'}</div>
                        <h3 style={styles.productName}>{product.name}</h3>
                        
                        <div style={styles.productRating}>
                          {renderStars(5)}
                        </div>
                        
                        <div style={styles.productPricing}>
                          <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
                          <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                        </div>
                        
                        <button 
                          style={styles.addToCartButton('#ed64a6')}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#ed64a6';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#ed64a6';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductNavigation(product);
                          }}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {beautyProducts.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#718096'
                }}>
                  <div style={{fontSize: '64px', marginBottom: '24px'}}>💄</div>
                  <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No beauty products found</h3>
                  <p style={{fontSize: '16px'}}>Check back later for the latest beauty products</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Grocery Products Section */}
        <section id="grocery-section" ref={groceryRef} style={styles.popularProductsSection}>
          <div style={styles.popularProductsContainer}>
            <div style={styles.popularProductsHeader}>
              <h2 style={styles.popularProductsTitle}>Fresh Groceries & Food</h2>
              <div style={styles.categoryNavigation}>
                <p style={styles.popularProductsSubtitle}>Shop fresh groceries, organic foods, and daily essentials for your kitchen.</p>
                <div style={styles.categoryTabs}>
                  {/* No tabs for grocery section as requested */}
                </div>
              </div>
            </div>

            <div style={styles.productsCarouselWrapper}>
              <button 
                style={{...styles.productsScrollButton, ...styles.leftProductsButton}}
                onClick={() => {
                  const container = document.getElementById('grocery-container');
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ‹
              </button>

              <button 
                style={{...styles.productsScrollButton, ...styles.rightProductsButton}}
                onClick={() => {
                  const container = document.getElementById('grocery-container');
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ›
              </button>

              <div 
                id="grocery-container"
                style={styles.productsContainer}
              >
                {groceryProducts.map((product) => {
                  const discount = getDiscountPercentage(product);
                  const originalPrice = Math.round(product.price / (1 - discount / 100));
                  
                  return (
                    <div 
                      key={product._id} 
                      style={styles.productCard('#38a169')}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 8px 25px #38a16940';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 20px #38a16920';
                      }}
                      onClick={() => handleProductNavigation(product)}
                    >
                      <div style={styles.productImageContainer}>
                        <img 
                          src={`${host}/uploads/products/${product.images[0]}`} 
                          alt={product.name} 
                          style={styles.productImage} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div style={styles.discountBadge}>{discount}%</div>
                        
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#38a169',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '50px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          🛒 GROCERY
                        </div>
                      </div>
                      
                      <div style={styles.productInfo}>
                        <div style={styles.productBrand}>{product.specifications?.brand || 'Fresh Brand'}</div>
                        <h3 style={styles.productName}>{product.name}</h3>
                        
                        <div style={styles.productRating}>
                          {renderStars(5)}
                        </div>
                        
                        <div style={styles.productPricing}>
                          <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
                          <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                        </div>
                        
                        <button 
                          style={styles.addToCartButton('#38a169')}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#38a169';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#38a169';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductNavigation(product);
                          }}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {groceryProducts.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#718096'
                }}>
                  <div style={{fontSize: '64px', marginBottom: '24px'}}>🛒</div>
                  <h3 style={{fontSize: '24px', marginBottom: '12px', color: '#2d3748'}}>No grocery products found</h3>
                  <p style={{fontSize: '16px'}}>Check back later for fresh groceries and food items</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        {/* <section style={styles.statsSection}>
          <div style={styles.statsContainer}>
            {statistics.map((stat, index) => (
              <div 
                key={index} 
                style={styles.statCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                  e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Features Section */}
        <section style={styles.featuresSection}>
          <div style={styles.sectionContainer}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                Why Choose <span style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>ClassyShop</span>
              </h2>
              <p style={styles.sectionSubtitle}>
 Experience the future of online shopping with unmatched convenience, quality products, and exceptional service that puts your satisfaction first.              </p>
            </div>
            
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div 
                  key={index}
                  style={styles.featureCard}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-12px)';
                    e.target.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
                    const img = e.target.querySelector('img');
                    if (img) img.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
                    const img = e.target.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <div style={styles.featureImageContainer}>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      style={styles.featureImage}
                    />
                    <div style={styles.featureImageOverlay}>
                      <div style={{...styles.featureIcon, background: feature.gradient}}>
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <div style={styles.featureContent}>
                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                    <p style={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;





