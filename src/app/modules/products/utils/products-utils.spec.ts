import { Product } from '../interfaces/products-interface';
import { filterProducts, paginateProducts } from './product-utils';

describe('Product Utilities', () => {
  const mockProducts: Product[] = [
    {
      id: '123',
      name: 'Test Product',
      date_release: new Date(),
      date_revision: new Date(),
      description: 'Test description',
      logo: 'test.jpg',
    },
    {
      id: '456',
      name: 'Another Product',
      date_release: new Date(),
      date_revision: new Date(),
      description: 'Another description',
      logo: 'another.jpg',
    },
    {
      id: '789',
      name: 'One More Product',
      date_release: new Date(),
      date_revision: new Date(),
      description: 'One more description',
      logo: 'onemore.jpg',
    },
  ];

  describe('filterProducts', () => {
    it('should return all products if query is empty', () => {
      const result = filterProducts(mockProducts, '');
      expect(result).toEqual(mockProducts);
    });

    it('should return products that match the query (case insensitive)', () => {
      const result = filterProducts(mockProducts, 'product');
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if no products match the query', () => {
      const result = filterProducts(mockProducts, 'nonexistent');
      expect(result).toEqual([]);
    });
  });

  describe('paginateProducts', () => {
    it('should return the correct page of products', () => {
      const result = paginateProducts(mockProducts, 2, 1);
      expect(result).toEqual([mockProducts[0], mockProducts[1]]);
    });

    it('should return the correct products on the second page', () => {
      const result = paginateProducts(mockProducts, 2, 2);
      expect(result).toEqual([mockProducts[2]]);
    });

    it('should return an empty array if page is out of range', () => {
      const result = paginateProducts(mockProducts, 2, 3);
      expect(result).toEqual([]);
    });

    it('should handle pageSize larger than product array', () => {
      const result = paginateProducts(mockProducts, 10, 1);
      expect(result).toEqual(mockProducts);
    });
  });
});
