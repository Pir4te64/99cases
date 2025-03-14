import fundaFox from "../../assets/Productos/FP1.png";
import fundaFox2 from "../../assets/Productos/FP2.png";
import fundaFox3 from "../../assets/Productos/FP3.png";
import fundaFox4 from "../../assets/Productos/FP4.png";
import fundaFox5 from "../../assets/Productos/FP5.png";
import fundaFox6 from "../../assets/Productos/FP6.png";
import fundaFox7 from "../../assets/Productos/FP7.png";
import fundaFox8 from "../../assets/Productos/FP8.png";

// Definimos la forma de cada producto
interface Product {
  id: number;
  discount?: string; // puede ser opcional
  imageSrc: string;
  title: string;
  price: string;
  oldPrice?: string; // puede ser opcional
}
export const products: Product[] = [
  {
    id: 1,
    discount: "-13% OFF",
    imageSrc: fundaFox,
    title: "Funda Yamaha Fox",
    price: "$30.000",
    oldPrice: "$35.000",
  },
  {
    id: 2,
    imageSrc: fundaFox2,
    title: "Funda Yamaha Fox",
    price: "$28.000",
  },
  {
    id: 3,
    discount: "-10% OFF",
    imageSrc: fundaFox3,
    title: "Funda Yamaha Fox",
    price: "$27.000",
    oldPrice: "$30.000",
  },
  {
    id: 4,
    imageSrc: fundaFox4,
    title: "Funda Yamaha Fox",
    price: "$29.000",
  },
  {
    id: 5,
    discount: "-13% OFF",
    imageSrc: fundaFox5,
    title: "Funda Yamaha Fox",
    price: "$29.000",
    oldPrice: "$35.000",
  },
  {
    id: 6,
    imageSrc: fundaFox6,
    title: "Funda Yamaha Fox",
    price: "$29.000",
  },
  {
    id: 7,
    imageSrc: fundaFox7,
    title: "Funda Yamaha Fox",
    price: "$29.000",
  },
  {
    id: 8,
    discount: "-13% OFF",
    imageSrc: fundaFox8,
    title: "Funda Yamaha Fox",
    price: "$29.000",
    oldPrice: "$35.000",
  },
];
