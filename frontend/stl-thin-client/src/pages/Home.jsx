import { Link } from "react-router-dom";
import {
  Cog6ToothIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
} from "@heroicons/react/24/solid"; // Icons

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white p-12">
        <h1 className="text-4xl font-bold">Welcome to Sri-Care Portal</h1>
        <p className="mt-4 text-lg">
          Manage your telecom services, pay bills, and get customer support all
          in one place.
        </p>
      </div>

      <div className="p-6 space-y-8">
        <h2 className="text-2xl font-bold text-center">
          What would you like to do?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/services"
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition"
          >
            <Cog6ToothIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Manage Services</h3>
            <p className="text-gray-600">
              Activate or deactivate VAS and other telecom services.
            </p>
          </Link>

          <Link
            to="/bills"
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition"
          >
            <CreditCardIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">View Bills</h3>
            <p className="text-gray-600">
              View and pay your current and past bills.
            </p>
          </Link>

          <Link
            to="/chat"
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition"
          >
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Customer Support</h3>
            <p className="text-gray-600">
              Chat with a customer support agent for assistance.
            </p>
          </Link>

          <Link
            to="/notifications"
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition"
          >
            <BellIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Notifications</h3>
            <p className="text-gray-600">
              Check your latest alerts and updates.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
