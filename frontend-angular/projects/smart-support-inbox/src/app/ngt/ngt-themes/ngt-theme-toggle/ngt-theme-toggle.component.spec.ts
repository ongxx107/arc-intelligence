import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtThemeToggleComponent } from './ngt-theme-toggle.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtThemesToggleComponent', () => {
  let component: NgtThemeToggleComponent;
  let fixture: ComponentFixture<NgtThemeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtThemeToggleComponent],
      providers: [
        provideExperimentalZonelessChangeDetection()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgtThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
