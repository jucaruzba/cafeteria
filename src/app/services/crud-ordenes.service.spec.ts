import { TestBed } from '@angular/core/testing';

import { CrudOrdenesService } from './crud-ordenes.service';

describe('CrudOrdenesService', () => {
  let service: CrudOrdenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudOrdenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
