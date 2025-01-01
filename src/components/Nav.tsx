import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile toggle
import { removeToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const navigate = useNavigate();

  // Logout function (you can customize this based on your authentication system)
  const logout = () => {
    console.log("object");
    localStorage.removeItem("userData"); // Example: Remove the authentication token
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">MyLogo</div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-indigo-400">
            Home
          </a>
          <a href="/about" className="hover:text-indigo-400">
            About
          </a>
          <a href="/services" className="hover:text-indigo-400">
            Services
          </a>
          <a href="/contact" className="hover:text-indigo-400">
            Contact
          </a>
          {/* Logout Button */}
          <button onClick={logout} className="text-red-500 hover:text-red-400">
            Logout
          </button>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-gray-800 text-white p-4 space-y-4`}
      >
        <a href="/" className="block hover:text-indigo-400">
          Home
        </a>
        <a href="/about" className="block hover:text-indigo-400">
          About
        </a>
        <a href="/services" className="block hover:text-indigo-400">
          Services
        </a>
        <a href="/contact" className="block hover:text-indigo-400">
          Contact
        </a>
        {/* Mobile Logout Button */}
        <button
          onClick={logout}
          className="block text-red-500 hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
