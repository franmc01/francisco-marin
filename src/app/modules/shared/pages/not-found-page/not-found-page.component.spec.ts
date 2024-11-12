import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the notFoundMessage in the template', () => {
    component.notFoundMessage = 'Page not found!';
    fixture.detectChanges();
  
    const messageElement = fixture.debugElement.query(By.css('.centered-text')).nativeElement;
    expect(messageElement.textContent).toContain('Page not found!');
  });
  

  it('should have large centered text with appropriate styles', () => {
    const messageElement = fixture.debugElement.query(By.css('.centered-text')).nativeElement;

    const fontSize = window.getComputedStyle(messageElement).fontSize;
    expect(fontSize).toBe('32px');

    const textAlign = window.getComputedStyle(messageElement).textAlign;
    expect(textAlign).toBe('center');

    const display = window.getComputedStyle(messageElement).display;
    expect(display).toBe('flex');

    const justifyContent = window.getComputedStyle(messageElement).justifyContent;
    expect(justifyContent).toBe('center');

    const alignItems = window.getComputedStyle(messageElement).alignItems;
    expect(alignItems).toBe('center');
  });
});
