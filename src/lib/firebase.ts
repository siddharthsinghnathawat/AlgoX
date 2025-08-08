import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUlfuEvWQyczG69y57rWGfp6iKgHN7hUU",
  authDomain: "algox-47915.firebaseapp.com",
  projectId: "algox-47915",
  storageBucket: "algox-47915.firebasestorage.app",
  messagingSenderId: "726945055734",
  appId: "1:726945055734:web:fb7416d140e8e4ee86fdd7",
  measurementId: "G-EQ4LS8HXGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

export default app;

