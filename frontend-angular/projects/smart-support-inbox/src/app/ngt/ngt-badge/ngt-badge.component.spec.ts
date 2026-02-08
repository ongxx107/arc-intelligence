import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtBadgeComponent } from './ngt-badge.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtBadgeComponent', () => {
  let component: NgtBadgeComponent;
  let fixture: ComponentFixture<NgtBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtBadgeComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
