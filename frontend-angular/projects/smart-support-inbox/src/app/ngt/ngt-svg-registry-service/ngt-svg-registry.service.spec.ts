import { TestBed } from '@angular/core/testing';

import { NgtSvgRegistryService } from './ngt-svg-registry.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NgtSvgRegistryServiceService', () => {
  let service: NgtSvgRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideExperimentalZonelessChangeDetection()]
    });
    service = TestBed.inject(NgtSvgRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
