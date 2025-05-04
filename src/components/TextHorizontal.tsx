import { motion } from "framer-motion";

const textItems = [
  "ENVIOS A TODO EL PAÍS",
  "HECHO EN ARGENTINA",
  "SOMOS 99% CASES",
];

const Marquee = () => {
  const combinedItems = [...textItems, ...textItems]; // Duplicamos

  return (
    <div className="overflow-hidden bg-red-600 h-12 whitespace-nowrap relative">
      <motion.div
        className="flex gap-16 items-center absolute left-0 top-0 h-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 20,
        }}
        style={{ minWidth: "200%" }}
      >
        {combinedItems.map((item, i) => (
          <span
            key={i}
            className="mx-4 text-white text-xs sm:text-sm md:text-base uppercase font-bold font-favoritMono italic"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
