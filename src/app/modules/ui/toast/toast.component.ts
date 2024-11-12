import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  duration?: number;
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: ToastMessage | null = null;
  isVisible = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToast().subscribe((message: ToastMessage | null) => {
      this.message = message;
      if (message) {
        this.isVisible = true;
        setTimeout(() => this.isVisible = false, message.duration || 5500);
      }
    });
  }

  closeToast() {
    this.isVisible = false;
  }
}
