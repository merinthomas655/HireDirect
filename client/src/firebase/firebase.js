import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDB2Q_Kf6qQgm1ndiXw-5QsaKTFugsZOHI",
  authDomain: "hire-direct-app.firebaseapp.com",
  projectId: "hire-direct-app",
  storageBucket: "hire-direct-app.firebasestorage.app",
  messagingSenderId: "89200185465",
  appId: "1:89200185465:web:c4d3b561e9492461be44a8",
  measurementId: "G-F4CCQSN8NW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);