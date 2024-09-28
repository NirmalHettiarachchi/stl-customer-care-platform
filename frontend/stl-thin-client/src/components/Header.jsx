import { Link } from "react-router-dom";
import {
  BellIcon,
  HomeIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useState } from "react";
import { getNotifications } from "@api/NotificationAPI";

const Header = ({
  viewNotificationCount,
  hasNewNotifications,
  setHasNewNotifications,
}) => {
  const signOut = useSignOut();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    const authHeader = useAuthHeader();
    const headers = {
      Authorization: authHeader,
    };

    const toggleProfileDropdown = () => {
      setShowProfileDropdown(!showProfileDropdown);
    };

    const checkNotifications = async () => {
      try {
        let res = await getNotifications(headers);
        let newNotifications = res.data;
        console.log(newNotifications.length);
        if (newNotifications.length > viewNotificationCount) {
          setHasNewNotifications(true);
        } else {
          setHasNewNotifications(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    window.localStorage.setItem(
      "intervalId",
      setInterval(checkNotifications, 5000)
    );

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
              {hasNewNotifications && (
                <span className="absolute -top-2 right-8 bg-red-500 text-white rounded-full px-2 text-xs">
                  &nbsp;
                </span>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center focus:outline-none"
              >
                <UserCircleIcon className="w-6 h-6 mr-1" />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      window.location.reload();
                    }} // Add actual logout logic
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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
