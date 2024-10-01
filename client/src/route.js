import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SessionRoute from "./components/SessionRoute";


const router = createBrowserRouter([
    {
        path: "/HomePage",
        element: <SessionRoute element={<Home />} />, 
    },
    {
        path:'/',
        element: <Login />,
    },
    {
        path:'/login',
        element: <Login />,
    },
    {
        path:'/signup',
        element: <Signup />,
    }
])

export default router;
