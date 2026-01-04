import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const CategoryGrid = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  if (!categories.length) return null;

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Explore <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover our carefully curated collections across fashion, electronics, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
  key={index}
  to={`/category/${category.slug}`} // <-- change from `/${category.slug}`
  className={cn(
    "group relative overflow-hidden rounded-lg aspect-square md:aspect-[4/3] animate-fade-in",
    category.featured &&
      "md:col-span-2 md:row-span-2 md:aspect-square"
  )}
  style={{ animationDelay: `${index * 100}ms` }}
>

              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent" />

              <div className="absolute inset-0 flex items-end p-4 md:p-6">
                <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-silk mb-1">
                    {category.name}
                  </h3>
                  <span className="text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
