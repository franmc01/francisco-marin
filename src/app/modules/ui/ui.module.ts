import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    ToastComponent
  ]
})
export class UiModule { }
