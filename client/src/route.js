import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ServicePage from "./pages/ServicePage";



const router = createBrowserRouter([
    {
        path:'/',
        element: <Login />,
    },
    {
        path:'/login',
        element: <Login />,
    },
    {
        path:'/service',
        element: <ServicePage />
    },
    {
        path:'/signup',
        element: <Signup />,
    }
])

export default router;
