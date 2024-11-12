import { Product } from '../interfaces/products-interface';

export function filterProducts(products: Product[], query: string): Product[] {
  if (!query) return products;
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery)
  );
}

export function paginateProducts(
  products: Product[],
  pageSize: number,
  currentPage: number
): Product[] {
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;
  return products.slice(start, end);
}
