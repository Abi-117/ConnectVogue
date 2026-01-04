import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeatureBanner } from '@/components/home/FeatureBanner';
import { ProductCard } from '@/components/ui/ProductCard';

import {
  fetchProductsByCategory,
} from '@/api/products';

const Index = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeProducts = async () => {
      try {
        const newData = await fetchProductsByCategory('new');
        const trendingData = await fetchProductsByCategory('trending');

        setNewArrivals(newData);
        setTrendingProducts(trendingData);
      } catch (error) {
        console.error('Home products fetch failed', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeProducts();
  }, []);

  return (
    <Layout>
      <HeroSlider />
      <FeatureBanner />
      <CategoryGrid />

      {/* New Arrivals */}
      {!loading && newArrivals.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
              New Arrivals
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      {!loading && trendingProducts.length > 0 && (
        <section className="py-16 bg-silk">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
              Trending Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {trendingProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
