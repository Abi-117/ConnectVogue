import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import logo from "@/assets/logosamsel.png";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  /* Fetch categories */
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  /* Scroll bg change only */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[60px]",
          "transition-colors duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">

            {/* LOGO */}
            <Link to="/" className="flex items-center h-full">
              <img
                src={logo}
                alt="Samsel Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-7">
              <Link
                to="/"
                className={cn(
                  "nav-link",
                  location.pathname === "/" && "text-primary"
                )}
              >
                Home
              </Link>

              {/* CATEGORY DROPDOWN */}
              <div className="relative group">
                <button className="nav-link flex items-center gap-1">
                  Categories <span className="text-xs">▾</span>
                </button>

                <div
                  className="
                    absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200 z-50
                  "
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              {/* CART */}
              <Link
                to="/cart"
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[60px] left-0 right-0 bg-white shadow-md z-40">
          <nav className="flex flex-col px-4 py-3 gap-2">

            <Link
              to="/"
              className={cn(
                "py-2 px-3 rounded-md text-sm",
                location.pathname === "/" && "bg-primary text-white"
              )}
            >
              Home
            </Link>

            <div>
              <p className="text-xs font-semibold text-gray-500 px-3 mt-2 mb-1">
                Categories
              </p>

              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className={cn(
                    "block py-2 px-3 rounded-md text-sm",
                    location.pathname === `/category/${cat.slug}`
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link
              to="/about"
              className="py-2 px-3 rounded-md text-sm hover:bg-gray-100"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="py-2 px-3 rounded-md text-sm hover:bg-gray-100"
            >
              Contact
            </Link>

          </nav>
        </div>
      )}
    </>
  );
};
