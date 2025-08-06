import { TestBed } from '@angular/core/testing';

import { AccountStorageService } from './account-storage.service';

describe('AccountStorageService', () => {
  let service: AccountStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
