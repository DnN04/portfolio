import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="py-20 overflow-hidden">
      <motion.div style={{ x }} className="flex gap-6">
        {[...images, ...images].map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: (index % images.length) * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-[600px] h-[400px] rounded-sm overflow-hidden"
          >
            <img
              src={image}
              alt={`Portfolio piece ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
