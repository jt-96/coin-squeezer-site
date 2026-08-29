import type { Product } from "./product.type";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async(): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/api/get/products`);

    if(!response.ok) {
        throw new Error('Failed to get products data!');
    }

    return response.json();
};