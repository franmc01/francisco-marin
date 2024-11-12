import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { Product, ProductEditedResponse, ProductRemovedResponse, ProductSaveResponse, ProductsResponse } from '../interfaces/products-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/bp/products`);
  }

  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/bp/products/verification/${id}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/bp/products/${id}`);
  }

  createProduct(product: Product): Observable<ProductSaveResponse> {
    return this.http.post<ProductSaveResponse>(`${this.baseUrl}/bp/products`, product);
  }

  updateProduct(id: string, product: Product): Observable<ProductEditedResponse> {
    return this.http.put<ProductEditedResponse>(`${this.baseUrl}/bp/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<ProductRemovedResponse> {
    return this.http.delete<ProductRemovedResponse>(`${this.baseUrl}/bp/products/${id}`);
  }

}
