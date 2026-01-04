import { useEffect, useState } from "react";
import {
  Truck,
  RefreshCw,
  Shield,
  Headphones,
} from "lucide-react";

const iconsMap: any = {
  Truck,
  RefreshCw,
  Shield,
  Headphones,
};

export const FeatureBanner = () => {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/features")
      .then(res => res.json())
      .then(data => setFeatures(data));
  }, []);

  if (!features.length) return null;

  return (
    <section className="py-12 bg-secondary border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = iconsMap[feature.icon];
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
