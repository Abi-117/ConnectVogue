import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  fetchProductById,
  fetchProductsByCategory,
} from "@/api/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  // 🔥 Fetch product
  useEffect(() => {
    if (!id) return;

    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedSize(data?.sizes?.[0] || "");
        setSelectedColor(data?.colors?.[0]?.name || "");

        // related products
        if (data?.category) {
          fetchProductsByCategory(data.category).then((res) => {
            setRelatedProducts(
              res.filter((p: any) => p._id !== data._id).slice(0, 4)
            );
          });
        }
      })
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate("/checkout");
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg object-cover"
          />

          {/* Info */}
          <div>
            <p className="text-sm uppercase text-muted-foreground">
              {product.brand}
            </p>

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex gap-3 mb-6">
              <span className="text-2xl font-bold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="line-through text-muted-foreground">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="mb-6 text-muted-foreground">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 font-medium">Size</p>
                <div className="flex gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 border rounded",
                        selectedSize === size &&
                          "bg-primary text-white"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 font-medium">
                  Color: {selectedColor}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c: any) => (
                    <button
                      key={c.name}
                      style={{ background: c.hex }}
                      className={cn(
                        "w-8 h-8 rounded-full",
                        selectedColor === c.name &&
                          "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus />
              </Button>
              <span>{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 w-4 h-4" /> Add to Cart
              </Button>
              <Button onClick={handleBuyNow}>Buy Now</Button>
              <Button
                variant="outline"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className={cn(isLiked && "fill-red-500 text-red-500")}
                />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
