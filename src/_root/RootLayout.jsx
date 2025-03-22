import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  const [showNavbar, setShowNavbar] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const isEditorPage = /^\/editor(\/.*)?$/.test(location.pathname);
    setShowNavbar(!isEditorPage);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout;