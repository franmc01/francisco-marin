// @ts-nocheck
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { of } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ToastService', ['getToast']);

    spy.getToast.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [{ provide: ToastService, useValue: spy }]
    }).compileComponents();

    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display toast message and hide after duration', fakeAsync(() => {
    const mockMessage = { type: 'success', text: 'Test message', duration: 3000 };
    toastServiceSpy.getToast.and.returnValue(of(mockMessage));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isVisible).toBeTrue();
    expect(component.message).toEqual(mockMessage);

    tick(3000);
    fixture.detectChanges();

    expect(component.isVisible).toBeFalse();
  }));

  it('should close toast when closeToast is called', () => {
    component.isVisible = true;
    component.closeToast();

    expect(component.isVisible).toBeFalse();
  });

  it('should use default duration if not specified', fakeAsync(() => {
    const mockMessage = { type: 'info', text: 'No duration specified' };
    toastServiceSpy.getToast.and.returnValue(of(mockMessage));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isVisible).toBeTrue();
    expect(component.message).toEqual(mockMessage);

    tick(5500);
    fixture.detectChanges();

    expect(component.isVisible).toBeFalse();
  }));
});
