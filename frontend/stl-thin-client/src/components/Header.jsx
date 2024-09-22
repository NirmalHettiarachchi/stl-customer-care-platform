import { Link } from "react-router-dom";
import {
  BellIcon,
  HomeIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid"; // Updated imports for Heroicons v2
import { useState } from "react";

const Header = () => {
  const [notifications, setNotifications] = useState(3); // Example notification count

  return (
    <header className="bg-primary p-4 text-white flex justify-between items-center">
      <h1 className="text-lg font-bold flex items-center">
        <HomeIcon className="w-6 h-6 mr-2" /> Sri-Care Portal
      </h1>
      <nav className="space-x-4 flex items-center">
        <Link to="/services" className="hover:underline flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-1" />
          Services
        </Link>
        <Link to="/bills" className="hover:underline flex items-center">
          <HomeIcon className="w-5 h-5 mr-1" />
          Bills
        </Link>
        <Link to="/chat" className="hover:underline flex items-center">
          <ChatBubbleLeftRightIcon className="w-5 h-5 mr-1" />
          Support
        </Link>
        <div className="relative flex items-center">
          <Link
            to="/notifications"
            className="hover:underline flex items-center"
          >
            <BellIcon className="w-6 h-6" />
          </Link>
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {notifications}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
