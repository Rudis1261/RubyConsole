import { TestBed, inject } from '@angular/core/testing';

import { LoadScriptService } from './load-script.service';

describe('LoadScriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadScriptService]
    });
  });

  it('should ...', inject([LoadScriptService], (service: LoadScriptService) => {
    expect(service).toBeTruthy();
  }));
});
