import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtSegmentedControlComponent } from './ngt-segmented-control.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtSegmentedControlComponent', () => {
  let component: NgtSegmentedControlComponent;
  let fixture: ComponentFixture<NgtSegmentedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtSegmentedControlComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtSegmentedControlComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('buttons', []);
    fixture.detectChanges();
  });

  it('should create empty', () => {
    expect(component).toBeTruthy();
  });

  it('should create with two buttons', () => {
    fixture.componentRef.setInput('buttons', [
      {key: 'it1', matIcon: 'star', label: 'Item'}, 
      {key: 'it2', matIcon: 'star', label: 'Item'}, 
      {key: 'it3', matIcon: 'star', label: 'Item'}]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.value()).toBe(undefined);
    fixture.componentRef.setInput('value', 'it1');
    fixture.detectChanges();
    expect(component.value()).toBe('it1');
  });
});
