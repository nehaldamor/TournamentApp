// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-xl mb-6">Oops! Page Not Found</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
