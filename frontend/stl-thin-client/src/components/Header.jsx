import { Link } from "react-router-dom";
import {
  BellIcon,
  HomeIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Header = () => {
  const signOut = useSignOut();

  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    const [notifications, setNotifications] = useState(3);

    return (
      <header className="bg-primary p-4 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold flex items-center">
          <Link to="/" className="flex items-center">
            <HomeIcon className="w-6 h-6 mr-2" /> Sri-Care Portal
          </Link>
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
            <div className="mx-2">
              {notifications > 0 && (
                <span className="absolute -top-2 right-6 bg-red-500 text-white rounded-full px-2 text-xs">
                  {notifications}
                </span>
              )}
            </div>
            <div
              className=" flex items-center cursor-pointer"
              onClick={() => {
                signOut();
                window.location.reload();
              }}
            >
              <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
            </div>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="bg-primary p-4 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold flex items-center">
          <Link to="/" className="flex items-center">
            <HomeIcon className="w-6 h-6 mr-2" /> Sri-Care Portal
          </Link>
        </h1>{" "}
        <nav className="space-x-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
        </nav>
      </header>
    );
  }
};

export default Header;
