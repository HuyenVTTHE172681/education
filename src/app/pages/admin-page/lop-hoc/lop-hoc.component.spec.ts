import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LopHocComponent } from './lop-hoc.component';

describe('LopHocComponent', () => {
  let component: LopHocComponent;
  let fixture: ComponentFixture<LopHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LopHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LopHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
