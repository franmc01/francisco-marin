import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  bankName: string = 'Banco';

  constructor(private readonly router: Router) {}

  redirectToRoot() {
    this.router.navigate(['/']);
  }
}
