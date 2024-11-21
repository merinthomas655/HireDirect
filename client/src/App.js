import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import router from './route';
import {
  RouterProvider,
} from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
    
  );
}

export default App;
