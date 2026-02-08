import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtToolbarComponent } from './ngt-toolbar.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtToolbarComponent', () => {
  let component: NgtToolbarComponent;
  let fixture: ComponentFixture<NgtToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtToolbarComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
