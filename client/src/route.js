import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

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
