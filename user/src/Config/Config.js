// export const config = {
//   host: "http://localhost:9000",
// };



import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const config = {
  host: "http://localhost:9000",
};

// Add your Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyBdkckagT6_5JVHWpwpwlPpzAcV7m1uPwQ",
  authDomain: "my-social-login-63002.firebaseapp.com",
  projectId: "my-social-login-63002",
  storageBucket: "my-social-login-63002.firebasestorage.app",
  messagingSenderId: "380127336143",
  appId: "1:380127336143:web:58b59bd98256da68bd09ba",
  measurementId: "G-347EN6SX68"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
