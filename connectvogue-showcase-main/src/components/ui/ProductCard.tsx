import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '@/api/products';
import { useCart } from '@/context/CartContext';
import { Button } from './button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]?.name);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]?.name);
    navigate('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="card-luxury relative overflow-hidden aspect-[3/4]">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-noir/40 transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold uppercase tracking-wider">
                Sale
              </span>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
              toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center transition-all hover:scale-110"
          >
            <Heart
              className={cn('w-5 h-5 transition-colors', isLiked ? 'fill-destructive text-destructive' : 'text-foreground')}
            />
          </button>

          {/* Quick Actions */}
          <div
            className={cn(
              'absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Button
              onClick={handleAddToCart}
              variant="secondary"
              className="flex-1 bg-background/95 hover:bg-background text-foreground"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Buy Now
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
          <h3 className="font-display text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1 pt-1">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};