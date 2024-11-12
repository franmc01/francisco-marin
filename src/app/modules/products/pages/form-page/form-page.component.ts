import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/products-interface';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  getErrorMessage,
  dateReleaseValidator,
  dateRevisionValidator,
  urlValidator,
  formatDate,
} from '../../utils/form-utils';
import { ToastService } from '../../../ui/toast/toast.service';
import { APIError } from '../../interfaces/api-error';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private readonly productService: ProductService,
    private readonly toastService: ToastService
  ) {
    this.form = this.fb.group({
      id: [
        { value: '', disabled: this.isEditMode },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        this.uniqueIdValidator.bind(this),
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required, urlValidator()]],
      date_release: ['', [Validators.required, dateReleaseValidator]],
      date_revision: [
        '',
        [Validators.required, dateRevisionValidator.bind(this)],
      ],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode) {
      this.form.get('id')?.disable();
      if (this.productId) {
        this.productService
          .getProductById(this.productId)
          .pipe(
            catchError((error) => {
              this.toastService.showToast({
                type: 'warning',
                text:
                  error.message.message ||
                  'No se ha podido cargar el producto o no existe',
              });
              this.router.navigate(['/']);
              return of(null);
            })
          )
          .subscribe((product: Product | null) => {
            if (product) {
              this.form.patchValue({
                ...product,
                date_release: formatDate(product.date_release),
                date_revision: formatDate(product.date_revision),
              });
            }
          });
      }
    }
  }

  uniqueIdValidator(control: AbstractControl) {
    if (this.isEditMode) {
      return of(null);
    }

    return this.productService.verifyId(control.value).pipe(
      map((isExistingId) => (isExistingId ? { idNotUnique: true } : null)),
      catchError(() => of(null))
    );
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);
    return control
      ? getErrorMessage(control, this.getFieldName(controlName))
      : null;
  }

  private getFieldName(controlName: string): string {
    switch (controlName) {
      case 'id':
        return 'ID';
      case 'name':
        return 'Nombre del producto';
      case 'description':
        return 'Descripción';
      case 'logo':
        return 'Logo';
      case 'date_release':
        return 'Fecha de Liberación';
      case 'date_revision':
        return 'Fecha de Revisión';
      default:
        return controlName;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }

    const productData = this.form.getRawValue();

    if (this.isEditMode) {
      this.productService
        .updateProduct(this.productId!, productData)
        .subscribe((response) => {
          this.toastService.showToast({
            type: 'success',
            text: response?.message || 'Producto creado correctamente',
          });

          this.router.navigate(['/']);
        });
    } else {
      this.productService.createProduct(productData).subscribe((response) => {
        this.toastService.showToast({
          type: 'success',
          text: response?.message || 'Producto creado correctamente',
        });

        this.router.navigate(['/']);
      });
    }
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();

    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      control?.updateValueAndValidity();
    });
  }

  onReset() {
    this.form.reset();
    if (this.isEditMode && this.productId) {
      this.productService
        .getProductById(this.productId)
        .subscribe((product: Product) => {
          this.form.patchValue({
            ...product,
            date_release: formatDate(product.date_release),
            date_revision: formatDate(product.date_revision),
          });
        });
    }
  }
}
