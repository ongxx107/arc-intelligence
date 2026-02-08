import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgtInputFieldComponent } from './ngt-input-field.component';
import { By } from '@angular/platform-browser';


describe('NgtInputFieldComponent', () => {
  let component: NgtInputFieldComponent;
  let fixture: ComponentFixture<NgtInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtInputFieldComponent, BrowserAnimationsModule],
      providers: [
          provideExperimentalZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtInputFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind the input value to the component model', async () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    component.value.set('Test Value');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(inputEl.value).toBe('Test Value');

    inputEl.value = 'Updated from Input';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('Updated from Input');
  });
});
