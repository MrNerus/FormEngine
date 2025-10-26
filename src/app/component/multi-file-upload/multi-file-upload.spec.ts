import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFileUpload } from './multi-file-upload';

describe('MultiFileUpload', () => {
  let component: MultiFileUpload;
  let fixture: ComponentFixture<MultiFileUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiFileUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiFileUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
