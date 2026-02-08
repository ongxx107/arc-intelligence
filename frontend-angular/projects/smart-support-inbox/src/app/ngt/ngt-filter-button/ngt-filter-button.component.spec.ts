import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtFilterButtonComponent } from './ngt-filter-button.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtFilterButtonComponent', () => {
  let component: NgtFilterButtonComponent;
  let fixture: ComponentFixture<NgtFilterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtFilterButtonComponent], 
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtFilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
