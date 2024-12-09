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
import ManageUsers from "./pages/ManageUsers";
import ManageProviders from "./pages/ManageProviders";
import ManageServices from "./pages/ManageServices";
import ManageCategories from "./pages/ManageCategories";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";


const router = createBrowserRouter([
    {
        path:'/',
        element: <Home />,
    },
    {
        path:'/HomePage',
        element: <Home />,
    },
    {
        path:'/contact',
        element: <ContactUs />,
    },
    {
        path:'/aboutus',
        element: <AboutUs />,
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
        path: '/ManageUsers',
        element: <ManageUsers />,
      },
      {
        path: '/ManageProviders',
        element: <ManageProviders />,
      },
      {
        path: '/ManageServices',
        element: <ManageServices />,
      },
      {
        path: '/ManageCategories',
        element: <ManageCategories />,
      }
])

export default router;
