import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtButtonComponent } from './ngt-button.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtButtonComponent', () => {
  let component: NgtButtonComponent;
  let fixture: ComponentFixture<NgtButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtButtonComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
