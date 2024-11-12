import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage | null>();

  getToast(): Observable<ToastMessage | null> {
    return this.toastSubject.asObservable();
  }

  showToast(message: ToastMessage) {
    this.toastSubject.next(message);
  }

  clearToast() {
    this.toastSubject.next(null);
  }
}
