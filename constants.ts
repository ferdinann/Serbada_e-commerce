import { Product } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sepatu Sneaker Urban",
    price: 350000,
    description: "Sepatu sneaker nyaman untuk penggunaan sehari-hari dengan desain modern.",
    category: "Fashion",
    image: "https://picsum.photos/seed/shoe1/400/400"
  },
  {
    id: "2",
    name: "Tas Ransel Laptop",
    price: 250000,
    description: "Tas ransel waterproof dengan kompartemen laptop hingga 15 inci.",
    category: "Aksesoris",
    image: "https://picsum.photos/seed/bag1/400/400"
  },
  {
    id: "3",
    name: "Jam Tangan Klasik",
    price: 500000,
    description: "Jam tangan analog dengan strap kulit asli.",
    category: "Aksesoris",
    image: "https://picsum.photos/seed/watch1/400/400"
  },
  {
    id: "4",
    name: "Kemeja Flanel Kotak",
    price: 180000,
    description: "Kemeja flanel bahan premium, cocok untuk casual maupun semi-formal.",
    category: "Fashion",
    image: "https://picsum.photos/seed/shirt1/400/400"
  },
  {
    id: "5",
    name: "Headphone Bluetooth",
    price: 450000,
    description: "Suara bass mantap dengan baterai tahan hingga 20 jam.",
    category: "Elektronik",
    image: "https://picsum.photos/seed/headphone1/400/400"
  },
  {
    id: "6",
    name: "Topi Baseball",
    price: 75000,
    description: "Topi baseball dengan bordir berkualitas tinggi.",
    category: "Fashion",
    image: "https://picsum.photos/seed/hat1/400/400"
  }
];

export const WHATSAPP_NUMBER = "6283166896713"; // Formatted for API link (no leading 0, add 62)
