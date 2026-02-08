import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtSearchFieldComponent } from './ngt-search-field.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtSearchFieldComponent', () => {
  let component: NgtSearchFieldComponent;
  let fixture: ComponentFixture<NgtSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtSearchFieldComponent], 
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
