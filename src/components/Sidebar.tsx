import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component from shadcn
import { Menu, X } from "lucide-react"; // Icons for mobile toggle
import { Link } from "react-router-dom"; // If you're using React Router for navigation

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-gray-800 text-white p-6 space-y-6 fixed inset-0 md:relative z-50 md:translate-x-0 transform transition-transform duration-300`}
      >
        <div className="text-xl font-bold">MyLogo</div>
        <nav className="space-y-4">
          <Link to="/" className="block hover:text-indigo-400">
            Dashboard
          </Link>
          <Link to="/profile" className="block hover:text-indigo-400">
            Profile
          </Link>
          <Link to="/settings" className="block hover:text-indigo-400">
            Settings
          </Link>
          <Link to="/logout" className="block hover:text-indigo-400">
            Logout
          </Link>
        </nav>
      </div>

      {/* Overlay (for mobile view) */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:hidden fixed inset-0 bg-black opacity-50 z-40`}
        onClick={toggleSidebar}
      ></div>

      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="link"
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
