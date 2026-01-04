import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ui/ProductCard';
import { fetchProductsByCategory } from '@/api/products';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const priceRanges = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
  { label: 'Above ₹30,000', min: 30000, max: Infinity },
];

const brands = ['All', 'ConnectVogue', 'Luxe Italia', 'Milano', 'Urban Edge'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Navy', 'Grey', 'Brown', 'Red'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

const CategoryPage = () => {
  const { category } = useParams(); // slug
  const categorySlug = category || 'men';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Featured');

  // 🔥 Fetch products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductsByCategory(categorySlug);
        setProducts(data);
      } catch (err) {
        console.error('Category fetch failed', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categorySlug]);

  // 🔥 Filters (frontend only)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      result = result.filter(
        (p) => p.price >= range.min && p.price < range.max
      );
    }

    if (selectedBrand !== 'All') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (selectedSize) {
      result = result.filter((p) => p.sizes?.includes(selectedSize));
    }

    if (selectedColor) {
      result = result.filter((p) =>
        p.colors?.some((c: any) => c.name === selectedColor)
      );
    }

    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
    }

    return result;
  }, [products, selectedPrice, selectedBrand, selectedSize, selectedColor, sortBy]);

  const clearFilters = () => {
    setSelectedPrice(null);
    setSelectedBrand('All');
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const hasActiveFilters =
    selectedPrice !== null ||
    selectedBrand !== 'All' ||
    selectedSize ||
    selectedColor;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center mt-16">
        <div className="absolute inset-0 bg-noir/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-silk mb-2 capitalize">
            {categorySlug}
          </h1>
          <p className="text-silk/80">
            Discover premium {categorySlug} products
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-secondary pl-4 pr-10 py-2 rounded-lg"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <p className="text-center py-20">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No products found.
              </p>
              <Button onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
