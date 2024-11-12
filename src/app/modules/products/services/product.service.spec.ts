import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from '../../../../environments/environments';
import { Product, ProductEditedResponse, ProductRemovedResponse, ProductSaveResponse, ProductsResponse } from '../interfaces/products-interface';


const mockProduct: Product = { 
  id: '123',
  name: 'Test Product',
  date_release: new Date(),
  date_revision: new Date(),
  description: 'Test description',
  logo: 'test.jpg',
};

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products (GET)', () => {
    const mockProductsResponse: ProductsResponse = { 
      data: []
    };

    service.getProducts().subscribe((response) => {
      expect(response).toEqual(mockProductsResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/bp/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductsResponse);
  });

  it('should verify product ID (GET)', () => {
    const productId = '123';
    const mockVerificationResponse = true;

    service.verifyId(productId).subscribe((response) => {
      expect(response).toBe(mockVerificationResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/bp/products/verification/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVerificationResponse);
  });

  it('should fetch product by ID (GET)', () => {
    const productId = '123';
    service.getProductById(productId).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${baseUrl}/bp/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should create a new product (POST)', () => {
    const mockSaveResponse: ProductSaveResponse = { 
      data: mockProduct,
      message: 'Product created successfully'
    };

    service.createProduct(mockProduct).subscribe((response) => {
      expect(response).toEqual(mockSaveResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/bp/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockSaveResponse);
  });

  it('should update an existing product (PUT)', () => {
    const productId = '123';
    const updatedProduct: Product = { ...mockProduct, name: 'Updated Product' };
    const mockEditResponse: ProductEditedResponse = { 
      message: 'Product updated successfully',
      data: updatedProduct
     };

    service.updateProduct(productId, updatedProduct).subscribe((response) => {
      expect(response).toEqual(mockEditResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/bp/products/${productId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(mockEditResponse);
  });

  it('should delete a product by ID (DELETE)', () => {
    const productId = '123';
    const mockDeleteResponse: ProductRemovedResponse = { 
      message: 'Product deleted successfully'
     };

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toEqual(mockDeleteResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/bp/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockDeleteResponse);
  });
});
