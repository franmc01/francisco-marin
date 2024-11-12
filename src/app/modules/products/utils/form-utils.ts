import { AbstractControl, ValidatorFn } from '@angular/forms';

export function getErrorMessage(control: AbstractControl, fieldName: string): string | null {
  if (control.hasError('required')) return `${fieldName} es requerido.`;
  if (control.hasError('minlength')) return `${fieldName} debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres.`;
  if (control.hasError('maxlength')) return `${fieldName} no puede tener más de ${control.errors?.['maxlength'].requiredLength} caracteres.`;
  if (control.hasError('idNotUnique')) return 'Id inválido, elija otro.';
  if (control.hasError('dateReleaseInvalid')) return 'La fecha debe ser hoy o en el futuro.';
  if (control.hasError('dateRevisionInvalid')) return 'La fecha de revisión debe ser un año después de la fecha de liberación.';
  if (control.hasError('invalidUrl')) return `${fieldName} debe ser una URL válida.`;

  return null;
}

export function dateReleaseValidator(control: AbstractControl) {
  const today = new Date();
  const inputDate = new Date(control.value);
  return inputDate >= today ? null : { dateReleaseInvalid: true };
}

export function dateRevisionValidator(form: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const releaseDate = new Date(form.get('date_release')?.value);
    const revisionDate = new Date(control.value);
    releaseDate.setFullYear(releaseDate.getFullYear() + 1);
    return revisionDate.getTime() === releaseDate.getTime() ? null : { dateRevisionInvalid: true };
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const imageUrlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*\.(jpg|jpeg|png|gif|webp)$/i;
    return imageUrlPattern.test(control.value) ? null : { invalidUrl: true };
  };
}


export function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}
