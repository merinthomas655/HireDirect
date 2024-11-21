import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SessionRoute from "./components/SessionRoute";
import Booking from "./pages/Booking";
import ProviderDashboard from "./pages/ProviderDashboard";
import UserDashboard from "./pages/UserDashboard";
import ServicePage from "./pages/ServicePage";
import BookingConfirmation from "./pages/BookingConfirmation";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import AdminDashboard from "./pages/AdminDashboard";
import EditUsers from "./pages/EditUsers";
import ManageProviders from "./pages/ManageProviders";




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
        path:'/providerdashboard',
        element: <ProviderDashboard />,
    },
    {
        path:'/userdashboard',
        element: <UserDashboard />,
    },
    {
        path:'/bookingconfirmation',
        element: <BookingConfirmation />,
    },
    {
        path:'/admin-dashboard',
        element: <AdminDashboard />,
    },
    
    {
        path: '/profile/:providerId',
        element: <ProfessionalProfile />,
      },
      {
        path: '/editusers',
        element: <EditUsers />,
      },
      {
        path: '/manageproviders',
        element: <ManageProviders />,
      }
])

export default router;
