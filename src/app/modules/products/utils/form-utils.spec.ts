import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { getErrorMessage, dateReleaseValidator, dateRevisionValidator, urlValidator, formatDate } from './form-utils';

describe('Validators', () => {
  describe('getErrorMessage', () => {
    it('should return required error message', () => {
      const control = new FormControl('', { validators: [Validators.required] });
      control.markAsTouched();
      expect(getErrorMessage(control, 'Campo')).toBe('Campo es requerido.');
    });

    it('should return minlength error message', () => {
      const control = new FormControl('abc', { validators: [Validators.minLength(5)] });
      control.markAsTouched();
      expect(getErrorMessage(control, 'Campo')).toBe('Campo debe tener al menos 5 caracteres.');
    });

    it('should return maxlength error message', () => {
      const control = new FormControl('abcdef', { validators: [Validators.maxLength(3)] });
      control.markAsTouched();
      expect(getErrorMessage(control, 'Campo')).toBe('Campo no puede tener más de 3 caracteres.');
    });

    it('should return custom idNotUnique error message', () => {
      const control = new FormControl('', { validators: [() => ({ idNotUnique: true })] });
      control.markAsTouched();
      expect(getErrorMessage(control, 'Campo')).toBe('Id inválido, elija otro.');
    });
  });

  describe('dateReleaseValidator', () => {
    it('should return null for valid date', () => {
      const control = new FormControl(new Date());
      expect(dateReleaseValidator(control)).toBeNull();
    });

    it('should return error object for past date', () => {
      const control = new FormControl(new Date('2000-01-01'));
      expect(dateReleaseValidator(control)).toEqual({ dateReleaseInvalid: true });
    });
  });

  describe('dateRevisionValidator', () => {
    it('should return null for valid revision date', () => {
      const form = new FormGroup({ date_release: new FormControl(new Date('2023-01-01')) });
      const control = new FormControl(new Date('2024-01-01'));
      const validator = dateRevisionValidator(form);
      expect(validator(control)).toBeNull();
    });

    it('should return error object for invalid revision date', () => {
      const form = new FormGroup({ date_release: new FormControl(new Date('2023-01-01')) });
      const control = new FormControl(new Date('2023-06-01'));
      const validator = dateRevisionValidator(form);
      expect(validator(control)).toEqual({ dateRevisionInvalid: true });
    });
  });

  describe('urlValidator', () => {
    it('should return null for valid URL', () => {
      const control = new FormControl('https://example.com/image.jpg');
      const validator: ValidatorFn = urlValidator();
      expect(validator(control)).toBeNull();
    });

    it('should return error object for invalid URL', () => {
      const control = new FormControl('invalid-url');
      const validator: ValidatorFn = urlValidator();
      expect(validator(control)).toEqual({ invalidUrl: true });
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-11-12');
      expect(formatDate(date)).toBe('2023-11-12');
    });
  });
});
