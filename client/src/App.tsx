import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ProductListingPage from "@/pages/ProductListingPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AddressPage from "@/pages/AddressPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import OrdersPage from "@/pages/OrdersPage";
import ProfilePage from "@/pages/ProfilePage";
import HealthcarePage from "@/pages/HealthcarePage";
import BabyCarePage from "@/pages/BabyCarePage";
import LabTestPage from "@/pages/LabTestPage";
import HealthBlogPage from "@/pages/HealthBlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import SplashScreen from "@/components/home/SplashScreen";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    console.log('Current location:', location);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Add debug logging
  useEffect(() => {
    console.log('App mounted. Debug info:');
    console.log('- Window location:', window.location.href);
    console.log('- Available routes:', [
      '/', '/medicines', '/product/:id', '/cart', '/checkout', 
      '/address', '/order-confirmation', '/orders', '/profile',
      '/healthcare', '/baby-care', '/lab-tests', '/health-blog', '/blog/:id'
    ]);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/medicines" component={ProductListingPage} />
            <Route path="/product/:id" component={ProductDetailPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/address" component={AddressPage} />
            <Route path="/order-confirmation" component={OrderConfirmationPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/healthcare" component={HealthcarePage} />
            <Route path="/baby-care" component={BabyCarePage} />
            <Route path="/lab-tests" component={LabTestPage} />
            <Route path="/health-blog" component={HealthBlogPage} />
            <Route path="/blog/:id" component={BlogPostPage} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
