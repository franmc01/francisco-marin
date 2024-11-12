// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a toast message when showToast is called', (done) => {
    const testMessage = { type: 'success', text: 'Test success message', duration: 3000 };

    service.getToast().subscribe((message) => {
      expect(message).toEqual(testMessage);
      done();
    });

    service.showToast(testMessage);
  });

  it('should emit null when clearToast is called', (done) => {
    service.getToast().subscribe((message) => {
      expect(message).toBeNull();
      done();
    });

    service.clearToast();
  });

  it('should allow multiple subscribers to get toast messages', (done) => {
    const testMessage: ToastMessage = { type: 'info', text: 'Info message', duration: 2000 };

    let subscriber1Received = false;
    let subscriber2Received = false;

    service.getToast().subscribe((message) => {
      expect(message).toEqual(testMessage);
      subscriber1Received = true;
      if (subscriber1Received && subscriber2Received) done();
    });

    service.getToast().subscribe((message) => {
      expect(message).toEqual(testMessage);
      subscriber2Received = true;
      if (subscriber1Received && subscriber2Received) done();
    });

    service.showToast(testMessage);
  });
});
