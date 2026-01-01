import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Project screenshot"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* LEFT */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2
                   opacity-0 group-hover:opacity-100
                   transition bg-black/40 backdrop-blur
                   p-2 rounded-full text-white"
      >
        <ChevronLeft size={18} />
      </button>

      {/* RIGHT */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   opacity-0 group-hover:opacity-100
                   transition bg-black/40 backdrop-blur
                   p-2 rounded-full text-white"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
