"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect, useRef } from "react";

interface ProductImageCarouselProps {
  images: string[]; // was: StaticImageData[]
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="min-w-full flex justify-center items-center h-64 bg-white"
          >
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              className="h-auto max-h-full w-auto max-w-full object-contain"
              width={500}
              height={650}
            />
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom--4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === idx ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
