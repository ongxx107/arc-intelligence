import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtAutocompleteComponent } from './ngt-autocomplete-dropdown.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NgtAutocompleteComponent', () => {
  let component: NgtAutocompleteComponent;
  let fixture: ComponentFixture<NgtAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgtAutocompleteComponent, BrowserAnimationsModule],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgtAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
