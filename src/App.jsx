import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./AppLayout";

import Marketplace from "./pages/Marketplace";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./ui/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Home from "./components/user/Home";
import Products from "./components/user/Products";
import Reviews from "./components/user/Reviews";
import Inbox from "./components/user/Inbox";
import Settings from "./components/user/Settings";
import { ModalProvider } from "./Provider/ModalProvider";
import Categories from "./pages/Categories";
import { Toaster } from "react-hot-toast";
import Notification from "./features/Notification";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import UserStoreProfile from "./pages/UserStoreProfile";
import OurTeam from "./pages/OurTeam";
import OurVision from "./pages/OurVision";
import HowItWorks from "./pages/HowItWorks";
import ContactUs from "./pages/ContactUs";
import TermsNConditions from "./pages/TermsNConditions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Notification />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/store/:userId" element={<UserStoreProfile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/our-vision" element={<OurVision />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsNConditions />}
            />
            <Route path="/:type" element={<Marketplace />} />
            <Route path="/:type/:id" element={<Product />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/update" element={<UpdatePassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ModalProvider>
                  <Dashboard />
                </ModalProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="messages" element={<Inbox />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#000",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
