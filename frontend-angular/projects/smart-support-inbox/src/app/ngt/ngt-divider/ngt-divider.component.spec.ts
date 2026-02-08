import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtDividerComponent } from './ngt-divider.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtDividerComponent', () => {
  let component: NgtDividerComponent;
  let fixture: ComponentFixture<NgtDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtDividerComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
