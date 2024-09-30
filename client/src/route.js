import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ServicePage from "./pages/ServicePage";



const router = createBrowserRouter([
    {
    path: "/HomePage",
    element: <Home />,
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
        path:'/services',
        element: <ServicePage />
    },
    {
        path:'/signup',
        element: <Signup />,
    }
])

export default router;
