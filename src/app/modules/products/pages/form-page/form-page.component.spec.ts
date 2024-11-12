import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPageComponent } from './form-page.component';
import {
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../../ui/toast/toast.service';
import { of } from 'rxjs';
import { Product } from '../../interfaces/products-interface';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockInputComponent),
      multi: true,
    },
  ],
})
class MockInputComponent implements ControlValueAccessor {
  @Input() id!: any;
  @Input() invalid!: boolean;
  @Input() errorMessage!: string;
  @Input() value!: string;
  @Input() label!: string;
  @Input() placeholder!: string;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  onChange(value: string): void {
    this._onChange(value);
  }
}

@Component({ selector: 'app-button', template: '' })
class MockButtonComponent {
  @Input() type!: string;
  @Input() variant!: string;
  @Input() class!: string;
  @Input() disabled!: boolean;

  @Input() clicked: any;

  onClick() {
    if (this.clicked) {
      this.clicked.emit();
    }
  }
}

describe('FormPageComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProduct: Product = {
    id: '123',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'https://example.com/logo.jpg',
    date_release: new Date(),
    date_revision: new Date(),
  };

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'verifyId',
      'createProduct',
      'updateProduct',
    ]);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    productServiceSpy.getProductById.and.returnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      declarations: [
        FormPageComponent,
        MockInputComponent,
        MockButtonComponent,
      ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '123' } } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and create a product when not in edit mode', () => {
    component.isEditMode = false;
    component.form.setValue({
      id: '123',
      name: 'New Product',
      description: 'New Description',
      logo: 'https://example.com/logo.jpg',
      date_release: new Date(),
      date_revision: new Date(),
    });

    productServiceSpy.createProduct.and.returnValue(
      of({ message: 'Product created successfully', data: mockProduct })
    );
    component.onSubmit();
    expect(productServiceSpy.createProduct).toHaveBeenCalled();
    expect(toastServiceSpy.showToast).toHaveBeenCalledWith({
      type: 'success',
      text: 'Product created successfully',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update the product when in edit mode', () => {
    component.isEditMode = true;
    component.productId = '123';
    component.form.setValue({
      id: '123',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'https://example.com/logo.jpg',
      date_release: new Date(),
      date_revision: new Date(),
    });

    productServiceSpy.updateProduct.and.returnValue(
      of({
        message: 'Product updated successfully',
        data: {
          id: '123',
          name: 'Updated Product',
          description: 'Updated Description',
          logo: 'https://example.com/logo.jpg',
          date_release: new Date(),
          date_revision: new Date(),
        },
      })
    );
    component.onSubmit();
    expect(productServiceSpy.updateProduct).toHaveBeenCalled();
    expect(toastServiceSpy.showToast).toHaveBeenCalledWith({
      type: 'success',
      text: 'Product updated successfully',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should reset the form and fetch the product in edit mode', () => {
    component.isEditMode = true;
    component.productId = '123';

    productServiceSpy.getProductById.and.returnValue(of(mockProduct));
    component.onReset();
    fixture.detectChanges();

    expect(productServiceSpy.getProductById).toHaveBeenCalledWith('123');
    expect(component.form.get('name')?.value).toBe('Test Product');
  });


  it('should mark all form controls as touched and update validity', () => {
    component.form.setValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });

    fixture.detectChanges();

    Object.keys(component.form.controls).forEach((controlName) => {
      const control = component.form.get(controlName);
      expect(control?.touched).toBeFalse();
    });

    component.markAllAsTouched();

    fixture.detectChanges();

    Object.keys(component.form.controls).forEach((controlName) => {
      const control = component.form.get(controlName);
      expect(control?.touched).toBeTrue();
    });

    Object.keys(component.form.controls).forEach((controlName) => {
      const control = component.form.get(controlName);
      expect(control?.valid).toBeFalse();
    });
  });

  it('should return null for unique id when not in edit mode', (done) => {
    component.isEditMode = false;

    productServiceSpy.verifyId.and.returnValue(of(false));

    const control = { value: 'uniqueId123' } as AbstractControl;

    component.uniqueIdValidator(control).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return idNotUnique error when the id is not unique and not in edit mode', (done) => {
    component.isEditMode = false;

    productServiceSpy.verifyId.and.returnValue(of(true));

    const control = { value: 'existingId123' } as AbstractControl;

    component.uniqueIdValidator(control).subscribe((result) => {
      expect(result).toEqual({ idNotUnique: true });
      done();
    });
  });
});
