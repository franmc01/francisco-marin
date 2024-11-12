import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePlaceholder'
})
export class ImagePlaceholderPipe implements PipeTransform {
  transform(value: string | null | undefined, placeholder: string = 'https://via.placeholder.com/50'): string {
    const imageUrlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*\.(jpg|jpeg|png|gif|webp)$/i;
    
    return value && imageUrlPattern.test(value) ? value : placeholder;
  }
}
