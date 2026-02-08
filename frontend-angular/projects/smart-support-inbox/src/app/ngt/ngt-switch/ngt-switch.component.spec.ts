import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { NgtSwitchComponent } from './ngt-switch.component';

describe('NgtSwitchComponent', () => {
  let component: NgtSwitchComponent;
  let fixture: ComponentFixture<NgtSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtSwitchComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
