import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImagePlaceholderPipe } from './pipes/image-placeholder.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    ImagePlaceholderPipe,
    HeaderComponent,
    DateFormatPipe,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: [
    NotFoundPageComponent,
    HeaderComponent,
    FooterComponent,
    ImagePlaceholderPipe,
    DateFormatPipe
  ]
})
export class SharedModule { }
