import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value when writeValue is called', () => {
    component.writeValue('test value');
    expect(component.value).toBe('test value');
  });

  it('should register onChange function', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.handleInput({ target: { value: 'new value' } } as any as Event);
    expect(onChangeSpy).toHaveBeenCalledWith('new value');
  });

  it('should register onTouched function', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);

    component.handleBlur();
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should disable the input when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(inputElement.disabled).toBeTrue();
  });

  it('should enable the input when setDisabledState is called with false', () => {
    component.setDisabledState(false);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(inputElement.disabled).toBeFalse();
  });

  it('should display error message when invalid is true and errorMessage is provided', () => {
    component.invalid = true;
    component.errorMessage = 'Test error message';
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Test error message');
  });

  it('should not display error message when invalid is false', () => {
    component.invalid = false;
    component.errorMessage = 'Test error message';
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorElement).toBeFalsy();
  });

  it('should update value and call onChange when input value changes', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    inputElement.value = 'updated value';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe('updated value');
    expect(onChangeSpy).toHaveBeenCalledWith('updated value');
  });
});
