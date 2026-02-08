import { TestBed } from '@angular/core/testing';

import { NgtThemeService } from './ngt-theme.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtThemeService', () => {
  let service: NgtThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(NgtThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
