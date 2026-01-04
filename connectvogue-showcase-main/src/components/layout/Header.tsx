import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

/* ✅ Backend Category Type */
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

  /* ✅ FETCH CATEGORIES FROM BACKEND */
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  /* Scroll Effect */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="font-bold text-2xl tracking-tight hover:text-primary transition"
          >
            CONNECT<span className="text-primary">VOGUE</span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "nav-link",
                location.pathname === "/" && "text-primary after:w-full"
              )}
            >
              Home
            </Link>

            {/* 🔽 CATEGORY DROPDOWN */}
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
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-gray-100",
                      location.pathname === `/category/${cat.slug}` &&
                        "text-primary font-semibold"
                    )}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/about"
              className={cn(
                "nav-link",
                location.pathname === "/about" && "text-primary after:w-full"
              )}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={cn(
                "nav-link",
                location.pathname === "/contact" && "text-primary after:w-full"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-secondary">
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary"
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
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-2">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/category/${cat.slug}`}
                className={cn(
                  "px-4 py-2 rounded-md text-sm",
                  location.pathname === `/category/${cat.slug}`
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-primary/10"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
