
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-red-600 border-b border-emerald-500/20 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-xl font-bold text-white">TechLearn Kenya</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-emerald-100 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/courses" className="text-emerald-100 hover:text-white transition-colors">
              Courses
            </Link>
            <Link to="/community" className="text-emerald-100 hover:text-white transition-colors">
              Community
            </Link>
            <Link to="/pricing" className="text-emerald-100 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/profile" className="text-emerald-100 hover:text-white transition-colors">
              Profile
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-emerald-100 hover:text-white p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-emerald-100 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 text-emerald-100 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/community"
              className="block px-3 py-2 text-emerald-100 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-emerald-100 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 text-emerald-100 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navigation };
