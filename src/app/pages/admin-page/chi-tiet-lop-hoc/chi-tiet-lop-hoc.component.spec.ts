import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietLopHocComponent } from './chi-tiet-lop-hoc.component';

describe('ChiTietLopHocComponent', () => {
  let component: ChiTietLopHocComponent;
  let fixture: ComponentFixture<ChiTietLopHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietLopHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietLopHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
