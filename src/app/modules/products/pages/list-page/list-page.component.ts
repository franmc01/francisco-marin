import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ActionType, Product } from '../../interfaces/products-interface';
import { filterProducts, paginateProducts } from '../../utils/product-utils';
import { ToastService } from '../../../ui/toast/toast.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListPageComponent implements OnInit {
  products: Product[] = [];

  pageOptions: number[] = [5, 10, 20];
  pageSize: number = 5;
  currentPage: number = 1;
  searchQuery: string = '';
  
  activeMenu: Product | null = null;
  menuPosition = { top: '0px', left: '0px' };
  
  showDeleteModal: boolean = false;
  itemToDelete: Product | null = null;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.productService.getProducts()
      .pipe(
        tap((response) => (this.products = response.data)),
        catchError(() => {
          this.toastService.showToast({
            type: 'error',
            text: 'Error al cargar los productos',
          });
          return of([]);
        })
      ).subscribe();
  }


  get paginatedProducts(): Product[] {
    const filtered = filterProducts(this.products, this.searchQuery);
    return paginateProducts(filtered, this.pageSize, this.currentPage);
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target?.value || '';
    this.currentPage = 1;
  }

  onPageSizeChange(event: Event, defaultSize: number = 5) {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target?.value || defaultSize;
    this.currentPage = 1;
  }

  toggleMenu(product: Product, event: Event) {
    event.stopPropagation();
    const buttonElement = (event.target as HTMLElement).closest('.action-button');
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      this.menuPosition = {
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX - 160}px`
      };
    }
    this.activeMenu = product;
  }

  closeAllMenus() {
    this.activeMenu = null;
  }

  navigateToCreate() {
    this.router.navigate(['/products/create']);
  }

  handleEdit(product: Product) {
    this.router.navigate(['/products/edit', product.id]);
  }

  handleDelete(product: Product) {
    this.showDeleteModal = true;
    this.itemToDelete = product;
  }

  handleView(product: Product) {
    console.log(`Viewing details for ${product.name}`);
  }

  actionHandlers: { [key in ActionType]: (product: Product) => void } = {
    edit: (product) => this.handleEdit(product),
    delete: (product) => this.handleDelete(product),
    view: (product) => this.handleView(product),
  };

  onActionClick(action: ActionType, product: Product, event: Event) {
    event.stopPropagation();
    const handler = this.actionHandlers[action];
    if (handler) handler(product);
    this.activeMenu = null;
  }

  confirmDelete() {
    if (this.itemToDelete) {
      this.productService.deleteProduct(this.itemToDelete.id).pipe(
        tap(() => {
          this.toastService.showToast({
            type: 'success',
            text: 'Producto eliminado correctamente',
          });
          this.products = this.products.filter(
            (item) => item.id !== this.itemToDelete?.id
          );
          this.closeDeleteModal();
        }),
        catchError(() => {
          this.toastService.showToast({
            type: 'error',
            text: 'Error al eliminar el producto',
          });
          return of(null);
        })
      ).subscribe();
    }
  }


  closeDeleteModal() {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }
}
