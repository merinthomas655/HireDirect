import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SessionRoute from "./components/SessionRoute";
import Booking from "./pages/Booking";
import ServicePage from "./pages/ServicePage";
import BookingConfirmation from "./pages/BookingConfirmation";


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
        path:'/services',
        element: <ServicePage/>
    },
    {
        path:'/signup',
        element: <Signup />,
    },
    {
        path:'/booking',
        element: <Booking />,
    },
    {
        path:'/bookingconfirmation',
        element: <BookingConfirmation />,
    }
])

export default router;
