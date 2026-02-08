import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtThemeContainerComponent } from './ngt-theme-container.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtThemesComponent', () => {
  let component: NgtThemeContainerComponent;
  let fixture: ComponentFixture<NgtThemeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtThemeContainerComponent],
      providers: [
        provideExperimentalZonelessChangeDetection()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgtThemeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
