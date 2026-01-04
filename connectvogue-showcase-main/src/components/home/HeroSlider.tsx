import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const HeroSlider = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/hero")
      .then(res => res.json())
      .then(data => setSlides(data));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(s => (s + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slides, nextSlide]);

  if (!slides.length) return null;

  return (
    <section className="relative text-center mt-20 h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0  transition-opacity duration-700",
            i === currentSlide ? "opacity-100 z-10" : "opacity-0"
          )}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 max-w-3xl text-white">
              
              {/* H1 */}
              <h1 className="text-4xl md:text-8xl font-bold mb-4">
                {slide.title}
              </h1>

              {/* H2 */}
              <h2 className="text-xl md:text-3xl font-semibold mb-4 text-gold">
                {slide.subtitle}
              </h2>

              {/* Paragraph */}
              <p className="text-lg mb-8 text-white/80">
                {slide.description}
              </p>

              {/* Buttons */}
             <div className="flex justify-center items-center gap-4 flex-wrap">
  {slide.btn1Text && slide.btn1Link && (
    <Button asChild>
      <Link to={slide.btn1Link}>{slide.btn1Text}</Link>
    </Button>
  )}

  {slide.btn2Text && slide.btn2Link && (
    <Button variant="destructive" asChild>
      <Link to={slide.btn2Link}>{slide.btn2Text}</Link>
    </Button>
  )}

  {slide.btn3Text && slide.btn3Link && (
    <Button variant="secondary" asChild>
      <Link to={slide.btn3Link}>{slide.btn3Text}</Link>
    </Button>
  )}
</div>



            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
