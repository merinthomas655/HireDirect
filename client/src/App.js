import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import router from './route';
import {
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import analytics from "./firebase/firebase";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={1500} />
    </ThemeProvider>
    
  );
}

export default App;
