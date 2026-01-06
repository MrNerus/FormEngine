import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subform } from './subform';

describe('Subform', () => {
  let component: Subform;
  let fixture: ComponentFixture<Subform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
