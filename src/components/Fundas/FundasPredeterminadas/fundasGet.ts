import fundaFox from "../../../assets/Productos/FP1.png";
import fundaFox2 from "../../../assets/Productos/FP2.png";
import fundaFox3 from "../../../assets/Productos/FP3.png";
import fundaFox4 from "../../../assets/Productos/FP4.png";
import fundaFox5 from "../../../assets/Productos/FP5.png";
import fundaFox6 from "../../../assets/Productos/FP6.png";
import fundaFox7 from "../../../assets/Productos/FP7.png";
import fundaFox8 from "../../../assets/Productos/FP8.png";

interface Product {
  id: number;
  discount?: string; // opcional
  imageSrc: string;
  title: string;
  price: string;
  oldPrice?: string; // opcional
  cantidadesVendidos: number; // Indica cuántas se vendieron
  description: string; // Características del producto
}

export const products: Product[] = [
  {
    id: 1,
    discount: "-13% OFF",
    imageSrc: fundaFox,
    title: "Funda Yamaha Fox",
    price: "$30.000",
    oldPrice: "$35.000",
    cantidadesVendidos: 120,
    description:
      "Funda para celular con diseño moderno y resistente, protege contra golpes y rayones.",
  },
  {
    id: 2,
    imageSrc: fundaFox2,
    title: "Funda Yamaha Fox",
    price: "$28.000",
    cantidadesVendidos: 95,
    description:
      "Funda para celular elegante y liviana, con material antideslizante y acabado premium.",
  },
  {
    id: 3,
    discount: "-10% OFF",
    imageSrc: fundaFox3,
    title: "Funda Yamaha Fox",
    price: "$27.000",
    oldPrice: "$30.000",
    cantidadesVendidos: 150,
    description:
      "Funda para celular resistente, con diseño ergonómico y protección completa contra caídas.",
  },
  {
    id: 4,
    imageSrc: fundaFox4,
    title: "Funda Yamaha Fox",
    price: "$29.000",
    cantidadesVendidos: 80,
    description:
      "Funda para celular con estilo, fabricada en material flexible y resistente a impactos.",
  },
  {
    id: 5,
    discount: "-13% OFF",
    imageSrc: fundaFox5,
    title: "Funda Yamaha Fox",
    price: "$29.000",
    oldPrice: "$35.000",
    cantidadesVendidos: 110,
    description:
      "Funda para celular con acabado mate, protege tu dispositivo con elegancia y seguridad.",
  },
  {
    id: 6,
    imageSrc: fundaFox6,
    title: "Funda Yamaha Fox",
    price: "$29.000",
    cantidadesVendidos: 70,
    description:
      "Funda para celular con diseño minimalista, ofrece alta resistencia a impactos y caídas.",
  },
  {
    id: 7,
    imageSrc: fundaFox7,
    title: "Funda Yamaha Fox",
    price: "$29.000",
    cantidadesVendidos: 130,
    description:
      "Funda para celular con recubrimiento antideslizante y protección total, ideal para uso diario.",
  },
  {
    id: 8,
    discount: "-13% OFF",
    imageSrc: fundaFox8,
    title: "Funda Yamaha Fox",
    price: "$29.000",
    oldPrice: "$35.000",
    cantidadesVendidos: 90,
    description:
      "Funda para celular con diseño exclusivo, combina resistencia y estilo para proteger tu dispositivo.",
  },
];
