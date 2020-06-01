import { TestBed } from '@angular/core/testing';

import { TreeGeneratorService } from './tree-generator.service';

describe('TreeGeneratorService', () => {
  let service: TreeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
