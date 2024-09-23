import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Login />,
    },
    {
        path:'/login',
        element: <Login />,
    },
    // {
    //     path:'/signup',
    //     element: <Signup />,
    // }
])

export default router;
