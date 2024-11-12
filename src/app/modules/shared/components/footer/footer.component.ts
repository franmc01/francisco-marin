import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  author: string = 'Francisco Marín';
  currentYear: number = new Date().getFullYear();
}
