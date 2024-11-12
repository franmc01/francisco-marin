import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct bank name', () => {
    expect(component.bankName).toBe('Banco');
  });

  it('should render bank name in the template', () => {
    const bankNameElement = fixture.debugElement.query(By.css('.app-header__title')).nativeElement;
    expect(bankNameElement.textContent).toContain('Banco');
  });

  it('should navigate to root when redirectToRoot is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToRoot();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
